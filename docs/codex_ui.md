# UI / UX Review and Fixes

> Status: audited against the live site on 2026-09-14, fixes implemented and
> verified against a local production build. Companion to `codex_seo-geo.md`
> and `codex_pwa.md`.

## How the audit was run

Everything below is measured, not estimated:

- **Screenshots** — headless Chromium at 1440 × 900 and 390 × 844 (2× DPR).
- **Accessibility** — axe-core (WCAG 2.0/2.1 A + AA, plus best practice) on
  `/`, `/funding`, `/gallery-new`, `/welcome`, `/service-area` at mobile width.
- **Contrast proof** — axe's computed colours cross-checked by sampling pixels
  of the rendered text band with `sharp` (mean luminance + light/dark share),
  because axe can mis-detect backgrounds behind images.
- **Layout** — DOM geometry via `getBoundingClientRect`: hero size, section
  offsets, tap-target sizes, fixed/sticky detection, font sizes.
- **Root cause** — computed-style walk up the DOM plus the matching rules in
  `src/app/globals.css`.

## Findings and what changed

### 1. The gallery headline was invisible (critical, fixed)

`/gallery-new` renders two `bg-zinc-950 text-white` hero bands. The heading
computed to `rgb(0,0,0)` on `#09090b` — **1.05:1 contrast** — and the intro
paragraphs to **1.93:1**. Pixel sampling of the heading band found **0% light
pixels**, i.e. no visible text at all.

**Root cause:** `globals.css` set heading and paragraph colours as _unlayered_
element rules (`h1 { color: #000000 }`, `p { color: var(--foreground) }`).
Unlayered rules beat Tailwind's utilities, so `text-white` / `text-zinc-400`
never applied.

**Fix:** those element colours now live in `@layer base` and use
`color: inherit`, so a section that sets its own text colour also controls its
headings, and colour utilities win again. `body { color: var(--foreground) }`
remains the default.

**Result:** the heading computes to `rgb(255,255,255)`; visible-text pixels in
the sampled band went from **0% → 11.7%**; axe reports **0 violations** on the
page.

The same fix hardens every dark surface, including the Dark theme, which was
exposed to the same trap.

### 2. Every page had two `<main>` landmarks (fixed)

`SiteShell` rendered `<main role="main">` and each page rendered its own
`<main id="main-content">`, so axe reported `landmark-no-duplicate-main`,
`landmark-main-is-top-level` and `landmark-unique` on every route, and
"skip to main content" could land inside the wrong region.

**Fix:** `SiteShell` owns the single `<main id="main-content">`. Pages render a
plain container: `page-client.tsx`, `funding`, `our-team`, `service-area`,
`welcome`, `gallery-new`, `StaticContentPage`.

Dropping the `role="main"` attribute lets `<main>` supply the landmark
implicitly (one landmark, one name), and `mainRef` in the homepage was retyped
to `HTMLDivElement`.

**Result:** exactly one `<main id="main-content">` on all five audited routes;
the landmark violations are gone.

### 3. The homepage had no persistent action on mobile (fixed)

`MobileCtaBar` returned `null` on `/` because the hero has its own buttons — but
the homepage is **21,030 px ≈ 25 screens** tall at 390 × 844, with fees ~16
screens down and the FAQ ~21. Measured: **zero** fixed/sticky bottom actions at
the top and after scrolling 3,000 px.

**Fix:** removed the homepage exemption; the sticky Call / Book-a-Tour bar now
renders on every route except `/welcome` (form page, unchanged) and renders
inside `<main>`, so there is no duplicate-landmark regression.

### 4. Ten tap targets were below the 44 px minimum (fixed)

Measured on the mobile homepage: program "Learn more" links 107 × 26, the
registration download 232 × 26, phone 104 × 26, email 167 × 26, "Get
Directions" 109 × 20.

**Fix:** added an `fdc-tap-target` helper (`min-height: 44px`, inline-flex,
centred) in `globals.css` and applied it to the phone/email links, footer
contact links, breadcrumb links, the program "Learn more" links, the
registration download, the funding "Visit BC benefit page" links and the map
"Get Directions" link.

**Result:** mobile homepage undersized targets **10 → 1** (the remaining one is
the visually-hidden skip link, which is exempt).

### 5. Smaller cleanups in the same pass

- `aside.fdc-panel` panels inside `<main>` (funding, resources, service-area,
  community pages) triggered `landmark-complementary-is-top-level`; they are
  layout panels, not complementary landmarks, so they are now `<div>`s.
- Footer "Scan to view on mobile" caption was
  `text-[10px] text-muted-foreground/60` (**2.28:1**); now
  `text-[11px] text-muted-foreground` (≥ 4.5:1).
- The Best IT Consulting logo carried `alt="Best IT Consulting"` next to the
  same text; it is decorative now (`alt=""`), clearing `image-redundant-alt`.

## Verified state after the changes

| Route | axe violations | `<main>` landmarks | Undersized tap targets |
| --- | --- | --- | --- |
| `/` | 0 | 1 | 1 (hidden skip link) |
| `/gallery-new` | 0 | 1 | 1 (hidden skip link) |
| `/funding` | 0 | 1 | 1 (hidden skip link) |
| `/service-area` | 0 | 1 | 1 (hidden skip link) |
| `/welcome` | 0 | 1 | 1 (hidden skip link) |

Before: gallery 5 _serious_ contrast violations; 2 `<main>`s per page; 10
undersized targets on the homepage and no sticky action on `/`.

## Deliberately not changed (needs owner sign-off)

- **Hero re-proportion.** The hero image renders 468 × 1,215 CSS px against an
  844 px viewport (1.44 screens) with the H1 at y=281 and six interactive
  elements above the fold. Shrinking it changes the brand's first impression,
  so it is queued as P2 pending an approved headline.
- **Tour form length.** `/welcome` is the cleanest page (7 fields, all labelled,
  46 px inputs, zero axe violations) but asks seven required answers before a
  parent can request a visit. Trimming to age-band + optional message needs a
  decision on what the team actually needs to schedule a tour.
- **Homepage hero CTAs** still say "Call Now" while the sticky bar says "Call
  Us"; differentiation belongs with the hero rework.

## Re-running the audit

```bash
npm run build && npm run start -- -p 3100
# then, against http://127.0.0.1:3100 (scripts kept in the review artifact dir)
#   - axe-core via the Playwright chromium
#   - getBoundingClientRect metrics for tap targets and landmarks
```

The audit scripts themselves live in `.lavish/` (gitignored) alongside the
review artifact, so they can be recreated from this document if needed.
