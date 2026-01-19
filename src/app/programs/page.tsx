import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ProgramsPageClient } from "@/app/programs/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Montessori Programs in Coquitlam",
  description:
    "Explore toddler, preschool, and pre-kindergarten Montessori programs at Friendship Corner Daycare in Coquitlam, BC.",
  path: "/programs"
});

/**
 * Server wrapper for programs page metadata.
 */
export default function ProgramsPage() {
  return <ProgramsPageClient />;
}
