# Images and Videos Usage Analysis

## Key Finding: `/images/` is the Standard Path Convention

**Note**: All images are now stored in the R2 `images/` folder.

The `/images/` path convention:
- Gets converted to R2 (Cloudflare) bucket URLs via `getImageUrl()`
- Uses R2 storage system with CDN support
- Is the standard convention used throughout the codebase (50+ occurrences)

## Storage Architecture

### Current State: R2-Based Storage (Not Local Files)

**Images are NOT stored in local `public/` folders** - they're stored in Cloudflare R2:

- **Storage Location**: Cloudflare R2 bucket (configured via environment variables)
- **URL Resolution**: `getImageUrl()` converts local paths to R2 CDN URLs
- **Fallback Priority**: CDN URL → Public URL → Direct R2 URL

### Path Mapping

The `image-utils.ts` file recognizes these prefixes:
- `/images/` → R2 key: `images/...` (primary convention, actively used)
- `/imgs/` → R2 key: `imgs/...` (for placeholder GIFs and program videos)
- `/videos/` → R2 key: `videos/...` (for video files)
- `/collects/` → R2 key: `collects/...` (for collected assets)

## Code Usage Patterns

### 1. Image URL Resolution Function

**File**: `src/lib/image-utils.ts`

```typescript
export function getImageUrl(path: string): string {
  // Converts /images/ paths to R2 URLs
  // Primary convention: /images/ for all image assets
}
```

**Key Functions**:
- `getImageUrl(path)` - Main function used throughout codebase
- `getR2ImageUrl(localPath)` - Converts local paths to R2 URLs
- `shouldUseR2(path)` - Checks if path should use R2 (returns true for `/images/`, `/imgs/`, `/videos/`, `/collects/`)

### 2. Component Usage

#### OptimizedImage Component
**File**: `src/components/ui/OptimizedImage.tsx`
- Uses `getImageUrl(src)` to resolve all image paths
- Handles `/images/` paths (standard convention)
- Wraps Next.js Image component with loading states

#### Direct Image Usage
**Files using images**:
- `src/app/page-client.tsx` - Uses `/images/` paths
- `src/app/gallery/page-client.tsx` - Uses `/images/` paths
- `src/app/programs/page-client.tsx` - Uses `/images/` paths
- `src/components/sections/ProgramsSection.tsx` - Uses `/images/` paths (SVG files)
- `src/app/community/todays-story/story-content.tsx` - Uses `/images/` for video thumbnails

### 3. Video Usage

**Video Player Component**: `src/components/ui/VideoPlayer.tsx`
- Uses YouTube URLs directly
- Uses thumbnail images from `/images/` path
- Example: `thumbnail: getImageUrl('/images/video-thumb-1.jpg')`

**Video Background**: `src/components/ui/hero-video-background.tsx`
- Uses video URLs from `/videos/` path (also converted via R2)

## Path Usage Statistics

### `/images/` Path Usage (50+ occurrences)
- Gallery images: `circle-time-board-2.jpg`, `playground.jpg`, `sensorial-shelf.jpg`, etc.
- Program images: `practical-life-shelf-1.jpg`, `language-shelf.jpg`
- Video thumbnails: `video-thumb-1.jpg`, `video-thumb-2.jpg`, `video-thumb-3.jpg`
- Journal covers: `journal-dec-2024.jpg`, `journal-nov-2024.jpg`
- Hero backgrounds: `hero-bg.svg`, `slidetop-bg.jpg`

### `/imgs/` Path Usage (10+ occurrences)
- Hero background GIFs: `/imgs/community/community_journal_hero_1.gif`
- Program videos: `/imgs/programs/toddler.mp4`
- About page images: `/imgs/home/1.jpeg`, `/imgs/home/2.jpeg`

### `/videos/` Path Usage (2 occurrences)
- Main video: `/videos/friendship-daycare.mp4`

## Scripts vs. Code Reality

### Scripts Documentation:
- `download_all_images.js` → saves to `public/images/` (for upload to R2 `images/` folder)

### Code Reality:
- All images are served from R2 CDN `images/` folder
- Scripts download to local folders for **upload to R2**, not for direct use
- All images use `images/` convention

## R2 Configuration

**File**: `src/lib/r2.ts`

**Environment Variables Required**:
- `NEXT_PUBLIC_R2_ACCOUNT_ID` - R2 account ID
- `R2_BUCKET_NAME` - Bucket name
- `R2_ACCESS_KEY_ID` - Access key
- `R2_SECRET_ACCESS_KEY` - Secret key
- `NEXT_PUBLIC_R2_CDN_URL` - (Optional) CDN URL for faster delivery
- `NEXT_PUBLIC_R2_PUBLIC_URL` - (Optional) Public URL fallback

**URL Generation Priority**:
1. CDN URL (if `NEXT_PUBLIC_R2_CDN_URL` is set)
2. Public URL (if `NEXT_PUBLIC_R2_PUBLIC_URL` is set)
3. Direct R2 URL: `https://{accountId}.r2.dev/{bucketName}/{key}`

## Next.js Image Configuration

**File**: `next.config.ts`

```typescript
images: {
  qualities: [75, 85],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*.r2.dev',  // Allows all R2.dev subdomains
      pathname: '/**',
    },
  ],
}
```

This allows Next.js Image optimization to work with R2 URLs.

## Recommendations

### 1. Path Convention (Completed ✅)
- **Standard**: Use `/images/` consistently (50+ usages)
- All images now use `/images/` convention

### 2. Image Organization in R2
R2 key structure:
- `/images/logo.png` → R2 key: `images/logo.png` ✅ (standard)
- All images stored in R2 `images/` folder

**Status**: Standardized on `images/` prefix in R2 bucket.
