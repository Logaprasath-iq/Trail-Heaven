const stats = [
  { val: "2018", title: "Founded in Chennai", text: "Starting with 3 engineers & 1 modest sewing station" },
  { val: "100K+", title: "Expeditions Equipped", text: "Across 18 Indian states and 12 countries worldwide" },
  { val: "4,800m", title: "Max Test Altitude", text: "Verified across high Himalayan passes and alpine cols" },
  { val: "99.4%", title: "Satisfaction Rating", text: "Backed by our comprehensive 3-Year Alpine Guarantee" }
];

for (const w of [30, 32, 34, 36, 38, 40]) {
  console.log(`\n=== Max chars per line = ${w} ===`);
  for (const s of stats) {
    const words = s.text.split(' ');
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
    console.log(`${s.title} (${s.text.length} chars) -> ${lines.length} lines: [${lines.join(' | ')}]`);
  }
}
