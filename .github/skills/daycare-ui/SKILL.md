---
name: daycare-ui
description: 'Build UI components, sections, and pages for the Friendship Corner Daycare website with proper theming, animations, i18n, SEO, and responsive design. Use for: creating new components, adding page sections, building new pages, ensuring theme compatibility across 5 themes, adding GSAP/Framer Motion animations, integrating i18n for 5 languages (en, zh, fr, es, ko), implementing responsive layouts.'
argument-hint: 'Describe what UI element to create (component/section/page)'
---

# Daycare UI Development Skill

Build UI elements for the Friendship Corner Daycare website following established patterns for theming, animation, internationalization, and design system consistency.

## When to Use

- Creating new UI components (buttons, cards, forms, etc.)
- Adding page sections (hero, features, testimonials, etc.)
- Building complete new pages
- Adding animations to existing components
- Ensuring multi-theme compatibility (Professional, Nature, Playful, Dark, Violet)
- Integrating internationalization (English, Chinese, French, Spanish, Korean)
- Implementing responsive layouts for mobile/tablet/desktop

## Technology Stack

- **Framework**: Next.js 15 with App Router (React 19, TypeScript)
- **Styling**: TailwindCSS v4 with CSS variables for theming
- **Components**: shadcn/ui + custom components
- **Animations**: Framer Motion + GSAP ScrollTrigger
- **Internationalization**: next-intl with 5 language support
- **Design System**: Centralized tokens in `/src/lib/design-system.ts`

## Core Workflows

### 1. Component Creation

For reusable UI components (buttons, cards, inputs, etc.):

**Step 1: Determine Component Type**
- **Primitive UI** (button, input, select) → Place in `/src/components/ui/`
- **Feature Component** (testimonials, gallery, map) → Place in `/src/components/ui/`
- **Section Component** (hero, about, programs) → Place in `/src/components/sections/`

**Step 2: Use shadcn/ui Pattern**

```typescript
// Example: /src/components/ui/my-component.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        primary: "bg-primary text-primary-foreground",
        // Add more variants
      },
      size: {
        default: "p-4",
        sm: "p-2",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const MyComponent = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
)
MyComponent.displayName = "MyComponent"

export { MyComponent, componentVariants }
```

**Step 3: Apply Theme Variables**

Use CSS variables for theming (automatically works across all 5 themes):

```tsx
// Good - Uses theme variables
<div className="bg-primary text-primary-foreground border-border">

// Bad - Hardcoded colors
<div className="bg-blue-500 text-white border-gray-300">
```

**Available Theme Variables:**
- Colors: `primary`, `secondary`, `accent`, `background`, `foreground`, `muted`, `card`, `border`
- Radius: `var(--radius)`, `var(--radius-lg)`, `var(--radius-xl)`
- Shadows: `var(--shadow-sm)`, `var(--shadow-md)`, `var(--shadow-lg)`

See [theme reference](./references/theme-system.md) for complete list.

**Step 4: Add Animations**

Import and apply Framer Motion variants:

```tsx
import { motion } from 'framer-motion';
import { fadeIn, slideUp, scaleIn } from '@/lib/animations';

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={slideUp}
>
  {/* Content */}
</motion.div>
```

See [animation patterns](./references/animations.md) for all available variants.

**Step 5: Make it Responsive**

Use mobile-first approach:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

### 2. Section Building

For page sections (About, Programs, Contact, etc.):

**Step 1: Create Section Component**

Place in `/src/components/sections/`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';

export function MySectionContent() {
  const { t } = useLanguage();

  return (
    <motion.section
      id="my-section"
      className="py-20 bg-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
          {t('sectionKey.title')}
        </h2>
        {/* Section content */}
      </div>
    </motion.section>
  );
}
```

**Step 2: Add i18n Content**

Add translations to all language files in `/src/messages/`:

```json
// /src/messages/en.json
{
  "sectionKey": {
    "title": "Section Title",
    "description": "Section description...",
    "cta": "Call to Action"
  }
}
```

Repeat for: `zh.json`, `fr.json`, `es.json`, `ko.json`

**Step 3: Use Animations**

Apply scroll-triggered animations:

```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item, i) => (
    <motion.div key={i} variants={staggerItem}>
      {/* Item content */}
    </motion.div>
  ))}
</motion.div>
```

**Step 4: Test Across Themes**

Manually test component in browser across all 5 themes:
1. Open the page
2. Use theme switcher to cycle through: Professional → Nature → Playful → Dark → Violet
3. Verify colors, contrast, and readability

### 3. Page Development

For complete new pages:

**Step 1: Create Page Structure**

```
/src/app/my-page/
├── page.tsx           # Server component (metadata, data fetching)
├── page-client.tsx    # Client component (interactive UI)
└── loading.tsx        # Optional loading state
```

**Step 2: Server Component (page.tsx)**

```tsx
import type { Metadata } from 'next';
import { getLocalizedMetadata } from '@/lib/use-localized-metadata';
import { MyPageClient } from './page-client';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getLocalizedMetadata({
    title: 'Page Title',
    description: 'Page description for SEO',
    path: '/my-page',
  });
}

export default function MyPage() {
  return <MyPageClient />;
}
```

**Step 3: Client Component (page-client.tsx)**

```tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/ui/page-hero';
import { MySectionContent } from '@/components/sections/MySectionContent';

export function MyPageClient() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <PageHero
        title={t('myPage.hero.title')}
        description={t('myPage.hero.description')}
        imageSrc="/imgs/my-page/hero.jpg"
      />
      
      <MySectionContent />
      
      {/* More sections */}
    </main>
  );
}
```

**Step 4: Add SEO & Metadata**

Ensure proper metadata for all languages:
- Page title with template
- Description for search engines
- Open Graph images
- Structured data (if applicable)

See [SEO checklist](./references/seo-checklist.md) for details.

**Step 5: Configure Routing**

Add to navigation in `/src/components/layout/Header.tsx` if needed.

### 4. Theme Integration Checklist

Ensure components work across all 5 themes:

- [ ] Use CSS variables instead of hardcoded colors
- [ ] Test in Professional theme (clean corporate blue)
- [ ] Test in Nature theme (earthy greens/browns)
- [ ] Test in Playful theme (default colorful)
- [ ] Test in Dark theme (dark backgrounds)
- [ ] Test in Violet theme (purple tones)
- [ ] Verify text contrast meets WCAG AA standards
- [ ] Check hover states work in all themes
- [ ] Verify borders/shadows are visible in dark theme

### 5. Animation Integration

Add animations consistently:

**When to Animate:**
- Hero sections: `fadeIn` + `slideUp`
- Card grids: `staggerContainer` + `staggerItem`
- Images: `scaleIn`
- Text reveals: `textReveal` (from magicui-animations)
- CTA buttons: Hover/tap animations

**Animation Best Practices:**
- Use `viewport={{ once: true }}` to animate only on first view
- Add `margin: "-100px"` to trigger animations slightly before element enters viewport
- Keep durations between 0.3-0.8 seconds
- Use `ease: 'easeOut'` for natural feel

### 6. Internationalization Integration

Support all 5 languages:

**Step 1: Use `useLanguage` Hook**

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

export function MyComponent() {
  const { t, locale } = useLanguage();
  
  return <h1>{t('key.title')}</h1>;
}
```

**Step 2: Add Translations**

Add to all 5 language files:
- `/src/messages/en.json` (English)
- `/src/messages/zh.json` (Chinese)
- `/src/messages/fr.json` (French)
- `/src/messages/es.json` (Spanish)
- `/src/messages/ko.json` (Korean)

**Step 3: Handle Locale-Specific Content**

```tsx
// Locale-specific images or content
const imageSrc = locale === 'zh' 
  ? '/images/chinese-specific.jpg'
  : '/images/default.jpg';
```

**Step 4: Test Language Switcher**

Verify all text updates when switching languages in the UI.

## Design System Reference

Quick access to design tokens:

**Spacing**: `xs` (8px), `sm` (12px), `md` (16px), `lg` (24px), `xl` (32px), `2xl` (48px), `3xl` (64px)

**Font Sizes**: `xs` (12px), `sm` (14px), `base` (16px), `lg` (18px), `xl` (20px), `2xl` (24px), `3xl` (30px), `4xl` (36px), `5xl` (48px)

**Breakpoints**: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)

See [design-system.ts](../../src/lib/design-system.ts) for all tokens.

## Common Patterns

### Hero Section Pattern

```tsx
<PageHero
  title={t('page.hero.title')}
  description={t('page.hero.description')}
  imageSrc="/imgs/page/hero.jpg"
  ctaText={t('page.hero.cta')}
  ctaHref="/contact"
/>
```

### Card Grid Pattern

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id} variant="elevated">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>{item.content}</CardContent>
    </Card>
  ))}
</div>
```

### CTA Button Pattern

```tsx
<Link
  href="/contact"
  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
>
  {t('cta.text')}
</Link>
```

## Quality Checklist

Before completing any UI work:

- [ ] **Responsive**: Works on mobile (375px), tablet (768px), desktop (1440px)
- [ ] **Themes**: Tested in all 5 themes manually
- [ ] **Languages**: Text uses `t()` and translations exist in all 5 language files
- [ ] **Animations**: Smooth, not jarring (0.3-0.8s duration)
- [ ] **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation
- [ ] **Performance**: Images optimized, lazy loaded, proper placeholder
- [ ] **SEO**: Metadata, structured data, proper heading hierarchy
- [ ] **TypeScript**: No `any` types, proper interfaces
- [ ] **Code Style**: Matches existing patterns, proper imports

## Files & References

- [Theme System Reference](./references/theme-system.md)
- [Animation Patterns](./references/animations.md)
- [i18n Guidelines](./references/i18n-guidelines.md)
- [SEO Checklist](./references/seo-checklist.md)
- [Component Template](./assets/component-template.tsx)
- [Section Template](./assets/section-template.tsx)
- [Page Template](./assets/page-template.tsx)

## Troubleshooting

**Component not updating across themes?**
→ You're using hardcoded Tailwind colors. Switch to CSS variables (e.g., `bg-primary` instead of `bg-blue-500`).

**Animations not triggering?**
→ Check `viewport={{ once: true }}` is set and element has `initial="hidden" whileInView="visible"`.

**Translation missing?**
→ Verify key exists in all 5 language files (`en.json`, `zh.json`, `fr.json`, `es.json`, `ko.json`).

**Mobile layout broken?**
→ Check responsive classes follow mobile-first approach (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).

## Examples

See existing components for reference:
- Components: [AboutSection.tsx](../../src/components/sections/AboutSection.tsx)
- UI: [card.tsx](../../src/components/ui/card.tsx), [button.tsx](../../src/components/ui/button.tsx)
- Pages: [about/page.tsx](../../src/app/about/page.tsx), [contact/page.tsx](../../src/app/contact/page.tsx)
