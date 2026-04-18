# Frontend Animation & UX/UI Reference

A complete personal reference for CSS animations, Motion/GSAP, component libraries, typography, spatial design, and performance — curated and organized for daily use.

Updated April 2026
Motion v12
GSAP 3
React + Next.js

## Contents

[01 Library Ecosystem](#s1)
[02 CSS Animations](#s2)
[03 Motion (Framer Motion)](#s3)
[04 GSAP & ScrollTrigger](#s4)
[05 Hero Section Patterns](#s5)
[06 Card & Box Animations](#s6)
[07 Background & Gradients](#s7)
[08 Typography & Font Animations](#s8)
[09 Typography & Color System](#s9)
[10 Spatial Composition](#s10)
[11 Scale-up & Micro-interactions](#s11)
[12 Performance Rules](#s12)
[13 Component Libraries](#s13)
[14 Motion Design Principles](#s14)
[15 Resources & Links](#s15)

📦

Section 01

## Library Ecosystem

| Library | What It Does | Bundle | Best For | Stack |
| --- | --- | --- | --- | --- |
| Pure CSS | Keyframes, transitions, scroll-timeline | 0 KB | Hover, flip, entrance reveals | CSS |
| Motion (v12) | React/JS animation engine, gestures, layout | 34 KB / 4.6 KB lazy | React apps, physics-based motion | React |
| GSAP 3 | Timeline orchestration, ScrollTrigger, SplitText | ~60 KB | Complex timelines, scroll cinema | Any |
| Lenis | Smooth scroll replacement | ~5 KB | Cinematic smooth scroll | Any |
| Three.js / R3F | WebGL 3D scenes | ~600 KB | 3D hero, particle fields | React |
| react-spring | Physics spring animations | ~30 KB | Gestural, drag UIs | React |
| anime.js | Lightweight JS animation | ~14 KB | SVG paths, DOM animations | Any |
| Motion One | Tiny WAAPI wrapper (Motion vanilla) | ~3 KB | Vanilla JS, micro-animations | Any |

ℹ

**Framer Motion → Motion:** In 2025, Framer Motion became an independent project renamed **Motion**. Import from `motion/react` instead of `framer-motion`. v12 adds hardware-accelerated scroll, `layout="x"` axis lock, and new color types (oklch, color-mix).

### Decision flowchart

| Situation | Use |
| --- | --- |
| Hover feedback only, no JS | CSS transition |
| Entrance reveal on scroll, no JS | CSS @keyframes + animation-timeline: view() |
| React component animation | Motion (motion/react) |
| Complex multi-step timeline | GSAP Timeline |
| Scroll-sync to animation | GSAP ScrollTrigger |
| Smooth scroll + scroll animation | Lenis + GSAP ScrollTrigger |
| 3D scene / particles | Three.js + R3F + GSAP |
| Copy-paste animated component | Magic UI / Aceternity UI / react-bits |

---

🎨

Section 02

## CSS Animations

### Transitions — the golden rule

Only animate `transform` and `opacity`. These run on the GPU compositor and never cause layout recalculation (reflow). Animating `width`, `top`, `margin`, or `background-color` triggers expensive reflow every frame.

#### ✓ Do

* Animate `transform: translate / scale / rotate`
* Animate `opacity`
* Use `will-change: transform` sparingly on animated elements
* Add `transform: translateZ(0)` to promote to GPU layer
* Use `transition-timing-function: cubic-bezier()` for custom easing

#### ✗ Don't

* Animate `width`, `height`, `top`, `left`
* Animate `margin`, `padding`, `border-width`
* Animate `background-color` frequently (cheap but blocks compositor)
* Use `setInterval` for animations — use `requestAnimationFrame`
* Apply `will-change` to every element (wastes VRAM)

### Essential @keyframe patterns

CSS Keyframes — Reusable Entry Animations

```
/* Fade up — most versatile entrance */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Fade in with scale — premium card feel */
@keyframes scaleFade {
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
}

/* Slide in from left */
@keyframes slideLeft {
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Blur reveal — editorial text */
@keyframes blurIn {
  from { opacity: 0; filter: blur(12px); transform: translateY(8px); }
  to   { opacity: 1; filter: blur(0);  transform: translateY(0); }
}

/* Stagger application */
.card:nth-child(1) { animation: fadeUp 0.6s ease 0s    both; }
.card:nth-child(2) { animation: fadeUp 0.6s ease 0.1s  both; }
.card:nth-child(3) { animation: fadeUp 0.6s ease 0.2s  both; }
.card:nth-child(4) { animation: fadeUp 0.6s ease 0.3s  both; }
```

CSS Scroll-Driven Animation (Native — No JS)

Modern

```
/* Native scroll-triggered reveal — Chrome 115+, FF 110+ */
.reveal {
  animation: fadeUp linear both;
  animation-timeline: view();          /* ties to element in viewport */
  animation-range: entry 10% cover 35%; /* 10% in → 35% covered */
}

/* Parallax image on scroll */
.hero-img {
  animation: parallaxDrift linear both;
  animation-timeline: scroll();
  animation-range: 0% 100%;
}
@keyframes parallaxDrift {
  from { transform: translateY(0); }
  to   { transform: translateY(-80px); }
}

/* Progress bar tied to page scroll */
.progress-bar {
  position: fixed; top: 0; left: 0; height: 3px;
  background: #7c6ff7;
  transform-origin: left;
  animation: scaleX linear;
  animation-timeline: scroll(root);
}
@keyframes scaleX {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

CSS — Intersection Observer Fallback

```
/* CSS — initial hidden state */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.65s ease, transform 0.65s cubic-bezier(0.16,1,0.3,1);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* JS — Intersection Observer */
const io = new IntersectionObserver(
  entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
```

### Hover state patterns

CSS — Hover Effects Catalog

```
/* Lift + shadow */
.card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
.card:hover {
  transform: translateY(-8px) scale(1.015);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2), 0 6px 12px rgba(0,0,0,0.12);
}

/* Glow border */
.card { transition: box-shadow 0.3s; }
.card:hover { box-shadow: 0 0 0 1px #7c6ff7, 0 0 24px rgba(124,111,247,0.35); }

/* Underline slide — nav links */
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute; bottom: -2px; left: 0; right: 100%; height: 1px;
  background: currentColor;
  transition: right 0.3s cubic-bezier(0.4,0,0.2,1);
}
.nav-link:hover::after { right: 0; }

/* Button ripple (no JS) */
.btn { overflow: hidden; position: relative; }
.btn::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
  transform: scale(0);
  transition: transform 0.5s;
}
.btn:hover::before { transform: scale(2); }

/* Shine sweep */
.shine { position: relative; overflow: hidden; }
.shine::after {
  content: '';
  position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
  transform: skewX(-15deg);
  transition: left 0.6s;
}
.shine:hover::after { left: 150%; }
```

### 3D flip card

HTML + CSS — 3D Flip Card

Medium

```
/* HTML */
<div class="flip-card">
  <div class="flip-inner">
    <div class="flip-front">Front</div>
    <div class="flip-back">Back</div>
  </div>
</div>

/* CSS */
.flip-card  { perspective: 1000px; }
.flip-inner {
  transition: transform 0.65s cubic-bezier(0.4,0,0.2,1);
  transform-style: preserve-3d;
  position: relative; height: 100%;
}
.flip-card:hover .flip-inner { transform: rotateY(180deg); }

.flip-front, .flip-back {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  border-radius: 12px;
}
.flip-back { transform: rotateY(180deg); }
```

---

⚡

Section 03

## Motion — React Animation (formerly Framer Motion)

★

Import from `motion/react` (v12+). The old `framer-motion` package still works but is no longer actively developed. API is identical.

### Core API cheatsheet

motion/react — Core Patterns

React

```
import {
  motion, AnimatePresence, LayoutGroup,
  useScroll, useTransform, useSpring,
  useMotionValue, useAnimation, useInView,
  LazyMotion, domAnimation, m
} from 'motion/react'

/* Basic animation */
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
/>

/* whileInView — trigger on scroll entry */
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
/>

/* Hover + tap */
<motion.button
  whileHover={{ scale: 1.04, y: -2 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
/>

/* AnimatePresence — exit animations */
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    />
  )}
</AnimatePresence>
```

Variants — Stagger Children

React

```
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { ease: [0.16,1,0.3,1], duration: 0.6 } },
}

// JSX
<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.li key={i.id} variants={item}>{i.label}</motion.li>
  ))}
</motion.ul>
```

Scroll — useScroll + useTransform

React

```
import { useScroll, useTransform, useSpring } from 'motion/react'

function HeroParallax() {
  const { scrollYProgress } = useScroll()
  const y     = useTransform(scrollYProgress, [0,1], ['0%', '40%'])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 })

  return <motion.div style={{ y: smoothY, scale, opacity }} />
}

/* Element-level scroll progress */
const ref = useRef(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
```

3D Tilt — Mouse Tracking

Advanced

```
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

function TiltCard({ children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 25 })
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 })

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width  - 0.5)
    y.set((e.clientY - r.top)  / r.height - 0.5)
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800 }}
    >
      {children}
    </motion.div>
  )
}

/* Layout animations — animate element repositioning automatically */
<motion.div layout />
<motion.div layout="position" />   // only position
<motion.div layout="x" />         // v12: axis-locked layout anim
```

Accessibility — Respect Reduced Motion

```
import { useReducedMotion } from 'motion/react'

function AnimatedCard() {
  const reduce = useReducedMotion()
  const variants = {
    hidden:  { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  }
  return <motion.div variants={variants} initial="hidden" animate="visible" />
}

/* Or via MotionConfig globally */
<MotionConfig reducedMotion="user">  /* auto-detect from OS */
  <App />
</MotionConfig>
```

LazyMotion — Bundle Optimization

```
/* Drops bundle from 34KB → 4.6KB for simple cases */
import { LazyMotion, domAnimation, m } from 'motion/react'

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div animate={{ opacity: 1 }} />  /* m instead of motion */
    </LazyMotion>
  )
}
```

### Easing quick reference

| Name | Curve | Use Case |
| --- | --- | --- |
| `easeOut` | `[0, 0, 0.58, 1]` | Element entering screen |
| `easeIn` | `[0.42, 0, 1, 1]` | Element leaving screen |
| `easeInOut` | `[0.42, 0, 0.58, 1]` | State transitions, modals |
| Spring gentle | `{stiffness:120, damping:20}` | Cards, tooltips |
| Spring snappy | `{stiffness:400, damping:25}` | Buttons, toggles |
| Expo out | `[0.16, 1, 0.3, 1]` | Hero entrance, dramatic reveals |
| Back out | `[0.34, 1.56, 0.64, 1]` | Playful bounce entries |

---

🟢

Section 04

## GSAP & ScrollTrigger

### GSAP fundamentals

GSAP — Setup & Core API

```
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText }    from 'gsap/SplitText'     // Club plugin
import { ScrollSmoother } from 'gsap/ScrollSmoother' // Club plugin

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother)

/* gsap.to — animate TO values */
gsap.to('.box', { x: 200, duration: 1, ease: 'power2.out' })

/* gsap.from — animate FROM values */
gsap.from('.hero-text', { y: 60, opacity: 0, duration: 0.8, ease: 'expo.out' })

/* gsap.fromTo — full control */
gsap.fromTo('.card',
  { opacity: 0, scale: 0.9 },
  { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }
)

/* Timeline — sequential / overlapping */
const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 0.7 } })
tl.from('.hero-badge', { y: 20, opacity: 0 })
  .from('.hero-h1',   { y: 40, opacity: 0 }, '-=0.4')   // overlap 0.4s
  .from('.hero-sub',  { y: 20, opacity: 0 }, '-=0.3')
  .from('.hero-cta',  { y: 20, opacity: 0 }, '-=0.25')
```

### ScrollTrigger patterns

ScrollTrigger — All Key Options

Advanced

const tl = gsap.timeline({
scrollTrigger: {
trigger: '.section', // element that triggers
start: 'top 80%', // [trigger pos] [viewport pos]
end: 'bottom top', // or '+=400' for pixel offset
scrub: 1, // true = instant, num = smoothing seconds
pin: true, // pin trigger while animating
pinSpacing: true, // keep space after pin
markers: false, // set true for DEV debug
anticipatePin: 1, // smooths pin jump
invalidateOnRefresh: true, // recalc on resize
toggleClass: 'active', // add class while active
once: false, // trigger only once
onEnter: () => {},
onLeave: () => {},
onEnterBack: () => {},
onLeaveBack: () => {},
onUpdate: (self) => console.log(self.progress),
}
})
/\* Pinned horizontal scroll \*/
gsap.to('.track', {
xPercent: -100 \* (panels.length - 1),
ease: 'none',
scrollTrigger: {
trigger: '.container',
pin: true, scrub: 1,
end: () => '+=' + document.querySelector('.track').offsetWidth,
}
})

ScrollTrigger — Stagger Grid Reveal

```
gsap.from('.card', {
  scrollTrigger: {
    trigger: '.card-grid',
    start:   'top 80%',
    once:    true,
  },
  y: 50, opacity: 0, duration: 0.8,
  stagger: { amount: 0.6, from: 'start' },   // or 'center', 'edges', 'random'
  ease: 'power2.out',
})

/* Text SplitText reveal */
const split = new SplitText('.headline', { type: 'words,chars' })
gsap.from(split.chars, {
  scrollTrigger: { trigger: '.headline', start: 'top 85%', once: true },
  y: '110%', opacity: 0, duration: 0.7,
  stagger: 0.025, ease: 'expo.out',
})
```

Lenis + GSAP Smooth Scroll Setup

```
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

/* Sync Lenis with GSAP ticker */
gsap.ticker.add(time => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

/* Also call ScrollTrigger.refresh after Lenis setup */
lenis.on('scroll', ScrollTrigger.update)
ScrollTrigger.defaults({ scroller: lenis.wrapper })
```

### GSAP easing quick picks

| Ease | Effect | Use |
| --- | --- | --- |
| `power1.out` | Gentle deceleration | Subtle reveals |
| `power2.out` | Standard deceleration | Most cases |
| `power4.out` | Strong initial velocity | Dramatic entries |
| `expo.out` | Explosive then settled | Hero headline |
| `back.out(1.5)` | Slight overshoot | Playful UI |
| `elastic.out(1, 0.4)` | Spring bounce | Notification |
| `none` | Linear | Scrub animations |
| `CustomEase.create(...)` | Bezier curve | Brand motion |

---

🦸

Section 05

## Hero Section Patterns

### Staggered entrance

Badge → H1 words → subtext → CTA, each offset by 80–120ms. The most reliable premium feel. Use expo.out or spring easing.

### Parallax split

Background image moves at 0.4× scroll speed. Text moves at 1×. Creates depth without 3D. Pure CSS with scroll-timeline or GSAP scrub.

### Cinematic pin

Hero section is pinned. As user scrolls, content animates in and out. Reveals product/feature behind the hero text. GSAP ScrollTrigger.

### Blur reveal

Words start blurred, sharpen on entry. Combine `filter: blur()` + opacity transition. Creates cinematic focus-pull effect.

### SVG path draw

SVG lines, arrows, or outlines "draw" themselves on page load using `stroke-dashoffset` + GSAP or Motion animation.

### 3D scroll scene

Three.js/R3F canvas behind hero. Camera moves as user scrolls via GSAP ScrollTrigger scrub. GPU-heavy, use wisely.

GSAP — Hero Entrance Sequence

```
function heroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 0.9 } })

  tl.from('.hero-eyebrow', { y: 20,  opacity: 0, duration: 0.6 })
    .from('.hero-h1 .word', { y: '120%', opacity: 0, stagger: 0.07 }, '-=0.3')
    .from('.hero-sub',     { y: 20,  opacity: 0, duration: 0.7 }, '-=0.4')
    .from('.hero-cta',     { y: 15,  opacity: 0, stagger: 0.1 }, '-=0.3')
    .from('.hero-visual',  { scale: 0.92, opacity: 0, duration: 1.2 }, '-=0.8')

  return tl
}
```

Motion — Hero with Variants (React)

const heroVariants = {
hidden: {},
show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}
const item = {
hidden: { opacity: 0, y: 30 },
show: { opacity: 1, y: 0, transition: { ease: [0.16,1,0.3,1], duration: 0.7 } }
}
function Hero() {
return (
<motion.section variants={heroVariants} initial="hidden" animate="show">
<motion.p variants={item} className="eyebrow">Tagline</motion.p>
<motion.h1 variants={item}>Big headline</motion.h1>
<motion.p variants={item} className="sub">Subtext</motion.p>
<motion.div variants={item} className="cta-group">
<Button /><Link />
</motion.div>
</motion.section>
)
}

---

🃏

Section 06

## Card & Box Animations

CSS — Card Effect Catalog

```
/* 1. Lift + layered shadow */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
}
.card:hover {
  transform: translateY(-8px) scale(1.015);
  box-shadow:
    0 2px 4px rgba(0,0,0,0.04),
    0 8px 16px rgba(0,0,0,0.08),
    0 24px 48px rgba(0,0,0,0.12);
}

/* 2. Border glow on hover */
.card-glow {
  border: 1px solid transparent;
  background-clip: padding-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.card-glow:hover {
  border-color: rgba(124,111,247,0.5);
  box-shadow: 0 0 0 1px rgba(124,111,247,0.15),
              0 0 32px rgba(124,111,247,0.2);
}

/* 3. Gradient border (no JS) */
.card-gradient-border {
  background:
    linear-gradient(var(--bg), var(--bg)) padding-box,
    linear-gradient(135deg, #7c6ff7, #22d3ee) border-box;
  border: 1.5px solid transparent;
}

/* 4. Mouse-spotlight (needs JS for --x, --y custom props) */
.card-spotlight {
  background: radial-gradient(
    300px circle at var(--x) var(--y),
    rgba(255,255,255,0.06) 0%,
    transparent 80%
  );
}

/* JS for spotlight */
el.addEventListener('mousemove', e => {
  const r = el.getBoundingClientRect()
  el.style.setProperty('--x', `${e.clientX - r.left}px`)
  el.style.setProperty('--y', `${e.clientY - r.top}px`)
})
```

Motion — Card Interaction Suite (React)

function AnimatedCard({ children }) {
return (
<motion.div
className="card"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
whileHover={{ y: -6, scale: 1.02 }}
whileTap={{ scale: 0.98 }}
viewport={{ once: true, margin: '-40px' }}
transition={{ type: 'spring', stiffness: 300, damping: 24 }}
>
{children}
</motion.div>
)
}
/\* Bento grid with stagger \*/
const containerV = {
hidden: {},
show: { transition: { staggerChildren: 0.08 } }
}
const itemV = {
hidden: { opacity: 0, scale: 0.95 },
show: { opacity: 1, scale: 1, transition: { ease: [0.16,1,0.3,1], duration: 0.5 } }
}
<motion.div className="bento-grid" variants={containerV} initial="hidden" whileInView="show">
{cells.map(c => <motion.div key={c.id} variants={itemV} />)}
</motion.div>

---

🌈

Section 07

## Backgrounds & Gradients

CSS — Background Effects Catalog

```
/* 1. Mesh gradient background */
.bg-mesh {
  background:
    radial-gradient(at 20% 30%, hsl(250,80%,60%, 0.4) 0, transparent 60%),
    radial-gradient(at 80% 70%, hsl(190,80%,55%, 0.35) 0, transparent 60%),
    radial-gradient(at 50% 10%, hsl(310,70%,60%, 0.3) 0, transparent 50%),
    #0d0d0f;
}

/* 2. Animated gradient orb */
@keyframes orbFloat {
  0%,100% { transform: translate(0,0)   scale(1); }
  33%     { transform: translate(40px,-30px) scale(1.1); }
  66%     { transform: translate(-20px,20px) scale(0.9); }
}
.orb {
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124,111,247,0.3), transparent 70%);
  filter: blur(80px);
  animation: orbFloat 12s ease-in-out infinite;
}

/* 3. Noise texture overlay */
.noise::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  opacity: 0.04;
  pointer-events: none;
}

/* 4. Grid lines background */
.bg-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* 5. Dot pattern */
.bg-dots {
  background-image: radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* 6. Animated gradient text */
.gradient-text {
  background: linear-gradient(90deg, #7c6ff7, #22d3ee, #e879a0, #7c6ff7);
  background-size: 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 6s linear infinite;
}
@keyframes gradientShift {
  0%   { background-position: 0%; }
  100% { background-position: 300%; }
}
```

⚠

Use `filter: blur()` sparingly — it requires GPU compositing and creates new stacking contexts. Heavy blur on large elements can tank performance. Prefer pre-blurred assets for static backgrounds.

---

✍️

Section 08

## Typography & Font Animations

CSS — Text Animation Techniques

```
/* 1. Word reveal with clip — most impactful */
.word-wrap  { display: inline-block; overflow: hidden; }
.word       { display: inline-block; animation: wordUp 0.7s expo.out both; }

@keyframes wordUp {
  from { transform: translateY(110%); }
  to   { transform: translateY(0); }
}

/* 2. Letter cascade */
.letter { display: inline-block; animation: letterFall 0.5s both; }
.letter:nth-child(n) { animation-delay: calc(n * 0.03s); }  /* set via JS */

@keyframes letterFall {
  from { opacity: 0; transform: translateY(-20px) rotate(5deg); }
  to   { opacity: 1; transform: translateY(0) rotate(0); }
}

/* 3. Typewriter cursor */
.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid currentColor;
  animation: type 2s steps(30) both, blink 0.75s step-end infinite;
}
@keyframes type  { from { width: 0; } }
@keyframes blink { 50% { border-color: transparent; } }

/* 4. Counter animation */
@property --num { syntax: '<integer>'; initial-value: 0; inherits: false; }
.counter {
  animation: countUp 2s ease-out;
  counter-reset: count var(--num);
}
.counter::after { content: counter(count); }
@keyframes countUp { from { --num: 0; } to { --num: 1000; } }

/* 5. Text shimmer (loading state) */
.shimmer {
  background: linear-gradient(90deg, #333 25%, #555 50%, #333 75%);
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 2s linear infinite;
}
@keyframes shimmer { to { background-position: -200%; } }
```

GSAP SplitText — Word / Char Reveal

GSAP Club

/\* Word-by-word masked reveal \*/
gsap.registerPlugin(SplitText)
const split = new SplitText('.headline', {
type: 'words',
mask: 'words', // auto wraps in overflow:hidden container
})
gsap.from(split.words, {
y: '120%',
opacity: 0,
duration: 0.8,
ease: 'expo.out',
stagger: 0.07,
scrollTrigger: { trigger: '.headline', start: 'top 85%', once: true }
})
/\* Char scramble effect \*/
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
function scramble(el, finalText, duration = 800) {
let start = null
requestAnimationFrame(function step(ts) {
if (!start) start = ts
const progress = Math.min((ts - start) / duration, 1)
const reveal = Math.floor(progress \* finalText.length)
el.textContent =
finalText.slice(0, reveal) +
Array.from({ length: finalText.length - reveal },
() => chars[Math.floor(Math.random() \* chars.length)]).join('')
if (progress < 1) requestAnimationFrame(step)
})
}

---

🎨

Section 09

## Typography & Color System

### Typography principles

| Element | Scale | Weight | Notes |
| --- | --- | --- | --- |
| Display / Hero H1 | clamp(48px, 7vw, 96px) | 700–900 | Tight tracking: -0.04em to -0.06em |
| Section H2 | clamp(32px, 4vw, 52px) | 600–700 | -0.02em to -0.03em |
| Subsection H3 | 20–28px | 600 | -0.01em |
| Body / Prose | 16–18px | 400 | line-height: 1.7–1.85 |
| Caption / Label | 12–13px | 500 | +0.04em tracking, uppercase |
| Mono / Code | 13–14px | 400 | Fira Code, JetBrains Mono |

✓

Use `clamp(min, preferred, max)` for fluid type. Pair a distinctive display font with a refined body font. Never use Inter, Roboto, or Arial — choose type with character.

CSS — Fluid Type + Distinctive Font Pairings

/\* Import distinctive fonts \*/
@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;700;900&family=Instrument+Serif:ital@0;1&display=swap');
:root {
/\* Option 1: Editorial \*/
--font-display: 'Cabinet Grotesk', sans-serif; /\* punchy sans \*/
--font-body: 'Instrument Serif', serif; /\* literary body \*/
/\* Option 2: Futuristic \*/
--font-display: 'Space Grotesk', sans-serif;
--font-body: 'DM Sans', sans-serif;
/\* Option 3: Luxury \*/
--font-display: 'Cormorant Garamond', serif;
--font-body: 'Neue Montreal', sans-serif;
/\* Option 4: Technical \*/
--font-display: 'Geist', sans-serif;
--font-body: 'Geist Mono', monospace;
/\* Fluid type scale \*/
--text-hero: clamp(3rem, 7vw + 0.5rem, 7rem);
--text-h1: clamp(2rem, 4vw + 0.5rem, 3.5rem);
--text-h2: clamp(1.5rem, 2.5vw + 0.25rem, 2.5rem);
--text-h3: clamp(1.1rem, 1.5vw + 0.1rem, 1.5rem);
--text-body: clamp(1rem, 1vw + 0.25rem, 1.125rem);
}

### CSS custom property theming

CSS — Full Token System

```
:root {
  /* ── Brand palette ── */
  --color-primary:    hsl(247, 91%, 70%);
  --color-primary-dim: hsl(247, 60%, 55%);
  --color-accent:     hsl(185, 85%, 60%);

  /* ── Semantic ── */
  --color-bg:         hsl(240, 10%, 6%);
  --color-surface:    hsl(240, 10%, 10%);
  --color-surface-2:  hsl(240, 8%, 14%);
  --color-border:     rgba(255,255,255, 0.08);
  --color-border-2:   rgba(255,255,255, 0.15);
  --color-text:       hsl(240, 20%, 96%);
  --color-muted:      hsl(240, 15%, 65%);
  --color-subtle:     hsl(240, 10%, 45%);

  /* ── Motion tokens ── */
  --ease-out:   cubic-bezier(0, 0, 0.2, 1);
  --ease-in:    cubic-bezier(0.4, 0, 1, 1);
  --ease-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-fast:   150ms;
  --dur-base:   300ms;
  --dur-slow:   600ms;

  /* ── Spacing scale (4px base) ── */
  --space-1: 4px; --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;

  /* ── Radius ── */
  --radius-sm: 4px; --radius-md: 8px;
  --radius-lg: 12px; --radius-xl: 20px; --radius-full: 9999px;
}
```

---

📐

Section 10

## Spatial Composition

### Asymmetric layouts

Break out of centered columns. Use `grid-template-columns: 2fr 1fr` or odd splits. Offset elements across the grid boundary with negative margins or absolute positioning.

### Overlapping elements

Layer cards, images, and text with `z-index` and `margin-top: -40px`. Creates depth and visual tension. Common in bento grids and modern SaaS landing pages.

### Diagonal flow

Use `clip-path: polygon()` or `transform: skewY(-3deg)` on section separators for directional energy instead of flat horizontal bands.

### Negative space

Generous padding lets content breathe. Rule: if unsure, double your padding. Whitespace is not empty — it directs eye movement and signals premium quality.

### Bento grid

CSS Grid with mixed-size cells. Use `grid-row: span 2` and `grid-column: span 2` for feature tiles. Each cell tells one story.

### Sticky storytelling

Fix narrative text with `position: sticky` while content scrolls past. Reveals product screenshots, features, or illustrations frame-by-frame.

CSS — Bento Grid + Overlapping Layout

.bento {
display: grid;
grid-template-columns: repeat(12, 1fr);
grid-auto-rows: 80px;
gap: 16px;
}
.bento-hero { grid-column: span 8; grid-row: span 4; }
.bento-tall { grid-column: span 4; grid-row: span 5; }
.bento-wide { grid-column: span 6; grid-row: span 2; }
.bento-small { grid-column: span 3; grid-row: span 2; }
/\* Diagonal section divider \*/
.section-clip {
clip-path: polygon(0 0, 100% 4vw, 100% 100%, 0 100%);
padding-top: calc(4vw + 64px);
}
/\* Sticky feature reveal \*/
.sticky-text {
position: sticky;
top: 30vh;
align-self: start;
}
.scroll-images { display: flex; flex-direction: column; gap: 100px; }

---

✨

Section 11

## Scale-up & Micro-interactions

0.97×tap

1.02×hover lift

1.05×feature card

1.08×CTA button

1.15×icon bounce

>1.2×avoid ⚠

Micro-interaction Patterns

```
/* Button: scale + color shift */
.btn {
  transition: transform 120ms ease, background 150ms ease, box-shadow 150ms ease;
}
.btn:hover  { transform: translateY(-1px) scale(1.02); box-shadow: 0 4px 16px rgba(124,111,247,0.4); }
.btn:active { transform: translateY(0) scale(0.97); }

/* Icon: spin on hover */
.icon-arrow { transition: transform 0.2s var(--ease-bounce); }
.btn:hover .icon-arrow { transform: translateX(4px); }

/* Toggle switch */
@keyframes toggleOn {
  0%  { transform: translateX(0); }
  50% { transform: translateX(26px) scale(1.15); }
  100% { transform: translateX(24px) scale(1); }
}

/* Checkbox checkmark draw */
@keyframes checkDraw {
  from { stroke-dashoffset: 20; }
  to   { stroke-dashoffset: 0; }
}
.checkmark path { stroke-dasharray: 20; animation: checkDraw 0.25s ease-out; }

/* Skeleton loading */
@keyframes skeleton {
  from { background-position: 200%; }
  to   { background-position: -200%; }
}
.skeleton {
  background: linear-gradient(90deg, #1a1a1e 25%, #252530 50%, #1a1a1e 75%);
  background-size: 400%;
  animation: skeleton 2s ease infinite;
  border-radius: 6px;
}

/* Input: focus ring grow */
input {
  outline: 2px solid transparent;
  outline-offset: 0;
  transition: outline-color 0.15s, outline-offset 0.15s;
}
input:focus {
  outline-color: #7c6ff7;
  outline-offset: 2px;
}
```

---

⚡

Section 12

## Performance Rules

#### ✓ Do — GPU compositor path

* Animate `transform` (translate, scale, rotate, skew)
* Animate `opacity`
* Use `will-change: transform` on elements that will animate
* Add `contain: layout style` on isolated components
* Use `requestAnimationFrame` for JS animations
* Batch DOM reads before writes (avoid layout thrashing)
* Lazy load heavy libraries (GSAP plugins, Three.js)
* Use `LazyMotion` from motion/react to reduce bundle
* Respect `prefers-reduced-motion` media query
* Test at CPU 6× throttle in DevTools

#### ✗ Don't — triggers layout/paint

* Animate `width`, `height`, `top`, `left`
* Animate `margin`, `padding`, `border-width`
* Read layout inside animation loop (`offsetWidth`, `getBoundingClientRect`)
* Apply `will-change` to every element
* Use heavy `filter: blur()` on animating elements
* Fire scroll/resize events without debounce
* Load Three.js or GSAP on every page route
* Stack multiple `box-shadow` layers on hover
* Use `setInterval` for frame-by-frame animation

CSS — Respect Reduced Motion

@media (prefers-reduced-motion: reduce) {
\*, \*::before, \*::after {
animation-duration: 0.01ms !important;
animation-iteration-count: 1 !important;
transition-duration: 0.01ms !important;
scroll-behavior: auto !important;
}
}
/\* Safe pattern: define animations only in no-preference \*/
@media (prefers-reduced-motion: no-preference) {
.hero { animation: fadeUp 0.8s var(--ease-expo) both; }
}

| Property | Compositor layer? | Cost |
| --- | --- | --- |
| `transform` | ✓ Yes | Free — GPU handles |
| `opacity` | ✓ Yes | Free — GPU handles |
| `filter` | Partial | Medium — depends on type |
| `background-color` | No | Low — paint only, no layout |
| `width / height` | No | HIGH — triggers full layout |
| `top / left / margin` | No | HIGH — triggers full layout |
| `box-shadow` | No | Medium — paint, not layout |

---

🧩

Section 13

## Component Libraries

### shadcn/ui

Not a package — code you own. Radix primitives + Tailwind CSS. Accessible, composable, customizable. Install components via CLI (`npx shadcn@latest add button`). The industry standard foundation for React apps.

[ui.shadcn.com ↗](https://ui.shadcn.com)

React
0 KB runtime

### Magic UI

150+ animated components built on shadcn/ui + Motion (Framer Motion). Marquees, animated cards, sparkles, shimmer, word fade-in, bento grids. Perfect companion for marketing pages and SaaS landing pages. Used on Langfuse, Million.dev.

[magicui.design ↗](https://magicui.design)

React
+Motion

### Aceternity UI

200+ stunning animated components. Spotlight cards, moving borders, hero sections, Macbook scroll, 3D card, aurora backgrounds, beam effects. Built on Tailwind + Motion. The go-to for SaaS landing pages. Copy-paste into your codebase.

[ui.aceternity.com ↗](https://ui.aceternity.com)

React
+Motion

### react-bits

#2 JS Rising Stars 2025 110+ components. No Framer Motion dependency — uses CSS animations by default, pulls in GSAP/Three.js only when needed. Best-in-class text effects: BlurText, SplitText, GradientText. Lighter bundle than Aceternity.

[reactbits.dev ↗](https://reactbits.dev)

React
CSS-first

### 21st.dev

Open-source npm for shadcn/ui components. Like Dribbble for design engineers — install any community component directly via shadcn CLI. Publish your own. Growing library of production-ready animated components.

[21st.dev ↗](https://21st.dev)

React
CLI install

### Motion Primitives

Simple, beautiful animations in the spirit of shadcn/ui. More minimal than Magic UI or Aceternity. Text blur, slide, fade, disclosure, cursor. Good for integrating into existing codebases without heavy animation libraries.

[motion-primitives.com ↗](https://motion-primitives.com)

React
+Motion

### When to use which

| Project Type | Recommended Stack |
| --- | --- |
| SaaS marketing / landing page | shadcn/ui + Aceternity UI or Magic UI |
| Product dashboard / app | shadcn/ui + Motion for transitions |
| Portfolio / creative site | react-bits + GSAP + Lenis |
| E-commerce | shadcn/ui + Motion (lightweight) |
| Cinematic scrollytelling | GSAP + ScrollTrigger + Three.js/R3F |
| Component library / design system | shadcn/ui + Motion Primitives |
| Vanilla HTML/no framework | Pure CSS + GSAP + anime.js |

---

🎬

Section 14

## Motion Design Principles

### Purpose over decoration

Every animation should communicate something: state change, spatial relationship, system feedback, or brand character. If you can't explain why an animation exists, remove it.

### Direction = metaphor

Things entering from the bottom feel like growth. Top = importance. Right = forward/next. Left = back. Be consistent — spatial metaphors build intuitive navigation.

### One choreographed moment

One well-orchestrated entrance sequence (staggered hero reveal) creates more delight than 20 scattered micro-interactions. Focus your animation budget on high-impact moments.

### Duration hierarchy

Micro: 80–150ms. Element transitions: 200–400ms. Page transitions: 300–600ms. Cinematic reveals: 800–1200ms. Never exceed 1500ms for any routine interaction.

### Easing = personality

Ease-out = natural, energetic. Spring = playful, alive. Linear = mechanical. Custom cubic-bezier = branded. Your easing choices are your brand's motion signature.

### Exit matters

Entering animations get all the attention. But smooth exits (AnimatePresence) make the UI feel cohesive. Toast → slide out. Modal → scale down. Nav → fade out.

### Motion tokens — duration scale

| Token | Duration | When to use |
| --- | --- | --- |
| `--dur-instant` | 0ms | Reduced motion mode |
| `--dur-micro` | 80ms | Tooltip show, icon state |
| `--dur-fast` | 150ms | Button hover/tap feedback |
| `--dur-base` | 300ms | Most hover effects |
| `--dur-slow` | 500ms | Modal open, panel slide |
| `--dur-enter` | 700ms | Page entrance animations |
| `--dur-cinematic` | 1000–1200ms | Hero reveal, dramatic moments |

✓

**Choreography rule:** stagger delays should total ≤ 400ms for the full set. If you have 8 cards at 100ms each = 800ms wait — the last card never gets seen. Use `stagger: { amount: 0.5 }` in GSAP to spread the total stagger across the set.

---

🔗

Section 15

## Resources & Links

### Documentation

[Motion (Framer Motion) Docs

motion.dev/docs — Official docs for Motion v12, React + Vanilla JS](https://motion.dev/docs)
[GSAP 3 Docs

gsap.com/docs/v3 — Full GSAP API, plugins, ScrollTrigger reference](https://gsap.com/docs/v3)
[MDN — CSS Scroll-Driven Animations

Native animation-timeline, view(), scroll() API](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)
[shadcn/ui

ui.shadcn.com — Copy-paste accessible React components](https://ui.shadcn.com)
[Aceternity UI Components

200+ animated components — spotlight, aurora, 3D tilt, beam](https://ui.aceternity.com/components)
[Magic UI

150+ animated components — marquee, word fade, shimmer, bento](https://magicui.design)
[react-bits

CSS-first animated components — #2 JS Rising Stars 2025](https://reactbits.dev)
[21st.dev

Open-source npm for shadcn/ui components — CLI installable](https://21st.dev)

### Tools & playgrounds

[cubic-bezier.com

Visual easing curve generator for CSS transitions](https://cubic-bezier.com)
[GSAP Ease Visualizer

Interactive GSAP easing curve editor](https://gsap.com/resources/easing/)
[Animista

CSS animation playground — copy generated @keyframes](https://animista.net)
[gradient.style

CSS gradient builder with conic, mesh, and layered gradients](https://www.gradient.style)
[scroll-driven-animations.style

Chrome's CSS scroll-driven animation demos and explainer](https://scroll-driven-animations.style)
[Codrops

Advanced animation tutorials — GSAP, WebGL, CSS](https://tympanus.net/codrops)

Frontend Animation & UX/UI Reference · Updated April 2026

Motion v12 · GSAP 3 · shadcn/ui · React 19+