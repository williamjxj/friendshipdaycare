# Web Animations Skill

Specialized skill for implementing modern, performant animations using Framer Motion, GSAP, and CSS.

## Quick Start

Invoke this skill when you need to:
- Add animations to components
- Create scroll-triggered effects
- Implement hover and interaction animations
- Build parallax or magnetic effects
- Convert between CSS and JS animations
- Optimize animation performance

**For general UI development**, use the **`/daycare-ui`** skill which covers component/section/page creation.

## Skill Relationship

This skill complements `/daycare-ui`:

- **daycare-ui**: Comprehensive UI development (components, sections, pages, UI recreation)
- **web-animations**: Specialized animation workflows (detailed here)

Use `/daycare-ui` for building, use `/web-animations` for animating.

## Example Prompts

```
@workspace /web-animations add scroll-triggered fade-in to the testimonials section

@workspace /web-animations create a magnetic button effect for the CTA

@workspace /web-animations add staggered list animation to program cards

@workspace /web-animations implement parallax scrolling for hero background

@workspace /web-animations add scroll progress indicator to blog posts

@workspace /web-animations create page transition animations
```

## What's Included

- **SKILL.md** - Complete workflows for 8+ animation patterns
- **assets/** - Ready-to-use component templates
- **Decision guide** - When to use CSS vs Framer Motion vs GSAP
- **Performance tips** - Optimization best practices
- **Accessibility** - Reduced motion support
- **Project integration** - Uses existing animation utilities

## Key Workflows

1. **Hero Section Entrance** - Sequential element animations
2. **Card Hover Effects** - Interactive hover states
3. **Scroll Progress** - Reading/scroll depth indicators
4. **Staggered Lists** - Sequential item reveals
5. **Parallax Scrolling** - Depth with speed differences
6. **Magnetic Buttons** - Cursor-following effects
7. **Page Transitions** - Route change animations
8. **CSS↔JS Conversion** - Migrate between animation systems

## Technology Stack

- Framer Motion v12.23.26
- GSAP v3.14.2 + @gsap/react
- CSS animations & Tailwind transitions
- Existing project utilities in `/src/lib/animations.ts`

## Performance First

The skill emphasizes:
- CSS for simple animations (best performance)
- Framer Motion for React component animations
- GSAP for scroll-triggered and complex animations
- Accessibility with reduced motion support
- Mobile-optimized animations

## Integration

Works seamlessly with:
- All 5 daycare themes (Professional, Nature, Playful, Dark, Violet)
- i18n system (5 languages)
- Existing animation utilities
- Server and client components
- Responsive design patterns
