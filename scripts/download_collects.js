#!/usr/bin/env node
/**
 * Download all images from Cloudflare R2 storage
 * and save them to the public/collects folder for local development.
 * 
 * Prerequisites:
 * - Node.js installed
 * - .env.local file with R2 credentials
 * - @aws-sdk/client-s3 package installed
 */

const fs = require('fs');
const path = require('path');
const { S3Client, GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '.env.local' });

// Create collects folder if it doesn't exist
function createCollectsFolder() {
    const collectsFolder = path.join(process.cwd(), 'public', 'collects');
    if (!fs.existsSync(collectsFolder)) {
        fs.mkdirSync(collectsFolder, { recursive: true });
    }
    return collectsFolder;
}

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

// Download a single image from R2
async function downloadImageFromR2(client, bucketName, key, collectsFolder) {
    try {
        const filename = path.basename(key);
        console.log(`Downloading: ${key}`);
        
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });
        
        const response = await client.send(command);
        const filePath = path.join(collectsFolder, filename);
        
        // Convert stream to buffer and save
        const chunks = [];
        for await (const chunk of response.Body) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        
        fs.writeFileSync(filePath, buffer);
        console.log(`✅ Saved: ${filename} (${(buffer.length / 1024).toFixed(2)} KB)`);
        
        return true;
    } catch (error) {
        console.error(`❌ Error downloading ${key}: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log("🚀 Starting image download from Cloudflare R2...");
    console.log("📁 Images will be saved to: public/collects/");
    console.log("");
    
    // Create the collects folder
    const collectsFolder = createCollectsFolder();
    
    // Get R2 configuration
    const bucketName = process.env.R2_BUCKET_NAME;
    if (!bucketName) {
        console.error('❌ Missing R2_BUCKET_NAME in .env.local');
        process.exit(1);
    }
    
    // Create R2 client
    const client = createR2Client();
    
    try {
        // List all images in the collects folder
        console.log(`📋 Listing images in bucket: ${bucketName}/collects/`);
        
        const listCommand = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: 'collects/',
            MaxKeys: 100,
        });
        
        const listResponse = await client.send(listCommand);
        
        if (!listResponse.Contents || listResponse.Contents.length === 0) {
            console.log('⚠️  No images found in R2 bucket collects/ folder');
            return;
        }
        
        // Filter for actual image files (not folders)
        const imageFiles = listResponse.Contents.filter(obj => {
            const key = obj.Key || '';
            return key.includes('.') && !key.endsWith('/');
        });
        
        console.log(`Found ${imageFiles.length} images in R2`);
        console.log("");
        
        // Download each image
        let successfulDownloads = 0;
        let failedDownloads = 0;
        
        for (const obj of imageFiles) {
            const key = obj.Key;
            if (!key) continue;
            
            const success = await downloadImageFromR2(client, bucketName, key, collectsFolder);
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
        console.log(`📁 Images saved to: ${path.resolve(collectsFolder)}`);
        
        if (successfulDownloads > 0) {
            console.log("\n🎉 Images are now available for local development!");
            console.log("💡 You can reference them in your components like:");
            console.log("   /collects/filename.png");
            console.log("   /collects/canva-1.png");
            console.log("   etc.");
        }
        
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { downloadImageFromR2, createCollectsFolder };
