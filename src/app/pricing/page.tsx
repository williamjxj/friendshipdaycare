'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function PricingPage() {
  const t = useTranslations();

  const programs = [
    {
      key: 'toddler',
      age: '30 months - 3 years',
      fullTime: '$1,200',
      partTime3: '$850',
      partTime2: '$600',
      features: [
        'Gentle introduction to structured learning',
        'Independence and social skills focus',
        'Practical life activities',
        'Sensory exploration',
        'Small group ratios',
        'Nutritious snacks included'
      ]
    },
    {
      key: 'preschool',
      age: '3 - 4 years',
      fullTime: '$1,150',
      partTime3: '$800',
      partTime2: '$575',
      features: [
        'Montessori-based curriculum',
        'Hands-on learning materials',
        'Creative arts and music',
        'Language development',
        'Math and science exploration',
        'Nutritious snacks included'
      ]
    },
    {
      key: 'prekindergarten',
      age: '4 - 5 years',
      fullTime: '$1,150',
      partTime3: '$800',
      partTime2: '$575',
      features: [
        'School readiness preparation',
        'Advanced Montessori materials',
        'Reading and writing readiness',
        'Math concepts introduction',
        'Social-emotional development',
        'Nutritious snacks included'
      ]
    }
  ];

  return (
    <Suspense fallback={<LoadingSpinner message="Loading pricing..." />}>
      <main id="main-content" className="flex-1">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                    Tuition & Pricing
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Transparent, affordable rates for quality Montessori education. 
                    We believe every family deserves access to excellent early childhood care.
                  </p>
                </div>
              </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 bg-muted/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {programs.map((program) => (
                    <div
                      key={program.key}
                      className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-br from-primary to-secondary p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">
                          {t(`programs.${program.key}.title`)}
                        </h2>
                        <p className="text-white/90 font-medium">{program.age}</p>
                      </div>

                      {/* Pricing */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-baseline justify-between">
                            <span className="text-muted-foreground font-medium">Full-Time</span>
                            <div className="text-right">
                              <span className="text-3xl font-bold text-foreground">{program.fullTime}</span>
                              <span className="text-muted-foreground">/month</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            5 days/week • 7:30 AM - 5:30 PM
                          </p>
                        </div>

                        <div className="border-t border-border pt-4 space-y-3">
                          <div className="flex items-baseline justify-between">
                            <span className="text-muted-foreground font-medium">Part-Time (3 days)</span>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-foreground">{program.partTime3}</span>
                              <span className="text-muted-foreground">/month</span>
                            </div>
                          </div>
                          
                          <div className="flex items-baseline justify-between">
                            <span className="text-muted-foreground font-medium">Part-Time (2 days)</span>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-foreground">{program.partTime2}</span>
                              <span className="text-muted-foreground">/month</span>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="border-t border-border pt-6">
                          <h3 className="font-semibold text-foreground mb-4">What's Included:</h3>
                          <ul className="space-y-2">
                            {program.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                          <Link
                            href="/contact"
                            className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Additional Information */}
            <section className="py-20 bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Registration Fees */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Registration & Fees</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Registration Fee (one-time)</span>
                        <span className="font-semibold text-foreground">$200</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Supply Fee (annual)</span>
                        <span className="font-semibold text-foreground">$100</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Field Trip Fee (optional)</span>
                        <span className="font-semibold text-foreground">$50-$100/year</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Registration fee is non-refundable and secures your child's spot. 
                      Supply fee covers materials, crafts, and learning resources for the year.
                    </p>
                  </div>

                  {/* Government Subsidy */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Government Subsidy</h2>
                    <p className="text-muted-foreground">
                      We accept the BC Childcare Fee Reduction Initiative (CCFRI) and 
                      Affordable Child Care Benefit (ACCB) subsidies.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <h3 className="font-semibold text-foreground">Eligible families may receive:</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Up to $550/month in fee reduction</li>
                        <li>• Additional support based on family income</li>
                        <li>• Direct payment to the daycare</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>How to apply:</strong> Visit{' '}
                      <a 
                        href="https://www2.gov.bc.ca/gov/content/family-social-supports/caring-for-young-children/child-care-funding" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        gov.bc.ca
                      </a>
                      {' '}or contact us for assistance with your application.
                    </p>
                  </div>

                  {/* Payment Options */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Payment Options</h2>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Monthly automatic bank withdrawal (preferred)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Pre-authorized credit card payments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Post-dated cheques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>E-transfer accepted</span>
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      Tuition is due on the 1st of each month. Late payment fee of $25 applies after the 5th.
                    </p>
                  </div>

                  {/* Discounts */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Sibling Discount</h2>
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="text-lg font-semibold text-foreground mb-2">
                        10% off for second child
                      </p>
                      <p className="text-muted-foreground text-sm">
                        When you enroll two or more children simultaneously, receive 10% off 
                        the tuition for the second child. Additional siblings receive the same discount.
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      <strong>Note:</strong> Sibling discount cannot be combined with government subsidies. 
                      We will apply whichever benefit provides greater savings for your family.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-muted/30">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      What is included in the monthly tuition?
                    </h3>
                    <p className="text-muted-foreground">
                      Monthly tuition includes all Montessori materials and learning resources, 
                      nutritious morning and afternoon snacks, outdoor play time, art supplies, 
                      and regular communication with families through our daily reports.
                    </p>
                  </div>

                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Do I need to pay for months my child is absent?
                    </h3>
                    <p className="text-muted-foreground">
                      Yes, tuition is required for all enrolled months to hold your child's spot, 
                      regardless of absences due to vacation, illness, or holidays. This ensures 
                      we maintain appropriate staffing ratios and can keep your child's place secured.
                    </p>
                  </div>

                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Is there a waitlist deposit?
                    </h3>
                    <p className="text-muted-foreground">
                      No, there is no fee to join our waitlist. However, once a spot becomes available 
                      and you accept, the $200 registration fee is due within 48 hours to secure your 
                      child's enrollment.
                    </p>
                  </div>

                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      What is your refund policy?
                    </h3>
                    <p className="text-muted-foreground">
                      We require 30 days written notice for withdrawal. Registration fees are 
                      non-refundable. Tuition paid for the notice period is non-refundable, but 
                      your child may continue to attend during this time.
                    </p>
                  </div>

                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Can I switch from part-time to full-time?
                    </h3>
                    <p className="text-muted-foreground">
                      Yes! Schedule changes are subject to availability. Please provide at least 
                      2 weeks notice for any schedule changes. We'll do our best to accommodate 
                      your family's needs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Join Our Community?
                </h2>
                <p className="text-xl mb-8 text-primary-foreground/90">
                  Schedule a tour to see our facility and meet our caring staff. 
                  We'd love to show you why families choose Friendship Corner Daycare.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-block"
                  >
                    Schedule a Tour
                  </Link>
                  <Link
                    href="/enrollment"
                    className="bg-primary-foreground/10 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors inline-block"
                  >
                    Apply Now
                  </Link>
                </div>
                <p className="mt-8 text-primary-foreground/80">
                  Questions about tuition? Call us at{' '}
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
