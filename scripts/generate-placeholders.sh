#!/bin/bash

# Generate Placeholder SVG Script
# Creates basic SVG placeholder images for hero sections
# Usage: ./scripts/generate-placeholders.sh [page-name] [section-name] [sequence-number]

set -e

PAGE_NAME=${1:-"about"}
SECTION_NAME=${2:-"hero"}
SEQUENCE=${3:-"1"}

OUTPUT_DIR="public/placeholders/${PAGE_NAME}"
OUTPUT_FILE="${OUTPUT_DIR}/${PAGE_NAME}_${SECTION_NAME}_${SEQUENCE}.svg"

# Create directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Generate SVG placeholder
# This is a basic template - customize colors and patterns as needed
cat > "$OUTPUT_FILE" << EOF
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2C5F4D;stop-opacity:0.1" />
      <stop offset="50%" style="stop-color:#D98C5F;stop-opacity:0.05" />
      <stop offset="100%" style="stop-color:#E8C547;stop-opacity:0.1" />
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.1"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="1920" height="1080" fill="url(#bgGradient)"/>
  
  <!-- Decorative pattern -->
  <rect width="1920" height="1080" fill="url(#dots)" fill-opacity="0.3"/>
  
  <!-- Abstract shapes (Montessori-inspired) -->
  <circle cx="200" cy="200" r="150" fill="currentColor" opacity="0.05"/>
  <circle cx="1720" cy="880" r="200" fill="currentColor" opacity="0.05"/>
  <path d="M 960 540 L 1160 340 L 1360 540 L 1160 740 Z" fill="currentColor" opacity="0.03"/>
</svg>
EOF

echo "Generated placeholder: $OUTPUT_FILE"
echo "Customize colors and patterns in the SVG file as needed."

