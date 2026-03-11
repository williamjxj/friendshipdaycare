/**
 * Page Template
 * 
 * Copy this template to create new pages following the daycare UI patterns.
 * Replace 'my-page' with your page name.
 */

// =============================================================================
// SERVER COMPONENT (page.tsx)
// Handles metadata, data fetching, and renders client component
// =============================================================================

import type { Metadata } from 'next';
import { getLocalizedMetadata } from '@/lib/use-localized-metadata';
import { MyPageClient } from './page-client';

/**
 * Generate metadata for SEO
 * Automatically localizes for all 5 languages
 */
export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedMetadata({
    title: 'Page Title',  // Will become "Page Title | Friendship Corner Daycare"
    description: 'Page description for search engines. Keep under 160 characters.',
    path: '/my-page',
  });
}

/**
 * Server component
 * Use for data fetching, redirects, etc.
 */
export default async function MyPage() {
  // Optional: Fetch data here
  // const data = await fetchData();
  
  return <MyPageClient />;
}

// =============================================================================
// CLIENT COMPONENT (page-client.tsx)
// Handles interactivity, animations, and user interactions
// =============================================================================

/**
 * Create this file: page-client.tsx
 */

/*
'use client';

import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/ui/page-hero';
import { MySectionContent } from '@/components/sections/MySectionContent';

export function MyPageClient() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section }
      <PageHero
        title={t('myPage.hero.title')}
        description={t('myPage.hero.description')}
        imageSrc="/imgs/my-page/hero.jpg"
        breadcrumbs={[
          { label: t('nav.home'), href: '/' },
          { label: t('myPage.title') }
        ]}
      />
      
      {/* Main Content Sections }
      <MySectionContent />
      
      {/* Additional sections... }
      
      {/* Call to Action Section }
      <motion.section
        className="py-20 bg-primary text-primary-foreground"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-6"
            variants={slideUp}
          >
            {t('myPage.cta.title')}
          </motion.h2>
          <motion.p 
            className="text-lg mb-8 opacity-90"
            variants={slideUp}
          >
            {t('myPage.cta.description')}
          </motion.p>
          <motion.div variants={slideUp}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold text-lg hover:bg-accent/90 transition-colors"
            >
              {t('myPage.cta.button')}
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
*/

// =============================================================================
// LOADING STATE (loading.tsx) - Optional
// Shows while page is loading
// =============================================================================

/*
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
    </div>
  );
}
*/

// =============================================================================
// TRANSLATION KEYS
// Add to all language files: /src/messages/*.json
// =============================================================================

/*
{
  "myPage": {
    "title": "Page Title",
    "hero": {
      "title": "Hero Title",
      "description": "Hero description text"
    },
    "cta": {
      "title": "Ready to get started?",
      "description": "Contact us today to learn more.",
      "button": "Contact Us"
    }
  }
}
*/

// =============================================================================
// NAVIGATION
// Add to Header.tsx navigation if needed
// =============================================================================

/*
const navItems = [
  // ... existing items
  { label: t('nav.myPage'), href: '/my-page' },
];
*/

// =============================================================================
// SITEMAP
// Page is automatically included in sitemap.ts
// No action needed if following standard patterns
// =============================================================================
