// Precise line wrap test across various column widths
function testWrapping(widths) {
  const cards = [
    {
      title: "800-Fill Goose Down",
      text: "100% certified by the Responsible Down Standard. High loft-to-weight ratio compresses into a 2-liter stuff sack yet expands instantly down to -15°C."
    },
    {
      title: "Grade 1 Pure Titanium",
      text: "Zero toxic metallic aftertaste, 45% lighter than stainless steel, completely corrosion-proof in monsoon humidity, boiling water rapidly in 105 alpine seconds."
    },
    {
      title: "420D CORDURA Ripstop",
      text: "High-tenacity nylon woven with reinforced square cross-hatch threads that stop tears from propagating across jagged Himalayan scree and boulder fields."
    },
    {
      title: "DAC Featherlite NSL",
      text: "Engineered with differing diameter tubing to optimize interior shoulder space while dispersing wind shear stress across alpine ridge cross-pole joints."
    }
  ];

  for (const w of widths) {
    console.log(`\n=================== TESTING MAX CHARS PER LINE = ${w} ===================`);
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
      console.log(`Card: ${c.title} (chars: ${c.text.length}, lines: ${lines.length})`);
      lines.forEach((l, idx) => console.log(`  L${idx+1} (${l.length}): "${l}"`));
    }
  }
}

testWrapping([38, 40, 42, 44]);
