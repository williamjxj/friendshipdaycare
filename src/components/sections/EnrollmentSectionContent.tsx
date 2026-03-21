'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  CheckCircleIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { ProcessStepConnector } from '@/components/ui/process-step-connector';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
import { fadeIn } from '@/lib/animations';
import { staggerContainerMagic } from '@/lib/magicui-animations';
import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Enrollment section for single-page app: steps, requirements, accordion, CTA.
 */
export function EnrollmentSectionContent() {
  const { t, messages } = useLanguage();
  const requirementsRef = useRef<HTMLDivElement>(null);
  const feesHoursRef = useRef<HTMLDivElement>(null);
  const translationFallback = t('common.translationFallback');
  const safeT = (key: string, defaultEn: string) => {
    const v = t(key);
    return v === translationFallback ? defaultEn : v;
  };
  const steps = (messages.enrollmentPage?.steps ?? []) as Array<{
    title: string;
    description: string;
  }>;
  const requirements = (messages.enrollmentPage?.requirements?.items ?? []) as string[];

  useGSAP(
    () => {
      if (!requirementsRef.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(requirementsRef.current.querySelectorAll('.requirement-card'));
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: requirementsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: requirementsRef, dependencies: [requirements] }
  );

  useGSAP(
    () => {
      if (!feesHoursRef.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(feesHoursRef.current.querySelectorAll('.fee-hour-card'));
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: feesHoursRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: feesHoursRef, dependencies: [] }
  );

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

  const EnrollmentGridBackground = () => (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
    </>
  );

  return (
    <>
      {/* Enrollment Process - animated steps with connecting lines */}
      <motion.section
        id="enrollment"
        className="py-20 bg-card overflow-x-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerMagic}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-foreground px-2">
              {safeT('enrollmentPage.process.title', 'Enrollment Process')}
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground w-full max-w-5xl mx-auto text-balance px-2">
              {safeT('enrollmentPage.process.subtitle', "Follow these simple steps to begin your child's Montessori journey in Coquitlam.")}
            </p>
          </div>

          {/* Desktop: horizontal flow with connectors */}
          <div className="hidden lg:flex items-stretch justify-between gap-0">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-stretch flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 min-w-0"
                >
                  <Card
                    variant="interactive"
                    className="h-full w-full min-w-0 rounded-xl p-5 sm:p-6 group hover:shadow-lg hover:border-primary/20 transition-all duration-300 border-2 border-border overflow-visible"
                  >
                    <CardHeader className="p-0 mb-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-br from-primary/20 to-primary/10 text-primary shrink-0 group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ rotate: 5 }}
                        >
                          {index === 0 && <ClipboardDocumentListIcon className="h-6 w-6" />}
                          {index === 1 && <CalendarDaysIcon className="h-6 w-6" />}
                          {index === 2 && <DocumentCheckIcon className="h-6 w-6" />}
                          {index === 3 && <UserGroupIcon className="h-6 w-6" />}
                        </motion.div>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    </CardHeader>
                    <CardContent className="p-0 min-w-0">
                      <CardDescription className="text-muted-foreground leading-relaxed wrap-break-word">
                        {step.description}
                        {index === 0 && (
                          <span className="block mt-3">
                            <a
                              href="/assets/Registration form 2026.pdf"
                              download
                              className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-semibold underline underline-offset-2 transition-colors wrap-break-word min-w-0"
                            >
                              <DocumentArrowDownIcon className="w-4 h-4 shrink-0" />
                              <span className="wrap-break-word">{safeT('enrollmentPage.downloadForm', 'Download Registration Form')}</span>
                            </a>
                          </span>
                        )}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
                {index < steps.length - 1 && (
                  <ProcessStepConnector direction="horizontal" animate className="self-center shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile: simple stacked cards */}
          <div className="flex flex-col lg:hidden gap-4 w-full">
            {steps.map((step, index) => (
              <div key={step.title} className="w-full">
                <Card
                  variant="interactive"
                  className="w-full rounded-xl p-5 sm:p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 border-2 border-border overflow-visible"
                >
                  <CardHeader className="p-0 mb-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-br from-primary/20 to-primary/10 text-primary shrink-0">
                        {index === 0 && <ClipboardDocumentListIcon className="h-6 w-6" />}
                        {index === 1 && <CalendarDaysIcon className="h-6 w-6" />}
                        {index === 2 && <DocumentCheckIcon className="h-6 w-6" />}
                        {index === 3 && <UserGroupIcon className="h-6 w-6" />}
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-muted-foreground leading-relaxed text-base">
                      {step.description}
                      {index === 0 && (
                        <span className="block mt-3">
                          <a
                            href="/assets/Registration form 2026.pdf"
                            download
                            className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-semibold underline underline-offset-2 transition-colors"
                          >
                            <DocumentArrowDownIcon className="w-4 h-4 shrink-0" />
                            {safeT('enrollmentPage.downloadForm', 'Download Registration Form')}
                          </a>
                        </span>
                      )}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Requirements */}
      <section className="py-8 bg-muted/30 overflow-hidden relative">
        <div ref={requirementsRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              {safeT('enrollmentPage.requirements.title', 'Enrollment Requirements')}
            </h2>
            <p className="text-xl text-muted-foreground w-full max-w-5xl mx-auto text-balance">
              {safeT('enrollmentPage.requirements.subtitle', 'Please prepare the following documents for a smooth enrollment process.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requirements.map((requirement) => (
              <div
                key={requirement}
                className="requirement-card flex items-start space-x-3 bg-card p-5 sm:p-6 rounded-xl shadow-md border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 min-w-0"
              >
                <CheckCircleIcon className="h-6 w-6 text-primary shrink-0 mt-1" />
                <p className="text-muted-foreground wrap-break-word min-w-0">{requirement}</p>
              </div>
            ))}
          </div>
        </div>
        
      </section>

      {/* Fees & Hours */}
      <section className="py-8 bg-card overflow-hidden relative">
        <div ref={feesHoursRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              {safeT('enrollmentPage.feesHours.title', 'Fees & Hours')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="fee-hour-card space-y-4 bg-muted/30 p-6 sm:p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground">{safeT('enrollmentPage.feesHours.hours', 'Monday to Friday, 7:00 a.m. to 6:00 p.m.')}</h3>
              <p className="text-sm text-muted-foreground">{safeT('enrollmentPage.feesHours.closures', 'We are closed on all Statutory Holidays, weekends, and days when the managers choose to close due to unsafe conditions.')}</p>
            </div>
            <div className="fee-hour-card space-y-4 bg-muted/30 p-6 sm:p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <p className="text-muted-foreground">{safeT('enrollmentPage.feesHours.subsidy', 'Affordable Child Care Benefits available for qualified families.')}</p>
              <p className="text-muted-foreground">{safeT('enrollmentPage.feesHours.registrationFee', 'A non-refundable registration fee applies.')}</p>
              <p className="text-muted-foreground">{safeT('enrollmentPage.feesHours.deposit', "A deposit fee secures your child's space.")}</p>
              <p className="text-muted-foreground">{safeT('enrollmentPage.feesHours.monthlyFees', 'Please inquire by email or phone regarding current monthly fees.')}</p>
            </div>
          </div>
        </div>
        
      </section>

      {/* Enrollment FAQ */}
      <motion.section
        className="py-20 bg-background overflow-hidden relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        {/* <EnrollmentGridBackground /> removed as per request */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        className="py-20 bg-primary overflow-hidden relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <EnrollmentGridBackground />
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground">
            {safeT('enrollmentPage.cta.title', 'Ready to Apply?')}
          </h2>
          <p className="text-xl text-primary-foreground/90 w-full max-w-5xl mx-auto text-balance">
            {safeT('enrollmentPage.cta.subtitle', 'Contact us to begin the enrollment process or schedule a tour of our Coquitlam Montessori daycare.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact-form"
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
    </>
  );
}
