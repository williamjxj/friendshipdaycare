# Friendship Corner Daycare — Improvement Plan
**Site:** www.friendshipdaycare.com | **Repo:** github.com/williamjxj/friendshipdaycare  
**Date:** March 2026

---

## 1. Executive Summary

The site has solid bones — real photos, genuine reviews, clean code — but it has three compounding problems that hurt both UX and SEO:

1. **Too scattered**: 6 separate pages mean parents must click around to find basic info.
2. **Contact is buried**: The form lives at `/contact`, two levels away from first impressions.
3. **Invisible to Google**: Page titles and content don't speak the language parents actually type.

The recommended fix is **one scroll → one page**, with a sticky ScrollSpy navbar. Every key section (About, Programs, Gallery, Reviews, Contact) becomes an anchor on the homepage. This satisfies the manager, dramatically improves first-glance clarity, and concentrates all keyword authority on a single URL.

---

## 2. Current Pain Points (Audit)

### 2.1 UX / Structure

| Problem | Detail |
|---|---|
| Redundant hero sections | `/about`, `/programs`, `/contact`, `/gallery` all have their own decorative GIF heroes. They look identical and add zero value. |
| Contact form isolation | The most important conversion action (book a tour) requires navigating to a separate page. |
| Verbose copy | About page: 3+ paragraphs explaining ECE licensing. Programs page: 2 separate "benefits" text blocks. Most parents skim — they don't read. |
| Fragmented multi-theme / multi-language UI | Theme switcher and language dropdown are prominent UI elements, but a Coquitlam Montessori daycare's audience is overwhelmingly local English speakers with a Chinese-speaking subset. This complexity distracts rather than helps. |
| No social proof links | Reviews are shown as static text cards but there are no clickable Google, Facebook, or Instagram links. |
| No social media presence visible | No Facebook or Instagram links in the header, hero, or footer. |

### 2.2 SEO Issues

| Problem | Impact |
|---|---|
| Weak `<title>` tags | `/about` title is "We are Montessori ECE", `/contact` is "Get in Touch With Us" — these contain zero local keywords. Google uses these for ranking. |
| No Local Business schema | Missing JSON-LD `LocalBusiness` / `ChildCare` structured data — Google uses this to populate Maps and Knowledge Panel. |
| No Google Business Profile signals on-site | Site doesn't reference GMB, doesn't embed a direct Maps link, doesn't show star rating aggregate. |
| Split content authority | 6 URLs sharing thin content each. A single-page site concentrates all `Coquitlam daycare` keyword signals on one URL. |
| Missing `alt` attribute keyword density | Many images use generic alt text ("Montessori classroom view 1"). These are crawled and counted. |
| No Open Graph / social preview tags | Sharing the URL on Facebook/WeChat shows no preview image or description. |
| Missing local signals in body copy | Key phrases like "Coquitlam", "Tri-Cities", "Port Coquitlam", "SkyTrain" are sparse across pages. |
| No sitemap submitted to GSC | Sitemap exists at `/sitemap` but its submission status to Google Search Console is unknown. |
| Core Web Vitals risk | GIF hero images on sub-pages (about_hero_1.gif, contact_hero_1.gif) are large unoptimized files that hurt LCP. |

---

## 3. Proposed Architecture: Single-Page ScrollSpy App

### 3.1 Navigation Structure

Convert from 6-page multi-route app to a **single homepage with anchor sections**. Keep `/enrollment`, `/gallery`, `/privacy`, `/terms` as standalone routes (they serve a different purpose), but collapse the core experience:

```
/ (homepage, one long scroll)
  ├── #hero       → Logo + tagline + inline mini contact form
  ├── #about      → 3-column "Why us" cards, 16 years badge
  ├── #programs   → Toddler / Preschool / Pre-K cards
  ├── #gallery    → Photo grid preview (link to /gallery for full)
  ├── #reviews    → Existing Google review carousel
  └── #contact    → Full contact form + map + hours + social links

/enrollment        → Keep as standalone (PDF form download)
/gallery           → Keep as standalone (full photo/video gallery)
/privacy, /terms   → Keep
```

### 3.2 ScrollSpy Navbar

The existing navbar links (`About`, `Programs`, `Gallery`, `Contact`) should become **in-page anchor links** on the homepage. As the user scrolls, the active section's nav link gets highlighted.

**Implementation (Next.js):**

```tsx
// hooks/useScrollSpy.ts
import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 80) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: `-${offset}px 0px -60% 0px` }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [sectionIds, offset])

  return activeId
}
```

```tsx
// components/layout/Navbar.tsx — updated nav links
const navLinks = [
  { label: 'About',    href: '/#about'    },
  { label: 'Programs', href: '/#programs' },
  { label: 'Gallery',  href: '/#gallery'  },
  { label: 'Contact',  href: '/#contact'  },
]

// Apply active class when activeId matches section
<Link
  href={link.href}
  className={cn('nav-link', activeId === link.id && 'text-primary font-semibold border-b-2 border-primary')}
>
  {link.label}
</Link>
```

### 3.3 Hero Section — Inline Contact Form

The hero needs to do **two jobs at once**: make an emotional first impression AND give parents an immediate way to act. The current hero only does the first job.

**Proposed hero layout (two-column on desktop, stacked on mobile):**

```
┌────────────────────────────────┬───────────────────────────────┐
│  [Logo]                        │   📍 Coquitlam, BC            │
│                                │   📞 604.945.8504             │
│  Where Young Minds Flourish    │   ─────────────────────       │
│                                │   Book a Free Tour            │
│  Authentic Montessori Daycare  │   ┌────────────────────┐      │
│  in Coquitlam since 2008       │   │ Your Name          │      │
│                                │   ├────────────────────┤      │
│  ✅ Licensed & Certified       │   │ Phone Number       │      │
│  ✅ Ages 30mo – 5yrs           │   ├────────────────────┤      │
│  ✅ 7am – 6pm Mon–Fri          │   │ Child's Age ▾      │      │
│  ✅ Spots Available            │   ├────────────────────┤      │
│                                │   │ [Book My Tour →]   │      │
│  [View Programs]               │   └────────────────────┘      │
└────────────────────────────────┴───────────────────────────────┘
```

This eliminates the need for parents to navigate to `/contact` to take action.

### 3.4 Sections to Remove / Simplify

| Current element | Action | Reason |
|---|---|---|
| Decorative GIF heroes on sub-pages | **Remove** | Large files, no content value |
| "BC Early Childhood Education Benefits" text block | **Condense** to 1 sentence + bullet | Too verbose; parents already know ECE is good |
| "The Montessori Difference" 3-paragraph block | **Condense** to 3 bullet points | Scannable > readable |
| Multi-theme switcher (5 themes) | **Remove from UI** | Distracts; pick one warm, child-friendly theme |
| Language switcher in header | **Simplify** | Move to footer; show EN/中文 only |
| "Mobile Access — Scan QR" footer section | **Keep but shrink** | Nice touch but taking too much space |

---

## 4. SEO Action Plan

### 4.1 Title Tags (fix immediately)

```tsx
// app/layout.tsx — root metadata
export const metadata: Metadata = {
  title: {
    default: 'Coquitlam Montessori Daycare | Friendship Corner — Licensed Since 2008',
    template: '%s | Friendship Corner Daycare Coquitlam',
  },
  description:
    'Friendship Corner is a licensed Montessori daycare in Coquitlam, BC serving children 30 months to 5 years. Authentic Montessori, certified ECE staff, open 7am–6pm. Call 604.945.8504.',
  keywords: [
    'Coquitlam daycare', 'Montessori daycare Coquitlam', 'daycare near Coquitlam Station',
    'Tri-Cities childcare', 'Port Coquitlam daycare', 'licensed daycare BC',
    'Montessori preschool Coquitlam', 'childcare Coquitlam', 'ECE daycare Coquitlam',
  ],
}
```

### 4.2 Local Business JSON-LD Schema

Add this to `app/layout.tsx` or a dedicated `<SchemaOrg>` component:

```tsx
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['ChildCare', 'LocalBusiness'],
  name: 'Friendship Corner Montessori Daycare',
  description: 'Licensed Montessori daycare in Coquitlam, BC for children 30 months to kindergarten age.',
  url: 'https://www.friendshipdaycare.com',
  telephone: '+1-604-945-8504',
  email: 'friendship.care@live.ca',
  foundingDate: '2008',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2950 Dewdney Trunk Road',
    addressLocality: 'Coquitlam',
    addressRegion: 'BC',
    postalCode: 'V3C 2J4',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 49.2827,
    longitude: -122.7932,
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
    opens: '07:00',
    closes: '18:00',
  }],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '23',
  },
  sameAs: [
    'https://www.facebook.com/friendshipcornerdaycare', // add real URL
    'https://www.instagram.com/friendshipcornerdaycare', // add real URL
  ],
}

// In layout.tsx <head>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
/>
```

### 4.3 Open Graph / Social Preview Tags

```tsx
export const metadata: Metadata = {
  openGraph: {
    title: 'Friendship Corner — Coquitlam Montessori Daycare',
    description: 'Authentic Montessori childcare in Coquitlam, BC. Licensed ECE staff, ages 30mo–5yrs, open 7am–6pm.',
    url: 'https://www.friendshipdaycare.com',
    siteName: 'Friendship Corner Daycare',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }], // create this image
    locale: 'en_CA',
    type: 'website',
  },
}
```

### 4.4 Image Alt Text — Keyword Enrichment

Replace generic alt text with descriptive, keyword-rich alternatives:

```tsx
// Before:
alt="Montessori classroom view 1"

// After:
alt="Montessori sensorial shelf at Friendship Corner Daycare in Coquitlam BC"
alt="Children doing circle time at Friendship Corner Montessori Daycare Coquitlam"
alt="Safe outdoor playground at licensed Coquitlam daycare"
```

### 4.5 Local Keyword Density in Body Copy

Ensure the homepage contains natural mentions of:
- "Coquitlam" (target 8–12 mentions across page)
- "Tri-Cities" (2–3 mentions)
- "2950 Dewdney Trunk Road" (exact address, helps Maps)
- "near Coquitlam Station" (transit proximity = local signal)
- "BC licensed daycare" or "BC ECE"

### 4.6 Google Business Profile (Critical)

This is the single highest-ROI action for local SEO. If not done already:

1. Claim/verify the listing at **business.google.com**
2. Add all photos (use the same gallery images from the site)
3. Set primary category: **Day Care Center**, secondary: **Preschool**
4. Add business description using target keywords
5. Enable **Google Reviews** widget on the website (current reviews are static — they don't count for fresh review signals)
6. Respond to all existing reviews (Google rewards active profiles)
7. Ask satisfied parents to leave a Google Review (5-star count is a direct ranking factor)

### 4.7 Core Web Vitals — Performance Fixes

| Issue | Fix |
|---|---|
| GIF hero images (about_hero_1.gif etc.) | Replace with WebP or short looping `<video>` |
| Large Next.js image w=3840 | Use appropriate `sizes` prop; no need to serve 4K images on mobile |
| GSAP + Framer Motion both loaded | Pick one animation library; dual-loading adds JS weight |
| No `loading="lazy"` on below-fold images | Add `loading="lazy"` or use Next.js `Image` priority prop correctly |

---

## 5. Social Media Integration

### 5.1 Links to Add (Header + Footer)

```tsx
const socialLinks = [
  { platform: 'Facebook',  url: 'https://facebook.com/friendshipcornerdaycare', icon: FacebookIcon },
  { platform: 'Instagram', url: 'https://instagram.com/friendshipcornerdaycare', icon: InstagramIcon },
  { platform: 'Google',    url: 'https://g.page/friendshipcornerdaycare/review', icon: GoogleIcon },
]
```

Place social icons in three locations:
1. **Top-right of header** (small icons, 24px)
2. **Hero section** — below the tagline
3. **Footer** — already has contact info, add icon row

### 5.2 Social Proof Upgrade

Replace static Google review cards with the real **Google Reviews widget** (via Place API or a third-party embed like Elfsight). This shows live, fresh reviews and includes star ratings that appear in Google search results as rich snippets.

---

## 6. Implementation Roadmap

### Phase 1 — Quick Wins (1–3 days) ⚡ High Impact / Low Effort
- [ ] Fix all `<title>` tags with local keywords
- [ ] Add Local Business JSON-LD schema to layout
- [ ] Add Open Graph meta tags + create og-image.jpg
- [ ] Fix image alt text across all components
- [ ] Add Facebook + Instagram icon links to header and footer
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Claim/optimize Google Business Profile

### Phase 2 — Architecture Refactor (1–2 weeks) 🏗️ High Impact / Medium Effort
- [ ] Convert multi-page to single-page ScrollSpy homepage
- [ ] Implement `useScrollSpy` hook with IntersectionObserver
- [ ] Build inline hero contact form (name, phone, child age, submit)
- [ ] Remove decorative GIF heroes from sub-pages
- [ ] Condense About and Programs text to scannable bullet points
- [ ] Remove theme switcher from UI (or move to footer/settings)
- [ ] Keep `/enrollment` and `/gallery` as standalone pages

### Phase 3 — Performance & Polish (ongoing)
- [ ] Replace GIF heroes with WebP/video
- [ ] Audit and fix Core Web Vitals (LCP, CLS, INP) via PageSpeed Insights
- [ ] Add Google Reviews live embed
- [ ] Add WeChat/LINE sharing buttons (for the Chinese-speaking parent demographic)
- [ ] A/B test hero contact form vs. "Book a Tour" button CTR

---

## 7. Component File Changes Summary

```
src/
├── app/
│   ├── layout.tsx              ← UPDATE: metadata, JSON-LD schema
│   ├── page.tsx                ← REWRITE: single-page scroll sections
│   ├── about/page.tsx          ← REMOVE hero section, keep as anchor fallback
│   ├── programs/page.tsx       ← REMOVE hero section
│   ├── contact/page.tsx        ← REMOVE hero section, keep as standalone fallback
│   └── enrollment/page.tsx     ← KEEP unchanged
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← UPDATE: ScrollSpy anchor links + social icons
│   │   └── Footer.tsx          ← UPDATE: add social icons, remove QR bloat
│   ├── sections/
│   │   ├── HeroSection.tsx     ← REWRITE: add inline contact form
│   │   ├── AboutSection.tsx    ← SIMPLIFY: condense copy
│   │   ├── ProgramsSection.tsx ← SIMPLIFY: 3 cards, no long text
│   │   ├── GalleryPreview.tsx  ← NEW: 6-photo grid, "View All" → /gallery
│   │   ├── ReviewsSection.tsx  ← KEEP: already good
│   │   └── ContactSection.tsx  ← UPDATE: full form + map + social links
│   └── ui/
│       └── SchemaOrg.tsx       ← NEW: JSON-LD component
└── hooks/
    └── useScrollSpy.ts         ← NEW: IntersectionObserver hook
```

---

## 8. Expected Outcomes

| Metric | Current | After Phase 1+2 |
|---|---|---|
| Google ranking "Coquitlam daycare" | Not on page 1 | Top 10 target (3–6 months) |
| Time-to-contact for parent | 3+ clicks | 0 clicks (form on hero) |
| Page count for core content | 6 pages | 1 page + 2 standalones |
| LCP score (hero load) | Unknown (GIFs) | < 2.5s target |
| Local Business schema | None | Full ChildCare schema |
| Social proof links | None | Facebook + Instagram + Google |

