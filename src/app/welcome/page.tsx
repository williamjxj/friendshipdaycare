import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { WelcomePageClient } from './page-client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Welcome — Schedule a Tour',
  description:
    'Welcome to Friendship Corner Daycare in Coquitlam. Request a tour after scanning our flyer.',
  path: '/welcome',
});

export default function WelcomePage() {
  return <WelcomePageClient />;
}
