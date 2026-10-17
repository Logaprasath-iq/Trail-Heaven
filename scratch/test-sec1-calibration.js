const sec1_cards = [
  {
    title: "Expedition-Grade Resilience",
    text: "DAC Featherlite aluminum alloys, 420D Cordura ripstop, and 5000mm hydrostatic head floor seals prevent tent failures in harsh squalls."
  },
  {
    title: "Biomechanical Comfort",
    text: "Thermoformed lumbar pads and aircraft stays transfer 80% of pack weight to your hips, eliminating sore shoulders over 25km push days."
  },
  {
    title: "Leave No Trace Commitment",
    text: "100% GRS recycled nylon shells, PFC-free water repellents, and repair-first design principles safeguard India's fragile alpine ecosystems."
  },
  {
    title: "Lifetime Technical Support",
    text: "Backed by our Chennai technical atelier. Free lifetime pole repairs, zipper maintenance, and dedicated gear advisors on WhatsApp."
  }
];

for (const w of [38, 39, 40, 41, 42]) {
  console.log(`\n=== Width ${w} ===`);
  for (const c of sec1_cards) {
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
