/**
 * Client-side metadata updater for localized titles and descriptions.
 */
'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LocalizedMetadataInput {
  title?: string;
  description?: string;
}

/**
 * Updates document title and meta description on language changes.
 */
export function useLocalizedMetadata({ title, description }: LocalizedMetadataInput) {
  const { language } = useLanguage();

  useEffect(() => {
    // English is server-rendered with canonical metadata already; skip to avoid
    // replacing the stronger SSR title/description with a weaker client variant.
    if (language === 'en') return;

    if (title) {
      document.title = title;
    }

    if (description) {
      const existing = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      const meta = existing ?? document.createElement('meta');
      meta.name = 'description';
      meta.content = description;

      if (!existing) {
        document.head.appendChild(meta);
      }
    }
  }, [title, description, language]);
}
