import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import TodaysStoryContent from './story-content';

export const metadata: Metadata = buildPageMetadata({
  title: "Today's Story – Weekly Bible Stories at Friendship Daycare",
  description:
    'Watch weekly Bible story videos at Friendship Corner Daycare in Coquitlam. Gentle stories weave kindness, courage & love into our Montessori curriculum.',
  path: '/community/todays-story',
});

export default function TodaysStoryPage() {
  return <TodaysStoryContent />;
}
