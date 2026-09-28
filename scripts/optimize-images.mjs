// scripts/optimize-images.mjs
import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import sharp from 'sharp';

const INPUT_DIR = 'public';
const OUTPUT_DIR = 'public-optimized';
const MAX_WIDTH = 2400;       // wider than any typical display need
const WEBP_QUALITY = 82;      // sweet spot: visually lossless, ~70% smaller
const AVIF_QUALITY = 60;      // modern browsers; even smaller

const exts = new Set(['.png', '.jpg', '.jpeg']);

let processed = 0;
let originalBytes = 0;
let webpBytes = 0;

const walk = async (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);

    if (stat.isDirectory()) {
      await walk(full);
      continue;
    }

    const ext = extname(entry).toLowerCase();
    if (!exts.has(ext)) {
      // Copy non-images as-is
      const rel = full.replace(INPUT_DIR + '\\', '').replace(INPUT_DIR + '/', '');
      const out = join(OUTPUT_DIR, rel);
      mkdirSync(dirname(out), { recursive: true });
      if (!existsSync(out)) {
        // Skip — this script only handles images
      }
      continue;
    }

    const rel = full.replace(INPUT_DIR + '\\', '').replace(INPUT_DIR + '/', '');
    const outDir = join(OUTPUT_DIR, dirname(rel));
    const nameWithoutExt = basename(entry, ext);
    mkdirSync(outDir, { recursive: true });

    const img = sharp(full);
    const meta = await img.metadata();
    const width = meta.width || 0;

    // Resize down if wider than MAX_WIDTH. Never upscale.
    const resizeOpts = width > MAX_WIDTH ? { width: MAX_WIDTH } : {};

    try {
      // WebP
      const webpOut = join(outDir, `${nameWithoutExt}.webp`);
      await sharp(full)
        .resize(resizeOpts)
        .webp({ quality: WEBP_QUALITY, effort: 5 })
        .toFile(webpOut);

      // AVIF (optional — modern browsers only)
      const avifOut = join(outDir, `${nameWithoutExt}.avif`);
      await sharp(full)
        .resize(resizeOpts)
        .avif({ quality: AVIF_QUALITY, effort: 4 })
        .toFile(avifOut);

      const origSize = stat.size;
      const webpSize = statSync(webpOut).size;
      const avifSize = statSync(avifOut).size;
      originalBytes += origSize;
      webpBytes += webpSize;

      const pct = ((1 - webpSize / origSize) * 100).toFixed(0);
      console.log(
        `${(origSize / 1024 / 1024).toFixed(2).padStart(6)} MB → ` +
        `webp ${(webpSize / 1024).toFixed(0).padStart(5)} KB ` +
        `avif ${(avifSize / 1024).toFixed(0).padStart(5)} KB ` +
        `(${pct}% smaller)  ${rel}`
      );
      processed++;
    } catch (err) {
      console.error(`FAILED: ${rel} — ${err.message}`);
    }
  }
};

await walk(INPUT_DIR);

console.log('\n══════════════════════════════════════');
console.log(`Processed: ${processed} images`);
console.log(`Original:  ${(originalBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`WebP:      ${(webpBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`Savings:   ${((1 - webpBytes / originalBytes) * 100).toFixed(1)}%`);
console.log(`Output:    ./${OUTPUT_DIR}/`);
console.log('══════════════════════════════════════\n');