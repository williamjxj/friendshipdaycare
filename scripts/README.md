# Image Download Scripts

This folder contains scripts to download images from the original Friendship Corner Daycare website gallery. 

**Note**: Images are uploaded to R2 (Cloudflare) storage, not stored locally. All images should be uploaded to the R2 `images/` folder.

For placeholder guidance and expected filenames, see `docs/images-readme.md`.

## Available Scripts

### 1. Download All Images (Node.js)
```bash
node scripts/download_all_images.js
```
- **Requirements**: Node.js
- **Output**: `public/images/` folder
- **Purpose**: Downloads 12 known images from the original website for upload to R2 `images/` folder

### 2. Download All Images (Python)
```bash
python3 scripts/download_all_images.py
```
- **Requirements**: Python 3 with `requests` library
- **Install requests**: `pip install requests`
- **Output**: `public/images/` folder
- **Purpose**: Comprehensive script that scans multiple pages and downloads all images found (uses BeautifulSoup for HTML parsing)

### 3. Create Video Thumbnails
```bash
python3 scripts/create_video_thumbnails.py
```
- **Requirements**: Python 3 with PIL/Pillow library
- **Output**: `public/images/` folder
- **Purpose**: Creates 3 video thumbnail placeholders with emojis, text, and play buttons for gallery video section

### 4. Generate Placeholders
```bash
./scripts/generate-placeholders.sh [page-name] [section-name] [sequence-number]
```
- **Requirements**: Bash
- **Output**: `public/placeholders/` folder
- **Purpose**: Creates basic SVG placeholder images for hero sections

## What Gets Downloaded

The download scripts download the following images from `http://www.friendshipdaycare.com`:

1. `daycare-logo.png` - The daycare logo
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

## Usage in Your Components

After downloading images and uploading them to R2, use them in your React components like this:

```jsx
import Image from 'next/image';
import { getImageUrl } from '@/lib/image-utils';

// Example usage in gallery (using /images/ convention)
<Image
  src={getImageUrl('/images/playground.jpg')}
  alt="Playground area"
  width={400}
  height={300}
  className="rounded-lg"
/>
```

**Important**: 
- Images are stored in R2 `images/` folder (not local `public/` folders)
- All images are served via R2 CDN using `getImageUrl()` helper

## Features

- ✅ Downloads all gallery images from the original website
- ✅ Renames files to use consistent lowercase naming
- ✅ Creates local folders for temporary storage before R2 upload
- ✅ Includes error handling and retry logic
- ✅ Shows download progress and summary
- ✅ Respectful delays between downloads
- ✅ Browser-like headers to avoid blocking

## Notes

- **R2 Storage**: Images are stored in R2 `images/` folder (not stored locally)
- **Path Convention**: Use `/images/` paths in code
- **Upload Process**: Images should be uploaded to R2 manually via Cloudflare dashboard or other R2 management tools
- **File Naming**: File names are normalized to lowercase with hyphens for consistency
- **Access**: Images are accessed via `getImageUrl('/images/filename.jpg')` which resolves to R2 CDN URLs

## Script Reference Table

| Script | Language | Purpose | Output Directory | Description |
|--------|----------|---------|------------------|-------------|
| `create_video_thumbnails.py` | Python | Generate thumbnails | `public/images/` | Creates 3 video thumbnail placeholders with emojis, text, and play buttons for gallery video section |
| `download_all_images.js` | Node.js | Download images | `public/images/` | Downloads 12 known images from the original website (for upload to R2 `images/` folder) |
| `download_all_images.py` | Python | Download images | `public/images/` | Comprehensive script that scans multiple pages and downloads all images found (uses BeautifulSoup for HTML parsing) |
| `generate-placeholders.sh` | Bash | Generate placeholders | `public/placeholders/` | Creates basic SVG placeholder images for hero sections |

## Uploading to R2

After downloading images using the scripts above, upload them to your Cloudflare R2 bucket:

1. **Manual Upload**: Use Cloudflare dashboard to upload files to R2 `images/` folder
2. **R2 API**: Use Cloudflare R2 API or CLI tools to upload files programmatically
3. **Third-party Tools**: Use R2-compatible S3 tools (R2 is S3-compatible)

**Note**: Images are stored in R2 `images/` folder and accessed via `getImageUrl('/images/filename.jpg')` in your code.
