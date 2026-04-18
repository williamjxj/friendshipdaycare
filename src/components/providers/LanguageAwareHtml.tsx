'use client';

import { useEffect, type ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/** Map app locale codes to BCP 47 `lang` values on `<html>`. */
const LANG_MAP: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
  ko: 'ko',
  es: 'es',
  fr: 'fr',
};

/**
 * Syncs `document.documentElement.lang` with the active language (client-only).
 */
export function LanguageAwareHtml({ children }: { children: ReactNode }) {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = LANG_MAP[language] || 'en';
  }, [language]);

  return <>{children}</>;
}

