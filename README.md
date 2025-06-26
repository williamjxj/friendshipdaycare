# Friendship Corner Daycare Website

A modern, responsive website for Friendship Corner Daycare built with **Next.js 15**, **React 19**, **TypeScript**, and **TailwindCSS v4**. This website replaces the existing site at http://www.friendshipdaycare.com/ with enhanced features and improved user experience.

## 🌟 Features

### ✅ Implemented Features

- **🎨 Multi-Theme Support**: 4 beautiful themes (Default, Nature, Playful, Dark)
- **🌍 Internationalization**: Support for English, Spanish, French, Korean, and Chinese
- **📱 Responsive Design**: Optimized for all devices and screen sizes
- **🖼️ Image Gallery**: Animated carousel with category filtering and lightbox view
- **🎥 Video Player**: Educational videos with playlist support
- **🗺️ Google Maps Integration**: Interactive map showing daycare location
- **♿ Accessibility**: WCAG compliant with screen reader support
- **⚡ Performance**: Optimized with Next.js 15 and Turbopack

### 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── contact/           # Contact page with map
│   ├── gallery/           # Photo & video gallery
│   ├── programs/          # Programs information
│   └── globals.css        # Global styles & theme system
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections
│   └── ui/                # Reusable UI components
├── contexts/              # React contexts (Theme, Language)
├── i18n/                  # Internationalization config
└── messages/              # Translation files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd kidgarden-daycare
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Content Migration

The website content has been migrated and enhanced from the original site:

### Original Site Information
- **Name**: Friendship Corner Daycare (Montessori)
- **Type**: Licensed Group Daycare (Non-profit society)
- **Established**: January 2008
- **Location**: Near Coquitlam Station, Coquitlam, BC
- **Address**: 2950 Dewdney Trunk Road, Coquitlam, BC V3C 2J4, Canada
- **Phone**: 604.945.8504
- **Age Range**: 30 months to school age
- **Service Area**: Tri-Cities (Coquitlam, Port Coquitlam, Port Moody)

### Enhanced Content Features
- **Inspiring Hero**: "Where Little Dreams Take Flight"
- **Detailed Programs**: Toddler, Preschool, Pre-Kindergarten
- **Educational Focus**: Montessori method + gentle Bible stories
- **Safety & Quality**: Licensed, qualified staff, individual attention

## 🎨 Theme System

The website supports 4 beautiful themes:

1. **Default** - Warm & Friendly colors
2. **Nature** - Earth tones and greens  
3. **Playful** - Bright and vibrant colors
4. **Dark** - Elegant dark theme

Themes are stored in localStorage and applied system-wide.

## 🌍 Multi-Language Support

Supported languages:
- 🇺🇸 English
- 🇪🇸 Spanish  
- 🇫🇷 French
- 🇰🇷 Korean
- 🇨🇳 Chinese

Translation files are located in `src/messages/`.

## 🗺️ Google Maps Setup

To enable the interactive map on the contact page:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Maps Embed API
3. Update the API key in `src/components/ui/GoogleMap.tsx`

See `GOOGLE_MAPS_SETUP.md` for detailed instructions.

## 📸 Gallery Setup

The gallery supports both photos and videos. To add content:

1. **Photos**: Add images to `/public/images/`
2. **Update** image arrays in gallery components
3. **Videos**: Update video URLs in the VideoPlayer components

See `IMAGES_README.md` for image requirements.

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: Custom components with Heroicons
- **Animations**: Framer Motion
- **Video**: React Player
- **Carousel**: Embla Carousel
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: next-intl

## 📱 Pages Overview

### Homepage (`/`)
- Hero section with compelling tagline
- About section with mission
- Programs overview
- Daily video showcase
- Contact information

### About (`/about`)
- Detailed daycare information
- History and mission
- Staff qualifications
- Montessori approach

### Programs (`/programs`)  
- Age-specific program details
- Toddler Program (30 months - 3 years)
- Preschool Program (3 - 4 years)
- Pre-Kindergarten (4 - 5 years)

### Gallery (`/gallery`)
- Photo gallery with categories
- Animated carousel
- Educational videos
- Activity highlights

### Contact (`/contact`)
- Contact form
- Location information
- Interactive Google Map
- Operating hours

## 🔧 Build & Deployment

### Development
```bash
npm run dev      # Start dev server
npm run build    # Build for production  
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Production Deployment

The site is optimized for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting provider

## 📞 Support & Contact

For questions about this website implementation:
- Review the documentation files
- Check the component source code
- Refer to Next.js and TailwindCSS documentation

For daycare enrollment and information:
- **Phone**: 604.945.8504
- **Address**: 2950 Dewdney Trunk Road, Coquitlam, BC V3C 2J4, Canada

---

**Built with ❤️ for Friendship Corner Daycare - Where Little Dreams Take Flight** ✨
