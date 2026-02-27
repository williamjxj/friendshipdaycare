/**
 * Fetch Google reviews for Friendship Corner Daycare and save to src/data/google-reviews.json.
 * Requires: Places API (New) enabled, GOOGLE_API_KEY in .env.local
 *
 * Run: npx tsx scripts/fetch-google-reviews.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' });
const API_KEY = process.env.GOOGLE_API_KEY;

/** Place ID from Google Maps - update if needed */
const PLACE_ID = 'ChIJ5xQJYfZ2hlQR2l2Lq0QmJYI';

interface GoogleReview {
  authorName: string;
  quote: string;
  datePublished: string;
  authorImageUrl: string | null;
}

interface PlacesReviewsResponse {
  reviews?: Array<{
    name?: string;
    authorAttribution?: { displayName?: string; photoUri?: string };
    text?: { text?: string };
    publishTime?: string;
  }>;
}

async function fetchPlaceReviews(): Promise<GoogleReview[]> {
  if (!API_KEY) {
    throw new Error('GOOGLE_API_KEY not set in .env.local');
  }

  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=reviews`;
  const res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'reviews',
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Places API error ${res.status}: ${err}`);
  }

  const data = (await res.json()) as PlacesReviewsResponse;
  const reviews = data.reviews ?? [];

  return reviews
    .filter((r) => r.text?.text && r.authorAttribution?.displayName)
    .map((r) => ({
      authorName: r.authorAttribution!.displayName ?? 'Unknown',
      quote: r.text!.text!,
      datePublished: r.publishTime
        ? new Date(r.publishTime).getFullYear().toString()
        : '',
      authorImageUrl: r.authorAttribution?.photoUri ?? null,
    }));
}

async function main() {
  try {
    const reviews = await fetchPlaceReviews();
    const outputPath = path.join(
      process.cwd(),
      'src',
      'data',
      'google-reviews.json'
    );
    fs.writeFileSync(
      outputPath,
      JSON.stringify({ reviews }, null, 2),
      'utf-8'
    );
    console.log(`Saved ${reviews.length} reviews to ${outputPath}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
