import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { OurTeamPageClient } from './page-client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Our Team',
  description: 'Meet the educators at Friendship Corner Daycare in Coquitlam. Our dedicated ECE-certified team provides quality Montessori care.',
  path: '/our-team'
});

export default function OurTeamPage() {
  return <OurTeamPageClient />;
}
