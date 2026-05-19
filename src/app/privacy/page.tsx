import type { Metadata } from "next";
import Link from "next/link";
import { StaticContentPage } from "@/components/layout/StaticContentPage";
import { businessProfile } from "@/lib/business-profile";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How Friendship Corner Daycare in Coquitlam collects, uses, and protects information submitted through our website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const { name, email, telephone, address } = businessProfile;
  const addressLine = `${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}`;

  return (
    <StaticContentPage
      title="Privacy Policy"
      description={`${name} respects your privacy. This policy explains what we collect when you use our website and how we use it.`}
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Information we collect</h2>
        <p>
          When you submit a contact form, tour request, or welcome form, we may collect your name, email
          address, phone number, child&apos;s name, preferred tour date or time, and any message you provide.
        </p>
        <p>
          We also collect standard technical information such as browser type and pages visited through
          normal website analytics, when enabled.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">How we use your information</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Respond to tour requests and enrollment inquiries</li>
          <li>Follow up about childcare availability, programs, and scheduling</li>
          <li>Improve our website and parent communication</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Email and messaging</h2>
        <p>
          Form submissions may be delivered by email using our email service provider. Messages are sent
          only to {name} staff for the purpose of responding to your inquiry.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Retention</h2>
        <p>
          We keep inquiry information only as long as needed to respond, coordinate tours, and maintain
          enrollment records where applicable.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Contact us</h2>
        <p>
          For privacy questions or to request correction of your information, contact us at{" "}
          <a href={`mailto:${email}`} className="font-medium text-primary hover:underline">
            {email}
          </a>
          , call{" "}
          <a href={`tel:${telephone.replace(/\./g, "")}`} className="font-medium text-primary hover:underline">
            {telephone}
          </a>
          , or visit {addressLine}.
        </p>
        <p className="text-sm text-slate-600">Last updated: May 18, 2026</p>
      </section>

      <p>
        See also our{" "}
        <Link href="/terms" className="font-medium text-primary hover:underline">
          Terms of Service
        </Link>
        .
      </p>
    </StaticContentPage>
  );
}
