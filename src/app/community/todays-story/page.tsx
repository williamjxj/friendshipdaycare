'use client';

import { Suspense } from 'react';
import { PageLoader, LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { getImageUrl, getPlaceholderUrl } from '@/lib/image-utils';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BookOpen, Star, Heart, Calendar, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function TodaysStoryPage() {
  return (
    <Suspense fallback={<PageLoader message="Loading today's magical story..." />}>
      <main className="flex-1 bg-background">

        {/* Hero Section */}
        <PageHero
          title="Today's Story"
          subtitle="Join us for daily adventures, learning moments, and heartwarming stories from our Montessori classroom"
          backgroundSvg={getImageUrl('/imgs/community/community_story_1.gif')}
          enableScrollTrigger={true}
          hideTitle={true}
          hideSubtitle={true}
        />

        {/* Video Section */}
        <section className="py-20 relative z-10 -mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card
              variant="elevated"
              className="p-6 md:p-12 border-t-4 border-t-primary rounded-[var(--radius-lg)]"
            >
              <CardHeader className="p-0 text-center mb-8 space-y-2">
                <CardTitle className="text-3xl font-display font-bold text-foreground flex items-center justify-center gap-3">
                  <Star className="w-8 h-8 text-accent shrink-0" />
                  This Week&apos;s Adventure
                  <Star className="w-8 h-8 text-accent shrink-0" />
                </CardTitle>
                <CardDescription className="text-muted-foreground">Updated every Monday for ages 3-6</CardDescription>
              </CardHeader>

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

              {/* Lesson Cards using 'data' variant */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="data" className="p-6 text-center space-y-3 bg-primary/5 hover:bg-primary/10 border-primary/20 transition-colors">
                  <Heart className="w-10 h-10 mx-auto text-primary transition-transform duration-500 group-hover:scale-[1.2]" />
                  <CardTitle className="font-bold text-lg text-foreground">Be Kind</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground p-0">Help others with a big smile</CardDescription>
                </Card>
                <Card variant="data" className="p-6 text-center space-y-3 bg-secondary/5 hover:bg-secondary/10 border-secondary/20 transition-colors">
                  <Sparkles className="w-10 h-10 mx-auto text-secondary transition-transform duration-500 group-hover:scale-[1.2]" />
                  <CardTitle className="font-bold text-lg text-foreground">Be Helpful</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground p-0">Lend a helping hand to friends</CardDescription>
                </Card>
                <Card variant="data" className="p-6 text-center space-y-3 bg-accent/5 hover:bg-accent/10 border-accent/20 transition-colors">
                  <Star className="w-10 h-10 mx-auto text-accent-foreground transition-transform duration-500 group-hover:scale-[1.2]" />
                  <CardTitle className="font-bold text-lg text-foreground">Show Love</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground p-0">Care for everyone around us</CardDescription>
                </Card>
              </div>
            </Card>
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
                { week: 1, title: "The Good Samaritan", theme: "Kindness", color: "primary" },
                { week: 2, title: "David and Goliath", theme: "Courage", color: "secondary" },
                { week: 3, title: "Noah's Ark", theme: "Caring", color: "accent" },
                { week: 4, title: "The Lost Sheep", theme: "Love", color: "primary" },
              ].map((item) => (
                <Card key={item.week} className="text-center group p-6">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 transition-transform duration-500 group-hover:scale-[1.2]",
                    item.color === 'primary' ? 'bg-primary' :
                      item.color === 'secondary' ? 'bg-secondary' : 'bg-accent')}>
                    {item.week}
                  </div>
                  <CardTitle className="font-bold text-foreground mb-1 text-lg">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground p-0">
                    {item.theme}
                  </CardDescription>
                </Card>
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
