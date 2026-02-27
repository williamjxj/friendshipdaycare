# Image Management Scripts

This folder contains scripts to manage images for the Friendship Corner Daycare website.

**Note**: Images are stored in Cloudflare R2 storage and served via CDN. For local development, use these scripts to download images from R2 to your local `public/images/` folder.

For placeholder guidance and expected filenames, see `docs/images-readme.md`.

## Available Scripts

### 1. Download Images from R2 (Node.js)
```bash
node scripts/download_all_images.js
```
- **Requirements**: 
  - Node.js
  - `.env.local` file with R2 credentials
  - Packages: `@aws-sdk/client-s3`, `dotenv`
- **Install dependencies**: `npm install @aws-sdk/client-s3 dotenv`
- **Output**: `public/images/` folder
- **Purpose**: Downloads all images from Cloudflare R2 `images/` folder to local `public/images/` for development

### 2. Download Images from R2 (Python)
```bash
python3 scripts/download_all_images.py
```
- **Requirements**: 
  - Python 3
  - `.env.local` file with R2 credentials
  - Packages: `boto3`, `python-dotenv`
- **Install packages**: `pip install boto3 python-dotenv`
- **Output**: `public/images/` folder
- **Purpose**: Downloads all images from Cloudflare R2 `images/` folder to local `public/images/` for development

### 3. Bidirectional Sync for imgs/ Folder (Node.js)
```bash
# Download from R2 to local
node scripts/sync_imgs.js download

# Upload from local to R2 (overwrites originals)
node scripts/sync_imgs.js upload
```
- **Requirements**: 
  - Node.js
  - `.env.local` file with R2 credentials
  - Packages: `@aws-sdk/client-s3`, `dotenv`
- **Install dependencies**: `npm install @aws-sdk/client-s3 dotenv`
- **Purpose**: 
  - **Download**: Recursively downloads all files from R2 `imgs/` folder to local `public/imgs/`, preserving folder structure
  - **Upload**: Recursively uploads all files from local `public/imgs/` to R2 `imgs/` folder (overwrites originals)
- **Workflow**: Download → Edit locally → Upload back to R2

### 4. Create Video Thumbnails
```bash
python3 scripts/create_video_thumbnails.py
```
- **Requirements**: Python 3 with PIL/Pillow library
- **Output**: `public/images/` folder
- **Purpose**: Creates 3 video thumbnail placeholders with emojis, text, and play buttons for gallery video section

### 5. Generate Placeholders
```bash
./scripts/generate-placeholders.sh [page-name] [section-name] [sequence-number]
```
- **Requirements**: Bash
- **Output**: `public/placeholders/` folder
- **Purpose**: Creates basic SVG placeholder images for hero sections

## R2 Configuration

To use the download scripts, you need a `.env.local` file in the project root with the following R2 credentials:

```env
# R2 Bucket Configuration
R2_BUCKET_NAME=your-bucket-name
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
NEXT_PUBLIC_R2_ACCOUNT_ID=your-account-id

# Optional: CDN URL for serving images
NEXT_PUBLIC_R2_CDN_URL=https://pub-xxxxx.r2.dev
```

You can find these credentials in your [Cloudflare R2 Dashboard](https://dash.cloudflare.com) under your bucket settings.

## Images in R2

The scripts download images from the R2 bucket's `images/` folder. Expected images (12 total):

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

After downloading images from R2 to local `public/images/`, use them in your React components like this:

```jsx
import Image from 'next/image';
import { getImageUrl } from '@/lib/image-utils';

// In production: uses R2 CDN URL
// In development: uses local /images/ path
<Image
  src={getImageUrl('/images/playground.jpg')}
  alt="Playground area"
  width={400}
  height={300}
  className="rounded-lg"
/>
```

**Important**: 
- **Production**: Images are served from R2 CDN via `getImageUrl()` helper
- **Local Development**: Download images from R2 to `public/images/` using these scripts
- **Path Convention**: Always use `/images/` paths in code (works for both local and production)

## Workflow

### For Local Development
1. Ensure you have `.env.local` file with R2 credentials
2. Run download script: `node scripts/download_all_images.js` or `python3 scripts/download_all_images.py`
3. Images are downloaded to `public/images/` for local development
4. Use `getImageUrl('/images/filename.jpg')` in your components

### For Production
- Images are automatically served from R2 CDN
- No local images needed in production
- `getImageUrl()` helper resolves to R2 CDN URL

## Features

- ✅ Downloads all images from Cloudflare R2 storage
- ✅ Saves to local `public/images/` folder for development
- ✅ Secure access using R2 credentials
- ✅ Progress tracking and download summary
- ✅ Error handling and retry logic
- ✅ Lists all available images before downloading

## Notes

- **R2 Storage**: Images are stored in Cloudflare R2 `images/` folder
- **Production Serving**: Images served via R2 CDN (no local storage needed)
- **Local Development**: Download images locally using these scripts
- **Path Convention**: Use `/images/` paths in code (works for both environments)
- **Access Control**: Requires R2 credentials in `.env.local`
- **File Naming**: Filenames are preserved from R2

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
