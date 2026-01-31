'use client';

import { Suspense, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { GoogleMap } from '@/components/ui/GoogleMap';
import { getImageUrl } from '@/lib/image-utils';
import { PhoneIcon, MapPinIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { businessProfile } from '@/lib/business-profile';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';
import { usePathname } from 'next/navigation';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getBreadcrumbs, toBreadcrumbSchemaItems } from '@/lib/breadcrumbs';

/**
 * Contact page client component with form and business details.
 */
export function ContactPageClient() {
  const { t, messages } = useLanguage();
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  const contactFaqItems = (messages.contactPage?.faq?.items ?? []) as Array<{ question: string; answer: string }>;

  useLocalizedMetadata({
    title: t('seo.contact.title'),
    description: t('seo.contact.description'),
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    childAge: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = t('contactPage.form.validation.nameRequired');
    }

    if (!formData.email.trim()) {
      errors.email = t('contactPage.form.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('contactPage.form.validation.emailInvalid');
    }

    if (!formData.message.trim()) {
      errors.message = t('contactPage.form.validation.messageRequired');
    } else if (formData.message.trim().length < 10) {
      errors.message = t('contactPage.form.validation.messageMin');
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setErrorMessage('');

    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus('error');
      setErrorMessage(t('contactPage.form.validation.formError'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', childAge: '', message: '' });
        setFieldErrors({});

        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || t('contactPage.form.validation.submitError'));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(t('contactPage.form.validation.networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Suspense fallback={<LoadingSpinner message="Loading contact page..." />}>
      <main className="flex-1">
        <BreadcrumbSchema items={toBreadcrumbSchemaItems(breadcrumbs)} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        {/* Hero Section */}
        <PageHero
          title={t('contactPage.hero.title')}
          subtitle={t('contactPage.hero.subtitle')}
          backgroundSvg={getImageUrl('/imgs/contact/contact_hero_1.gif')}
          enableScrollTrigger={true}
          hideTitle={true}
          hideSubtitle={true}
          unoptimized={true}
        />

        {/* 1. Contact Form (primary) */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
            <Card variant="premium" className="w-full min-w-0 bg-gradient-to-br from-card to-muted/30 p-6 sm:p-10 scroll-mt-20 border-2 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="p-0 mb-8">
                  <CardTitle className="text-3xl font-display font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent break-words">
                    {t('contactPage.form.title')}
                  </CardTitle>
                </CardHeader>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-bold">{t('contactPage.form.success')}</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-bold">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-bold text-foreground">
                        {t('contactPage.form.fields.name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={fieldErrors.name ? 'true' : 'false'}
                        aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                        className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors min-h-[44px] text-base font-medium ${fieldErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-border'
                          }`}
                        placeholder={t('contactPage.form.placeholders.name')}
                      />
                      {fieldErrors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-600 font-bold" role="alert">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-bold text-foreground">
                        {t('contactPage.form.fields.email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={fieldErrors.email ? 'true' : 'false'}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors min-h-[44px] text-base font-medium ${fieldErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-border'
                          }`}
                        placeholder={t('contactPage.form.placeholders.email')}
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-600 font-bold" role="alert">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-bold text-foreground">
                        {t('contactPage.form.fields.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors min-h-[44px] text-base font-medium"
                        placeholder={t('contactPage.form.placeholders.phone')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="childAge" className="block text-sm font-bold text-foreground">
                        {t('contactPage.form.fields.childAge')}
                      </label>
                      <select
                        id="childAge"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors min-h-[44px] text-base font-medium cursor-pointer"
                      >
                        <option value="">{t('contactPage.form.options.agePlaceholder')}</option>
                        <option value="30months-3years">{t('contactPage.form.options.ageToddler')}</option>
                        <option value="3-4years">{t('contactPage.form.options.agePreschool')}</option>
                        <option value="4-5years">{t('contactPage.form.options.agePreK')}</option>
                        <option value="other">{t('contactPage.form.options.ageOther')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-bold text-foreground">
                      {t('contactPage.form.fields.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={fieldErrors.message ? 'true' : 'false'}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none min-h-[132px] text-base font-medium ${fieldErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-border'
                        }`}
                      placeholder={t('contactPage.form.placeholders.message')}
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-600 font-bold" role="alert">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg min-h-[44px] flex items-center justify-center"
                  >
                    {isSubmitting ? t('contactPage.form.submitting') : t('contactPage.form.submit')}
                  </button>
                </form>
            </Card>
          </div>
        </motion.section>

        {/* 2. Get in Touch (phone, location, hours, email in one block) */}
        <motion.section
          className="py-20 bg-muted/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
              {t('contactPage.info.title')}
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-5xl mx-auto text-balance">
              {t('contactPage.info.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card variant="premium" className="flex flex-col items-start p-6 border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-xl group">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <PhoneIcon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-bold text-foreground mb-1 text-lg">{t('contactPage.cards.phone.title')}</CardTitle>
                <a href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`} className="text-muted-foreground font-semibold hover:text-primary transition-colors">
                  {businessProfile.telephone}
                </a>
                <CardDescription className="text-sm mt-2 font-medium">{t('contactPage.cards.phone.subtitle')}</CardDescription>
              </Card>
              <Card variant="premium" className="flex flex-col items-start p-6 border-2 border-transparent hover:border-secondary/30 transition-all duration-500 hover:shadow-xl group">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <MapPinIcon className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="font-bold text-foreground mb-1 text-lg">{t('contactPage.cards.location.title')}</CardTitle>
                <p className="text-muted-foreground font-semibold">{businessProfile.address.streetAddress}</p>
                <p className="text-muted-foreground font-semibold text-sm">{businessProfile.address.addressLocality}, {businessProfile.address.addressRegion} {businessProfile.address.postalCode}</p>
                <CardDescription className="text-sm mt-2 font-medium">{t('contactPage.cards.location.subtitle')}</CardDescription>
              </Card>
              <Card variant="premium" className="flex flex-col items-start p-6 border-2 border-transparent hover:border-accent/30 transition-all duration-500 hover:shadow-xl group">
                <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <ClockIcon className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="font-bold text-foreground mb-1 text-lg">{t('contactPage.cards.hours.title')}</CardTitle>
                <p className="text-muted-foreground font-semibold">{t('contactPage.cards.hours.weekdays')}</p>
                <p className="text-muted-foreground font-semibold">{t('contactPage.cards.hours.hours')}</p>
                <CardDescription className="text-sm mt-2 font-medium">{t('contactPage.cards.hours.subtitle')}</CardDescription>
              </Card>
              <Card variant="premium" className="flex flex-col items-start p-6 border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-xl group">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <EnvelopeIcon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-bold text-foreground mb-1 text-lg">{t('contactPage.cards.email.title')}</CardTitle>
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

        {/* 3. Contact FAQ */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
              {t('contactPage.faq.title')}
            </h2>
            <div className="space-y-4">
              {contactFaqItems.map((item, idx) => (
                <div
                  key={`${idx}-${item.question}`}
                  className="rounded-xl border border-border bg-muted/30 p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
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
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {t('contactPage.map.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('contactPage.map.subtitle')}
              </p>
            </div>

            <GoogleMap />
          </div>
        </motion.section>
      </main>
    </Suspense>
  );
}
