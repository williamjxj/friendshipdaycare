'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { WelcomeCompactHeader } from '@/components/layout/WelcomeCompactHeader';
import { Footer } from '@/components/layout/Footer';
import { MobileCtaBar } from '@/components/ui/MobileCtaBar';
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';
import { SkipNavigation } from '@/components/ui/SkipNavigation';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWelcome = pathname === '/welcome';

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
        {children}
      </main>
      {!isWelcome && <Footer />}
      {!isWelcome && <MobileCtaBar />}
      {!isWelcome && <ScrollToTopButton />}
    </div>
  );
}
