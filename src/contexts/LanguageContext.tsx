'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from 'react';

// Import all message files
import enMessages from '@/messages/en.json';
import zhMessages from '@/messages/zh.json';
import koMessages from '@/messages/ko.json';
import esMessages from '@/messages/es.json';
import frMessages from '@/messages/fr.json';

type Language = 'en' | 'zh' | 'ko' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  hasTranslation: (key: string) => boolean;
  messages: Record<string, any>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const messages = {
  en: enMessages,
  zh: zhMessages,
  ko: koMessages,
  es: esMessages,
  fr: frMessages,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  const resolveValue = (source: Record<string, any>, key: string) => {
    const keys = key.split('.');
    let value: any = source;

    for (const part of keys) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return undefined;
      }
    }

    return value;
  };

  const hasTranslation = (key: string): boolean => {
    const currentLanguage = isHydrated ? language : 'en';
    return resolveValue(messages[currentLanguage], key) !== undefined;
  };

  // Load saved language from localStorage on mount
  useEffect(() => {
    setIsHydrated(true);
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && messages[savedLanguage]) {
      setLanguage(savedLanguage);
      return;
    }

    const browserLanguage = navigator.language?.split('-')[0] as Language | undefined;
    if (browserLanguage && messages[browserLanguage]) {
      setLanguage(browserLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const currentLanguage = isHydrated ? language : 'en';
    const localizedValue = resolveValue(messages[currentLanguage], key);

    if (typeof localizedValue === 'string') {
      return localizedValue;
    }

    const fallbackValue = resolveValue(messages.en, key);
    if (typeof fallbackValue === 'string') {
      return fallbackValue;
    }

    const fallbackMessage =
      resolveValue(messages[currentLanguage], 'common.translationFallback') ??
      resolveValue(messages.en, 'common.translationFallback');

    return typeof fallbackMessage === 'string' ? fallbackMessage : key;
  };

  const value = {
    language: isHydrated ? language : 'en' as Language,
    setLanguage,
    t,
    hasTranslation,
    messages: messages[isHydrated ? language : 'en'],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Export language configurations
export const languageConfig = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
];
