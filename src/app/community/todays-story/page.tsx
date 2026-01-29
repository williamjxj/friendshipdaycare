import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import TodaysStoryContent from './story-content';

export const metadata: Metadata = buildPageMetadata({
  title: "Today's Story – Weekly Bible Stories at Friendship Daycare",
  description:
    'Watch weekly Bible story videos and see how Friendship Corner Daycare in Coquitlam weaves kindness, courage, and love into our curriculum.',
  path: '/community/todays-story',
});

export default function TodaysStoryPage() {
  return <TodaysStoryContent />;
}
