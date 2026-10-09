/**
 * Generates a maskable PWA icon from the existing Android icon.
 *
 * Maskable icons need a safe zone: the important artwork stays inside the
 * center 80% (40% padding) because platforms crop the edges to various shapes.
 * This script places the logo at ~62% scale on the brand green background.
 *
 * Run: npx tsx scripts/generate-maskable-icon.ts
 */
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SOURCE = 'public/icons/android-chrome-512x512.png';
const OUT_DIR = 'public/icons';
const OUT_FILE = `${OUT_DIR}/icon-maskable-512.png`;
const SIZE = 512;
const BRAND_GREEN = '#2C5F4D';
const CONTENT_SCALE = 0.62;

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const contentSize = Math.round(SIZE * CONTENT_SCALE);
  const logo = await sharp(SOURCE)
    .resize(contentSize, contentSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  await sharp({
    create: { width: SIZE, height: SIZE, channels: 4, background: BRAND_GREEN },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(OUT_FILE);

  console.log(`Maskable icon written to ${OUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
