#!/usr/bin/env python3
"""
Create video thumbnail placeholders for the gallery video section
"""

import os
from PIL import Image, ImageDraw, ImageFont
import requests
from io import BytesIO

def create_images_folder():
    """Create the images folder if it doesn't exist"""
    images_folder = os.path.join("public", "images")
    if not os.path.exists(images_folder):
        os.makedirs(images_folder)
        print(f"✅ Created folder: {images_folder}")
    else:
        print(f"📁 Folder already exists: {images_folder}")
    return images_folder

def create_thumbnail(title, description, emoji, color, filename, folder):
    """Create a colorful video thumbnail with text and emoji"""
    # Create image
    width, height = 800, 450  # 16:9 aspect ratio
    img = Image.new('RGB', (width, height), color)
    draw = ImageDraw.Draw(img)
    
    try:
        # Try to use a nice font
        title_font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 48)
        desc_font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
        emoji_font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 80)
    except:
        # Fallback to default font
        title_font = ImageFont.load_default()
        desc_font = ImageFont.load_default()
        emoji_font = ImageFont.load_default()
    
    # Draw emoji at top
    emoji_bbox = draw.textbbox((0, 0), emoji, font=emoji_font)
    emoji_width = emoji_bbox[2] - emoji_bbox[0]
    emoji_x = (width - emoji_width) // 2
    draw.text((emoji_x, 50), emoji, fill='white', font=emoji_font)
    
    # Draw title
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    draw.text((title_x, 180), title, fill='white', font=title_font)
    
    # Draw description (word wrap)
    words = description.split()
    lines = []
    current_line = []
    
    for word in words:
        test_line = ' '.join(current_line + [word])
        test_bbox = draw.textbbox((0, 0), test_line, font=desc_font)
        test_width = test_bbox[2] - test_bbox[0]
        
        if test_width <= width - 100:  # 50px margin on each side
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
                current_line = [word]
            else:
                lines.append(word)
    
    if current_line:
        lines.append(' '.join(current_line))
    
    # Draw description lines
    y_offset = 250
    for line in lines:
        line_bbox = draw.textbbox((0, 0), line, font=desc_font)
        line_width = line_bbox[2] - line_bbox[0]
        line_x = (width - line_width) // 2
        draw.text((line_x, y_offset), line, fill='white', font=desc_font)
        y_offset += 35
    
    # Add play button overlay
    play_center_x, play_center_y = width // 2, height // 2 + 50
    play_radius = 40
    
    # Draw play button circle
    play_bbox = [
        play_center_x - play_radius,
        play_center_y - play_radius,
        play_center_x + play_radius,
        play_center_y + play_radius
    ]
    draw.ellipse(play_bbox, fill=(255, 255, 255))
    
    # Draw play triangle
    triangle_points = [
        (play_center_x - 15, play_center_y - 20),
        (play_center_x - 15, play_center_y + 20),
        (play_center_x + 20, play_center_y)
    ]
    draw.polygon(triangle_points, fill='black')
    
    # Save image
    filepath = os.path.join(folder, filename)
    img.save(filepath, 'JPEG', quality=85)
    print(f"✅ Created thumbnail: {filename}")
    return True

def main():
    """Create all video thumbnails"""
    print("🎬 Creating video thumbnails for gallery...")
    
    # Create the images folder
    images_folder = create_images_folder()
    
    # Define thumbnails to create
    thumbnails = [
        {
            'filename': 'video-thumb-1.jpg',
            'title': 'Montessori Activities',
            'description': 'Watch children engage in hands-on learning activities that promote independence and creativity',
            'emoji': '🎨',
            'color': (255, 107, 157)  # Pink
        },
        {
            'filename': 'video-thumb-2.jpg',
            'title': 'Learning Through Play',
            'description': 'See how we combine education with fun activities that help children develop essential skills',
            'emoji': '🎈',
            'color': (75, 207, 250)  # Blue
        },
        {
            'filename': 'video-thumb-3.jpg',
            'title': 'Story Time Adventures',
            'description': 'Gentle stories that teach values and morals in an age-appropriate way',
            'emoji': '📚',
            'color': (120, 224, 143)  # Green
        }
    ]
    
    # Create each thumbnail
    successful = 0
    for thumb in thumbnails:
        try:
            if create_thumbnail(
                thumb['title'],
                thumb['description'],
                thumb['emoji'],
                thumb['color'],
                thumb['filename'],
                images_folder
            ):
                successful += 1
        except Exception as e:
            print(f"❌ Error creating {thumb['filename']}: {e}")
    
    print(f"\n🎉 Successfully created {successful}/{len(thumbnails)} video thumbnails!")
    print(f"📁 Thumbnails saved to: {images_folder}")
    
    if successful == len(thumbnails):
        print("\n✅ All video thumbnails are now available for the gallery!")
    else:
        print(f"\n⚠️  {len(thumbnails) - successful} thumbnails failed to create")

if __name__ == "__main__":
    main()
