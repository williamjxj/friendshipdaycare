import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { FundingPageClient } from './page-client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Funding & Subsidies',
  description: 'BC Affordable Child Care Benefit (ACCB) and ChildCareBC $10/day program at Friendship Corner Daycare in Coquitlam. Tuition & subsidy info. Contact us for rates.',
  path: '/funding'
});

export default function FundingPage() {
  return <FundingPageClient />;
}
