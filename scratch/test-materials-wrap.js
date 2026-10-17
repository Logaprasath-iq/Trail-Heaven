// Test line wrapping simulation for Section 4C cards
// Card content width is approx 246px.
// Average characters per line at 12px sans-serif is ~36-40 chars.

function simulateWrap(text, maxCharsPerLine = 38) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

const card1 = "100% certified by the Responsible Down Standard. High loft-to-weight ratio compresses into a 2-liter stuff sack yet expands instantly down to -15°C.";
console.log('CARD 1:');
console.log(simulateWrap(card1));
console.log('Total chars:', card1.length);

// Card 2 candidates
const card2_candidates = [
  "Zero toxic metallic aftertaste, 45% lighter than steel, completely corrosion-proof in humid monsoons, boiling water rapidly in 105 alpine seconds.",
  "Zero toxic metallic aftertaste, 45% lighter than stainless steel, corrosion-proof in monsoon humidity, and boils water swiftly in 105 alpine seconds.",
  "Zero metallic aftertaste, 45% lighter than steel, impervious to monsoon humidity, and boils glacier runoff in 105 seconds at high freezing altitudes."
];

for (const [i, c] of card2_candidates.entries()) {
  console.log(`CARD 2 CANDIDATE ${i + 1} (len=${c.length}):`);
  console.log(simulateWrap(c));
}

// Card 3 candidates
const card3_candidates = [
  "High-tenacity nylon woven with reinforced square cross-hatch threads, preventing tear propagation across sharp granite scree and boulder fields.",
  "High-tenacity nylon woven with reinforced square cross-hatch threads that prevent tear propagation across jagged Himalayan scree and boulder fields.",
  "High-tenacity nylon woven with reinforced square cross-hatch grid threads, stopping puncture tears from propagating across jagged scree fields."
];

for (const [i, c] of card3_candidates.entries()) {
  console.log(`CARD 3 CANDIDATE ${i + 1} (len=${c.length}):`);
  console.log(simulateWrap(c));
}

// Card 4 candidates
const card4_candidates = [
  "Engineered with differing diameter tubing to optimize interior headspace while dispersing severe gale shear stress across ridge frame intersections.",
  "Engineered with variable diameter tubing to maximize interior shoulder space while absorbing high-velocity wind shear across all frame intersections.",
  "Engineered with variable diameter tubing to maximize interior livable space while dissipating high gale wind shear along critical frame intersections."
];

for (const [i, c] of card4_candidates.entries()) {
  console.log(`CARD 4 CANDIDATE ${i + 1} (len=${c.length}):`);
  console.log(simulateWrap(c));
}
