const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'audit' && file !== 'candidates') {
        results = results.concat(walk(full));
      }
    } else {
      if (full.endsWith('.html') || full.endsWith('.js') || full.endsWith('.json')) {
        results.push(full);
      }
    }
  });
  return results;
}

const files = walk('.');
const allUrls = new Set();
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const m = content.match(/https:\/\/(images\.unsplash\.com|i\.pinimg\.com)[^\s"'`\)]+/g);
  if (m) {
    m.forEach(u => allUrls.add(u.replace(/[,\);]+$/, '')));
  }
});
console.log('Total unique URLs found across project:', allUrls.size);
const arr = Array.from(allUrls);
console.log('--- PINIMG ---');
arr.filter(u => u.includes('pinimg')).forEach(u => console.log(u));
console.log('--- UNSPLASH ---');
console.log('Total unsplash:', arr.filter(u => u.includes('unsplash')).length);
