function evaluateText(text) {
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
    if (lines.length !== 4) return false;
    const l4 = lines[3].length;
    if (l4 < 18) return false;
  }
  return true;
}

// Search Card 2
const c2_prefixes = [
  "Zero metallic aftertaste, 45% lighter than stainless steel,",
  "Zero metallic aftertaste, 45% lighter than steel, fully",
  "Zero toxic aftertaste, 45% lighter than steel, completely",
  "Zero toxic metallic aftertaste, 45% lighter than steel,"
];
const c2_middles = [
  "corrosion-proof in monsoon humidity, and boils water",
  "rustproof in humid monsoons, boiling glacial runoff",
  "corrosion-proof in tropical rain, boiling water",
  "impervious to humid monsoons, boiling water rapidly"
];
const c2_endings = [
  "swiftly in 105 freezing alpine seconds.",
  "in 105 seconds at freezing high altitudes.",
  "swiftly in 105 seconds at alpine heights.",
  "rapidly in 105 seconds at freezing heights.",
  "in 105 seconds across freezing altitudes."
];

console.log("Searching Card 2...");
for (const p of c2_prefixes) {
  for (const m of c2_middles) {
    for (const e of c2_endings) {
      const candidate = `${p} ${m} ${e}`;
      if (evaluateText(candidate)) {
        console.log(`FOUND C2 (${candidate.length}): "${candidate}"`);
      }
    }
  }
}

// Search Card 3
const c3_prefixes = [
  "High-tenacity nylon woven with reinforced square",
  "High-tenacity nylon woven with reinforced cross-hatch",
  "High-tenacity nylon reinforced with square cross-hatch"
];
const c3_middles = [
  "threads, preventing puncture tear propagation",
  "threads that stop tear propagation across rugged",
  "threads that prevent tear propagation across rugged",
  "grid threads, stopping tear propagation across rugged"
];
const c3_endings = [
  "granite scree and alpine boulder fields.",
  "Himalayan scree and alpine boulder fields.",
  "sharp granite scree and boulder fields.",
  "scree slopes and alpine boulder fields."
];

console.log("Searching Card 3...");
for (const p of c3_prefixes) {
  for (const m of c3_middles) {
    for (const e of c3_endings) {
      const candidate = `${p} ${m} ${e}`;
      if (evaluateText(candidate)) {
        console.log(`FOUND C3 (${candidate.length}): "${candidate}"`);
      }
    }
  }
}

// Search Card 4
const c4_prefixes = [
  "Engineered with variable diameter tubing to optimize",
  "Engineered with differing diameter tubing to optimize",
  "Engineered with dual diameter pole tubing to maximize",
  "Engineered with variable diameter poles to maximize"
];
const c4_middles = [
  "interior shoulder space while dispersing gale wind",
  "interior living space while dispersing gale wind shear",
  "interior headroom while dispersing high gale wind",
  "interior usable space while dispersing wind shear"
];
const c4_endings = [
  "stress across alpine ridge pole joints.",
  "stress along critical ridge cross-pole joints.",
  "stress across high alpine ridge frame joints.",
  "forces across alpine ridge cross-pole joints."
];

console.log("Searching Card 4...");
for (const p of c4_prefixes) {
  for (const m of c4_middles) {
    for (const e of c4_endings) {
      const candidate = `${p} ${m} ${e}`;
      if (evaluateText(candidate)) {
        console.log(`FOUND C4 (${candidate.length}): "${candidate}"`);
      }
    }
  }
}
