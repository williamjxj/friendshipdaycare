'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, NotebookTabs, Sparkles } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedPlaceholder } from '@/components/ui/AnimatedPlaceholder';
import { BrandLogoMark } from '@/components/ui/brand-visual-assets';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';

const sampleJournals = [
  {
    id: 1,
    month: 'December',
    year: 2024,
    title: 'Winter Wonderland Adventures',
    excerpt: 'This month, our little explorers discovered the magic of winter through hands-on Montessori activities, seasonal crafts, and cozy story times.',
    date: '2024-12-01',
    highlights: [
      'Winter sensory bins with snow and ice',
      'Holiday traditions from around the world',
      'Practical life: Making hot chocolate',
      'Nature walks to observe winter changes'
    ],
  },
  {
    id: 2,
    month: 'November',
    year: 2024,
    title: 'Gratitude and Harvest Celebrations',
    excerpt: 'November brought us opportunities to explore gratitude, harvest traditions, and the changing seasons through meaningful Montessori experiences.',
    date: '2024-11-01',
    highlights: [
      'Thanksgiving feast preparation',
      'Gratitude tree classroom project',
      'Autumn leaf collection and classification',
      'Community helper appreciation week'
    ],
  },
  {
    id: 3,
    month: 'October',
    year: 2024,
    title: 'Autumn Discoveries and Halloween Fun',
    excerpt: 'October was filled with autumn explorations, Halloween celebrations, and exciting discoveries about the changing world around us.',
    date: '2024-10-01',
    highlights: [
      'Pumpkin patch field trip',
      'Halloween costume parade',
      'Apple harvesting and tasting',
      'Leaf pressing and art creation'
    ],
  }
];

export default function JournalPageClient() {
  const { t, messages } = useLanguage();
  const journals = (messages.community?.journal?.samples ?? sampleJournals) as typeof sampleJournals;

  useLocalizedMetadata({
    title: t('community.journal.meta.title'),
    description: t('community.journal.meta.description'),
  });

  return (
    <Suspense fallback={<LoadingSpinner message="Loading journal..." />}>
      <main className="fdc-section-shell flex-1 overflow-x-hidden bg-background pb-20 pt-20">
        <section className="fdc-page-hero px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="fdc-hero-grid">
              <div className="relative z-10 space-y-6">
                <span className="fdc-kicker">Community Journal</span>
                <h1 className="max-w-4xl text-4xl font-display font-bold leading-[0.98] text-slate-900 sm:text-5xl lg:max-w-5xl lg:text-6xl">
                  A warmer look at what our classrooms feel like month to month.
                </h1>
                <p className="max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
                  {t('community.journal.hero.subtitle')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="fdc-stat-chip">
                    <NotebookTabs className="h-4.5 w-4.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Monthly snapshots</span>
                  </span>
                  <span className="fdc-stat-chip">
                    <Sparkles className="h-4.5 w-4.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Activities + highlights</span>
                  </span>
                </div>
              </div>
              <div className="relative z-10 flex justify-center lg:justify-end">
                <div className="fdc-panel flex items-center gap-5 px-6 py-6 sm:px-8">
                  <BrandLogoMark size="lg" />
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Inside Friendship Corner</p>
                    <p className="max-w-xs text-sm leading-7 text-muted-foreground">
                      Stories, themes, and classroom moments that help families stay connected to the rhythm of the daycare.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {journals.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {journals.map((journal, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    key={journal.id}
                    className="flex"
                  >
                    <Card variant="interactive" className="fdc-panel w-full overflow-hidden border-0">
                      <CardHeader className="relative h-48 overflow-hidden border-b border-border/60 p-0">
                        <AnimatedPlaceholder className="absolute inset-0 z-0" />
                        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                          <div className="mb-3 text-4xl animate-[magic-float_4s_ease-in-out_infinite]">📖</div>
                          <span className="text-lg font-bold text-primary">{journal.month} {journal.year}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="flex flex-1 flex-col p-6">
                        <CardDescription className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {journal.date}
                        </CardDescription>
                        <CardTitle className="mt-3 text-2xl font-display font-bold text-foreground">
                          {journal.title}
                        </CardTitle>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {journal.excerpt}
                        </p>

                        <div className="mt-5 rounded-[1.25rem] bg-muted/55 p-4">
                          <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-foreground">
                            {t('community.journal.labels.highlights')}
                          </h3>
                          <ul className="fdc-dot-list mt-3">
                            {journal.highlights.slice(0, 3).map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>

                      <CardFooter className="p-6 pt-0">
                        <span className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary/10 px-4 text-sm font-bold text-primary">
                          {t('community.journal.actions.readFull')}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="fdc-panel px-6 py-16 text-center">
                <div className="text-6xl opacity-50">📝</div>
                <h3 className="mt-6 text-2xl font-display font-bold text-foreground">
                  {t('community.journal.empty.title')}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {t('community.journal.empty.subtitle')}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </Suspense>
  );
}
