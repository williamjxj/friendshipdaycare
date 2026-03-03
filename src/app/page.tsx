import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HomePageClient } from "@/app/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Montessori Daycare in Coquitlam, BC | Friendship Corner – Nurturing Young Minds",
  description:
    "Discover licensed Montessori childcare in Coquitlam for ages 30mo–5. Book a tour today. Trusted since 2008. Tri-Cities families choose Friendship Corner.",
  path: "/"
});

/**
 * Server wrapper for homepage metadata.
 */
export default function HomePage() {
  return <HomePageClient />;
}
