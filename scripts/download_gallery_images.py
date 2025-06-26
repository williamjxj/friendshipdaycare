#!/usr/bin/env python3
"""
Script to download images from http://www.friendshipdaycare.com/gallery
and save them to the public/static/ folder for the new website.
"""

import os
import requests
from urllib.parse import urljoin, urlparse
import time
from pathlib import Path

def create_static_folder():
    """Create the public/static folder if it doesn't exist"""
    static_folder = Path("public/static")
    static_folder.mkdir(parents=True, exist_ok=True)
    return static_folder

def download_image(url, filename, static_folder):
    """Download a single image and save it to the static folder"""
    try:
        print(f"Downloading: {url}")
        
        # Add headers to mimic a browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Save the image
        file_path = static_folder / filename
        with open(file_path, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ Saved: {filename}")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Error downloading {url}: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error downloading {url}: {e}")
        return False

def main():
    """Main function to download all gallery images"""
    base_url = "http://www.friendshipdaycare.com"
    
    # List of images found in the gallery
    images = [
        {"url": "/images/friendship-corner-daycare-logo.png", "filename": "friendship-corner-daycare-logo.png"},
        {"url": "/images/Playground.jpg", "filename": "playground.jpg"},
        {"url": "/images/Circle-Time-Area.jpg", "filename": "circle-time-area.jpg"},
        {"url": "/images/Sensorial-Shelf.jpg", "filename": "sensorial-shelf.jpg"},
        {"url": "/images/Language-Shelf.jpg", "filename": "language-shelf.jpg"},
        {"url": "/images/Practical-Life-Shelf-1.jpg", "filename": "practical-life-shelf-1.jpg"},
        {"url": "/images/Practical-Life-Shelf-2.JPG", "filename": "practical-life-shelf-2.jpg"},
        {"url": "/images/Math-Shelf.jpg", "filename": "math-shelf.jpg"},
        {"url": "/images/Culture-Shelf.jpg", "filename": "culture-shelf.jpg"},
        {"url": "/images/Circle-Time-Board-2.jpg", "filename": "circle-time-board-2.jpg"},
        {"url": "/images/Art-Themed-Board-2.jpg", "filename": "art-themed-board-2.jpg"},
        {"url": "/images/Toys.jpg", "filename": "toys.jpg"},
    ]
    
    print("🚀 Starting image download from Friendship Corner Daycare gallery...")
    print(f"📁 Images will be saved to: public/static/")
    
    # Create the static folder
    static_folder = create_static_folder()
    
    # Download each image
    successful_downloads = 0
    failed_downloads = 0
    
    for image in images:
        full_url = urljoin(base_url, image["url"])
        
        if download_image(full_url, image["filename"], static_folder):
            successful_downloads += 1
        else:
            failed_downloads += 1
        
        # Add a small delay between downloads to be respectful
        time.sleep(1)
    
    print("\n" + "="*50)
    print(f"📊 Download Summary:")
    print(f"✅ Successful downloads: {successful_downloads}")
    print(f"❌ Failed downloads: {failed_downloads}")
    print(f"📁 Images saved to: {static_folder.absolute()}")
    
    if successful_downloads > 0:
        print("\n🎉 Images are now available for use in your gallery!")
        print("💡 You can reference them in your gallery component like:")
        print("   /static/playground.jpg")
        print("   /static/circle-time-area.jpg")
        print("   etc.")

if __name__ == "__main__":
    main()
