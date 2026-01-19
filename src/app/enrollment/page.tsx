import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EnrollmentPageClient } from "@/app/enrollment/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Daycare Enrollment in Coquitlam",
  description:
    "Learn how to enroll at Friendship Corner Daycare, a Montessori daycare in Coquitlam, BC. Review steps and requirements.",
  path: "/enrollment"
});

/**
 * Server wrapper for enrollment page metadata.
 */
export default function EnrollmentPage() {
  return <EnrollmentPageClient />;
}
