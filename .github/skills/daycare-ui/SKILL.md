---
name: daycare-ui
description: 'Build UI components, sections, and pages for the Friendship Corner Daycare website with proper theming, animations, i18n, SEO, and responsive design. Use for: creating new components, adding page sections, building new pages, recreating UI layouts from design inspiration, ensuring theme compatibility across 5 themes, integrating i18n for 5 languages (en, zh, fr, es, ko), implementing responsive layouts. For detailed animation workflows, use /web-animations skill.'
argument-hint: 'Describe what UI element to create/recreate (component/section/page) or design pattern to implement'
---

# Daycare UI Development Skill

Build UI elements for the Friendship Corner Daycare website following established patterns for theming, animation, internationalization, and design system consistency.

## When to Use

- Creating new UI components (buttons, cards, forms, etc.)
- Adding page sections (hero, features, testimonials, etc.)
- Building complete new pages
- **Recreating UI layouts from design inspiration** (analyzing and rebuilding sections)
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
UI Recreation from Design Inspiration

**Scenario**: You want to recreate a UI section from another design (e.g., hero section, feature grid, testimonial layout) while maintaining your existing functionality and tech stack.

**Step 1: Analyze the Design Pattern**

When viewing a design you want to recreate, identify:

**Layout Structure:**
- Container width (full-width, constrained, max-width)
- Sections/rows arrangement (stacked vertically, side-by-side)
- Grid system (2-column, 3-column, asymmetric)
- Spacing between elements (tight, comfortable, spacious)

**Visual Elements:**
- Heading hierarchy (h1, h2, sizes, weights)
- Text alignment (left, center, right)
- Image placement (background, inline, overlapping)
- Color usage (backgrounds, accents, text colors)
- Borders, shadows, rounded corners

**Interactive Elements:**
- Buttons (sizes, styles, positions)
- Hover states
- Animations (entrance effects, scroll triggers)
- Forms or inputs

**Step 2: Break Down into Components**

Decompose the section into reusable pieces:

```
Hero Section
├── Background (image carousel or static)
├── Content Container
│   ├── Headline (h1)
│   ├── Subheading (p)
│   ├── CTA Buttons
│   └── Additional Elements (badges, stats, etc.)
└── Decorative Elements (shapes, overlays, patterns)
```

**Step 3: Map to Your Tech Stack**

Translate the design into your project's patterns:

**For a Hero Section:**
```tsx
'use client';

import { motion } from 'framer-motion';
import { slideUp, fadeIn, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeroImageCarousel } from '@/components/ui/hero-image-carousel';

export function RecreatedHeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background - Keep existing carousel */}
      <div className="absolute inset-0 -z-10">
        <HeroImageCarousel images={yourExistingImages} />
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay for text contrast */}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.h1
          variants={slideUp}
          className="text-5xl md:text-7xl font-display font-bold text-white text-center"
        >
          {t('home.hero.title')}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={slideUp}
          className="mt-6 text-xl md:text-2xl text-white/90 text-center max-w-3xl mx-auto"
        >
          {t('home.hero.subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeIn}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
            {t('home.hero.primaryCta')}
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors">
            {t('home.hero.secondaryCta')}
          </button>
        </motion.div>

        {/* Additional Elements - Example: Stats or Badges */}
        <motion.div
          variants={fadeIn}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {['stat1', 'stat2', 'stat3'].map((key) => (
            <div key={key} className="text-center">
              <div className="text-3xl font-bold text-white">
                {t(`home.hero.stats.${key}.value`)}
              </div>
              <div className="text-sm text-white/80 mt-1">
                {t(`home.hero.stats.${key}.label`)}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
```

**Step 4: Adapt Design Patterns**

Common patterns and how to implement them:

**Full-Width Background with Content Overlay:**
```tsx
<section className="relative">
  <div className="absolute inset-0 -z-10">
    {/* Background image/carousel */}
  </div>
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

**Split Layout (50/50):**
```tsx
<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
  <div>{/* Left content */}</div>
  <div>{/* Right content */}</div>
</section>
```

**Card Grid:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

**Centered Content Block:**
```tsx
<div className="max-w-4xl mx-auto px-4 text-center">
  <h2 className="text-4xl font-bold">{title}</h2>
  <p className="mt-4 text-lg text-muted-foreground">{description}</p>
</div>
```

**Step 5: Maintain Existing Functionality**

When replacing sections, preserve:
- ✅ Existing data sources (carousel images, content from CMS)
- ✅ i18n integration (all text uses `t()`)
- ✅ Theme compatibility (use CSS variables)
- ✅ Responsive behavior (mobile-first)
- ✅ Animations (consistent with rest of site)

**Example: Keeping Carousel While Changing Layout:**
```tsx
// Before: Old hero section
<HeroImageCarousel images={images} />

// After: New hero with carousel background
<section className="relative min-h-screen">
  {/* Keep carousel, change how it's positioned */}
  <div className="absolute inset-0 -z-10">
    <HeroImageCarousel images={images} />  {/* Same component */}
  </div>
  {/* New content layout on top */}
  <div className="relative z-10">
    {/* Your new hero content */}
  </div>
</section>
```

**Step 6: Refine Visual Details**

Match the design aesthetics:

**Spacing (Tailwind):**
```tsx
py-4   // 16px padding vertical
py-20  // 80px padding vertical
gap-6  // 24px gap between grid items
space-y-8  // 32px vertical spacing between children
```

**Typography:**
```tsx
text-5xl md:text-7xl  // Responsive heading size
font-display font-bold  // Display font family + bold
text-center  // Centered text
leading-tight  // Tight line-height
```

**Colors (Theme Variables):**
```tsx
bg-primary  // Brand color
text-foreground  // Main text color
bg-card  // Card backgrounds
border-border  // Borders
text-muted-foreground  // Secondary text
```

**Effects:**
```tsx
backdrop-blur-sm  // Glassmorphism effect
shadow-2xl  // Large shadow
rounded-2xl  // Large border radius
hover:scale-105 transition-transform  // Hover animation
```

**Step 7: Test & Iterate**

After implementing:
1. **Test responsiveness**: Check mobile (375px), tablet (768px), desktop (1440px)
2. **Test themes**: Cycle through all 5 themes
3. **Test languages**: Switch languages to verify text fits
4. **Test animations**: Ensure smooth, not jarring
5. **Compare**: Does it match the intended design feel?

**Step 8: Add Translations**

Add all text to i18n files:

```json
// /src/messages/en.json
{
  "home": {
    "hero": {
      "title": "Welcome to Friendship Corner",
      "subtitle": "Where Learning Meets Play",
      "primaryCta": "Enroll Now",
      "secondaryCta": "Learn More",
      "stats": {
        "stat1": { "value": "15+", "label": "Years Experience" },
        "stat2": { "value": "500+", "label": "Happy Families" },
        "stat3": { "value": "5★", "label": "Rated" }
      }
    }
  }
}
```

Repeat for all 5 languages.

**Common Recreation Scenarios:**

| Design Element | Implementation Approach |
|---------------|------------------------|
| Hero with center content | Flexbox with `items-center justify-center` |
| Overlapping sections | Absolute positioning with negative margins |
| Parallax backgrounds | GSAP ScrollTrigger or Framer Motion `useScroll` |
| Gradient overlays | `bg-gradient-to-r from-black/60 to-transparent` |
| Glassmorphism | `backdrop-blur-lg bg-white/10` |
| Card hover effects | `/web-animations` skill templates |
| Staggered animations | `staggerContainer` + `staggerItem` variants |

### 7. 
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
