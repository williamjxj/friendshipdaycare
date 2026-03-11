# Animation Patterns - Quick Reference

> **For detailed animation workflows**, use the **`/web-animations`** skill which provides comprehensive guides for:
> - Hero entrance animations
> - Card hover effects  
> - Scroll progress indicators
> - Staggered list animations
> - Parallax scrolling
> - Magnetic button effects
> - Page transitions
> - CSS ↔ JS animation conversion

## Quick Start

### Basic Animations

Import from `/src/lib/animations.ts`:

```tsx
import { 
  fadeIn, 
  slideUp, 
  scaleIn, 
  staggerContainer, 
  staggerItem,
  scrollReveal 
} from '@/lib/animations';
```

### Common Patterns

**Fade In:**
```tsx
<motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  Content
</motion.div>
```

**Stagger List:**
```tsx
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Hover Effect:**
```tsx
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  Click
</motion.button>
```

## When to Use What

| Need | Tool | See |
|------|------|-----|
| Simple hover/transitions | CSS classes | [Tailwind docs](https://tailwindcss.com/docs/transition-property) |
| Component animations | Framer Motion | `/web-animations` skill |
| Scroll-triggered effects | GSAP ScrollTrigger | `/web-animations` skill |
| Complex timelines | GSAP | `/web-animations` skill |

## Best Practices

**Performance:**
- Animate `opacity`, `transform` only (GPU accelerated)
- Avoid `width`, `height`, `top`, `left` (causes reflow)
- Use `will-change-transform` for animated elements

**Accessibility:**

Always respect user preferences:

```tsx
// In globals.css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Framer Motion respects this automatically.

## Troubleshooting

**Animation not triggering**
- Check `initial` and `whileInView` are set
- Verify `variants` is imported correctly
- Ensure component is wrapped with `<motion.div>` not `<div>`

**Animation too fast/slow**
- Adjust `duration` in the variant definition
- Check for conflicting Tailwind transition classes

**Animation jerky/laggy**
- Avoid animating `width`, `height`, `top`, `left`
- Use `transform` properties instead (translateX, scale)
- Check for heavy renders in children components

**Animation plays every time element is visible**
- Add `viewport={{ once: true }}` to play only once
