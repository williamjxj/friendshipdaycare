import { notFound } from 'next/navigation';

/** Dev artifact route - returns 404. Replaced per competitive analysis (FR-007). */
export default function GammaPage() {
  notFound();
}
