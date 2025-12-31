'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

/**
 * Slide Deck Page
 * Displays the NotebookLM slides PDF in an iframe
 */
export default function SlideDeckPage() {
  const pdfUrl = 'https://pub-fafb0f1d538f40ebb6fdd21bb5041a1c.r2.dev/collects/notebooklm-slides.pdf';

  return (
    <Suspense fallback={<LoadingSpinner message="Loading presentation..." />}>
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-8 pb-2 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight mb-4">
              NotebookLM Slides Presentation
            </h1>
            <p className="text-lg text-muted-foreground mx-auto inline-block whitespace-nowrap">
              Explore our interactive presentation
            </p>
          </div>
        </section>

        {/* PDF Embed Section */}
        <section className="py-12 pt-2 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="w-full h-[calc(100vh-200px)] min-h-[600px] rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <iframe
                loading="lazy"
                src={pdfUrl}
                className="w-full h-full border-0"
                allowFullScreen
                allow="fullscreen"
                title="NotebookLM Slides Presentation"
              />
            </div>
            <div className="text-center mt-6">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
              >
                Open PDF in new tab
              </a>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}

