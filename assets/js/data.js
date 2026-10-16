/**
 * TrailHaven - Central Data Store
 * Contains all products, buying guides, blog articles, pricing bundles, gallery items, and FAQs.
 */

const TrailHavenData = {
  brand: {
    name: "TrailHaven",
    tagline: "Gear Today. Greater Tomorrows.",
    established: "2018",
    location: "Chennai, Tamil Nadu, India",
    email: "support@trailhavenoutdoor.com",
    phone: "+91 98401 23456",
    whatsapp: "https://wa.me/919840123456?text=Hi%20TrailHaven,%20I%20would%20like%20to%20inquire%20about%20outdoor%20gear",
    social: {
      instagram: "https://instagram.com/trailhaven.outdoor",
      facebook: "https://facebook.com/trailhavenoutdoor",
      twitter: "https://twitter.com/trailhaven_gear",
      youtube: "https://youtube.com/@trailhavengear"
    }
  },

  categories: [
    {
      id: "tents",
      name: "Tents & Shelters",
      slug: "tents",
      icon: "fa-campground",
      count: 3,
      description: "Weather-tested 2-person to 6-person tents engineered for alpine blizzards and monsoon rains.",
      image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "backpacks",
      name: "Backpacks & Packs",
      slug: "backpacks",
      icon: "fa-hiking",
      count: 2,
      description: "Ergonomic internal-frame expedition packs and daypacks engineered with ripstop Cordura.",
      image: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sleeping",
      name: "Sleeping Bags & Mats",
      slug: "sleeping",
      icon: "fa-bed",
      count: 2,
      description: "High-loft down sleeping bags rated to sub-zero alpine conditions and high-R-value thermal pads.",
      image: "https://images.unsplash.com/photo-1558477280-1bfed08ea5db?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "lighting",
      name: "Lanterns & Lights",
      slug: "lighting",
      icon: "fa-lightbulb",
      count: 2,
      description: "High-lumen waterproof headlamps and solar-rechargeable campsite ambient beacons.",
      image: "https://images.unsplash.com/photo-1774886302070-0553eb9b4215?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cooking",
      name: "Camp Cooking Gear",
      slug: "cooking",
      icon: "fa-fire-burner",
      count: 2,
      description: "Ultralight titanium fast-boil stoves, hard-anodized cookware, and heavy-duty camp skillets.",
      image: "https://images.unsplash.com/photo-1522041350204-22285237eeca?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "clothing",
      name: "Hiking Weatherwear",
      slug: "clothing",
      icon: "fa-vest-patches",
      count: 1,
      description: "Three-layer breathable storm shells, thermal mid-layers, and trail-tough trekking pants.",
      image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "trekking-poles",
      name: "Trekking Poles",
      slug: "trekking-poles",
      icon: "fa-person-hiking",
      count: 1,
      description: "Aircraft-grade aluminum and carbon trekking poles with quick-lock flick mechanisms.",
      image: "https://images.unsplash.com/photo-1785772534309-7503e6e92790?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "hydration",
      name: "Hydration & Filters",
      slug: "hydration",
      icon: "fa-bottle-water",
      count: 1,
      description: "0.1-micron hollow-fiber gravity filtration systems and rugged insulated flasks.",
      image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "furniture",
      name: "Outdoor Furniture",
      slug: "furniture",
      icon: "fa-chair",
      count: 1,
      description: "Ultralight packable camp chairs, compact folding tables, and backcountry loungers.",
      image: "https://images.unsplash.com/photo-1701835068926-171d92ceca97?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "navigation",
      name: "Navigation Accessories",
      slug: "navigation",
      icon: "fa-compass",
      count: 1,
      description: "Precision mirror-sighting expedition compasses, GPS cases, and map cases.",
      image: "https://images.unsplash.com/photo-1566341013445-3d382cd2b406?auto=format&fit=crop&w=800&q=80"
    }
  ],

  products: [
    {
      id: "camping-tent-01",
      slug: "camping-tent-01",
      name: "Summit 3P 4-Season Geodesic Expedition Tent",
      category: "tents",
      categoryName: "Tents & Shelters",
      price: 24999,
      originalPrice: 28999,
      discountPercent: 14,
      rating: 4.9,
      reviewsCount: 128,
      inStock: true,
      stockCount: 14,
      featured: true,
      bestSeller: true,
      badge: "Expedition Grade",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "sleeping-bag-boreal",
        "light-beacon-1200"
      ],
      shortDesc: "Engineered for harsh Himalayan winds and torrential monsoon downpours. Geodesic pole architecture with 5000mm hydrostatic head flysheet.",
      description: "The Summit 3P is TrailHaven's pinnacle alpine refuge. Built with five DAC Featherlite NSL aircraft aluminum poles that cross in multiple points to withstand 90 km/h wind shear. The 70D ripstop nylon fly features a dual-silicone and polyurethane coating providing an unyielding 5000mm waterproof rating. Features dual vestibules for gear storage, storm flaps over heavy-duty YKK zippers, and interior gear lofts.",
      features: [
        "Geodesic frame resists heavy snow loads and gale-force mountain winds",
        "5000mm hydrostatic head floor with taped bathtub seam construction",
        "Dual vestibules provide 2.4 sq. meters of sheltered cooking and pack storage",
        "Dual high/low ventilation ports combat condensation inside the canopy",
        "Includes 12 aerospace V-stakes, reflective guy-lines, and repair ferrule"
      ],
      specs: {
        "Capacity": "3 Person",
        "Seasons": "4-Season Alpine",
        "Packed Weight": "3.45 kg",
        "Floor Dimensions": "225 x 185 cm",
        "Peak Height": "120 cm",
        "Fly Fabric": "70D Ripstop Nylon, 5000mm PU/Silicone",
        "Pole Material": "DAC Featherlite NSL Aluminum 9.5mm",
        "Warranty": "3-Year Alpine Guarantee"
      }
    },
    {
      id: "backpack-apex-65",
      slug: "backpack-apex-65",
      name: "Vanguard 65L Internal Frame Alpine Backpack",
      category: "backpacks",
      categoryName: "Backpacks & Packs",
      price: 12999,
      originalPrice: 14999,
      discountPercent: 13,
      rating: 4.8,
      reviewsCount: 94,
      inStock: true,
      stockCount: 22,
      featured: true,
      bestSeller: true,
      badge: "Best Seller",
      image: "https://i.pinimg.com/736x/34/62/d9/3462d938be30dc71a099220399d9a54b.jpg",
      gallery: [
        "https://i.pinimg.com/736x/34/62/d9/3462d938be30dc71a099220399d9a54b.jpg",
        "https://i.pinimg.com/736x/a3/0f/31/a30f31850288824a682819544585b8ea.jpg",
        "https://i.pinimg.com/736x/ed/d5/33/edd53314d6e751719c81b6fd4c97500c.jpg"
      ],
      pairedWith: [
        "gear-carbon-poles",
        "filter-pureflow-4l"
      ],
      shortDesc: "65-liter load hauler featuring an adjustable aluminum stay harness, floating lid, and integrated waterproof monsoon raincover.",
      description: "Designed for multi-day expeditions through rugged topography, the Vanguard 65 transfers 80% of pack weight directly to the lumbar through its custom-molded EVA hipbelt. Made from high-tenacity 420D Cordura with 840D ballistic nylon reinforcements at critical abrasion zones. Includes a dedicated bottom sleeping bag compartment with internal divider.",
      features: [
        "Micro-adjust torso ladder fits heights from 5'2\" to 6'4\"",
        "Dual ice axe loops, trekking pole attachments, and side stretch wand pockets",
        "Hydration bladder sleeve with dual ambidextrous hose exit routing",
        "Includes high-visibility fluorescent orange seam-taped raincover",
        "Heavy-duty Duraflex buckles and glove-friendly zipper pulls"
      ],
      specs: {
        "Volume": "65 Liters (+10L floating lid extension)",
        "Weight": "2.1 kg",
        "Fabric": "420D CORDURA Ripstop / 840D Ballistic Base",
        "Harness": "Thermoformed EVA Foam with Aluminum Stay",
        "Max Carry Load": "26 kg",
        "Raincover": "Included (70D Poly 3000mm)",
        "Warranty": "Lifetime Workmanship Warranty"
      }
    },
    {
      id: "sleeping-bag-boreal",
      slug: "sleeping-bag-boreal",
      name: "Boreal -15°C 800-Fill Goose Down Sleeping Bag",
      category: "sleeping",
      categoryName: "Sleeping Bags & Mats",
      price: 18999,
      originalPrice: 21999,
      discountPercent: 14,
      rating: 4.9,
      reviewsCount: 81,
      inStock: true,
      stockCount: 9,
      featured: true,
      bestSeller: false,
      badge: "800 Fill Power",
      image: "https://i.pinimg.com/736x/cd/af/06/cdaf065f4019224c4cf526838a753e74.jpg",
      gallery: [
        "https://i.pinimg.com/736x/cd/af/06/cdaf065f4019224c4cf526838a753e74.jpg",
        "https://images.unsplash.com/photo-1558477280-1bfed08ea5db?auto=format&fit=crop&w=800&q=80",
        "https://plus.unsplash.com/premium_photo-1753436452097-8bbd74d9b345?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "sleep-pad-thermalrest",
        "camping-tent-01"
      ],
      shortDesc: "Ultralight sub-zero mummy sleeping bag with RDS-certified hydrophobic down, anti-snag draft tube, and contoured hood.",
      description: "When the temperature plunges below freezing in Ladakh or Spiti, the Boreal -15°C traps body heat with continuous horizontal baffles filled with 800-fill power water-resistant goose down. The Pertex Quantum 20D shell repels tent wall condensation while breathing efficiently to prevent moisture buildup within the down clusters.",
      features: [
        "800-fill RDS (Responsible Down Standard) certified goose down",
        "DownTek moisture-repellent down treatment preserves loft in damp air",
        "Insulated full-length 3D draft tube prevents heat loss along zipper",
        "Ergonomic anatomically shaped footbox keeps toes naturally insulated",
        "Comes with silicone-treated compression dry sack and cotton storage bag"
      ],
      specs: {
        "Comfort Rating": "-8°C",
        "Limit Rating": "-15°C",
        "Extreme Rating": "-24°C",
        "Fill Weight": "750g Down",
        "Total Weight": "1.18 kg",
        "Shell Material": "Pertex Quantum 20D Ripstop",
        "Packed Size": "20 x 36 cm (compressed)"
      }
    },
    {
      id: "tent-cascade-2p",
      slug: "tent-cascade-2p",
      name: "Cascade Ultralight 2P Backpacking Shelter",
      category: "tents",
      categoryName: "Tents & Shelters",
      price: 14499,
      originalPrice: 16999,
      discountPercent: 15,
      rating: 4.7,
      reviewsCount: 62,
      inStock: true,
      stockCount: 19,
      featured: false,
      bestSeller: true,
      badge: "Ultralight 1.6kg",
      image: "https://i.pinimg.com/1200x/ed/c1/b8/edc1b81109e012b4447b9623811b3a55.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/ed/c1/b8/edc1b81109e012b4447b9623811b3a55.jpg",
        "https://images.unsplash.com/photo-1571687949921-1306bfb24b72?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "sleep-pad-thermalrest",
        "pack-ridgeline-38"
      ],
      shortDesc: "Sub-1.7kg freestanding 3-season tent with generous headroom, dual doors, and micro-mesh inner for stargazing.",
      description: "Engineered for speed and agility, the Cascade 2P balances light pack weight with liveable interior volume. The single-hub pole system sets up in under 3 minutes even in pitch-black conditions. Fine no-see-um mesh blocks the tiniest insects while providing 360-degree night sky views when the rainfly is rolled back.",
      features: [
        "Weight under 1.65 kg packed makes it an effortless thru-hike companion",
        "Freestanding hubbed aluminum pole structure with color-coded clips",
        "Dual side doors eliminate the need to crawl over your camp partner",
        "Silnylon 20D fly with factory seam taping and 3000mm rating",
        "Fast-pitch setup option using only footprint, poles, and rainfly"
      ],
      specs: {
        "Capacity": "2 Person",
        "Packed Weight": "1.65 kg",
        "Floor Dimensions": "215 x 130 cm",
        "Peak Height": "105 cm",
        "Fly Fabric": "20D Silnylon (3000mm)",
        "Inner Tent": "15D No-See-Um Breathable Mesh",
        "Poles": "7001-T6 Anodized Aluminum"
      }
    },
    {
      id: "tent-havenwood-6p",
      slug: "tent-havenwood-6p",
      name: "Havenwood 6P Family Cabin Tent with Awning",
      category: "tents",
      categoryName: "Tents & Shelters",
      price: 32999,
      originalPrice: 37999,
      discountPercent: 13,
      rating: 4.9,
      reviewsCount: 45,
      inStock: true,
      stockCount: 8,
      featured: false,
      bestSeller: false,
      badge: "Family Cabin",
      image: "https://i.pinimg.com/1200x/4f/29/51/4f2951071873c863a29f3191e44729e7.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/4f/29/51/4f2951071873c863a29f3191e44729e7.jpg",
        "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1751703096330-445adf3e8123?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "light-beacon-1200",
        "cook-castiron-skillet"
      ],
      shortDesc: "Stand-up height luxury family cabin tent with removable room divider, huge mesh windows, and integrated front sun awning.",
      description: "Transform any campsite into a palatial basecamp. With an impressive 200cm peak height, adults can walk comfortably inside without crouching. The removable central partition creates two private rooms or one massive communal space that fits two queen-sized airbeds with room to spare.",
      features: [
        "Vertical sidewall design maximizes interior livable floor area",
        "Zippered room divider creates 2 separate bedrooms or sleeping + gear room",
        "Front vestibule converts into a wide shaded patio awning with included poles",
        "E-port cable pass-through for solar battery generators and lanterns",
        "Heavy-duty 150D Oxford polyester fabric withstands heavy forest rains"
      ],
      specs: {
        "Capacity": "6 Person",
        "Floor Dimensions": "305 x 305 cm",
        "Peak Height": "200 cm (6 ft 6 in)",
        "Weight": "10.8 kg",
        "Fabric": "150D Oxford Polyester (4000mm)",
        "Poles": "Steel Uprights + Fiberglass Roof Ribs"
      }
    },
    {
      id: "pack-ridgeline-38",
      slug: "pack-ridgeline-38",
      name: "RidgeLine 38L Technical Daypack with Rainfly",
      category: "backpacks",
      categoryName: "Backpacks & Packs",
      price: 6499,
      originalPrice: 7499,
      discountPercent: 13,
      rating: 4.8,
      reviewsCount: 112,
      inStock: true,
      stockCount: 30,
      featured: false,
      bestSeller: true,
      badge: "Day Trek Favorite",
      image: "https://i.pinimg.com/736x/c1/e4/e3/c1e4e38e49b397e209ab747b1cb39463.jpg",
      gallery: [
        "https://i.pinimg.com/736x/c1/e4/e3/c1e4e38e49b397e209ab747b1cb39463.jpg",
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1665724233211-02a7afbb8b36?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "gear-carbon-poles",
        "wear-storm-shell"
      ],
      shortDesc: "The quintessential 38L summit and daypack with suspended trampoline mesh back ventilation to keep you cool on steep ascents.",
      description: "Engineered specifically for full-day ridge traverses and weekend cabin overnights. The AirFlow tensioned mesh suspension holds the pack body away from your back, allowing cool air to circulate freely. Quick-stow trekking pole bungee loops allow you to stow poles on the fly without breaking stride.",
      features: [
        "Suspended trampoline backpanel eliminates sweaty back discomfort",
        "Integrated high-density raincover stowed in dedicated bottom pocket",
        "Dual hipbelt zippered pockets for phone, compass, and snacks",
        "Stretchy front beaver-tail pocket for wet rain jackets or sandals",
        "Side compression straps lock loads close to your center of gravity"
      ],
      specs: {
        "Volume": "38 Liters",
        "Weight": "1.25 kg",
        "Fabric": "210D High-Tenacity Hex Ripstop Nylon",
        "Torso Fit": "Adjustable 16\" - 21\"",
        "Max Load": "14 kg"
      }
    },
    {
      id: "sleep-pad-thermalrest",
      slug: "sleep-pad-thermalrest",
      name: "ThermalRest Ultralight Insulated Sleeping Pad",
      category: "sleeping",
      categoryName: "Sleeping Bags & Mats",
      price: 5499,
      originalPrice: 6299,
      discountPercent: 13,
      rating: 4.7,
      reviewsCount: 77,
      inStock: true,
      stockCount: 18,
      featured: false,
      bestSeller: false,
      badge: "R-Value 4.8",
      image: "https://i.pinimg.com/1200x/99/e7/11/99e7118dc98905d9c8b91a7303fee472.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/99/e7/11/99e7118dc98905d9c8b91a7303fee472.jpg",
        "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "sleeping-bag-boreal",
        "tent-cascade-2p"
      ],
      shortDesc: "4-season insulated air mattress with reflective ThermaFoil layers. R-Value 4.8 at just 490 grams.",
      description: "Ground cold robs more heat than ambient air. The ThermalRest incorporates dual layers of radiant heat-reflecting film and internal chamber baffling to bounce body heat back toward you while barring ground chill. Inflates in 60 seconds using the included featherweight pump sack.",
      features: [
        "R-Value 4.8 suitable for snow camping and sub-zero ground conditions",
        "Generous 8cm thickness cushions side sleepers from sharp roots and rocks",
        "Includes airtight roll-top pump sack that doubles as a dry bag",
        "Non-slip TPU textured base fabric prevents sliding on tent floors",
        "Packs down to the size of a 1-liter water bottle"
      ],
      specs: {
        "Dimensions": "183 x 55 x 8 cm",
        "Packed Size": "10 x 22 cm",
        "Weight": "490 g",
        "R-Value": "4.8 (ASTM F3340-18 tested)",
        "Material": "40D Ripstop Nylon with TPU laminate"
      }
    },
    {
      id: "light-beacon-1200",
      slug: "light-beacon-1200",
      name: "Beacon 1200 Pro Solar Rechargeable Lantern",
      category: "lighting",
      categoryName: "Lanterns & Lights",
      price: 3799,
      originalPrice: 4499,
      discountPercent: 15,
      rating: 4.8,
      reviewsCount: 156,
      inStock: true,
      stockCount: 35,
      featured: true,
      bestSeller: true,
      badge: "Solar + USB-C",
      image: "https://i.pinimg.com/1200x/b2/af/ef/b2afef673d1394ffef1712a1446f1230.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/b2/af/ef/b2afef673d1394ffef1712a1446f1230.jpg",
        "https://images.unsplash.com/photo-1774886302070-0553eb9b4215?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1567091238763-8414227537ca?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "camping-tent-01",
        "furniture-chair-aero"
      ],
      shortDesc: "1200-lumen waterproof campsite lantern with warm white, candle flicker, red SOS modes, and built-in 9600mAh power bank.",
      description: "Illuminate your entire cooking camp with 360-degree glare-free warm ambient light. Built from impact-resistant aerospace polycarbonate with a silicone shock bumper. Features an integrated monocrystalline solar lid panel for off-grid top-offs, plus USB-C fast charging that doubles as an emergency smartphone charger.",
      features: [
        "Variable brightness dial from cozy 30 lumens up to blinding 1200 lumens",
        "9600mAh internal lithium battery powers lantern for up to 80 hours",
        "Powerbank function with USB-A and USB-C output to charge phones & GPS",
        "IPX7 waterproof rating - submersible up to 1 meter in water",
        "Collapsible carabiner hook and magnetic base for hanging anywhere"
      ],
      specs: {
        "Max Output": "1200 Lumens",
        "Runtime": "8 hrs (High) / 80 hrs (Low)",
        "Battery": "9600mAh Li-ion",
        "Charging": "USB-C PD 18W + Integrated Solar Panel",
        "Water Resistance": "IPX7 Submersible",
        "Weight": "410 g"
      }
    },
    {
      id: "light-headlamp-neo",
      slug: "light-headlamp-neo",
      name: "NightClimb 850lm Dual-Beam Headlamp",
      category: "lighting",
      categoryName: "Lanterns & Lights",
      price: 2899,
      originalPrice: 3499,
      discountPercent: 17,
      rating: 4.8,
      reviewsCount: 89,
      inStock: true,
      stockCount: 28,
      featured: false,
      bestSeller: false,
      badge: "850 Lumens",
      image: "https://i.pinimg.com/736x/9c/36/36/9c3636f65c3726d3e33c3e1774f0b707.jpg",
      gallery: [
        "https://i.pinimg.com/736x/9c/36/36/9c3636f65c3726d3e33c3e1774f0b707.jpg",
        "https://images.unsplash.com/photo-1515444744559-7be63e1600de?auto=format&fit=crop&w=800&q=80",
        "https://plus.unsplash.com/premium_photo-1741858804139-e05f5c4cd9fd?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "nav-sighting-compass",
        "pack-ridgeline-38"
      ],
      shortDesc: "Ultra-compact 78g rechargeable headlamp featuring spotlight, floodlight, and night-vision preserving red LED.",
      description: "Whether navigating pre-dawn alpine scree or reading your trail map inside the tent, the NightClimb 850 provides crystal-clear optics. Features an innovative gesture-sensing mode: simply wave your hand in front of the lens to toggle power without removing heavy winter mittens.",
      features: [
        "Dual Cree XP-L2 LEDs deliver 120 meters of punchy throw",
        "Gesture wave sensor for contactless on/off control",
        "Red light mode preserves night vision and avoids blinding campmates",
        "IP68 dustproof and waterproof submersible housing",
        "Lightweight breathable headband with silicone sweat-diverting strip"
      ],
      specs: {
        "Max Lumens": "850 Lumens",
        "Beam Distance": "120 meters",
        "Weight": "78 g (including battery)",
        "Waterproof": "IP68 Submersible",
        "Battery": "Rechargeable 1800mAh Li-Po"
      }
    },
    {
      id: "cook-titanium-nomad",
      slug: "cook-titanium-nomad",
      name: "Nomad Titanium 1.8L Fast-Boil Camp Stove & Cookset",
      category: "cooking",
      categoryName: "Camp Cooking Gear",
      price: 7499,
      originalPrice: 8799,
      discountPercent: 15,
      rating: 4.9,
      reviewsCount: 104,
      inStock: true,
      stockCount: 16,
      featured: true,
      bestSeller: false,
      badge: "Pure Titanium",
      image: "https://i.pinimg.com/1200x/54/db/d1/54dbd1697ce4776a3d56e1bb7293c64d.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/54/db/d1/54dbd1697ce4776a3d56e1bb7293c64d.jpg",
        "https://images.unsplash.com/photo-1522041350204-22285237eeca?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1780394045328-ca3af6a19f8e?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "filter-pureflow-4l",
        "backpack-apex-65"
      ],
      shortDesc: "Ultralight nesting titanium backpacking kitchen. Boils 500ml of mountain water in just 105 seconds with piezoelectric ignition.",
      description: "Made from Grade-1 aircraft titanium, this complete cooking kit is impervious to rust, metallic aftertaste, and high-heat deformation. The pot nests a 230g isobutane canister and the micro-burner seamlessly inside its insulated neoprene sleeve, packing down to the size of a coffee mug.",
      features: [
        "Boils 500ml water in 1 minute 45 seconds at sea level",
        "Heat-exchanger flux ring under the pot enhances fuel efficiency by 30%",
        "Push-button piezo igniter works reliably at high elevations",
        "Foldable heat-resistant titanium silicone-coated handles",
        "Complete nested kit weighs under 340 grams"
      ],
      specs: {
        "Capacity": "1.8 Liters (Pot) + 400ml (Bowl/Lid)",
        "Material": "Pure Grade-1 Titanium",
        "Boil Time": "105 seconds (500ml)",
        "Weight": "338 g",
        "Fuel Type": "Isobutane / Propane canister (Lindal valve)"
      }
    },
    {
      id: "cook-castiron-skillet",
      slug: "cook-castiron-skillet",
      name: "TrailForge 10-Inch Pre-Seasoned Camp Skillet",
      category: "cooking",
      categoryName: "Camp Cooking Gear",
      price: 2999,
      originalPrice: 3499,
      discountPercent: 14,
      rating: 4.8,
      reviewsCount: 58,
      inStock: true,
      stockCount: 20,
      featured: false,
      bestSeller: false,
      badge: "Campfire Cook",
      image: "https://i.pinimg.com/736x/c9/81/ec/c981ec631cb2aca0e971bcc947d8aa5e.jpg",
      gallery: [
        "https://i.pinimg.com/736x/c9/81/ec/c981ec631cb2aca0e971bcc947d8aa5e.jpg",
        "https://images.unsplash.com/photo-1637739699971-7d4d5194e75c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1692313532975-513a383c48f7?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "tent-havenwood-6p",
        "furniture-chair-aero"
      ],
      shortDesc: "Heirloom-grade pre-seasoned cast iron pan for roaring campfires, embers, and gas camp stoves. Naturally non-stick.",
      description: "Nothing beats sizzling campfire steaks or campfire dosa over glowing hardwood coals. Pre-seasoned with 100% organic cold-pressed flaxseed oil for a natural, chemical-free non-stick patina that gets better with every adventure. Includes removable heat-resistant silicone handle grip.",
      features: [
        "Thick cast iron retains exceptional heat for uniform searing",
        "Dual pouring spouts for drip-free pan drippings and sauces",
        "Pre-seasoned and ready to use right out of the box",
        "Safe for open campfire flames, charcoal embers, and camping burners",
        "Includes heavy-duty leather hanging lanyard and silicone grip"
      ],
      specs: {
        "Diameter": "25.4 cm (10 inches)",
        "Depth": "4.8 cm",
        "Weight": "2.25 kg",
        "Material": "High-Density Virgin Cast Iron",
        "Pre-Seasoning": "Organic Flaxseed Oil"
      }
    },
    {
      id: "gear-carbon-poles",
      slug: "gear-carbon-poles",
      name: "Karakoram Carbon Fiber Quick-Lock Trekking Poles",
      category: "trekking-poles",
      categoryName: "Trekking Poles",
      price: 4899,
      originalPrice: 5699,
      discountPercent: 14,
      rating: 4.8,
      reviewsCount: 73,
      inStock: true,
      stockCount: 25,
      featured: false,
      bestSeller: false,
      badge: "Carbon Ultralight",
      image: "https://i.pinimg.com/1200x/1a/dd/c3/1addc3b685ebeb339d3c9830425981d1.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/1a/dd/c3/1addc3b685ebeb339d3c9830425981d1.jpg",
        "https://images.unsplash.com/photo-1785772534309-7503e6e92790?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1778248842805-54e75d813b49?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "backpack-apex-65",
        "wear-storm-shell"
      ],
      shortDesc: "100% 3K carbon fiber three-section poles with ergonomic cork grips, aluminum speed locks, and interchangeable carbide tips.",
      description: "Absorb jarring downhill joint impact with lightweight 3K carbon fiber shafts that naturally dampen shock vibrations. Moisture-wicking natural cork grips mold to your hand contours over time, preventing blisters on gruelling 20-kilometer mountain pushes.",
      features: [
        "100% 3K Carbon Fiber shafts weigh only 215g per pole",
        "Fast-cam aluminum alloy flick locks will not slip in freezing rain",
        "Natural contoured cork grips with extended EVA foam choke sleeves",
        "Padded breathable wrist straps with easy pull-adjusters",
        "Includes mud baskets, snow powder baskets, and rubber road feet"
      ],
      specs: {
        "Usable Length": "65 cm to 135 cm",
        "Collapsed Length": "62 cm",
        "Weight (Pair)": "430 g",
        "Shaft Material": "100% 3K High-Modulus Carbon Fiber",
        "Grip": "Natural Portuguese Cork + High-Density EVA"
      }
    },
    {
      id: "wear-storm-shell",
      slug: "wear-storm-shell",
      name: "MonsoonShield 3-Layer Mountain Jacket",
      category: "clothing",
      categoryName: "Hiking Weatherwear",
      price: 16999,
      originalPrice: 19999,
      discountPercent: 15,
      rating: 4.9,
      reviewsCount: 67,
      inStock: true,
      stockCount: 15,
      featured: true,
      bestSeller: false,
      badge: "28,000mm Waterproof",
      image: "https://i.pinimg.com/736x/db/ed/52/dbed52acb758f0b1ac4688fd2cb5474b.jpg",
      gallery: [
        "https://i.pinimg.com/736x/db/ed/52/dbed52acb758f0b1ac4688fd2cb5474b.jpg",
        "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1594832512784-dbd688e0572e?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "gear-carbon-poles",
        "pack-ridgeline-38"
      ],
      shortDesc: "Heavyweight weather protection engineered for Western Ghats cloudbursts and Himalayan storms. 28,000mm waterproof / 20,000g breathability.",
      description: "Constructed with a rugged 75D recycled ripstop face bonded to a microporous waterproof membrane, the MonsoonShield keeps deluge rains out while venting sweat vapor during grueling elevation pushes. Generous underarm pit zips provide rapid heat dump on humid climbs.",
      features: [
        "28,000mm waterproof membrane with 100% heat-welded seams",
        "Helmet-compatible 3-way adjustable storm hood with stiffened visor",
        "Two-way YKK AquaGuard water-repellent front zipper with storm flap",
        "Deep harness-compatible chest pockets with internal headphone loop",
        "Eco-friendly PFC-free durable water repellent (DWR) surface coating"
      ],
      specs: {
        "Waterproof Rating": "28,000 mm Hydrostatic Head",
        "Breathability": "20,000 g/m²/24hr",
        "Weight": "440 g (Size Medium)",
        "Material": "75D 3-Layer Recycled Ripstop Nylon",
        "Sizes": "S, M, L, XL, XXL"
      }
    },
    {
      id: "filter-pureflow-4l",
      slug: "filter-pureflow-4l",
      name: "PureFlow 0.1-Micron Gravity Water Filter 4L",
      category: "hydration",
      categoryName: "Hydration & Filters",
      price: 3499,
      originalPrice: 3999,
      discountPercent: 13,
      rating: 4.8,
      reviewsCount: 88,
      inStock: true,
      stockCount: 32,
      featured: false,
      bestSeller: true,
      badge: "99.9999% Bacteria Free",
      image: "https://i.pinimg.com/736x/61/6b/07/616b07f4fb1148b3cd2fbb7164ded7b8.jpg",
      gallery: [
        "https://i.pinimg.com/736x/61/6b/07/616b07f4fb1148b3cd2fbb7164ded7b8.jpg",
        "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1558169550-45825435a09b?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "cook-titanium-nomad",
        "backpack-apex-65"
      ],
      shortDesc: "Hang-and-forget gravity water filtration reservoir. Purifies 4 liters of murky stream water in under 4 minutes without pumping.",
      description: "Say goodbye to exhausting hand-pumping after a 20km hike. Simply fill the wide-mouth 4L reservoir from any mountain stream, hang it from a sturdy branch, and let gravity push clean, pathogen-free water through the 0.1-micron hollow fiber membrane directly into your bottles.",
      features: [
        "Removes 99.9999% of bacteria (E. coli, salmonella) and 99.9% of protozoa (giardia)",
        "Gravity-fed flow rate yields 1.5 liters per minute effortlessly",
        "Wide-mouth roll-top dry bag opening for fast filling in shallow pools",
        "Field cleanable via included syringe backflush without replacing cartridge",
        "Rated for up to 5,000 liters of backcountry water purification"
      ],
      specs: {
        "Reservoir Volume": "4.0 Liters",
        "Pore Size": "0.1 Micron Hollow Fiber",
        "Flow Rate": "Up to 1.75 L/min",
        "Filter Life": "5,000 Liters",
        "Weight": "260 g complete"
      }
    },
    {
      id: "furniture-chair-aero",
      slug: "furniture-chair-aero",
      name: "AeroRest Ultralight Packable Camp Chair",
      category: "furniture",
      categoryName: "Outdoor Furniture",
      price: 4999,
      originalPrice: 5899,
      discountPercent: 15,
      rating: 4.8,
      reviewsCount: 76,
      inStock: true,
      stockCount: 19,
      featured: true,
      bestSeller: false,
      badge: "Ultralight 890g",
      image: "https://i.pinimg.com/1200x/52/cb/d5/52cbd5ffd211a34f7f0ca4e05ad4674f.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/52/cb/d5/52cbd5ffd211a34f7f0ca4e05ad4674f.jpg",
        "https://images.unsplash.com/photo-1701835068926-171d92ceca97?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1751570071178-11a7ab50bcdd?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "tent-havenwood-6p",
        "light-beacon-1200"
      ],
      shortDesc: "Aircraft-grade aluminum frame weighing only 890 grams with 145kg load rating. Folds into a water-bottle-sized carrying pouch.",
      description: "The AeroRest is TrailHaven's masterclass in backcountry ergonomics. Constructed with custom DAC TH72M aluminum alloy poles and 600D ripstop polyester mesh for superior airflow during tropical expeditions.",
      features: [
        "Shock-corded DAC 7001 alloy frame assembles in seconds",
        "Tested load capacity of 145kg at a packed weight of only 890g",
        "Breathable hydrophobic mesh side panels prevent sweat build-up",
        "Anti-sink wide silicone rubber feet for muddy or sandy terrains",
        "Includes Cordura zipper storage tote with MOLLE attachment loops"
      ],
      specs: {
        "Weight": "890 g",
        "Max Capacity": "145 kg",
        "Packed Size": "35 x 10 x 12 cm",
        "Frame Material": "DAC 7001 Aircraft Aluminum",
        "Warranty": "3-Year Alpine Guarantee"
      }
    },
    {
      id: "nav-sighting-compass",
      slug: "nav-sighting-compass",
      name: "TerraTrack Mirror Sighting Expedition Compass",
      category: "navigation",
      categoryName: "Navigation Accessories",
      price: 2799,
      originalPrice: 3299,
      discountPercent: 15,
      rating: 4.9,
      reviewsCount: 112,
      inStock: true,
      stockCount: 28,
      featured: true,
      bestSeller: true,
      badge: "Mil-Spec Precision",
      image: "https://i.pinimg.com/736x/7a/37/7e/7a377e26b6dcccd270226e9ba73d0619.jpg",
      gallery: [
        "https://i.pinimg.com/736x/7a/37/7e/7a377e26b6dcccd270226e9ba73d0619.jpg",
        "https://images.unsplash.com/photo-1566341013445-3d382cd2b406?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?auto=format&fit=crop&w=800&q=80"
      ],
      pairedWith: [
        "gear-carbon-poles",
        "light-headlamp-neo"
      ],
      shortDesc: "Liquid-damped global needle with clinometer, adjustable magnetic declination, and sighting mirror for precision route plotting.",
      description: "Engineered for whiteouts, dense rainforest traverses, and off-trail orienteering. Features a sapphire jewel bearing with liquid damping that prevents needle fluttering in freezing temperatures.",
      features: [
        "Liquid-damped capsule with Swedish magnetic steel needle",
        "Integrated sighting mirror with notch for 0.5-degree bearing precision",
        "Tool-free adjustable declination scale for true North correction",
        "Luminescent bezel ring and direction pointer glow for 4 hours",
        "Built-in pendulum clinometer measures hill gradients and slope angles"
      ],
      specs: {
        "Bearing Precision": "±0.5 Degree",
        "Operating Range": "-30°C to +60°C",
        "Weight": "74 g",
        "Warranty": "3-Year Alpine Guarantee"
      }
    }
  ],

  bundles: [
    {
      id: "starter-camper",
      name: "Starter Camper Package",
      subtitle: "Everything a solo adventurer or couple needs to camp under the stars with confidence.",
      price: 14999,
      originalPrice: 19199,
      savings: 4200,
      badge: "Best for Beginners",
      popular: false,
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80",
      description: "Carefully curated to eliminate guesswork for first-time campers. Includes our top-rated 2-person shelter, insulated sleeping comfort, reliable LED lighting, and campfire dining gear.",
      itemsIncluded: [
        "Cascade Ultralight 2P Backpacking Shelter (₹14,499 value)",
        "Beacon 1200 Pro Solar Rechargeable Lantern (₹3,799 value)",
        "TrailHaven Camp Mess Kit & Cutlery set",
        "TrailHaven Microfiber Fast-Dry Camp Towel",
        "First-Time Camper Field Handbook & Guidebook"
      ],
      benefits: [
        "Save ₹4,200 compared to individual retail prices",
        "Pre-matched lightweight compatibility (under 3.2kg total)",
        "Includes Free Pan-India Express Courier Delivery",
        "1-Year No-Questions-Asked Product Warranty"
      ]
    },
    {
      id: "thru-hiker-ultralight",
      name: "Ultralight Thru-Hiker Package",
      subtitle: "Sub-5kg base weight package engineered for speed, long distance traverses, and alpine minimalism.",
      price: 21999,
      originalPrice: 27999,
      savings: 6000,
      badge: "Ultralight Fastpack",
      popular: false,
      image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=800&q=80",
      description: "Crafted specifically for endurance trekkers aiming for high daily mileage without exhaustion. Every gram shaved enables faster summits, lower joint fatigue, and rapid camp setup.",
      itemsIncluded: [
        "RidgeLine 38L Ripstop Technical Daypack (₹6,899 value)",
        "Cascade Ultralight 2P Backpacking Shelter (₹14,499 value)",
        "Karakoram Carbon Fiber Trekking Poles (Pair) (₹4,899 value)",
        "Nomad Titanium 1.8L Camp Stove & Cookset (₹7,499 value)"
      ],
      benefits: [
        "Save ₹6,000 on elite ultralight trail gear",
        "Sub-5kg combined equipment base weight",
        "Carbon-fiber and titanium hardware durability",
        "Lifetime Guarantee on poles and pack harnesses"
      ]
    },
    {
      id: "adventure-explorer",
      name: "Adventure Explorer Package",
      subtitle: "The definitive mid-weight setup for multi-day trekking and weekend high-altitude escapes.",
      price: 29999,
      originalPrice: 38499,
      savings: 8500,
      badge: "Most Popular",
      popular: true,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
      description: "Our most coveted gear bundle. Equips you for 3 to 7 day wilderness traverses with internal-frame carrying power, four-season shelter resilience, and titanium fast-boil cooking.",
      itemsIncluded: [
        "Summit 3P 4-Season Geodesic Expedition Tent (₹24,999 value)",
        "Vanguard 65L Internal Frame Backpack (₹12,999 value)",
        "Nomad Titanium 1.8L Camp Stove & Cookset (₹7,499 value)",
        "PureFlow 0.1-Micron Gravity Water Filter (₹3,499 value)",
        "TrailHaven Weatherproof Compression Dry-Sack Set"
      ],
      benefits: [
        "Save ₹8,500 over individual gear prices",
        "Built for harsh Himalayan ridges and deep monsoon forests",
        "Lifetime Guarantee on backpack harness and tent poles",
        "Priority Customer Support & Free Gear Servicing Clinic"
      ]
    },
    {
      id: "ultimate-expedition",
      name: "Ultimate Expedition Package",
      subtitle: "Uncompromising alpine performance for high-altitude passes, snow bivouacs, and extreme conditions.",
      price: 54999,
      originalPrice: 69799,
      savings: 14800,
      badge: "Alpine Expedition Grade",
      popular: false,
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
      description: "Forged for serious mountaineers pushing beyond 4,000 meters. Features sub-zero down insulation, 28,000mm monsoon weatherwear, carbon trekking poles, and our toughest 4-season geodesic refuge.",
      itemsIncluded: [
        "Summit 3P 4-Season Geodesic Expedition Tent (₹24,999 value)",
        "Boreal -15°C 800-Fill Goose Down Sleeping Bag (₹18,999 value)",
        "MonsoonShield 3-Layer Mountain Jacket (₹16,999 value)",
        "ThermalRest Ultralight Insulated Sleeping Pad (₹5,499 value)",
        "Karakoram Carbon Fiber Trekking Poles (Pair) (₹4,899 value)",
        "NightClimb 850lm Dual-Beam Headlamp (₹2,899 value)"
      ],
      benefits: [
        "Save a massive ₹14,800 on top-tier alpine equipment",
        "Sub-zero tested in Ladakh and Spiti winter conditions",
        "Complimentary TrailHaven Expedition Duffel Bag (90L)",
        "Lifetime Alpine Hardware Replacement Guarantee"
      ]
    }
  ],

  guides: [
    {
      id: "beginner-first-camp",
      slug: "beginner-first-camp",
      title: "The Ultimate Beginner's Guide to Overnight Wilderness Camping",
      category: "Beginner Guides",
      categorySlug: "beginner",
      readTime: "7 min read",
      author: "Arjun Verma (TrailHaven Gear Lead)",
      publishDate: "October 8, 2026",
      image: "https://i.pinimg.com/1200x/03/8b/61/038b611163973a847dcc8bbe20305e4c.jpg",
      excerpt: "Step out of your comfort zone and into the wild. Here is everything you need to know about picking your first campsite, setting up camp, and staying safe.",
      intro: "Camping in the wilderness for the very first time can feel both thrilling and daunting. The scent of pine needles, the crackle of a campfire, and a sky dusted with millions of stars are unmatched rewards. But staying warm, dry, and well-fed requires thoughtful preparation.",
      sections: [
        {
          heading: "1. Choose the Right Beginner-Friendly Campsite",
          body: "For your very first trip, pick an established campsite within 2 to 4 kilometers of your car or road access rather than venturing 20km into uncharted backcountry. Look for reliable natural water sources, safe wind protection behind trees or boulders, and flat, level ground free of ant colonies and dead hanging tree branches ('widowmakers')."
        },
        {
          heading: "2. Master the Three Core Pillars: Shelter, Sleep, & Water",
          body: "Your tent protects you from bugs and wind, but your sleeping pad is what keeps you warm from the cold earth. Never skimp on ground insulation—a sleeping pad with an R-value of at least 3.0 is essential. For water, always filter stream water using a 0.1-micron filter before drinking."
        },
        {
          heading: "3. Camp Kitchen Fundamentals",
          body: "Keep your first campfire meals simple. Pre-chop vegetables and measure spices at home. An integrated fast-boil stove like the Nomad Titanium boils water in under two minutes for quick dehydrated meals, porridge, and piping hot chai."
        }
      ],
      checklist: [
        "2-person or 3-person weather-rated tent with stakes and guy lines",
        "Sleeping bag rated at least 5°C below expected nighttime low",
        "Insulated sleeping pad (R-value 3.0+)",
        "Rechargeable headlamp + spare batteries or powerbank",
        "Gravity or squeeze water filtration system",
        "Camp stove, fuel canister, lighter, and mess kit",
        "Weatherproof 3-layer rain jacket and warm fleece layer",
        "Biodegradable soap and trash bags (Leave No Trace)"
      ],
      relatedProducts: ["camping-tent-01", "light-beacon-1200", "cook-titanium-nomad"]
    },
    {
      id: "tent-selection-masterclass",
      slug: "tent-selection-masterclass",
      title: "How to Choose the Right Tent: Capacity, Seasons & Hydrostatic Head",
      category: "Shelter Selection",
      categorySlug: "shelters",
      readTime: "9 min read",
      author: "Pooja Sundaram (Senior Field Tester)",
      publishDate: "September 24, 2026",
      image: "https://images.unsplash.com/photo-1571687949921-1306bfb24b72?auto=format&fit=crop&w=700&q=80",
      excerpt: "3-season vs 4-season, geodesic frames, and decoding waterproof ratings. Find the exact shelter built for your adventures.",
      intro: "A tent is your portable fortress against howling mountain winds and drenching rainstorms. Choosing the right one requires balancing interior space, packed trail weight, and weather resistance.",
      sections: [
        {
          heading: "1. Decoding Capacity: The 'Plus-One' Rule",
          body: "Tent capacity ratings represent the maximum number of people lying side-by-side shoulder to shoulder with virtually no gear. If you are two adults trekking with 65L packs, a 3-person tent provides the necessary interior elbow room and vestibule space to stash boots and muddy bags safely out of the rain."
        },
        {
          heading: "2. Understanding Seasons: 3-Season vs 4-Season",
          body: "3-Season tents emphasize ventilation with ample mesh panels to keep you cool in spring, summer, and monsoon humidity. In contrast, 4-Season alpine tents feature heavy geodesic pole geometry to withstand snow accumulations and blustery sub-zero winds."
        },
        {
          heading: "3. What Does 'Hydrostatic Head' Actually Mean?",
          body: "The hydrostatic head rating (measured in millimeters) indicates the height of a water column the fabric can support before moisture seeps through. For Indian monsoon downpours, look for a flysheet with at least 3000mm and a floor of 5000mm."
        }
      ],
      checklist: [
        "Determine maximum party size + gear allowance",
        "Check packed weight vs backpack capacity limit (target <1.2kg per person)",
        "Inspect pole architecture (freestanding vs semi-freestanding)",
        "Verify double-wall construction to prevent inner condensation",
        "Test pitch the tent in your living room before heading outdoors"
      ],
      relatedProducts: ["camping-tent-01", "tent-cascade-2p", "tent-havenwood-6p"]
    },
    {
      id: "backpack-fitting-guide",
      slug: "backpack-fitting-guide",
      title: "Backpack Sizing & Fitting: Weight Distribution for Long Treks",
      category: "Gear Selection",
      categorySlug: "gear",
      readTime: "6 min read",
      author: "Vikram Rathore (Mountaineering Instructor)",
      publishDate: "September 12, 2026",
      image: "https://i.pinimg.com/1200x/ed/d5/33/edd53314d6e751719c81b6fd4c97500c.jpg",
      excerpt: "Torso length matters infinitely more than your height. Learn how to dial in lumbar support and prevent sore shoulders.",
      intro: "A properly fitted backpack feels like an organic extension of your spine; a poorly fitted one turns every uphill switchback into an agonizing trial.",
      sections: [
        {
          heading: "1. Measure Your Torso Length (Not Total Height)",
          body: "Locate your C7 vertebra at the base of your neck (it tilts forward when you bend your head) and measure down along your spine to the top of your iliac crest (the top edge of your hip bones). This torso measurement (typically 40 to 52 cm) determines your pack size."
        },
        {
          heading: "2. The Golden Rule: 80% on Hips, 20% on Shoulders",
          body: "Your hip bones and legs are far stronger than your shoulders. Fasten and tighten your hipbelt first so the padded cushions hug the top of your pelvic crest, then gently snug the shoulder straps and load-lifters."
        }
      ],
      checklist: [
        "Accurate torso length measurement with cloth tape",
        "Pack heavy items (tent, food, stove) centered close to spine",
        "Light sleeping bag at the bottom compartment",
        "Frequently needed gear (rain jacket, headlamp, snacks) in the top lid"
      ],
      relatedProducts: ["backpack-apex-65", "pack-ridgeline-38"]
    },
    {
      id: "sleeping-system-science",
      slug: "sleeping-system-science",
      title: "Mastering Your Sleep System: Temperature Ratings & Thermal R-Values",
      category: "Gear Selection",
      categorySlug: "gear",
      readTime: "8 min read",
      author: "Arjun Verma (TrailHaven Gear Lead)",
      publishDate: "August 28, 2026",
      image: "https://i.pinimg.com/1200x/fc/30/7a/fc307af9ad100c3cc6a45773e0de42af.jpg",
      excerpt: "Why a -10°C bag won't keep you warm without the right pad. Demystifying EN/ISO ratings and R-values.",
      intro: "Many trekkers blame their sleeping bag when they shiver all night, unaware that conductive heat loss straight into the cold ground accounts for over 60% of lost body heat.",
      sections: [
        {
          heading: "1. The Crucial Role of Pad R-Value",
          body: "R-value measures thermal resistance. An uninsulated pool lilo has an R-value of 0.8. For 3-season camping, you need R-3.0; for snow camping in the Himalayas, R-4.5 or higher is required."
        },
        {
          heading: "2. Comfort vs. Extreme ISO Limits",
          body: "Always buy based on the 'Comfort' rating for women or cold sleepers, and 'Limit' rating for warm sleepers. Never base your purchase on the 'Extreme' rating, which is merely the survival threshold against hypothermia."
        }
      ],
      checklist: [
        "Match bag Comfort rating to lowest forecasted night temperature minus 3°C",
        "Insulated sleeping pad with certified ASTM R-Value",
        "Wear clean, dry merino base layers to bed (never sweaty hiking clothes)",
        "Nalgene bottle with warm water tucked inside footbox for instant warmth"
      ],
      relatedProducts: ["sleeping-bag-boreal", "sleep-pad-thermalrest"]
    },
    {
      id: "monsoon-trek-checklist",
      slug: "monsoon-trek-checklist",
      title: "Himalayan & Western Ghats Monsoon Trekking Safety Checklist",
      category: "Safety & Checklists",
      categorySlug: "safety",
      readTime: "7 min read",
      author: "Kavitha Natarajan (Field Guide)",
      publishDate: "August 15, 2026",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=700&q=80",
      excerpt: "Navigating flash floods, leeches, slippery moss scree, and relentless downpours with safety and panache.",
      intro: "Monsoon transforms the Western Ghats and Himalayan foothills into lush emerald paradises veiled in dramatic mist. But continuous rainfall demands specialized gear and rigorous safety protocols.",
      sections: [
        {
          heading: "1. Waterproofing the Inside of Your Pack",
          body: "Never rely solely on an exterior raincover. Strong winds can blow raincovers off. Always line the interior of your backpack with a heavy-duty contractor bag or individual dry-sacks."
        },
        {
          heading: "2. Footwear & Leeches",
          body: "Leech socks treated with salt and neem oil are a game changer in Karnataka and Kerala rain forests. Choose quick-draining trail shoes or waterproof boots with deep Vibram multi-directional lugs."
        }
      ],
      checklist: [
        "3-Layer breathable rain jacket with taped seams",
        "Dry bags for electronics and sleeping bag",
        "Leech socks and anti-fungal foot powder",
        "Trekking poles for river crossings and slick mud balance",
        "Emergency whistle, headlamp with extra lithium batteries, and first-aid kit"
      ],
      relatedProducts: ["wear-storm-shell", "gear-carbon-poles", "filter-pureflow-4l"]
    },
    {
      id: "leave-no-trace-ethics",
      slug: "leave-no-trace-ethics",
      title: "Leave No Trace Principles: Responsible Backcountry Camping Ethics",
      category: "Safety & Checklists",
      categorySlug: "safety",
      readTime: "5 min read",
      author: "TrailHaven Sustainability Team",
      publishDate: "July 30, 2026",
      image: "https://i.pinimg.com/736x/46/49/5a/46495a6a9564e689af6515cc9a6ecd79.jpg",
      excerpt: "Protecting our fragile wild habitats. The 7 universal Leave No Trace principles every Indian outdoor enthusiast must uphold.",
      intro: "As outdoor recreation grows across India, so does our collective responsibility to preserve pristine wilderness areas for future generations. TrailHaven builds gear to last, but nature requires our mindfulness.",
      sections: [
        {
          heading: "1. The 7 Core Leave No Trace Tenets",
          body: "1. Plan ahead and prepare. 2. Travel and camp on durable surfaces. 3. Dispose of waste properly (pack out all plastics, food scraps, and toilet paper). 4. Leave what you find. 5. Minimize campfire impacts. 6. Respect wildlife. 7. Be considerate of other visitors."
        },
        {
          heading: "2. Campfire Stewardship & Fuel Stoves",
          body: "In fragile alpine meadows, never cut live branches or build rock fire rings. Use an efficient canister or titanium stove like the Nomad instead of building open wood fires that scar the soil."
        }
      ],
      checklist: [
        "Sealable heavy-duty trash ziplocks to pack out 100% of waste",
        "Camp trowel for digging 6-8 inch catholes at least 60m from water sources",
        "Biodegradable camp soap used well away from streams",
        "Stay strictly on designated trails to prevent hillside erosion"
      ],
      relatedProducts: ["cook-titanium-nomad", "filter-pureflow-4l"]
    },
    {
      id: "ultralight-thru-hiking",
      slug: "ultralight-thru-hiking",
      title: "Ultralight Thru-Hiking: Master the Sub-5kg Base Weight Framework",
      category: "Gear Selection",
      categorySlug: "gear",
      readTime: "8 min read",
      author: "Arjun Verma (TrailHaven Gear Lead)",
      publishDate: "October 11, 2026",
      image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=700&q=80",
      excerpt: "How gram counters achieve 30km alpine days without chronic fatigue. Selecting silnylon, carbon fiber, and multi-functional gear.",
      intro: "Transitioning to ultralight backpacking is liberating. By removing non-essential gear and choosing aerospace-grade materials, you reduce strain on your knees and back, allowing for farther, faster exploration.",
      sections: [
        {
          heading: "1. The 10-Gram Mentality",
          body: "Every buckle, strap, and stuff sack adds up. Ultralight hikers trim excess webbing, replace heavy stuff sacks with cuben fiber or silnylon, and select dual-purpose clothing."
        },
        {
          heading: "2. Carbon Hardware & Frameless Packs",
          body: "Pairing a frameless 38L pack with carbon trekking poles provides optimal weight distribution without the 2kg frame penalty of expedition haulers."
        }
      ],
      checklist: [
        "Weigh every item on a 1-gram digital scale",
        "Replace bulky cookware with single 750ml titanium pot",
        "Use trekking poles as primary tent ridge poles",
        "Limit spare clothing to one thermal sleep set and one insulation layer"
      ],
      relatedProducts: ["pack-ridgeline-38", "gear-carbon-poles", "cook-titanium-nomad"]
    },
    {
      id: "water-purification-alpine",
      slug: "water-purification-alpine",
      title: "Backcountry Water Safety: Micro-Filtration vs Chemical Purification",
      category: "Safety & Checklists",
      categorySlug: "safety",
      readTime: "6 min read",
      author: "Kavitha Natarajan (Field Guide)",
      publishDate: "October 14, 2026",
      image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=700&q=80",
      excerpt: "Preventing giardia, cryptosporidium, and heavy sediment in glacial runoff. Choosing between 0.1-micron hollow-fiber and UV.",
      intro: "Even crystalline mountain streams tumbling from Himalayan glaciers can carry microscopic cysts from upstream grazing wildlife. Drinking untreated water can abruptly end your expedition.",
      sections: [
        {
          heading: "1. 0.1-Micron Hollow-Fiber Membranes",
          body: "Hollow-fiber gravity filters physically block 99.9999% of bacteria and protozoan cysts without requiring chemicals or waiting 30 minutes for chlorine dioxide tablets to react."
        },
        {
          heading: "2. Managing Glacial Silt & Turbidity",
          body: "Himalayan glacial melt contains fine rock powder that clogs filters quickly. Always pre-filter silty water through a clean bandanna or let it settle in a folding bucket for 20 minutes before filtering."
        }
      ],
      checklist: [
        "0.1-Micron gravity or squeeze hollow-fiber filter",
        "Collapsible 4-liter reservoir for camp water storage",
        "Backwashing syringe to clear filter pores on trail",
        "Backup chlorine dioxide tablets in first aid pouch"
      ],
      relatedProducts: ["filter-pureflow-4l", "camping-tent-01"]
    },
    {
      id: "camp-stove-cookware-selection",
      slug: "camp-stove-cookware-selection",
      title: "Camp Stoves & Cookware: Canister, Liquid Fuel & Titanium Systems",
      category: "Camp Kitchen",
      categorySlug: "cooking",
      readTime: "7 min read",
      author: "Chef Rohan Sen (Backcountry Culinary Specialist)",
      publishDate: "October 15, 2026",
      image: "https://i.pinimg.com/1200x/5c/92/0c/5c920c25a7485b00953e8d5528481c8c.jpg",
      excerpt: "Canister vs liquid multi-fuel burners, wind efficiency, and hard-anodized aluminum vs titanium cooksets for trail cooking.",
      intro: "A hot meal after a grueling mountain pass ascent restores morale like nothing else. But choosing between integrated canister burners, remote liquid fuel stoves, and ultralight titanium pots requires understanding altitude thermodynamics and wind resistance.",
      sections: [
        {
          heading: "1. Canister Stoves vs. Inverted Liquid Fuel",
          body: "Screw-on isobutane canister stoves are lightweight and boil a liter of water in under 3 minutes in mild weather. However, in sub-zero alpine conditions, canister pressure plunges. For winter expeditions above 4,000m, choose an inverted canister stove with a pre-heat generator tube or a white gas multi-fuel burner."
        },
        {
          heading: "2. Cookware Materials: Titanium vs Hard-Anodized Aluminum",
          body: "Titanium is razor-thin and virtually indestructible, making it the supreme choice for boiling water and rehydrating meals with minimal weight penalty. For simmering stews, eggs, or skillet dishes, hard-anodized aluminum distributes heat evenly and prevents hot spots from scorching food."
        },
        {
          heading: "3. Wind Management & Thermal Efficiency",
          body: "A 15 km/h crosswind can triple fuel consumption and double boil times. Always use an integrated heat-exchanger pot or a wrap-around windscreen (leaving ventilation space around the canister base to prevent overheating)."
        }
      ],
      checklist: [
        "Match burner fuel type to seasonal temperature and altitude",
        "Pack lightweight folding windscreen for gusty ridge camps",
        "Carry secondary piezoelectric igniter or stormproof matches",
        "Bring silicone pot gripper and long-handle titanium spork",
        "Pack biodegradable soap and scrub pad (wash 60m from water sources)"
      ],
      relatedProducts: ["cook-titanium-nomad", "cook-castiron-skillet", "light-beacon-1200"]
    }
  ],

  blogs: [
    {
      id: "top-western-ghats-treks",
      slug: "top-western-ghats-treks",
      title: "Top 7 Dramatic Monsoon Treks in the Western Ghats for 2026",
      category: "Destinations",
      categorySlug: "destinations",
      author: "Kavitha Natarajan",
      authorRole: "Western Ghats Naturalist & Monsoon Specialist",
      authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      publishDate: "October 5, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=85",
      excerpt: "From the misty ridges of Kudremukh to the cascading roaring waterfalls of Dudhsagar, explore the most awe-inspiring monsoon trails.",
      intro: "When the southwest monsoon rolls in over peninsular India, the Western Ghats (Sahyadris) erupt into a vibrant canvas of roaring cascades, sea of clouds, and moss-blanketed cliffs.",
      content: [
        {
          heading: "1. Kudremukh Peak, Karnataka",
          text: "Rising like a horse's head through rolling shola grasslands, Kudremukh is a UNESCO World Heritage site and arguably South India's most pristine trek. You will cross gushing streams, navigate misty ridge walks, and spot endemic Malabar hornbills."
        },
        {
          heading: "2. Harishchandragad via Nalichi Vaat, Maharashtra",
          text: "Famous for the colossal semi-circular Konkan Kada cliff that plunges 1,200 meters into the valley below, creating reverse waterfalls where howling winds blow falling water upwards into the sky."
        },
        {
          heading: "3. Meesapulimala, Kerala",
          text: "Standing at 2,640 meters near Munnar, it is South India's second-highest peak. The trek winds through emerald tea plantations, pine valleys, and rhododendron forests shrouded in dense mist."
        }
      ],
      takeaways: [
        "Obtain mandatory forest permits in advance (especially Kudremukh)",
        "Carry quick-dry clothing and double waterproof pack liners",
        "Sturdy trekking poles with rubber mud baskets are mandatory"
      ],
      relatedProducts: ["wear-storm-shell", "gear-carbon-poles"]
    },
    {
      id: "ultralight-packing-secrets",
      slug: "ultralight-packing-secrets",
      title: "Drop 5 Kilos: The Art of Ultralight Wilderness Backpacking",
      category: "Gear Tips",
      categorySlug: "gear-tips",
      author: "Arjun Verma",
      authorRole: "Technical Gear Architect & Trail Veteran",
      authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      publishDate: "September 18, 2026",
      readTime: "8 min read",
      image: "https://i.pinimg.com/1200x/c7/0f/72/c70f7219bc5e2930683e5255cc7f0e1c.jpg",
      excerpt: "Trimming base weight does not mean sacrificing comfort. How modern titanium, silnylon, and smart multi-use gear revolutionize trekking.",
      intro: "Every gram on your shoulders multiplies across thousands of paces. Learn the core principles used by seasoned long-distance hikers to shed unnecessary pounds without sacrificing safety.",
      content: [
        {
          heading: "Target the 'Big Three' First",
          text: "Your shelter, pack, and sleep system account for up to 70% of total pack weight. Switching from a traditional 4kg canvas tent to a 1.6kg silnylon shelter immediately frees up 2.4 kilograms of trail fatigue."
        },
        {
          heading: "Embrace Multi-Use Functionality",
          text: "Every piece of gear in your pack should serve at least two distinct purposes. Your trekking poles double as shelter support; your insulated jacket doubles as a plush pillow; your titanium cooking pot doubles as a drinking mug."
        }
      ],
      takeaways: [
        "Weigh every item on a digital kitchen scale before packing",
        "Eliminate 'just in case' duplicate clothing items",
        "Invest in high-loft down and titanium cookware"
      ],
      relatedProducts: ["tent-cascade-2p", "cook-titanium-nomad", "sleep-pad-thermalrest"]
    },
    {
      id: "camp-cooking-gourmet",
      slug: "camp-cooking-gourmet",
      title: "Beyond Instant Noodles: Camp Chef Techniques for Forest Feasts",
      category: "Camp Life",
      categorySlug: "camp-life",
      author: "Chef Rohan Sen",
      authorRole: "Backcountry Culinary Specialist",
      authorImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
      publishDate: "September 8, 2026",
      readTime: "5 min read",
      image: "https://i.pinimg.com/736x/5f/77/bf/5f77bfa81550eb143020224c99244fa4.jpg",
      excerpt: "Elevate your backcountry cuisine with pre-mixed spice blends, dehydrated gourmet meals, and cast-iron campfire magic.",
      intro: "After an exhausting 15-kilometer alpine ascent, eating chalky instant noodles gets old fast. With a little culinary strategy, you can enjoy mouth-watering dal makhani, wood-fired skillet flatbreads, and aromatic campfire stews.",
      content: [
        {
          heading: "Pre-Mix Your Aromatics",
          text: "Combine your whole cumin, dried chilies, turmeric, and sea salt in small reusable silicone zip bags at home. This eliminates bulky spice containers while giving your mountain lentils rich restaurant-quality flavor."
        },
        {
          heading: "Mastering Heat Control with Camp Skillets",
          text: "Heavy cast iron holds sustained embers heat beautifully without burning. Place your skillet on flat hot coals rather than leaping open flames for perfect golden-brown crisping."
        }
      ],
      takeaways: [
        "Pack cooking oil in leak-proof Nalgene dropper bottles",
        "Use hard cheeses that don't spoil without refrigeration",
        "Always clean pots with boiling water and hot sand instead of harsh chemicals"
      ],
      relatedProducts: ["cook-castiron-skillet", "cook-titanium-nomad"]
    },
    {
      id: "cold-weather-camping-tricks",
      slug: "cold-weather-camping-tricks",
      title: "10 Winter Camping Tricks to Stay Warm in Sub-Zero Alpine Winds",
      category: "Alpine Trekking",
      categorySlug: "alpine",
      author: "Vikram Rathore",
      authorRole: "IMF High-Altitude Col Lead & Mountaineer",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      publishDate: "August 20, 2026",
      readTime: "7 min read",
      image: "https://i.pinimg.com/1200x/32/d5/ed/32d5ed04af4bb984d3095862a07a2b83.jpg",
      excerpt: "Hard-won wisdom from high-altitude Himalayan winter bivouacs. Keep your toes toasty and your water bottle unfrozen.",
      intro: "Winter camping in snowy heights offers unmatched solitude and crystalline starry skies. But freezing temperatures require strict adherence to thermodynamic principles.",
      content: [
        {
          heading: "Eat High-Calorie Fats Right Before Sleep",
          text: "Your metabolism is your body's furnace. Snacking on walnuts, almonds, and dark chocolate right before crawling into your sleeping bag gives your digestive system slow-burning fuel to generate heat all night."
        },
        {
          heading: "Sleep with Your Water Filter & Boots",
          text: "Hollow-fiber water filters break permanently if trapped water freezes and expands inside the micro-tubes. Always store your filter inside a ziplock bag inside your sleeping bag."
        }
      ],
      takeaways: [
        "Never breathe into your sleeping bag; condensation dampens down",
        "Put a hot water bottle into the footbox 15 minutes before bed",
        "Insulate your sleeping pad with an emergency space blanket underneath"
      ],
      relatedProducts: ["sleeping-bag-boreal", "sleep-pad-thermalrest", "camping-tent-01"]
    },
    {
      id: "hiking-boots-vs-trail-runners",
      slug: "hiking-boots-vs-trail-runners",
      title: "Trail Runners vs. Stiff Hiking Boots: The Modern Trekker's Dilemma",
      category: "Gear Reviews",
      categorySlug: "gear-tips",
      author: "Pooja Sundaram",
      authorRole: "Footwear Biomechanics & Trail Lead",
      authorImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
      publishDate: "August 2, 2026",
      readTime: "6 min read",
      image: "https://i.pinimg.com/1200x/6e/16/e2/6e16e24fee15633cfc6fea929d0e46b8.jpg",
      excerpt: "Which is superior for Indian trails? We compare ankle support, breathability, drying time, and weight penalty.",
      intro: "The debate between traditional leather ankle boots and modern lightweight trail running shoes has raged for a decade. Here is an objective breakdown based on terrain and pack weight.",
      content: [
        {
          heading: "When to Pick Trail Runners",
          text: "For warm-weather treks and packs under 12kg, trail runners dry in 45 minutes after river crossings, prevent heel blisters, and save immense muscle energy across 20-kilometer days."
        },
        {
          heading: "When Heavy Boots Reign Supreme",
          text: "For high-altitude moraines with sharp scree, heavy snow crossings, and multi-day packs exceeding 20kg, rigid leather boots provide indispensable ankle torsional rigidity and crampon compatibility."
        }
      ],
      takeaways: [
        "1 kg on your feet equals 5 kg on your back in energy expenditure",
        "Pair trail runners with gaiters to keep scree and stickers out",
        "Break in heavy boots for at least 30 km before a major expedition"
      ],
      relatedProducts: ["gear-carbon-poles", "backpack-apex-65"]
    },
    {
      id: "stargazing-remote-camps",
      slug: "stargazing-remote-camps",
      title: "Dark Sky Sanctuaries: Best Campgrounds for Astronomy Across India",
      category: "Destinations",
      categorySlug: "destinations",
      author: "TrailHaven Astronomy Club",
      authorRole: "Expedition Photography & Astrophotography Guild",
      authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
      publishDate: "July 19, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
      excerpt: "Witness the galactic core of the Milky Way in full brilliance from Ladakh's Hanle Dark Sky Reserve to Spiti and the Nilgiris.",
      intro: "In an increasingly light-polluted world, true darkness is a rare treasure. Pitch your tent at these remote high-altitude dark-sky sanctuaries to watch meteors streak across the cosmos.",
      content: [
        {
          heading: "1. Hanle Dark Sky Reserve, Ladakh",
          text: "Located at 4,500 meters altitude with virtually zero humidity and atmospheric turbulence, Hanle is India's first designated Dark Sky Reserve. The Milky Way casts visible shadows on the ground on moonless nights."
        },
        {
          heading: "2. Chandratal Lake, Spiti Valley",
          text: "At 4,300 meters, this crescent moon lake reflects millions of alpine stars on its mirror-smooth turquoise surface. Camp at the designated meadow campsite under pristine Bortle Class 1 skies."
        }
      ],
      takeaways: [
        "Plan your camping trip during the new moon phase for pitch darkness",
        "Use red LED headlamps exclusively to preserve human night vision",
        "Bring a warm sub-zero sleeping bag as desert temperatures plunge rapidly"
      ],
      relatedProducts: ["light-beacon-1200", "sleeping-bag-boreal"]
    },
    {
      id: "high-altitude-passes-navigation",
      slug: "high-altitude-passes-navigation",
      title: "Navigating High-Altitude Himalayan Passes: Crevasses, Scree & Fog",
      category: "Alpine Trekking",
      categorySlug: "alpine",
      author: "Vikram Rathore",
      authorRole: "IMF High-Altitude Col Lead & Mountaineer",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      publishDate: "October 12, 2026",
      readTime: "7 min read",
      image: "https://i.pinimg.com/1200x/39/88/6f/39886f7c3799c527f1cd57fc651b8c41.jpg",
      excerpt: "Crossing 5,000m cols demands acute terrain analysis, GPS waypoint caching, and recognizing altitude sickness onset before it's too late.",
      intro: "Steep col crossings above 5,000 meters are among the most exhilarating challenges in mountaineering. Understanding snow bridge stability, scree traversing, and mountain weather patterns is vital.",
      content: [
        {
          heading: "1. The 10 AM Snow Transition Rule",
          text: "Alpine snow crusts are firm and safe before sunrise, but turn into knee-deep slush (postholing) once intense solar radiation hits. Always start your pass push by 4:00 AM.",
          body: "Alpine snow crusts are firm and safe before sunrise, but turn into knee-deep slush (postholing) once intense solar radiation hits. Always start your pass push by 4:00 AM."
        },
        {
          heading: "2. Scree & Talus Management",
          text: "When ascending unstable scree slopes, place each boot heel-first with rhythmic pacing, using dual carbon trekking poles to provide 3 points of contact at all times.",
          body: "When ascending unstable scree slopes, place each boot heel-first with rhythmic pacing, using dual carbon trekking poles to provide 3 points of contact at all times."
        }
      ],
      takeaways: [
        "Alpine push start before 4:00 AM",
        "Cache offline topographical maps and mark camp GPS waypoints",
        "Carry pulse oximeter and Diamox under medical guidance"
      ],
      relatedProducts: ["gear-carbon-poles", "nav-terratrack-compass", "camping-tent-01"]
    },
    {
      id: "solo-backpacking-first-timers",
      slug: "solo-backpacking-first-timers",
      title: "The Mindset of Solo Backpacking: Finding Solitude Without Loneliness",
      category: "Camp Life",
      categorySlug: "camp-life",
      author: "Sneha Ramachandran",
      authorRole: "Ultralight Thru-Hiker & Wilderness Nutritionist",
      authorImage: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=300&q=80",
      publishDate: "October 14, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
      excerpt: "Facing wilderness silence alone is transformative. Practical guidance on trail psychology, nocturnal sounds, and building self-reliance.",
      intro: "Solo backpacking strips away the distractions of daily routine. When you alone are responsible for pitching your tent, boiling water, and finding trail markers, self-confidence blooms.",
      content: [
        {
          heading: "1. Befriending Backcountry Silence",
          text: "The rustle of nocturnal critters outside your tent fly can elevate your heart rate on night one. Understanding animal habits and keeping food securely sealed removes baseless anxiety.",
          body: "The rustle of nocturnal critters outside your tent fly can elevate your heart rate on night one. Understanding animal habits and keeping food securely sealed removes baseless anxiety."
        },
        {
          heading: "2. Strict Redundancy for Solo Safety",
          text: "When hiking alone, there is no partner to borrow a lighter or water filter from. Always carry secondary fire starters, a satellite communicator or offline SOS, and ample first aid.",
          body: "When hiking alone, there is no partner to borrow a lighter or water filter from. Always carry secondary fire starters, a satellite communicator or offline SOS, and ample first aid."
        }
      ],
      takeaways: [
        "Leave detailed route itineraries with family before departure",
        "Carry satellite messenger or whistle around neck",
        "Embrace quiet contemplation and journaling around camp"
      ],
      relatedProducts: ["tent-cascade-2p", "cook-titanium-nomad", "light-beacon-1200"]
    },
    {
      id: "water-filtration-protocols",
      slug: "water-filtration-protocols",
      title: "Leave No Trace Water Filtration: Backcountry River & Glacial Silt Protocols",
      category: "Trail Survival",
      categorySlug: "gear-tips",
      author: "Kavitha Natarajan",
      authorRole: "Western Ghats Naturalist & Monsoon Specialist",
      authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      publishDate: "October 15, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
      excerpt: "Turbid monsoon runoff and glacial silt quickly clog standard hollow-fiber filters. Learn settling methods, pre-filtering, and chemical disinfection.",
      intro: "Pure hydration is life on high alpine trails. When pristine glacial streams turn cloudy with glacial flour or monsoon flash floods stir up clay silt, improper filtration will instantly ruin expensive gear.",
      content: [
        {
          heading: "1. Pre-Sedimentation & Bandana Settling: The Two-Stage Protocol",
          text: "Before pouring glacial flour or river water into hollow-fiber filters, let the collected water settle in a collapsible bucket for 30 minutes. Straining through a clean microfiber cloth or coffee filter removes 95% of suspended grit that would otherwise permanently blind 0.1-micron membranes.",
          body: "Before pouring glacial flour or river water into hollow-fiber filters, let the collected water settle in a collapsible bucket for 30 minutes. Straining through a clean microfiber cloth or coffee filter removes 95% of suspended grit that would otherwise permanently blind 0.1-micron membranes."
        },
        {
          heading: "2. Chemical Backups: Chlorine Dioxide vs. UV SteriPEN",
          text: "Microscopic protozoan cysts like Cryptosporidium resist standard iodine tablets, but chlorine dioxide drops fully eliminate viruses and cysts alike in 4 hours. Pair quick hollow-fiber filtration for clarity with UV or drops for biological safety.",
          body: "Microscopic protozoan cysts like Cryptosporidium resist standard iodine tablets, but chlorine dioxide drops fully eliminate viruses and cysts alike in 4 hours. Pair quick hollow-fiber filtration for clarity with UV or drops for biological safety."
        }
      ],
      takeaways: [
        "Never let wet hollow-fiber filters freeze overnight",
        "Carry alum powder or bandana pre-filters for silty river crossings",
        "Backflush membranes with clean water immediately after heavy sediment days"
      ],
      relatedProducts: ["cook-titanium-nomad", "wear-storm-shell"]
    },
    {
      id: "geodesic-vs-tunnel-tents",
      slug: "geodesic-vs-tunnel-tents",
      title: "Geodesic vs. Tunnel Tents: Surviving 90 km/h Himalayan Ridge Gale Winds",
      category: "Shelter Tech",
      categorySlug: "alpine",
      author: "Vikram Rathore",
      authorRole: "IMF High-Altitude Col Lead & Mountaineer",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      publishDate: "October 15, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=800&q=80",
      excerpt: "High-altitude mountain ridges subject camping shelters to brutal multi-directional gusts. We evaluate structural hoop geometry, guyline vectors, and snow loads.",
      intro: "Above the Himalayan tree line at 4,800 meters, sudden katabatic gusts can flatten an improperly anchored tent in seconds. Choosing between free-standing geodesic domes and aerodynamic tunnel shelters dictates survival in severe alpine storms.",
      content: [
        {
          heading: "1. Multi-Crossover Geodesic Stability in Omnidirectional Gusts",
          text: "Geodesic frames use intersecting aircraft-grade DAC aluminum poles crossing at 5 or more points. This distributes ferocious wind loads across the entire geometric sphere, resisting side-buffeting and preventing pole buckle during unpredictable ridge vortex winds.",
          body: "Geodesic frames use intersecting aircraft-grade DAC aluminum poles crossing at 5 or more points. This distributes ferocious wind loads across the entire geometric sphere, resisting side-buffeting and preventing pole buckle during unpredictable ridge vortex winds."
        },
        {
          heading: "2. Tunnel Tents: Aerodynamic Efficiency with Strict Pitch Direction",
          text: "Tunnel shelters boast unbeatable space-to-weight ratios and shed horizontal gales like a jet aircraft wing—provided the narrow vestibule is aligned precisely into the wind vector. However, if wind shifts 90 degrees during the night, large sidewalls endure severe shear forces.",
          body: "Tunnel shelters boast unbeatable space-to-weight ratios and shed horizontal gales like a jet aircraft wing—provided the narrow vestibule is aligned precisely into the wind vector. However, if wind shifts 90 degrees during the night, large sidewalls endure severe shear forces."
        }
      ],
      takeaways: [
        "Pitch aerodynamic tail into prevailing wind vector",
        "Use deadman snow anchors and 4mm Dyneema reflective guylines",
        "Double-peg key storm guyout anchor points on scree ridges"
      ],
      relatedProducts: ["camping-tent-01", "tent-cascade-2p", "sleeping-bag-boreal"]
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Alpine Camp under the Milky Way",
      category: "mountain",
      categoryName: "Mountain Camping",
      location: "Spiti Valley, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85",
      caption: "Summit 3P glowing under the celestial arc of the Milky Way at 4,200m."
    },
    {
      id: "gal-2",
      title: "Morning Mist over Western Ghats Ridge",
      category: "forest",
      categoryName: "Forest & Hiking",
      location: "Kudremukh National Park, Karnataka",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=85",
      caption: "Emerald shola forests greeting the first rays of tropical morning sun."
    },
    {
      id: "gal-3",
      title: "Campfire Brew in the Pine Forest",
      category: "cooking",
      categoryName: "Outdoor Cooking",
      location: "Parvati Valley, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1701835068926-171d92ceca97?auto=format&fit=crop&w=1200&q=85",
      caption: "Freshly brewed mountain pour-over coffee heated over glowing pine embers."
    },
    {
      id: "gal-4",
      title: "Summit Push on Rocky Ridges",
      category: "mountain",
      categoryName: "Mountain Camping",
      location: "Roopkund Trail, Uttarakhand",
      image: "https://images.unsplash.com/photo-1594832512784-dbd688e0572e?auto=format&fit=crop&w=1200&q=85",
      caption: "Trekker navigating rocky high-altitude ridges with Karakoram carbon poles."
    },
    {
      id: "gal-5",
      title: "Golden Hour Basecamp in the Meadow",
      category: "equipment",
      categoryName: "Camping Equipment",
      location: "Dayara Bugyal, Uttarakhand",
      image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?auto=format&fit=crop&w=1200&q=85",
      caption: "Warm glow on our Geodesic tent pitched on rolling sub-alpine meadows."
    },
    {
      id: "gal-6",
      title: "Through Deep Forest Canopies",
      category: "forest",
      categoryName: "Forest & Hiking",
      location: "Silent Valley, Kerala",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
      caption: "Sunbeams piercing ancient evergreen rainforest canopies."
    },
    {
      id: "gal-7",
      title: "Sizzling Camp Skillet Feast",
      category: "cooking",
      categoryName: "Outdoor Cooking",
      location: "Chopta, Uttarakhand",
      image: "https://images.unsplash.com/photo-1692313532975-513a383c48f7?auto=format&fit=crop&w=1200&q=85",
      caption: "Cast iron skillet cooking on a quiet evening in the cedar forest."
    },
    {
      id: "gal-8",
      title: "Alpine Lake Reflection at Dusk",
      category: "mountain",
      categoryName: "Mountain Camping",
      location: "Chandratal Lake, Spiti",
      image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=85",
      caption: "Still crystal waters reflecting sunset colors on steep jagged peaks."
    },
    {
      id: "gal-9",
      title: "High-Altitude Pack Lineup",
      category: "equipment",
      categoryName: "Camping Equipment",
      location: "Hampta Pass, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1665724233211-02a7afbb8b36?auto=format&fit=crop&w=1200&q=85",
      caption: "Vanguard 65L packs loaded and ready for steep boulder field crossing."
    },
    {
      id: "gal-10",
      title: "High-Altitude Bivouac Snow Shelter",
      category: "equipment",
      categoryName: "Camping Equipment",
      location: "Kedarkantha Ridge, Uttarakhand",
      image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=1200&q=85",
      caption: "Snow-tested 4-season geodesic shelter engineered for alpine winter winds."
    },
    {
      id: "gal-11",
      title: "Autumn Foliage Ridge Trek",
      category: "forest",
      categoryName: "Forest & Hiking",
      location: "Nilgiris High Ridge, Tamil Nadu",
      image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=85",
      caption: "Golden autumn hues along the misty ridge trail through the Nilgiris."
    },
    {
      id: "gal-12",
      title: "Glacial Basin Winter Traverse",
      category: "mountain",
      categoryName: "Mountain Camping",
      location: "Nubra Valley, Ladakh",
      image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=85",
      caption: "Trekking through dramatic ice moraines and frozen high passes."
    },
    {
      id: "gal-13",
      title: "Ancient Pine Forest Trail Walk",
      category: "forest",
      categoryName: "Forest & Hiking",
      location: "Kodaikanal Shola Pines, Tamil Nadu",
      image: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1200&q=85",
      caption: "Towering pine canopy filter cool mountain air on morning trail hikes."
    },
    {
      id: "gal-14",
      title: "Trail-Tested Trekking Hardware",
      category: "equipment",
      categoryName: "Camping Equipment",
      location: "Sandakphu Ridge, West Bengal",
      image: "https://images.unsplash.com/photo-1785772534309-7503e6e92790?auto=format&fit=crop&w=1200&q=85",
      caption: "Carbon fiber trekking poles providing unyielding stability across scree."
    },
    {
      id: "gal-15",
      title: "Fast-Boil Backcountry Titanium Stove",
      category: "cooking",
      categoryName: "Outdoor Cooking",
      location: "Tirthan Riverbank, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1522041350204-22285237eeca?auto=format&fit=crop&w=1200&q=85",
      caption: "Boiling mountain stream water in under 2 minutes with Nomad Titanium."
    },
    {
      id: "gal-16",
      title: "Alpine Kettle Stew & Warm Chai",
      category: "cooking",
      categoryName: "Outdoor Cooking",
      location: "Har Ki Dun Valley, Uttarakhand",
      image: "https://images.unsplash.com/photo-1780394045328-ca3af6a19f8e?auto=format&fit=crop&w=1200&q=85",
      caption: "Gathered around the simmer pot as evening alpine chill sets in."
    }
  ],

  testimonials: [
    {
      name: "Aditya Mukherjee",
      role: "Himalayan Mountaineering Club Leader",
      location: "Kolkata, West Bengal",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "We subjected the Summit 3P to 85 km/h freezing squalls at 4,800m on the Pin Bhaba Pass. While three competitor tents shredded their poles, our TrailHaven shelter stood motionless. Absolutely bulletproof craftsmanship.",
      rating: 5,
      product: "Summit 3P Expedition Tent"
    },
    {
      name: "Sneha Ramachandran",
      role: "Solo Backpacker & Photographer",
      location: "Bengaluru, Karnataka",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      quote: "The Vanguard 65L pack transferred all the load effortlessly onto my hips during a 6-day traverse through Kudremukh. The internal harness engineering is on par with premium European brands, at half the price.",
      rating: 5,
      product: "Vanguard 65L Pack"
    },
    {
      name: "Commander Raghuveer Singh (Retd.)",
      role: "Wilderness Survival Instructor",
      location: "Dehradun, Uttarakhand",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "In 25 years of tactical outdoor expeditions, rarely have I witnessed such thoughtful attention to detail. The titanium cooksets and 0.1-micron gravity filters are genuinely lifesavers in remote backcountry terrain.",
      rating: 5,
      product: "Adventure Explorer Bundle"
    }
  ],

  faqs: [
    {
      q: "Where is TrailHaven based and do you ship across India?",
      a: "TrailHaven is based in Chennai, Tamil Nadu, India. We ship all outdoor gear and equipment pan-India via express insured couriers with real-time tracking. Orders over ₹2,999 qualify for 100% Free Shipping."
    },
    {
      q: "What is TrailHaven's product warranty policy?",
      a: "Every TrailHaven tent, backpack, and titanium hardware comes with a 3-Year Alpine Guarantee covering manufacturing defects, seam integrity, and pole hardware. Our backpacks carry a lifetime workmanship guarantee."
    },
    {
      q: "How do I choose between a 2-person and 3-person tent?",
      a: "If you are two adults trekking with large rucksacks (50L+), we strongly recommend our 3-person tent for comfortable gear storage inside the vestibules. If you prioritize ultralight backpacking speed, the 2-person Cascade shelter is ideal."
    },
    {
      q: "Are the coupon codes real and how do I apply them?",
      a: "Yes! Use coupon code 'TRAIL10' for 10% off your entire order, or 'ADVENTURE20' for 20% off orders over ₹25,000 during checkout on the Order page."
    },
    {
      q: "What payment methods are supported on TrailHaven?",
      a: "In this interactive prototype, demo checkout simulates UPI, Net Banking, Credit/Debit Cards, and Cash on Delivery with instantaneous order reference confirmation."
    }
  ]
};

// Export to window and module for vanilla JS and node test runners
if (typeof window !== 'undefined') {
  window.TrailHavenData = TrailHavenData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TrailHavenData;
}
