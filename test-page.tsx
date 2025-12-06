import { Suspense } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipNavigation } from '@/components/ui/SkipNavigation';
import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('@/components/ui/VideoPlayer').then(mod => ({ default: mod.VideoPlayer })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-muted rounded-xl flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <span className="text-primary font-bold text-2xl">▶</span>
        </div>
        <p className="text-muted-foreground">Loading video player...</p>
      </div>
    </div>
  )
});

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipNavigation />
      <Header />
      <main id="main-content" className="flex-1">
        <h1>Test</h1>
      </main>
      <Footer />
    </div>
  );
}
