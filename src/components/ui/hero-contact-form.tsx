'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { businessProfile } from '@/lib/business-profile';

/**
 * Compact hero contact form: "Schedule a Tour" — Name, Phone, Email, Child Age, Message.
 */
export function HeroContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', childAge: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMessage('');
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim() || formData.message.length < 10) {
      setStatus('error');
      setErrorMessage(t('contactPage.form.validation.formError'));
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', childAge: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.message || t('contactPage.form.validation.submitError'));
      }
    } catch {
      setStatus('error');
      setErrorMessage(t('contactPage.form.validation.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const phone = businessProfile.telephone.replace(/\D/g, '');
  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 rounded-2xl bg-white shadow-lg border border-slate-200 p-5 sm:p-6"
      aria-label={t('home.hero.scheduleTour')}
    >
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-[#0f172a]">{t('home.hero.scheduleTour')}</h2>
        <p className="text-sm text-slate-600 mt-0.5">{t('home.hero.formSubtitle')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label htmlFor="hero-name" className={labelClass}>{t('home.hero.formYourName')} *</label>
          <input
            id="hero-name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="hero-phone" className={labelClass}>{t('contactPage.form.fields.phone')}</label>
          <input
            id="hero-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="604-xxx-xxxx"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="hero-email" className={labelClass}>{t('contactPage.form.fields.email')} *</label>
        <input
          id="hero-email"
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="hero-age" className={labelClass}>{t('contactPage.form.fields.childAge')}</label>
        <select
          id="hero-age"
          name="childAge"
          value={formData.childAge}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">{t('contactPage.form.options.agePlaceholder')}</option>
          <option value="30mo-3yr">30 months – 3 years</option>
          <option value="3-4yr">3 – 4 years</option>
          <option value="4-5yr">4 – 5 years</option>
        </select>
      </div>
      <div>
        <label htmlFor="hero-message" className={labelClass}>{t('contactPage.form.fields.message')}</label>
        <textarea
          id="hero-message"
          name="message"
          required
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder={t('contactPage.form.placeholders.message')}
          className={`${inputClass} resize-none`}
        />
      </div>
      {status === 'success' && (
        <p className="text-sm font-bold text-green-600">{t('contactPage.form.success')}</p>
      )}
      {status === 'error' && (
        <p className="text-sm font-bold text-red-600">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        {isSubmitting ? t('contactPage.form.submitting') : t('contactPage.form.submit')}
      </button>
      <p className="text-sm text-slate-500 text-center">
        {t('home.hero.orCallUs')}: <a href={`tel:${phone}`} className="font-semibold text-blue-600 hover:underline">{businessProfile.telephone}</a>
      </p>
    </form>
  );
}
