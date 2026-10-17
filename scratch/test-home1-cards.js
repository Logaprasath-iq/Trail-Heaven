// Test line wrapping for Section 1 (Why Trekkers Choose TrailHaven)
// and Section 2 (Terrain Matcher)

console.log('=== SECTION 1 (Why Trekkers Choose TrailHaven) ===');
// Card content width is approx 238px. At 12px, ~36-40 chars/line.
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
    text: "100% GRS recycled nylon shells, PFC-free water repellents, and repair-first design principles preserve fragile alpine wilderness habitats."
  },
  {
    title: "Lifetime Technical Support",
    text: "Backed by our Chennai technical atelier. Free pole repairs, zipper maintenance, and dedicated backcountry gear advisors on WhatsApp."
  }
];

function wrapTest(cards, widths) {
  for (const w of widths) {
    console.log(`\nWidth: ${w} chars`);
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
      console.log(`  ${c.title} (${c.text.length} chars) -> ${lines.length} lines: [${lines[lines.length-1]}] (${lines[lines.length-1].length} chars)`);
    }
  }
}

wrapTest(sec1_cards, [36, 38, 40, 42]);

console.log('\n=== SECTION 2 (Terrain Matcher) ===');
// Target is EXACTLY 3 lines for all 4 cards, no orphan 4th line!
const sec2_cards = [
  {
    title: "High Alpine Himalayan",
    text: "Sub-zero bivy spots, gusting scree cols, and thin air. Geodesic pole architecture and sub-zero down insulation are non-negotiable."
  },
  {
    title: "Western Ghats Monsoon",
    text: "Continuous tropical torrential rains, slippery mossy rocks, and leeches. Requires internal dry bags and 28,000mm shellwear."
  },
  {
    title: "Deep Forest Solitude",
    text: "Pine needle trails, tranquil riverbeds, and forest bivouacs. Emphasis on lightweight packability and titanium camp cooking."
  },
  {
    title: "Desert Dark-Sky Camps",
    text: "Ladakh, Spiti, and Thar moonscapes. Sharp nocturnal temperature drops, zero ambient light, and wide open celestial views."
  }
];

wrapTest(sec2_cards, [38, 40, 42, 44]);
