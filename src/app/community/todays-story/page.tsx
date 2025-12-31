'use client';

import { Suspense } from 'react';
import { PageLoader, LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { getImageUrl, getPlaceholderUrl } from '@/lib/image-utils';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BookOpen, Star, Heart, Calendar, Sparkles } from 'lucide-react';

export default function TodaysStoryPage() {
  return (
    <Suspense fallback={<PageLoader message="Loading today's magical story..." />}>
      <main className="flex-1 bg-background">

        {/* Hero Section */}
        <PageHero
          title="Today's Story"
          subtitle="Join us for daily adventures, learning moments, and heartwarming stories from our Montessori classroom"
          backgroundSvg={getPlaceholderUrl('community/community_story_hero_1.gif')}
          enableScrollTrigger={true}
        >
          <HeroCTAButtons variant="outlined" />
        </PageHero>

        {/* Video Section */}
        <section className="py-20 relative z-10 -mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="montessori-card p-6 md:p-12 bg-card text-card-foreground shadow-xl border-t-4 border-primary"
            >
              <div className="text-center mb-8 space-y-2">
                <h2 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
                  <Star className="w-8 h-8 text-accent" />
                  This Week&apos;s Adventure
                  <Star className="w-8 h-8 text-accent" />
                </h2>
                <p className="text-muted-foreground">Updated every Monday for ages 3-6</p>
              </div>

              <Suspense fallback={
                <div className="h-[400px] grid place-items-center bg-muted rounded-xl">
                  <LoadingSpinner size="lg" />
                </div>
              }>
                <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-sm">
                  <VideoPlayer videos={[
                    {
                      url: 'https://www.youtube.com/watch?v=Yz2NiUJHmhE',
                      title: 'The Good Samaritan',
                      description: 'A beautiful story about kindness, helping others, and being a good neighbor.',
                      thumbnail: getImageUrl('/images/video-thumb-1.jpg')
                    },
                    {
                      url: 'https://www.youtube.com/watch?v=hlQEmjWRa4A',
                      title: 'David and Goliath',
                      description: 'Discover how young David showed great courage and faith!',
                      thumbnail: getImageUrl('/images/video-thumb-2.jpg')
                    },
                    {
                      url: 'https://www.youtube.com/watch?v=tLxKjqG6iAg',
                      title: 'Noah\'s Ark',
                      description: 'Join Noah and all the animals on their amazing adventure!',
                      thumbnail: getImageUrl('/images/video-thumb-3.jpg')
                    }
                  ]} />
                </div>
              </Suspense>

              {/* Lesson Cards */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 text-center space-y-3">
                  <Heart className="w-10 h-10 mx-auto text-primary" />
                  <h3 className="font-bold text-lg text-foreground">Be Kind</h3>
                  <p className="text-sm text-muted-foreground">Help others with a big smile</p>
                </div>
                <div className="p-6 rounded-xl bg-secondary/5 border border-secondary/20 text-center space-y-3">
                  <Sparkles className="w-10 h-10 mx-auto text-secondary" />
                  <h3 className="font-bold text-lg text-foreground">Be Helpful</h3>
                  <p className="text-sm text-muted-foreground">Lend a helping hand to friends</p>
                </div>
                <div className="p-6 rounded-xl bg-accent/5 border border-accent/20 text-center space-y-3">
                  <Star className="w-10 h-10 mx-auto text-accent-foreground" />
                  <h3 className="font-bold text-lg text-foreground">Show Love</h3>
                  <p className="text-sm text-muted-foreground">Care for everyone around us</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story Calendar Preview - Simplified */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center w-full max-w-4xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Story Calendar</h2>
              <p className="text-muted-foreground text-lg">Every week brings a new amazing Bible adventure with important life lessons!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { week: 1, title: "The Good Samaritan", theme: "Kindness", color: "bg-primary" },
                { week: 2, title: "David and Goliath", theme: "Courage", color: "bg-secondary" },
                { week: 3, title: "Noah's Ark", theme: "Caring", color: "bg-accent" },
                { week: 4, title: "The Lost Sheep", theme: "Love", color: "bg-primary" },
              ].map((item) => (
                <div key={item.week} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all text-center group">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 bg-primary", item.color)}>
                    {item.week}
                  </div>
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.theme}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Join Our Magical Learning Adventure!</h2>
            <p className="text-xl opacity-90">Where Bible Stories Meet Montessori Magic. Your little one will grow in wisdom, kindness, and wonder every single day!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/contact" className="bg-background text-foreground px-8 py-4 rounded-lg font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-xl">
                Schedule a Visit
              </Link>
              <Link href="/programs" className="inline-flex items-center justify-center bg-primary-foreground/10 border-2 border-primary-foreground/30 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-foreground/20 transition-all min-h-[44px]">
                Explore Programs
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
