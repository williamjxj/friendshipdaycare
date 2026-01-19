'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import {
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Enrollment page client component with steps and requirements.
 */
export function EnrollmentPageClient() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading enrollment..." />}>
      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          title="Montessori Enrollment in Coquitlam"
          subtitle="Steps and requirements to enroll at Friendship Corner Daycare"
          backgroundSvg={getImageUrl('/imgs/enrollment/enrollment_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={true}
          hideTitle={true}
        >
          <HeroCTAButtons variant="default" />
        </PageHero>

        {/* Enrollment Process */}
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
                Enrollment Process
              </h2>
              <p className="text-xl text-muted-foreground w-full max-w-none">
                Follow these simple steps to begin your child&apos;s Montessori journey in Coquitlam.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Submit Application',
                  description: 'Complete our enrollment form with your child&apos;s details.',
                  icon: ClipboardDocumentListIcon,
                  color: 'primary'
                },
                {
                  title: 'Schedule a Tour',
                  description: 'Visit our daycare to meet our team and see our classrooms.',
                  icon: CalendarDaysIcon,
                  color: 'secondary'
                },
                {
                  title: 'Review & Approval',
                  description: 'We&apos;ll review your application and confirm availability.',
                  icon: DocumentCheckIcon,
                  color: 'accent'
                },
                {
                  title: 'Start Date',
                  description: 'Finalize paperwork and begin your child&apos;s first day.',
                  icon: UserGroupIcon,
                  color: 'primary'
                }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={slideUp}
                  custom={index}
                >
                  <Card variant="interactive" className="p-6 h-full">
                    <CardHeader className="p-0 mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                        step.color === 'primary' ? 'bg-primary/10 text-primary' :
                          step.color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                      )}>
                        <step.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg font-bold">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-muted-foreground">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Requirements */}
        <motion.section
          className="py-20 bg-muted/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Enrollment Requirements
              </h2>
              <p className="text-xl text-muted-foreground">
                Please prepare the following documents for a smooth enrollment process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                'Completed enrollment application',
                'Child&apos;s birth certificate or passport',
                'Immunization records',
                'Emergency contact information',
                'Medical and allergy information',
                'Monthly fee deposit'
              ].map((requirement, index) => (
                <motion.div
                  key={requirement}
                  className="flex items-start space-x-3 bg-card p-4 rounded-lg shadow-sm"
                  variants={slideUp}
                  custom={index}
                >
                  <CheckCircleIcon className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <p className="text-muted-foreground">{requirement}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="py-20 bg-primary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
              Ready to Apply?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Contact us to begin the enrollment process or schedule a tour of our Coquitlam Montessori daycare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="tel:6049458504"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Call 604.945.8504
              </a>
            </div>
          </div>
        </motion.section>
      </main>
    </Suspense>
  );
}
