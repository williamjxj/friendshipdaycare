import type { MetadataRoute } from "next";
import { SEO_BASE_URL } from "@/lib/seo";

/**
 * Built-in robots.txt generation (Next.js App Router).
 */
export default function robots(): MetadataRoute.Robots {
  // Explicitly welcome AI/LLM crawlers (GEO): they are covered by "*" below,
  // but naming them makes the site's machine-readable intent unambiguous.
  const aiCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "PerplexityBot",
    "ClaudeBot",
    "anthropic-ai",
    "Google-Extended",
    "Applebot-Extended",
    "meta-externalagent",
    "cohere-ai",
  ];

  return {
    rules: [
      // Note: /_next/ is deliberately NOT disallowed. Googlebot must fetch the
      // site's CSS/JS bundles to render pages; blocking them degrades indexing.
      // Only API routes are kept out of the crawl.
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SEO_BASE_URL}/sitemap.xml`,
  };
}
