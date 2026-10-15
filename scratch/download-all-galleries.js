const fs = require('fs');
const path = require('path');
const TrailHavenData = require('../assets/js/data.js');

const outDir = path.join(__dirname, 'audit');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function downloadAll() {
  for (const p of TrailHavenData.products) {
    for (let i = 0; i < p.gallery.length; i++) {
      const url = p.gallery[i];
      const filename = `${p.id}_${i}.jpg`;
      const dest = path.join(outDir, filename);
      if (!fs.existsSync(dest)) {
        try {
          const res = await fetch(url);
          const buf = await res.arrayBuffer();
          fs.writeFileSync(dest, Buffer.from(buf));
          console.log(`Downloaded ${filename} (${buf.byteLength} bytes)`);
        } catch (e) {
          console.error(`Failed ${filename}: ${e.message}`);
        }
      } else {
        console.log(`Already exists: ${filename}`);
      }
    }
  }
  console.log('Finished downloading all gallery images!');
}

downloadAll();
