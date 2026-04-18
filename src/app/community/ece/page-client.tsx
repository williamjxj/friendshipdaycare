'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, FileCheck2, School2, ShieldCheck } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import { BrandAdPromoCard } from '@/components/ui/brand-visual-assets';
import { getImageUrl } from '@/lib/image-utils';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';

export default function BCEarlyLearningPageClient() {
  const { t, messages } = useLanguage();

  useLocalizedMetadata({
    title: t('community.bcEarlyLearning.meta.title'),
    description: t('community.bcEarlyLearning.meta.description'),
  });

  const learningAreasItems =
    (messages.community?.bcEarlyLearning?.learningAreas?.items as string[] | undefined) ?? [];
  const furtherLinks =
    (messages.community?.bcEarlyLearning?.furtherReading?.links as Array<{ label: string; url: string }> | undefined) ?? [];

  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <main className="fdc-section-shell flex-1 overflow-x-hidden bg-background pb-20 pt-20">
        <section className="fdc-page-hero px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="fdc-hero-grid">
              <div className="relative z-10 space-y-6">
                <span className="fdc-kicker">BC Early Learning</span>
                <h1 className="max-w-4xl text-4xl font-display font-bold leading-[0.98] text-slate-900 sm:text-5xl lg:max-w-5xl lg:text-6xl">
                  A clearer view of the BC early learning framework.
                </h1>
                <p className="max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
                  {t('community.bcEarlyLearning.hero.subtitle')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="fdc-stat-chip">
                    <School2 className="h-4.5 w-4.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Learning through relationship</span>
                  </span>
                  <span className="fdc-stat-chip">
                    <ShieldCheck className="h-4.5 w-4.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Licensing + quality context</span>
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
              <p className="fdc-prose">{t('community.bcEarlyLearning.intro')}</p>
              <div className="mt-8 overflow-hidden rounded-[1.5rem] ring-1 ring-border/60">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={getImageUrl('/collects/canva-1.png')}
                    alt="BC early learning classroom visual"
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
                  {t('community.bcEarlyLearning.whatItIs.title')}
                </h2>
                <p className="mt-4 fdc-prose">{t('community.bcEarlyLearning.whatItIs.body')}</p>
              </section>
              <section className="fdc-panel p-6 sm:p-7">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {t('community.bcEarlyLearning.learningAreas.title')}
                </h2>
                <ul className="fdc-dot-list mt-5">
                  {learningAreasItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.78fr)]">
            <section className="fdc-panel p-6 sm:p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    {t('community.bcEarlyLearning.licensingQuality.title')}
                  </h2>
                  <p className="mt-4 fdc-prose">{t('community.bcEarlyLearning.licensingQuality.body')}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    {t('community.bcEarlyLearning.howWeAlign.title')}
                  </h2>
                  <p className="mt-4 fdc-prose">{t('community.bcEarlyLearning.howWeAlign.body')}</p>
                </div>
              </div>
            </section>

            <section className="fdc-panel p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </span>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {t('community.bcEarlyLearning.furtherReading.title')}
                </h2>
              </div>
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
                href="/community/montessori"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
              >
                {t('community.bcEarlyLearning.seeAlso')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </div>
        </div>
      </main>
    </Suspense>
  );
}
