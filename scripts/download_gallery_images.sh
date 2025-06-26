#!/bin/bash

# Script to download images from http://www.friendshipdaycare.com/gallery
# and save them to the public/static/ folder for the new website.

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://www.friendshipdaycare.com"

# Create static folder
STATIC_DIR="public/static"
mkdir -p "$STATIC_DIR"

echo -e "${BLUE}🚀 Starting image download from Friendship Corner Daycare gallery...${NC}"
echo -e "${BLUE}📁 Images will be saved to: $STATIC_DIR/${NC}"
echo ""

# Array of images to download
declare -a images=(
    "/images/friendship-corner-daycare-logo.png:friendship-corner-daycare-logo.png"
    "/images/Playground.jpg:playground.jpg"
    "/images/Circle-Time-Area.jpg:circle-time-area.jpg"
    "/images/Sensorial-Shelf.jpg:sensorial-shelf.jpg"
    "/images/Language-Shelf.jpg:language-shelf.jpg"
    "/images/Practical-Life-Shelf-1.jpg:practical-life-shelf-1.jpg"
    "/images/Practical-Life-Shelf-2.JPG:practical-life-shelf-2.jpg"
    "/images/Math-Shelf.jpg:math-shelf.jpg"
    "/images/Culture-Shelf.jpg:culture-shelf.jpg"
    "/images/Circle-Time-Board-2.jpg:circle-time-board-2.jpg"
    "/images/Art-Themed-Board-2.jpg:art-themed-board-2.jpg"
    "/images/Toys.jpg:toys.jpg"
)

# Counters
successful=0
failed=0

# Download each image
for image_info in "${images[@]}"; do
    # Split the string by colon
    IFS=':' read -r url_path filename <<< "$image_info"
    full_url="${BASE_URL}${url_path}"
    file_path="${STATIC_DIR}/${filename}"
    
    echo "Downloading: $full_url"
    
    # Download with curl
    if curl -L -s -o "$file_path" \
        -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" \
        --connect-timeout 30 \
        --max-time 60 \
        "$full_url"; then
        
        # Check if file was actually downloaded and has content
        if [[ -f "$file_path" && -s "$file_path" ]]; then
            echo -e "${GREEN}✅ Saved: $filename${NC}"
            ((successful++))
        else
            echo -e "${RED}❌ Error: Empty file downloaded for $filename${NC}"
            rm -f "$file_path"  # Remove empty file
            ((failed++))
        fi
    else
        echo -e "${RED}❌ Error downloading $full_url${NC}"
        ((failed++))
    fi
    
    # Small delay between downloads
    sleep 1
done

echo ""
echo "=================================================="
echo -e "${BLUE}📊 Download Summary:${NC}"
echo -e "${GREEN}✅ Successful downloads: $successful${NC}"
echo -e "${RED}❌ Failed downloads: $failed${NC}"
echo -e "${BLUE}📁 Images saved to: $(pwd)/$STATIC_DIR${NC}"

if [[ $successful -gt 0 ]]; then
    echo ""
    echo -e "${YELLOW}🎉 Images are now available for use in your gallery!${NC}"
    echo -e "${YELLOW}💡 You can reference them in your gallery component like:${NC}"
    echo "   /static/playground.jpg"
    echo "   /static/circle-time-area.jpg"
    echo "   etc."
fi
