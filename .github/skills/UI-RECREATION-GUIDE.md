# UI Recreation Quick Start Guide

Guide for recreating UI sections from design inspiration while maintaining your codebase's functionality.

## Your Specific Use Case: Hero Section Recreation

You want to recreate the hero section from `https://frienddaycare-hbvktcxj.manus.space/` while keeping your existing carousel background.

### Step-by-Step Process

#### 1. Analyze the Target Design

When viewing the target design, document these elements:

**Layout:**
- [ ] Is content centered or left/right aligned?
- [ ] Is it full viewport height or custom height?
- [ ] Overlay style (gradient, solid color, blur)?
- [ ] Content width (full-width, contained, max-width)?

**Content Elements:**
- [ ] Heading text (size, weight, color, alignment)
- [ ] Subheading/description (if any)
- [ ] Call-to-action buttons (how many? styles? positions?)
- [ ] Additional elements (badges, stats, decorative shapes)

**Visual Style:**
- [ ] Text colors (white, colored, etc.)
- [ ] Button styles (filled, outlined, gradient)
- [ ] Spacing between elements
- [ ] Animations (fade in, slide up, stagger)

#### 2. Invoke the Skill

Use this prompt pattern:

```bash
@workspace /daycare-ui recreate a hero section with the following design:
- Full viewport height with centered content
- Dark gradient overlay on background for text contrast
- Large bold heading (7xl on desktop, 5xl on mobile)
- Subheading text below
- Two CTA buttons side by side (primary + secondary style)
- Maintain existing HeroImageCarousel component as background
- Add entrance animations (stagger: heading → subheading → buttons)
```

#### 3. The Skill Will:

1. **Analyze your description** and map it to project patterns
2. **Create the component** in `/src/components/sections/`
3. **Preserve your carousel** - keeps `HeroImageCarousel` working
4. **Add i18n keys** to all 5 language files
5. **Apply animations** - uses existing animation utilities
6. **Ensure theme compatibility** - works across all 5 themes
7. **Make it responsive** - mobile-first approach

#### 4. What You Get

A new hero component that:
- ✅ Matches the design pattern you described
- ✅ Uses your existing image carousel
- ✅ Works in all 5 themes
- ✅ Supports all 5 languages
- ✅ Is fully responsive
- ✅ Has proper animations
- ✅ Follows project conventions

## Common Prompts for UI Recreation

### Hero Sections
```bash
@workspace /daycare-ui recreate hero with [layout] keeping carousel

@workspace /daycare-ui modify hero to use split layout: content left, image right

@workspace /daycare-ui add glassmorphism effect to hero content container
```

### Feature Sections
```bash
@workspace /daycare-ui recreate 3-column feature grid with icons and descriptions

@workspace /daycare-ui build alternating image-text sections (zigzag layout)
```

### Card Layouts
```bash
@workspace /daycare-ui recreate card grid with hover lift effect and shadows

@workspace /daycare-ui build a masonry-style gallery layout
```

### For Advanced Animations
Use the `/web-animations` skill:

```bash
@workspace /web-animations add parallax scrolling to hero background

@workspace /web-animations create magnetic button effect for CTAs

@workspace /web-animations add scroll progress indicator to page
```

## Design Pattern Vocabulary

When describing designs, use these terms for clarity:

**Layouts:**
- Centered, left-aligned, right-aligned
- Full-width, contained, max-width
- Grid (2-col, 3-col, 4-col), flexbox
- Split layout (50/50), asymmetric (60/40)
- Stacked (vertical), horizontal, zigzag (alternating)

**Components:**
- Hero section, feature grid, testimonial carousel
- CTA banner, stats showcase, image gallery
- Split section, card deck, accordion

**Effects:**
- Overlay (gradient, solid, blur)
- Glassmorphism (backdrop-blur)
- Elevation (shadows)
- Parallax, magnetic, hover lift

**Spacing:**
- Tight, comfortable, spacious
- Compact, standard, generous padding

## Tips for Best Results

### 1. Be Specific
❌ "Make it look better"
✅ "Center the content, add 60% dark overlay, use 7xl heading size"

### 2. Describe Key Elements
Include:
- Layout structure
- Text hierarchy
- Button styles and positions
- Spacing/padding
- Any unique visual effects

### 3. Mention What to Keep
Always specify what existing functionality to preserve:
```
"Keep the existing carousel"
"Maintain the current contact form"  
"Preserve the scroll spy navigation"
```

### 4. Reference Project Patterns
```
"Use the same card style as programs section"
"Match the button style from the header"
"Similar layout to the About section"
```

## Example: Complete Recreation Prompt

Here's a comprehensive prompt for recreating your hero:

```
@workspace /daycare-ui I want to recreate the hero section with this design:

Layout:
- Full viewport height (min-h-screen)
- Content centered both vertically and horizontally
- Keep existing HeroImageCarousel as background
- Add dark gradient overlay (black/40 opacity) for better text contrast

Content Structure:
- Main heading: "Welcome to Friendship Corner Daycare"
  - Size: text-7xl on desktop, text-5xl on mobile
  - Weight: font-bold
  - Color: white
  - Alignment: center
  
- Subheading: "Where Learning Meets Play"
  - Size: text-2xl on desktop, text-xl on mobile  
  - Color: white with 90% opacity
  - Max width: 3xl (centered)
  - Spacing: mt-6 below heading

- CTA Buttons:
  - Two buttons side by side (on desktop), stacked on mobile
  - Primary button: "Enroll Now" (solid primary color)
  - Secondary button: "Learn More" (outlined white)
  - Button size: px-8 py-4, text-lg
  - Spacing: gap-4 between buttons, mt-10 below subheading

Animations:
- Stagger entrance: heading → subheading → buttons
- Use slideUp variant for heading
- Use fadeIn variant for subheading and buttons
- Delay between animations: 0.2s

Responsive Behavior:
- Mobile: Stack buttons vertically, smaller text sizes
- Tablet: Same as desktop but slightly smaller
- Desktop: Full design as described

i18n Keys:
- home.hero.title
- home.hero.subtitle
- home.hero.enrollCta
- home.hero.learnCta
```

## Testing Checklist

After recreation, verify:
- [ ] Works on mobile (375px width)
- [ ] Works on tablet (768px width)
- [ ] Works on desktop (1440px width)
- [ ] Looks good in all 5 themes
- [ ] Text appears in all 5 languages
- [ ] Animations are smooth (not jarring)
- [ ] Existing functionality preserved (carousel, forms, etc.)
- [ ] Meets accessibility standards (contrast, keyboard nav)

## Related Skills

- **`/daycare-ui`**: UI development and recreation
- **`/web-animations`**: Advanced animation workflows
- **`/create-skill`**: Create custom skills for your workflows

## Need Help?

If the recreation doesn't match your expectations:
1. Provide more specific details about the design
2. Reference specific elements in your codebase to match
3. Describe what's different from your expectation
4. Ask for incremental adjustments

Example:
```
The buttons are too small. Make them larger (px-10 py-5) and add more rounded corners (rounded-xl)
```
