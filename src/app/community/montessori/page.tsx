import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import MontessoriPageClient from './page-client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Montessori Education at Friendship Corner Daycare',
  description:
    'Learn about Montessori principles, benefits, and how we apply them at our licensed Coquitlam daycare for children 30 months to school age. Book a tour.',
  path: '/community/montessori',
});

/**
 * Montessori education knowledge page (server wrapper).
 */
export default function MontessoriPage() {
  return <MontessoriPageClient />;
}
