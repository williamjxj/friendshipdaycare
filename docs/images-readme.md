# Image Placeholder Guidance

**Last Updated**: 2026-01-29  
**Storage**: Images are stored in R2 (Cloudflare) bucket, not locally

This document lists image placeholders expected by the UI so real assets can replace them.

## Placeholder Inventory

- `playground.jpg` — outdoor playground
- `montessori-classroom.jpg` — classroom environment
- `arts-crafts.jpg` — arts and crafts activity
- `reading-corner.jpg` — reading corner
- `group-activities.jpg` — group activities
- `video-thumb-1.jpg` — video thumbnail 1
- `video-thumb-2.jpg` — video thumbnail 2
- `video-thumb-3.jpg` — video thumbnail 3

## Replacement Steps

1. Capture real daycare photos.
2. Optimize for web (size + compression).
3. Upload to R2 `images/` folder via Cloudflare dashboard or R2 API tools.
4. Use `/images/` path convention in code (e.g., `getImageUrl('/images/playground.jpg')`).

**Note**: Images are served from R2 CDN, not from local `public/images/` folder. See `docs/images-videos-usage-analysis.md` for details.
