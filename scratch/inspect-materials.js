const fs = require('fs');
const html = fs.readFileSync('about.html', 'utf8');

const regex = /<!-- Material (\d): ([^\n]+)[\s\S]*?<div class="p-5">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="px-5 pb-5 pt-0([^>]*)>([\s\S]*?)<\/div>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('==================================================');
  console.log(`Material ${m[1]}: ${m[2]}`);
  console.log('CONTENT:');
  console.log(m[3].trim());
  console.log('BOTTOM BAR CLASSES:', m[4].trim());
  console.log('BOTTOM BAR:');
  console.log(m[5].trim());
}
