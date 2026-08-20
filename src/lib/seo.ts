import type { Metadata } from "next";
import { businessProfile } from "@/lib/business-profile";
import { getOgImagePath } from "@/lib/og-images";

export const SEO_BASE_URL = businessProfile.url;
export const SEO_SITE_NAME = "Friendship Corner Daycare";
export const SEO_DEFAULT_TITLE = "Coquitlam Montessori Daycare | Friendship Corner Daycare Since 2008";
export const SEO_TITLE_TEMPLATE = "%s | Friendship Corner Daycare Coquitlam";
export const SEO_DEFAULT_DESCRIPTION =
  "Licensed Montessori daycare in Coquitlam, BC for children ages 30 months to 5 years. Friendship Corner Daycare has served Tri-Cities families since 2008 near 2950 Dewdney Trunk Road.";
export const SEO_DEFAULT_KEYWORDS = [
  // Primary local keywords
  "daycare Coquitlam",
  "Coquitlam daycare",
  "Montessori daycare Coquitlam",
  "Coquitlam childcare",
  "childcare Coquitlam",
  "preschool Coquitlam",
  "Coquitlam preschool",

  // Location-specific
  "Coquitlam Centre daycare",
  "daycare near Coquitlam Station",
  "daycare near Coquitlam Centre",
  "Tri-Cities daycare",
  "Port Coquitlam daycare",
  "Port Moody daycare",
  "2950 Dewdney Trunk Road daycare",

  // Program-specific
  "Montessori Coquitlam",
  "Coquitlam Montessori",
  "Montessori preschool Coquitlam",
  "toddler daycare Coquitlam",
  "licensed daycare Coquitlam",
  "licensed daycare BC",
  "ECE daycare Coquitlam",

  // Parent intent keywords
  "book daycare tour Coquitlam",
  "Montessori childcare Coquitlam",
  "quality childcare Coquitlam",
  "early learning Coquitlam",
  "daycare with ECE teachers Coquitlam",

  // Chinese keywords for SEO
  "高贵林日托",
  "高贵林幼儿园",
  "Coquitlam 日托",
  "Coquitlam Montessori 学校",

  // Additional search terms
  "full-time daycare Coquitlam",
  "daycare enrollment Coquitlam",
  "child care Coquitlam BC",
  "Montessori daycare Tri-Cities",
];


export const SEO_DEFAULT_IMAGE = `${SEO_BASE_URL}/og/home.png`;

/**
 * Base metadata shared across all public pages.
 */
export const defaultSiteMetadata: Metadata = {
  metadataBase: new URL(SEO_BASE_URL),
  title: {
    default: SEO_DEFAULT_TITLE,
    template: SEO_TITLE_TEMPLATE
  },
  description: SEO_DEFAULT_DESCRIPTION,
  keywords: SEO_DEFAULT_KEYWORDS,
  alternates: {
    canonical: SEO_BASE_URL
  },
  openGraph: {
      title: SEO_DEFAULT_TITLE,
      description: SEO_DEFAULT_DESCRIPTION,
      url: SEO_BASE_URL,
      siteName: SEO_SITE_NAME,
      type: "website",
      locale: "en_CA",
      images: [
        {
          url: SEO_DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: SEO_SITE_NAME
        }
      ]
    },
  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    images: [SEO_DEFAULT_IMAGE]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    }
  },
  category: "education",
  authors: [{ name: SEO_SITE_NAME }],
  creator: SEO_SITE_NAME,
  publisher: SEO_SITE_NAME
};

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
}

/**
 * Build page-specific metadata with canonical URLs and share previews.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image
}: PageMetadataInput): Metadata {
  const ogPath = image ?? getOgImagePath(path);

  // Ensure image URLs are absolute
  const shareImage =
    ogPath.startsWith("http") ? ogPath : `${SEO_BASE_URL}${ogPath.startsWith("/") ? ogPath : `/${ogPath}`}`;
  
  // Ensure path is absolute URL for canonical and OpenGraph
  const pathSegment = path.startsWith('http') ? '' : path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = path.startsWith('http') ? path : `${SEO_BASE_URL}${pathSegment}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": canonicalUrl,
        en: canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SEO_SITE_NAME,
      type: "website",
      locale: "en_CA",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage]
    }
  };
}
