'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';

/**
 * Montessori education knowledge page (client content).
 * Sections: intro, principles, benefits, at our daycare, further reading.
 */
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
      <main className="flex-1 bg-background relative">
        {/* Optional R2 Collects decorative background */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none bg-cover bg-center bg-no-repeat"
          aria-hidden
          style={{ backgroundImage: `url(${getImageUrl('/collects/decoration.png')})` }}
        />

        <PageHero
          title={t('community.montessori.hero.title')}
          subtitle={t('community.montessori.hero.subtitle')}
          backgroundSvg={getImageUrl('/imgs/community/community_journal_hero_1.gif')}
          enableScrollTrigger
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">
          <section>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('community.montessori.intro')}
            </p>
          </section>

          {/* R2 Collects visual — gemini-1.png at original proportion */}
          <section className="flex justify-center" aria-hidden>
            <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl ring-1 ring-border/50">
              <img
                src={getImageUrl('/collects/gemini-1.png')}
                alt=""
                className="w-full h-auto block"
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('community.montessori.principles.title')}
            </h2>
            <ul className="space-y-2 list-none">
              {principlesItems.map((item, i) => (
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
              {t('community.montessori.benefits.title')}
            </h2>
            <ul className="space-y-2 list-none">
              {benefitsItems.map((item, i) => (
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
              {t('community.montessori.atOurDaycare.title')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('community.montessori.atOurDaycare.body')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('community.montessori.furtherReading.title')}
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
              href="/community/ece"
              className="text-primary hover:underline font-medium inline-flex items-center gap-2"
            >
              {t('community.montessori.seeAlso')}
            </Link>
          </section>
        </div>
      </main>
    </Suspense>
  );
}
