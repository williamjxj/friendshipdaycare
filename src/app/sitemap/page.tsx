import type { Metadata } from "next";
import Link from "next/link";
import { StaticContentPage } from "@/components/layout/StaticContentPage";
import { siteMapEntries } from "@/lib/site-map-entries";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sitemap",
  description: "Browse all pages on the Friendship Corner Daycare website.",
  path: "/sitemap",
});

export default function SitemapPage() {
  const publicPages = siteMapEntries.filter((entry) => entry.path !== "/sitemap");

  return (
    <StaticContentPage
      title="Sitemap"
      description="Find every public page on the Friendship Corner Daycare website."
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {publicPages.map((entry) => (
          <li key={entry.path}>
            <Link
              href={entry.path}
              className="flex min-h-[44px] items-center rounded-lg border border-border bg-white/80 px-4 py-3 font-medium text-slate-900 transition-colors hover:border-primary/40 hover:text-primary"
            >
              {entry.title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-sm text-slate-600">
        Search engines can also use our{" "}
        <a href="/sitemap.xml" className="font-medium text-primary hover:underline">
          XML sitemap
        </a>
        .
      </p>
    </StaticContentPage>
  );
}
