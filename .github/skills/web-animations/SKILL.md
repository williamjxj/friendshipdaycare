---
name: web-animations
description: 'Add animations to web components using Framer Motion, GSAP, CSS animations, and modern scroll effects. Use for: hero entrance animations, card hover effects, scroll progress indicators, staggered list animations, parallax scrolling, magnetic button effects, page transitions, scroll-triggered reveals, loading states, and converting between CSS/JS animations.'
argument-hint: 'Describe the animation to implement (e.g., "add scroll-triggered fade-in", "create magnetic button effect")'
---

# Web Animations Skill

Create and implement modern, performant animations for the Friendship Corner Daycare website using Framer Motion, GSAP ScrollTrigger, and CSS animations.

## When to Use

- Adding entrance animations to hero sections
- Creating hover effects for cards, buttons, or interactive elements
- Implementing scroll-triggered reveals and parallax effects
- Building staggered list/grid animations
- Adding scroll progress indicators
- Creating magnetic button effects (cursor-following)
- Implementing page transitions
- Converting CSS animations to JS (or vice versa) for better control
- Adding loading states and skeleton animations
- Troubleshooting animation performance or accessibility

## Technology Stack

- **Framer Motion** (`framer-motion@^12.23.26`) - React animation library
- **GSAP** (`gsap@^3.14.2`) + **@gsap/react** - Advanced animations and ScrollTrigger
- **CSS Animations** - Keyframes and transitions for simple effects
- **Tailwind Utilities** - Built-in transition classes

## Decision Guide: CSS vs JS Animations

### Use CSS Animations When:
- Simple state transitions (hover, focus, active)
- Single-property animations (opacity, scale, translate)
- Always-running animations (shimmer, pulse, spin)
- Performance-critical animations (60fps guaranteed)
- No complex timing or sequencing needed

**Examples**: Button hover states, loading spinners, shimmer effects

### Use Framer Motion When:
- Component mount/unmount animations
- Conditional animations based on React state
- Gesture-based interactions (drag, tap, hover)
- Layout animations (auto-animating size changes)
- Working with Server Components (motion components work in client)
- Stagger effects with React children

**Examples**: Modal entrances, list stagger effects, page transitions

### Use GSAP When:
- Scroll-triggered animations (ScrollTrigger)
- Complex animation timelines with precise control
- SVG morphing or path animations
- Parallax scrolling effects
- High-performance scrolling animations
- Need to animate non-React elements (DOM directly)

**Examples**: Parallax backgrounds, scroll progress indicators, complex hero animations

## Core Workflows

### 1. Hero Section Entrance Animations

**Scenario**: Animate hero section elements sequentially on page load

**Step 1: Choose Animation Tool**
- For React components with state: Use **Framer Motion**
- For complex timeline sequences: Use **GSAP**

**Step 2: Implement with Framer Motion**

```tsx
'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
          },
        },
      }}
      className="relative min-h-screen flex items-center"
    >
      {/* Title - slides up */}
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
          },
        }}
        className="text-4xl md:text-6xl font-bold"
      >
        Welcome to Friendship Corner
      </motion.h1>

      {/* Subtitle - fades in */}
      <motion.p
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration: 0.6 }
          },
        }}
        className="text-xl md:text-2xl mt-4"
      >
        Where Learning Meets Play
      </motion.p>

      {/* CTA Buttons - scale in */}
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.5, ease: 'backOut' }
          },
        }}
        className="flex gap-4 mt-8"
      >
        <button>Get Started</button>
        <button>Learn More</button>
      </motion.div>
    </motion.section>
  );
}
```

**Step 3: Use Existing Utilities**

Your project has animation utilities in `/src/lib/animations.ts`:

```tsx
import { fadeIn, slideUp, staggerContainer, staggerItem } from '@/lib/animations';

<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### 2. Card Hover Effects

**Scenario**: Add interactive hover effects to cards

**Step 1: Simple CSS Hover (Preferred for Performance)**

```tsx
<div className="group relative overflow-hidden rounded-lg border bg-card
  transition-all duration-300 hover:shadow-xl hover:scale-105">
  
  {/* Card content */}
  <div className="p-6">
    <h3 className="font-semibold transition-colors group-hover:text-primary">
      Card Title
    </h3>
  </div>
  
  {/* Hover overlay */}
  <div className="absolute inset-0 bg-primary/5 opacity-0 
    group-hover:opacity-100 transition-opacity duration-300" />
</div>
```

**Step 2: Advanced Framer Motion Hover**

For cards needing complex hover animations:

```tsx
'use client';

import { motion } from 'framer-motion';

export function AnimatedCard({ title, description, image }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border bg-card"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Image with parallax effect on hover */}
      <motion.div
        className="overflow-hidden"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </motion.div>

      {/* Content with stagger */}
      <motion.div 
        className="p-6"
        initial={false}
        whileHover={{
          transition: { staggerChildren: 0.05 }
        }}
      >
        <motion.h3
          variants={{
            hover: { x: 5, color: 'var(--primary)' }
          }}
          className="font-semibold"
        >
          {title}
        </motion.h3>
        
        <motion.p
          variants={{
            hover: { x: 5 }
          }}
          className="text-muted-foreground mt-2"
        >
          {description}
        </motion.p>
      </motion.div>

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
```

### 3. Scroll Progress Indicators

**Scenario**: Show reading progress or scroll depth

**Step 1: Create Progress Bar Component**

```tsx
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  // Track scroll progress
  const { scrollYProgress } = useScroll();
  
  // Smooth the progress with spring physics
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      style={{ scaleX }}
    />
  );
}
```

**Step 2: Section-Based Progress Indicator**

```tsx
'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

export function SectionProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed progress indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {['Home', 'About', 'Programs', 'Contact'].map((section, i) => (
          <motion.div
            key={section}
            className="w-2 h-2 rounded-full bg-muted"
            style={{
              backgroundColor: scrollYProgress.get() > i * 0.25 
                ? 'var(--primary)' 
                : 'var(--muted)'
            }}
          />
        ))}
      </div>
      
      {/* Your sections here */}
    </div>
  );
}
```

### 4. Staggered List Animations

**Scenario**: Animate list items appearing sequentially

**Step 1: Use Existing Stagger Utilities**

```tsx
'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function ProgramsList({ programs }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {programs.map((program) => (
        <motion.div
          key={program.id}
          variants={staggerItem}
          className="rounded-lg border bg-card p-6"
        >
          <h3>{program.title}</h3>
          <p>{program.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

**Step 2: Custom Stagger with GSAP (For Complex Needs)**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function GSAPStaggerList({ items }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.stagger-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={listRef} className="grid gap-4">
      {items.map((item, i) => (
        <div key={i} className="stagger-item bg-card p-4 rounded-lg">
          {item}
        </div>
      ))}
    </div>
  );
}
```

### 5. Parallax Scrolling

**Scenario**: Create depth with background elements moving at different speeds

**Step 1: Framer Motion Parallax (Simple)**

```tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Background moves slower (0 to -50%)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  
  // Foreground moves faster (0 to 30%)
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background layer */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
      />

      {/* Foreground content */}
      <motion.div
        style={{ y: foregroundY }}
        className="relative z-10 flex items-center justify-center h-full"
      >
        <h1 className="text-6xl font-bold">Parallax Effect</h1>
      </motion.div>
    </div>
  );
}
```

**Step 2: GSAP Parallax (Advanced Control)**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function GSAPParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Background moves slower
      gsap.to(bgRef.current, {
        y: '-30%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Foreground moves faster
      gsap.to(fgRef.current, {
        y: '50%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 bg-muted" />
      <div ref={fgRef} className="relative z-10 flex items-center justify-center h-full">
        <h1>Content</h1>
      </div>
    </div>
  );
}
```

### 6. Magnetic Button Effects

**Scenario**: Button follows cursor on hover (magnetic attraction)

**Step 1: Framer Motion Magnetic Button**

```tsx
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';

export function MagneticButton({ children, ...props }) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull (30% of distance)
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-6 py-3 rounded-lg bg-primary text-primary-foreground
        font-semibold transition-colors"
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

**Step 2: Enhanced with Rotation**

```tsx
export function MagneticButtonRotate({ children }) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { damping: 20, stiffness: 300 });
  const ySpring = useSpring(y, { damping: 20, stiffness: 300 });

  // Add rotation based on position
  const rotateX = useTransform(ySpring, [-30, 30], [10, -10]);
  const rotateY = useTransform(xSpring, [-30, 30], [-10, 10]);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ 
        x: xSpring, 
        y: ySpring,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative px-6 py-3 rounded-lg bg-primary text-primary-foreground"
    >
      {children}
    </motion.button>
  );
}
```

### 7. Page Transitions

**Scenario**: Smooth transitions between route changes

**Step 1: Create Transition Component**

```tsx
// /src/components/ui/page-transition.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Step 2: Wrap in Layout**

```tsx
// /src/app/layout.tsx
import { PageTransition } from '@/components/ui/page-transition';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
```

### 8. Converting CSS to JS Animations

**Scenario**: Need more control over existing CSS animations

**Original CSS Animation**:
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.element {
  animation: fadeInUp 0.6s ease-out;
}
```

**Convert to Framer Motion**:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  Content
</motion.div>
```

**Convert to GSAP**:
```tsx
useEffect(() => {
  gsap.from('.element', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out'
  });
}, []);
```

## Performance Optimization

### 1. Prefer CSS for Simple Animations
```tsx
// Good - CSS, no JS overhead
<div className="transition-transform hover:scale-105 duration-300">

// Overkill - JS for simple hover
<motion.div whileHover={{ scale: 1.05 }}>
```

### 2. Use `will-change` Sparingly
```tsx
// Only when animating
<motion.div
  className="hover:will-change-transform"
  whileHover={{ scale: 1.1 }}
>
```

### 3. Optimize Scroll Animations
```tsx
// Good - viewport once
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: '-50px' }}
>

// Bad - re-animates every scroll
<motion.div whileInView={{ opacity: 1 }}>
```

### 4. GSAP ScrollTrigger Optimization
```tsx
// Use scrub for smooth, performant scroll animations
scrollTrigger: {
  scrub: true, // Ties animation to scroll position
  start: 'top 80%',
  end: 'bottom 20%'
}
```

### 5. Batch Layout Changes
```tsx
// Good - animate transform (composite layer)
<motion.div animate={{ x: 100, y: 50 }}>

// Bad - animate layout properties
<motion.div animate={{ left: 100, top: 50 }}>
```

## Accessibility Considerations

### 1. Respect Reduced Motion Preference

Use utility from `/src/lib/animations.ts`:

```tsx
import { prefersReducedMotion } from '@/lib/animations';

export function AnimatedComponent() {
  const shouldReduceMotion = prefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
    >
      Content
    </motion.div>
  );
}
```

### 2. Framer Motion Reduced Motion

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.6,
    // Respect system preference
    ...(prefersReducedMotion() && { duration: 0 })
  }}
>
```

### 3. GSAP Reduced Motion

```tsx
useEffect(() => {
  if (prefersReducedMotion()) return;

  gsap.from('.element', {
    opacity: 0,
    y: 20,
    duration: 0.6
  });
}, []);
```

## Common Patterns

### Shimmer Effect (CSS)
```tsx
<div className="relative overflow-hidden">
  <div className="absolute inset-0 -translate-x-full animate-shimmer 
    bg-gradient-to-r from-transparent via-white/10 to-transparent" />
</div>

// In CSS (globals.css):
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 2s infinite;
}
```

### Pulse Effect (CSS)
```tsx
<div className="animate-pulse">Loading...</div>
// Built-in Tailwind animation
```

### Rotate Spinner (CSS)
```tsx
<div className="animate-spin h-8 w-8 border-4 border-primary 
  border-t-transparent rounded-full" />
// Built-in Tailwind animation
```

### Entrance Reveal (Framer Motion)
```tsx
import { scrollReveal } from '@/lib/animations';

<motion.div
  variants={scrollReveal}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
```

## Troubleshooting

### Animation Not Playing
1. Check client component: Add `'use client'` directive
2. Verify initial state differs from animate state
3. Check CSS conflicts (overflow: hidden, z-index)
4. Ensure GSAP plugins registered: `gsap.registerPlugin(ScrollTrigger)`

### Janky/Stuttering Animation
1. Use `transform` instead of `top`/`left`
2. Add `will-change-transform` class
3. Reduce stagger delay
4. Check for layout thrashing (batch reads before writes)

### ScrollTrigger Not Firing
1. Ensure element is in viewport path
2. Check `start` and `end` values
3. Add markers for debugging: `markers: true`
4. Verify ScrollTrigger is registered

### Reduced Motion Not Working
1. Test: System Preferences > Accessibility > Display > Reduce Motion
2. Use `prefersReducedMotion()` utility consistently
3. Provide instant completion instead of no animation

## Examples from Existing Codebase

Your project already has utilities in:
- `/src/lib/animations.ts` - Framer Motion variants
- `/src/lib/magicui-animations.ts` - Advanced effects

Existing implementations:
- `/src/components/ui/hero-image-carousel.tsx` - Carousel with GSAP
- `/src/components/ui/ImageCarousel.tsx` - Embla with animations
- `/src/components/sections/RealEnvironmentShowcase.tsx` - Scroll animations

Refer to these for project-specific patterns and conventions.

## Quick Reference

| Animation Type | Tool | Performance | Complexity |
|----------------|------|-------------|------------|
| Hover effects | CSS | ⚡⚡⚡ | Simple |
| Entrance animations | Framer Motion | ⚡⚡ | Medium |
| Scroll-triggered | GSAP ScrollTrigger | ⚡⚡⚡ | Medium |
| Parallax | GSAP | ⚡⚡⚡ | Medium |
| Page transitions | Framer Motion | ⚡⚡ | Simple |
| Complex timelines | GSAP | ⚡⚡⚡ | Complex |
| Gesture interactions | Framer Motion | ⚡⚡ | Medium |

## Next Steps After Implementation

1. Test across all 5 themes (Professional, Nature, Playful, Dark, Violet)
2. Verify smooth performance on mobile devices
3. Test with reduced motion preference enabled
4. Validate animations work with i18n language switching
5. Review Lighthouse performance score impact
