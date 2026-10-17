function testStats(candidates) {
  for (const w of [34, 35, 36, 37, 38]) {
    console.log(`--- Width ${w} ---`);
    for (const c of candidates) {
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
      console.log(`  ${c.title} (${c.text.length} chars) -> ${lines.length} lines: [${lines.join(' | ')}]`);
    }
  }
}

const candSet1 = [
  { title: "Card 1", text: "Starting with 3 engineers & 1 modest sewing station in Chennai" },
  { title: "Card 2", text: "Equipping backcountry treks across 18 Indian states and 12 countries" },
  { title: "Card 3", text: "Verified across freezing Himalayan passes and high-altitude cols" },
  { title: "Card 4", text: "Backed by our comprehensive 3-Year Alpine Durability Guarantee" }
];

console.log('=== SET 1 ===');
testStats(candSet1);

const candSet2 = [
  { title: "Card 1", text: "Started with 3 engineers & 1 humble sewing station in Chennai" },
  { title: "Card 2", text: "Equipping backcountry expeditions across 18 states and 12 countries" },
  { title: "Card 3", text: "Verified on freezing Himalayan passes and glaciated alpine cols" },
  { title: "Card 4", text: "Backed by our comprehensive 3-Year Alpine Durability Guarantee" }
];

console.log('\n=== SET 2 ===');
testStats(candSet2);

const candSet3 = [
  { title: "Card 1", text: "Starting with 3 engineers and 1 humble sewing station" },
  { title: "Card 2", text: "Across 18 Indian states and 12 global mountain countries" },
  { title: "Card 3", text: "Verified across high Himalayan passes and alpine cols" },
  { title: "Card 4", text: "Backed by our comprehensive 3-Year Alpine Guarantee" }
];

console.log('\n=== SET 3 ===');
testStats(candSet3);
