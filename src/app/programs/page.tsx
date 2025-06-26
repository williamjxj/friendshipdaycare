'use client';

import { Suspense } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SkipNavigation } from '@/components/ui/SkipNavigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ProgramsPage() {
  const programs = [
    {
      id: 'toddler',
      title: 'Toddler Program',
      age: '30 months - 3 years',
      color: 'primary',
      icon: 'T',
      image: '/images/practical-life-shelf-1.jpg',
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
      image: '/images/sensorial-shelf.jpg',
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
      image: '/images/language-shelf.jpg',
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
    <ThemeProvider>
      <Suspense fallback={<LoadingSpinner message="Loading programs..." />}>
        <div className="min-h-screen flex flex-col">
          <SkipNavigation />
          <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                  Our Programs
                </h1>
                <p className="text-xl text-muted-foreground w-full text-center leading-relaxed">
                  Age-appropriate Montessori education designed to nurture each child&apos;s natural development
                </p>
              </div>
            </div>
          </section>

          {/* Programs Overview */}
          <section className="py-20 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Comprehensive Early Learning
                </h2>
                <p className="text-lg text-muted-foreground w-full text-center">
                  Our programs follow the Montessori philosophy, providing children with the freedom to learn at their own pace in a prepared environment
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {programs.map((program) => (
                  <div key={program.id} className="bg-muted/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-${program.color}/20 rounded-lg flex items-center justify-center`}>
                          <span className={`text-${program.color} font-bold text-xl`}>
                            {program.icon}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {program.title}
                          </h3>
                          <p className={`text-sm text-${program.color} font-medium`}>
                            {program.age}
                          </p>
                        </div>
                      </div>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

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

        <Footer />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}
