const fs = require('fs');

function inspectFooters(file) {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /<div class="[^"]*border-t[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
  let m;
  console.log(`=== ${file} ===`);
  let count = 0;
  while ((m = regex.exec(content)) !== null && count < 6) {
    console.log('CLASS:', m[0].split('>')[0]);
    console.log('CONTENT:', m[1].trim().replace(/\s+/g, ' ').slice(0, 100));
    count++;
  }
}

inspectFooters('about.html');
inspectFooters('buying-guides.html');
inspectFooters('blog.html');
