import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

const MAX_TARGET = 120;
const MAX_CEILING = 140;

let hasErrors = false;
let checkedFiles = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (/\.(tsx?|jsx?|css)$/.test(entry.name)) {
      checkedFiles++;
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n').length;
      const relPath = path.relative(srcDir, fullPath);

      if (lines > MAX_CEILING) {
        console.error(`❌ [FAIL] ${relPath}: ${lines} lines (ceiling is ${MAX_CEILING})`);
        hasErrors = true;
      } else if (lines > MAX_TARGET) {
        console.warn(`⚠️ [WARN] ${relPath}: ${lines} lines (target is <= ${MAX_TARGET}, ceiling ${MAX_CEILING})`);
      } else {
        console.log(`✅ [OK]   ${relPath}: ${lines} lines`);
      }
    }
  }
}

console.log(`🔍 Checking line counts in ${srcDir} (target <= ${MAX_TARGET}, limit <= ${MAX_CEILING})...\n`);
walk(srcDir);
console.log(`\nChecked ${checkedFiles} files.`);

if (hasErrors) {
  console.error('\n💥 Line count check FAILED. Break large components into smaller focused sub-components.');
  process.exit(1);
} else {
  console.log('\n🎉 All checked files satisfy the line count limit!');
}
