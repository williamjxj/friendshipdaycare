import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import JournalPageClient from './page-client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Friendship Daycare Journal – Monthly Highlights in Coquitlam',
  description:
    'Read Friendship Corner Daycare’s monthly journal: Montessori activities, seasonal themes & highlights from our Coquitlam classrooms. Licensed daycare since 2008.',
  path: '/community/journal',
});

export default function JournalPage() {
  return <JournalPageClient />;
}
