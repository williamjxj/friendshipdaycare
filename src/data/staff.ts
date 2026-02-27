/**
 * Staff members for /our-team page.
 * Per data-model.md: id, name, photo, credentials, bio, order, locale
 */

export interface StaffMember {
  id: string;
  name: string;
  photo: string;
  credentials: string;
  bio: string;
  order: number;
  locale: string;
}

/** Placeholder - replace with real staff data */
export const staffByLocale: Record<string, StaffMember[]> = {
  en: [],
  zh: [],
  ko: [],
  es: [],
  fr: []
};
