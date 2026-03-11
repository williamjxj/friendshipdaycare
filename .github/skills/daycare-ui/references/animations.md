# Animation Patterns

Animations use **Framer Motion** for React components and **GSAP** for complex scroll-triggered effects.

## Framer Motion Variants

Import from `/src/lib/animations.ts`:

```tsx
import { 
  fadeIn, 
  slideUp, 
  slideDown, 
  scaleIn, 
  staggerContainer, 
  staggerItem,
  scrollReveal 
} from '@/lib/animations';
```

### Basic Animations

#### Fade In
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeIn}
>
  {/* Content fades in */}
</motion.div>
```

#### Slide Up
```tsx
<motion.div variants={slideUp}>
  {/* Content slides up with fade */}
</motion.div>
```

#### Scale In
```tsx
<motion.div variants={scaleIn}>
  {/* Content scales up from 90% to 100% */}
</motion.div>
```

### Stagger Animations

For animating lists/grids where items appear one after another:

```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItem}>
      {/* Each item animates with 0.1s delay */}
    </motion.div>
  ))}
</motion.div>
```

### Scroll Reveal

For elements that should animate when scrolling into view:

```tsx
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={scrollReveal}
>
  {/* Animates 100px before entering viewport */}
</motion.section>
```

## MagicUI Animations

Import from `/src/lib/magicui-animations.ts`:

```tsx
import { textReveal, scaleInMagic } from '@/lib/magicui-animations';
```

### Text Reveal
```tsx
<motion.h1 variants={textReveal}>
  {/* Text reveals with special effect */}
</motion.h1>
```

## Best Practices

### Duration
- **Quick interactions**: 0.2-0.3s (hover, click)
- **Standard animations**: 0.5-0.6s (fade, slide)
- **Dramatic effects**: 0.8-1.0s (hero sections)

### Easing
- Use `ease: 'easeOut'` for most animations (feels natural)
- Use `ease: 'easeInOut'` for repeated animations
- Avoid `linear` (feels robotic)

### Viewport Options
```tsx
viewport={{ 
  once: true,      // Animate only once (recommended)
  margin: "-100px" // Start animation before element enters (smoother)
}}
```

### Performance
- Animate `opacity`, `transform` (translate, scale) - GPU accelerated
- Avoid animating `width`, `height`, `top`, `left` - causes reflow

## Common Animation Patterns

### Hero Section
```tsx
<motion.section
  initial="hidden"
  animate="visible"  // Note: animate, not whileInView (hero is visible on load)
  variants={staggerContainer}
>
  <motion.h1 variants={slideUp}>Title</motion.h1>
  <motion.p variants={slideUp}>Description</motion.p>
  <motion.div variants={fadeIn}>CTA</motion.div>
</motion.section>
```

### Card Grid
```tsx
<motion.div
  className="grid grid-cols-3 gap-6"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {cards.map((card) => (
    <motion.div key={card.id} variants={staggerItem}>
      <Card>{/* ... */}</Card>
    </motion.div>
  ))}
</motion.div>
```

### Image Gallery
```tsx
<motion.div
  variants={scaleIn}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  <img src={src} alt={alt} />
</motion.div>
```

### Button Hover
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click Me
</motion.button>
```

## GSAP Usage

For complex scroll animations, use GSAP:

```tsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.to('.element', {
    scrollTrigger: {
      trigger: '.element',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    },
    opacity: 1,
    y: 0,
  });
}, []);
```

## Accessibility

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
