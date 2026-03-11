# Quickstart: Website Simplify & Optimize

**Branch**: `004-website-optimization`

## Prerequisites

- Node.js 20+
- `npm install` completed
- `.env.local` with `RESEND_API_KEY` for contact form (optional for local dev)

## Run Locally

```bash
npm run dev
```

Open http://localhost:3000

## Key Implementation Tasks

### 1. ScrollSpy Hook

Create `src/hooks/useScrollSpy.ts`:

- Input: `sectionIds: string[]`, optional `offset: number`
- Use `IntersectionObserver` with `rootMargin` for sticky header
- Return `activeId: string` (current section in view)
- Clean up observers on unmount

### 2. Header / Navbar Updates

- On homepage: nav links become `/#about`, `/#programs`, `/#contact`, etc.
- Apply `activeId` from `useScrollSpy` to highlight active nav item
- Ensure phone and email are visible in header or footer

### 3. Remove PageHero from Sub-pages

| Page | Action |
|------|--------|
| `/about` | Replace PageHero with simple `<h1>` + optional breadcrumbs |
| `/programs` | Same |
| `/contact` | Same |
| `/gallery` | Same |
| `/enrollment` | Same |
| `/community/ece` | Same |
| `/community/montessori` | Same |
| `/community/journal` | Same |
| `/community/todays-story` | Same |

### 4. Homepage Hero

- Keep `HeroSection` as-is or enhance with inline contact CTA (phone, email, "Book a Tour")
- Add section ids for ScrollSpy: `id="hero"`, `id="about"`, `id="programs"`, etc.

### 5. Content Audit

- Audit About, Programs pages for redundant text
- Condense to bullets; remove duplicate "benefits" blocks
- Limit testimonials to 3–4 unique; remove重复
- Identify and remove unused images (grep imports, check `public/`)

### 6. SEO

- Verify `metadata` in `layout.tsx` and page-level metadata
- Add/update LocalBusiness JSON-LD in `StructuredData` component
- Ensure sitemap and robots are valid
- Add keyword-rich alt text to images

## File Changes Summary

| File | Change |
|------|--------|
| `src/hooks/useScrollSpy.ts` | NEW |
| `src/components/layout/Header.tsx` | Add ScrollSpy, anchor links on homepage |
| `src/app/page-client.tsx` | Add section ids; optionally integrate ScrollSpy |
| `src/app/about/page-client.tsx` | Remove PageHero |
| `src/app/programs/page-client.tsx` | Remove PageHero |
| `src/app/contact/page-client.tsx` | Remove PageHero |
| `src/app/gallery/page-client.tsx` | Remove PageHero |
| `src/app/enrollment/page-client.tsx` | Remove PageHero |
| `src/app/community/*/page-client.tsx` | Remove PageHero from each |
| `src/lib/seo.ts` | Review/update metadata per research |
| `src/components/seo/StructuredData.tsx` | Ensure LocalBusiness schema complete |

## Testing

- **ScrollSpy**: Scroll homepage; verify nav highlights correct section
- **Contact**: Submit form; verify emails received
- **Hero removal**: Visit each sub-page; confirm no decorative hero
- **Performance**: Run Lighthouse; target LCP < 3s, performance ≥ 80
- **SEO**: Validate LocalBusiness schema; check meta tags

## Reference Docs

- [research.md](./research.md) — Decisions and rationale
- [data-model.md](./data-model.md) — Entities and validation
- [contracts/contact-api.md](./contracts/contact-api.md) — Contact API contract
