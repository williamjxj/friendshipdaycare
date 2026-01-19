'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { textReveal, scaleInMagic } from '@/lib/magicui-animations';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * About page client component with interactive sections.
 */
export function AboutPageClient() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading about us..." />}>
      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          title="About Friendship Corner Daycare in Coquitlam"
          subtitle="Montessori daycare serving Tri-Cities families with nurturing care since 2008"
          backgroundSvg={getImageUrl('/imgs/about/about_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={true}
          hideTitle={true}
        >
          <HeroCTAButtons variant="outlined" />
        </PageHero>

        {/* Our Story */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="space-y-6" variants={slideUp}>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Friendship Corner Daycare (Montessori) opened its doors in January 2008 as a non-profit society dedicated to providing exceptional early childhood education in Coquitlam, BC.
                  </p>
                  <p>
                    As a Licensed Group Daycare, we serve children from 30 months to school age, creating a bridge between home and formal education through the proven Montessori method.
                  </p>
                  <p>
                    Our mission is to provide a safe, clean, nurturing, and stimulating environment designed to help children grow, explore, create, and have fun while developing independence and self-confidence.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/programs"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Explore Programs
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Schedule a Visit
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                variants={slideUp}
              >
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={getImageUrl('/images/school-outside.jpg')}
                    alt="Friendship Corner Daycare building"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                </div>

                {/* Floating stats card */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 border border-border"
                  variants={scaleInMagic}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">16+</div>
                    <div className="text-sm text-muted-foreground">Years of Excellence</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Mission & Values */}
        <motion.section
          className="py-20 bg-muted/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Our Mission & Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Creating a foundation for lifelong learning through Montessori principles and a loving community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Child-Centered Learning',
                  description: 'We follow each child&apos;s natural curiosity and developmental pace, fostering independence and confidence.',
                  icon: '🌱',
                  color: 'primary'
                },
                {
                  title: 'Safe & Nurturing',
                  description: 'Our licensed facility provides a secure, clean environment where children feel supported and valued.',
                  icon: '🛡️',
                  color: 'secondary'
                },
                {
                  title: 'Community Connection',
                  description: 'We build strong partnerships with families to support each child&apos;s growth and success.',
                  icon: '❤️',
                  color: 'accent'
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={textReveal}
                  custom={index}
                >
                  <Card variant="interactive" className="p-8 h-full">
                    <CardHeader className="p-0 mb-4">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4",
                        value.color === 'primary' ? 'bg-primary/10' :
                          value.color === 'secondary' ? 'bg-secondary/10' : 'bg-accent/10'
                      )}>
                        {value.icon}
                      </div>
                      <CardTitle className="text-xl font-bold">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Montessori Approach */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideUp} className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  The Montessori Difference
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Our Montessori approach encourages children to explore and learn through hands-on activities in a carefully prepared environment.
                  </p>
                  <p>
                    Children develop independence, concentration, and a love of learning through self-directed activities guided by trained educators.
                  </p>
                  <p>
                    This proven method supports cognitive, social, emotional, and physical development during the most important early years.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={slideUp} className="relative">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={getImageUrl('/images/montessori-classroom.jpg')}
                    alt="Montessori classroom activities"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
    </Suspense>
  );
}
