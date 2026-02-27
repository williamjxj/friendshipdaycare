import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { FundingPageClient } from './page-client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Funding & Subsidies',
  description: 'BC Affordable Child Care Benefit (ACCB) and ChildCareBC $10/day program. Tuition and funding options at Friendship Corner Daycare.',
  path: '/funding'
});

export default function FundingPage() {
  return <FundingPageClient />;
}
