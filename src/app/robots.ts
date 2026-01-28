import type { MetadataRoute } from "next";
import { SEO_BASE_URL } from "@/lib/seo";

/**
 * Built-in robots.txt generation (Next.js App Router).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/(unused)/", "/(presentations)/"],
      },
    ],
    sitemap: `${SEO_BASE_URL}/sitemap.xml`,
  };
}

