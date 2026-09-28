import sharp from "sharp";
import { readdir, mkdir, stat, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const OUTPUT_DIR = path.join(__dirname, "..", "public-optimized");
const REPORT_PATH = path.join(__dirname, "..", "image-optimization-report.txt");

// Settings — tweak if needed
const MAX_WIDTH = 2000;
const QUALITY = 82;
const SKIP_UNDER = 150 * 1024; // skip files under 150 KB

const report = [];

async function processImage(filename) {
  const inputPath = path.join(PUBLIC_DIR, filename);
  const stats = await stat(inputPath);

  if (stats.size < SKIP_UNDER) {
    const line = `SKIP  ${filename}  (already ${(stats.size / 1024).toFixed(0)} KB)`;
    console.log(line);
    report.push(line);
    return;
  }

  const outputName = filename.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const outputPath = path.join(OUTPUT_DIR, outputName);
  const before = stats.size;

  try {
    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath);

    const after = (await stat(outputPath)).size;
    const saved = ((1 - after / before) * 100).toFixed(0);
    const flag = saved > 60 ? "GOOD " : "OK   ";
    const line = `${flag} ${filename} -> ${outputName}   ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB  (saved ${saved}%)`;
    console.log(line);
    report.push(line);
  } catch (err) {
    const line = `FAIL  ${filename}  -- ${err.message}`;
    console.log(line);
    report.push(line);
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(PUBLIC_DIR))
    .filter((f) => /\.(png|jpg|jpeg)$/i.test(f))
    .sort();

  console.log(`\nProcessing ${files.length} images from /public\n`);

  const BATCH = 4;
  for (let i = 0; i < files.length; i += BATCH) {
    await Promise.all(files.slice(i, i + BATCH).map(processImage));
  }

  await writeFile(REPORT_PATH, report.join("\n"), "utf8");

  console.log(`\nDone. Optimized images are in ./public-optimized/`);
  console.log(`Report saved to ./image-optimization-report.txt`);
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
