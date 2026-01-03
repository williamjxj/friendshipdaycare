'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { getImageUrl, getPlaceholderUrl } from '@/lib/image-utils';
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function EnrollmentPage() {
  const steps = [
    {
      number: 1,
      title: 'Schedule a Visit',
      icon: CalendarDaysIcon,
      description: 'Book a tour to see our facility, meet our staff, and experience our Montessori environment firsthand.',
      actions: [
        'Choose a convenient date and time',
        'Virtual tour option available',
        'Meet our director and lead teachers',
        'Ask questions about our program'
      ],
      cta: {
        text: 'Schedule Tour',
        href: '/contact',
        primary: true
      }
    },
    {
      number: 2,
      title: 'Submit Application',
      icon: ClipboardDocumentListIcon,
      description: 'Complete our enrollment application with your child\'s information and family details.',
      actions: [
        'Fill out enrollment application form',
        'Provide child\'s health information',
        'Submit immunization records',
        'Pay $200 non-refundable registration fee'
      ],
      cta: {
        text: 'Download Application',
        href: '/documents/enrollment-application.pdf',
        primary: false
      },
      documents: [
        'Child\'s birth certificate (copy)',
        'Immunization records',
        'Emergency contact information',
        'Medical information & allergies'
      ]
    },
    {
      number: 3,
      title: 'Application Review',
      icon: DocumentCheckIcon,
      description: 'Our team will review your application and contact you within 3-5 business days.',
      actions: [
        'We verify all submitted information',
        'Check space availability for your preferred dates',
        'Review any special needs or accommodations',
        'Contact references if provided'
      ],
      timeline: '3-5 business days',
      note: 'If no spots are currently available, you\'ll be added to our waitlist with your priority position.'
    },
    {
      number: 4,
      title: 'Complete Registration',
      icon: UserGroupIcon,
      description: 'Once approved, finalize your enrollment with required paperwork and fees.',
      actions: [
        'Sign enrollment agreement',
        'Pay first month\'s tuition and supply fee',
        'Complete emergency authorization forms',
        'Provide authorized pickup list',
        'Review parent handbook'
      ],
      documents: [
        'Enrollment agreement',
        'Payment authorization form',
        'Emergency contact form',
        'Photo & media release form',
        'Parent handbook acknowledgment'
      ]
    },
    {
      number: 5,
      title: 'Start Date Preparation',
      icon: CheckCircleIcon,
      description: 'Get ready for your child\'s first day with orientation and preparation.',
      actions: [
        'Attend parent orientation session',
        'Meet your child\'s classroom teacher',
        'Receive supply list and daily schedule',
        'Plan gradual transition if needed',
        'Set up parent communication access'
      ],
      preparation: [
        'Label all personal items',
        'Pack appropriate clothing',
        'Prepare for saying goodbye',
        'Establish morning routine'
      ]
    }
  ];

  return (
    <Suspense fallback={<LoadingSpinner message="Loading enrollment information..." />}>
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <PageHero
          title="Enrollment Process"
          subtitle="Join our caring community in 5 simple steps. We make enrollment easy and transparent, so you can focus on what matters most—your child's learning journey."
          backgroundSvg={getImageUrl('/imgs/enrollment/enrollment_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={true}
          hideTitle={true}
        >
          <HeroCTAButtons variant="outlined" />
        </PageHero>

        {/* Quick Info Bar */}
        <section className="py-8 -mt-8 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card variant="data" className="p-8 border-none">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="pt-4 md:pt-0">
                  <div className="text-3xl font-bold text-primary mb-1">5 Steps</div>
                  <CardDescription className="font-bold">Simple Process</CardDescription>
                </div>
                <div className="pt-4 md:pt-0">
                  <div className="text-3xl font-bold text-primary mb-1">1-2 Weeks</div>
                  <CardDescription className="font-bold">Average Timeline</CardDescription>
                </div>
                <div className="pt-4 md:pt-0">
                  <div className="text-3xl font-bold text-primary mb-1">3-5 Days</div>
                  <CardDescription className="font-bold">Application Review</CardDescription>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-8 top-20 bottom-0 w-0.5 bg-border -mb-12"></div>
                  )}

                  <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="md:flex">
                      {/* Step Number & Icon */}
                      <div className="md:w-48 bg-gradient-to-br from-primary to-secondary p-8 text-white flex flex-col items-center justify-center text-center shrink-0">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                          <step.icon className="w-8 h-8" />
                        </div>
                        <div className="text-5xl font-bold mb-2">{step.number}</div>
                        <div className="text-sm font-bold uppercase tracking-widest">Step</div>
                      </div>

                      {/* Content */}
                      <CardContent className="flex-1 p-8">
                        <CardHeader className="p-0 mb-6">
                          <CardTitle className="text-2xl font-bold text-foreground mb-3">
                            {step.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground text-base leading-relaxed">
                            {step.description}
                          </CardDescription>
                        </CardHeader>

                        {/* Actions/Checklist */}
                        <div className="space-y-4">
                          <h3 className="font-bold text-foreground">What to do:</h3>
                          <ul className="space-y-2">
                            {step.actions.map((action, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircleIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-sm font-medium">{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Timeline */}
                        {step.timeline && (
                          <div className="mt-6 bg-muted/50 rounded-lg p-4">
                            <div className="flex items-center gap-2">
                              <CalendarDaysIcon className="w-5 h-5 text-primary" />
                              <span className="font-bold text-foreground">Timeline:</span>
                              <span className="text-muted-foreground text-sm font-medium">{step.timeline}</span>
                            </div>
                          </div>
                        )}

                        {/* Documents */}
                        {step.documents && (
                          <div className="mt-6">
                            <h4 className="font-bold text-foreground mb-3">Required Documents:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {step.documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                                  {doc}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Preparation */}
                        {step.preparation && (
                          <div className="mt-6">
                            <h4 className="font-bold text-foreground mb-3">How to Prepare:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {step.preparation.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></div>
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Note */}
                        {step.note && (
                          <div className="mt-6 bg-accent/10 border-l-4 border-accent rounded p-4">
                            <p className="text-sm text-muted-foreground">
                              <strong>Note:</strong> {step.note}
                            </p>
                          </div>
                        )}

                        {/* CTA */}
                        {step.cta && (
                          <div className="mt-8">
                            {step.cta.primary ? (
                              <Link
                                href={step.cta.href}
                                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg min-h-[44px]"
                              >
                                {step.cta.text}
                              </Link>
                            ) : (
                              <Link
                                href={step.cta.href}
                                className="inline-flex items-center justify-center border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/5 transition-all min-h-[44px]"
                              >
                                {step.cta.text}
                              </Link>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Important Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card variant="data" className="p-6">
                <CardTitle className="text-xl font-bold text-foreground mb-3">
                  Age Requirements
                </CardTitle>
                <CardContent className="p-0 space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We accept children from 30 months to school age (5-6 years).
                    Children must be potty-trained or actively working on potty training.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Toddler Program: 30 months - 3 years</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Preschool Program: 3 - 4 years</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> Pre-Kindergarten: 4 - 5 years</li>
                  </ul>
                </CardContent>
              </Card>

              <Card variant="data" className="p-6">
                <CardTitle className="text-xl font-bold text-foreground mb-3">
                  Start Dates
                </CardTitle>
                <CardContent className="p-0 space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We accept new enrollments year-round, subject to availability.
                    Most families prefer to start at the beginning of the month.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> September: Primary enrollment season</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> January: Second major intake</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> Year-round: Rolling admissions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card variant="data" className="p-6">
                <CardTitle className="text-xl font-bold text-foreground mb-3">
                  Waitlist Policy
                </CardTitle>
                <CardContent className="p-0 space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    If no spots are available, you&apos;ll be added to our waitlist at no charge.
                    Priority is given to siblings and by application date.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Free to join waitlist</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Sibling priority given</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> First-come, first-served otherwise</li>
                  </ul>
                </CardContent>
              </Card>

              <Card variant="data" className="p-6">
                <CardTitle className="text-xl font-bold text-foreground mb-3">
                  Gradual Transition
                </CardTitle>
                <CardContent className="p-0 space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We offer gradual transition options for children who need extra time
                    to adjust to their new environment.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Shorter days in first week</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Parent stay options available</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> Gradual separation support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Enrollment FAQs
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "How long does the enrollment process take?",
                  a: "From initial tour to start date typically takes 1-2 weeks if space is available. The application review process takes 3-5 business days. If you're on the waitlist, the timeline depends on when a spot opens up."
                },
                {
                  q: "Can I tour the facility before applying?",
                  a: "Absolutely! We highly encourage tours. It's the best way to see our Montessori environment, meet our staff, and ask questions. You can schedule an in-person tour or request a virtual tour if that's more convenient."
                },
                {
                  q: "What if my child has special needs?",
                  a: "We welcome children with diverse needs and work to provide appropriate accommodations. Please discuss your child's specific needs during the tour and application process so we can determine if we can provide the best environment for your child's success."
                },
                {
                  q: "Is the registration fee refundable?",
                  a: "The $200 registration fee is non-refundable as it secures your child's spot and covers administrative costs. However, if we cannot accommodate your child for any reason, the fee will be fully refunded."
                },
                {
                  q: "Can I change my child's schedule after enrolling?",
                  a: "Yes, schedule changes are possible subject to availability. We require at least 2 weeks notice for any schedule changes, and changes take effect at the beginning of the following month."
                }
              ].map((faq, idx) => (
                <Card key={idx} className="p-6">
                  <CardTitle className="text-lg font-bold text-foreground mb-2">
                    {faq.q}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed p-0">
                    {faq.a}
                  </CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Take the first step in your child's Montessori journey.
              Schedule a tour today and see why families love Friendship Corner Daycare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors inline-flex items-center justify-center min-h-[44px]"
              >
                Schedule a Tour
              </Link>
              <Link
                href="/pricing"
                className="bg-primary-foreground/10 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors inline-flex items-center justify-center min-h-[44px]"
              >
                View Tuition
              </Link>
            </div>
            <p className="mt-8 text-primary-foreground/80">
              Have questions? Call us at{' '}
              <a href="tel:604-945-8504" className="font-semibold hover:underline">
                604.945.8504
              </a>
            </p>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
