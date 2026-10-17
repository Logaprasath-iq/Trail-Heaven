// Test exact matching line breaks
// In user browser:
// Card 1:
// L1: 100% certified by the Responsible Down (38)
// L2: Standard. High loft-to-weight ratio (35)
// L3: compresses into a 2-liter stuff sack yet (40)
// L4: expands instantly down to -15°C. (32)
// Total chars: 148, lines: 4

// Let's calibrate Card 2:
// Current: Zero toxic metallic aftertaste, 45% lighter than stainless steel, completely corrosion-proof in monsoon humidity, and boils water in 105 seconds.
// L1: Zero toxic metallic aftertaste, 45% lighter (43)
// L2: than stainless steel, completely corrosion- (43)
// L3: proof in monsoon humidity, and boils water in 105 (49)
// L4: seconds. (8)
//
// What if Card 2 is:
// "Zero toxic metallic aftertaste, 45% lighter than stainless steel, completely corrosion-proof in tropical rains, and boils mountain water in 105 seconds."
// Or:
// "Zero toxic metallic aftertaste, 45% lighter than stainless steel, completely corrosion-proof in monsoon humidity, boiling alpine water in 105 seconds."
// Let's check L4 for these!

function printLines(label, text, breaks) {
  console.log(`=== ${label} (len=${text.length}) ===`);
  for (const b of breaks) {
    console.log(`  [${b.length}] "${b}"`);
  }
}

const c2 = "Zero toxic metallic aftertaste, 45% lighter than stainless steel, completely corrosion-proof in monsoon humidity, boiling water in 105 alpine seconds.";
// L1: Zero toxic metallic aftertaste, 45% lighter (43)
// L2: than stainless steel, completely corrosion- (43)
// L3: proof in monsoon humidity, boiling water (38)
// L4: in 105 freezing alpine seconds. (31)

const c3 = "High-tenacity nylon woven with reinforced square cross-hatch threads that stop puncture tears from propagating across rugged granite scree fields.";
// L1: High-tenacity nylon woven with reinforced (41)
// L2: square cross-hatch threads that stop (35)
// L3: puncture tears from propagating across (37)
// L4: rugged alpine granite scree fields. (34)

const c4 = "Engineered with differing diameter tubing to optimize interior shoulder space while dispersing wind shear stress across alpine ridge cross-poles.";
// L1: Engineered with differing diameter tubing (41)
// L2: to optimize interior shoulder space while (41)
// L3: dispersing severe gale wind shear stress (39)
// L4: across alpine ridge cross-pole joints. (36)

console.log('Tested!');
