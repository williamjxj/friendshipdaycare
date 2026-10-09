# Public asset management

`public/` contains files the website serves directly. Preserve existing URLs used by the UI, search engines, downloadable registration forms, and installed PWAs.

| Location | Purpose |
| --- | --- |
| `assets/` | Parent registration documents |
| `images/` | Classroom/gallery photos; paths also map to R2 |
| `images/home/` | Local homepage hero photos |
| `og/` | Social sharing preview images |
| `icons/` | Browser and PWA icons |
| `screenshots/` | PWA installation screenshots referenced by the manifest |
| Root logos, manifests, `llms*.txt` | Stable website/SEO/PWA URLs |
| `sw.js`, `swe-worker-*.js` | Ignored production build output |

Promotional originals belong in `posters/`. Server-only email HTML lives in `src/lib/email/templates/customer-confirmation.html`, with explicit tracing for the contact and welcome API bundles.

Run `npm run optimize:public` for lossless PNG compression (Python 3 with Pillow). It preserves dimensions, decoded RGBA pixels, transparency, and PNG color information, skips animated or rotated images, and only replaces files when smaller. JPEGs, videos, PDFs, and URLs are left unchanged. Images are never resized or quantized.

Run browser regressions with `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` when using an installed Chrome instead of Playwright's bundled Chromium.

Classroom photos and website illustrations share `images/`. Legacy `/collects/`, `/imgs/home/`, program image URLs, and `/favicon_io/` still work through rewrites. Existing R2 `collects/` keys remain unchanged. The unused favicon export manifest is replaced by the active root manifest. Marketing files in `posters/` are flat; source originals and alternate print/social formats are retained unless explicitly approved for deletion.

The retired promotion popup, promotional cards, and marketing-copy lifecycle hooks are removed. The contact/team/resources image fallback uses `/images/canva-1.png`. `npm run generate:welcome-qr` writes only to `posters/`.

Run `PLAYWRIGHT_CHANNEL=chrome npm run test:production` for the production build plus full app/UI and SEO/GEO checks. See [production verification](production-verification.md).
