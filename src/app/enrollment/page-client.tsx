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
import { scaleInMagic, slideIn, staggerContainerMagic } from '@/lib/magicui-animations';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';
import { FAQSchema } from '@/components/seo/StructuredData';
import { usePathname } from 'next/navigation';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getBreadcrumbs, toBreadcrumbSchemaItems } from '@/lib/breadcrumbs';

/**
 * Enrollment page client component with steps and requirements.
 */
export function EnrollmentPageClient() {
  const { t, messages } = useLanguage();
  const pathname = usePathname();
  const translationFallback = t('common.translationFallback');
  const safeT = (key: string, defaultEn: string) => {
    const v = t(key);
    return v === translationFallback ? defaultEn : v;
  };
  const breadcrumbs = getBreadcrumbs(pathname);

  useLocalizedMetadata({
    title: t('seo.enrollment.title'),
    description: t('seo.enrollment.description'),
  });

  const steps = (messages.enrollmentPage?.steps ?? []) as Array<{
    title: string;
    description: string;
  }>;
  const requirements = (messages.enrollmentPage?.requirements?.items ?? []) as string[];

  const faqItems = [
    {
      question: safeT('enrollmentPage.faq.questions.ageRange', 'What ages do you accept?'),
      answer: safeT('enrollmentPage.faq.answers.ageRange', "We primarily accept children from 30 months to school age. Please contact us if you have specific age questions."),
    },
    {
      question: safeT('enrollmentPage.faq.questions.hours', 'What are your hours of operation?'),
      answer: safeT('enrollmentPage.faq.answers.hours', 'Our typical hours are Monday to Friday, 7:00am–6:00pm to support working families in the Tri-Cities area.'),
    },
    {
      question: safeT('enrollmentPage.faq.questions.waitlist', 'Is there a waitlist?'),
      answer: safeT('enrollmentPage.faq.answers.waitlist', 'Some programs and age groups may have a waitlist. We encourage families to contact us early to discuss availability and next steps.'),
    },
    {
      question: safeT('enrollmentPage.faq.questions.tours', 'How do I book a tour?'),
      answer: safeT('enrollmentPage.faq.answers.tours', 'You can book a tour by using our contact form, calling us directly, or requesting a visit through our enrollment page. We will confirm your time by phone or email.'),
    },
  ];

  return (
    <Suspense fallback={<LoadingSpinner message="Loading enrollment..." />}>
      <main className="flex-1">
        <FAQSchema questions={faqItems} />
        <BreadcrumbSchema items={toBreadcrumbSchemaItems(breadcrumbs)} />

        {/* Hero Section */}
        <PageHero
          title={safeT('enrollmentPage.hero.title', 'Montessori Enrollment in Coquitlam')}
          subtitle={safeT('enrollmentPage.hero.subtitle', 'Steps and requirements to enroll at Friendship Corner Daycare')}
          backgroundSvg={getImageUrl('/imgs/enrollment/enrollment_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={false}
          hideTitle={false}
          topContent={<Breadcrumbs items={breadcrumbs} />}
        >
          <HeroCTAButtons variant="default" />
        </PageHero>

        {/* Enrollment Process */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerMagic}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                {safeT('enrollmentPage.process.title', 'Enrollment Process')}
              </h2>
              <p className="text-xl text-muted-foreground w-full max-w-5xl mx-auto text-balance">
                {safeT('enrollmentPage.process.subtitle', "Follow these simple steps to begin your child's Montessori journey in Coquitlam.")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={scaleInMagic}
                  custom={index}
                >
                  <Card
                    variant="interactive"
                    className="h-full rounded-2xl border border-border/60 bg-card/95 p-6 shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:scale-105 duration-300"
                  >
                    <CardHeader className="p-0 mb-4 space-y-3">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center bg-muted text-foreground">
                        {index === 0 && <ClipboardDocumentListIcon className="h-6 w-6" />}
                        {index === 1 && <CalendarDaysIcon className="h-6 w-6" />}
                        {index === 2 && <DocumentCheckIcon className="h-6 w-6" />}
                        {index === 3 && <UserGroupIcon className="h-6 w-6" />}
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-muted-foreground leading-relaxed">
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
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                {safeT('enrollmentPage.requirements.title', 'Enrollment Requirements')}
              </h2>
              <p className="text-xl text-muted-foreground w-full max-w-5xl mx-auto text-balance">
                {safeT('enrollmentPage.requirements.subtitle', 'Please prepare the following documents for a smooth enrollment process.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {requirements.map((requirement, index) => (
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

        {/* Fees & Hours */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                {safeT('enrollmentPage.feesHours.title', 'Fees & Hours')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={slideUp} className="space-y-4 bg-muted/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-foreground">{safeT('enrollmentPage.feesHours.hours', 'Monday to Friday, 7:00 a.m. to 6:00 p.m.')}</h3>
                <p className="text-sm text-muted-foreground">{safeT('enrollmentPage.feesHours.closures', 'We are closed on all Statutory Holidays, weekends, and days when the managers choose to close due to unsafe conditions.')}</p>
              </motion.div>
              <motion.div variants={slideUp} className="space-y-4 bg-muted/30 p-6 rounded-xl">
                <p className="text-muted-foreground">{safeT('enrollmentPage.feesHours.subsidy', 'Affordable Child Care Benefits available for qualified families.')}</p>
                <p className="text-muted-foreground">{safeT('enrollmentPage.feesHours.registrationFee', 'A non-refundable registration fee applies.')}</p>
                <p className="text-muted-foreground">{safeT('enrollmentPage.feesHours.deposit', "A deposit fee secures your child's space.")}</p>
                <p className="text-muted-foreground">{safeT('enrollmentPage.feesHours.monthlyFees', 'Please inquire by email or phone regarding current monthly fees.')}</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Enrollment FAQ */}
        <motion.section
          className="py-20 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                {safeT('enrollmentPage.faq.title', 'Enrollment FAQ')}
              </h2>
              <p className="text-lg text-muted-foreground w-full max-w-5xl mx-auto text-balance">
                {safeT('enrollmentPage.faq.subtitle', 'Quick answers to the most common enrollment questions from families.')}
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqItems.map((item, idx) => (
                <AccordionItem
                  key={`${idx}-${item.question}`}
                  value={`item-${idx}`}
                  className="rounded-xl border border-border bg-card/80 px-5 shadow-sm data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="font-semibold text-foreground text-lg hover:no-underline hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
          <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground">
              {safeT('enrollmentPage.cta.title', 'Ready to Apply?')}
            </h2>
            <p className="text-xl text-primary-foreground/90 w-full max-w-5xl mx-auto text-balance">
              {safeT('enrollmentPage.cta.subtitle', 'Contact us to begin the enrollment process or schedule a tour of our Coquitlam Montessori daycare.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
              >
                {safeT('enrollmentPage.cta.primary', 'Contact Us')}
              </Link>
              <a
                href="tel:6049458504"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                {safeT('enrollmentPage.cta.secondary', 'Call 604.945.8504')}
              </a>
            </div>
          </div>
        </motion.section>
      </main>
    </Suspense>
  );
}
