# SEO Checklist

Ensure all pages follow SEO best practices.

## Metadata Requirements

### 1. Page Titles

Use `getLocalizedMetadata` helper:

```tsx
import { getLocalizedMetadata } from '@/lib/use-localized-metadata';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedMetadata({
    title: 'Page Title', // Required: 50-60 chars ideal
    description: 'Page description explaining what users will find', // Required: 150-160 chars
    path: '/page-path', // Required: for canonical URLs
  });
}
```

This automatically provides:
- Localized title with template: "Page Title | Friendship Corner Daycare"
- Meta description
- Open Graph tags (og:title, og:description, og:image)
- Twitter Card tags
- Canonical URL
- Language alternates (hreflang)

### 2. Open Graph Images

For custom OG images:

```tsx
export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getLocalizedMetadata({
    title: 'Page Title',
    description: 'Description',
    path: '/page-path',
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [
        {
          url: '/images/custom-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Image description',
        }
      ],
    },
  };
}
```

**OG Image Requirements:**
- Size: 1200x630px
- Format: JPG or PNG
- Max size: 5MB
- Include text/branding (Facebook crops to 1.91:1)

### 3. Structured Data

Add JSON-LD for rich snippets:

```tsx
// For organization/business
export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ChildCare',
    name: 'Friendship Corner Daycare',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1234 Main St',
      addressLocality: 'Coquitlam',
      addressRegion: 'BC',
      postalCode: 'V3B 1A1',
      addressCountry: 'CA',
    },
    telephone: '+1-604-XXX-XXXX',
    url: 'https://friendshipcornerdaycare.ca',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Page content */}
    </>
  );
}
```

## Content Requirements

### 1. Heading Hierarchy

```tsx
<h1>Main Page Title</h1>           {/* One per page */}
  <h2>Major Section</h2>             {/* Multiple allowed */}
    <h3>Subsection</h3>               {/* Support headings */}
```

**Rules:**
- One `<h1>` per page
- Don't skip levels (h1 → h3 is bad)
- Use semantic headings, not just for styling

### 2. Alt Text for Images

```tsx
// Good
<img src="/image.jpg" alt="Children playing in the outdoor garden at Friendship Corner" />

// Bad
<img src="/image.jpg" alt="image" />
<img src="/image.jpg" alt="" /> {/* Only if decorative */}
```

### 3. Internal Links

```tsx
import Link from 'next/link';

<Link href="/programs">View Our Programs</Link>
```

**Best Practices:**
- Use descriptive anchor text
- Link to related pages
- Maintain breadcrumbs for navigation

### 4. Breadcrumbs

Already implemented in PageHero:

```tsx
<PageHero
  title="Page Title"
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Programs', href: '/programs' },
    { label: 'Current Page' }
  ]}
/>
```

## Performance SEO

### 1. Image Optimization

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

<OptimizedImage
  src="/images/photo.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority={false} // true for above-fold images
/>
```

### 2. Lazy Loading

```tsx
// Below-fold images
<img src="/image.jpg" loading="lazy" alt="..." />

// Above-fold images
<img src="/image.jpg" loading="eager" alt="..." />
```

### 3. Core Web Vitals

Monitor:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms  
- **CLS** (Cumulative Layout Shift): < 0.1

Tips:
- Use `width` and `height` on images (prevents CLS)
- Preload critical resources
- Use Next.js Image component

## Mobile SEO

### 1. Viewport Meta Tag

Already set in layout:

```tsx
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### 2. Touch-Friendly

```tsx
// Minimum 44x44px touch targets
<button className="min-h-[44px] min-w-[44px]">
```

### 3. Mobile-First Design

```tsx
// Start with mobile, add breakpoints
<div className="text-base md:text-lg lg:text-xl">
```

## Accessibility (Impacts SEO)

### 1. Semantic HTML

```tsx
<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>
```

### 2. ARIA Labels

```tsx
<button aria-label="Close menu">✕</button>
<nav aria-label="Main navigation">
```

### 3. Focus States

```tsx
<button className="focus:ring-2 focus:ring-primary">
```

### 4. Skip Links

Already implemented:

```tsx
<SkipNavigation />
```

## Checklist for New Pages

- [ ] **Meta title** set via `generateMetadata()`
- [ ] **Meta description** 150-160 characters
- [ ] **Canonical URL** set automatically
- [ ] **Open Graph** title, description, image
- [ ] **One H1** per page
- [ ] **Heading hierarchy** logical (h1 → h2 → h3)
- [ ] **Alt text** on all images
- [ ] **Internal links** to related pages
- [ ] **Breadcrumbs** for navigation
- [ ] **Mobile responsive** tested
- [ ] **Language alternates** set automatically
- [ ] **Structured data** if applicable (business, article, etc.)
- [ ] **Loading performance** < 3s
- [ ] **Images optimized** using OptimizedImage component
- [ ] **Focus states** visible on interactive elements

## Testing Tools

- **Google Search Console** - Index status, performance
- **Lighthouse** - SEO audit in Chrome DevTools
- **Rich Results Test** - Google structured data tester
- **Mobile-Friendly Test** - Google mobile checker

## Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org](https://schema.org/)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
