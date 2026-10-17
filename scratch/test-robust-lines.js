function testRange(name, text) {
  console.log(`\nTesting: ${name} (len=${text.length})`);
  let allPass = true;
  for (const w of [38, 39, 40, 41, 42, 43, 44]) {
    const words = text.split(' ');
    const lines = [];
    let cur = '';
    for (const wd of words) {
      if ((cur + ' ' + wd).trim().length <= w) {
        cur = (cur + ' ' + wd).trim();
      } else {
        lines.push(cur);
        cur = wd;
      }
    }
    if (cur) lines.push(cur);
    const lastLineLen = lines[lines.length - 1].length;
    const isGood = lines.length === 4 && lastLineLen >= 18;
    if (!isGood) allPass = false;
    console.log(`  w=${w}: ${lines.length} lines, L4=${lastLineLen} chars -> ${isGood ? 'OK' : 'FAIL'}`);
  }
  return allPass;
}

// Card 1
testRange("Card 1 (Goose Down)", "100% certified by the Responsible Down Standard. High loft-to-weight ratio compresses into a 2-liter stuff sack yet expands instantly down to -15°C.");

// Card 2 candidates
const c2_list = [
  "Zero metallic aftertaste, 45% lighter than stainless steel, impervious to monsoon humidity, and boils glacier runoff in 105 seconds at freezing altitudes.",
  "Zero toxic metallic aftertaste, 45% lighter than steel, completely corrosion-proof in tropical rains, and boils mountain water in 105 alpine seconds.",
  "Zero metallic aftertaste, 45% lighter than steel, 100% rustproof in humid monsoons, and boils glacier runoff in 105 freezing alpine seconds.",
  "Zero metallic aftertaste, 45% lighter than steel, fully corrosion-proof in humid rains, boiling water rapidly in 105 freezing alpine seconds."
];
c2_list.forEach((t, i) => testRange(`Card 2 Cand ${i+1}`, t));

// Card 3 candidates
const c3_list = [
  "High-tenacity nylon woven with reinforced square cross-hatch threads that prevent tears from propagating across rugged granite scree fields.",
  "High-tenacity nylon woven with reinforced square cross-hatch threads that stop tears from propagating across rugged Himalayan scree fields.",
  "High-tenacity nylon woven with reinforced square cross-hatch threads, preventing puncture tear propagation across rugged granite scree fields."
];
c3_list.forEach((t, i) => testRange(`Card 3 Cand ${i+1}`, t));

// Card 4 candidates
const c4_list = [
  "Engineered with differing diameter tubing to optimize interior shoulder space while dispersing wind shear stress across alpine ridge pole joints.",
  "Engineered with differing diameter tubing to optimize interior space while dispersing gale wind shear stress across alpine ridge cross-pole joints.",
  "Engineered with differing diameter tubing to maximize interior headroom while dispersing high gale wind shear along critical ridge frame joints."
];
c4_list.forEach((t, i) => testRange(`Card 4 Cand ${i+1}`, t));
