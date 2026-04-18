'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PageLoader, LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { getImageUrl } from '@/lib/image-utils';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, PlayCircle, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';
import { businessProfile } from '@/lib/business-profile';

export default function TodaysStoryContent() {
  const { t, messages } = useLanguage();
  const fallbackWeeklyItems = [
    { week: 1, title: 'The Good Samaritan', theme: 'Kindness', color: 'primary' },
    { week: 2, title: 'David and Goliath', theme: 'Courage', color: 'secondary' },
    { week: 3, title: "Noah's Ark", theme: 'Caring', color: 'accent' },
    { week: 4, title: 'The Lost Sheep', theme: 'Love', color: 'primary' },
  ];
  const weeklyItems = ((messages.community?.todaysStory?.calendar?.length ?? 0) > 0
    ? messages.community?.todaysStory?.calendar
    : fallbackWeeklyItems) as Array<{
      week: number;
      title: string;
      theme: string;
      color: 'primary' | 'secondary' | 'accent';
    }>;

  useLocalizedMetadata({
    title: t('community.todaysStory.meta.title'),
    description: t('community.todaysStory.meta.description'),
  });

  return (
    <Suspense fallback={<PageLoader message="Loading today's magical story..." />}>
      <main className="fdc-section-shell flex-1 overflow-x-hidden bg-background pb-20 pt-20">
        <section className="fdc-page-hero px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="fdc-hero-grid">
              <div className="relative z-10 space-y-6">
                <span className="fdc-kicker">Today&apos;s Story</span>
                <h1 className="max-w-4xl text-4xl font-display font-bold leading-[0.98] text-slate-900 sm:text-5xl lg:max-w-5xl lg:text-6xl">
                  Storytime with a calmer, more intentional visual rhythm.
                </h1>
                <p className="max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
                  {t('community.todaysStory.hero.subtitle')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="fdc-stat-chip">
                    <PlayCircle className="h-4.5 w-4.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Weekly video stories</span>
                  </span>
                  <span className="fdc-stat-chip">
                    <Sparkles className="h-4.5 w-4.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Character themes for children</span>
                  </span>
                </div>
              </div>
              <div className="relative z-10 fdc-panel bg-white/90 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Why families use this page</p>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  It gives children a familiar weekly story rhythm and gives families a simple way to continue the conversation at home.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Card variant="elevated" className="fdc-panel border-0 p-6 md:p-10">
              <CardHeader className="p-0 text-center">
                <CardTitle className="flex items-center justify-center gap-3 text-3xl font-display font-bold text-foreground">
                  <Star className="h-7 w-7 text-accent shrink-0" />
                  {t('community.todaysStory.weekly.title')}
                  <Star className="h-7 w-7 text-accent shrink-0" />
                </CardTitle>
                <CardDescription className="mx-auto mt-2 max-w-2xl text-base leading-7 text-muted-foreground">
                  {t('community.todaysStory.weekly.subtitle')}
                </CardDescription>
              </CardHeader>

              <Suspense fallback={<div className="mt-8 h-[400px] grid place-items-center rounded-[1.5rem] bg-muted"><LoadingSpinner size="lg" /></div>}>
                <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-[1.5rem] shadow-[0_24px_44px_rgba(15,23,42,0.16)]">
                  <VideoPlayer videos={[
                    {
                      url: 'https://www.youtube.com/watch?v=Yz2NiUJHmhE',
                      title: t('community.todaysStory.videos.goodSamaritan.title'),
                      description: t('community.todaysStory.videos.goodSamaritan.description'),
                      thumbnail: getImageUrl('/images/video-thumb-1.jpg')
                    },
                    {
                      url: 'https://www.youtube.com/watch?v=hlQEmjWRa4A',
                      title: t('community.todaysStory.videos.davidGoliath.title'),
                      description: t('community.todaysStory.videos.davidGoliath.description'),
                      thumbnail: getImageUrl('/images/video-thumb-2.jpg')
                    },
                    {
                      url: 'https://www.youtube.com/watch?v=tLxKjqG6iAg',
                      title: t('community.todaysStory.videos.noahArk.title'),
                      description: t('community.todaysStory.videos.noahArk.description'),
                      thumbnail: getImageUrl('/images/video-thumb-3.jpg')
                    }
                  ]} />
                </div>
              </Suspense>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card variant="data" className="rounded-[1.5rem] border border-primary/20 bg-primary/6 p-6 text-center">
                  <Heart className="mx-auto h-10 w-10 text-primary" />
                  <CardTitle className="mt-3 text-lg font-display font-bold text-foreground">{t('community.todaysStory.lessonCards.kind.title')}</CardTitle>
                  <CardDescription className="mt-2 p-0 text-sm leading-7 text-muted-foreground">{t('community.todaysStory.lessonCards.kind.description')}</CardDescription>
                </Card>
                <Card variant="data" className="rounded-[1.5rem] border border-secondary/20 bg-secondary/8 p-6 text-center">
                  <Sparkles className="mx-auto h-10 w-10 text-secondary" />
                  <CardTitle className="mt-3 text-lg font-display font-bold text-foreground">{t('community.todaysStory.lessonCards.helpful.title')}</CardTitle>
                  <CardDescription className="mt-2 p-0 text-sm leading-7 text-muted-foreground">{t('community.todaysStory.lessonCards.helpful.description')}</CardDescription>
                </Card>
                <Card variant="data" className="rounded-[1.5rem] border border-accent/30 bg-accent/8 p-6 text-center">
                  <Star className="mx-auto h-10 w-10 text-amber-600" />
                  <CardTitle className="mt-3 text-lg font-display font-bold text-foreground">{t('community.todaysStory.lessonCards.love.title')}</CardTitle>
                  <CardDescription className="mt-2 p-0 text-sm leading-7 text-muted-foreground">{t('community.todaysStory.lessonCards.love.description')}</CardDescription>
                </Card>
              </div>
            </Card>
          </div>
        </section>

        <section className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="fdc-panel p-6 sm:p-8">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <h2 className="text-3xl font-display font-bold text-foreground">{t('community.todaysStory.calendar.title')}</h2>
                <p className="mt-3 text-base leading-8 text-muted-foreground">{t('community.todaysStory.calendar.subtitle')}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {weeklyItems.map((item) => (
                  <Card key={item.week} variant="interactive" className="rounded-[1.5rem] border border-border/70 bg-white/80 p-5 text-left">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm",
                          item.color === 'primary' ? 'bg-primary' : item.color === 'secondary' ? 'bg-secondary' : 'bg-accent'
                        )}
                      >
                        {item.week}
                      </div>
                      <div className="space-y-2">
                        <CardTitle className="text-lg font-display font-bold leading-tight text-foreground">
                          {item.title}
                        </CardTitle>
                        <p className="text-sm font-semibold text-primary">{item.theme}</p>
                        <CardDescription className="p-0 text-sm leading-7 text-muted-foreground">
                          Week {item.week} of the curriculum
                        </CardDescription>
                        <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">
                          {businessProfile.telephone}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="fdc-panel bg-primary p-8 text-center text-primary-foreground sm:p-10">
              <h2 className="text-3xl font-display font-bold">{t('community.todaysStory.cta.title')}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-white/90">{t('community.todaysStory.cta.subtitle')}</p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/#contact-form" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-primary">
                  {t('community.todaysStory.cta.primary')}
                </Link>
                <Link href="/#programs" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-bold text-white">
                  {t('community.todaysStory.cta.secondary')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
