/**
 * Type definitions for website content structure
 * Based on data-model.md specifications
 */

/**
 * Navigation item structure
 */
export interface NavigationSubMenuItem {
  label: string;
  href: string;
  icon?: string; // Lucide icon name
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string; // Lucide icon name
  subMenu?: NavigationSubMenuItem[]; // Sub-menu items (for dropdown)
  current?: boolean; // For active state
}

/**
 * Navigation structure
 */
export interface Navigation {
  items: NavigationItem[];
}

/**
 * Page metadata for SEO
 */
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * Site-wide metadata
 */
export interface SiteMetadata extends PageMetadata {
  twitterCard?: string;
}

/**
 * Image data structure
 */
export interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string; // For Next.js Image placeholder
}

/**
 * Link data structure
 */
export interface LinkData {
  href: string;
  label: string;
  external?: boolean;
}

/**
 * Hero section background configuration
 */
export interface HeroBackground {
  type: "color" | "gradient" | "image" | "curve";
  value?: string; // Color hex, gradient CSS, or image URL
  curvePosition?: "top" | "bottom"; // For curve type
  overlay?: boolean; // Add dark overlay for image backgrounds
}

/**
 * Hero section content structure
 */
export interface HeroContent {
  title: string;
  subtitle?: string;
  description?: string; // Added
  ctaText?: string;
  ctaLink?: string;
  image?: string; // Added
  background?: HeroBackground;
}

/**
 * Generic section content with title and description items
 */
export interface SectionContent {
  title: string;
  content?: string[];
  image?: string;
}

export interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
}

export interface FeaturesSectionContent {
  title: string;
  items: FeatureItem[];
}

export interface ListSectionContent {
  title: string;
  benefits: string[];
  image?: string;
}

/**
 * Home page content structure
 */
export interface HomePageContent {
  hero: HeroContent;
  keyInfo: FeaturesSectionContent; // Changed from rigid structure
  description: SectionContent; // Changed from rigid structure
  locationBenefits: ListSectionContent; // Changed from rigid structure
  contact: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  };
}

/**
 * Staff member structure
 */
export interface StaffMember {
  name: string;
  role: string;
  description: string;
  image?: string;
}

/**
 * About page content structure
 */
export interface AboutPageContent {
  hero?: HeroContent;
  history: {
    founded: string; // "January 2008"
    location: string; // "Coquitlam, BC"
    type: string; // "Non-profit society"
    description?: string; // Added
  };
  mission: {
    title: string;
    description: string;
  };
  philosophy: {
    approach: string; // "Montessori Method"
    description: string;
    principles: string[];
  };
  environment: {
    commitment: string[]; // ["safe", "clean", "nurturing"]
    description: string;
  };
  staff: StaffMember[];
  curriculum: {
    type: string; // "developmentally appropriate"
    focus: string[]; // ["self-expression", "interaction"]
    description: string;
  };
  serviceArea: {
    primary: string[]; // ["Coquitlam", "Port Coquitlam", "Port Moody"]
    description: string;
  };
}

/**
 * Activity category for program page
 */
export interface ActivityCategory {
  name: string;
  description: string;
  ageAppropriate: string;
}

/**
 * Program detail structure for age-specific segmentation
 */
export interface ProgramDetail {
  title: string;
  ageRange: string;
  description: string;
  features: string[];
  image?: string;
}

/**
 * Program page content structure
 */
export interface ProgramPageContent {
  hero?: HeroContent;
  overview: {
    title: string;
    description: string;
  };
  programs: ProgramDetail[]; // Specific program segments
  curriculum: {
    approach: string; // "Montessori curriculum"
    description: string;
    ageRange: string; // "30 months to school age"
  };
  activities: {
    categories: ActivityCategory[];
  };
  development: {
    focus: string[];
    description: string;
  };
  environment: {
    description: string; // "stimulating environment"
    features: string[];
  };
}

/**
 * Program fee structure
 */
export interface ProgramFee {
  program: string; // "Full-time Preschool"
  ageRange: string;
  monthlyRate: number | string; // number or "Contact for pricing"
  includes: string[];
}

/**
 * Additional fee structure
 */
export interface AdditionalFee {
  name: string;
  amount: number | string;
  description: string;
}

/**
 * Fee policy structure
 */
export interface FeePolicy {
  type: string; // "refunds", "late fees", etc.
  description: string;
}

/**
 * Holiday structure
 */
export interface Holiday {
  date: string;
  name: string;
}

/**
 * Fees & Hours page content structure
 */
export interface FeesHoursPageContent {
  hero?: HeroContent;
  hours: {
    regular: {
      days: string; // "Monday - Friday"
      time: string; // "7:30 AM - 5:30 PM" (example)
    };
    holidays?: Holiday[];
  };
  fees: {
    programs: ProgramFee[];
    additionalFees?: AdditionalFee[];
    paymentMethods: string[];
    policies?: FeePolicy[];
  };
}

/**
 * Gallery image structure
 */
export interface GalleryImage {
  id: string;
  src: string; // R2 URL or placeholder SVG
  alt: string; // Descriptive alt text
  category?: string;
  caption?: string;
  width: number;
  height: number;
  blurDataURL?: string; // For Next.js Image placeholder
}

/**
 * Gallery category structure
 */
export interface GalleryCategory {
  name: string;
  slug: string;
  imageCount: number;
}

/**
 * Gallery page content structure
 */
export interface GalleryPageContent {
  hero?: HeroContent;
  images: GalleryImage[];
  categories?: GalleryCategory[];
}

/**
 * Contact page content structure
 */
export interface ContactPageContent {
  hero?: HeroContent;
  primary: {
    phone: string; // "604.945.8504"
    phoneLink: string; // "tel:6049458504"
    ctaText: string;
  };
  location: {
    city: string; // "Coquitlam, BC"
    address?: string; // If available
    proximity: {
      station: string; // "Near Coquitlam Station"
      centre: string; // "Near Coquitlam Centre"
      highway: string; // "Accessible from Lougheed Highway"
    };
  };
  additional?: {
    email?: string;
    hours?: string;
  };
}

/**
 * Social media platform identifier
 */
export type SocialMediaPlatform =
  | "facebook"
  | "instagram"
  | "youtube"
  | "linkedin"
  | "email";

/**
 * Social media link structure
 */
export interface SocialMediaLink {
  platform: SocialMediaPlatform;
  url: string; // Full URL to the social media profile or email address
  label: string; // Accessible label for screen readers
  icon: string; // Lucide React icon name (e.g., "Facebook", "Instagram")
  enabled?: boolean; // Whether to display this link (default: true)
}

/**
 * Google Maps configuration structure
 */
export interface GoogleMapsConfig {
  address: string; // Full address string
  zoom?: number; // Map zoom level (default: 15)
  mapType?: "roadmap" | "satellite"; // Map type (default: "roadmap")
}
