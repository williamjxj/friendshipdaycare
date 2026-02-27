'use client';

/**
 * Funding and subsidies page: ACCB, ChildCareBC, tuition inquiry.
 */
export function FundingPageClient() {

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">
          Funding & Subsidies
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Learn about BC Affordable Child Care Benefit (ACCB), the $10/day ChildCareBC program, and tuition rates at Friendship Corner Daycare.
        </p>

        <section className="space-y-8 mb-12">
          <h2 className="text-2xl font-semibold">BC Affordable Child Care Benefit (ACCB)</h2>
          <p className="text-muted-foreground">
            Eligible families may receive support through the provincial Affordable Child Care Benefit. We can help you understand the application process.
          </p>

          <h2 className="text-2xl font-semibold">ChildCareBC $10-a-Day Program</h2>
          <p className="text-muted-foreground">
            Friendship Corner Daycare participates in the $10-a-day child care program where spaces are available. Contact us for current availability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tuition Rate Inquiry</h2>
          <p className="text-muted-foreground mb-4">
            For detailed tuition information and current availability, please contact us via our contact page or call 604.945.8504.
          </p>
          <a
            href="/contact#contact-form"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Contact Us
          </a>
        </section>
      </div>
    </main>
  );
}
