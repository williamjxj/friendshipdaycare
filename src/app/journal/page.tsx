'use client';

import { Suspense } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipNavigation } from '@/components/ui/SkipNavigation';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

// Sample journal data - in a real app, this would come from a CMS or database
const sampleJournals = [
  {
    id: 1,
    month: 'December',
    year: 2024,
    title: 'Winter Wonderland Adventures',
    excerpt: 'This month, our little explorers discovered the magic of winter through hands-on Montessori activities, seasonal crafts, and cozy story times.',
    coverImage: '/images/journal-dec-2024.jpg',
    date: '2024-12-01',
    highlights: [
      'Winter sensory bins with snow and ice',
      'Holiday traditions from around the world',
      'Practical life: Making hot chocolate',
      'Nature walks to observe winter changes'
    ],
    activities: [
      'Snowflake cutting and symmetry exploration',
      'Winter animal habitat studies',
      'Seasonal cooking activities',
      'Holiday card making for families'
    ]
  },
  {
    id: 2,
    month: 'November',
    year: 2024,
    title: 'Gratitude and Harvest Celebrations',
    excerpt: 'November brought us opportunities to explore gratitude, harvest traditions, and the changing seasons through meaningful Montessori experiences.',
    coverImage: '/images/journal-nov-2024.jpg',
    date: '2024-11-01',
    highlights: [
      'Thanksgiving feast preparation',
      'Gratitude tree classroom project',
      'Autumn leaf collection and classification',
      'Community helper appreciation week'
    ],
    activities: [
      'Pumpkin lifecycle studies',
      'Traditional bread making',
      'Fall nature art projects',
      'Thank you card writing practice'
    ]
  },
  {
    id: 3,
    month: 'October',
    year: 2024,
    title: 'Autumn Discoveries and Halloween Fun',
    excerpt: 'October was filled with autumn explorations, Halloween celebrations, and exciting discoveries about the changing world around us.',
    coverImage: '/images/journal-oct-2024.jpg',
    date: '2024-10-01',
    highlights: [
      'Pumpkin patch field trip',
      'Halloween costume parade',
      'Apple harvesting and tasting',
      'Leaf pressing and art creation'
    ],
    activities: [
      'Pumpkin carving (teacher demonstration)',
      'Spooky story time sessions',
      'Autumn sensory exploration',
      'Harvest festival preparations'
    ]
  }
];

export default function JournalPage() {
  const { t } = useLanguage();

  return (
    <ThemeProvider>
      <Suspense fallback={<LoadingSpinner message="Loading journal..." />}>
        <div className="min-h-screen flex flex-col">
          <SkipNavigation />
          <Header />

          {/* Main Content */}
          <main id="main-content" className="flex-1">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-16 h-16 bg-indigo-300 rounded-full floating-animation opacity-60"></div>
                <div className="absolute top-40 right-20 w-12 h-12 bg-purple-300 rounded-full bounce-animation opacity-60"></div>
                <div className="absolute bottom-40 left-20 w-20 h-20 bg-pink-300 rounded-full wiggle-animation opacity-60"></div>
                <div className="absolute bottom-20 right-10 w-14 h-14 bg-blue-300 rounded-full floating-animation opacity-60"></div>
                
                <div className="absolute top-32 left-1/4 text-4xl floating-animation">📚</div>
                <div className="absolute top-20 right-1/3 text-3xl bounce-animation">✨</div>
                <div className="absolute bottom-32 left-1/3 text-4xl wiggle-animation">🌟</div>
                <div className="absolute bottom-20 right-1/4 text-3xl floating-animation">📖</div>
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-display font-bold rainbow-text">
                      {t('journal.title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-purple-600 font-medium">
                      {t('journal.subtitle')}
                    </p>
                    <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                      {t('journal.description')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Journals Grid */}
            <section className="py-20 bg-background">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {sampleJournals.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sampleJournals.map((journal, index) => (
                      <div
                        key={journal.id}
                        className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-2">
                              <div className="text-6xl">📖</div>
                              <div className="text-lg font-semibold text-indigo-600">
                                {journal.month} {journal.year}
                              </div>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className="p-6 space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {journal.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {journal.month} {journal.year}
                            </p>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed line-clamp-3">
                            {journal.excerpt}
                          </p>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-2">{t('journal.highlights')}:</h4>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {journal.highlights.slice(0, 2).map((highlight, idx) => (
                                  <li key={idx} className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                                {journal.highlights.length > 2 && (
                                  <li className="text-primary text-xs">+ {journal.highlights.length - 2} more...</li>
                                )}
                              </ul>
                            </div>
                            
                            <Link
                              href={`/journal/${journal.id}`}
                              className="inline-block w-full text-center bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                            >
                              {t('journal.readMore')}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {t('journal.noJournals')}
                    </h3>
                    <p className="text-muted-foreground">
                      We&apos;re working on creating wonderful journal entries to share with you.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}
