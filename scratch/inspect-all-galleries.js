const fs = require('fs');
const TrailHavenData = require('../assets/js/data.js');

async function inspectImages() {
  for (const p of TrailHavenData.products) {
    console.log(`\n=== Product: ${p.id} (${p.name}) [${p.category}] ===`);
    for (let i = 0; i < p.gallery.length; i++) {
      const url = p.gallery[i];
      console.log(`  [${i}] ${url}`);
    }
  }
}
inspectImages();
