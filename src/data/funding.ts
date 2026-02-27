/**
 * Funding/fees page content: ACCB, ChildCareBC, tuition inquiry.
 * Per data-model.md: sections, leadCaptureForm?, locale
 */

export interface FundingSection {
  id: string;
  title: string;
  content: string;
}

export interface FundingContent {
  sections: FundingSection[];
  locale: string;
}

/** Placeholder - replace with real funding content */
export const fundingByLocale: Record<string, FundingContent> = {
  en: { sections: [], locale: 'en' },
  zh: { sections: [], locale: 'zh' },
  ko: { sections: [], locale: 'ko' },
  es: { sections: [], locale: 'es' },
  fr: { sections: [], locale: 'fr' }
};
