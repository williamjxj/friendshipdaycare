'use client';

import { Suspense } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipNavigation } from '@/components/ui/SkipNavigation';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import { 
  ClipboardDocumentListIcon, 
  CalendarDaysIcon, 
  DocumentCheckIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

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
    <ThemeProvider>
      <Suspense fallback={<LoadingSpinner message="Loading enrollment information..." />}>
        <div className="min-h-screen flex flex-col">
          <SkipNavigation />
          <Header />

          <main id="main-content" className="flex-1">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                    Enrollment Process
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Join our caring community in 5 simple steps. We make enrollment easy and transparent, 
                    so you can focus on what matters most—your child's learning journey.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Info Bar */}
            <section className="py-8 bg-card border-b border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">5 Steps</div>
                    <div className="text-muted-foreground">Simple Process</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">1-2 Weeks</div>
                    <div className="text-muted-foreground">Average Timeline</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">3-5 Days</div>
                    <div className="text-muted-foreground">Application Review</div>
                  </div>
                </div>
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
                      
                      <div className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="md:flex">
                          {/* Step Number & Icon */}
                          <div className="md:w-48 bg-gradient-to-br from-primary to-secondary p-8 text-white flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                              <step.icon className="w-8 h-8" />
                            </div>
                            <div className="text-5xl font-bold mb-2">{step.number}</div>
                            <div className="text-sm font-medium">STEP</div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-3">
                              {step.title}
                            </h2>
                            <p className="text-muted-foreground mb-6">
                              {step.description}
                            </p>

                            {/* Actions/Checklist */}
                            <div className="space-y-4">
                              <h3 className="font-semibold text-foreground">What to do:</h3>
                              <ul className="space-y-2">
                                {step.actions.map((action, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <CheckCircleIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{action}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Timeline */}
                            {step.timeline && (
                              <div className="mt-6 bg-muted/50 rounded-lg p-4">
                                <div className="flex items-center gap-2">
                                  <CalendarDaysIcon className="w-5 h-5 text-primary" />
                                  <span className="font-semibold text-foreground">Timeline:</span>
                                  <span className="text-muted-foreground">{step.timeline}</span>
                                </div>
                              </div>
                            )}

                            {/* Documents */}
                            {step.documents && (
                              <div className="mt-6">
                                <h4 className="font-semibold text-foreground mb-3">Required Documents:</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {step.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                      {doc}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Preparation */}
                            {step.preparation && (
                              <div className="mt-6">
                                <h4 className="font-semibold text-foreground mb-3">How to Prepare:</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {step.preparation.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
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
                              <div className="mt-6">
                                {step.cta.primary ? (
                                  <Link
                                    href={step.cta.href}
                                    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                                  >
                                    {step.cta.text}
                                  </Link>
                                ) : (
                                  <Link
                                    href={step.cta.href}
                                    className="inline-block border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                                  >
                                    {step.cta.text}
                                  </Link>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
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
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Age Requirements
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We accept children from 30 months to school age (5-6 years). 
                      Children must be potty-trained or actively working on potty training.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Toddler Program: 30 months - 3 years</li>
                      <li>• Preschool Program: 3 - 4 years</li>
                      <li>• Pre-Kindergarten: 4 - 5 years</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Start Dates
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We accept new enrollments year-round, subject to availability. 
                      Most families prefer to start at the beginning of the month.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• September: Primary enrollment season</li>
                      <li>• January: Second major intake</li>
                      <li>• Year-round: Rolling admissions</li>
                      <li>• Flexible start dates available</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Waitlist Policy
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      If no spots are available, you'll be added to our waitlist at no charge. 
                      Priority is given to siblings and by application date.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Free to join waitlist</li>
                      <li>• Sibling priority given</li>
                      <li>• First-come, first-served otherwise</li>
                      <li>• 48-hour response required when spot opens</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Gradual Transition
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We offer gradual transition options for children who need extra time 
                      to adjust to their new environment.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Shorter days in first week</li>
                      <li>• Parent stay options available</li>
                      <li>• Gradual separation support</li>
                      <li>• Communication with family throughout</li>
                    </ul>
                  </div>
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
                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      How long does the enrollment process take?
                    </h3>
                    <p className="text-muted-foreground">
                      From initial tour to start date typically takes 1-2 weeks if space is available. 
                      The application review process takes 3-5 business days. If you're on the waitlist, 
                      the timeline depends on when a spot opens up.
                    </p>
                  </div>

                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Can I tour the facility before applying?
                    </h3>
                    <p className="text-muted-foreground">
                      Absolutely! We highly encourage tours. It's the best way to see our Montessori 
                      environment, meet our staff, and ask questions. You can schedule an in-person 
                      tour or request a virtual tour if that's more convenient.
                    </p>
                  </div>

                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      What if my child has special needs?
                    </h3>
                    <p className="text-muted-foreground">
                      We welcome children with diverse needs and work to provide appropriate 
                      accommodations. Please discuss your child's specific needs during the tour 
                      and application process so we can determine if we can provide the best 
                      environment for your child's success.
                    </p>
                  </div>

                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Is the registration fee refundable?
                    </h3>
                    <p className="text-muted-foreground">
                      The $200 registration fee is non-refundable as it secures your child's spot 
                      and covers administrative costs. However, if we cannot accommodate your child 
                      for any reason, the fee will be fully refunded.
                    </p>
                  </div>

                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Can I change my child's schedule after enrolling?
                    </h3>
                    <p className="text-muted-foreground">
                      Yes, schedule changes are possible subject to availability. We require at least 
                      2 weeks notice for any schedule changes, and changes take effect at the beginning 
                      of the following month.
                    </p>
                  </div>
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
                    className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-block"
                  >
                    Schedule a Tour
                  </Link>
                  <Link
                    href="/pricing"
                    className="bg-primary-foreground/10 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors inline-block"
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

          <Footer />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}
