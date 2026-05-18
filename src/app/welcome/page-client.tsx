'use client';

import { Suspense } from 'react';
import { WelcomeForm } from '@/components/ui/welcome-form';
import { useLanguage } from '@/contexts/LanguageContext';

function WelcomeFormFallback() {
  return (
    <div
      className="mx-auto h-56 w-full min-w-[280px] max-w-6xl animate-pulse rounded-2xl border border-border/60 bg-card/80 shadow-md"
      aria-hidden
    />
  );
}

export function WelcomePageClient() {
  const { t } = useLanguage();

  return (
    <div
      id="main-content"
      data-testid="welcome-page"
      className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden px-3 py-3 sm:px-4 sm:py-4"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-amber-50/90 via-background to-sky-50/50 dark:from-amber-950/20 dark:via-background dark:to-sky-950/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-8 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-12 bottom-16 -z-10 h-36 w-36 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-500/10"
        aria-hidden
      />

      <header className="mx-auto mb-3 w-full min-w-0 max-w-6xl shrink-0 text-center">
        <h1 className="font-display text-xl font-bold tracking-tight text-primary sm:text-2xl">
          {t('welcomePage.hero.title')}
        </h1>
        <p className="mt-1 text-sm leading-snug text-muted-foreground sm:text-base">
          {t('welcomePage.hero.subtitle')}
        </p>
      </header>

      <Suspense fallback={<WelcomeFormFallback />}>
        <WelcomeForm />
      </Suspense>
    </div>
  );
}
