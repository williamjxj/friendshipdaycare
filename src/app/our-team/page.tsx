import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { OurTeamPageClient } from './page-client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Our Team',
  description: 'Meet the educators at Friendship Corner Daycare in Coquitlam, BC. ECE-certified team providing quality Montessori care since 2008. Book a tour to meet us.',
  path: '/our-team'
});

export default function OurTeamPage() {
  return <OurTeamPageClient />;
}
