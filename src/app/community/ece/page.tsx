import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import BCEarlyLearningPageClient from './page-client';

export const metadata: Metadata = buildPageMetadata({
  title: 'BC Early Childhood Education (ECE) at Friendship Corner',
  description:
    'Learn about BC\'s Early Learning Framework, licensing, and how our Coquitlam daycare aligns with provincial standards. ECE-certified educators. Book a tour.',
  path: '/community/ece',
});

/**
 * BC Early Childhood Education (ECE) knowledge page (server wrapper).
 */
export default function BCEarlyLearningPage() {
  return <BCEarlyLearningPageClient />;
}
