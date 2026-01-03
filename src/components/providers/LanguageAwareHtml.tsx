'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';

/**
 * Component that updates the HTML lang attribute based on current language
 * This should wrap the html element or be used to sync the lang attribute
 */
export function LanguageAwareHtml({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  
  // Map language codes to HTML lang attributes
  const langMap: Record<string, string> = {
    en: 'en',
    zh: 'zh-CN',
    ko: 'ko',
    es: 'es',
    fr: 'fr',
  };

  // Update document language
  if (typeof document !== 'undefined') {
    document.documentElement.lang = langMap[language] || 'en';
  }

  return <>{children}</>;
}

