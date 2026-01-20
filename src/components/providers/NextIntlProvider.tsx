'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import enMessages from '@/messages/en.json';
import zhMessages from '@/messages/zh.json';
import koMessages from '@/messages/ko.json';
import esMessages from '@/messages/es.json';
import frMessages from '@/messages/fr.json';

interface NextIntlProviderProps {
  children: ReactNode;
  locale?: string;
}

const messagesMap = {
  en: enMessages,
  zh: zhMessages,
  ko: koMessages,
  es: esMessages,
  fr: frMessages,
};

/**
 * Client-side provider for next-intl translations
 * Wraps children with NextIntlClientProvider to enable useTranslations hook
 * Note: This provider should be wrapped by LanguageProvider to sync language
 */
export function NextIntlProvider({ children, locale = 'en' }: NextIntlProviderProps) {
  const messages = messagesMap[locale as keyof typeof messagesMap] || enMessages;
  const fallbackMessage =
    messages.common?.translationFallback ||
    enMessages.common?.translationFallback ||
    'Translation unavailable.';

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      getMessageFallback={() => fallbackMessage}
      onError={() => undefined}
    >
      {children}
    </NextIntlClientProvider>
  );
}

/**
 * Sync component that updates NextIntlProvider with current language from LanguageContext
 * This must be used inside LanguageProvider
 */
export function NextIntlProviderSync({ children }: { children: ReactNode }) {
  // This will be implemented to sync with LanguageContext
  // For now, we'll handle it differently
  return <>{children}</>;
}

