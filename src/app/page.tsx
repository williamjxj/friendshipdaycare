import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HomePageClient } from "@/app/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Best Montessori Daycare in Coquitlam BC | Licensed Childcare Since 2008",
  description:
    "Top-rated Montessori daycare in Coquitlam for ages 30mo–5. Licensed childcare near Coquitlam Centre. ECE-certified teachers, 1:8 ratio. Book your free tour today! Serving Tri-Cities families since 2008.",
  path: "/"
});

/**
 * Server wrapper for homepage metadata.
 */
export default function HomePage() {
  return <HomePageClient />;
}
