# ScrollSpy: How It Works

## Do you need to merge everything into one page?

**No.** ScrollSpy works with sections on a single page. You do **not** need to merge all content (Programs, Enrollment, Gallery, etc.) into the homepage.

### Two common approaches

| Approach | Example | How it works |
|----------|---------|--------------|
| **Single-page site** | [Manna Family Hotel](https://manna-family-hotel.vercel.app/) | All content lives on `/`. Nav links like `/#about`, `/#contact` scroll to sections. ScrollSpy highlights the active section. |
| **Hybrid (current)** | Friendship Daycare | Homepage has scrollable sections (home, about, testimonials, videos, contact). Standalone pages for Programs, Enrollment, Gallery. ScrollSpy **only on homepage**. On `/programs`, nav links go to full pages. |

### Why hybrid is better for SEO

- **Multiple URLs** = more indexable pages, each with unique title/description
- **Targeted keywords** per page (e.g. `/programs` = "Montessori Programs Coquitlam")
- **Canonical structure** and clear sitemap for Google

Manna Family Hotel is a small B&B with fewer content types, so a single-page layout fits. A daycare has Programs, Enrollment, Gallery, Policies, etc.—keeping these as separate pages is better for SEO and UX.

---

## How ScrollSpy works (technical)

1. **Section IDs**: Homepage sections have `id="home"`, `id="about"`, `id="testimonials"`, `id="videos"`, `id="contact"`.

2. **Intersection Observer**: `useScrollSpy(sectionIds, offset)` observes each section. When a section enters the viewport (with `rootMargin` for the fixed header), its `id` becomes `activeId`.

3. **Header nav**: On `/`, nav links are `/#about`, `/#contact`, etc. Clicking scrolls to the section. While scrolling, the nav highlights the section currently in view (`activeId`).

4. **Other pages**: On `/programs`, ScrollSpy is off (`sectionIds: []`). Nav links go to `/programs`, `/enrollment`, etc.

---

## Files

- **Hook**: `src/hooks/useScrollSpy.ts`
- **Header**: `src/components/layout/Header.tsx` (uses `useScrollSpy` when `pathname === '/'`)
- **Homepage sections**: `src/app/page-client.tsx` (section IDs for ScrollSpy)
