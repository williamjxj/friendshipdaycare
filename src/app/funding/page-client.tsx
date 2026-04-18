'use client';

import Link from 'next/link';
import { ArrowRight, BadgeDollarSign, FileCheck2, Landmark, WalletCards } from 'lucide-react';
import { BrandAdPromoCard } from '@/components/ui/brand-visual-assets';

const fundingCards = [
  {
    icon: BadgeDollarSign,
    title: 'Affordable Child Care Benefit',
    body: 'Income-based support for eligible BC families. We can help you understand timing, documents, and how subsidy fits your monthly planning.',
    href: 'https://www2.gov.bc.ca/gov/content/family-social-support/caring-for-young-children/child-care/child-care-benefits',
    cta: 'Visit BC benefit page',
  },
  {
    icon: Landmark,
    title: 'ChildCareBC $10-a-Day',
    body: 'Where eligible spaces are available, families may benefit from reduced fees through the provincial program. Availability can vary by program and timing.',
  },
  {
    icon: WalletCards,
    title: 'Tuition planning',
    body: 'If you are comparing options, we can walk you through fees, availability, and what your family would need to budget before enrollment.',
  },
];

export function FundingPageClient() {
  return (
    <main id="main-content" className="fdc-section-shell min-h-screen overflow-x-hidden pb-20 pt-20">
      <section className="fdc-page-hero px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="fdc-hero-grid">
            <div className="relative z-10 space-y-6">
              <span className="fdc-kicker">Funding & Subsidies</span>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-display font-bold leading-[0.98] text-slate-900 sm:text-5xl lg:max-w-5xl lg:text-6xl">
                  Clearer daycare cost planning for BC families.
                </h1>
                <p className="max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
                  This page brings together the subsidy and funding conversations families usually need first: what provincial support exists, what it may change, and when to contact us for current availability.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="fdc-stat-chip">
                  <FileCheck2 className="h-4.5 w-4.5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Province-linked funding guidance</span>
                </span>
                <span className="fdc-stat-chip">
                  <WalletCards className="h-4.5 w-4.5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Tuition questions welcomed</span>
                </span>
              </div>
            </div>
            <div className="relative z-10">
              <BrandAdPromoCard className="max-w-xl border-white/70 bg-white/85" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="grid gap-5">
            {fundingCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="fdc-panel p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="space-y-3">
                      <h2 className="text-2xl font-display font-bold text-foreground">{card.title}</h2>
                      <p className="fdc-prose">{card.body}</p>
                      {card.href ? (
                        <a
                          href={card.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-primary"
                        >
                          {card.cta}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="fdc-panel p-6 sm:p-7">
            <span className="fdc-kicker">What Families Usually Ask</span>
            <div className="mt-5 space-y-5">
              <div>
                <h3 className="text-lg font-display font-bold text-foreground">Can you confirm current availability?</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Yes. The fastest path is to contact us directly so we can discuss age group, schedule needs, and whether funded spaces are currently open.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-foreground">Can you help us estimate next steps?</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  We can explain what information you should prepare before applying or comparing options. That usually saves families time.
                </p>
              </div>
              <div className="rounded-[1.35rem] bg-primary px-5 py-5 text-primary-foreground shadow-[0_18px_34px_rgba(59,130,246,0.24)]">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/80">Next Step</p>
                <p className="mt-2 text-base leading-7">
                  Reach out for current tuition and enrollment guidance tailored to your child&apos;s age group.
                </p>
                <Link
                  href="/#contact-form"
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-bold text-primary"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
