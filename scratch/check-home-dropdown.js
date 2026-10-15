const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const match = content.match(/<div class="relative group" id="home-dropdown-nav">([\s\S]*?)<\/div>\s*<\/div>/);
  if (match) {
    console.log(`=== ${f} ===`);
    console.log(match[0].trim());
  } else {
    console.log(`=== ${f}: NOT MATCHED ===`);
  }
});
