# Next.js 15 SEO: Built-in Features vs External Packages

**Last Updated:** January 28, 2026  
**For:** Next.js 15 with App Router & Tailwind CSS v4

---

## Quick Answer

**You DON'T need `next-sitemap` or `next-seo` anymore in Next.js 15!**

Next.js 15 has **built-in SEO features** that replace these packages. The App Router provides native support for:
- ✅ Metadata (replaces `next-seo`)
- ✅ Sitemap generation (replaces `next-sitemap`)
- ✅ Robots.txt generation (replaces `next-sitemap`)
- ✅ Open Graph images
- ✅ Icons and favicons

**However**, there are some edge cases where `next-sitemap` might still be useful (explained below).

---

## Table of Contents

1. [Built-in vs External Packages Comparison](#comparison)
2. [What's Built into Next.js 15](#built-in-features)
3. [When You DON'T Need External Packages](#dont-need)
4. [When You MIGHT Want External Packages](#might-want)
5. [Migration Guide](#migration-guide)
6. [Complete Implementation Examples](#examples)
7. [Recommendations for Your Sites](#recommendations)

---

## Comparison: Built-in vs External Packages

### Metadata Management

| Feature | Next.js 15 Built-in | next-seo Package | Winner |
|---------|-------------------|------------------|---------|
| **Static metadata** | ✅ `export const metadata` | ✅ `<NextSeo>` component | **Tie** |
| **Dynamic metadata** | ✅ `generateMetadata()` | ✅ Props-based | **Next.js** (native) |
| **Type safety** | ✅ Full TypeScript support | ⚠️ Limited | **Next.js** |
| **Open Graph** | ✅ Built-in | ✅ Supported | **Tie** |
| **Twitter Cards** | ✅ Built-in | ✅ Supported | **Tie** |
| **JSON-LD structured data** | ⚠️ Manual with `<script>` | ✅ Helper components | **next-seo** (slightly easier) |
| **Bundle size** | 0 KB (native) | ~5 KB | **Next.js** |
| **Maintenance** | ✅ Official support | ⚠️ Third-party | **Next.js** |

**Verdict:** Use Next.js 15 built-in Metadata API. It's official, smaller, and fully integrated.

---

### Sitemap Generation

| Feature | Next.js 15 Built-in | next-sitemap Package | Winner |
|---------|-------------------|---------------------|---------|
| **Static routes** | ✅ `app/sitemap.ts` | ✅ Auto-detection | **Tie** |
| **Dynamic routes** | ✅ Manual generation | ✅ Auto-detection | **next-sitemap** (easier) |
| **Multiple sitemaps** | ✅ Sitemap index support | ✅ Automatic splitting | **Tie** |
| **Robots.txt generation** | ✅ Separate `robots.ts` | ✅ Built-in option | **next-sitemap** (combined) |
| **Post-build hook** | ⚠️ Manual | ✅ Automatic `postbuild` | **next-sitemap** |
| **Configuration** | TypeScript file | JavaScript config | **Next.js** (type-safe) |
| **Bundle size** | 0 KB (native) | ~2 KB + deps | **Next.js** |
| **i18n support** | ✅ Manual | ✅ Automatic | **next-sitemap** (easier) |

**Verdict:** 
- **Simple sites:** Use Next.js built-in
- **Complex sites (many dynamic routes, i18n):** Consider `next-sitemap` for convenience

---

### Robots.txt Generation

| Feature | Next.js 15 Built-in | next-sitemap Package | Winner |
|---------|-------------------|---------------------|---------|
| **Basic robots.txt** | ✅ `app/robots.ts` | ✅ Via config | **Tie** |
| **Dynamic generation** | ✅ Full control | ✅ Templated | **Next.js** (more flexible) |
| **Environment-aware** | ✅ Easy | ⚠️ Requires custom logic | **Next.js** |
| **Multiple user agents** | ✅ Native | ✅ Via config | **Tie** |
| **Bundle size** | 0 KB | Included with sitemap | **Next.js** |

**Verdict:** Use Next.js built-in `robots.ts`. It's native, flexible, and type-safe.

---

## What's Built into Next.js 15

### 1. Metadata API

**Location:** Any `layout.tsx` or `page.tsx` file

**Static Metadata:**
```typescript
// app/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Site',
  description: 'Description of my site',
  keywords: ['next.js', 'react', 'typescript'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'My Site',
    description: 'Description for social sharing',
    url: 'https://mysite.com',
    siteName: 'My Site',
    images: [
      {
        url: 'https://mysite.com/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Site',
    description: 'Description for Twitter',
    images: ['https://mysite.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://mysite.com',
    languages: {
      'en-US': 'https://mysite.com/en',
      'es-ES': 'https://mysite.com/es',
    },
  },
}
```

**Dynamic Metadata:**
```typescript
// app/blog/[slug]/page.tsx
import { Metadata } from 'next'

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  // Fetch post data
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}
```

**Benefits:**
- ✅ Type-safe with TypeScript
- ✅ Server-side only (no client bundle)
- ✅ Automatic deduplication
- ✅ Merges with parent metadata
- ✅ Works with Server Components

---

### 2. Sitemap Generation

**Location:** `app/sitemap.ts` (or `.js`, `.xml`)

**Static Sitemap:**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mysite.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://mysite.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://mysite.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
```

**Dynamic Sitemap with Database:**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic data
  const posts = await getPosts()
  const products = await getProducts()
  
  // Static pages
  const staticPages = [
    {
      url: 'https://mysite.com',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: 'https://mysite.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]
  
  // Dynamic blog posts
  const blogPosts = posts.map((post) => ({
    url: `https://mysite.com/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Dynamic products
  const productPages = products.map((product) => ({
    url: `https://mysite.com/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))
  
  return [...staticPages, ...blogPosts, ...productPages]
}
```

**Accessible at:** `https://yoursite.com/sitemap.xml`

**Benefits:**
- ✅ Automatically cached
- ✅ Type-safe
- ✅ Can use async/await
- ✅ No build step needed

---

### 3. Robots.txt Generation

**Location:** `app/robots.ts` (or `.js`, `.txt`)

**Basic Robots.txt:**
```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://mysite.com/sitemap.xml',
  }
}
```

**Advanced with Multiple User Agents:**
```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/private/', '/admin/'],
        crawlDelay: 2,
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        allow: ['/'],
        disallow: ['/private/'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/', '/_next/'],
      },
    ],
    sitemap: 'https://mysite.com/sitemap.xml',
    host: 'https://mysite.com',
  }
}
```

**Environment-Aware Robots:**
```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mysite.com'
  const isProduction = process.env.NODE_ENV === 'production'
  
  return {
    rules: {
      userAgent: '*',
      allow: isProduction ? '/' : undefined,
      disallow: isProduction ? ['/admin/', '/api/'] : '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

**Accessible at:** `https://yoursite.com/robots.txt`

**Benefits:**
- ✅ Type-safe
- ✅ Dynamic based on environment
- ✅ Can use logic/conditions
- ✅ Automatically cached

---

### 4. Open Graph Images

**Static Image:**
```typescript
// app/opengraph-image.jpg (just put file in app directory)
// Next.js automatically serves it
```

**Dynamic Open Graph Image:**
```typescript
// app/og/route.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Hello world!
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
```

**Benefits:**
- ✅ Generate OG images on the fly
- ✅ Use React components for design
- ✅ Edge runtime (fast)

---

## When You DON'T Need External Packages

### ✅ Use Built-in Next.js 15 Features If:

1. **Your site has straightforward routing**
   - Static pages
   - Predictable dynamic routes
   - Simple sitemap requirements

2. **You want type safety**
   - TypeScript sitemap generation
   - Metadata type checking
   - IDE autocomplete

3. **You prefer official solutions**
   - Maintained by Vercel
   - Part of Next.js core
   - Guaranteed compatibility

4. **You want zero dependencies**
   - Smaller bundle size
   - Fewer security vulnerabilities
   - Less maintenance overhead

5. **You need custom logic**
   - Environment-specific robots.txt
   - Complex metadata generation
   - Conditional sitemap entries

### Examples Where Built-in is Perfect:

**Example 1: Simple Blog**
```
├── app/
│   ├── layout.tsx (metadata)
│   ├── page.tsx (homepage)
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx (generateMetadata)
│   ├── sitemap.ts (fetch posts from DB)
│   └── robots.ts
```

**Example 2: E-commerce Site**
```
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx (generateMetadata)
│   ├── sitemap.ts (fetch products from API)
│   └── robots.ts (allow products, disallow admin)
```

**Example 3: Corporate Website**
```
├── app/
│   ├── layout.tsx (global metadata)
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [service]/page.tsx
│   ├── sitemap.ts (static + dynamic)
│   └── robots.ts
```

---

## When You MIGHT Want External Packages

### Consider `next-sitemap` If:

1. **You have extremely complex sitemaps**
   - Thousands of dynamic routes
   - Need automatic route detection
   - Multiple sitemap files (sitemap index)

2. **You want automatic i18n sitemaps**
   - Multiple language versions
   - Automatic alternate links
   - Language-specific URLs

3. **You prefer configuration over code**
   - Don't want to write sitemap logic
   - Simple config file approach
   - Quick setup

4. **You're migrating from Pages Router**
   - Already using `next-sitemap`
   - Don't want to rewrite sitemap logic
   - Gradual migration

### Example: Very Large Site with i18n

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://mysite.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  exclude: ['/admin/*', '/api/*'],
  alternateRefs: [
    {
      href: 'https://mysite.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://mysite.com/es',
      hreflang: 'es',
    },
    {
      href: 'https://mysite.com/fr',
      hreflang: 'fr',
    },
  ],
  transform: async (config, path) => {
    // Custom priority logic
    if (path === '/') return { priority: 1 }
    if (path.startsWith('/blog/')) return { priority: 0.7, changefreq: 'daily' }
    return { priority: 0.5, changefreq: 'weekly' }
  },
}
```

**Benefits of next-sitemap in this case:**
- Automatically detects all routes
- Handles sitemap splitting
- Built-in i18n support
- Simple configuration

**But you can achieve the same with built-in:**

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { locales } from '@/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getAllRoutes() // Your logic
  
  return routes.flatMap(route => 
    locales.map(locale => ({
      url: `https://mysite.com/${locale}${route.path}`,
      lastModified: route.updatedAt,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `https://mysite.com/${l}${route.path}`])
        ),
      },
    }))
  )
}
```

**Verdict:** For very large sites, `next-sitemap` is more convenient, but not necessary.

---

## Migration Guide

### From `next-seo` to Built-in Metadata API

**Before (next-seo):**
```tsx
import { NextSeo } from 'next-seo'

export default function Page() {
  return (
    <>
      <NextSeo
        title="Page Title"
        description="Page description"
        openGraph={{
          title: 'OG Title',
          description: 'OG Description',
          images: [{ url: 'https://example.com/og.jpg' }],
        }}
      />
      <main>...</main>
    </>
  )
}
```

**After (Next.js 15):**
```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['https://example.com/og.jpg'],
  },
}

export default function Page() {
  return <main>...</main>
}
```

**Benefits:**
- ✅ No component needed
- ✅ Server-only (no client bundle)
- ✅ Type-safe
- ✅ Cleaner code

---

### From `next-sitemap` to Built-in

**Before (next-sitemap):**
```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://mysite.com',
  generateRobotsTxt: true,
}

// package.json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

**After (Next.js 15):**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mysite.com',
      lastModified: new Date(),
    },
    // ... more URLs
  ]
}

// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://mysite.com/sitemap.xml',
  }
}
```

**Benefits:**
- ✅ No build step
- ✅ Type-safe
- ✅ More control
- ✅ No dependencies

---

## Complete Implementation Examples

### Example 1: Simple Blog Site

```typescript
// app/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'My Blog',
    template: '%s | My Blog', // Page Title | My Blog
  },
  description: 'A blog about web development',
  openGraph: {
    title: 'My Blog',
    description: 'A blog about web development',
    url: 'https://myblog.com',
    siteName: 'My Blog',
    locale: 'en_US',
    type: 'website',
  },
}

// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetch('https://api.myblog.com/posts').then(r => r.json())
  
  return [
    {
      url: 'https://myblog.com',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://myblog.com/about',
      lastModified: new Date(),
      priority: 0.8,
    },
    ...posts.map(post => ({
      url: `https://myblog.com/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      priority: 0.7,
    })),
  ]
}

// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://myblog.com/sitemap.xml',
  }
}

// app/blog/[slug]/page.tsx
import { Metadata } from 'next'

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await fetch(`https://api.myblog.com/posts/${params.slug}`)
    .then(r => r.json())
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [post.coverImage],
    },
  }
}

export default async function BlogPost({ params }) {
  const post = await fetch(`https://api.myblog.com/posts/${params.slug}`)
    .then(r => r.json())
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

---

### Example 2: E-commerce Site with Categories

```typescript
// app/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MyShop - Quality Products',
  description: 'Shop the best products at great prices',
  metadataBase: new URL('https://myshop.com'),
}

// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    fetch('https://api.myshop.com/products').then(r => r.json()),
    fetch('https://api.myshop.com/categories').then(r => r.json()),
  ])
  
  const staticPages = [
    { url: 'https://myshop.com', priority: 1 },
    { url: 'https://myshop.com/about', priority: 0.8 },
    { url: 'https://myshop.com/contact', priority: 0.7 },
  ]
  
  const categoryPages = categories.map(cat => ({
    url: `https://myshop.com/category/${cat.slug}`,
    lastModified: new Date(cat.updatedAt),
    priority: 0.9,
  }))
  
  const productPages = products.map(product => ({
    url: `https://myshop.com/products/${product.id}`,
    lastModified: new Date(product.updatedAt),
    priority: 0.6,
  }))
  
  return [...staticPages, ...categoryPages, ...productPages]
}

// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/checkout/', '/account/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/checkout/', '/account/'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://myshop.com/sitemap.xml',
  }
}

// app/products/[id]/page.tsx
import { Metadata } from 'next'

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  const product = await fetch(`https://api.myshop.com/products/${params.id}`)
    .then(r => r.json())
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map(img => ({
        url: img.url,
        width: 1200,
        height: 630,
      })),
      type: 'product',
    },
  }
}
```

---

## Recommendations for Your Sites

### For BestIT Consultants (bestitconsultants.ca)

**Current Status:**
- ✅ Already has `lib/seo-utils.ts` for metadata
- ✅ Uses built-in approach
- ✅ Has structured data helpers

**Recommendations:**
✅ **Keep using built-in Next.js 15 features** - You're doing it right!

**What you have:**
```typescript
// lib/seo-utils.ts
export function generateMetadata(page) {
  return {
    title: `${page.title} | BestIT Consultants`,
    description: page.description,
    // ... more metadata
  }
}
```

**Confirm you have:**
- [x] `app/sitemap.ts` (or `.xml` or in API route)
- [x] `app/robots.ts` (or `.txt`)
- [x] `lib/structured-data.ts` for JSON-LD
- [x] Metadata in all pages

**No external packages needed!**

---

### For BestIT Consulting (bestitconsulting.ca)

**Current Status:**
- Uses `next-sitemap.config.js`
- Has 4 languages (EN, FR, ES, ZH)
- Complex i18n setup

**Recommendations:**

**Option 1: Keep `next-sitemap` (Easier for i18n)**
```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.bestitconsulting.ca',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  alternateRefs: [
    { href: 'https://www.bestitconsulting.ca/en', hreflang: 'en' },
    { href: 'https://www.bestitconsulting.ca/fr', hreflang: 'fr' },
    { href: 'https://www.bestitconsulting.ca/es', hreflang: 'es' },
    { href: 'https://www.bestitconsulting.ca/zh', hreflang: 'zh' },
  ],
}
```

**Option 2: Migrate to Built-in (More control)**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

const locales = ['en', 'fr', 'es', 'zh']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['/', '/about', '/services', '/case-studies']
  
  return pages.flatMap(page =>
    locales.map(locale => ({
      url: `https://www.bestitconsulting.ca/${locale}${page}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `https://www.bestitconsulting.ca/${l}${page}`])
        ),
      },
    }))
  )
}
```

**Verdict:** Either works! Keep `next-sitemap` if it's already working well.

---

### For Friendship Daycare (friendshipdaycare.vercel.app)

**Current Status:**
- No sitemap visible
- 5 languages (EN, ES, FR, KR, ZH)
- Simple site structure

**Recommendations:**

**Implement Built-in Next.js 15 Features** 🔴 HIGH PRIORITY

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

const locales = ['en', 'es', 'fr', 'kr', 'zh']

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '/', priority: 1, changefreq: 'monthly' },
    { path: '/about', priority: 0.9, changefreq: 'monthly' },
    { path: '/programs', priority: 0.9, changefreq: 'monthly' },
    { path: '/gallery', priority: 0.7, changefreq: 'weekly' },
    { path: '/contact', priority: 0.8, changefreq: 'yearly' },
    { path: '/enrollment', priority: 0.9, changefreq: 'monthly' },
  ]
  
  return pages.flatMap(page =>
    locales.map(locale => ({
      url: `https://friendshipdaycare.com/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changefreq as any,
      priority: page.priority,
    }))
  )
}

// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://friendshipdaycare.com/sitemap.xml',
  }
}

// app/layout.tsx - Add metadata
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Friendship Corner Daycare - Montessori Daycare in Coquitlam',
    template: '%s | Friendship Corner Daycare',
  },
  description: 'Licensed Montessori daycare in Coquitlam, BC. Ages 30 months to school age. Safe, nurturing environment near Coquitlam Station.',
  keywords: [
    'Montessori daycare Coquitlam',
    'daycare Coquitlam BC',
    'preschool Coquitlam',
    'licensed daycare Tri-Cities',
  ],
  openGraph: {
    title: 'Friendship Corner Daycare',
    description: 'Montessori daycare in Coquitlam, BC',
    url: 'https://friendshipdaycare.com',
    siteName: 'Friendship Corner Daycare',
    locale: 'en_US',
    type: 'website',
  },
}
```

**No external packages needed!**

---

## Quick Decision Matrix

### Should I Use Built-in or Packages?

| Your Situation | Recommendation | Reason |
|----------------|----------------|--------|
| **New Next.js 15 project** | ✅ Built-in | Native, type-safe, zero deps |
| **Simple site (<50 pages)** | ✅ Built-in | Overkill to use packages |
| **Blog with dynamic posts** | ✅ Built-in | Easy with `async` sitemap |
| **E-commerce (1000+ products)** | ✅ Built-in or next-sitemap | Both work, built-in preferred |
| **Multi-language site (2-3 langs)** | ✅ Built-in | Manageable manually |
| **Multi-language (5+ langs)** | 🟡 Consider next-sitemap | Easier config |
| **Migrating from Pages Router** | 🟡 Keep next-sitemap temporarily | Migrate gradually |
| **Need automatic route detection** | 🟡 next-sitemap | Convenience feature |
| **Want zero dependencies** | ✅ Built-in | No external packages |
| **Large team, prefer config** | 🟡 next-sitemap | Non-code configuration |

---

## Summary

### The Bottom Line

**For 95% of Next.js 15 projects, use built-in features:**

✅ **Metadata API** instead of `next-seo`  
✅ **`app/sitemap.ts`** instead of `next-sitemap`  
✅ **`app/robots.ts`** instead of separate config  

**Only use `next-sitemap` if:**
- You have very complex i18n (5+ languages)
- You prefer configuration over code
- You're gradually migrating from Pages Router

**Never use `next-seo` anymore** - it's completely redundant with Next.js 15's Metadata API.

---

## Action Items for Your Sites

### BestIT Consultants ✅
- [x] Already using built-in features correctly
- [ ] Verify sitemap.xml is accessible
- [ ] Test robots.txt
- [ ] Add structured data if missing

### BestIT Consulting 🟡
- [ ] Evaluate if next-sitemap is still needed
- [ ] Consider migrating to built-in for type safety
- [ ] Or keep next-sitemap if i18n is complex

### Friendship Daycare 🔴
- [ ] **URGENT:** Add `app/sitemap.ts`
- [ ] **URGENT:** Add `app/robots.ts`
- [ ] Add metadata to all pages
- [ ] Implement LocalBusiness structured data

---

**Final Recommendation:** Embrace Next.js 15's built-in SEO features. They're official, maintained, type-safe, and require zero external dependencies. External packages are no longer necessary for most use cases.

---

*Document compiled: January 28, 2026*  
*Based on Next.js 15 official documentation and current best practices*
