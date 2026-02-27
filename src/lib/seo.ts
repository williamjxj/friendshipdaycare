import type { Metadata } from "next";
import { businessProfile } from "@/lib/business-profile";
import { getOgImagePath } from "@/lib/og-images";

export const SEO_BASE_URL = businessProfile.url;
export const SEO_SITE_NAME = "Friendship Corner Daycare";
export const SEO_DEFAULT_TITLE = "Friendship Corner Montessori Daycare | Coquitlam, BC";
export const SEO_TITLE_TEMPLATE = "%s | Friendship Corner Daycare";
export const SEO_DEFAULT_DESCRIPTION =
  "Authentic Montessori daycare in Coquitlam, BC. Licensed since 2008. Book a free tour at Friendship Corner Daycare.";
export const SEO_DEFAULT_KEYWORDS = [
  "Montessori daycare Coquitlam",
  "Coquitlam daycare",
  "Coquiltam child care",
  "Coquitlam montessori",
  "Coquitlam preschool",
  "Tri-Cities daycare",
  "Port Coquiltam daycare",
  "Port Coquitlam montessori",
  "preschool",
  "Coquitlam",
  "Coquitlam Centre Daycare",
  "Coquitlam Station Daycare",
  "Port Coquitlam",
  "Port Moody",
  "高贵林日托",
  "高贵林 Daycare",
  "高贵林 Montessori",
  "Christian daycare",
  "preschool Coquitlam",
  "childcare Coquitlam",
  "Tri-Cities daycare",
  "early learning Coquitlam"
];


export const SEO_DEFAULT_IMAGE = `${SEO_BASE_URL}/logo.png`;

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
    follow: true
  },
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
  const canonicalUrl = path.startsWith('http') ? path : `${SEO_BASE_URL}${path}`;

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
