# Gallery Carousel: Embla vs GSAP Implementation

This document compares the previous Embla-based gallery carousel with the current GSAP Option B implementation and summarizes the new features.

---

## Comparison: Embla vs GSAP Option B

| Aspect | **Before (Embla)** | **After (GSAP Option B)** |
|--------|--------------------|----------------------------|
| **Library** | `embla-carousel-react` + shadcn `Carousel` | **GSAP only** (no Embla) |
| **How it moves** | Embla scrolls a scroll-snap container | **GSAP animates `transform: translateX(x)`** on a flex track |
| **Drag** | Embla’s built-in drag | **Custom pointer handlers** (`onPointerDown` + `pointermove` / `pointerup`) + **GSAP** for position and snap |
| **Prev/Next** | `carouselApi.scrollNext()` / `scrollPrev()` | **`goToSlide(index ± 1)`** → `gsap.to(track, { x: -index * slideWidth })` |
| **Dots** | `carouselApi.scrollTo(index)` | **`goToSlide(index)`** (same GSAP tween) |
| **Autoplay** | `setInterval(() => carouselApi.scrollNext(), 6000)` | **`setInterval(() => goToSlide(indexRef.current + 1), 6000)`** |
| **DOM** | Embla’s scroll container + `CarouselContent` / `CarouselItem` | **Viewport div** (overflow hidden) + **track div** (flex, `width: N×100%`) + **slide divs** (each `100/N %` of track) |
| **Initial position** | Embla sets it | **`gsap.set(track, { x: 0 })`** in a `useEffect` (and on resize) |
| **Resize** | Embla recalculates internally | **ResizeObserver** + **`gsap.set(track, { x: -index × slideWidthRef.current })`** |
| **Click vs drag** | Embla handles it | **`justDraggedRef`** + 5px movement threshold so tap opens modal, drag doesn’t |

**Summary:** Before, the carousel was “Embla scroll + API.” After, it’s “GSAP-driven track + manual drag + same UX.” The visible behavior (one slide at a time, prev/next, dots, autoplay, drag-to-swipe) is intended to feel the same; the implementation is entirely GSAP plus custom pointer logic, with no Embla.

---

## New Implementation: Feature Summary

The gallery carousel on `/gallery` was reimplemented using **GSAP (Option B)** with the following behavior and features.

### Core behavior

- **Single visible slide:** A viewport (`overflow: hidden`) shows one slide at a time. A horizontal track holds all slides; `translateX` moves the track so the active slide is in view.
- **Looping navigation:** Prev/Next and autoplay use modulo indexing so “next” from the last slide goes to the first and “prev” from the first goes to the last.
- **Snap on release:** After a drag, the track animates to the nearest slide with `gsap.to()` (0.5s, `power2.out`).

### Interaction

- **Drag:** Pointer down on the viewport starts a drag; move/up on `window` update track `x` (clamped to min/max) and on release snap to the nearest slide.
- **Click vs drag:** If pointer movement is &lt; 5px, the interaction is treated as a click and opens the image modal; otherwise it’s a drag and the modal does not open.
- **Prev/Next buttons:** Call `goToSlide(index ± 1)` with the same GSAP tween.
- **Dots:** Each dot calls `goToSlide(index)` to jump to that slide.
- **Keyboard:** Arrow Left/Right on the viewport (when focused) call `goToSlide(prev/next)`.

### Autoplay and pause

- **Autoplay:** Every 6 seconds, `goToSlide(indexRef.current + 1)` advances the carousel.
- **Pause:** When the user hovers or focuses inside the carousel container, autoplay is disabled until they leave.

### Layout and resize

- **Track width:** `N × 100%` (N = number of filtered images). Each slide is `100/N %` of the track, so one slide fills the viewport.
- **Slide width in pixels:** Stored in `slideWidthRef` from the viewport’s `offsetWidth`, used for all `translateX` and snap math.
- **Resize:** A `ResizeObserver` on the viewport updates `slideWidthRef` and repositions the track with `gsap.set(track, { x: -currentIndex × slideWidthRef.current })` so the current slide stays in view.

### Category filter

- When the user changes the category filter, the carousel resets to the first slide (index 0), cleared loaded-image state, and sets the track to `x: 0`.

### Accessibility and UX

- **ARIA:** Viewport has `role="region"`, `aria-roledescription="carousel"`, and `aria-label` (gallery title). Prev/Next and dots keep descriptive `aria-label`s.
- **Focus:** Viewport is focusable (`tabIndex={0}`) for keyboard use.
- **Pointer capture:** Capture is set on the viewport (the element with `onPointerDown`), not the track, so drag works correctly across the visible area.

### GSAP usage

- **ScrollTrigger:** The gallery section entrance animation (title, carousel wrap, dots) still uses GSAP + ScrollTrigger when the section enters the viewport.
- **Slide transition:** When the active index changes, a short scale/opacity tween is applied to the slides (active emphasized, others subdued) for a subtle “focus” effect.
- **No Embla:** The shadcn/Embla `Carousel` components and `carouselApi` are no longer used; all motion and interaction are driven by GSAP and the custom logic above.

---

## File reference

- **Gallery page client:** `src/app/gallery/page-client.tsx`
- **Carousel UI:** Viewport + track + slides are defined inline in that file; no separate carousel component. Refs: `viewportRef`, `trackRef`, `carouselContainerRef`; state: `carouselSelectedIndex`; main API: `goToSlide(index, animate)`.
