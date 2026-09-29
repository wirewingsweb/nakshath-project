// ============================================================
// FIX SPACES → HYPHENS in image paths
// ============================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  projectRoot: path.join(__dirname, '..'),
  backupDir: path.join(__dirname, '..', '_backup_before_space_fix'),
  skipDirs: ['node_modules', '.git', 'dist', 'build', '_original_images_backup', '_original_code_backup', '_backup_before_fix', '_backup_before_space_fix', 'scripts'],
  targets: [
    { dir: 'src', extensions: ['.jsx', '.js'] },
    { dir: '.', extensions: ['.html'] },
  ],
};

let stats = { scanned: 0, modified: 0, replacements: 0 };

if (!fs.existsSync(CONFIG.backupDir)) {
  fs.mkdirSync(CONFIG.backupDir, { recursive: true });
}

console.log('\n🔧 Fixing spaces in image paths...\n');
console.log('─'.repeat(70));

CONFIG.targets.forEach((target) => {
  const dir = path.join(CONFIG.projectRoot, target.dir);
  if (fs.existsSync(dir)) {
    console.log(`📂 Scanning: ${target.dir}\n`);
    walk(dir, target.extensions);
  }
});

console.log('\n' + '─'.repeat(70));
console.log('\n🎉 DONE!\n');
console.log(`📊 Files scanned:      ${stats.scanned}`);
console.log(`✏️  Files modified:     ${stats.modified}`);
console.log(`🔄 Total replacements: ${stats.replacements}\n`);

function walk(dir, extensions) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!CONFIG.skipDirs.includes(entry.name)) {
        walk(fullPath, extensions);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        processFile(fullPath);
      }
    }
  }
}

function processFile(filePath) {
  stats.scanned++;

  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;
    const relative = path.relative(CONFIG.projectRoot, filePath);

    // Match src="/..." or src='...' or src=`...` (paths starting with /)
    // Replace spaces with hyphens ONLY inside image paths
    const regex = /(["'`])(\/[^"'`]+?\.webp)\1/g;

    let count = 0;
    content = content.replace(regex, (match, quote, urlPath) => {
      if (urlPath.includes(' ')) {
        count++;
        const newPath = urlPath.replace(/\s+/g, '-');
        return `${quote}${newPath}${quote}`;
      }
      return match;
    });

    if (content !== original) {
      const backupPath = path.join(CONFIG.backupDir, relative.replace(/[\\/]/g, '_'));
      fs.writeFileSync(backupPath, original, 'utf-8');
      fs.writeFileSync(filePath, content, 'utf-8');

      stats.modified++;
      stats.replacements += count;
      console.log(`  ✅ ${relative.padEnd(55)} (${count} fixes)`);
    }
  } catch (err) {
    console.log(`  ❌ ${filePath}: ${err.message}`);
  }
}