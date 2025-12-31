'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

/**
 * Gamma Page
 * Displays the Gamma embed for Friendship Corner Daycare
 */
export default function GammaPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading presentation..." />}>
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-8 pb-2 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight mb-4">
              Friendship Corner Daycare
            </h1>
            <p className="text-lg text-muted-foreground mx-auto inline-block whitespace-nowrap">
              Nurturing Friendships, Growing Together
            </p>
          </div>
        </section>

        {/* Embed Section */}
        <section className="py-12 pt-2 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              style={{
                position: 'relative',
                width: '100%',
                height: 0,
                paddingTop: '56.2500%',
                paddingBottom: 0,
                boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                marginTop: '1.6em',
                marginBottom: '0.9em',
                overflow: 'hidden',
                borderRadius: '8px',
                willChange: 'transform'
              }}
            >
              <iframe
                loading="lazy"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  border: 'none',
                  padding: 0,
                  margin: 0
                }}
                src="https://gamma.app/embed/c61d992s297mq4d"
                allowFullScreen
                allow="fullscreen"
                title="Friendship Daycare: Nurturing Friendships, Growing Together"
              />
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
