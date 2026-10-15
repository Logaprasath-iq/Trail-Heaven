const fs = require('fs');
const https = require('https');

const url = process.argv[2];
const dest = process.argv[3] || 'scratch/preview.jpg';

if (!url) {
  console.error('Usage: node download-img.js <url> [dest]');
  process.exit(1);
}

fetch(url)
  .then(res => res.arrayBuffer())
  .then(buf => {
    fs.writeFileSync(dest, Buffer.from(buf));
    console.log(`Saved ${dest} (${buf.byteLength} bytes)`);
  })
  .catch(err => {
    console.error('Download failed:', err);
    process.exit(1);
  });
