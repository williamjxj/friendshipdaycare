import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import JournalPageClient from './page-client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Friendship Daycare Journal – Monthly Highlights in Coquitlam',
  description:
    'Read Friendship Corner Daycare’s monthly journal to see Montessori activities, seasonal themes, and highlights from our Coquitlam classrooms.',
  path: '/community/journal',
});

export default function JournalPage() {
  return <JournalPageClient />;
}
