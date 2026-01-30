#!/usr/bin/env python3
"""
Comprehensive script to download all images from http://www.friendshipdaycare.com
and save them to the public/images folder for the new website.
"""

import os
import requests
from urllib.parse import urljoin, urlparse
import time
from pathlib import Path
import re
from bs4 import BeautifulSoup

def create_images_folder():
    """Create the public/images folder if it doesn't exist"""
    images_folder = Path("public/images")
    images_folder.mkdir(parents=True, exist_ok=True)
    return images_folder

def download_image(url, filename, images_folder):
    """Download a single image and save it to the images folder"""
    try:
        print(f"Downloading: {url}")
        
        # Add headers to mimic a browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Save the image
        file_path = images_folder / filename
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

def get_page_images(url):
    """Extract all image URLs from a webpage"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        images = []
        
        # Find all img tags
        for img in soup.find_all('img'):
            src = img.get('src')
            if src:
                # Convert relative URLs to absolute
                if src.startswith('/'):
                    src = urljoin(url, src)
                elif not src.startswith('http'):
                    src = urljoin(url, src)
                images.append(src)
        
        # Also look for background images in CSS
        for element in soup.find_all(style=True):
            style = element.get('style', '')
            bg_matches = re.findall(r'background-image:\s*url\(["\']?([^"\']+)["\']?\)', style)
            for match in bg_matches:
                if match.startswith('/'):
                    match = urljoin(url, match)
                elif not match.startswith('http'):
                    match = urljoin(url, match)
                images.append(match)
        
        return images
        
    except Exception as e:
        print(f"❌ Error fetching page {url}: {e}")
        return []

def main():
    """Main function to download all images from the original site"""
    base_url = "http://www.friendshipdaycare.com"
    
    # Pages to scan for images
    pages_to_scan = [
        f"{base_url}/",
        f"{base_url}/about",
        f"{base_url}/program", 
        f"{base_url}/fees-hours",
        f"{base_url}/gallery",
        f"{base_url}/contact"
    ]
    
    # Known images from our previous analysis
    known_images = [
        "/images/daycare-logo.png",
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
        "/images/Toys.jpg",
    ]
    
    print("🚀 Starting comprehensive image download from Friendship Corner Daycare...")
    print(f"📁 Images will be saved to: public/images/")
    
    # Create the images folder
    images_folder = create_images_folder()
    
    # Collect all image URLs
    all_images = set()
    
    # Add known images
    for img_path in known_images:
        full_url = urljoin(base_url, img_path)
        all_images.add(full_url)
    
    # Scan all pages for additional images
    print("\n🔍 Scanning pages for images...")
    for page_url in pages_to_scan:
        print(f"Scanning: {page_url}")
        page_images = get_page_images(page_url)
        for img_url in page_images:
            # Only include images from the same domain
            if base_url in img_url and any(ext in img_url.lower() for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']):
                all_images.add(img_url)
    
    print(f"\n📊 Found {len(all_images)} unique images to download")
    
    # Download each image
    successful_downloads = 0
    failed_downloads = 0
    
    for img_url in sorted(all_images):
        # Extract filename from URL
        parsed_url = urlparse(img_url)
        filename = os.path.basename(parsed_url.path)
        
        # Clean filename and ensure it has an extension
        if not filename or '.' not in filename:
            filename = f"image_{hash(img_url) % 10000}.jpg"
        
        # Sanitize filename
        filename = re.sub(r'[^\w\-_\.]', '_', filename)
        filename = filename.lower()
        
        if download_image(img_url, filename, images_folder):
            successful_downloads += 1
        else:
            failed_downloads += 1
        
        # Add a small delay between downloads to be respectful
        time.sleep(1)
    
    print("\n" + "="*50)
    print(f"📊 Download Summary:")
    print(f"✅ Successful downloads: {successful_downloads}")
    print(f"❌ Failed downloads: {failed_downloads}")
    print(f"📁 Images saved to: {images_folder.absolute()}")
    
    if successful_downloads > 0:
        print("\n🎉 Images are now available for use in your app!")
        print("💡 You can reference them in your components like:")
        print("   /images/filename.jpg")
        print("   /images/daycare-logo.png")
        print("   etc.")

if __name__ == "__main__":
    main()
