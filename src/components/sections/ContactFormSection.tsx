'use client';

import { useState, useEffect, useRef } from 'react';
import { GoogleMap } from '@/components/ui/GoogleMap';
import { PhoneIcon, MapPinIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { staggerContainerMagic } from '@/lib/magicui-animations';
import { Card, CardDescription } from '@/components/ui/card';
import { ContactForm } from '@/components/ui/contact-form';
import { businessProfile } from '@/lib/business-profile';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQSchema } from '@/components/seo/StructuredData';
import { faqItems, FAQ_INITIAL_COUNT } from '@/data/faq';

/**
 * Contact section for single-page app: form, map, hours, FAQ.
 */
export function ContactFormSection() {
  const { t } = useLanguage();

  const [faqExpanded, setFaqExpanded] = useState(false);
  const showAllFaqs = faqExpanded || faqItems.length <= FAQ_INITIAL_COUNT;
  const displayedFaqItems = showAllFaqs ? faqItems : faqItems.slice(0, FAQ_INITIAL_COUNT);
  const hasMoreFaqs = faqItems.length > FAQ_INITIAL_COUNT;

  const [highlightForm, setHighlightForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

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
        className="py-20 bg-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
          <Card
            variant="premium"
            className={`w-full min-w-0 bg-white/50 dark:bg-card/80 backdrop-blur-sm p-8 sm:p-12 lg:p-14 scroll-mt-20 border-2 shadow-xl hover:shadow-2xl transition-all duration-300 ${highlightForm
              ? 'border-primary/80 ring-4 ring-primary/30 animate-pulse'
              : 'border-border/50'
              }`}
          >
            <ContactForm variant="section" idPrefix="contact" />
          </Card>
        </div>
      </motion.section>

      {/* 2. Get in Touch (phone, location, hours, email in one block) */}
      <motion.section
        className="py-20 bg-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerMagic}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-8 text-center">
            {t('contactPage.info.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-5xl mx-auto text-balance">
            {t('contactPage.info.description')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="premium" className="flex flex-col items-start p-6 group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <PhoneIcon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1 text-lg">{t('contactPage.cards.phone.title')}</h3>
              <a href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`} className="text-muted-foreground font-semibold hover:text-primary transition-colors">
                {businessProfile.telephone}
              </a>
              <CardDescription className="text-sm mt-2 font-medium">{t('contactPage.cards.phone.subtitle')}</CardDescription>
            </Card>
            <Card variant="premium" className="flex flex-col items-start p-6 group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPinIcon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1 text-lg">{t('contactPage.cards.location.title')}</h3>
              <p className="text-muted-foreground font-semibold">{businessProfile.address.streetAddress}</p>
              <p className="text-muted-foreground font-semibold text-sm">{businessProfile.address.addressLocality}, {businessProfile.address.addressRegion} {businessProfile.address.postalCode}</p>
              <CardDescription className="text-sm mt-2 font-medium">{t('contactPage.cards.location.subtitle')}</CardDescription>
            </Card>
            <Card variant="premium" className="flex flex-col items-start p-6 group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ClockIcon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1 text-lg">{t('contactPage.cards.hours.title')}</h3>
              <p className="text-muted-foreground font-semibold">{t('contactPage.cards.hours.weekdays')}</p>
              <p className="text-muted-foreground font-semibold">{t('contactPage.cards.hours.hours')}</p>
              <CardDescription className="text-sm mt-2 font-medium">{t('contactPage.cards.hours.subtitle')}</CardDescription>
            </Card>
            <Card variant="premium" className="flex flex-col items-start p-6 group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors min-h-[44px]"
            >
              <PhoneIcon className="h-5 w-5" />
              {t('contactPage.quickActions.call')}
            </a>
            <a
              href={`mailto:${businessProfile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors min-h-[44px]"
            >
              <EnvelopeIcon className="h-5 w-5" />
              {t('contactPage.quickActions.email')}
            </a>
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
        <FAQSchema questions={faqItems} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-8 text-center">
            {t('contactPage.faq.title')}
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
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors min-h-[44px]"
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
