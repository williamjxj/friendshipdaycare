'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { getImageUrl, getPlaceholderUrl } from '@/lib/image-utils';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { textReveal, textRevealItem, borderBeam, scaleInMagic } from '@/lib/magicui-animations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProgramsPage() {
  const programs = [
    {
      id: 'toddler',
      title: 'Toddler Program',
      age: '30 months - 3 years',
      color: 'primary',
      icon: 'T',
      image: getImageUrl('/images/practical-life-shelf-1.jpg'),
      description: 'Our toddler program provides a gentle introduction to structured learning with a focus on independence and social skills development.',
      features: [
        'Social Skills Development',
        'Independence Building',
        'Sensory Exploration',
        'Language Development',
        'Fine Motor Skills',
        'Emotional Regulation'
      ],
      dailySchedule: [
        { time: '6:30 - 8:00', activity: 'Arrival & Free Play' },
        { time: '8:00 - 8:30', activity: 'Morning Snack' },
        { time: '8:30 - 10:00', activity: 'Montessori Work Time' },
        { time: '10:00 - 11:00', activity: 'Outdoor Play' },
        { time: '11:00 - 12:00', activity: 'Lunch' },
        { time: '12:00 - 2:30', activity: 'Rest Time' },
        { time: '2:30 - 3:00', activity: 'Afternoon Snack' },
        { time: '3:00 - 5:00', activity: 'Activities & Play' },
        { time: '5:00 - 6:30', activity: 'Departure' }
      ]
    },
    {
      id: 'preschool',
      title: 'Preschool Program',
      age: '3 - 4 years',
      color: 'secondary',
      icon: 'P',
      image: getImageUrl('/images/sensorial-shelf.jpg'),
      description: 'Our preschool program uses Montessori-based curriculum emphasizing hands-on learning and creative expression.',
      features: [
        'Creative Expression',
        'Hands-on Learning',
        'Pre-Math Concepts',
        'Pre-Reading Skills',
        'Science Exploration',
        'Cultural Studies'
      ],
      dailySchedule: [
        { time: '6:30 - 8:00', activity: 'Arrival & Free Choice' },
        { time: '8:00 - 8:30', activity: 'Morning Circle' },
        { time: '8:30 - 10:30', activity: 'Montessori Work Cycle' },
        { time: '10:30 - 11:30', activity: 'Outdoor Exploration' },
        { time: '11:30 - 12:30', activity: 'Lunch & Social Time' },
        { time: '12:30 - 2:30', activity: 'Quiet Time/Rest' },
        { time: '2:30 - 3:00', activity: 'Afternoon Snack' },
        { time: '3:00 - 5:30', activity: 'Art & Activities' },
        { time: '5:30 - 6:30', activity: 'Departure' }
      ]
    },
    {
      id: 'prekindergarten',
      title: 'Pre-Kindergarten',
      age: '4 - 5 years',
      color: 'accent',
      icon: 'K',
      image: getImageUrl('/images/language-shelf.jpg'),
      description: 'Our pre-kindergarten program focuses on school readiness preparation with advanced Montessori materials and concepts.',
      features: [
        'School Readiness',
        'Advanced Concepts',
        'Reading & Writing',
        'Mathematics',
        'Critical Thinking',
        'Leadership Skills'
      ],
      dailySchedule: [
        { time: '6:30 - 8:00', activity: 'Arrival & Morning Work' },
        { time: '8:00 - 8:30', activity: 'Morning Meeting' },
        { time: '8:30 - 11:00', activity: 'Extended Work Period' },
        { time: '11:00 - 12:00', activity: 'Outdoor Learning' },
        { time: '12:00 - 1:00', activity: 'Lunch & Community' },
        { time: '1:00 - 2:30', activity: 'Rest/Quiet Activities' },
        { time: '2:30 - 3:00', activity: 'Afternoon Snack' },
        { time: '3:00 - 6:00', activity: 'Project Time & Play' },
        { time: '6:00 - 6:30', activity: 'Departure' }
      ]
    }
  ];

  return (
    <Suspense fallback={<LoadingSpinner message="Loading programs..." />}>
      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          title="Our Programs"
          subtitle="Age-appropriate Montessori education designed to nurture each child's natural development"
          backgroundSvg={getImageUrl('/imgs/programs/programs_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={true}
          hideTitle={true}
        >
          <HeroCTAButtons variant="outlined" />
        </PageHero>

        {/* Programs Overview */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Comprehensive Early Learning
              </h2>
              <p className="text-lg text-muted-foreground w-full text-center">
                Our programs follow the Montessori philosophy, providing children with the freedom to learn at their own pace in a prepared environment
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {programs.map((program) => (
                <motion.div
                  key={program.id}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
                  variants={scaleInMagic}
                >
                  <Card variant="outlined" hover className="p-0 overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="space-y-4">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 bg-${program.color}/20 rounded-lg flex items-center justify-center`}>
                            <span className={`text-${program.color} font-bold text-xl`}>
                              {program.icon}
                            </span>
                          </div>
                          <div>
                            <CardTitle>{program.title}</CardTitle>
                            <Badge variant={program.color as 'primary' | 'secondary' | 'accent'} size="sm" className="mt-1">
                              {program.age}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <p className="text-muted-foreground leading-relaxed">
                        {program.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {program.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className={`w-4 h-4 bg-${program.color}/20 rounded-full flex items-center justify-center`}>
                              <span className={`text-${program.color} text-xs`}>✓</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    {/* MagicUI Border Beam Effect */}
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Detailed Program Information */}
        {programs.map((program, index) => (
          <section key={program.id} className={`py-20 ${index % 2 === 0 ? 'bg-muted/30' : 'bg-card'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-16 h-16 bg-${program.color}/20 rounded-lg flex items-center justify-center`}>
                        <span className={`text-${program.color} font-bold text-2xl`}>
                          {program.icon}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-3xl font-display font-bold text-foreground">
                          {program.title}
                        </h2>
                        <p className={`text-lg text-${program.color} font-semibold`}>
                          {program.age}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Key Learning Areas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {program.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <div className={`w-6 h-6 bg-${program.color}/20 rounded-full flex items-center justify-center`}>
                            <span className={`text-${program.color} font-bold text-sm`}>✓</span>
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="bg-card rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Daily Schedule</h3>
                    <div className="space-y-3">
                      {program.dailySchedule.map((item, scheduleIndex) => (
                        <div key={scheduleIndex} className="flex items-center space-x-4">
                          <div className={`w-20 text-sm font-medium text-${program.color} flex-shrink-0`}>
                            {item.time}
                          </div>
                          <div className="flex-1 text-sm text-muted-foreground">
                            {item.activity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Call to Action */}
        <section className="py-20 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
                Ready to Enroll Your Child?
              </h2>
              <p className="text-xl text-primary-foreground/90 w-full text-center">
                Contact us today to schedule a visit and learn more about how our programs can benefit your child&apos;s development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-primary-foreground text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground/90 transition-colors"
                >
                  Schedule a Visit
                </Link>
                <a
                  href="tel:6049458504"
                  className="inline-block border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground hover:text-primary transition-colors"
                >
                  Call 604.945.8504
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
