'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { getImageUrl, getPlaceholderUrl } from '@/lib/image-utils';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { textReveal, textRevealItem, borderBeam, scaleInMagic } from '@/lib/magicui-animations';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading about us..." />}>
      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          title="About Our Daycare"
          subtitle="Discover our commitment to Montessori excellence and nurturing young minds since 2008"
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
                    Our journey began with a simple vision: to create a place where children could grow, explore, and discover their potential in a safe, nurturing environment that feels like a second home.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 h-96 flex items-center justify-center"
                variants={slideUp}
              >
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-primary-foreground font-bold text-3xl">2008</span>
                  </div>
                  <p className="text-foreground font-semibold text-lg">Established</p>
                  <p className="text-muted-foreground">16+ Years of Excellence</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Montessori Philosophy */}
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
                The Montessori Philosophy
              </h2>
              <p className="text-lg text-muted-foreground w-full text-center">
                Our approach is rooted in Dr. Maria Montessori&apos;s educational philosophy, emphasizing respect for the child&apos;s natural development
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: '🧠', title: 'Child-Centered', desc: "Learning follows the child's natural interests and developmental pace", color: 'primary' },
                { icon: '🤲', title: 'Hands-On Learning', desc: 'Specially designed materials encourage exploration and discovery', color: 'secondary' },
                { icon: '🌱', title: 'Independence', desc: 'Children develop confidence through self-directed activities', color: 'accent' },
                { icon: '🤝', title: 'Mixed Ages', desc: 'Multi-age classrooms foster peer learning and mentorship', color: 'primary' },
              ].map((item, idx) => (
                <motion.div key={idx} variants={scaleInMagic} className="group">
                  <Card variant="interactive" className="h-full text-center space-y-4 relative overflow-hidden p-6">
                    {/* MagicUI Grid Pattern Background */}
                    <div className="absolute inset-0 magic-grid opacity-20 z-0" />
                    <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto relative z-10 transition-transform group-hover:scale-110",
                      item.color === 'primary' ? 'bg-primary/20' :
                        item.color === 'secondary' ? 'bg-secondary/20' : 'bg-accent/20')}>
                      <span className={cn("font-bold text-2xl",
                        item.color === 'primary' ? 'text-primary' :
                          item.color === 'secondary' ? 'text-secondary' : 'text-accent')}>
                        {item.icon}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground relative z-10">{item.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground relative z-10">
                      {item.desc}
                    </CardDescription>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Our Mission & Values */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-6">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We offer a safe, clean, nurturing, and stimulating environment designed to help children grow, explore, create, and have fun. Our developmentally appropriate curriculum provides many opportunities for self-expression and interaction, fostering both individual growth and social development.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Our Values</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <span className="text-primary font-bold text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Respect</h4>
                        <p className="text-sm text-muted-foreground">For each child&apos;s unique personality and learning style</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center mt-1">
                        <span className="text-secondary font-bold text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Safety</h4>
                        <p className="text-sm text-muted-foreground">Physical and emotional security in all activities</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-1">
                        <span className="text-accent font-bold text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Excellence</h4>
                        <p className="text-sm text-muted-foreground">Continuous improvement in our programs and facilities</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <span className="text-primary font-bold text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Community</h4>
                        <p className="text-sm text-muted-foreground">Building strong relationships with families</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <Card variant="data" className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 border-none">
                  <CardTitle className="text-2xl font-bold text-foreground mb-6">Why Choose Us?</CardTitle>
                  <div className="space-y-4">
                    {[
                      { icon: '16+', label: 'Years of Experience', color: 'primary' },
                      { icon: '✓', label: 'Licensed & Insured', color: 'secondary' },
                      { icon: 'M', label: 'Certified Montessori Educators', color: 'accent' },
                      { icon: '♥', label: 'Low Student-Teacher Ratio', color: 'primary' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shadow-sm",
                          item.color === 'primary' ? 'bg-primary text-primary-foreground' :
                            item.color === 'secondary' ? 'bg-secondary text-secondary-foreground' : 'bg-accent text-accent-foreground')}>
                          <span className="font-bold text-sm">{item.icon}</span>
                        </div>
                        <span className="text-foreground font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="text-center">
                  <Link
                    href="/programs"
                    className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors min-h-[44px]"
                  >
                    Explore Our Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </Suspense>
  );
}
