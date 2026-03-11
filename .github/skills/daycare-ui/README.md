# Daycare UI Skill

A comprehensive skill for building UI components, sections, and pages for the Friendship Corner Daycare website.

## Usage

Invoke this skill in Copilot Chat:

```
/daycare-ui create a new testimonials section
/daycare-ui build a programs card component
/daycare-ui add a new staff page
```

Or mention what you want to build and the skill will be automatically invoked if relevant.

## What This Skill Covers

This skill helps you build UI elements that follow all the established patterns:

- ✅ **5 Theme Support** - Professional, Nature, Playful, Dark, Violet
- ✅ **5 Language Support** - English, Chinese, French, Spanish, Korean
- ✅ **Animations** - Framer Motion & GSAP patterns
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **SEO Optimization** - Metadata, structured data, performance
- ✅ **Design System** - Consistent tokens and styling
- ✅ **shadcn/ui Patterns** - Component variants and composition

## Files in This Skill

### Main Documentation
- **SKILL.md** - Complete workflow guide for all UI development

### Reference Guides
- **references/theme-system.md** - CSS variables and theme testing
- **references/animations.md** - Framer Motion variants and patterns
- **references/i18n-guidelines.md** - Internationalization setup
- **references/seo-checklist.md** - SEO requirements and best practices

### Templates (Copy & Modify)
- **assets/component-template.tsx** - UI component boilerplate
- **assets/section-template.tsx** - Page section boilerplate
- **assets/page-template.tsx** - Complete page boilerplate

## Quick Start Examples

### Creating a Component
```bash
/daycare-ui I need a pricing card component with 3 variants
```

The skill will:
1. Create component in `/src/components/ui/`
2. Use shadcn/ui pattern with variants
3. Apply theme variables for all 5 themes
4. Add proper TypeScript types

### Creating a Section
```bash
/daycare-ui create an "Our Values" section with animated cards
```

The skill will:
1. Create section in `/src/components/sections/`
2. Add animations (fadeIn, staggerContainer)
3. Create translation keys in all 5 language files
4. Make it responsive

### Creating a Page
```bash
/daycare-ui build a "Resources" page with hero and content sections
```

The skill will:
1. Create page structure in `/src/app/resources/`
2. Set up metadata for SEO
3. Add breadcrumbs and hero
4. Include client/server component split

## Key Patterns

### Theme Variables
```tsx
// ✅ Good - Works in all themes
<div className="bg-primary text-primary-foreground">

// ❌ Bad - Hardcoded colors  
<div className="bg-blue-500 text-white">
```

### Animations
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={slideUp}
>
```

### Internationalization
```tsx
const { t } = useLanguage();
<h1>{t('section.title')}</h1>
```

### Responsive Design
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS v4
- **Components**: shadcn/ui
- **Animations**: Framer Motion + GSAP
- **i18n**: next-intl
- **Language**: TypeScript

## Quality Standards

Every UI element created with this skill follows:

- Theme compatibility across all 5 themes
- Translation support for all 5 languages
- Responsive design for mobile/tablet/desktop
- Smooth animations with proper timing
- SEO optimization with metadata
- Accessibility (semantic HTML, ARIA)
- Performance best practices
- TypeScript type safety

## Related Files

The skill references these project files:

- Design System: `/src/lib/design-system.ts`
- Animations: `/src/lib/animations.ts`, `/src/lib/magicui-animations.ts`
- Theme Styles: `/src/app/globals.css`
- i18n Config: `/src/i18n/config.ts`
- Language Files: `/src/messages/*.json`
- SEO Utils: `/src/lib/seo.ts`, `/src/lib/use-localized-metadata.ts`

## Troubleshooting

See the main SKILL.md file for troubleshooting common issues with:
- Themes not switching
- Animations not triggering
- Translations missing
- Layout breaking on mobile

## Contributing

When updating this skill:

1. Keep SKILL.md under 500 lines (use references for details)
2. Update templates when patterns change
3. Add examples for new patterns
4. Test workflows end-to-end
5. Update this README if structure changes
