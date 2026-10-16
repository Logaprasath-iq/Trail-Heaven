const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataJsPath = path.join(root, 'assets/js/data.js');
let content = fs.readFileSync(dataJsPath, 'utf8');

const pairings = {
  'camping-tent-01': ['sleeping-bag-boreal', 'light-beacon-1200'],
  'backpack-apex-65': ['gear-carbon-poles', 'filter-pureflow-4l'],
  'sleeping-bag-boreal': ['sleep-pad-thermalrest', 'camping-tent-01'],
  'tent-cascade-2p': ['sleep-pad-thermalrest', 'pack-ridgeline-38'],
  'tent-havenwood-6p': ['light-beacon-1200', 'cook-castiron-skillet'],
  'pack-ridgeline-38': ['gear-carbon-poles', 'wear-storm-shell'],
  'sleep-pad-thermalrest': ['sleeping-bag-boreal', 'tent-cascade-2p'],
  'light-beacon-1200': ['camping-tent-01', 'furniture-chair-aero'],
  'light-headlamp-neo': ['nav-sighting-compass', 'pack-ridgeline-38'],
  'cook-titanium-nomad': ['filter-pureflow-4l', 'backpack-apex-65'],
  'cook-castiron-skillet': ['tent-havenwood-6p', 'furniture-chair-aero'],
  'gear-carbon-poles': ['backpack-apex-65', 'wear-storm-shell'],
  'wear-storm-shell': ['gear-carbon-poles', 'pack-ridgeline-38'],
  'filter-pureflow-4l': ['cook-titanium-nomad', 'backpack-apex-65'],
  'furniture-chair-aero': ['tent-havenwood-6p', 'light-beacon-1200'],
  'nav-sighting-compass': ['gear-carbon-poles', 'light-headlamp-neo']
};

for (const [id, pairs] of Object.entries(pairings)) {
  const idPattern = new RegExp(`id:\\s*"${id}"[\\s\\S]*?gallery:\\s*\\[[\\s\\S]*?\\]`, 'm');
  const match = content.match(idPattern);
  if (!match) {
    console.error(`Could not match product ${id}`);
    process.exit(1);
  }
  const original = match[0];
  if (!original.includes('pairedWith:')) {
    const pairedStr = `,\n      pairedWith: [\n        "${pairs[0]}",\n        "${pairs[1]}"\n      ]`;
    const updated = original + pairedStr;
    content = content.replace(original, updated);
  }
}

fs.writeFileSync(dataJsPath, content, 'utf8');
console.log('Successfully updated assets/js/data.js with pairedWith arrays for all 16 products.');
