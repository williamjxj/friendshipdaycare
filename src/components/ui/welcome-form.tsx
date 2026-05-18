'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type WelcomeFormData = {
  name: string;
  email: string;
  childName: string;
  childBirthday: string;
  tourDate: string;
  tourTimePreference: string;
  message: string;
};

const emptyFormData: WelcomeFormData = {
  name: '',
  email: '',
  childName: '',
  childBirthday: '',
  tourDate: '',
  tourTimePreference: '',
  message: '',
};

function formatDisplayDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString('en-CA', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="w-full min-w-0 space-y-2 rounded-xl border border-border/70 bg-muted/25 p-2.5 sm:p-3">
      <legend className="px-1 text-xs font-bold uppercase tracking-wider text-primary">{title}</legend>
      <div className="grid w-full min-w-0 grid-cols-2 gap-x-3 gap-y-2.5">{children}</div>
    </fieldset>
  );
}

export function WelcomeForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [source, setSource] = useState('unknown');
  const [formData, setFormData] = useState<WelcomeFormData>(emptyFormData);
  const [confirmation, setConfirmation] = useState<WelcomeFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().slice(0, 10);
  const minTourDate = today;

  useEffect(() => {
    setSource(searchParams.get('source') ?? 'unknown');
  }, [searchParams]);

  const tourTimeLabel = (value: string) => {
    if (value === 'morning') return t('welcomePage.form.tourTime.morning');
    if (value === 'afternoon') return t('welcomePage.form.tourTime.afternoon');
    return value;
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = t('welcomePage.form.validation.nameRequired');
    if (!formData.email.trim()) {
      errors.email = t('welcomePage.form.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('welcomePage.form.validation.emailInvalid');
    }
    if (!formData.childName.trim()) {
      errors.childName = t('welcomePage.form.validation.childNameRequired');
    }
    if (!formData.childBirthday) {
      errors.childBirthday = t('welcomePage.form.validation.childBirthdayRequired');
    } else if (formData.childBirthday > today) {
      errors.childBirthday = t('welcomePage.form.validation.childBirthdayInvalid');
    }
    if (!formData.tourDate) errors.tourDate = t('welcomePage.form.validation.tourDateRequired');
    if (!formData.tourTimePreference) {
      errors.tourTimePreference = t('welcomePage.form.validation.tourTimeRequired');
    }
    if (!formData.message.trim()) {
      errors.message = t('welcomePage.form.validation.messageRequired');
    } else if (formData.message.trim().length < 10) {
      errors.message = t('welcomePage.form.validation.messageMin');
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
      setErrorMessage(t('welcomePage.form.validation.formError'));
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source }),
      });
      const result = await response.json();
      if (result.success) {
        setConfirmation({ ...formData });
        setSubmitStatus('success');
        setFieldErrors({});
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || t('welcomePage.form.validation.submitError'));
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage(t('welcomePage.form.validation.networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setConfirmation(null);
    setSubmitStatus('idle');
    setFormData(emptyFormData);
    setFieldErrors({});
    setErrorMessage('');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const shellClass =
    'mx-auto w-full min-w-[280px] max-w-6xl shrink-0 overflow-hidden rounded-2xl border border-primary/15 bg-card shadow-lg ring-1 ring-black/5';
  const bodyClass = 'space-y-3 p-3.5 sm:space-y-4 sm:p-5';
  const inputBase =
    'w-full min-w-0 rounded-lg border bg-background px-3 py-2.5 text-base text-foreground shadow-sm transition-all min-h-[48px] placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25';
  const inputError = 'border-red-500 focus:border-red-500 focus:ring-red-500/25';
  const inputNormal = 'border-input hover:border-primary/40';
  const labelClass = 'mb-1 block text-sm font-semibold text-foreground';
  const fieldWrapClass = 'min-w-0 space-y-0.5';
  const fieldHalf = `${fieldWrapClass} col-span-2 sm:col-span-1`;
  const fieldFull = `${fieldWrapClass} col-span-2`;

  if (submitStatus === 'success' && confirmation) {
    const summaryRows = [
      { label: t('welcomePage.form.fields.name'), value: confirmation.name },
      { label: t('welcomePage.form.fields.email'), value: confirmation.email },
      { label: t('welcomePage.form.fields.childName'), value: confirmation.childName },
      {
        label: t('welcomePage.form.fields.childBirthday'),
        value: formatDisplayDate(confirmation.childBirthday),
      },
      {
        label: t('welcomePage.form.fields.tourDate'),
        value: formatDisplayDate(confirmation.tourDate),
      },
      {
        label: t('welcomePage.form.fields.tourTimePreference'),
        value: tourTimeLabel(confirmation.tourTimePreference),
      },
      { label: t('welcomePage.form.fields.message'), value: confirmation.message },
    ];

    return (
      <section
        className={shellClass}
        aria-labelledby="welcome-confirmation-title"
        data-testid="welcome-success"
      >
        <div className="h-1.5 bg-gradient-to-r from-primary via-sky-400 to-amber-400" aria-hidden />
        <div className={bodyClass}>
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 h-8 w-8 shrink-0 text-green-600 dark:text-green-400"
              aria-hidden
            />
            <div className="min-w-0 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {t('welcomePage.form.confirmation.title')}
              </p>
              <h2
                id="welcome-confirmation-title"
                className="font-display text-lg font-bold text-foreground sm:text-xl"
              >
                {t('welcomePage.form.confirmation.welcomeHeading')}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t('welcomePage.form.confirmation.welcomeBody')}
              </p>
            </div>
          </div>

          <p className="rounded-xl border border-green-200/80 bg-green-50 px-3 py-2.5 text-sm font-medium text-green-800 dark:border-green-800 dark:bg-green-950/40 dark:text-green-200">
            {t('welcomePage.form.success')}
          </p>

          <div className="w-full min-w-0 space-y-2 rounded-xl border border-border/70 bg-muted/30 p-3 sm:p-4">
            <h3 className="text-sm font-bold text-foreground">
              {t('welcomePage.form.confirmation.summaryTitle')}
            </h3>
            <dl className="grid w-full min-w-0 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {summaryRows.map((row) => (
                <div key={row.label} className="min-w-0 border-b border-border/50 pb-2 last:border-0 sm:last:border-b">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-base text-foreground break-words">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('welcomePage.form.confirmation.nextSteps')}
          </p>

          <button
            type="button"
            onClick={handleBackToForm}
            data-testid="welcome-back"
            className="flex min-h-[48px] w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-base font-bold text-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-muted/50"
          >
            {t('welcomePage.form.confirmation.back')}
          </button>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="welcome-form"
      className={shellClass}
      aria-label={t('welcomePage.form.title')}
      data-testid="welcome-form"
    >
      <div className="h-1.5 bg-gradient-to-r from-primary via-sky-400 to-amber-400" aria-hidden />
      <div className={bodyClass}>
        <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
          {t('welcomePage.form.title')}
        </h2>

        {submitStatus === 'error' && (
          <div
            className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm dark:border-red-800 dark:bg-red-950/40"
            role="alert"
          >
            <p className="font-semibold text-red-800 dark:text-red-200">{errorMessage}</p>
          </div>
        )}

        <FormSection title={t('welcomePage.form.sections.contact')}>
          <div className={fieldHalf}>
            <label htmlFor="welcome-name" className={labelClass}>
              {t('welcomePage.form.fields.name')} *
            </label>
            <input
              type="text"
              id="welcome-name"
              name="name"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              data-testid="welcome-name"
              aria-invalid={!!fieldErrors.name}
              className={`${inputBase} ${fieldErrors.name ? inputError : inputNormal}`}
              placeholder={t('welcomePage.form.placeholders.name')}
            />
            {fieldErrors.name && (
              <p className="text-xs font-semibold text-red-600" role="alert">
                {fieldErrors.name}
              </p>
            )}
          </div>
          <div className={fieldHalf}>
            <label htmlFor="welcome-email" className={labelClass}>
              {t('welcomePage.form.fields.email')} *
            </label>
            <input
              type="email"
              id="welcome-email"
              name="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              data-testid="welcome-email"
              aria-invalid={!!fieldErrors.email}
              className={`${inputBase} ${fieldErrors.email ? inputError : inputNormal}`}
              placeholder={t('welcomePage.form.placeholders.email')}
            />
            {fieldErrors.email && (
              <p className="text-xs font-semibold text-red-600" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>
        </FormSection>

        <FormSection title={t('welcomePage.form.sections.child')}>
          <div className={fieldHalf}>
            <label htmlFor="welcome-child-name" className={labelClass}>
              {t('welcomePage.form.fields.childName')} *
            </label>
            <input
              type="text"
              id="welcome-child-name"
              name="childName"
              required
              value={formData.childName}
              onChange={handleChange}
              data-testid="welcome-child-name"
              aria-invalid={!!fieldErrors.childName}
              className={`${inputBase} ${fieldErrors.childName ? inputError : inputNormal}`}
              placeholder={t('welcomePage.form.placeholders.childName')}
            />
            {fieldErrors.childName && (
              <p className="text-xs font-semibold text-red-600" role="alert">
                {fieldErrors.childName}
              </p>
            )}
          </div>
          <div className={fieldHalf}>
            <label htmlFor="welcome-child-birthday" className={labelClass}>
              {t('welcomePage.form.fields.childBirthday')} *
            </label>
            <input
              type="date"
              id="welcome-child-birthday"
              name="childBirthday"
              required
              max={today}
              value={formData.childBirthday}
              onChange={handleChange}
              data-testid="welcome-child-birthday"
              aria-invalid={!!fieldErrors.childBirthday}
              className={`${inputBase} ${fieldErrors.childBirthday ? inputError : inputNormal}`}
            />
            {fieldErrors.childBirthday && (
              <p className="text-xs font-semibold text-red-600" role="alert">
                {fieldErrors.childBirthday}
              </p>
            )}
          </div>
        </FormSection>

        <FormSection title={t('welcomePage.form.sections.tour')}>
          <div className={fieldHalf}>
            <label htmlFor="welcome-tour-date" className={labelClass}>
              {t('welcomePage.form.fields.tourDate')} *
            </label>
            <input
              type="date"
              id="welcome-tour-date"
              name="tourDate"
              required
              min={minTourDate}
              value={formData.tourDate}
              onChange={handleChange}
              data-testid="welcome-tour-date"
              aria-invalid={!!fieldErrors.tourDate}
              className={`${inputBase} ${fieldErrors.tourDate ? inputError : inputNormal}`}
            />
            {fieldErrors.tourDate && (
              <p className="text-xs font-semibold text-red-600" role="alert">
                {fieldErrors.tourDate}
              </p>
            )}
          </div>
          <div className={fieldHalf}>
            <label htmlFor="welcome-tour-time" className={labelClass}>
              {t('welcomePage.form.fields.tourTimePreference')} *
            </label>
            <select
              id="welcome-tour-time"
              name="tourTimePreference"
              required
              value={formData.tourTimePreference}
              onChange={handleChange}
              data-testid="welcome-tour-time"
              aria-invalid={!!fieldErrors.tourTimePreference}
              className={`${inputBase} ${fieldErrors.tourTimePreference ? inputError : inputNormal} cursor-pointer [&_option]:text-base`}
            >
              <option value="" disabled>
                {t('welcomePage.form.tourTime.placeholder')}
              </option>
              <option value="morning">{t('welcomePage.form.tourTime.morning')}</option>
              <option value="afternoon">{t('welcomePage.form.tourTime.afternoon')}</option>
            </select>
            {fieldErrors.tourTimePreference && (
              <p className="text-xs font-semibold text-red-600" role="alert">
                {fieldErrors.tourTimePreference}
              </p>
            )}
          </div>
        </FormSection>

        <div className={fieldFull}>
          <label htmlFor="welcome-message" className={labelClass}>
            {t('welcomePage.form.fields.message')} *
          </label>
          <textarea
            id="welcome-message"
            name="message"
            required
            rows={3}
            value={formData.message}
            onChange={handleChange}
            data-testid="welcome-message"
            aria-invalid={!!fieldErrors.message}
            className={`${inputBase} min-h-[5rem] resize-y py-2.5 ${fieldErrors.message ? inputError : inputNormal}`}
            placeholder={t('welcomePage.form.placeholders.message')}
          />
          {fieldErrors.message && (
            <p className="text-xs font-semibold text-red-600" role="alert">
              {fieldErrors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          data-testid="welcome-submit"
          className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? t('welcomePage.form.submitting') : t('welcomePage.form.submit')}
        </button>
      </div>
    </form>
  );
}
