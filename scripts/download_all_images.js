#!/usr/bin/env node
/**
 * Comprehensive script to download all images from http://www.friendshipdaycare.com
 * and save them to the public/images folder for the new website.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Create images folder if it doesn't exist
function createImagesFolder() {
    const imagesFolder = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(imagesFolder)) {
        fs.mkdirSync(imagesFolder, { recursive: true });
    }
    return imagesFolder;
}

// Download a single image
function downloadImage(url, filename, imagesFolder) {
    return new Promise((resolve, reject) => {
        console.log(`Downloading: ${url}`);
        
        const protocol = url.startsWith('https:') ? https : http;
        const filePath = path.join(imagesFolder, filename);
        
        const request = protocol.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
                return;
            }
            
            const fileStream = fs.createWriteStream(filePath);
            response.pipe(fileStream);
            
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`✅ Saved: ${filename}`);
                resolve(true);
            });
            
            fileStream.on('error', (err) => {
                fs.unlink(filePath, () => {}); // Delete partial file
                reject(err);
            });
        });
        
        request.on('error', (err) => {
            reject(err);
        });
        
        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

// Add delay between downloads
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Clean filename
function cleanFilename(filename) {
    if (!filename || !filename.includes('.')) {
        return `image_${Math.floor(Math.random() * 10000)}.jpg`;
    }
    return filename.toLowerCase().replace(/[^\w\-_.]/g, '_');
}

async function main() {
    const baseUrl = "http://www.friendshipdaycare.com";
    
    // Known images from our analysis
    const knownImages = [
        "/images/friendship-corner-daycare-logo.png",
        "/images/Playground.jpg",
        "/images/Circle-Time-Area.jpg",
        "/images/Sensorial-Shelf.jpg",
        "/images/Language-Shelf.jpg",
        "/images/Practical-Life-Shelf-1.jpg",
        "/images/Practical-Life-Shelf-2.JPG",
        "/images/Math-Shelf.jpg",
        "/images/Culture-Shelf.jpg",
        "/images/Circle-Time-Board-2.jpg",
        "/images/Art-Themed-Board-2.jpg",
        "/images/Toys.jpg"
    ];
    
    console.log("🚀 Starting comprehensive image download from Friendship Corner Daycare...");
    console.log("📁 Images will be saved to: public/images/");
    
    // Create the images folder
    const imagesFolder = createImagesFolder();
    
    // Download each known image
    let successfulDownloads = 0;
    let failedDownloads = 0;
    
    for (const imagePath of knownImages) {
        const fullUrl = new URL(imagePath, baseUrl).href;
        const filename = cleanFilename(path.basename(imagePath));
        
        try {
            await downloadImage(fullUrl, filename, imagesFolder);
            successfulDownloads++;
        } catch (error) {
            console.log(`❌ Error downloading ${fullUrl}: ${error.message}`);
            failedDownloads++;
        }
        
        // Add a small delay between downloads to be respectful
        await delay(1000);
    }
    
    console.log("\n" + "=".repeat(50));
    console.log("📊 Download Summary:");
    console.log(`✅ Successful downloads: ${successfulDownloads}`);
    console.log(`❌ Failed downloads: ${failedDownloads}`);
    console.log(`📁 Images saved to: ${path.resolve(imagesFolder)}`);
    
    if (successfulDownloads > 0) {
        console.log("\n🎉 Images are now available for use in your app!");
        console.log("💡 You can reference them in your components like:");
        console.log("   /images/filename.jpg");
        console.log("   /images/friendship-corner-daycare-logo.png");
        console.log("   etc.");
    }
}

// Run the script
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { downloadImage, createImagesFolder };
