#!/usr/bin/env node
/**
 * Script to download images from http://www.friendshipdaycare.com/gallery
 * and save them to the public/static/ folder for the new website.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Create static folder if it doesn't exist
function createStaticFolder() {
    const staticFolder = path.join(process.cwd(), 'public', 'static');
    if (!fs.existsSync(staticFolder)) {
        fs.mkdirSync(staticFolder, { recursive: true });
    }
    return staticFolder;
}

// Download a single image
function downloadImage(url, filename, staticFolder) {
    return new Promise((resolve, reject) => {
        console.log(`Downloading: ${url}`);
        
        const protocol = url.startsWith('https:') ? https : http;
        const filePath = path.join(staticFolder, filename);
        
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

async function main() {
    const baseUrl = "http://www.friendshipdaycare.com";
    
    // List of images found in the gallery
    const images = [
        { url: "/images/friendship-corner-daycare-logo.png", filename: "friendship-corner-daycare-logo.png" },
        { url: "/images/Playground.jpg", filename: "playground.jpg" },
        { url: "/images/Circle-Time-Area.jpg", filename: "circle-time-area.jpg" },
        { url: "/images/Sensorial-Shelf.jpg", filename: "sensorial-shelf.jpg" },
        { url: "/images/Language-Shelf.jpg", filename: "language-shelf.jpg" },
        { url: "/images/Practical-Life-Shelf-1.jpg", filename: "practical-life-shelf-1.jpg" },
        { url: "/images/Practical-Life-Shelf-2.JPG", filename: "practical-life-shelf-2.jpg" },
        { url: "/images/Math-Shelf.jpg", filename: "math-shelf.jpg" },
        { url: "/images/Culture-Shelf.jpg", filename: "culture-shelf.jpg" },
        { url: "/images/Circle-Time-Board-2.jpg", filename: "circle-time-board-2.jpg" },
        { url: "/images/Art-Themed-Board-2.jpg", filename: "art-themed-board-2.jpg" },
        { url: "/images/Toys.jpg", filename: "toys.jpg" }
    ];
    
    console.log("🚀 Starting image download from Friendship Corner Daycare gallery...");
    console.log("📁 Images will be saved to: public/static/");
    
    // Create the static folder
    const staticFolder = createStaticFolder();
    
    // Download each image
    let successfulDownloads = 0;
    let failedDownloads = 0;
    
    for (const image of images) {
        const fullUrl = new URL(image.url, baseUrl).href;
        
        try {
            await downloadImage(fullUrl, image.filename, staticFolder);
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
    console.log(`📁 Images saved to: ${path.resolve(staticFolder)}`);
    
    if (successfulDownloads > 0) {
        console.log("\n🎉 Images are now available for use in your gallery!");
        console.log("💡 You can reference them in your gallery component like:");
        console.log("   /static/playground.jpg");
        console.log("   /static/circle-time-area.jpg");
        console.log("   etc.");
    }
}

// Run the script
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { downloadImage, createStaticFolder };
