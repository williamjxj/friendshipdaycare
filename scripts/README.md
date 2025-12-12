# Image Download Scripts

This folder contains scripts to download images from the original Friendship Corner Daycare website gallery and save them to the `public/static/` folder for use in the new website.

## Available Scripts

### 1. Bash Script (Recommended)
```bash
./scripts/download_gallery_images.sh
```
- **Requirements**: `curl` (usually pre-installed on macOS/Linux)
- **Fastest and most reliable option**

### 2. Node.js Script
```bash
node scripts/download_gallery_images.js
```
- **Requirements**: Node.js
- **Good for JavaScript developers**

### 3. Python Script
```bash
python3 scripts/download_gallery_images.py
```
- **Requirements**: Python 3 with `requests` library
- **Install requests**: `pip install requests`

## What Gets Downloaded

The scripts download the following images from `http://www.friendshipdaycare.com/gallery`:

1. `friendship-corner-daycare-logo.png` - The daycare logo
2. `playground.jpg` - Outdoor playground area
3. `circle-time-area.jpg` - Circle time learning area
4. `sensorial-shelf.jpg` - Montessori sensorial materials
5. `language-shelf.jpg` - Language learning materials
6. `practical-life-shelf-1.jpg` - Practical life activities (shelf 1)
7. `practical-life-shelf-2.jpg` - Practical life activities (shelf 2)
8. `math-shelf.jpg` - Mathematics learning materials
9. `culture-shelf.jpg` - Cultural studies materials
10. `circle-time-board-2.jpg` - Circle time board display
11. `art-themed-board-2.jpg` - Art-themed display board
12. `toys.jpg` - Toys and pretend play area

## Usage in Your Gallery Component

After running any of the scripts, you can use the images in your React components like this:

```jsx
import Image from 'next/image';

// Example usage in gallery
<Image
  src="/static/playground.jpg"
  alt="Playground area"
  width={400}
  height={300}
  className="rounded-lg"
/>
```

## File Structure

```
public/
└── static/
    ├── friendship-corner-daycare-logo.png
    ├── playground.jpg
    ├── circle-time-area.jpg
    ├── sensorial-shelf.jpg
    ├── language-shelf.jpg
    ├── practical-life-shelf-1.jpg
    ├── practical-life-shelf-2.jpg
    ├── math-shelf.jpg
    ├── culture-shelf.jpg
    ├── circle-time-board-2.jpg
    ├── art-themed-board-2.jpg
    └── toys.jpg
```

## Features

- ✅ Downloads all gallery images from the original website
- ✅ Renames files to use consistent lowercase naming
- ✅ Creates the `public/static/` folder automatically
- ✅ Includes error handling and retry logic
- ✅ Shows download progress and summary
- ✅ Respectful delays between downloads
- ✅ Browser-like headers to avoid blocking

## Notes

- Images are saved to `public/static/` and will be accessible at `/static/filename.jpg` in your Next.js app
- The scripts are respectful and include delays between downloads
- All scripts include error handling for failed downloads
- File names are normalized to lowercase with hyphens for consistency

## Script Reference Table

| Script | Language | Purpose | Output Directory | Description |
|--------|----------|---------|------------------|-------------|
| `create_video_thumbnails.py` | Python | Generate thumbnails | `public/images/` | Creates 3 video thumbnail placeholders with emojis, text, and play buttons for gallery video section |
| `download_all_images.js` | Node.js | Download images | `public/images/` | Downloads 12 known images from the original website to the images folder |
| `download_all_images.py` | Python | Download images | `public/images/` | Comprehensive script that scans multiple pages and downloads all images found (uses BeautifulSoup for HTML parsing) |
| `download_gallery_images.js` | Node.js | Download gallery images | `public/static/` | Downloads 12 specific gallery images from the original website to the static folder |
| `download_gallery_images.py` | Python | Download gallery images | `public/static/` | Downloads 12 specific gallery images from the original website to the static folder |
| `download_gallery_images.sh` | Bash | Download gallery images | `public/static/` | Downloads 12 specific gallery images using curl (fastest option, recommended) |
| `update_logos.sh` | Bash | Update logos | N/A | Placeholder script that marks files for manual logo updates across multiple pages |
