#!/usr/bin/env python3
"""
Download all images from Cloudflare R2 storage
and save them to the public/images folder for local development.

Prerequisites:
- Python 3 installed
- .env.local file with R2 credentials
- boto3 package installed: pip install boto3 python-dotenv
"""

import os
import boto3
from pathlib import Path
from dotenv import load_dotenv

def create_images_folder():
    """Create the public/images folder if it doesn't exist"""
    images_folder = Path("public/images")
    images_folder.mkdir(parents=True, exist_ok=True)
    return images_folder

def create_r2_client():
    """Create and configure R2 client using boto3"""
    # Load environment variables from .env.local
    load_dotenv('.env.local')
    
    account_id = os.getenv('NEXT_PUBLIC_R2_ACCOUNT_ID')
    access_key_id = os.getenv('R2_ACCESS_KEY_ID')
    secret_access_key = os.getenv('R2_SECRET_ACCESS_KEY')
    
    if not all([account_id, access_key_id, secret_access_key]):
        print('❌ Missing R2 credentials in .env.local')
        print('Required variables: NEXT_PUBLIC_R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY')
        exit(1)
    
    endpoint_url = f'https://{account_id}.r2.cloudflarestorage.com'
    
    return boto3.client(
        's3',
        endpoint_url=endpoint_url,
        aws_access_key_id=access_key_id,
        aws_secret_access_key=secret_access_key,
        region_name='auto'
    )

def download_image_from_r2(client, bucket_name, key, images_folder):
    """Download a single image from R2 and save it locally"""
    try:
        filename = Path(key).name
        print(f"Downloading: {key}")
        
        file_path = images_folder / filename
        
        # Download the file
        client.download_file(bucket_name, key, str(file_path))
        
        # Get file size
        file_size_kb = file_path.stat().st_size / 1024
        print(f"✅ Saved: {filename} ({file_size_kb:.2f} KB)")
        
        return True
        
    except Exception as e:
        print(f"❌ Error downloading {key}: {e}")
        return False

def main():
    """Main function to download all images from R2"""
    print("🚀 Starting image download from Cloudflare R2...")
    print("📁 Images will be saved to: public/images/")
    print()
    
    # Load environment variables
    load_dotenv('.env.local')
    bucket_name = os.getenv('R2_BUCKET_NAME')
    
    if not bucket_name:
        print('❌ Missing R2_BUCKET_NAME in .env.local')
        exit(1)
    
    # Create the images folder
    images_folder = create_images_folder()
    
    # Create R2 client
    client = create_r2_client()
    
    try:
        # List all images in the images/ folder
        print(f"📋 Listing images in bucket: {bucket_name}/images/")
        
        response = client.list_objects_v2(
            Bucket=bucket_name,
            Prefix='images/',
            MaxKeys=100
        )
        
        if 'Contents' not in response or len(response['Contents']) == 0:
            print('⚠️  No images found in R2 bucket images/ folder')
            return
        
        # Filter for actual image files (not folders)
        image_files = [
            obj for obj in response['Contents']
            if '.' in obj['Key'] and not obj['Key'].endswith('/')
        ]
        
        print(f"Found {len(image_files)} images in R2")
        print()
        
        # Download each image
        successful_downloads = 0
        failed_downloads = 0
        
        for obj in image_files:
            key = obj['Key']
            
            if download_image_from_r2(client, bucket_name, key, images_folder):
                successful_downloads += 1
            else:
                failed_downloads += 1
        
        print("\n" + "="*50)
        print("📊 Download Summary:")
        print(f"✅ Successful downloads: {successful_downloads}")
        print(f"❌ Failed downloads: {failed_downloads}")
        print(f"📁 Images saved to: {images_folder.absolute()}")
        
        if successful_downloads > 0:
            print("\n🎉 Images are now available for local development!")
            print("💡 You can reference them in your components like:")
            print("   /images/filename.jpg")
            print("   /images/daycare-logo.png")
            print("   etc.")
    
    except Exception as e:
        print(f"❌ Error: {e}")
        exit(1)

if __name__ == "__main__":
    main()
