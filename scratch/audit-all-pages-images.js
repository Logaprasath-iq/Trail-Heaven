const fs = require('fs');
const path = require('path');

const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

console.log('Auditing ' + files.length + ' HTML files for duplicate images on the same page...\n');

let hasIssue = false;

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const imgRegex = /https:\/\/images\.unsplash\.com\/([^?\"']+)/g;
  let m;
  const urls = [];
  while ((m = imgRegex.exec(content)) !== null) {
    urls.push(m[1]);
  }
  const counts = {};
  urls.forEach(id => counts[id] = (counts[id] || 0) + 1);
  const dupes = Object.entries(counts).filter(([_, count]) => count > 1);

  if (dupes.length > 0) {
    console.log(`❌ ${file} has duplicate images:`, dupes);
    hasIssue = true;
  } else {
    console.log(`✅ ${file} : ${urls.length} images, 0 duplicates`);
  }
});

if (!hasIssue) {
  console.log('\n🎉 ALL PAGES HAVE 0 DUPLICATE IMAGES WITHIN THE PAGE!');
} else {
  console.log('\n⚠️ Some pages have duplicate images that need attention.');
}
