import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HomePageClient } from "@/app/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Coquitlam Montessori Daycare | Licensed Child Care Since 2008",
  description:
    "Licensed Montessori daycare in Coquitlam for children ages 30 months to 5 years. Visit Friendship Corner Daycare near 2950 Dewdney Trunk Road and book a tour for your family.",
  path: "/"
});

/**
 * Server wrapper for homepage metadata.
 */
export default function HomePage() {
  return <HomePageClient />;
}
