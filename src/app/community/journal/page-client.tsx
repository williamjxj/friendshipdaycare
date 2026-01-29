'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { AnimatedPlaceholder } from '@/components/ui/AnimatedPlaceholder';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';

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

export default function JournalPageClient() {
    const { t, messages } = useLanguage();
    const journals = (messages.community?.journal?.samples ?? sampleJournals) as typeof sampleJournals;

    useLocalizedMetadata({
        title: t('community.journal.meta.title'),
        description: t('community.journal.meta.description'),
    });

    return (
        <Suspense fallback={<LoadingSpinner message="Loading journal..." />}>
            <main className="flex-1 bg-background">

                {/* Hero Section */}
                <PageHero
                    title={t('community.journal.hero.title')}
                    subtitle={t('community.journal.hero.subtitle')}
                    backgroundSvg={getImageUrl('/imgs/community/community_journal_hero_1.gif')}
                    enableScrollTrigger={true}
                    hideTitle={true}
                    hideSubtitle={true}
                />

                {/* Journals Grid */}
                <section className="py-20 bg-background relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {journals.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {journals.map((journal, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        key={journal.id}
                                        className="flex"
                                    >
                                        <Card variant="interactive" className="overflow-hidden flex flex-col h-full w-full">
                                            {/* Card Header Illustration/Image Placeholder */}
                                            <CardHeader className="p-0 relative h-48 bg-muted grid place-items-center overflow-hidden border-b border-border">
                                                <AnimatedPlaceholder className="absolute inset-0 z-0" />
                                                <div className="relative z-10 text-center transition-transform duration-500 group-hover:scale-[1.2]">
                                                    <div className="text-4xl mb-2 animate-[magic-float_4s_ease-in-out_infinite]">📖</div>
                                                    <span className="font-bold text-primary text-lg">{journal.month} {journal.year}</span>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="p-6 space-y-4 flex flex-col flex-1">
                                                <div className="space-y-1">
                                                    <CardDescription className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                                        <Calendar className="w-3 h-3" />
                                                        {journal.date}
                                                    </CardDescription>
                                                    <CardTitle className="text-xl font-bold text-foreground">
                                                        {journal.title}
                                                    </CardTitle>
                                                </div>

                                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                                    {journal.excerpt}
                                                </p>

                                                <div className="pt-4 mt-auto">
                                                    <h4 className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">{t('community.journal.labels.highlights')}</h4>
                                                    <ul className="space-y-1.5">
                                                        {journal.highlights.slice(0, 3).map((highlight, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0"></span>
                                                                <span>{highlight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </CardContent>

                                            <CardFooter className="p-6 pt-0 mt-auto">
                                                <Link
                                                    href={`/community/journal/${journal.id}`}
                                                    className="inline-flex items-center justify-center w-full gap-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-3 rounded-lg font-bold text-sm transition-colors group/btn min-h-[44px]"
                                                >
                                                    {t('community.journal.actions.readFull')}
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                                <div className="text-6xl mb-6 opacity-50">📝</div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">
                                    {t('community.journal.empty.title')}
                                </h3>
                                <p className="text-muted-foreground">
                                    {t('community.journal.empty.subtitle')}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </Suspense>
    );
}
