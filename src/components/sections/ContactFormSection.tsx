'use client';

import { useState, useEffect, useRef } from 'react';
import { GoogleMap } from '@/components/ui/GoogleMap';
import { PhoneIcon, MapPinIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeIn } from '@/lib/animations';
import { staggerContainerMagic } from '@/lib/magicui-animations';
import { Card, CardDescription } from '@/components/ui/card';
import { ContactForm } from '@/components/ui/contact-form';
import { businessProfile } from '@/lib/business-profile';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  GridAndDotBackgrounds,
  sectionGridDotPresets,
  useSectionGridDotHover,
} from '@/components/ui/GridAndDotBackgrounds';
import { BrandCanvaClassroomPhoto } from '@/components/ui/brand-visual-assets';
import { cn } from '@/lib/utils';
import { faqItems, FAQ_INITIAL_COUNT } from '@/data/faq';
import { AuroraBackground } from '@/components/ui/aurora-background';

/**
 * Contact section for single-page app: form, map, hours, FAQ.
 */
export function ContactFormSection() {
  const { t } = useLanguage();
  const facebookUrl = businessProfile.sameAs?.find((url) => url.includes('facebook'));
  const instagramUrl = businessProfile.sameAs?.find((url) => url.includes('instagram'));

  const [faqExpanded, setFaqExpanded] = useState(false);
  const showAllFaqs = faqExpanded || faqItems.length <= FAQ_INITIAL_COUNT;
  const displayedFaqItems = showAllFaqs ? faqItems : faqItems.slice(0, FAQ_INITIAL_COUNT);
  const hasMoreFaqs = faqItems.length > FAQ_INITIAL_COUNT;

  const [highlightForm, setHighlightForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const {
    isSectionHovered: contactFormBgHovered,
    gridDotSectionHoverProps: contactFormGridDotHoverProps,
  } = useSectionGridDotHover();
  const {
    isSectionHovered: contactInfoBgHovered,
    gridDotSectionHoverProps: contactInfoGridDotHoverProps,
  } = useSectionGridDotHover();

  // Handle navigation from CTA buttons with hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#contact-form') {
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightForm(true);
          setTimeout(() => setHighlightForm(false), 2000);
        }
      }, 100);
    }
  }, []);

  return (
    <div id="contact">
      {/* 1. Contact Form (primary) */}
      <motion.section
        id="contact-form"
        ref={formRef}
        className="relative py-20 bg-card overflow-visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        {...contactFormGridDotHoverProps}
      >
        <AuroraBackground className="opacity-70" palette="sunrise" blur={200} />
        <GridAndDotBackgrounds
          backdropOnly
          isSectionHovered={contactFormBgHovered}
          {...sectionGridDotPresets.contactForm}
        />
        <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
          <div className="group flex w-full min-w-0 flex-col gap-10 xl:flex-row xl:items-stretch xl:gap-10">
            {/* Match EnrollmentProcessStepCard: shadow-lg → hover:shadow-2xl, tint + primary wash (no premium scale/blur). */}
            <div
              className={cn(
                'group relative w-full min-w-0 flex-1 overflow-hidden rounded-2xl border-2 bg-card p-8 sm:p-12 lg:p-14 scroll-mt-20 shadow-lg transition-all duration-300 hover:shadow-2xl xl:min-w-0 xl:flex-[1.35]',
                highlightForm
                  ? 'border-primary/80 ring-4 ring-primary/30 animate-pulse'
                  : 'border-border',
              )}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-muted/40 via-transparent to-primary/6 dark:from-muted/25 dark:via-transparent dark:to-primary/10"
                aria-hidden
              />
              <div className="relative z-10 min-w-0">
                <ContactForm variant="section" idPrefix="contact" />
              </div>
              <div className="pointer-events-none absolute inset-0 z-1 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="flex w-full shrink-0 justify-center max-w-md mx-auto xl:w-[min(100%,340px)] xl:max-w-[min(100%,340px)] xl:flex-none xl:mx-0 xl:justify-end xl:self-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-72 xl:max-w-80"
              >
                <BrandCanvaClassroomPhoto
                  badgeLabel={t('contactPage.info.badgeLabel')}
                  className="w-full max-w-full"
                  imageClassName="aspect-3/4 min-h-0 h-72 sm:h-80 w-full"
                  badgeClassName="bottom-3 right-3 w-auto max-w-[78%] rotate-0 px-3 py-2 ring-2 ring-white/70 shadow-xl"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Get in Touch (phone, location, hours, email in one block) */}
      <motion.section
        className="relative py-20 bg-muted/30 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerMagic}
        {...contactInfoGridDotHoverProps}
      >
        <AuroraBackground className="opacity-80" palette="forest" blur={200} />
        <GridAndDotBackgrounds
          backdropOnly
          isSectionHovered={contactInfoBgHovered}
          {...sectionGridDotPresets.contactInfo}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-8 text-center">
            {t('contactPage.info.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-5xl mx-auto text-balance">
            {t('contactPage.info.description')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="premium" className="flex flex-col items-start p-6 group">
              <div className="w-14 h-14 bg-linear-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <PhoneIcon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1 text-lg">{t('contactPage.cards.phone.title')}</h3>
              <a href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`} className="text-muted-foreground font-semibold hover:text-primary transition-colors">
                {businessProfile.telephone}
              </a>
              <CardDescription className="text-sm mt-2 font-medium">{t('contactPage.cards.phone.subtitle')}</CardDescription>
            </Card>
            <Card variant="premium" className="flex flex-col items-start p-6 group">
              <div className="w-14 h-14 bg-linear-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPinIcon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1 text-lg">{t('contactPage.cards.location.title')}</h3>
              <p className="text-muted-foreground font-semibold">{businessProfile.address.streetAddress}</p>
              <p className="text-muted-foreground font-semibold text-sm">{businessProfile.address.addressLocality}, {businessProfile.address.addressRegion} {businessProfile.address.postalCode}</p>
              <CardDescription className="text-sm mt-2 font-medium">{t('contactPage.cards.location.subtitle')}</CardDescription>
            </Card>
            <Card variant="premium" className="flex flex-col items-start p-6 group">
              <div className="w-14 h-14 bg-linear-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ClockIcon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1 text-lg">{t('contactPage.cards.hours.title')}</h3>
              <p className="text-muted-foreground font-semibold">{t('contactPage.cards.hours.weekdays')}</p>
              <p className="text-muted-foreground font-semibold">{t('contactPage.cards.hours.hours')}</p>
              <CardDescription className="text-sm mt-2 font-medium">{t('contactPage.cards.hours.subtitle')}</CardDescription>
            </Card>
            <Card variant="premium" className="flex flex-col items-start p-6 group">
              <div className="w-14 h-14 bg-linear-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <EnvelopeIcon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1 text-lg">{t('contactPage.cards.email.title')}</h3>
              <a href={`mailto:${businessProfile.email}`} className="text-muted-foreground font-semibold hover:text-primary transition-colors break-all">
                {businessProfile.email}
              </a>
              <CardDescription className="text-sm mt-2 font-medium">{t('contactPage.cards.email.subtitle')}</CardDescription>
            </Card>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors min-h-11"
            >
              <PhoneIcon className="h-5 w-5" />
              {t('contactPage.quickActions.call')}
            </a>
            <a
              href={`mailto:${businessProfile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors min-h-11"
            >
              <EnvelopeIcon className="h-5 w-5" />
              {t('contactPage.quickActions.email')}
            </a>
            {facebookUrl && (
              <Link
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors min-h-11"
              >
                <Facebook className="h-5 w-5" />
                Facebook
              </Link>
            )}
            {instagramUrl && (
              <Link
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors min-h-11"
              >
                <Instagram className="h-5 w-5" />
                Instagram
              </Link>
            )}
          </div>
        </div>
      </motion.section>

      {/* 3. FAQ - all inline, "More" expands (no separate page) */}
      <motion.section
        id="faq"
        className="py-20 bg-card scroll-mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-8 text-center">
            {t('common.frequentlyAskedQuestions')}
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {displayedFaqItems.map((item, idx) => (
              <AccordionItem
                key={`${idx}-${item.question}`}
                value={`item-${idx}`}
                className="rounded-xl border border-border bg-muted/30 px-4 sm:px-5 shadow-sm data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="font-semibold text-foreground text-base sm:text-lg hover:no-underline hover:text-primary py-4 sm:py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {hasMoreFaqs && !faqExpanded && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setFaqExpanded(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors min-h-11"
              >
                {t('contactPage.faq.moreLink')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </motion.section>

      {/* 4. Our Location (map) */}
      <motion.section
        className="py-20 bg-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              {t('contactPage.map.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('contactPage.map.subtitle')}
            </p>
          </div>

          <GoogleMap />
        </div>
      </motion.section>
    </div>
  );
}
