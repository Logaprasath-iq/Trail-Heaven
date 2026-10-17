const cards = [
  {
    name: "Card 1 (Goose Down)",
    text: "100% certified by the Responsible Down Standard. High loft-to-weight ratio compresses into a 2-liter stuff sack yet expands instantly down to -15°C."
  },
  {
    name: "Card 2 (Titanium)",
    text: "Zero toxic metallic aftertaste, 45% lighter than steel, corrosion-proof in monsoon humidity, and boils water in 105 seconds across freezing altitudes."
  },
  {
    name: "Card 3 (CORDURA)",
    text: "High-tenacity nylon reinforced with square cross-hatch threads that stop tear propagation across rugged granite scree and alpine boulder fields."
  },
  {
    name: "Card 4 (DAC Poles)",
    text: "Engineered with differing diameter tubing to optimize interior headroom while dispersing high gale wind forces across alpine ridge cross-pole joints."
  }
];

for (const w of [38, 39, 40, 41, 42, 43, 44]) {
  console.log(`\n=================== WIDTH ${w} ===================`);
  for (const c of cards) {
    const words = c.text.split(' ');
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
    console.log(`${c.name} (${c.text.length} chars) -> ${lines.length} lines:`);
    lines.forEach((l, i) => console.log(`   L${i+1} [${l.length}]: "${l}"`));
  }
}
