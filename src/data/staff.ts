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

/** Educator profiles for Our Team page. Replace placeholder photos with real staff photos when available. */
const STAFF_EN: StaffMember[] = [
  {
    id: '1',
    name: 'Director & Lead Educator',
    photo: '/logo.png',
    credentials: 'ECE License, Montessori Certified',
    bio: 'Dedicated to nurturing young minds through the Montessori method. Over 15 years of experience in early childhood education.',
    order: 1,
    locale: 'en',
  },
  {
    id: '2',
    name: 'Lead Montessori Educator',
    photo: '/logo.png',
    credentials: 'ECE License, Montessori Training',
    bio: 'Passionate about creating a prepared environment where children discover independence and joy in learning.',
    order: 2,
    locale: 'en',
  },
];

export const staffByLocale: Record<string, StaffMember[]> = {
  en: STAFF_EN,
  zh: STAFF_EN,
  ko: STAFF_EN,
  es: STAFF_EN,
  fr: STAFF_EN,
};
