import type { Metadata } from "next";

export const SEO_BASE_URL = "https://friendshipdaycare.com";
export const SEO_SITE_NAME = "Friendship Corner Daycare";
export const SEO_DEFAULT_TITLE = "Friendship Corner Daycare | Montessori Daycare in Coquitlam, BC";
export const SEO_TITLE_TEMPLATE = "%s | Friendship Corner Daycare";
export const SEO_DEFAULT_DESCRIPTION =
  "Licensed Montessori daycare in Coquitlam, BC serving Tri-Cities families. Safe, nurturing programs for children 30 months to school age.";
export const SEO_DEFAULT_KEYWORDS = [
  "Montessori daycare Coquitlam",
  "Coquitlam daycare",
  "preschool Coquitlam",
  "childcare Coquitlam",
  "Tri-Cities daycare",
  "early learning Coquitlam"
];
export const SEO_DEFAULT_IMAGE = "/logo.png";

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
    canonical: "/"
  },
  openGraph: {
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    url: SEO_BASE_URL,
    siteName: SEO_SITE_NAME,
    type: "website",
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
  const shareImage = image || SEO_DEFAULT_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SEO_SITE_NAME,
      type: "website",
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
