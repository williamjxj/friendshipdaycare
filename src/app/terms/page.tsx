import type { Metadata } from "next";
import Link from "next/link";
import { StaticContentPage } from "@/components/layout/StaticContentPage";
import { businessProfile } from "@/lib/business-profile";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Terms for using the Friendship Corner Daycare website in Coquitlam, BC.",
  path: "/terms",
});

export default function TermsPage() {
  const { name, email, telephone, address } = businessProfile;
  const addressLine = `${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}`;

  return (
    <StaticContentPage
      title="Terms of Service"
      description={`By using the ${name} website, you agree to the following terms.`}
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Website use</h2>
        <p>
          This website provides general information about our licensed Montessori daycare in Coquitlam,
          BC. Content is offered for informational purposes and may change without notice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">No enrollment guarantee</h2>
        <p>
          Submitting a contact or tour request through this website does not guarantee enrollment,
          availability, or placement. Final enrollment decisions are made by {name} according to
          capacity, licensing requirements, and program fit.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Accuracy of information</h2>
        <p>
          We work to keep program details, hours, and contact information accurate, but we do not warrant
          that all website content is complete or current at all times. Please contact us directly to
          confirm availability, fees, and policies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">External links</h2>
        <p>
          Our website may link to third-party sites such as maps or social media profiles. We are not
          responsible for the content or privacy practices of those external sites.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {name} is not liable for damages arising from use of
          this website or reliance on its content.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p>
          Questions about these terms may be directed to{" "}
          <a href={`mailto:${email}`} className="font-medium text-primary hover:underline">
            {email}
          </a>
          ,{" "}
          <a href={`tel:${telephone.replace(/\./g, "")}`} className="font-medium text-primary hover:underline">
            {telephone}
          </a>
          , or {addressLine}.
        </p>
        <p className="text-sm text-slate-600">Last updated: May 18, 2026</p>
      </section>

      <p>
        See also our{" "}
        <Link href="/privacy" className="font-medium text-primary hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </StaticContentPage>
  );
}
