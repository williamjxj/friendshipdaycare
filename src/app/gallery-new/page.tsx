import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { GalleryPageClient } from './page-client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Gallery – Our Coquitlam Daycare',
  description:
    'See the classrooms, Montessori materials, playground, and daily spaces at Friendship Corner Daycare in Coquitlam, BC.',
  path: '/gallery-new',
});

export default function GalleryTopPage() {
  return <GalleryPageClient />;
}
