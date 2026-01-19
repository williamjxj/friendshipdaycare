'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { textReveal, textRevealItem } from '@/lib/magicui-animations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * Programs page client component with interactive sections.
 */
export function ProgramsPageClient() {
  const programs = [
    {
      id: 'toddler',
      title: 'Toddler Program',
      age: '30 months - 3 years',
      color: 'primary',
      icon: 'T',
      image: getImageUrl('/images/practical-life-shelf-1.jpg'),
      video: '/imgs/programs/toddler.mp4',
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
      video: '/imgs/programs/preschool.mp4',
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
      video: '/imgs/programs/pre-kindergarten.mp4',
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
          title="Montessori Programs in Coquitlam"
          subtitle="Toddler, preschool, and pre-kindergarten programs for Tri-Cities families"
          backgroundSvg={getImageUrl('/imgs/programs/programs_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={true}
          hideTitle={true}
        >
          <HeroCTAButtons variant="default" />
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
                Montessori Programs in Coquitlam
              </h2>
              <p className="text-xl text-muted-foreground w-full max-w-none">
                Our age-appropriate programs support each child&apos;s growth with hands-on Montessori learning in Coquitlam, BC.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  variants={textReveal}
                  custom={index}
                >
                  <Card variant="interactive" className="p-8 h-full">
                    <CardHeader className="p-0 mb-4">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold mb-4",
                        program.color === 'primary' ? 'bg-primary/10 text-primary' :
                          program.color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                      )}>
                        {program.icon}
                      </div>
                      <CardTitle className="text-xl font-bold">{program.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit">
                        {program.age}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {program.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Program Details */}
        {programs.map((program, index) => (
          <motion.section
            key={program.id}
            id={program.id}
            className={cn(
              "py-20",
              index % 2 === 0 ? "bg-muted/30" : "bg-card"
            )}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={slideUp} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                      {program.title}
                    </h2>
                    <p className="text-lg text-muted-foreground">{program.age}</p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {program.description}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={slideUp} className="relative">
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={program.image}
                      alt={`${program.title} classroom`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Daily Schedule */}
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
                A Day in Our Montessori Classroom
              </h2>
              <p className="text-xl text-muted-foreground w-full max-w-none">
                A structured yet flexible daily rhythm designed to support learning, play, and rest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  variants={textRevealItem}
                  custom={index}
                >
                  <Card className="p-6 h-full">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg font-bold">{program.title}</CardTitle>
                      <CardDescription>{program.age}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-3">
                      {program.dailySchedule.slice(0, 5).map((schedule, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <Calendar className="h-4 w-4 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{schedule.time}</p>
                            <p className="text-sm text-muted-foreground">{schedule.activity}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Enrollment CTA */}
        <motion.section
          className="py-20 bg-primary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
              Ready to Join Our Montessori Community?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Contact us today to schedule a tour or learn more about enrollment in Coquitlam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
              >
                Schedule a Tour
              </Link>
              <Link
                href="/enrollment"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Enrollment Details
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </Suspense>
  );
}
