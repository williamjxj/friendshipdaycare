import { MetadataRoute } from "next";
import { SEO_BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_BASE_URL;
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${baseUrl}/funding`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75
    },
    {
      url: `${baseUrl}/our-team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75
    },
    {
      url: `${baseUrl}/community/todays-story`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6
    },
    {
      url: `${baseUrl}/community/journal`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/community/montessori`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/community/ece`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/policies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5
    }
  ];
}
