import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  projectRoot: path.join(__dirname, '..'),
  targets: [
    { dir: 'src', extensions: ['.jsx', '.js', '.tsx', '.ts'] },
    { dir: '.', extensions: ['.html'] },
  ],
  skipDirs: ['node_modules', '.git', 'dist', 'build', '_original_images_backup', 'scripts'],
  backupDir: path.join(__dirname, '..', '_original_code_backup'),
};

let stats = {
  filesScanned: 0,
  filesModified: 0,
  replacements: 0,
  backupCreated: false,
};

function updateImagePaths() {
  console.log('\n🚀 Updating image paths (.png → .webp)...\n');
  console.log(`📁 Project Root: ${CONFIG.projectRoot}`);
  console.log(`📦 Backup Dir: ${CONFIG.backupDir}\n`);
  console.log('─'.repeat(70));

  if (!fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
    stats.backupCreated = true;
    console.log(`✅ Created backup folder\n`);
  }

  CONFIG.targets.forEach((target) => {
    const targetDir = path.join(CONFIG.projectRoot, target.dir);
    if (!fs.existsSync(targetDir)) {
      console.log(`⚠️  Skipping ${target.dir} (not found)\n`);
      return;
    }

    console.log(`📂 Scanning: ${target.dir}\n`);
    processDirectory(targetDir, target.extensions);
  });

  printSummary();
}

function processDirectory(dir, extensions) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (CONFIG.skipDirs.includes(entry.name)) {
        continue;
      }
      processDirectory(fullPath, extensions);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        processFile(fullPath);
      }
    }
  }
}

function processFile(filePath) {
  stats.filesScanned++;

  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    const relativePath = path.relative(CONFIG.projectRoot, filePath);

    const pngRegex = /(["'`])([^"'`\s]*?)\.png\1/g;

    let matchCount = 0;
    content = content.replace(pngRegex, (match, quote, pathStart) => {
      matchCount++;
      return `${quote}${pathStart}.webp${quote}`;
    });

    if (content !== originalContent) {
      const backupPath = path.join(
        CONFIG.backupDir,
        relativePath.replace(/[\\/]/g, '_')
      );
      fs.writeFileSync(backupPath, originalContent, 'utf-8');
      fs.writeFileSync(filePath, content, 'utf-8');

      stats.filesModified++;
      stats.replacements += matchCount;

      console.log(`  ✅ ${relativePath.padEnd(60)} (${matchCount} replacements)`);
    }
  } catch (error) {
    console.log(`  ❌ ${filePath}: ${error.message}`);
  }
}

function printSummary() {
  console.log('\n' + '─'.repeat(70));
  console.log('\n🎉 UPDATE COMPLETE!\n');

  console.log(`📊 Statistics:`);
  console.log(`   📂 Files scanned:      ${stats.filesScanned}`);
  console.log(`   ✏️  Files modified:     ${stats.filesModified}`);
  console.log(`   🔄 Total replacements: ${stats.replacements}`);
  console.log('');

  if (stats.backupCreated) {
    console.log(`📦 Original code backed up to: _original_code_backup/`);
    console.log('');
  }
}

updateImagePaths();