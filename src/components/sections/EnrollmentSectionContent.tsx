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
import { staggerItem } from '@/lib/animations';
import { staggerContainerMagic } from '@/lib/magicui-animations';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  GridAndDotBackgrounds,
  sectionGridDotPresets,
  useSectionGridDotHover,
} from '@/components/ui/GridAndDotBackgrounds';
import { BrandAdPromoCard } from '@/components/ui/brand-visual-assets';

/** Icon gradients aligned with About "Mission & Values" cards (per-step accent). */
const ENROLLMENT_STEP_ICON_GRADIENTS = [
  'from-emerald-500 to-teal-500',
  'from-blue-500 to-cyan-500',
  'from-rose-500 to-pink-500',
  'from-violet-500 to-purple-500',
] as const;

type EnrollmentStep = { title: string; description: string };

/** Decorative grid + glow behind enrollment CTA band (module scope — static component rule). */
function EnrollmentCtaBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black_70%,transparent_100%)]" />
      <div className="pointer-events-none absolute top-20 right-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-10 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
    </>
  );
}

/**
 * Single enrollment process step — matches Mission & Values card hover (shadow + overlay + icon scale).
 */
function EnrollmentProcessStepCard({
  step,
  index,
  safeT,
  className,
}: {
  step: EnrollmentStep;
  index: number;
  safeT: (key: string, defaultEn: string) => string;
  className?: string;
}) {
  const gradient =
    ENROLLMENT_STEP_ICON_GRADIENTS[index % ENROLLMENT_STEP_ICON_GRADIENTS.length];

  return (
    <div
      className={cn(
        'group relative h-full w-full min-w-0 overflow-hidden rounded-2xl border-2 border-border bg-card p-5 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-2xl',
        className,
      )}
    >
      {/* Opaque bg-card blocks section grid; tint is a separate layer (Mission-style cards use solid bg-card). */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-muted/40 via-transparent to-primary/6 dark:from-muted/25 dark:via-transparent dark:to-primary/10"
        aria-hidden
      />
      <div className="relative z-10 min-w-0">
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-white transition-transform duration-300 group-hover:scale-110',
                gradient,
              )}
            >
              {index === 0 && <ClipboardDocumentListIcon className="h-7 w-7" />}
              {index === 1 && <CalendarDaysIcon className="h-7 w-7" />}
              {index === 2 && <DocumentCheckIcon className="h-7 w-7" />}
              {index === 3 && <UserGroupIcon className="h-7 w-7" />}
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {index + 1}
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
        </div>
        <p className="wrap-break-word text-sm leading-relaxed text-muted-foreground sm:text-base">
          {step.description}
          {index === 0 && (
            <span className="mt-3 block">
              <a
                href="/assets/Registration form 2026.pdf"
                download
                className="inline-flex min-w-0 items-center gap-1.5 font-semibold text-primary underline underline-offset-2 transition-colors hover:text-primary/80 wrap-break-word"
              >
                <DocumentArrowDownIcon className="h-4 w-4 shrink-0" />
                <span className="wrap-break-word">
                  {safeT('enrollmentPage.downloadForm', 'Download Registration Form')}
                </span>
              </a>
            </span>
          )}
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 z-1 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

/**
 * Enrollment section for single-page app: steps, requirements, accordion, CTA.
 */
export function EnrollmentSectionContent() {
  const { t, messages } = useLanguage();
  const { isSectionHovered, gridDotSectionHoverProps } = useSectionGridDotHover();
  const requirementsRef = useRef<HTMLDivElement>(null);
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
    <>
      {/* Enrollment Process - animated steps with connecting lines */}
      <motion.section
        id="enrollment"
        className="relative py-20 bg-card overflow-x-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerMagic}
        {...gridDotSectionHoverProps}
      >
        <GridAndDotBackgrounds
          backdropOnly
          isSectionHovered={isSectionHovered}
          {...sectionGridDotPresets.enrollment}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-foreground px-2">
              {safeT('enrollmentPage.process.title', 'Enrollment Process')}
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground w-full max-w-5xl mx-auto text-balance px-2">
              {safeT('enrollmentPage.process.subtitle', "Follow these simple steps to begin your child's Montessori journey in Coquitlam.")}
            </p>
            <div className="mx-auto w-full max-w-3xl pt-4">
              <BrandAdPromoCard className="mx-auto" />
            </div>
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
                  <EnrollmentProcessStepCard step={step} index={index} safeT={safeT} />
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
                <EnrollmentProcessStepCard
                  step={step}
                  index={index}
                  safeT={safeT}
                  className="w-full"
                />
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              {safeT('enrollmentPage.feesHours.title', 'Fees & Hours')}
            </h2>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainerMagic}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
          >
            <motion.div className="fee-hour-card space-y-4 bg-muted/30 p-6 sm:p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 transform-gpu will-change-transform" variants={staggerItem}>
              <h3 className="text-xl font-bold text-foreground">{safeT('enrollmentPage.feesHours.hours', 'Monday to Friday, 7:00 a.m. to 6:00 p.m.')}</h3>
              <p className="text-sm text-muted-foreground">{safeT('enrollmentPage.feesHours.closures', 'We are closed on all Statutory Holidays, weekends, and days when the managers choose to close due to unsafe conditions.')}</p>
            </motion.div>
            <motion.div className="fee-hour-card space-y-4 bg-muted/30 p-6 sm:p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 transform-gpu will-change-transform" variants={staggerItem}>
              <p className="text-muted-foreground">
                {safeT('enrollmentPage.feesHours.subsidy', 'Affordable Child Care Benefits available for qualified families.')}{' '}
                <Link href="/funding" className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80">
                  {safeT('enrollmentPage.feesHours.learnAboutFunding', 'Learn about funding & subsidies')}
                </Link>
              </p>
              <p className="text-muted-foreground">{safeT('enrollmentPage.feesHours.registrationFee', 'A non-refundable registration fee applies.')}</p>
              <p className="text-muted-foreground">{safeT('enrollmentPage.feesHours.deposit', "A deposit fee secures your child's space.")}</p>
              <p className="text-muted-foreground">{safeT('enrollmentPage.feesHours.monthlyFees', 'Please inquire by email or phone regarding current monthly fees.')}</p>
            </motion.div>
          </motion.div>
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
        <EnrollmentCtaBackground />
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
