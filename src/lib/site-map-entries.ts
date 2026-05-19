export interface SiteMapEntry {
  path: string;
  title: string;
  lastModified: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export const siteMapEntries: SiteMapEntry[] = [
  {
    path: "/",
    title: "Home",
    lastModified: "2025-04-01",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    path: "/funding",
    title: "Funding & Subsidies",
    lastModified: "2025-03-15",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/our-team",
    title: "Our Team",
    lastModified: "2025-01-15",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/community/todays-story",
    title: "Today's Story",
    lastModified: "2025-04-10",
    changeFrequency: "daily",
    priority: 0.6,
  },
  {
    path: "/community/journal",
    title: "Journal",
    lastModified: "2025-04-01",
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    path: "/community/montessori",
    title: "Montessori",
    lastModified: "2025-03-01",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/community/ece",
    title: "ECE",
    lastModified: "2025-03-01",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/resources",
    title: "Resources",
    lastModified: "2025-02-01",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/gallery-new",
    title: "Gallery",
    lastModified: "2025-04-05",
    changeFrequency: "weekly",
    priority: 0.65,
  },
  {
    path: "/welcome",
    title: "Welcome — Schedule a Tour",
    lastModified: "2026-05-18",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    lastModified: "2026-05-18",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    title: "Terms of Service",
    lastModified: "2026-05-18",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/sitemap",
    title: "Sitemap",
    lastModified: "2026-05-18",
    changeFrequency: "monthly",
    priority: 0.3,
  },
];
