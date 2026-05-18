import { MetadataRoute } from "next";
import { SEO_BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_BASE_URL;

  return [
    {
      url: baseUrl,
      lastModified: "2025-04-01",
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${baseUrl}/funding`,
      lastModified: "2025-03-15",
      changeFrequency: "monthly",
      priority: 0.75
    },
    {
      url: `${baseUrl}/our-team`,
      lastModified: "2025-01-15",
      changeFrequency: "monthly",
      priority: 0.75
    },
    {
      url: `${baseUrl}/community/todays-story`,
      lastModified: "2025-04-10",
      changeFrequency: "daily",
      priority: 0.6
    },
    {
      url: `${baseUrl}/community/journal`,
      lastModified: "2025-04-01",
      changeFrequency: "weekly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/community/montessori`,
      lastModified: "2025-03-01",
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/community/ece`,
      lastModified: "2025-03-01",
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: "2025-02-01",
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/gallery-new`,
      lastModified: "2025-04-05",
      changeFrequency: "weekly",
      priority: 0.65
    },
    {
      url: `${baseUrl}/welcome`,
      lastModified: "2026-05-18",
      changeFrequency: "monthly",
      priority: 0.85
    }
  ];
}