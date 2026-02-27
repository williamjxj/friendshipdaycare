#!/usr/bin/env node
/**
 * Bidirectional sync script for imgs folder with Cloudflare R2
 * 
 * Usage:
 *   node scripts/sync_imgs.js download    # Download R2 -> local public/imgs/
 *   node scripts/sync_imgs.js upload      # Upload local public/imgs/ -> R2
 * 
 * Prerequisites:
 * - Node.js installed
 * - .env.local file with R2 credentials
 * - @aws-sdk/client-s3 package installed: npm install @aws-sdk/client-s3 dotenv
 */

const fs = require('fs');
const path = require('path');
const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '.env.local' });

// Create R2 client
function createR2Client() {
    const accountId = process.env.NEXT_PUBLIC_R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

    if (!accountId || !accessKeyId || !secretAccessKey) {
        console.error('❌ Missing R2 credentials in .env.local');
        console.error('Required variables: NEXT_PUBLIC_R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY');
        process.exit(1);
    }

    return new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
}

// Ensure directory exists
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Get all files recursively from a directory
function getAllFilesRecursively(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFilesRecursively(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Download a single file from R2
async function downloadFileFromR2(client, bucketName, key, localPath) {
    try {
        console.log(`Downloading: ${key}`);
        
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });
        
        const response = await client.send(command);
        
        // Ensure local directory exists
        const localDir = path.dirname(localPath);
        ensureDirectoryExists(localDir);
        
        // Convert stream to buffer and save
        const chunks = [];
        for await (const chunk of response.Body) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        
        fs.writeFileSync(localPath, buffer);
        console.log(`✅ Saved: ${localPath} (${(buffer.length / 1024).toFixed(2)} KB)`);
        
        return true;
    } catch (error) {
        console.error(`❌ Error downloading ${key}: ${error.message}`);
        return false;
    }
}

// Upload a single file to R2
async function uploadFileToR2(client, bucketName, localPath, key) {
    try {
        console.log(`Uploading: ${localPath} -> ${key}`);
        
        const fileBuffer = fs.readFileSync(localPath);
        const fileSizeKB = (fileBuffer.length / 1024).toFixed(2);
        
        // Determine content type based on file extension
        const ext = path.extname(localPath).toLowerCase();
        const contentTypeMap = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.avif': 'image/avif',
        };
        const contentType = contentTypeMap[ext] || 'application/octet-stream';
        
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: fileBuffer,
            ContentType: contentType,
            CacheControl: 'public, max-age=31536000, immutable',
        });
        
        await client.send(command);
        console.log(`✅ Uploaded: ${key} (${fileSizeKB} KB)`);
        
        return true;
    } catch (error) {
        console.error(`❌ Error uploading ${localPath}: ${error.message}`);
        return false;
    }
}

// Download from R2 to local
async function downloadFromR2(client, bucketName) {
    console.log("🚀 Starting download from Cloudflare R2...");
    console.log("📁 Files will be saved to: public/imgs/");
    console.log("");
    
    const localBaseDir = path.join(process.cwd(), 'public', 'imgs');
    ensureDirectoryExists(localBaseDir);
    
    try {
        // List all objects in the imgs/ folder recursively
        console.log(`📋 Listing files in bucket: ${bucketName}/imgs/`);
        
        let allObjects = [];
        let continuationToken = null;
        
        do {
            const listCommand = new ListObjectsV2Command({
                Bucket: bucketName,
                Prefix: 'imgs/',
                ContinuationToken: continuationToken,
                MaxKeys: 1000,
            });
            
            const listResponse = await client.send(listCommand);
            
            if (listResponse.Contents) {
                allObjects = allObjects.concat(listResponse.Contents);
            }
            
            continuationToken = listResponse.NextContinuationToken;
        } while (continuationToken);
        
        if (allObjects.length === 0) {
            console.log('⚠️  No files found in R2 bucket imgs/ folder');
            return;
        }
        
        // Filter for actual files (not folders)
        const files = allObjects.filter(obj => {
            const key = obj.Key || '';
            return key.includes('.') && !key.endsWith('/');
        });
        
        console.log(`Found ${files.length} files in R2`);
        console.log("");
        
        // Download each file
        let successfulDownloads = 0;
        let failedDownloads = 0;
        
        for (const obj of files) {
            const key = obj.Key;
            if (!key) continue;
            
            // Create local path, preserving folder structure
            // Remove 'imgs/' prefix from key to get relative path
            const relativePath = key.substring(5); // Remove 'imgs/' (5 characters)
            const localPath = path.join(localBaseDir, relativePath);
            
            const success = await downloadFileFromR2(client, bucketName, key, localPath);
            if (success) {
                successfulDownloads++;
            } else {
                failedDownloads++;
            }
        }
        
        console.log("\n" + "=".repeat(50));
        console.log("📊 Download Summary:");
        console.log(`✅ Successful downloads: ${successfulDownloads}`);
        console.log(`❌ Failed downloads: ${failedDownloads}`);
        console.log(`📁 Files saved to: ${path.resolve(localBaseDir)}`);
        
        if (successfulDownloads > 0) {
            console.log("\n🎉 Files are now available for local editing!");
        }
        
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

// Upload from local to R2
async function uploadToR2(client, bucketName) {
    console.log("🚀 Starting upload to Cloudflare R2...");
    console.log("📁 Uploading from: public/imgs/");
    console.log("");
    
    const localBaseDir = path.join(process.cwd(), 'public', 'imgs');
    
    if (!fs.existsSync(localBaseDir)) {
        console.error(`❌ Directory not found: ${localBaseDir}`);
        console.error('Please ensure public/imgs/ folder exists with files to upload.');
        process.exit(1);
    }
    
    try {
        // Get all files recursively
        const allFiles = getAllFilesRecursively(localBaseDir);
        
        if (allFiles.length === 0) {
            console.log('⚠️  No files found in public/imgs/ folder');
            return;
        }
        
        console.log(`Found ${allFiles.length} files to upload`);
        console.log("");
        
        // Upload each file
        let successfulUploads = 0;
        let failedUploads = 0;
        
        for (const localPath of allFiles) {
            // Create R2 key by getting relative path from localBaseDir
            const relativePath = path.relative(localBaseDir, localPath);
            // Normalize path separators for R2 (use forward slashes)
            const normalizedPath = relativePath.replace(/\\/g, '/');
            const key = `imgs/${normalizedPath}`;
            
            const success = await uploadFileToR2(client, bucketName, localPath, key);
            if (success) {
                successfulUploads++;
            } else {
                failedUploads++;
            }
        }
        
        console.log("\n" + "=".repeat(50));
        console.log("📊 Upload Summary:");
        console.log(`✅ Successful uploads: ${successfulUploads}`);
        console.log(`❌ Failed uploads: ${failedUploads}`);
        console.log(`☁️  Files uploaded to: R2 bucket ${bucketName}/imgs/`);
        
        if (successfulUploads > 0) {
            console.log("\n🎉 Files successfully uploaded to R2!");
            console.log("💡 Your changes are now live in production.");
        }
        
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

// Main function
async function main() {
    const command = process.argv[2];
    
    if (!command || !['download', 'upload'].includes(command)) {
        console.error('❌ Invalid command. Usage:');
        console.error('  node scripts/sync_imgs.js download    # Download R2 -> local');
        console.error('  node scripts/sync_imgs.js upload      # Upload local -> R2');
        process.exit(1);
    }
    
    // Get R2 configuration
    const bucketName = process.env.R2_BUCKET_NAME;
    if (!bucketName) {
        console.error('❌ Missing R2_BUCKET_NAME in .env.local');
        process.exit(1);
    }
    
    // Create R2 client
    const client = createR2Client();
    
    if (command === 'download') {
        await downloadFromR2(client, bucketName);
    } else if (command === 'upload') {
        await uploadToR2(client, bucketName);
    }
}

// Run the script
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { downloadFromR2, uploadToR2 };
