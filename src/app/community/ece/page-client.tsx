'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';

/**
 * BC Early Childhood Education (ECE) knowledge page (client content).
 * Sections: intro, what it is, learning areas, licensing & quality, how we align, further reading.
 */
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
      <main className="flex-1 bg-background relative">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none bg-cover bg-center bg-no-repeat"
          aria-hidden
          style={{ backgroundImage: `url(${getImageUrl('/collects/decoration.png')})` }}
        />

        <PageHero
          title={t('community.bcEarlyLearning.hero.title')}
          subtitle={t('community.bcEarlyLearning.hero.subtitle')}
          backgroundSvg={getImageUrl('/imgs/community/community_journal_hero_1.gif')}
          enableScrollTrigger
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">
          <section>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('community.bcEarlyLearning.intro')}
            </p>
          </section>

          {/* R2 Collects visual — canva-1.png at original proportion */}
          <section className="flex justify-center" aria-hidden>
            <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl ring-1 ring-border/50">
              <img
                src={getImageUrl('/collects/canva-1.png')}
                alt=""
                className="w-full h-auto block"
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('community.bcEarlyLearning.whatItIs.title')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('community.bcEarlyLearning.whatItIs.body')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('community.bcEarlyLearning.learningAreas.title')}
            </h2>
            <ul className="space-y-2 list-none">
              {learningAreasItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('community.bcEarlyLearning.licensingQuality.title')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('community.bcEarlyLearning.licensingQuality.body')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('community.bcEarlyLearning.howWeAlign.title')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('community.bcEarlyLearning.howWeAlign.body')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('community.bcEarlyLearning.furtherReading.title')}
            </h2>
            <ul className="space-y-2 list-none">
              {furtherLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="pt-6 border-t border-border">
            <Link
              href="/community/montessori"
              className="text-primary hover:underline font-medium inline-flex items-center gap-2"
            >
              {t('community.bcEarlyLearning.seeAlso')}
            </Link>
          </section>
        </div>
      </main>
    </Suspense>
  );
}
