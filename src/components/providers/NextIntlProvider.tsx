'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import enMessages from '@/messages/en.json';

interface NextIntlProviderProps {
  children: ReactNode;
  locale?: string;
}

/**
 * Client-side provider for next-intl translations
 * Wraps children with NextIntlClientProvider to enable useTranslations hook
 */
export function NextIntlProvider({ children, locale = 'en' }: NextIntlProviderProps) {
  // Load messages based on locale
  // For now, defaulting to English. In a full i18n setup, you'd dynamically import based on locale
  const messages = enMessages;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

