/**
 * Generates welcome flyer QR assets and composites QR onto public/assets/flyer-0320.png.
 *
 * Run: npm run generate:welcome-qr
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import QRCode from 'qrcode';
import sharp from 'sharp';

/** Canonical site URL (www) — matches businessProfile.url */
const WELCOME_URL = 'https://www.friendshipdaycare.com/welcome?source=flyer-0320';
const ROOT = process.cwd();
const QR_DIR = path.join(ROOT, 'public/assets/qr');
const FLYER_PATH = path.join(ROOT, 'public/assets/flyer-0320.png');
const QR_PNG = path.join(QR_DIR, 'welcome-flyer-0320.png');
const QR_SVG = path.join(QR_DIR, 'welcome-flyer-0320.svg');

async function main() {
  await fs.mkdir(QR_DIR, { recursive: true });

  await QRCode.toFile(QR_PNG, WELCOME_URL, {
    width: 512,
    margin: 2,
    errorCorrectionLevel: 'M',
  });
  await fs.writeFile(QR_SVG, await QRCode.toString(WELCOME_URL, { type: 'svg', margin: 2 }));

  const flyer = sharp(FLYER_PATH);
  const meta = await flyer.metadata();
  const width = meta.width ?? 1200;
  const height = meta.height ?? 1600;
  const qrSize = Math.round(width * 0.14);
  const padding = Math.round(width * 0.03);

  const qrBuffer = await sharp(QR_PNG).resize(qrSize, qrSize).png().toBuffer();
  const left = width - qrSize - padding;
  const top = height - qrSize - padding;
  const tmpPath = `${FLYER_PATH}.tmp`;

  await flyer.composite([{ input: qrBuffer, left, top }]).toFile(tmpPath);
  await fs.rename(tmpPath, FLYER_PATH);

  console.log('Wrote', QR_PNG);
  console.log('Wrote', QR_SVG);
  console.log('Updated', FLYER_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
