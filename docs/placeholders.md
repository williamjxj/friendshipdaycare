# Placeholder Assets Inventory

**Date**: 2025-12-30  
**Feature**: UI Improvement (001-ui-improvement)  
**Purpose**: Document all placeholder images, videos, and SVG assets needed for UI improvements

## Naming Convention

Format: `page-name_section-name_sequence-number(-extra-number-if-carousel).ext`

**Examples**:
- `about_hero_1.svg` - About page, hero section, first asset
- `programs_features_2-1.mp4` - Programs page, features section, second carousel, first item
- `contact_form_1.svg` - Contact page, form section, first asset

## Asset Specifications

### General Guidelines

- **SVG Placeholders**: Use for hero backgrounds, decorative elements
  - Scalable, themeable, lightweight
  - Recommended size: 1920x1080 (aspect ratio 16:9) or full viewport
  - Should work with theme colors
  
- **Video Placeholders**: Use for dynamic backgrounds, carousels
  - Format: MP4 (H.264 codec)
  - Recommended: 1920x1080, 30fps
  - Duration: 10-30 seconds for loops
  - File size: < 5MB per video
  
- **Image Placeholders**: Use for content images, galleries
  - Format: JPG or WebP
  - Recommended: Responsive sizes (multiple breakpoints)
  - Aspect ratios: 16:9, 4:3, 1:1 depending on use case

## Placeholder Assets Table

| Filename                           | Page                   | Section           | Type  | Dimensions | Format   | Purpose                       | Notes                               |
| ---------------------------------- | ---------------------- | ----------------- | ----- | ---------- | -------- | ----------------------------- | ----------------------------------- |
| `about_hero_1.gif`                 | about                  | hero              | GIF   | 1920x960   | GIF      | Hero background               | 2:1 aspect ratio (50vh), Montessori-themed |
| `about_story_1.jpg`                | about                  | our-story         | Image | 1200x800   | JPG/WebP | Story section image           | Children learning, warm atmosphere  |
| `about_philosophy_1.svg`           | about                  | philosophy        | SVG   | 800x600    | SVG      | Philosophy section decorative | Abstract Montessori elements        |
| `about_mission_1.jpg`              | about                  | mission           | Image | 1000x667   | JPG/WebP | Mission section image         | Community, caring environment       |
| `programs_hero_1.gif`              | programs               | hero              | GIF   | 1920x960   | GIF      | Hero background               | 2:1 aspect ratio (50vh), educational theme |
| `programs_toddler_1.jpg`           | programs               | toddler-program   | Image | 1200x800   | JPG/WebP | Toddler program image         | Toddlers in classroom               |
| `programs_preschool_1.jpg`         | programs               | preschool-program | Image | 1200x800   | JPG/WebP | Preschool program image       | Preschool activities                |
| `programs_prek_1.jpg`              | programs               | prek-program      | Image | 1200x800   | JPG/WebP | Pre-K program image           | Pre-K learning activities           |
| `programs_schedule_1.svg`          | programs               | schedule          | SVG   | 1000x600   | SVG      | Schedule visualization        | Daily schedule graphic              |
| `contact_hero_1.gif`               | contact                | hero              | GIF   | 1920x960   | GIF      | Hero background               | 2:1 aspect ratio (50vh), welcoming theme |
| `contact_map_1.jpg`                | contact                | map               | Image | 1200x800   | JPG/WebP | Location image                | Building exterior or map            |
| `contact_form_1.svg`               | contact                | form              | SVG   | 800x600    | SVG      | Form decorative element       | Subtle background pattern           |
| `enrollment_hero_1.gif`            | enrollment             | hero              | GIF   | 1920x960   | GIF      | Hero background               | 2:1 aspect ratio (50vh), enrollment theme |
| `enrollment_steps_1.svg`           | enrollment             | steps             | SVG   | 1200x400   | SVG      | Process steps visualization   | Step-by-step graphic                |
| `enrollment_requirements_1.jpg`    | enrollment             | requirements      | Image | 1000x667   | JPG/WebP | Requirements section          | Documents or checklist visual       |
| `gallery_hero_1.gif`               | gallery                | hero              | GIF   | 1920x960   | GIF      | Hero background               | 2:1 aspect ratio (50vh), gallery theme |
| `gallery_carousel_1-1.jpg`         | gallery                | carousel          | Image | 1920x1080  | JPG/WebP | Carousel image 1              | High-quality classroom photo        |
| `gallery_carousel_1-2.jpg`         | gallery                | carousel          | Image | 1920x1080  | JPG/WebP | Carousel image 2              | Activities photo                    |
| `gallery_carousel_1-3.jpg`         | gallery                | carousel          | Image | 1920x1080  | JPG/WebP | Carousel image 3              | Outdoor play photo                  |
| `gallery_carousel_1-4.jpg`         | gallery                | carousel          | Image | 1920x1080  | JPG/WebP | Carousel image 4              | Learning materials photo            |
| `gallery_carousel_1-5.jpg`         | gallery                | carousel          | Image | 1920x1080  | JPG/WebP | Carousel image 5              | Community event photo               |
| `community_story_hero_1.gif`       | community/todays-story | hero              | GIF   | 1920x960   | GIF      | Hero background               | 2:1 aspect ratio (50vh), story theme |
| `community-story_featured_1.jpg`   | community/todays-story | featured          | Image | 1200x800   | JPG/WebP | Featured story image          | Bible story illustration            |
| `community-story_list_1.jpg`       | community/todays-story | story-list        | Image | 800x600    | JPG/WebP | Story list thumbnail          | Story book cover                    |
| `community_journal_hero_1.gif`     | community/journal      | hero              | GIF   | 1920x960   | GIF      | Hero background               | 2:1 aspect ratio (50vh), journal theme |
| `community-journal_featured_1.jpg` | community/journal      | featured          | Image | 1200x800   | JPG/WebP | Featured journal image        | Monthly journal cover               |
| `community-journal_list_1.jpg`     | community/journal      | journal-list      | Image | 800x600    | JPG/WebP | Journal list thumbnail        | Journal cover thumbnail             |
| `community-journal_post_1.jpg`     | community/journal/[id] | post-header       | Image | 1920x1080  | JPG/WebP | Post header image             | Article header image                |
| `community-journal_post_2.jpg`     | community/journal/[id] | post-content      | Image | 1200x800   | JPG/WebP | Post content image            | In-article image                    |

## Asset Requirements by Type

### GIF Placeholders (Hero Backgrounds)

**Requirements**:
- **Landing Page Hero**: 1920x1080 (16:9 aspect ratio) - Full screen height (`h-screen`)
- **Other Pages Hero**: 1920x960 (2:1 aspect ratio) - 50% viewport height (`h-[50vh]`)
  - **Rationale**: Other pages use `h-[50vh] min-h-[400px]` which creates a 2:1 aspect ratio on standard 1920px wide screens
  - **Alternative**: Can use 1920x1080 (16:9) but will be cropped/centered to fit 50vh container
- **Format**: GIF (animated) - Located in `public/imgs/{page}/` directory
- **Colors**: Should work with theme colors
- **Style**: Abstract, Montessori-themed, daycare-appropriate
- **File Size**: < 500KB per GIF (optimized)
- **Notes**: Should work with dark/light themes, be subtle enough for text overlay

**Pages needing hero GIFs**:
- **Landing Page** (`/`): 1920x1080 (16:9) - Full screen hero
- **Other Pages** (about, programs, contact, enrollment, gallery, community/todays-story, community/journal): 1920x960 (2:1) - 50vh hero sections
- **Location**: All hero GIFs are in `public/imgs/{page}/{page}_hero_1.gif`

### Video Placeholders (If needed for carousels)

**Requirements**:
- **Dimensions**: 1920x1080 (16:9 aspect ratio)
- **Format**: MP4 (H.264 codec)
- **Frame Rate**: 30fps
- **Duration**: 10-30 seconds (for loops)
- **File Size**: < 5MB per video
- **Notes**: Should be loopable, muted, daycare-appropriate content

### Image Placeholders (Content Images)

**Requirements**:
- **Dimensions**: Varies by use case
  - Hero images: 1920x1080
  - Content images: 1200x800 or 1000x667
  - Thumbnails: 800x600
  - Carousel: 1920x1080
- **Format**: JPG (high quality) or WebP (preferred for web)
- **Aspect Ratios**: 
  - 16:9 for hero/wide images
  - 4:3 for standard content
  - 1:1 for square thumbnails
- **File Size**: 
  - Hero: < 500KB
  - Content: < 300KB
  - Thumbnail: < 150KB
- **Notes**: Should be optimized, responsive-ready, daycare-appropriate

## Content Guidelines

### Theme: Daycare, Montessori, BC Canada

All placeholder assets should reflect:
- **Daycare Environment**: Safe, nurturing, educational
- **Montessori Method**: Child-centered, hands-on learning, independence
- **BC Canada Context**: Canadian values, multicultural, inclusive
- **Warmth**: Friendly, welcoming, family-oriented
- **Professionalism**: Clean, modern, trustworthy

### Image Content Suggestions

- Children engaged in learning activities
- Montessori materials and classroom setup
- Outdoor play areas
- Teachers interacting with children
- Community events and celebrations
- Safe, clean facilities
- Diverse group of children
- Natural, warm lighting

### What to Avoid

- Stock photos that look generic
- Overly staged or artificial scenes
- Images that don't reflect Montessori philosophy
- Low-quality or pixelated images
- Images with watermarks or copyright issues
- Inappropriate or unsafe situations

## File Organization

```
public/
└── imgs/
    ├── about/
    │   ├── about_hero_1.gif
    │   ├── about_story_1.jpg
    │   ├── about_philosophy_1.svg
    │   └── about_mission_1.jpg
    ├── programs/
    │   ├── programs_hero_1.gif
    │   ├── programs_toddler_1.jpg
    │   ├── programs_preschool_1.jpg
    │   ├── programs_prek_1.jpg
    │   └── programs_schedule_1.svg
    ├── contact/
    │   ├── contact_hero_1.gif
    │   ├── contact_map_1.jpg
    │   └── contact_form_1.svg
    ├── enrollment/
    │   ├── enrollment_hero_1.gif
    │   ├── enrollment_steps_1.svg
    │   └── enrollment_requirements_1.jpg
    ├── gallery/
    │   ├── gallery_hero_1.gif
    │   └── gallery_carousel_1-1.jpg through 1-5.jpg
    └── community/
        ├── community_story_hero_1.gif
        ├── community-story_featured_1.jpg
        ├── community-story_list_1.jpg
        ├── community_journal_hero_1.gif
        ├── community-journal_featured_1.jpg
        ├── community-journal_list_1.jpg
        ├── community-journal_post_1.jpg
        └── community-journal_post_2.jpg
```

## Implementation Notes

1. **GIF Placeholders**: Hero backgrounds are now GIF files in `public/imgs/{page}/` directory
2. **Image Placeholders**: Can use temporary placeholders initially, replace with real content
3. **Video Placeholders**: Only if carousels require video backgrounds
4. **Optimization**: All assets should be optimized before final use
5. **Accessibility**: All images need descriptive alt text
6. **Responsive**: Consider multiple sizes for responsive images
7. **Function**: Use `getPlaceholderUrl('{page}/{page}_hero_1.gif')` to get hero background URLs

## Next Steps

1. Create SVG hero backgrounds for all pages
2. Source or create content images matching specifications
3. Optimize all assets for web
4. Replace placeholders with final assets
5. Update this document with final asset locations

## Tools & Resources

- **SVG Creation**: Figma, Adobe Illustrator, or online SVG generators
- **Image Optimization**: ImageOptim, Squoosh, or Next.js Image optimization
- **Video Compression**: HandBrake, FFmpeg
- **Stock Photos**: Unsplash, Pexels (with proper attribution)
- **Montessori Resources**: Montessori-specific stock photos or custom photography

