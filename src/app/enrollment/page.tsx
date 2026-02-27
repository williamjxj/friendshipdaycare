import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EnrollmentPageClient } from "@/app/enrollment/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Daycare Enrollment in Coquitlam",
  description:
    "Enroll at Friendship Corner Montessori daycare in Coquitlam, BC. Steps, requirements & tour booking for Tri-Cities families. Schedule your visit today.",
  path: "/enrollment"
});

/**
 * Server wrapper for enrollment page metadata.
 */
export default function EnrollmentPage() {
  return <EnrollmentPageClient />;
}
