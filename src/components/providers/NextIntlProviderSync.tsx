'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import enMessages from '@/messages/en.json';
import zhMessages from '@/messages/zh.json';
import koMessages from '@/messages/ko.json';
import esMessages from '@/messages/es.json';
import frMessages from '@/messages/fr.json';

const messagesMap = {
  en: enMessages,
  zh: zhMessages,
  ko: koMessages,
  es: esMessages,
  fr: frMessages,
};

/**
 * Sync component that updates NextIntlProvider with current language from LanguageContext
 * This must be used inside LanguageProvider
 */
export function NextIntlProviderSync({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const messages = messagesMap[language] || enMessages;

  return (
    <NextIntlClientProvider locale={language} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

