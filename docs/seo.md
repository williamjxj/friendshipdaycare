# SEO Guide

This doc consolidates SEO notes, audits, and implementation guidance for `friendshipdaycare.com`.

## Current Implementation (Codebase)
- **Global metadata**: `src/lib/seo.ts` (defaults for title, description, OG/Twitter, canonical base).
- **Per-page metadata**: `buildPageMetadata()` in `src/lib/seo.ts`, used by `src/app/**/page.tsx`.
- **Structured data**: `src/components/seo/StructuredData.tsx` in `src/app/layout.tsx`.
- **Business profile**: `src/lib/business-profile.ts` for consistent NAP data.
- **Sitemap**: `src/app/sitemap.ts` (auto-generated sitemap.xml).
- **Robots**: `public/robots.txt` (sitemap URL + crawl rules).

### Metadata Flow (App Router)
- Server `page.tsx` exports `metadata`.
- Client `page-client.tsx` handles UI only.
- Next.js renders `<title>`, `<meta name="description">`, OpenGraph, Twitter, and canonical tags server-side.

## Public Page Inventory
| Page | Path | Primary Keyword | Local Intent |
| --- | --- | --- | --- |
| Home | `/` | Montessori daycare Coquitlam | Yes |
| About | `/about` | About Friendship Daycare | Yes |
| Programs | `/programs` | Montessori programs Coquitlam | Yes |
| Enrollment | `/enrollment` | Daycare enrollment Coquitlam | Yes |
| Contact | `/contact` | Daycare contact Coquitlam | Yes |
| Gallery | `/gallery` | Daycare gallery Coquitlam | Yes |

## Verification Checklist
### Metadata
- [ ] Each public page has a unique title and description
- [ ] Titles include location intent where relevant
- [ ] Descriptions summarize page content and include a call to action
- [ ] Canonical URLs point to `https://friendshipdaycare.com`

### Structured Data
- [ ] LocalBusiness/ChildCare schema present on all public pages
- [ ] Organization schema present with consistent business details
- [ ] JSON-LD validates without errors

### Indexing
- [ ] Sitemap includes all public pages
- [ ] `robots.txt` references sitemap and allows crawling
- [ ] No duplicate or alternate URLs indexed

### Content
- [ ] Each page has a single, descriptive H1
- [ ] Headings include local intent keywords where appropriate
- [ ] Images include descriptive alt text

### Sharing
- [ ] OpenGraph metadata present on primary pages
- [ ] Twitter metadata present on primary pages
- [ ] Share preview image loads correctly

### Performance
- [ ] LCP under 2.5 seconds on primary pages
- [ ] Lighthouse performance score 90+ on primary pages

## Recent Audit Notes
- **Lighthouse (local dev, home page)**: Performance 60, Accessibility 91, Best Practices 100, SEO 92.
- Report saved to `docs/lighthouse-local.json`.
- **axe-core (local dev, home page)**: 0 violations after fixes.

## How to Verify Quickly
1. `npm run dev`
2. Open `/`, `/about`, `/programs`, `/enrollment`, `/contact`, `/gallery`.
3. View page source and confirm:
   - `<title>` and `<meta name="description">`
   - `<link rel="canonical">`
   - `og:*` and `twitter:*` tags
4. Confirm JSON-LD scripts (LocalBusiness + Organization).
5. Check sitemap at `/sitemap.xml`.

## SEO Strategy (Shortlist)
- **Local SEO**: Google Business Profile + consistent NAP across web.
- **Content depth**: Target 500–1000+ words on key pages where appropriate.
- **Keywords**: Use natural placement in H1/H2 and early content.
- **Internal links**: Link between Programs, Enrollment, Contact, and About.
- **Media**: Use descriptive alt text; prefer optimized images.

### Example Local Keywords
- "Montessori daycare Coquitlam"
- "Preschool near Coquitlam Station"
- "Christian daycare Coquitlam"
- "Daycare Center Tri-Cities"
- "Early learning center Coquitlam BC"
