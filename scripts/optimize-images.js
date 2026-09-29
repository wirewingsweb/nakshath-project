// ============================================================
// IMAGE OPTIMIZER SCRIPT
// Converts PNG/JPG to WebP with sharp
// ============================================================

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================
// CONFIGURATION
// ============================================================
const CONFIG = {
  inputDir: path.join(__dirname, '..', 'public'),
  backupDir: path.join(__dirname, '..', '_original_images_backup'),
  maxWidth: 1920,       // Max width in pixels
  maxHeight: 1920,      // Max height in pixels
  webpQuality: 80,      // WebP quality (1-100)
  supportedFormats: ['.png', '.jpg', '.jpeg'],
};

// ============================================================
// STATS
// ============================================================
let stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  newSize: 0,
};

// ============================================================
// MAIN FUNCTION
// ============================================================
async function optimizeImages() {
  console.log('\n🚀 Starting image optimization...\n');
  console.log(`📁 Input: ${CONFIG.inputDir}`);
  console.log(`📦 Backup: ${CONFIG.backupDir}`);
  console.log(`⚙️  WebP Quality: ${CONFIG.webpQuality}%`);
  console.log(`📐 Max Dimensions: ${CONFIG.maxWidth}×${CONFIG.maxHeight}\n`);
  console.log('─'.repeat(60));

  // Create backup directory
  if (!fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
    console.log(`✅ Created backup folder\n`);
  }

  // Get all files recursively
  const files = getAllFiles(CONFIG.inputDir);
  console.log(`📸 Found ${files.length} files\n`);

  // Process each file
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    // Skip if not supported
    if (!CONFIG.supportedFormats.includes(ext)) {
      stats.skipped++;
      continue;
    }

    // Skip if already WebP
    if (ext === '.webp') {
      stats.skipped++;
      continue;
    }

    await processImage(file);
  }

  // Print summary
  printSummary();
}

// ============================================================
// GET ALL FILES RECURSIVELY
// ============================================================
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// ============================================================
// PROCESS ONE IMAGE
// ============================================================
async function processImage(inputPath) {
  const fileName = path.basename(inputPath);
  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  try {
    // Get original size
    const originalSize = fs.statSync(inputPath).size;

    // Check if original file exists in backup
    const backupPath = path.join(CONFIG.backupDir, fileName);
    if (!fs.existsSync(backupPath)) {
      // Move original to backup
      fs.copyFileSync(inputPath, backupPath);
    }

    // Process with sharp
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Resize if too large
    let sharpInstance = image;
    if (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight) {
      sharpInstance = image.resize(CONFIG.maxWidth, CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Convert to WebP
    await sharpInstance
      .webp({ quality: CONFIG.webpQuality })
      .toFile(outputPath);

    // Get new size
    const newSize = fs.statSync(outputPath).size;

    // Delete original
    fs.unlinkSync(inputPath);

    // Update stats
    stats.processed++;
    stats.originalSize += originalSize;
    stats.newSize += newSize;

    // Print progress
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    const originalMB = (originalSize / 1024 / 1024).toFixed(2);
    const newKB = (newSize / 1024).toFixed(0);

    console.log(
      `✅ ${fileName.padEnd(45)} ${originalMB.padStart(6)} MB → ${newKB.padStart(5)} KB (-${savings}%)`
    );
  } catch (error) {
    stats.errors++;
    console.log(`❌ ${fileName}: ${error.message}`);
  }
}

// ============================================================
// PRINT SUMMARY
// ============================================================
function printSummary() {
  console.log('\n' + '─'.repeat(60));
  console.log('\n🎉 OPTIMIZATION COMPLETE!\n');

  const totalOriginalMB = (stats.originalSize / 1024 / 1024).toFixed(2);
  const totalNewMB = (stats.newSize / 1024 / 1024).toFixed(2);
  const totalSavedMB = ((stats.originalSize - stats.newSize) / 1024 / 1024).toFixed(2);
  const savingsPercent = stats.originalSize > 0
    ? ((stats.originalSize - stats.newSize) / stats.originalSize * 100).toFixed(1)
    : 0;

  console.log(`📊 Statistics:`);
  console.log(`   ✅ Processed:  ${stats.processed} images`);
  console.log(`   ⏭️  Skipped:    ${stats.skipped} files`);
  console.log(`   ❌ Errors:     ${stats.errors} files`);
  console.log('');
  console.log(`💾 Size:`);
  console.log(`   Before:  ${totalOriginalMB} MB`);
  console.log(`   After:   ${totalNewMB} MB`);
  console.log(`   Saved:   ${totalSavedMB} MB (-${savingsPercent}%)`);
  console.log('');
  console.log(`📦 Original files backed up to: _original_images_backup/`);
  console.log('');
  console.log('⚠️  NEXT STEPS:');
  console.log('   1. Update code: .png → .webp (Ctrl+Shift+H in VS Code)');
  console.log('   2. Test the website');
  console.log('   3. Delete backup folder if all good');
  console.log('');
}

// ============================================================
// RUN
// ============================================================
optimizeImages().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});