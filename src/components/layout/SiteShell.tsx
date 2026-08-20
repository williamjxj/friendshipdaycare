'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { WelcomeCompactHeader } from '@/components/layout/WelcomeCompactHeader';
import { Footer } from '@/components/layout/Footer';
import { MobileCtaBar } from '@/components/ui/MobileCtaBar';
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';
import { SkipNavigation } from '@/components/ui/SkipNavigation';
import { PageBreadcrumbs } from '@/components/layout/PageBreadcrumbs';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWelcome = pathname === '/welcome';

  // Lightweight conversion tracking for click-to-call / email links (GA4).
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag !== 'function') return;
      if (href.startsWith('tel:')) {
        gtag('event', 'click_phone', { event_category: 'contact', event_label: href });
      } else if (href.startsWith('mailto:')) {
        gtag('event', 'click_email', { event_category: 'contact', event_label: href });
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div
      className={
        isWelcome
          ? 'flex min-h-[100dvh] flex-col overflow-x-hidden'
          : 'flex min-h-screen flex-col overflow-x-hidden pb-24 md:pb-0'
      }
    >
      <SkipNavigation />
      {isWelcome ? <WelcomeCompactHeader /> : <Header />}
      <main className={isWelcome ? 'flex flex-1 flex-col pt-11 sm:pt-12' : 'flex-1 pt-16'} role="main">
        {!isWelcome && <PageBreadcrumbs />}
        {children}
      </main>
      {!isWelcome && <Footer />}
      {!isWelcome && <MobileCtaBar />}
      {!isWelcome && <ScrollToTopButton />}
    </div>
  );
}
