# PWA Implementation — Friendship Corner Daycare

> Status: implemented and verified locally (2026-08-27).
> Re-verified 2026-09-14: `npm run build` still emits `public/sw.js` from
> `src/app/sw.ts` and the manifest/screenshots resolve. No PWA changes were
> needed during the SEO/GEO pass.
> Note on naming: this file uses a `codex_` prefix per the repo's docs convention;
> no Codex prefix was defined in the table, so this was chosen to avoid collisions.
> Rename freely if you prefer a different prefix.

## Goal

Make the site installable and app-like on mobile so returning parents can add it
to their home screen, launch it standalone, and get faster repeat visits —
without turning this into a native-app project.

## What was added

| Piece | File | Notes |
| --- | --- | --- |
| Service worker source | `src/app/sw.ts` | Serwist worker: precaches build assets, runtime caching |
| Service worker registration | `src/components/providers/ServiceWorkerRegister.tsx` | Registers `/sw.js` in production only, after `load` |
| Build integration | `next.config.ts` | `withSerwist({ swSrc, swDest, disable in dev })` |
| Manifest | `public/site.webmanifest` | Added `id`, `scope`, `purpose` icons, install screenshots |
| Maskable icon | `public/icons/icon-maskable-512.png` | Generated from the Android icon (safe-zone 62%) |
| Icon generator script | `scripts/generate-maskable-icon.ts` | Re-run to regenerate the maskable icon |
| Install screenshots | `public/screenshots/home-mobile.png`, `home-desktop.png` | 390×844 narrow, 1280×800 wide |
| iOS/mobile meta tags | `src/app/layout.tsx` | `apple-mobile-web-app-capable`, title, status bar |
| Dependencies | `@serwist/next`, `serwist` (9.5.12) | Supports Next.js ≥ 14 |

Generated files `public/sw.js` / `public/swe-worker-*.js` are gitignored and
rebuilt on every `next build`; never edit them by hand.

## How the service worker works

`src/app/sw.ts` builds a Serwist worker with:

- **Precaching** — every hashed production asset (JS, CSS, fonts, images from the
  build manifest) is downloaded and cached at install time.
- **Pages (navigation): NetworkFirst** — the browser tries the network first so
  content stays fresh; if offline, the last cached version of the page is served.
- **Static assets / images / fonts: CacheFirst** — hashed URLs never change, so
  they are served instantly from cache after the first visit.
- **`skipWaiting` + `clientsClaim`** — updates activate immediately and take
  control of open tabs.
- **`navigationPreload`** — the network request for a page starts early while the
  worker boots, shaving latency on repeat visits.

## Build integration (important)

`next.config.ts` wraps the config with `withSerwist`, compiling `src/app/sw.ts`
into `public/sw.js` during `next build`. The package.json `build` script is now
`next build --webpack` because Next.js 16 defaults to Turbopack for builds and
Serwist's webpack integration is the stable path today (a Turbopack variant is
available experimentally via `@serwist/turbopack`). Development runs keep the
service worker disabled (`NODE_ENV === 'development'`), and registration also
skips non-production builds, so `npm run dev` is unaffected.

## Install criteria (what makes Chrome offer "Install")

1. HTTPS (Vercel provides it; `localhost` counts as secure for testing).
2. A web manifest with `name`/`short_name`, `start_url`, `display: standalone`,
   and 192 px + 512 px icons. ✅ present.
3. A registered service worker with a fetch handler. ✅ added.
4. A maskable icon and install screenshots. ✅ added (richer Android install UI).

iOS Safari does not show an install banner. Users add the site via **Share →
Add to Home Screen**; the new `apple-mobile-web-app-*` meta tags make that launch
standalone with the site title instead of a browser tab.

## Offline behavior and honest limitations

- Once visited, the homepage, program pages, funding, FAQ, gallery, and static
  assets work offline (last-cached version).
- The tour/contact forms **still require a network connection** — submissions are
  sent to API routes and we deliberately did not build offline form queueing.
- There are **no push notifications** (that would require a push server,
  permission prompts, and backend changes — out of scope).
- The worker caches only same-origin requests plus configured runtime routes;
  third-party embeds (Google Maps iframe, YouTube) are not offline-capable.

## How to test and verify

```bash
npm run build          # regenerates public/sw.js
npm run start -- -p 3000
```

- **Chrome DevTools → Application → Service Workers**: worker should be
  "activated and running".
- **Application → Manifest**: all icons/screenshots resolve; installability
  errors (if any) are listed there.
- **Network tab → Offline**, then reload: cached pages still load.
- Lighthouse: `installable-manifest`, `service-worker`, `maskable-icon`,
  `splash-screen`, `themed-omnibox` audits should pass.
- On a real phone: open the deployed URL, then Add to Home Screen; the icon and
  standalone launch are the acceptance criteria.

## Verification results (local production build, mobile-emulated Lighthouse)

| Metric | Live before | Local after |
| --- | --- | --- |
| Performance | 51 | 78 |
| Accessibility | 92 | 100 |
| SEO | 85 | 92 |
| Best practices | 100 | 100 |
| LCP | 6.9 s | 4.6 s (local optimizer; production CDN will be faster) |
| Total blocking time | 1,170 ms | 270 ms |
| TTI | 7.1 s | 4.6 s |
| Service worker | missing (404) | active, controls page ✅ |

## Maintenance notes

- **Rebuild after every content/code change that matters** — `public/sw.js` is
  regenerated by `next build`; Vercel does this automatically on deploy.
- **Update the install screenshots** whenever the hero/layout changes materially:
  capture at exactly 390×844 and 1280×800 and replace the files in
  `public/screenshots/` (the manifest references exact sizes).
- **Regenerate the maskable icon** with `npx tsx scripts/generate-maskable-icon.ts`
  if the logo changes.
- **Do not hand-edit `public/sw.js`**; it is build output.
- Future: migrate to `@serwist/turbopack` once stable, and revisit offline form
  queueing only if parents report needing it.
