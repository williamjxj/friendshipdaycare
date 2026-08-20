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
    lastModified: "2026-08-20",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    path: "/programs/toddler",
    title: "Toddler Program",
    lastModified: "2026-08-20",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/programs/preschool",
    title: "Preschool Program",
    lastModified: "2026-08-20",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/programs/prekindergarten",
    title: "Pre-Kindergarten Program",
    lastModified: "2026-08-20",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/funding",
    title: "Funding & Subsidies",
    lastModified: "2026-08-20",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/our-team",
    title: "Our Team",
    lastModified: "2026-08-20",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/community/todays-story",
    title: "Today's Story",
    lastModified: "2026-08-20",
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    path: "/community/journal",
    title: "Journal",
    lastModified: "2026-08-20",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/community/montessori",
    title: "Montessori",
    lastModified: "2026-08-20",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/community/ece",
    title: "ECE",
    lastModified: "2026-08-20",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/resources",
    title: "Resources",
    lastModified: "2026-08-20",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/gallery-new",
    title: "Gallery",
    lastModified: "2026-08-20",
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
    lastModified: "2026-08-20",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    title: "Terms of Service",
    lastModified: "2026-08-20",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/sitemap",
    title: "Sitemap",
    lastModified: "2026-08-20",
    changeFrequency: "monthly",
    priority: 0.3,
  },
];
