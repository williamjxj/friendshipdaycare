'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
import { getImageUrl } from '@/lib/image-utils';

// Sample journal data
const sampleJournals = [
  {
    id: 1,
    month: 'December',
    year: 2024,
    title: 'Winter Wonderland Adventures',
    excerpt: 'This month, our little explorers discovered the magic of winter through hands-on Montessori activities, seasonal crafts, and cozy story times.',
    coverImage: getImageUrl('/images/journal-dec-2024.jpg'),
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
    <Suspense fallback={<LoadingSpinner message="Loading journal..." />}>
      <main className="flex-1 bg-background">

        {/* Hero Section - Standardized */}
        <div className="relative grid place-items-center w-full min-h-[50vh] bg-muted overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={getImageUrl("/images/practical-life-shelf-1.jpg")} // Clean Montessori image
              alt="Journal background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase border border-primary/20">
                <Newspaper className="w-4 h-4" />
                Monthly Updates
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-foreground leading-tight"
            >
              Daycare <span className="text-primary">Journal</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground w-full max-w-4xl mx-auto leading-relaxed"
            >
              Peek inside our classroom! Discover what our little learners have been exploring, creating, and achieving each month.
            </motion.p>
          </div>
        </div>

        {/* Journals Grid */}
        <section className="py-20 bg-background relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {sampleJournals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleJournals.map((journal, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    key={journal.id}
                    className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                  >
                    {/* Card Header Illustration/Image Placeholder */}
                    <div className="relative h-48 bg-muted grid place-items-center overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                      <div className="text-center">
                        <div className="text-4xl mb-2">📖</div>
                        <span className="font-bold text-primary text-lg">{journal.month} {journal.year}</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex flex-col flex-1">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          <Calendar className="w-3 h-3" />
                          {journal.date}
                        </div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {journal.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {journal.excerpt}
                      </p>

                      <div className="pt-4 mt-auto space-y-4 border-t border-border">
                        <div>
                          <h4 className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">Highlights:</h4>
                          <ul className="space-y-1.5">
                            {journal.highlights.slice(0, 3).map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0"></span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link
                          href={`/community/journal/${journal.id}`}
                          className="inline-flex items-center justify-center w-full gap-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-3 rounded-lg font-bold text-sm transition-colors group/btn"
                        >
                          Read Full Entry
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                <div className="text-6xl mb-6 opacity-50">📝</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  No Journal Entries Yet
                </h3>
                <p className="text-muted-foreground">
                  Check back soon for updates from our classroom!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </Suspense>
  );
}
