'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/components/analytics/GoogleAnalytics';

/**
 * Shared contact form: Full Name, Email, Phone, Child's Age, Message.
 * Used in hero section and contact section.
 */
export function ContactForm({
  variant = 'section',
  idPrefix = 'contact',
}: {
  variant?: 'hero' | 'section';
  idPrefix?: string;
}) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    childAge: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = t('contactPage.form.validation.nameRequired');
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
    if (!validateForm()) {
      setSubmitStatus('error');
      setErrorMessage(t('contactPage.form.validation.formError'));
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', childAge: '', message: '' });
        setFieldErrors({});
        trackEvent({ action: 'tour_request', category: 'conversion', label: variant === 'hero' ? 'hero_form' : 'contact_form' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || t('contactPage.form.validation.submitError'));
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage(t('contactPage.form.validation.networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputBase = "w-full px-4 sm:px-5 py-3.5 sm:py-4 border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:border-transparent transition-all min-h-[48px] sm:min-h-[52px] text-base sm:text-lg placeholder:text-muted-foreground/70";
  const inputError = "border-red-500 focus:ring-red-500";
  const inputNormal = "border-border hover:border-primary/50";
  const labelClass = "block text-sm sm:text-base font-bold text-foreground mb-1.5";

  const isHero = variant === 'hero';
  const fieldGridClass = isHero
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'
    : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4';

  return (
    <form
      onSubmit={handleSubmit}
      className={isHero ? "w-full space-y-4 sm:space-y-5 rounded-2xl sm:rounded-3xl bg-white shadow-xl border border-slate-200/80 p-6 sm:p-8 md:p-10" : "space-y-4 sm:space-y-5"}
      aria-label={t('contactPage.form.title')}
    >
      <h2 className={isHero ? "text-xl sm:text-2xl md:text-3xl font-bold text-[#0f172a] text-center mb-4" : "text-3xl sm:text-4xl font-display font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent break-words mb-4 sm:mb-6"}>
        {t('contactPage.form.title')}
      </h2>

      {submitStatus === 'success' && (
        <div className={isHero ? "p-4 sm:p-5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl text-base" : "p-4 sm:p-5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl text-base mb-2"}>
          <p className="text-green-800 dark:text-green-200 font-bold">{t('contactPage.form.success')}</p>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className={isHero ? "p-4 sm:p-5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-base" : "p-4 sm:p-5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-base mb-2"}>
          <p className="text-red-800 dark:text-red-200 font-bold">{errorMessage}</p>
        </div>
      )}

      <div className={fieldGridClass}>
        <div className="space-y-1.5">
          <label htmlFor={`${idPrefix}-name`} className={labelClass}>
            {t('contactPage.form.fields.name')} *
          </label>
          <input
            type="text"
            id={`${idPrefix}-name`}
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.name}
            className={`${inputBase} ${fieldErrors.name ? inputError : inputNormal}`}
            placeholder={t('contactPage.form.placeholders.name')}
          />
          {fieldErrors.name && <p className="mt-1 text-sm text-red-600 font-bold" role="alert">{fieldErrors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>
            {t('contactPage.form.fields.email')} *
          </label>
          <input
            type="email"
            id={`${idPrefix}-email`}
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.email}
            className={`${inputBase} ${fieldErrors.email ? inputError : inputNormal}`}
            placeholder={t('contactPage.form.placeholders.email')}
          />
          {fieldErrors.email && <p className="mt-1 text-sm text-red-600 font-bold" role="alert">{fieldErrors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
            {t('contactPage.form.fields.phone')}
          </label>
          <input
            type="tel"
            id={`${idPrefix}-phone`}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${inputBase} ${inputNormal}`}
            placeholder={t('contactPage.form.placeholders.phone')}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor={`${idPrefix}-childAge`} className={labelClass}>
            {t('contactPage.form.fields.childAge')}
          </label>
          <select
            id={`${idPrefix}-childAge`}
            name="childAge"
            value={formData.childAge}
            onChange={handleChange}
            className={`${inputBase} ${inputNormal} cursor-pointer !pr-10 sm:!pr-12 text-left max-w-full`}
          >
            <option value="">{t('contactPage.form.options.agePlaceholder')}</option>
            <option value="30months-3years">{t('contactPage.form.options.ageToddler')}</option>
            <option value="3-4years">{t('contactPage.form.options.agePreschool')}</option>
            <option value="4-5years">{t('contactPage.form.options.agePreK')}</option>
            <option value="other">{t('contactPage.form.options.ageOther')}</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor={`${idPrefix}-message`} className={labelClass}>
          {t('contactPage.form.fields.message')} *
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          required
          rows={isHero ? 3 : 4}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!fieldErrors.message}
          className={`${inputBase} resize-none min-h-[80px] sm:min-h-[100px] ${fieldErrors.message ? inputError : inputNormal} ${!isHero ? 'lg:min-h-[120px]' : ''}`}
          placeholder={t('contactPage.form.placeholders.message')}
        />
        {fieldErrors.message && <p className="mt-1 text-sm text-red-600 font-bold" role="alert">{fieldErrors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground px-8 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl min-h-[52px] sm:min-h-[56px] flex items-center justify-center"
      >
        {isSubmitting ? t('contactPage.form.submitting') : t('contactPage.form.submit')}
      </button>
    </form>
  );
}
