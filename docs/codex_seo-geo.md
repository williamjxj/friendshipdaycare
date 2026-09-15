# SEO & GEO — Decisions and Implementation Notes

> Status: implemented and verified locally (2026-08-27). Re-verified against the
> production build with fixes applied (2026-09-14) — see "Round 2" below.
> Companion to `codex_pwa.md`; naming per the docs convention.

## Decisions (confirmed with the owner)

1. **Indexing is English-only.** The site's language switcher is client-side
   (cookie-based), so search engines and AI crawlers only ever see the
   server-rendered English page. We accepted this rather than building `/zh`
   etc. routes. hreflang stays `en` + `x-default`. If multilingual indexing
   becomes a goal later, that is the one structural change required.
2. **`Google-Extended` remains allowed in `robots.txt`.** Recommendation given
   the goal of top SEO/GEO visibility: blocking it has zero effect on Google
   search rankings and would only remove the site from Gemini training data.
   Keep it allowed.
3. **Performance budget:** LCP < 2.5 s and Lighthouse Performance ≥ 80 on mobile
   in production. Local results are close (78; LCP 4.6 s on the un-cached local
   image optimizer) and production CDN caching should close the gap. Re-measure
   after deploy with PageSpeed Insights.

## Postal code (NAP consistency)

Confirmed against Google Maps: **2950 Dewdney Trunk Rd, Coquitlam, BC V3C 2J4**.
This matches `src/lib/business-profile.ts` and `public/llms.txt`. The `V3C 6E7`
value in the older GrowthPilot audit doc was wrong — do not propagate it. Keep
the same NAP everywhere (code, llms.txt, Google Business Profile, directories).

## What changed

### Performance (Phase 1)

- Hero carousel now renders slides through `next/image` with responsive srcset,
  AVIF/WebP, and `fetchpriority="high"` on the first slide. Previously the LCP
  hero background was fetched raw from R2 at ~392 KB; now it is optimized and
  preloaded (`src/components/ui/hero-image-carousel.tsx`).
- Removed misplaced `priority` on below-the-fold images (contact photo, gallery
  carousels) so they no longer compete with the hero for preload bandwidth.
- GSAP section-header animations now run `once: true` instead of reversing on
  scroll, cutting repeat style/layout work.
- Header logo no longer served `unoptimized` (was a 166 KB PNG).
- `npm run build` pinned to `next build --webpack` (see PWA doc).

### SEO (Phase 3)

- `<link rel="alternate" type="text/markdown" href="/llms.txt">` added to the
  document head so AI crawlers discover the LLM-friendly summary.
- "Get Directions" link now always carries a real `href` (Google Maps fallback),
  fixing the non-crawlable anchor (Lighthouse SEO 85 → 92).
- Program "Learn More" links gained descriptive accessible names.
- Sitemap `lastmod` updated for weekly-changing pages (Today's Story, Journal,
  Service Area, Gallery) and a maintenance note added to
  `src/lib/site-map-entries.ts`.

### Accessibility (also an SEO/GEO quality signal)

- Default/violet/playful theme `--primary` colors darkened to pass WCAG AA
  (4.5:1) with white text — the hero info chips and header CTA now pass
  contrast (Lighthouse accessibility 92 → 100).
- Mobile language toggle button gained `aria-label`, `aria-expanded`, and
  `aria-haspopup`.

## Round 2 — verification and fixes (2026-09-14)

The Phase 1–3 work above was re-verified against the built site (production
build, real HTTP responses) rather than against the source alone. Four defects
were found that were silently undoing part of the earlier SEO work.

### Verified working (no change needed)

- Structured data is server-rendered and complete on every route: WebSite,
  ChildCare/LocalBusiness (with geo, hours, areaServed, aggregateRating),
  EducationalOrganization, FAQPage, Course, BreadcrumbList.
- Canonical URL + `hreflang` (`en`, `x-default`) on every page.
- `<link rel="alternate" type="text/markdown" href="/llms.txt">` in the head.
- `llms.txt` / `llms-full.txt` served at 200; robots.txt names the AI crawlers
  and points at the sitemap; sitemap.xml lists all 17 routes with image entries.

### 1. Soft 404 on unknown program URLs (fixed)

`/programs/<unknown>` returned **HTTP 200** with the homepage's default title,
`robots: index, follow`, and the homepage canonical — an indexable duplicate,
the opposite of the "unknown slugs → noindex 404" note in Session 3.

Cause: the root layout reads the locale cookie, so every route renders
dynamically. The response status is committed before `notFound()` is reached
and the not-found UI streams into an already-200 response; `dynamicParams =
false` has no effect on a dynamically rendered route.

Fix: `src/proxy.ts` (middleware) now runs before rendering and returns a real
404 — `status: 404` plus `x-robots-tag: noindex, follow` — for `/programs/<slug>`
that is not one of the three real programs. The app-level `notFound()` stays as
a fallback.

### 2. Brand suffix pushed titles past the SERP limit (fixed)

Next.js applies the layout's `title.template` to every **child** segment, so
page titles were rendered with the brand appended after the fact:

- `/service-area` rendered a **101-character** title.
- `/gallery-new` (70), `/welcome` (67), `/programs/*` (66), `/resources` (67)
  were all past the ~60-character limit Google displays.

Note the homepage was unaffected — `app/page.tsx` sits in the same segment as
the layout, so the template never applied to it. That is exactly why the issue
was easy to miss.

Fix: `SEO_TITLE_TEMPLATE` is now `"%s | Friendship Corner Daycare"`, and
`buildPageMetadata` only lets the suffix through when the result still fits
`SEO_TITLE_MAX_LENGTH` (60); otherwise it pins an absolute title. The
`/service-area` title was also rewritten to "Tri-Cities Daycare | Port
Coquitlam & Port Moody". Every indexable page title is now ≤ 60 characters, and
a Playwright test enforces that they stay unique.

### 3. robots.txt blocked /_next/ (fixed)

Both the named AI crawlers and `*` disallowed `/_next/`, which serves the site's
CSS and JS. Googlebot must fetch those to render pages, so blocking them
degrades rendering and indexing. Only `/api/` is disallowed now.

### 4. Retired URLs 404'd instead of redirecting (fixed)

`src/proxy.ts` only covered six legacy paths, and redirected `/gallery` to a
homepage anchor even though a real gallery page exists. Now:

| Old URL | Destination |
| --- | --- |
| `/gallery` | `/gallery-new` (real page, was `/#gallery`) |
| `/team` | `/our-team` |
| `/pricing` | `/funding` |
| `/policies` | `/resources` |
| `/journal` | `/community/journal` |
| `/todays-story` | `/community/todays-story` |
| `/faq`, `/testimonials` | homepage anchors |
| `/blog` | `/community/journal` |

All redirects are now **308 (permanent)** so link equity transfers; the previous
307 responses were treated as temporary.

### Smaller improvements in the same pass

- `/service-area` has a dedicated 1200×630 OG card (`/og/service-area.png`),
  generated by `scripts/generate-og-images.sh service-area`; program pages now
  resolve their OG card by pattern instead of an enumerated list.
- Gallery breadcrumbs added (`PageBreadcrumbs` had no `/gallery-new` entry).
- Sitemap `lastmod` corrected: `/` → 2026-08-27 (hero/performance pass),
  `/service-area` and `/gallery-new` → 2026-09-14.
- `llms.txt` gained the `/service-area` entry and both LLM files carry an
  updated `Last updated` date.

### Regression guard

`tests/e2e/seo-structured-data.spec.ts` now also asserts: unknown program slug →
404 + noindex, robots.txt does not disallow `/_next/`, retired URLs → 308,
and every indexable title is ≤ 60 characters and unique.

## Maintenance checklist

- **Sitemap dates:** bump `lastModified` in `src/lib/site-map-entries.ts` when
  weekly content changes; keep the value honest (today's date when actually
  updated).
- **llms.txt / llms-full.txt:** refresh `Last updated` and facts whenever
  hours, fees, programs, or contact data change. These are what AI engines
  quote.
- **Schema:** NAP in `business-profile.ts` is the single source — keep GBP,
  llms.txt, and schema in sync. The local-business schema already carries geo,
  hours, service area, and aggregate rating.
- **Performance regression guard:** re-run the mobile Lighthouse pass after any
  hero/animation change; keep the first-slide `fetchpriority` and `once: true`
  animation settings intact.
- **Known residual items (not blocking):** desktop marquee chips still use white
  text on bright gradients (mobile hides them; decorative row is aria-hidden);
  the three program pages still share `og/home.png` (the Tri-Cities page got its
  own card on 2026-09-14) — nice-to-have for WeChat/Facebook shares.
- **Geo coordinates disagree in two places (fix when the true pin is confirmed):**
  `src/lib/business-profile.ts` (used by the LocalBusiness schema) has
  `49.2644, -122.7913`, while the `/api/maps` fallback in
  `src/app/api/maps/route.ts` has `49.2827, -122.7947`. Schema and the map should
  point at the same pin; confirm against Google Business Profile before changing
  either.
- **If a page renders a 200 for a URL that should not exist:** check
  `src/proxy.ts` first. Dynamic rendering means `notFound()` cannot change an
  already-streamed status code, so non-existent routes must be rejected in
  middleware.
