// Test wrapping for Section 6 stat cards
const stats = [
  {
    val: "2018",
    title: "Founded in Chennai",
    text: "Starting with 3 engineers and one modest sewing station in Chennai"
  },
  {
    val: "100K+",
    title: "Expeditions Equipped",
    text: "Equipping trekkers across 18 Indian states and 12 countries worldwide"
  },
  {
    val: "4,800m",
    title: "Max Test Altitude",
    text: "Field-tested across freezing Himalayan high passes and glaciated cols"
  },
  {
    val: "99.4%",
    title: "Satisfaction Rating",
    text: "Backed by our comprehensive 3-Year Alpine Durability Guarantee"
  }
];

// Card content width is approx 220px. At 12px font, chars per line is ~32-38.
for (const w of [32, 34, 36, 38, 40]) {
  console.log(`\n=================== CHARS PER LINE = ${w} ===================`);
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
    console.log(`${s.title} (${s.text.length} chars) -> ${lines.length} lines:`);
    lines.forEach((l, i) => console.log(`   L${i+1} [${l.length}]: "${l}"`));
  }
}
