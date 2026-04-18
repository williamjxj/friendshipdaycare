'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import { BrandAdPromoCard } from '@/components/ui/brand-visual-assets';
import { getImageUrl } from '@/lib/image-utils';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';

export default function MontessoriPageClient() {
  const { t, messages } = useLanguage();

  useLocalizedMetadata({
    title: t('community.montessori.meta.title'),
    description: t('community.montessori.meta.description'),
  });

  const principlesItems =
    (messages.community?.montessori?.principles?.items as string[] | undefined) ?? [];
  const benefitsItems =
    (messages.community?.montessori?.benefits?.items as string[] | undefined) ?? [];
  const furtherLinks =
    (messages.community?.montessori?.furtherReading?.links as Array<{ label: string; url: string }> | undefined) ?? [];

  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <main className="fdc-section-shell flex-1 overflow-x-hidden bg-background pb-20 pt-20">
        <section className="fdc-page-hero px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="fdc-hero-grid">
              <div className="relative z-10 space-y-6">
                <span className="fdc-kicker">Montessori Explained</span>
                <h1 className="max-w-4xl text-4xl font-display font-bold leading-[0.98] text-slate-900 sm:text-5xl lg:max-w-5xl lg:text-6xl">
                  Why Montessori still matters in the early years.
                </h1>
                <p className="max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
                  {t('community.montessori.hero.subtitle')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="fdc-stat-chip">
                    <BookOpen className="h-4.5 w-4.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Hands-on learning</span>
                  </span>
                  <span className="fdc-stat-chip">
                    <Sparkles className="h-4.5 w-4.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Independence + concentration</span>
                  </span>
                </div>
              </div>
              <div className="relative z-10">
                <BrandAdPromoCard className="max-w-xl border-white/70 bg-white/85" />
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)]">
            <section className="fdc-panel p-6 sm:p-8">
              <p className="fdc-prose">{t('community.montessori.intro')}</p>
              <div className="mt-8 overflow-hidden rounded-[1.5rem] ring-1 ring-border/60">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={getImageUrl('/collects/gemini-1.png')}
                    alt="Montessori classroom visual"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 720px"
                  />
                </div>
              </div>
            </section>

            <aside className="grid gap-5">
              <section className="fdc-panel p-6 sm:p-7">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {t('community.montessori.principles.title')}
                </h2>
                <ul className="fdc-dot-list mt-5">
                  {principlesItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section className="fdc-panel p-6 sm:p-7">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {t('community.montessori.benefits.title')}
                </h2>
                <ul className="fdc-dot-list mt-5">
                  {benefitsItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.78fr)]">
            <section className="fdc-panel p-6 sm:p-8">
              <h2 className="text-2xl font-display font-bold text-foreground">
                {t('community.montessori.atOurDaycare.title')}
              </h2>
              <p className="mt-4 fdc-prose">{t('community.montessori.atOurDaycare.body')}</p>
            </section>

            <section className="fdc-panel p-6 sm:p-7">
              <h2 className="text-2xl font-display font-bold text-foreground">
                {t('community.montessori.furtherReading.title')}
              </h2>
              <div className="mt-5 space-y-3">
                {furtherLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fdc-link-card"
                  >
                    <div>
                      <p className="text-base font-bold text-foreground">{link.label}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">Open external reading resource</p>
                    </div>
                    <ArrowRight className="h-4.5 w-4.5 shrink-0 text-primary" />
                  </a>
                ))}
              </div>
              <Link
                href="/community/ece"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
              >
                {t('community.montessori.seeAlso')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </div>
        </div>
      </main>
    </Suspense>
  );
}
