'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

/**
 * Canva2 Page
 * Displays the second Canva embed for Friendship Corner Daycare
 */
export default function Canva2Page() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading presentation..." />}>
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-8 pb-2 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight mb-4">
              Friendship Corner Montessori Daycare
            </h1>
            <p className="text-lg text-muted-foreground mx-auto inline-block whitespace-nowrap">
              Explore our interactive presentation
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
                src="https://www.canva.com/design/DAG7dRjU1O0/2vRSJcgwhTRgqSPLE6iA3w/view?embed"
                allowFullScreen
                allow="fullscreen"
                title="Friendship Corner Daycare Presentation"
              />
            </div>
            <div className="text-center mt-6">
              <a
                href="https://www.canva.com/design/DAG7dRjU1O0/2vRSJcgwhTRgqSPLE6iA3w/view?utm_content=DAG7dRjU1O0&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
              >
                Friendship Corner Daycare
              </a>
              <span className="text-muted-foreground"> by bestitconsulting</span>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
