(() => {
  const SAVE_KEY = "simon-says-wanderers-chronicle-save-v1";
  const TOTAL_UNIQUE_DISCOVERIES = 20;

  const REGION_ORDER = [
    "mossy-lane",
    "lantern-caves",
    "sunken-arcade",
    "cloudrail-ruins",
    "star-orchard"
  ];

  const REGIONS = [
    {
      id: "mossy-lane",
      name: "Mossy Lane",
      icon: "🌿",
      unlockRenown: 1,
      unlockChapter: 0,
      routeLength: 90,
      themeClass: "",
      description: "A soft beginner's road full of hedges, tea steam, and tiny things worth noticing.",
      sky: [
        "☁️        ☀️          🐦",
        "   ☀️     ☁️      🐞    ",
        "☁️   🪁        ☀️        "
      ],
      horizon: [
        "🌲  🍄   🌾  🪵   🌲   🍄",
        "🌲  🌼   🍄  🌾   🌲   🐇",
        "🌲  🪵   🌼  🍄   🌲   🐦"
      ],
      terrain: [".", "·", "_", "."],
      multipliers: {
        trail: 1,
        journal: 1,
        coins: 0.7,
        discoveries: 0.9,
        relicDust: 0.5,
        acclaim: 1,
        supplies: 1.15
      },
      discoveryIds: [
        "crooked-birdhouse",
        "pocket-mica",
        "rain-jar",
        "whistling-milepost"
      ]
    },
    {
      id: "lantern-caves",
      name: "Lantern Caves",
      icon: "🕯️",
      unlockRenown: 2,
      unlockChapter: 4,
      routeLength: 125,
      themeClass: "sky-cave",
      description: "Cool echoing tunnels where sketches turn into maps and shadows keep souvenirs.",
      sky: [
        "      🦇       ✨      💧 ",
        "  ✨      💧      🦇      ",
        "💧      ✨       🪨      "
      ],
      horizon: [
        "🪨  🕯️   💧  🪨   🦇   🪨",
        "🪨  💎   🕯️  💧   🪨   🦇",
        "🪨  🦇   💧  🕯️   🪨   💎"
      ],
      terrain: ["=", "_", ".", "="],
      multipliers: {
        trail: 1.05,
        journal: 1.18,
        coins: 0.85,
        discoveries: 1.25,
        relicDust: 0.9,
        acclaim: 1.08,
        supplies: 0.9
      },
      discoveryIds: [
        "bell-echo-shell",
        "moonmilk-sketch",
        "coalfire-ribbon",
        "blue-cap-lantern"
      ]
    },
    {
      id: "sunken-arcade",
      name: "Sunken Arcade",
      icon: "🎠",
      unlockRenown: 3,
      unlockChapter: 5,
      routeLength: 150,
      themeClass: "sky-water",
      description: "A flooded promenade where audiences gather around every odd little tale.",
      sky: [
        "☀️      🌊      🐟      ",
        "   🪼      ☀️      🌊    ",
        "🌊      ☀️      🐚       "
      ],
      horizon: [
        "🎪  🛶   🪙  🌊   🕯️   🎠",
        "🌊  🎏   🪙  🛶   🎪   🐟",
        "🎠  🌊   🪙  🎏   🛶   🎪"
      ],
      terrain: ["~", "≈", ".", "~"],
      multipliers: {
        trail: 1,
        journal: 1.02,
        coins: 1.45,
        discoveries: 1.08,
        relicDust: 0.8,
        acclaim: 1.15,
        supplies: 1
      },
      discoveryIds: [
        "tin-carousel-fish",
        "token-pier-nine",
        "velvet-tide-poster",
        "clockwork-kelp"
      ]
    },
    {
      id: "cloudrail-ruins",
      name: "Cloudrail Ruins",
      icon: "☁️",
      unlockRenown: 5,
      unlockChapter: 7,
      routeLength: 180,
      themeClass: "sky-cloud",
      description: "Broken rail lines hanging over weather, full of brass scraps and sudden speed.",
      sky: [
        "☁️     🪁      ☀️      ☁️",
        "   ☀️      ☁️      ⚙️    ",
        "☁️      ⚙️      🪁       "
      ],
      horizon: [
        "☁️  🛤️   ⚙️  ☁️   🪁   🛤️",
        "🛤️  ☁️   ⚙️  🪁   ☁️   🛤️",
        "☁️  🪁   🛤️  ⚙️   ☁️   🛠️"
      ],
      terrain: ["-", "=", "-", "_"],
      multipliers: {
        trail: 1.24,
        journal: 1.05,
        coins: 1.1,
        discoveries: 1.15,
        relicDust: 1.2,
        acclaim: 1.2,
        supplies: 0.95
      },
      discoveryIds: [
        "brass-feather",
        "kite-no-string",
        "copper-cloud-seed",
        "sparrow-wrench"
      ]
    },
    {
      id: "star-orchard",
      name: "Star Orchard",
      icon: "🌌",
      unlockRenown: 7,
      unlockChapter: 9,
      routeLength: 220,
      themeClass: "sky-star",
      description: "A midnight grove of warm fruit, glass constellations, and very patient miracles.",
      sky: [
        "✨     🌙      ✨      ☄️",
        "  ☄️      ✨      🌙     ",
        "✨      🌙      ✨      🔭"
      ],
      horizon: [
        "🌌  🍎   🔭  ✨   🌳   🍎",
        "🌳  ✨   🍎  🔭   🌌   🌟",
        "🍎  🌳   ✨  🔭   🍎   ☄️"
      ],
      terrain: ["*", ".", "*", "."],
      multipliers: {
        trail: 1.12,
        journal: 1.22,
        coins: 1.16,
        discoveries: 1.55,
        relicDust: 1.42,
        acclaim: 1.34,
        supplies: 0.92
      },
      discoveryIds: [
        "glass-pomegranate",
        "humming-astrolabe",
        "night-bloom-map",
        "small-warm-comet"
      ]
    }
  ];

  const REGION_BY_ID = Object.fromEntries(REGIONS.map((region) => [region.id, region]));

  const SUGGESTIONS = [
    {
      id: "wander",
      name: "Press On",
      icon: "🧭",
      desc: "Favors distance, journal pages, and a steady sense of progress."
    },
    {
      id: "rest",
      name: "Take Five",
      icon: "🔥",
      desc: "Lets Simon sit, eat, and restore vigor before the next stretch."
    },
    {
      id: "forage",
      name: "Forage",
      icon: "🧺",
      desc: "Finds snacks, useful scraps, and little side paths."
    },
    {
      id: "study",
      name: "Study",
      icon: "📝",
      desc: "Turns strange places into sketches, notes, and better discoveries."
    },
    {
      id: "perform",
      name: "Perform",
      icon: "🎻",
      desc: "Makes room for coins and renown by sharing what the road has taught him."
    },
    {
      id: "tinker",
      name: "Tinker",
      icon: "🛠️",
      desc: "Breaks salvage into relic dust and practical upgrades."
    },
    {
      id: "commune",
      name: "Commune",
      icon: "✨",
      desc: "Late-game guidance for listening instead of forcing outcomes."
    }
  ];

  const SUGGESTION_BY_ID = Object.fromEntries(SUGGESTIONS.map((item) => [item.id, item]));

  const ACTIVITY_VARIANTS = {
    "mossy-lane": {
      wander: {
        title: "Following bright mushrooms",
        text: "Simon wanders hedge to hedge, jotting down bird calls and useful turns.",
        icon: "🚶"
      },
      rest: {
        title: "Brewing tea by the path",
        text: "He settles near the milepost, warms his hands, and lets the road come back into focus.",
        icon: "🔥"
      },
      forage: {
        title: "Checking the berry patches",
        text: "Small supplies pile up fast when he lets curiosity wander a little off the lane.",
        icon: "🧺"
      },
      study: {
        title: "Sketching crooked signposts",
        text: "Every bent board and carved fence starts making more sense in the journal.",
        icon: "📝"
      },
      perform: {
        title: "Telling trail stories at the bridge",
        text: "Travelers linger for tea, stories, and whatever he learned before sunset.",
        icon: "🎻"
      },
      tinker: {
        title: "Mending a rain-click compass",
        text: "Bits of brass and patience become future luck.",
        icon: "🛠️"
      },
      commune: {
        title: "Listening to root-hum",
        text: "The lane answers back when the campfire is quiet enough.",
        icon: "✨"
      }
    },
    "lantern-caves": {
      wander: {
        title: "Picking a careful route through echoes",
        text: "The cave bends twice before Simon does, but he still comes away with distance and notes.",
        icon: "🕯️"
      },
      rest: {
        title: "Resting beside the dripstone",
        text: "He lets the lantern sway while the cave settles into a softer rhythm.",
        icon: "🪔"
      },
      forage: {
        title: "Gathering fungus and clean water",
        text: "The packs fill with cave-safe snacks and whatever the dark was hiding.",
        icon: "🫙"
      },
      study: {
        title: "Mapping the glow-veins",
        text: "This is where the journal turns from notebook into atlas.",
        icon: "🗺️"
      },
      perform: {
        title: "Playing to the echo chamber",
        text: "Even the cave walls feel like an audience down here.",
        icon: "🎶"
      },
      tinker: {
        title: "Wiring a lantern from old parts",
        text: "Loose glass and patient hands are a decent start to a better machine.",
        icon: "🔧"
      },
      commune: {
        title: "Reading the cave's reply",
        text: "The echo answers questions he never quite asked aloud.",
        icon: "🌠"
      }
    },
    "sunken-arcade": {
      wander: {
        title: "Drifting the flooded promenade",
        text: "Simon moves from stall to stall, collecting both distance and gossip.",
        icon: "🚣"
      },
      rest: {
        title: "Resting under striped awnings",
        text: "A warm drink and a dry bench do a lot for morale.",
        icon: "☕"
      },
      forage: {
        title: "Bartering for provisions",
        text: "A handful of notes and a smile are usually enough to keep the pack healthy.",
        icon: "🥖"
      },
      study: {
        title: "Cataloging drowned curios",
        text: "The arcade still teaches, if he slows down long enough to let it.",
        icon: "📚"
      },
      perform: {
        title: "Playing a tune for spare coins",
        text: "Crowds gather quickly here. So do tips.",
        icon: "🎺"
      },
      tinker: {
        title: "Rebuilding a prize machine",
        text: "A surprising amount of future progress hides inside old carnival gears.",
        icon: "⚙️"
      },
      commune: {
        title: "Listening to tide-memory",
        text: "The water keeps old applause and gives it back in pieces.",
        icon: "🌊"
      }
    },
    "cloudrail-ruins": {
      wander: {
        title: "Crossing the weather rails",
        text: "Even a simple walk feels heroic when the floor is mostly cloud.",
        icon: "🪁"
      },
      rest: {
        title: "Sheltering behind brass windbreaks",
        text: "The rail hums quietly while Simon catches his breath.",
        icon: "☁️"
      },
      forage: {
        title: "Collecting salvage from the broken line",
        text: "Cloudrail forage looks a lot like treasure hunting with gloves on.",
        icon: "🧰"
      },
      study: {
        title: "Tracing the conductor's notes",
        text: "Old route plans become very modern progress.",
        icon: "📐"
      },
      perform: {
        title: "Whistling into the wind tunnel",
        text: "The air carries his stories farther than any town square could.",
        icon: "📯"
      },
      tinker: {
        title: "Tuning sky-rail hardware",
        text: "This is where relic dust starts looking genuinely useful.",
        icon: "🪛"
      },
      commune: {
        title: "Matching the storm's tempo",
        text: "For a second, Simon and the weather keep the same beat.",
        icon: "⚡"
      }
    },
    "star-orchard": {
      wander: {
        title: "Walking between warm constellations",
        text: "Every tree seems a little impossible, which makes the journal very happy.",
        icon: "🌙"
      },
      rest: {
        title: "Napping beneath a comet branch",
        text: "Rest comes easy when the sky feels like a blanket.",
        icon: "💤"
      },
      forage: {
        title: "Gathering night fruit",
        text: "The orchard practically hands him supplies if he asks nicely.",
        icon: "🍎"
      },
      study: {
        title: "Charting the humming rows",
        text: "Every map here looks a little bit like a spell.",
        icon: "🔭"
      },
      perform: {
        title: "Singing under glass constellations",
        text: "The orchard answers applause with its own kind of light.",
        icon: "🎼"
      },
      tinker: {
        title: "Grinding starlight into working parts",
        text: "No one told Simon relic dust could glow this warmly.",
        icon: "🧿"
      },
      commune: {
        title: "Listening for the orchard's chorus",
        text: "This is less an action and more a trust exercise with the universe.",
        icon: "🌌"
      }
    }
  };

  const DISCOVERIES = [
    {
      id: "crooked-birdhouse",
      region: "mossy-lane",
      name: "Crooked Birdhouse",
      icon: "🪺",
      desc: "A hand-built birdhouse full of borrowed ribbon and patient repair.",
      bonusText: "+6% journal gain",
      apply: (bonuses) => {
        bonuses.journal += 0.06;
      }
    },
    {
      id: "pocket-mica",
      region: "mossy-lane",
      name: "Pocketful of Mica",
      icon: "🪨",
      desc: "Flat glittering stones that make every hedge look important.",
      bonusText: "+8% discovery chance",
      apply: (bonuses) => {
        bonuses.discoveryChance += 0.08;
      }
    },
    {
      id: "rain-jar",
      region: "mossy-lane",
      name: "Rain Jar",
      icon: "🫙",
      desc: "A jar that somehow keeps the sound of yesterday's rainfall.",
      bonusText: "+6 max vigor",
      apply: (bonuses) => {
        bonuses.maxVigor += 6;
      }
    },
    {
      id: "whistling-milepost",
      region: "mossy-lane",
      name: "Whistling Milepost",
      icon: "🪧",
      desc: "A bent marker that sings when the wind arrives from the west.",
      bonusText: "+8% trail gain",
      apply: (bonuses) => {
        bonuses.travel += 0.08;
      }
    },
    {
      id: "bell-echo-shell",
      region: "lantern-caves",
      name: "Bell Echo Shell",
      icon: "🔔",
      desc: "A stone shell that rings a moment after you touch it.",
      bonusText: "+10% cadence retention",
      apply: (bonuses) => {
        bonuses.cadenceRetention += 0.1;
      }
    },
    {
      id: "moonmilk-sketch",
      region: "lantern-caves",
      name: "Moonmilk Sketch",
      icon: "🖼️",
      desc: "A mineral drawing that changes slightly every time the lantern moves.",
      bonusText: "+12% study gain",
      apply: (bonuses) => {
        bonuses.study += 0.12;
      }
    },
    {
      id: "coalfire-ribbon",
      region: "lantern-caves",
      name: "Coalfire Ribbon",
      icon: "🎗️",
      desc: "A soot-dark ribbon that still throws warm color into the air.",
      bonusText: "+8% coin gain",
      apply: (bonuses) => {
        bonuses.coins += 0.08;
      }
    },
    {
      id: "blue-cap-lantern",
      region: "lantern-caves",
      name: "Blue-Cap Lantern",
      icon: "🏮",
      desc: "Small, steady, and kinder to tired eyes than it has any right to be.",
      bonusText: "+6 max vigor",
      apply: (bonuses) => {
        bonuses.maxVigor += 6;
      }
    },
    {
      id: "tin-carousel-fish",
      region: "sunken-arcade",
      name: "Tin Carousel Fish",
      icon: "🐟",
      desc: "A tiny carnival fish that spins once every time a story lands well.",
      bonusText: "+12% perform gain",
      apply: (bonuses) => {
        bonuses.perform += 0.12;
      }
    },
    {
      id: "token-pier-nine",
      region: "sunken-arcade",
      name: "Token from Pier Nine",
      icon: "🪙",
      desc: "A transit token polished smooth by nervous thumbs and lucky pockets.",
      bonusText: "+10 coins on renown up",
      apply: (bonuses) => {
        bonuses.renownCoins += 10;
      }
    },
    {
      id: "velvet-tide-poster",
      region: "sunken-arcade",
      name: "Velvet Tide Poster",
      icon: "🎭",
      desc: "A faded poster for a show no one remembers and everyone misses.",
      bonusText: "+6% journal gain",
      apply: (bonuses) => {
        bonuses.journal += 0.06;
      }
    },
    {
      id: "clockwork-kelp",
      region: "sunken-arcade",
      name: "Clockwork Kelp",
      icon: "🌿",
      desc: "A slick mechanical strand that insists on being wound every morning.",
      bonusText: "+10% tinker gain",
      apply: (bonuses) => {
        bonuses.tinker += 0.1;
      }
    },
    {
      id: "brass-feather",
      region: "cloudrail-ruins",
      name: "Conductor's Brass Feather",
      icon: "🪶",
      desc: "A polished feather pin once used to signal a safe line.",
      bonusText: "+10% trail gain",
      apply: (bonuses) => {
        bonuses.travel += 0.1;
      }
    },
    {
      id: "kite-no-string",
      region: "cloudrail-ruins",
      name: "Kite with No String",
      icon: "🪁",
      desc: "Still catches the wind anyway. Somehow that feels reassuring.",
      bonusText: "+2 extra cadence for varied guidance",
      apply: (bonuses) => {
        bonuses.variedCadence += 2;
      }
    },
    {
      id: "copper-cloud-seed",
      region: "cloudrail-ruins",
      name: "Copper Cloud Seed",
      icon: "🌰",
      desc: "A warm metal seed that vibrates whenever a phenomenon is near.",
      bonusText: "+14% phenomenon rewards",
      apply: (bonuses) => {
        bonuses.phenomenon += 0.14;
      }
    },
    {
      id: "sparrow-wrench",
      region: "cloudrail-ruins",
      name: "Sparrow Wrench",
      icon: "🔧",
      desc: "Sized for tiny hands, still useful for bigger miracles.",
      bonusText: "+8% coin gain",
      apply: (bonuses) => {
        bonuses.coins += 0.08;
      }
    },
    {
      id: "glass-pomegranate",
      region: "star-orchard",
      name: "Glass Pomegranate",
      icon: "🍎",
      desc: "Heavy with starlight, somehow warm, somehow full.",
      bonusText: "+12% discovery chance",
      apply: (bonuses) => {
        bonuses.discoveryChance += 0.12;
      }
    },
    {
      id: "humming-astrolabe",
      region: "star-orchard",
      name: "Humming Astrolabe",
      icon: "🧭",
      desc: "A small instrument that points toward whatever matters most this minute.",
      bonusText: "+12% relic dust gain",
      apply: (bonuses) => {
        bonuses.relicDust += 0.12;
      }
    },
    {
      id: "night-bloom-map",
      region: "star-orchard",
      name: "Night-Bloom Map",
      icon: "🗺️",
      desc: "A map that only really shows itself when the camp goes quiet.",
      bonusText: "+8% all gains",
      apply: (bonuses) => {
        bonuses.all += 0.08;
      }
    },
    {
      id: "small-warm-comet",
      region: "star-orchard",
      name: "Small Warm Comet",
      icon: "☄️",
      desc: "Not a comet exactly, but close enough for the backpack.",
      bonusText: "+12 max vigor",
      apply: (bonuses) => {
        bonuses.maxVigor += 12;
      }
    }
  ];

  const DISCOVERY_BY_ID = Object.fromEntries(DISCOVERIES.map((item) => [item.id, item]));

  const PROJECTS = [
    {
      id: "bedroll",
      name: "Patchwork Bedroll",
      icon: "🛏️",
      desc: "More vigor and stronger recovery whenever Simon slows down.",
      unlockChapter: 2,
      max: 3,
      effectText: (level) => `Max vigor +${level * 12}, rest strength +${Math.round(level * 18)}%`,
      cost: (level) => ({
        journal: Math.floor(24 * Math.pow(1.75, level)),
        supplies: level === 0 ? 0 : 4 + level * 2
      }),
      apply: (level, bonuses) => {
        bonuses.maxVigor += level * 12;
        bonuses.rest += level * 0.18;
      }
    },
    {
      id: "trail-signs",
      name: "Trail Markers",
      icon: "🪧",
      desc: "Makes the route feel legible and keeps good rhythm from fading so quickly.",
      unlockChapter: 2,
      max: 3,
      effectText: (level) => `Trail gain +${Math.round(level * 14)}%, cadence retention +${Math.round(level * 8)}%`,
      cost: (level) => ({
        journal: Math.floor(30 * Math.pow(1.8, level)),
        supplies: 3 + level * 2
      }),
      apply: (level, bonuses) => {
        bonuses.travel += level * 0.14;
        bonuses.cadenceRetention += level * 0.08;
      }
    },
    {
      id: "snack-satchel",
      name: "Snack Satchel",
      icon: "🎒",
      desc: "Better foraging and less friction when the road gets long.",
      unlockChapter: 2,
      max: 3,
      effectText: (level) => `Supply gain +${Math.round(level * 22)}%, trail upkeep -${Math.round(level * 8)}%`,
      cost: (level) => ({
        journal: Math.floor(28 * Math.pow(1.72, level)),
        supplies: 5 + level * 3
      }),
      apply: (level, bonuses) => {
        bonuses.supplies += level * 0.22;
        bonuses.supplyEfficiency += level * 0.08;
      }
    },
    {
      id: "field-journal",
      name: "Field Journal",
      icon: "📖",
      desc: "A sturdier notebook that makes slower, smarter play more rewarding.",
      unlockChapter: 4,
      max: 3,
      effectText: (level) => `Journal gain +${Math.round(level * 18)}%, study gain +${Math.round(level * 12)}%`,
      cost: (level) => ({
        journal: Math.floor(58 * Math.pow(1.84, level)),
        coins: 15 + level * 9
      }),
      apply: (level, bonuses) => {
        bonuses.journal += level * 0.18;
        bonuses.study += level * 0.12;
      }
    },
    {
      id: "lantern-rig",
      name: "Lantern Rig",
      icon: "🏮",
      desc: "Turns careful study into discovery-rich expeditions.",
      unlockChapter: 4,
      max: 1,
      effectText: () => "Discovery chance +25%, study gain +18%",
      cost: () => ({
        journal: 92,
        coins: 20,
        discoveries: 2
      }),
      apply: (level, bonuses) => {
        bonuses.discoveryChance += level * 0.25;
        bonuses.study += level * 0.18;
      }
    },
    {
      id: "story-banner",
      name: "Story Banner",
      icon: "🎏",
      desc: "A portable stage sign that makes Perform worth planning around.",
      unlockChapter: 5,
      max: 2,
      effectText: (level) => `Coin gain +${Math.round(level * 16)}%, perform gain +${Math.round(level * 14)}%`,
      cost: (level) => ({
        journal: Math.floor(112 * Math.pow(1.8, level)),
        coins: 28 + level * 18,
        discoveries: 1 + level
      }),
      apply: (level, bonuses) => {
        bonuses.coins += level * 0.16;
        bonuses.perform += level * 0.14;
      }
    },
    {
      id: "workshop-cart",
      name: "Workshop Cart",
      icon: "🛒",
      desc: "Lets tinkering become a full part of the long-term loop instead of a novelty.",
      unlockChapter: 6,
      max: 2,
      effectText: (level) => `Relic dust +${Math.round(level * 24)}%, tinker gain +${Math.round(level * 18)}%`,
      cost: (level) => ({
        journal: Math.floor(168 * Math.pow(1.86, level)),
        coins: 54 + level * 30,
        discoveries: 3 + level,
        relicDust: level === 0 ? 0 : 18 + level * 8
      }),
      apply: (level, bonuses) => {
        bonuses.relicDust += level * 0.24;
        bonuses.tinker += level * 0.18;
      }
    },
    {
      id: "cloud-sail",
      name: "Cloud Sail",
      icon: "🪂",
      desc: "Built for long rails, quick loops, and better phenomenon rewards.",
      unlockChapter: 8,
      max: 1,
      effectText: () => "Trail gain +18%, phenomenon reward +30%",
      cost: () => ({
        journal: 240,
        coins: 120,
        discoveries: 5,
        relicDust: 28
      }),
      apply: (level, bonuses) => {
        bonuses.travel += level * 0.18;
        bonuses.phenomenon += level * 0.3;
      }
    },
    {
      id: "star-almanac",
      name: "Star Almanac",
      icon: "🔭",
      desc: "Late-game guidance for a calmer, richer, more magical loop.",
      unlockChapter: 9,
      max: 1,
      effectText: () => "All gains +12%, commune gain +28%, cadence retention +18%",
      cost: () => ({
        journal: 360,
        coins: 160,
        discoveries: 7,
        relicDust: 55
      }),
      apply: (level, bonuses) => {
        bonuses.all += level * 0.12;
        bonuses.commune += level * 0.28;
        bonuses.cadenceRetention += level * 0.18;
      }
    }
  ];

  const PROJECT_BY_ID = Object.fromEntries(PROJECTS.map((item) => [item.id, item]));

  const PHENOMENA = [
    {
      id: "firefly-parade",
      name: "Firefly Parade",
      icon: "✨",
      duration: 80,
      target: 3,
      goalType: "variety",
      desc: "Complete three different guided suggestions while the parade keeps pace beside the trail.",
      reward: {
        journal: 110,
        discoveries: 1,
        acclaim: 28
      }
    },
    {
      id: "drift-market",
      name: "Drift Market",
      icon: "🛶",
      duration: 85,
      target: 70,
      goalType: "coins",
      desc: "Earn 70 coins before the floating market folds its awnings and drifts away.",
      reward: {
        coins: 46,
        relicDust: 18,
        acclaim: 24
      }
    },
    {
      id: "skybridge-gust",
      name: "Skybridge Gust",
      icon: "🌬️",
      duration: 75,
      target: 90,
      goalType: "travel",
      desc: "Cover 90 trail while the wind is carrying the route forward for free.",
      reward: {
        journal: 125,
        discoveries: 1,
        acclaim: 30
      }
    },
    {
      id: "quiet-observatory",
      name: "Quiet Observatory",
      icon: "🔭",
      duration: 90,
      target: 130,
      goalType: "journal",
      desc: "Gather 130 journal from patient work before the observatory shutters itself again.",
      reward: {
        journal: 155,
        relicDust: 14,
        acclaim: 32
      }
    }
  ];

  const PHENOMENON_BY_ID = Object.fromEntries(PHENOMENA.map((item) => [item.id, item]));

  const MILESTONES = [
    {
      id: "renown-3",
      title: "Known Around The Lane",
      check: (state) => state.renown >= 3,
      reward: { journal: 90, coins: 18 }
    },
    {
      id: "first-discovery",
      title: "First Keepsake",
      check: (state) => state.uniqueDiscoveries.length >= 1,
      reward: { journal: 70, discoveries: 1 }
    },
    {
      id: "camp-builder",
      title: "Camp Builder",
      check: (state) => totalProjectLevels(state) >= 4,
      reward: { journal: 110, coins: 22 }
    },
    {
      id: "cadence-60",
      title: "Golden Rhythm",
      check: (state) => state.cadence >= 60,
      reward: { journal: 95, acclaim: 20 }
    },
    {
      id: "three-regions",
      title: "Three Routes Deep",
      check: (state) => state.visitedRegions.length >= 3,
      reward: { coins: 40, discoveries: 1 }
    },
    {
      id: "first-phenomenon",
      title: "Weather Witness",
      check: (state) => state.stats.completedPhenomena >= 1,
      reward: { journal: 140, relicDust: 12 }
    },
    {
      id: "ten-discoveries",
      title: "Shelf Of Wonders",
      check: (state) => state.uniqueDiscoveries.length >= 10,
      reward: { discoveries: 2, relicDust: 18 }
    },
    {
      id: "all-regions",
      title: "Whole Wide Journey",
      check: (state) => state.visitedRegions.length === REGIONS.length,
      reward: { journal: 220, coins: 90, relicDust: 25 }
    }
  ];

  const FEATURE_NOTES = {
    supplies: "Supplies are now part of the journey. Simon can Forage, packs matter, and slower preparation starts paying off.",
    camp: "Camp Projects unlocked. Upgrades now arrive a few at a time instead of all at once, so the power curve stays readable.",
    atlas: "Route Atlas unlocked. You can now choose Simon's next destination, but he still walks the route on his own.",
    discoveries: "Discoveries unlocked. Rare landmarks become permanent keepsakes and make future runs richer.",
    study: "Study unlocked. This is your slower, discovery-focused option for when rushing ahead is not the point.",
    coins: "Perform unlocked. Simon can now turn stories into coins and renown, especially in lively regions.",
    relics: "Tinker unlocked. Old finds can now become relic dust, opening up the long-tail progression loop.",
    phenomena: "Phenomena unlocked. Temporary wonders now appear and reward short bursts of focused guidance.",
    commune: "Commune unlocked. The late game now leans into wonder instead of intensity."
  };

  const CHAPTERS = [
    {
      id: "first-footfalls",
      title: "Chapter 1: First Footfalls",
      objective: "Queue a few gentle ideas and let Simon settle into Mossy Lane.",
      rewardText: "Reward: the game starts caring about rhythm, not just clicks.",
      intro: "Start simple. Press On moves the route forward, Take Five keeps Simon comfortable, and the expedition window tells the story of each action.",
      check: (state) => state.stats.activities >= 3 && state.stats.totalTrail >= 18,
      progress: (state) => `${Math.min(state.stats.activities, 3)}/3 activities • ${Math.min(Math.floor(state.stats.totalTrail), 18)}/18 trail`
    },
    {
      id: "find-a-rhythm",
      title: "Chapter 2: Find A Rhythm",
      objective: "Build a comfortable cadence instead of spamming one command.",
      rewardText: "Reward: supplies and Forage unlock.",
      intro: "Varied guidance makes Simon more likely to find useful things. Try alternating Press On and Take Five instead of repeating one endlessly.",
      check: (state) => state.cadence >= 18 && state.journal >= 24,
      progress: (state) => `${Math.min(Math.floor(state.cadence), 18)}/18 rhythm • ${Math.min(Math.floor(state.journal), 24)}/24 journal`,
      onComplete: (state) => {
        unlockFeature(state, "supplies");
      }
    },
    {
      id: "pack-for-the-road",
      title: "Chapter 3: Pack For The Road",
      objective: "Let the new loop breathe: gather supplies and write enough to support a proper camp.",
      rewardText: "Reward: camp projects unlock.",
      intro: "Forage is not just a side button. It keeps the trip smooth and turns pacing decisions into actual strategy.",
      check: (state) => state.supplies >= 10 && state.journal >= 55,
      progress: (state) => `${Math.min(Math.floor(state.supplies), 10)}/10 supplies • ${Math.min(Math.floor(state.journal), 55)}/55 journal`,
      onComplete: (state) => {
        unlockFeature(state, "camp");
      }
    },
    {
      id: "camp-and-compass",
      title: "Chapter 4: Camp And Compass",
      objective: "Build a steadier base before the world gets wider.",
      rewardText: "Reward: the atlas opens, Study unlocks, and Lantern Caves become reachable.",
      intro: "Projects are introduced in a small batch first so the upgrade panel stays legible. Build a few and let the journey stabilize.",
      check: (state) => totalProjectLevels(state) >= 2 && state.renown >= 2,
      progress: (state) => `${Math.min(totalProjectLevels(state), 2)}/2 project levels • Renown ${Math.min(state.renown, 2)}/2`,
      onComplete: (state) => {
        unlockFeature(state, "atlas");
        unlockFeature(state, "discoveries");
        unlockFeature(state, "study");
      }
    },
    {
      id: "echoes-worth-keeping",
      title: "Chapter 5: Echoes Worth Keeping",
      objective: "Head to Lantern Caves and come back with your first true keepsake.",
      rewardText: "Reward: Perform and coins unlock. Sunken Arcade comes into view soon after.",
      intro: "Lantern Caves are where the game starts rewarding patience. Study shines here, and discoveries permanently improve the run.",
      check: (state) => state.region === "lantern-caves" && state.uniqueDiscoveries.length >= 1,
      progress: (state) => `${state.region === "lantern-caves" ? "In Lantern Caves" : "Travel to Lantern Caves"} • ${Math.min(state.uniqueDiscoveries.length, 1)}/1 keepsake`,
      onComplete: (state) => {
        unlockFeature(state, "coins");
      }
    },
    {
      id: "songs-for-spare-change",
      title: "Chapter 6: Songs For Spare Change",
      objective: "Turn experience into a gentler economy instead of a harsher pace spike.",
      rewardText: "Reward: the queue grows to four slots and Sunken Arcade opens at Renown 3.",
      intro: "Perform lets Simon turn what he has already learned into a second economy. This should feel like breathing room, not stress.",
      check: (state) => state.coins >= 50 && state.discoveries >= 2,
      progress: (state) => `${Math.min(Math.floor(state.coins), 50)}/50 coins • ${Math.min(Math.floor(state.discoveries), 2)}/2 discoveries`,
      onComplete: (state) => {
        state.queueSize = Math.max(state.queueSize, 4);
        pushEvent(state, "Simon seems comfortable juggling a slightly longer queue now.", true, "🎶");
      }
    },
    {
      id: "workshop-wheels",
      title: "Chapter 7: Workshop Wheels",
      objective: "Expand the camp enough that long-run tinkering becomes part of the journey.",
      rewardText: "Reward: relic dust and Tinker unlock.",
      intro: "By now the loop should feel broader, not busier. More projects mean more directions to lean without turning the game into noise.",
      check: (state) => totalProjectLevels(state) >= 6 && state.renown >= 4,
      progress: (state) => `${Math.min(totalProjectLevels(state), 6)}/6 project levels • Renown ${Math.min(state.renown, 4)}/4`,
      onComplete: (state) => {
        unlockFeature(state, "relics");
      }
    },
    {
      id: "gusts-on-the-rail",
      title: "Chapter 8: Gusts On The Rail",
      objective: "Build enough momentum that the stranger parts of the world start noticing Simon back.",
      rewardText: "Reward: phenomena unlock. Cloudrail Ruins now open at Renown 5.",
      intro: "Relic dust adds a satisfying number-go-up thread, but the point is that it feeds back into a calmer, richer loop instead of replacing it.",
      check: (state) => state.relicDust >= 35 && state.discoveries >= 5,
      progress: (state) => `${Math.min(Math.floor(state.relicDust), 35)}/35 relic dust • ${Math.min(Math.floor(state.discoveries), 5)}/5 discoveries`,
      onComplete: (state) => {
        unlockFeature(state, "phenomena");
      }
    },
    {
      id: "listen-to-the-sky",
      title: "Chapter 9: Listen To The Sky",
      objective: "Clear your first phenomenon and prove the rhythm can carry bigger moments.",
      rewardText: "Reward: the final route comes into view. Reach Renown 7 to open Star Orchard.",
      intro: "Phenomena are short, bright bursts of focus. They should feel like seasonal highlights, not panic alarms.",
      check: (state) => state.stats.completedPhenomena >= 1 && state.cadence >= 55,
      progress: (state) => `${Math.min(state.stats.completedPhenomena, 1)}/1 phenomenon • ${Math.min(Math.floor(state.cadence), 55)}/55 rhythm`
    },
    {
      id: "orchard-of-small-suns",
      title: "Chapter 10: Orchard Of Small Suns",
      objective: "Make it far enough, gently enough, that the journey turns magical instead of merely bigger.",
      rewardText: "Reward: Commune unlocks for the late game.",
      intro: "Star Orchard is where the game stops pretending the only satisfying loop is speed. Let the weirdness breathe here.",
      check: (state) => state.renown >= 7 && state.uniqueDiscoveries.length >= 10,
      progress: (state) => `Renown ${Math.min(state.renown, 7)}/7 • ${Math.min(state.uniqueDiscoveries.length, 10)}/10 keepsakes`,
      onComplete: (state) => {
        unlockFeature(state, "commune");
        state.queueSize = Math.max(state.queueSize, 5);
        pushEvent(state, "The journey can now hold five suggestions at once without losing its shape.", true, "🌌");
      }
    },
    {
      id: "long-bright-home",
      title: "Chapter 11: Long Bright Home",
      objective: "Settle into the long-tail loop and see how far the quiet version of ambition can go.",
      rewardText: "Reward: endless wandering, with the full system now unlocked.",
      intro: "This last chapter is here to let the expanded systems breathe. The point is steady accomplishment, not sudden escalation.",
      check: (state) =>
        state.journal >= 2800 &&
        state.coins >= 700 &&
        state.discoveries >= 18 &&
        state.relicDust >= 120 &&
        state.stats.completedPhenomena >= 3,
      progress: (state) =>
        `${Math.min(Math.floor(state.journal), 2800)}/2800 journal • ${Math.min(Math.floor(state.coins), 700)}/700 coins • ${Math.min(Math.floor(state.discoveries), 18)}/18 discoveries • ${Math.min(Math.floor(state.relicDust), 120)}/120 relic dust • ${Math.min(state.stats.completedPhenomena, 3)}/3 phenomena`,
      onComplete: (state) => {
        if (!state.gameWon) {
          state.gameWon = true;
          pushEvent(state, "Simon has crossed from tutorial journey into open-ended wandering. The road is yours now.", true, "🏁");
        }
      }
    }
  ];

  function createInitialState() {
    return {
      version: 1,
      tick: 0,
      day: 1,
      region: "mossy-lane",
      pendingRegion: null,
      routeProgress: 0,
      vigor: 70,
      journal: 0,
      supplies: 0,
      coins: 0,
      discoveries: 0,
      relicDust: 0,
      renown: 1,
      acclaim: 0,
      acclaimNeed: acclaimNeedForRenown(1),
      cadence: 0,
      queueSize: 3,
      queue: [],
      lastSuggestion: null,
      currentActivity: null,
      features: {
        supplies: false,
        camp: false,
        atlas: false,
        discoveries: false,
        study: false,
        coins: false,
        relics: false,
        phenomena: false,
        commune: false
      },
      projects: Object.fromEntries(PROJECTS.map((item) => [item.id, 0])),
      uniqueDiscoveries: [],
      milestones: {},
      chapterIndex: 0,
      completedChapters: [],
      chapterAnnounced: null,
      featureNotices: {},
      phenomenon: null,
      visitedRegions: ["mossy-lane"],
      stats: {
        activities: 0,
        guided: 0,
        loops: 0,
        totalTrail: 0,
        performances: 0,
        studies: 0,
        tinkers: 0,
        communes: 0,
        discoveriesFound: 0,
        completedPhenomena: 0
      },
      eventLog: [],
      gameWon: false
    };
  }

  function acclaimNeedForRenown(renown) {
    return Math.floor(46 * Math.pow(1.33, renown - 1));
  }

  function createRng(seed) {
    let value = seed >>> 0;
    return () => {
      value += 0x6d2b79f5;
      let t = value;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function num(value) {
    if (!Number.isFinite(value)) return "0";
    if (Math.abs(value) >= 1000) {
      return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
    if (Math.abs(value) >= 100) {
      return value.toFixed(0);
    }
    if (Math.abs(value) >= 10) {
      return value.toFixed(1);
    }
    return value.toFixed(1).replace(/\.0$/, "");
  }

  function formatClock(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function formatResourceCost(cost) {
    const parts = Object.entries(cost)
      .filter(([, value]) => value > 0)
      .map(([key, value]) => `${num(value)} ${resourceLabel(key)}`);
    return parts.length ? parts.join(" • ") : "Free";
  }

  function resourceLabel(key) {
    return {
      journal: "journal",
      supplies: "supplies",
      coins: "coins",
      discoveries: "discoveries",
      relicDust: "relic dust"
    }[key] || key;
  }

  function totalProjectLevels(state) {
    return Object.values(state.projects).reduce((sum, value) => sum + value, 0);
  }

  function maxVigorForState(state) {
    return getBonuses(state).maxVigor;
  }

  function createSerializableClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeState(raw = {}) {
    const base = createInitialState();
    const state = {
      ...base,
      ...raw,
      features: { ...base.features, ...(raw.features || {}) },
      projects: { ...base.projects, ...(raw.projects || {}) },
      milestones: { ...base.milestones, ...(raw.milestones || {}) },
      stats: { ...base.stats, ...(raw.stats || {}) },
      eventLog: Array.isArray(raw.eventLog) ? raw.eventLog : base.eventLog,
      queue: Array.isArray(raw.queue) ? raw.queue : base.queue,
      uniqueDiscoveries: Array.isArray(raw.uniqueDiscoveries) ? raw.uniqueDiscoveries : base.uniqueDiscoveries,
      completedChapters: Array.isArray(raw.completedChapters) ? raw.completedChapters : base.completedChapters,
      visitedRegions: Array.isArray(raw.visitedRegions) && raw.visitedRegions.length ? raw.visitedRegions : base.visitedRegions,
      featureNotices: raw.featureNotices || base.featureNotices
    };

    state.acclaimNeed = acclaimNeedForRenown(state.renown);
    state.queueSize = clamp(state.queueSize || 3, 3, 5);
    state.chapterIndex = clamp(state.chapterIndex || 0, 0, CHAPTERS.length - 1);
    state.vigor = clamp(state.vigor, 0, maxVigorForState(state));
    state.routeProgress = Math.max(0, state.routeProgress || 0);
    state.pendingRegion = REGION_BY_ID[state.pendingRegion] ? state.pendingRegion : null;
    state.region = REGION_BY_ID[state.region] ? state.region : "mossy-lane";
    state.currentActivity = state.currentActivity || null;
    if (!state.visitedRegions.includes(state.region)) {
      state.visitedRegions.push(state.region);
    }
    return state;
  }

  function pushEvent(state, text, good = true, icon = good ? "✅" : "⚠️") {
    state.eventLog.unshift({
      stamp: `Day ${state.day} • ${formatClock(state.tick)}`,
      text,
      good,
      icon
    });
    if (state.eventLog.length > 160) {
      state.eventLog.pop();
    }
  }

  function unlockFeature(state, featureId) {
    if (state.features[featureId]) return;
    state.features[featureId] = true;
    if (!state.featureNotices[featureId]) {
      state.featureNotices[featureId] = true;
      pushEvent(state, FEATURE_NOTES[featureId], true, "🪄");
    }
  }

  function announceChapter(state) {
    const chapter = CHAPTERS[state.chapterIndex];
    if (!chapter || state.chapterAnnounced === chapter.id) return;
    state.chapterAnnounced = chapter.id;
    pushEvent(state, `${chapter.title}: ${chapter.intro}`, true, "📚");
  }

  function isSuggestionUnlocked(state, suggestionId) {
    if (suggestionId === "wander" || suggestionId === "rest") return true;
    if (suggestionId === "forage") return state.features.supplies;
    if (suggestionId === "study") return state.features.study;
    if (suggestionId === "perform") return state.features.coins;
    if (suggestionId === "tinker") return state.features.relics;
    if (suggestionId === "commune") return state.features.commune;
    return false;
  }

  function getBonuses(state) {
    const bonuses = {
      maxVigor: 70 + Math.max(0, state.renown - 1) * 4,
      travel: 1,
      journal: 1,
      supplies: 1,
      coins: 1,
      relicDust: 1,
      discoveryChance: 1,
      rest: 1,
      study: 1,
      perform: 1,
      tinker: 1,
      commune: 1,
      all: 1,
      cadenceRetention: 1,
      supplyEfficiency: 0,
      phenomenon: 1,
      variedCadence: 0,
      renownCoins: 0
    };

    PROJECTS.forEach((project) => {
      const level = state.projects[project.id] || 0;
      if (level > 0) {
        project.apply(level, bonuses);
      }
    });

    state.uniqueDiscoveries.forEach((discoveryId) => {
      DISCOVERY_BY_ID[discoveryId]?.apply(bonuses);
    });

    return bonuses;
  }

  function cadenceName(cadence) {
    if (cadence >= 75) return "radiant";
    if (cadence >= 55) return "flowing";
    if (cadence >= 30) return "settled";
    if (cadence >= 12) return "warming up";
    return "quiet";
  }

  function rewardSummary(reward) {
    const parts = [];
    if (reward.journal) parts.push(`${num(reward.journal)} journal`);
    if (reward.supplies) parts.push(`${num(reward.supplies)} supplies`);
    if (reward.coins) parts.push(`${num(reward.coins)} coins`);
    if (reward.discoveries) parts.push(`${num(reward.discoveries)} discoveries`);
    if (reward.relicDust) parts.push(`${num(reward.relicDust)} relic dust`);
    if (reward.acclaim) parts.push(`${num(reward.acclaim)} acclaim`);
    return parts.join(", ");
  }

  function gainAcclaim(state, amount) {
    const bonuses = getBonuses(state);
    state.acclaim += amount;
    while (state.acclaim >= state.acclaimNeed) {
      state.acclaim -= state.acclaimNeed;
      state.renown += 1;
      state.acclaimNeed = acclaimNeedForRenown(state.renown);
      state.vigor = clamp(state.vigor + 12, 0, maxVigorForState(state));
      if (bonuses.renownCoins) {
        state.coins += bonuses.renownCoins;
      }
      pushEvent(state, `Renown up! Simon is now Renown ${state.renown}.`, true, "🏕️");
    }
  }

  function applyReward(state, reward) {
    if (reward.journal) state.journal += reward.journal;
    if (reward.supplies) state.supplies += reward.supplies;
    if (reward.coins) state.coins += reward.coins;
    if (reward.discoveries) state.discoveries += reward.discoveries;
    if (reward.relicDust) state.relicDust += reward.relicDust;
    if (reward.acclaim) gainAcclaim(state, reward.acclaim);
  }

  function canAfford(state, cost) {
    return Object.entries(cost).every(([key, value]) => (state[key] || 0) >= value);
  }

  function spendCost(state, cost) {
    Object.entries(cost).forEach(([key, value]) => {
      state[key] -= value;
    });
  }

  function isRegionUnlocked(state, regionId) {
    const region = REGION_BY_ID[regionId];
    if (!region) return false;
    return state.renown >= region.unlockRenown && state.chapterIndex >= region.unlockChapter;
  }

  function getProjectVisible(state, project) {
    return state.features.camp && (state.chapterIndex >= project.unlockChapter || state.projects[project.id] > 0);
  }

  function getProjectLockedReason(state, project) {
    if (!state.features.camp) return "Unlock Camp Projects first.";
    if (state.chapterIndex < project.unlockChapter) {
      return `Arrives in ${CHAPTERS[project.unlockChapter]?.title || "a later chapter"}.`;
    }
    return "";
  }

  function queueSuggestion(state, suggestionId) {
    if (!isSuggestionUnlocked(state, suggestionId)) return false;
    if (state.queue.length >= state.queueSize) return false;
    state.queue.push(suggestionId);
    return true;
  }

  function removeQueuedSuggestion(state, index) {
    if (index < 0 || index >= state.queue.length) return;
    state.queue.splice(index, 1);
  }

  function pickDiscovery(state, rng, regionId) {
    const region = REGION_BY_ID[regionId];
    const pool = region.discoveryIds;
    const unseen = pool.filter((id) => !state.uniqueDiscoveries.includes(id));
    if (unseen.length && rng() < 0.82) {
      return unseen[Math.floor(rng() * unseen.length)];
    }
    return pool[Math.floor(rng() * pool.length)];
  }

  function maybeFindDiscovery(state, rng, regionId, chance, sourceLabel) {
    if (!state.features.discoveries || rng() >= chance) return 0;
    const discoveryId = pickDiscovery(state, rng, regionId);
    const discovery = DISCOVERY_BY_ID[discoveryId];
    state.discoveries += 1;
    state.stats.discoveriesFound += 1;

    if (!state.uniqueDiscoveries.includes(discoveryId)) {
      state.uniqueDiscoveries.push(discoveryId);
      state.journal += 12;
      pushEvent(
        state,
        `New keepsake found in ${REGION_BY_ID[regionId].name}: ${discovery.name}. ${discovery.bonusText}.`,
        true,
        discovery.icon
      );
    } else {
      const relicBonus = state.features.relics ? 2 : 0;
      if (relicBonus) {
        state.relicDust += relicBonus;
      }
      pushEvent(
        state,
        `Simon revisits ${discovery.name} while ${sourceLabel}. +1 discovery${relicBonus ? ` and +${relicBonus} relic dust` : ""}.`,
        true,
        discovery.icon
      );
    }
    return 1;
  }

  function adjustCadence(state, suggestionId, guided) {
    const bonuses = getBonuses(state);
    let change = guided ? 4 : 2;
    if (suggestionId !== state.lastSuggestion) {
      change += 6 + bonuses.variedCadence;
    } else {
      change -= 3;
    }
    if (suggestionId === "rest" && state.vigor < maxVigorForState(state) * 0.45) {
      change += 4;
    }
    if (suggestionId === "forage" && state.features.supplies && state.supplies < 6) {
      change += 4;
    }
    if (suggestionId === "study" || suggestionId === "commune") {
      change += 2;
    }
    state.cadence = clamp(state.cadence + change, 0, 100);
    state.lastSuggestion = suggestionId;
  }

  function applyPhenomenonProgress(state, result, suggestionId) {
    if (!state.phenomenon) return;
    const phenomenon = state.phenomenon;
    if (phenomenon.goalType === "variety") {
      if (!phenomenon.seenSuggestions.includes(suggestionId)) {
        phenomenon.seenSuggestions.push(suggestionId);
      }
      phenomenon.progress = phenomenon.seenSuggestions.length;
    }
    if (phenomenon.goalType === "coins") {
      phenomenon.progress += result.coins || 0;
    }
    if (phenomenon.goalType === "travel") {
      phenomenon.progress += result.trail || 0;
    }
    if (phenomenon.goalType === "journal") {
      phenomenon.progress += result.journal || 0;
    }

    if (phenomenon.progress >= phenomenon.target) {
      const base = PHENOMENON_BY_ID[phenomenon.id];
      const bonuses = getBonuses(state);
      const reward = {
        journal: (base.reward.journal || 0) * bonuses.phenomenon,
        coins: (base.reward.coins || 0) * bonuses.phenomenon,
        discoveries: base.reward.discoveries || 0,
        relicDust: (base.reward.relicDust || 0) * bonuses.phenomenon,
        acclaim: (base.reward.acclaim || 0) * bonuses.phenomenon
      };
      applyReward(state, reward);
      state.stats.completedPhenomena += 1;
      pushEvent(state, `Phenomenon cleared: ${base.name}. Rewards: ${rewardSummary(reward)}.`, true, base.icon);
      state.phenomenon = null;
    }
  }

  function maybeSpawnPhenomenon(state, rng) {
    if (!state.features.phenomena || state.phenomenon) return;
    if (state.tick < 240 || state.tick % 38 !== 0) return;
    const chance = 0.16 + state.cadence / 220;
    if (rng() > chance) return;
    const template = PHENOMENA[Math.floor(rng() * PHENOMENA.length)];
    state.phenomenon = {
      id: template.id,
      timer: template.duration,
      progress: 0,
      target: template.target,
      seenSuggestions: []
    };
    pushEvent(state, `A phenomenon arrives: ${template.name}. ${template.desc}`, true, template.icon);
  }

  function tickPhenomenon(state) {
    if (!state.phenomenon) return;
    state.phenomenon.timer -= 1;
    if (state.phenomenon.timer <= 0) {
      const template = PHENOMENON_BY_ID[state.phenomenon.id];
      pushEvent(state, `${template.name} fades before Simon can catch all of it.`, false, "🌫️");
      state.phenomenon = null;
    }
  }

  function buildActivity(state, suggestionId, guided) {
    const bonuses = getBonuses(state);
    const variant = ACTIVITY_VARIANTS[state.region][suggestionId];
    const baseDuration = {
      wander: 6,
      rest: 5,
      forage: 6,
      study: 7,
      perform: 7,
      tinker: 8,
      commune: 8
    }[suggestionId];
    const speedBonus =
      suggestionId === "wander"
        ? bonuses.travel - 1
        : suggestionId === "study"
          ? bonuses.study - 1
          : suggestionId === "perform"
            ? bonuses.perform - 1
            : suggestionId === "tinker"
              ? bonuses.tinker - 1
              : suggestionId === "commune"
                ? bonuses.commune - 1
                : suggestionId === "forage"
                  ? bonuses.supplies - 1
                  : bonuses.rest - 1;
    const duration = Math.max(3, Math.round(baseDuration / (1 + speedBonus * 0.35)));
    return {
      id: suggestionId,
      guided,
      title: variant.title,
      desc: variant.text,
      icon: variant.icon,
      progress: 0,
      duration
    };
  }

  function chooseAutoSuggestion(state) {
    if (state.vigor < maxVigorForState(state) * 0.28) return "rest";
    if (state.features.supplies && state.supplies < 3) return "forage";
    if (state.phenomenon) {
      const template = PHENOMENON_BY_ID[state.phenomenon.id];
      if (template.goalType === "coins" && isSuggestionUnlocked(state, "perform")) return "perform";
      if (template.goalType === "travel") return "wander";
      if (template.goalType === "journal" && isSuggestionUnlocked(state, "study")) return "study";
      if (template.goalType === "variety") {
        const options = ["wander", "rest", "forage", "study", "perform", "tinker", "commune"].filter((id) => isSuggestionUnlocked(state, id));
        return options.find((id) => !state.phenomenon.seenSuggestions.includes(id)) || options[0];
      }
    }

    const chapter = CHAPTERS[state.chapterIndex];
    if (chapter?.id === "pack-for-the-road" && state.features.supplies && state.supplies < 10) return "forage";
    if (chapter?.id === "camp-and-compass" && state.renown < 2) return "wander";
    if (chapter?.id === "echoes-worth-keeping" && isSuggestionUnlocked(state, "study")) return "study";
    if (chapter?.id === "songs-for-spare-change" && isSuggestionUnlocked(state, "perform")) return "perform";
    if (chapter?.id === "workshop-wheels" && state.renown < 4) return "wander";
    if (chapter?.id === "gusts-on-the-rail" && isSuggestionUnlocked(state, "tinker")) return "tinker";
    if (chapter?.id === "orchard-of-small-suns" && isSuggestionUnlocked(state, "study")) return "study";
    if (chapter?.id === "long-bright-home" && isSuggestionUnlocked(state, "commune") && state.region === "star-orchard") {
      return state.cadence < 60 ? "commune" : "study";
    }

    if (isSuggestionUnlocked(state, "perform") && state.coins < 40) return "perform";
    if (isSuggestionUnlocked(state, "study") && state.uniqueDiscoveries.length < 4) return "study";
    return "wander";
  }

  function resolveActivity(state, rng) {
    const region = REGION_BY_ID[state.region];
    const bonuses = getBonuses(state);
    const activity = state.currentActivity;
    const suggestionId = activity.id;
    const cadenceBonus = 1 + state.cadence / 200;
    const hungerPenalty = !state.features.supplies || state.supplies > 0 ? 1 : 0.74;
    const commonGain = region.multipliers.acclaim * bonuses.all * cadenceBonus * hungerPenalty;
    const result = {
      journal: 0,
      supplies: 0,
      coins: 0,
      discoveries: 0,
      relicDust: 0,
      trail: 0,
      acclaim: 0
    };

    let supplyCost = 0;
    let vigorDelta = 0;
    let discoveryChance = 0;

    if (suggestionId === "wander") {
      result.trail = (10 + state.renown * 2.2) * region.multipliers.trail * bonuses.travel * bonuses.all * cadenceBonus * hungerPenalty;
      result.journal = (7 + state.renown * 1.7) * region.multipliers.journal * bonuses.journal * bonuses.all * cadenceBonus * hungerPenalty;
      result.acclaim = 8 * commonGain;
      supplyCost = 0.5 * (1 - bonuses.supplyEfficiency);
      vigorDelta = -4.4;
      discoveryChance = 0.045 * region.multipliers.discoveries * bonuses.discoveryChance * (1 + state.cadence / 160);
    }

    if (suggestionId === "rest") {
      const recovery = (18 + maxVigorForState(state) * 0.06) * bonuses.rest * bonuses.all;
      state.vigor = clamp(state.vigor + recovery, 0, maxVigorForState(state));
      result.journal = 2.5 * region.multipliers.journal * bonuses.journal;
      result.acclaim = 4 * region.multipliers.acclaim;
      supplyCost = state.features.supplies ? 0.2 * (1 - bonuses.supplyEfficiency * 0.7) : 0;
    }

    if (suggestionId === "forage") {
      result.trail = 4 * region.multipliers.trail * bonuses.travel * hungerPenalty;
      result.journal = 4.5 * region.multipliers.journal * bonuses.journal * hungerPenalty;
      result.supplies = (4.8 + state.renown * 0.8) * region.multipliers.supplies * bonuses.supplies * bonuses.all;
      result.acclaim = 6 * commonGain;
      supplyCost = 0.1;
      vigorDelta = -2.5;
      discoveryChance = 0.03 * region.multipliers.discoveries * bonuses.discoveryChance;
    }

    if (suggestionId === "study") {
      result.journal = (15 + state.uniqueDiscoveries.length * 1.4) * region.multipliers.journal * bonuses.journal * bonuses.study * bonuses.all * cadenceBonus * hungerPenalty;
      result.trail = 3.5 * region.multipliers.trail * bonuses.travel;
      result.acclaim = 10 * commonGain;
      supplyCost = 0.75 * (1 - bonuses.supplyEfficiency);
      vigorDelta = -5.5;
      discoveryChance = 0.12 * region.multipliers.discoveries * bonuses.discoveryChance * (1 + state.cadence / 180);
      state.stats.studies += 1;
    }

    if (suggestionId === "perform") {
      const audience = 12 + state.renown * 2.8 + state.journal / 38;
      result.coins = audience * region.multipliers.coins * bonuses.coins * bonuses.perform * bonuses.all * cadenceBonus * hungerPenalty;
      result.journal = 4.2 * region.multipliers.journal * bonuses.journal;
      result.acclaim = 12 * commonGain;
      supplyCost = 0.7 * (1 - bonuses.supplyEfficiency);
      vigorDelta = -5.2;
      state.stats.performances += 1;
    }

    if (suggestionId === "tinker") {
      result.relicDust = (6 + state.uniqueDiscoveries.length * 1.3) * region.multipliers.relicDust * bonuses.relicDust * bonuses.tinker * bonuses.all * hungerPenalty;
      result.coins = 5.2 * region.multipliers.coins * bonuses.coins;
      result.journal = 4 * region.multipliers.journal * bonuses.journal;
      result.acclaim = 10 * commonGain;
      supplyCost = 0.6 * (1 - bonuses.supplyEfficiency);
      vigorDelta = -6.2;
      discoveryChance = 0.035 * region.multipliers.discoveries * bonuses.discoveryChance;
      state.stats.tinkers += 1;
    }

    if (suggestionId === "commune") {
      result.journal = (12 + state.renown * 2) * region.multipliers.journal * bonuses.journal * bonuses.commune * bonuses.all * cadenceBonus;
      result.relicDust = 7 * region.multipliers.relicDust * bonuses.relicDust * bonuses.commune * bonuses.all;
      result.acclaim = 14 * commonGain;
      result.trail = 5 * region.multipliers.trail * bonuses.travel;
      supplyCost = 0.85 * (1 - bonuses.supplyEfficiency);
      vigorDelta = -4;
      discoveryChance = 0.16 * region.multipliers.discoveries * bonuses.discoveryChance;
      state.stats.communes += 1;
      state.cadence = clamp(state.cadence + 5, 0, 100);
    }

    if (supplyCost && state.features.supplies) {
      state.supplies = Math.max(0, state.supplies - supplyCost);
    }

    state.vigor = clamp(state.vigor + vigorDelta, 0, maxVigorForState(state));
    state.journal += result.journal;
    state.supplies += result.supplies;
    state.coins += result.coins;
    state.relicDust += result.relicDust;
    state.routeProgress += result.trail;
    state.stats.totalTrail += result.trail;
    gainAcclaim(state, result.acclaim);

    adjustCadence(state, suggestionId, activity.guided);
    result.discoveries += maybeFindDiscovery(state, rng, state.region, discoveryChance, activity.title.toLowerCase());
    applyPhenomenonProgress(state, result, suggestionId);

    state.stats.activities += 1;
    if (activity.guided) {
      state.stats.guided += 1;
    }

    const rewardPieces = [];
    if (result.trail) rewardPieces.push(`${num(result.trail)} trail`);
    if (result.journal) rewardPieces.push(`${num(result.journal)} journal`);
    if (result.supplies) rewardPieces.push(`${num(result.supplies)} supplies`);
    if (result.coins) rewardPieces.push(`${num(result.coins)} coins`);
    if (result.relicDust) rewardPieces.push(`${num(result.relicDust)} relic dust`);
    if (result.discoveries) rewardPieces.push(`${num(result.discoveries)} discovery`);
    pushEvent(state, `${activity.title}: ${rewardPieces.join(", ")}.`, true, activity.icon);

    while (state.routeProgress >= region.routeLength) {
      state.routeProgress -= region.routeLength;
      state.stats.loops += 1;
      state.day += 1;
      const loopReward = {
        journal: 12 * region.multipliers.journal * bonuses.journal,
        coins: state.features.coins ? 5 * region.multipliers.coins * bonuses.coins : 0,
        acclaim: 10 * region.multipliers.acclaim,
        supplies: state.features.supplies ? 1.5 * region.multipliers.supplies : 0
      };
      applyReward(state, loopReward);
      state.vigor = clamp(state.vigor + 9, 0, maxVigorForState(state));
      pushEvent(
        state,
        `Route loop completed in ${region.name}. Camp catches up: ${rewardSummary(loopReward)}.`,
        true,
        "🏕️"
      );
      if (state.pendingRegion && isRegionUnlocked(state, state.pendingRegion)) {
        state.region = state.pendingRegion;
        state.pendingRegion = null;
        if (!state.visitedRegions.includes(state.region)) {
          state.visitedRegions.push(state.region);
        }
        pushEvent(state, `Simon folds the map and heads for ${REGION_BY_ID[state.region].name}.`, true, REGION_BY_ID[state.region].icon);
      }
    }

    state.currentActivity = null;
  }

  function tick(state, rng) {
    announceChapter(state);
    state.tick += 1;
    const bonuses = getBonuses(state);
    state.cadence = clamp(state.cadence - 0.34 / bonuses.cadenceRetention, 0, 100);
    state.vigor = clamp(state.vigor + 0.3, 0, maxVigorForState(state));

    maybeSpawnPhenomenon(state, rng);
    tickPhenomenon(state);

    if (!state.currentActivity) {
      const queuedSuggestion = state.queue.shift();
      let suggestionId = queuedSuggestion;
      let guided = Boolean(queuedSuggestion);
      if (!suggestionId || !isSuggestionUnlocked(state, suggestionId)) {
        suggestionId = chooseAutoSuggestion(state);
        guided = false;
      }
      if (state.vigor < 8 && suggestionId !== "rest") {
        suggestionId = "rest";
        guided = false;
      }
      state.currentActivity = buildActivity(state, suggestionId, guided);
    }

    state.currentActivity.progress += 1;
    if (state.currentActivity.progress >= state.currentActivity.duration) {
      resolveActivity(state, rng);
    }

    if (state.features.supplies && state.supplies <= 0 && state.tick % 24 === 0) {
      state.vigor = Math.max(0, state.vigor - 2);
      pushEvent(state, "The pack runs light and the road feels a little harder.", false, "🎒");
    }

    checkChapterCompletion(state);
    checkMilestones(state);
  }

  function checkChapterCompletion(state) {
    const chapter = CHAPTERS[state.chapterIndex];
    if (!chapter || state.completedChapters.includes(chapter.id)) return;
    if (!chapter.check(state)) return;
    state.completedChapters.push(chapter.id);
    chapter.onComplete?.(state);
    pushEvent(state, `Chapter complete: ${chapter.title}. ${chapter.rewardText}`, true, "📘");
    if (state.chapterIndex < CHAPTERS.length - 1) {
      state.chapterIndex += 1;
      announceChapter(state);
    }
  }

  function checkMilestones(state) {
    MILESTONES.forEach((milestone) => {
      if (state.milestones[milestone.id]) return;
      if (!milestone.check(state)) return;
      state.milestones[milestone.id] = true;
      applyReward(state, milestone.reward);
      pushEvent(
        state,
        `Milestone unlocked: ${milestone.title}. Rewards: ${rewardSummary(milestone.reward)}.`,
        true,
        "🏅"
      );
    });
  }

  function buildScene(snapshot) {
    const region = REGION_BY_ID[snapshot.region];
    const activity = snapshot.currentActivity || {
      icon: "🚶",
      title: "Waiting for guidance",
      desc: "Simon is ready for the next stretch."
    };
    const frame = snapshot.tick;
    const sky = region.sky[frame % region.sky.length];
    const horizon = region.horizon[frame % region.horizon.length];
    const length = 28;
    const progressRatio = region.routeLength ? snapshot.routeProgress / region.routeLength : 0;
    const position = clamp(Math.floor(progressRatio * (length - 1)), 0, length - 1);
    const cells = Array.from({ length }, (_, index) => region.terrain[index % region.terrain.length]);
    cells[0] = "🏕️";
    cells[length - 1] = snapshot.pendingRegion ? "🗺️" : "⛳";
    cells[position] = activity.icon;
    const pointerLine = cells.join("");
    const caption = [
      `Simon is ${activity.title.toLowerCase()}.`,
      snapshot.pendingRegion
        ? `Next route: ${REGION_BY_ID[snapshot.pendingRegion].name}.`
        : `Current route: ${region.name}.`,
      snapshot.phenomenon
        ? `Phenomenon nearby: ${PHENOMENON_BY_ID[snapshot.phenomenon.id].name}.`
        : `The weather is quiet enough for a patient journey.`
    ].join("\n");

    return {
      className: `scene-window ${region.themeClass}`.trim(),
      html: [
        `<div class="scene-sky">${sky}</div>`,
        `<div class="scene-horizon">${horizon}</div>`,
        `<div class="scene-track">${pointerLine}</div>`,
        `<div class="scene-caption">${caption}</div>`
      ].join("")
    };
  }

  function getSnapshot(state) {
    const chapter = CHAPTERS[state.chapterIndex];
    const bonuses = getBonuses(state);
    return {
      ...createSerializableClone(state),
      chapter,
      bonuses,
      maxVigor: bonuses.maxVigor,
      cadenceLabel: cadenceName(state.cadence),
      routeLength: REGION_BY_ID[state.region].routeLength,
      scene: buildScene(state)
    };
  }

  function buyProject(state, projectId) {
    const project = PROJECT_BY_ID[projectId];
    if (!project || !getProjectVisible(state, project)) return false;
    const currentLevel = state.projects[projectId] || 0;
    if (currentLevel >= project.max) return false;
    const cost = project.cost(currentLevel);
    if (!canAfford(state, cost)) return false;
    spendCost(state, cost);
    state.projects[projectId] += 1;
    state.vigor = clamp(state.vigor, 0, maxVigorForState(state));
    pushEvent(state, `${project.name} upgraded to ${state.projects[projectId]}/${project.max}.`, true, project.icon);
    return true;
  }

  function setPendingRegion(state, regionId) {
    if (!isRegionUnlocked(state, regionId)) return false;
    if (regionId === state.region && !state.pendingRegion) return false;
    state.pendingRegion = regionId === state.region ? null : regionId;
    if (state.pendingRegion) {
      pushEvent(state, `Simon will aim for ${REGION_BY_ID[regionId].name} after the current loop.`, true, REGION_BY_ID[regionId].icon);
    }
    return true;
  }

  function chooseDebugRegion(state) {
    const chapter = CHAPTERS[state.chapterIndex];
    if (chapter?.id === "echoes-worth-keeping" && isRegionUnlocked(state, "lantern-caves")) return "lantern-caves";
    if (chapter?.id === "orchard-of-small-suns" && isRegionUnlocked(state, "star-orchard")) return "star-orchard";
    if (state.phenomenon) {
      const goalType = PHENOMENON_BY_ID[state.phenomenon.id].goalType;
      if (goalType === "coins" && isRegionUnlocked(state, "sunken-arcade")) return "sunken-arcade";
      if (goalType === "travel" && isRegionUnlocked(state, "cloudrail-ruins")) return "cloudrail-ruins";
      if (goalType === "journal" && isRegionUnlocked(state, "lantern-caves")) return "lantern-caves";
    }
    const unlocked = REGION_ORDER.filter((regionId) => isRegionUnlocked(state, regionId));
    return unlocked[unlocked.length - 1] || state.region;
  }

  function pickDebugSuggestion(state) {
    const unlocked = SUGGESTIONS.filter((item) => isSuggestionUnlocked(state, item.id)).map((item) => item.id);
    if (state.vigor < maxVigorForState(state) * 0.32 && unlocked.includes("rest")) return "rest";
    if (state.features.supplies && state.supplies < 5 && unlocked.includes("forage")) return "forage";
    if (state.phenomenon) {
      const goal = PHENOMENON_BY_ID[state.phenomenon.id].goalType;
      if (goal === "variety") {
        return unlocked.find((id) => !state.phenomenon.seenSuggestions.includes(id)) || unlocked[0];
      }
      if (goal === "coins" && unlocked.includes("perform")) return "perform";
      if (goal === "travel") return "wander";
      if (goal === "journal" && unlocked.includes("study")) return "study";
    }
    const chapter = CHAPTERS[state.chapterIndex];
    if (chapter?.id === "pack-for-the-road") return state.supplies < 10 && unlocked.includes("forage") ? "forage" : "wander";
    if (chapter?.id === "echoes-worth-keeping" && unlocked.includes("study")) return "study";
    if (chapter?.id === "songs-for-spare-change" && unlocked.includes("perform")) return "perform";
    if (chapter?.id === "gusts-on-the-rail" && unlocked.includes("tinker")) return "tinker";
    if (chapter?.id === "orchard-of-small-suns" && unlocked.includes("study")) return "study";
    if (chapter?.id === "long-bright-home" && unlocked.includes("commune") && state.region === "star-orchard") {
      return state.cadence < 62 ? "commune" : "study";
    }

    const preference = ["wander", "rest", "forage", "study", "perform", "tinker", "commune"];
    return preference.find((id) => unlocked.includes(id)) || "wander";
  }

  function runDebugManagement(state) {
    const preferredRegion = chooseDebugRegion(state);
    if (preferredRegion && preferredRegion !== state.pendingRegion && preferredRegion !== state.region) {
      setPendingRegion(state, preferredRegion);
    }

    const projectPriority = [
      "bedroll",
      "trail-signs",
      "snack-satchel",
      "field-journal",
      "lantern-rig",
      "story-banner",
      "workshop-cart",
      "cloud-sail",
      "star-almanac"
    ];
    projectPriority.forEach((projectId) => {
      const project = PROJECT_BY_ID[projectId];
      if (!getProjectVisible(state, project)) return;
      const level = state.projects[projectId];
      if (level >= project.max) return;
      const cost = project.cost(level);
      if (canAfford(state, cost)) {
        buyProject(state, projectId);
      }
    });

    while (state.queue.length < state.queueSize) {
      const suggestionId = pickDebugSuggestion(state);
      if (!queueSuggestion(state, suggestionId)) break;
    }
  }

  function buildDebugReport(state) {
    const chapter = CHAPTERS[state.chapterIndex];
    const region = REGION_BY_ID[state.region];
    return [
      `Time ${formatClock(state.tick)} on Day ${state.day}`,
      `Chapter: ${chapter.title}`,
      `Region: ${region.name}${state.pendingRegion ? ` -> next ${REGION_BY_ID[state.pendingRegion].name}` : ""}`,
      `Renown ${state.renown} (${num(state.acclaim)}/${num(state.acclaimNeed)} acclaim)`,
      `Vigor ${num(state.vigor)}/${num(maxVigorForState(state))} • Rhythm ${num(state.cadence)} (${cadenceName(state.cadence)})`,
      `Journal ${num(state.journal)} • Supplies ${num(state.supplies)} • Coins ${num(state.coins)} • Discoveries ${num(state.discoveries)} • Relic Dust ${num(state.relicDust)}`,
      `Activities ${state.stats.activities} • Guided ${state.stats.guided} • Loops ${state.stats.loops} • Keepsakes ${state.uniqueDiscoveries.length}/${TOTAL_UNIQUE_DISCOVERIES}`,
      `Phenomena cleared ${state.stats.completedPhenomena} • Project levels ${totalProjectLevels(state)} • Milestones ${Object.keys(state.milestones).length}/${MILESTONES.length}`
    ].join("\n");
  }

  function createGameEngine(options = {}) {
    const rng = typeof options.rng === "function" ? options.rng : createRng(options.seed || 123456789);
    let state = normalizeState(options.state);

    if (!state.eventLog.length) {
      queueSuggestion(state, "wander");
      queueSuggestion(state, "rest");
      pushEvent(
        state,
        "You are the voice in Simon's ear. A calm opening day is already queued so you can watch the loop before nudging it.",
        true,
        "🧭"
      );
      announceChapter(state);
    }

    function step(seconds = 1) {
      for (let index = 0; index < seconds; index += 1) {
        tick(state, rng);
      }
    }

    function simulateWithDebug(seconds = 1) {
      for (let index = 0; index < seconds; index += 1) {
        runDebugManagement(state);
        tick(state, rng);
      }
    }

    function enqueueSuggestion(suggestionId) {
      return queueSuggestion(state, suggestionId);
    }

    function removeSuggestion(index) {
      removeQueuedSuggestion(state, index);
    }

    function purchaseProject(projectId) {
      return buyProject(state, projectId);
    }

    function aimRegion(regionId) {
      return setPendingRegion(state, regionId);
    }

    function exportState() {
      return createSerializableClone(state);
    }

    function importState(nextState) {
      state = normalizeState(nextState);
      announceChapter(state);
    }

    function debugAutoplay(seconds = 1200) {
      simulateWithDebug(seconds);
      return buildDebugReport(state);
    }

    return {
      step,
      enqueueSuggestion,
      removeSuggestion,
      purchaseProject,
      aimRegion,
      exportState,
      importState,
      getSnapshot: () => getSnapshot(state),
      debug: {
        report: () => buildDebugReport(state),
        fastForward: (seconds = 60) => {
          simulateWithDebug(seconds);
          return buildDebugReport(state);
        },
        autoplay: debugAutoplay
      }
    };
  }

  function renderBrowserApp() {
    const resourceGrid = document.getElementById("resourceGrid");
    const chapterLabel = document.getElementById("chapterLabel");
    const regionTitle = document.getElementById("regionTitle");
    const sceneMeta = document.getElementById("sceneMeta");
    const sceneWindow = document.getElementById("sceneWindow");
    const activityTimer = document.getElementById("activityTimer");
    const activityTitle = document.getElementById("activityTitle");
    const activityDesc = document.getElementById("activityDesc");
    const trailFill = document.getElementById("trailFill");
    const trailText = document.getElementById("trailText");
    const cadenceFill = document.getElementById("cadenceFill");
    const cadenceValue = document.getElementById("cadenceValue");
    const cadenceText = document.getElementById("cadenceText");
    const queueHint = document.getElementById("queueHint");
    const queueList = document.getElementById("queueList");
    const guidanceButtons = document.getElementById("guidanceButtons");
    const chapterCard = document.getElementById("chapterCard");
    const phenomenonBox = document.getElementById("phenomenonBox");
    const eventFeed = document.getElementById("eventFeed");
    const regionList = document.getElementById("regionList");
    const upgradeList = document.getElementById("upgradeList");
    const discoveryList = document.getElementById("discoveryList");
    const milestoneList = document.getElementById("milestoneList");
    const statusText = document.getElementById("statusText");
    const debugPanel = document.getElementById("debugPanel");
    const debugOutput = document.getElementById("debugOutput");
    const debugToggleBtn = document.getElementById("debugToggleBtn");

    const engine = createGameEngine({ seed: Date.now() });
    window.debugJourney = {
      fastForward: (seconds = 60) => {
        const report = engine.debug.fastForward(seconds);
        render();
        debugOutput.textContent = report;
        return report;
      },
      autoplay: (seconds = 1200) => {
        const report = engine.debug.autoplay(seconds);
        render();
        debugOutput.textContent = report;
        return report;
      },
      report: () => engine.debug.report(),
      snapshot: () => engine.getSnapshot()
    };

    function setStatus(text) {
      statusText.textContent = text;
    }

    function renderResources(snapshot) {
      const resources = [
        {
          key: "vigor",
          label: "💛 Vigor",
          value: `${num(snapshot.vigor)}/${num(snapshot.maxVigor)}`,
          detail: "Rest and camp projects keep the journey steady.",
          unlocked: true
        },
        {
          key: "journal",
          label: "📖 Journal",
          value: num(snapshot.journal),
          detail: "Notes, sketches, and route memory.",
          unlocked: true
        },
        {
          key: "supplies",
          label: "🎒 Supplies",
          value: num(snapshot.supplies),
          detail: "Unlocked by learning to forage and pack well.",
          unlocked: snapshot.features.supplies
        },
        {
          key: "coins",
          label: "🪙 Coins",
          value: num(snapshot.coins),
          detail: "Arrive once Simon starts performing for small crowds.",
          unlocked: snapshot.features.coins
        },
        {
          key: "discoveries",
          label: "✨ Discoveries",
          value: num(snapshot.discoveries),
          detail: `${snapshot.uniqueDiscoveries.length}/${TOTAL_UNIQUE_DISCOVERIES} keepsakes found`,
          unlocked: snapshot.features.discoveries
        },
        {
          key: "relicDust",
          label: "🧿 Relic Dust",
          value: num(snapshot.relicDust),
          detail: "Unlocked through tinkering and longer routes.",
          unlocked: snapshot.features.relics
        },
        {
          key: "renown",
          label: "🏕️ Renown",
          value: `${snapshot.renown}`,
          detail: `${num(snapshot.acclaim)}/${num(snapshot.acclaimNeed)} acclaim`,
          unlocked: true
        },
        {
          key: "cadence",
          label: "🎶 Rhythm",
          value: num(snapshot.cadence),
          detail: `Currently ${snapshot.cadenceLabel}`,
          unlocked: true
        }
      ];

      resourceGrid.innerHTML = resources
        .map((resource) => {
          if (!resource.unlocked && !["coins", "supplies", "discoveries", "relicDust"].includes(resource.key)) {
            return "";
          }
          return `
            <div class="resource-card ${resource.unlocked ? "" : "locked"}">
              <strong>${resource.label}</strong>
              <span class="resource-value">${resource.unlocked ? resource.value : "Soon"}</span>
              <span class="resource-detail">${resource.detail}</span>
            </div>
          `;
        })
        .join("");
    }

    function renderGuidance(snapshot) {
      queueHint.textContent = `${snapshot.queue.length} / ${snapshot.queueSize} slots filled`;
      queueList.innerHTML = snapshot.queue.length
        ? snapshot.queue
            .map((suggestionId, index) => {
              const suggestion = SUGGESTION_BY_ID[suggestionId];
              return `
                <div class="queue-chip">
                  <span>${suggestion.icon} ${suggestion.name}</span>
                  <button data-remove-index="${index}">x</button>
                </div>
              `;
            })
            .join("")
        : `<div class="queue-chip">Simon will improvise if you leave the queue empty.</div>`;

      guidanceButtons.innerHTML = SUGGESTIONS.map((suggestion) => {
        const unlocked = isSuggestionUnlocked(snapshot, suggestion.id);
        const disabled = !unlocked || snapshot.queue.length >= snapshot.queueSize;
        const reason =
          suggestion.id === "forage"
            ? "Unlocks with Supplies."
            : suggestion.id === "study"
              ? "Unlocks in Chapter 4."
              : suggestion.id === "perform"
                ? "Unlocks in Chapter 5."
                : suggestion.id === "tinker"
                  ? "Unlocks in Chapter 7."
                  : suggestion.id === "commune"
                    ? "Unlocks in Chapter 10."
                    : suggestion.desc;
        return `
          <button class="guidance-button" data-guidance="${suggestion.id}" ${disabled ? "disabled" : ""}>
            <span class="guidance-title">${suggestion.icon} ${suggestion.name}</span>
            <span class="guidance-desc">${unlocked ? suggestion.desc : reason}</span>
          </button>
        `;
      }).join("");
    }

    function renderRegions(snapshot) {
      regionList.innerHTML = REGIONS.map((region) => {
        const unlocked = isRegionUnlocked(snapshot, region.id);
        const active = snapshot.region === region.id;
        const pending = snapshot.pendingRegion === region.id;
        const badge = active
          ? `<span class="badge active">Current</span>`
          : pending
            ? `<span class="badge pending">Next</span>`
            : unlocked
              ? `<span class="badge">Open</span>`
              : `<span class="badge">Renown ${region.unlockRenown}, ${CHAPTERS[region.unlockChapter].title}</span>`;

        return `
          <div class="card ${unlocked ? "" : "locked-card"}">
            <div class="title-row">
              <span>${region.icon} ${region.name}</span>
              <span>${badge}</span>
            </div>
            <p>${region.description}</p>
            <p>Route length ${region.routeLength} • Trail x${num(region.multipliers.trail)} • Discovery x${num(region.multipliers.discoveries)}</p>
            ${unlocked && !active ? `<button data-region="${region.id}" ${pending ? "disabled" : ""}>${pending ? "Queued" : "Aim Here"}</button>` : ""}
          </div>
        `;
      }).join("");
    }

    function renderProjects(snapshot) {
      if (!snapshot.features.camp) {
        upgradeList.innerHTML = `<div class="card locked-card"><p>Camp Projects appear in Chapter 3, after supplies and journal habits are established.</p></div>`;
        return;
      }

      const visibleProjects = PROJECTS.filter((project) => getProjectVisible(snapshot, project));
      const upcomingProject = PROJECTS.find((project) => !getProjectVisible(snapshot, project));
      upgradeList.innerHTML = visibleProjects
        .map((project) => {
          const level = snapshot.projects[project.id] || 0;
          const atCap = level >= project.max;
          const cost = project.cost(level);
          const currentEffect = level > 0 ? project.effectText(level) : "Not built yet.";
          const nextEffect = atCap ? "Fully built." : project.effectText(level + 1);
          return `
            <div class="card">
              <div class="title-row">
                <span>${project.icon} ${project.name}</span>
                <span>${atCap ? "Complete" : `Lv ${level}/${project.max}`}</span>
              </div>
              <p>${project.desc}</p>
              <p><b>Current:</b> ${currentEffect}</p>
              <p><b>${atCap ? "Status" : "Next"}:</b> ${nextEffect}</p>
              <p>Cost: ${atCap ? "Done" : formatResourceCost(cost)}</p>
              ${atCap ? "" : `<button data-project="${project.id}" ${canAfford(snapshot, cost) ? "" : "disabled"}>${level === 0 ? "Build" : "Upgrade"}</button>`}
            </div>
          `;
        })
        .join("");

      if (upcomingProject) {
        upgradeList.innerHTML += `
          <div class="card locked-card">
            <div class="title-row">
              <span>${upcomingProject.icon} ${upcomingProject.name}</span>
              <span>Soon</span>
            </div>
            <p>${getProjectLockedReason(snapshot, upcomingProject)}</p>
          </div>
        `;
      }
    }

    function renderDiscoveries(snapshot) {
      if (!snapshot.features.discoveries) {
        discoveryList.innerHTML = `<div class="card locked-card"><p>Keepsakes begin appearing once Simon reaches Lantern Caves and starts studying the road more carefully.</p></div>`;
        return;
      }

      const found = snapshot.uniqueDiscoveries.map((id) => DISCOVERY_BY_ID[id]);
      discoveryList.innerHTML = found.length
        ? found
            .map((discovery) => `
              <div class="card">
                <div class="title-row">
                  <span>${discovery.icon} ${discovery.name}</span>
                  <span>${REGION_BY_ID[discovery.region].name}</span>
                </div>
                <p>${discovery.desc}</p>
                <p>${discovery.bonusText}</p>
              </div>
            `)
            .join("")
        : `<div class="card"><p>No keepsakes yet. Lantern Caves and patient Study actions are the first good place to look.</p></div>`;
    }

    function renderMilestones(snapshot) {
      milestoneList.innerHTML = MILESTONES.map((milestone) => `
        <div class="card ${snapshot.milestones[milestone.id] ? "" : "locked-card"}">
          <div class="title-row">
            <span>${snapshot.milestones[milestone.id] ? "🏅" : "…"} ${milestone.title}</span>
            <span>${snapshot.milestones[milestone.id] ? "Done" : rewardSummary(milestone.reward)}</span>
          </div>
        </div>
      `).join("");
    }

    function renderChapter(snapshot) {
      chapterLabel.textContent = snapshot.chapter.title;
      regionTitle.textContent = `${REGION_BY_ID[snapshot.region].icon} ${REGION_BY_ID[snapshot.region].name}`;
      sceneMeta.innerHTML = `
        <div>Day ${snapshot.day}</div>
        <div>Renown ${snapshot.renown}</div>
        <div>${snapshot.uniqueDiscoveries.length}/${TOTAL_UNIQUE_DISCOVERIES} keepsakes</div>
      `;
      sceneWindow.className = snapshot.scene.className;
      sceneWindow.innerHTML = snapshot.scene.html;

      const activity = snapshot.currentActivity || {
        title: "Waiting for the first suggestion",
        desc: "Queue a few gentle nudges and Simon will decide how to carry them out.",
        progress: 0,
        duration: 0
      };

      activityTimer.textContent = snapshot.currentActivity
        ? `${Math.max(0, snapshot.currentActivity.duration - snapshot.currentActivity.progress)}s left`
        : "idle";
      activityTitle.textContent = activity.title;
      activityDesc.textContent = activity.desc;

      trailText.textContent = `${num(snapshot.routeProgress)} / ${snapshot.routeLength}`;
      trailFill.style.width = `${Math.min(100, (snapshot.routeProgress / snapshot.routeLength) * 100)}%`;
      cadenceValue.textContent = `${num(snapshot.cadence)} • ${snapshot.cadenceLabel}`;
      cadenceFill.style.width = `${Math.min(100, snapshot.cadence)}%`;
      cadenceText.textContent = `Varied guidance is currently ${snapshot.cadenceLabel}. Higher rhythm improves finds and pacing.`;

      chapterCard.innerHTML = `
        <p class="eyebrow">Current Chapter</p>
        <h3>${snapshot.chapter.title}</h3>
        <p>${snapshot.chapter.objective}</p>
        <p><b>Progress:</b> ${snapshot.chapter.progress(snapshot)}</p>
        <p><b>Next:</b> ${snapshot.chapter.rewardText}</p>
      `;

      if (snapshot.phenomenon) {
        const phenomenon = PHENOMENON_BY_ID[snapshot.phenomenon.id];
        phenomenonBox.className = "card phenomenon-card pulse";
        phenomenonBox.innerHTML = `
          <p class="eyebrow">Phenomenon</p>
          <h3>${phenomenon.icon} ${phenomenon.name}</h3>
          <p>${phenomenon.desc}</p>
          <p><b>Progress:</b> ${num(snapshot.phenomenon.progress)} / ${snapshot.phenomenon.target}</p>
          <p><b>Time left:</b> ${snapshot.phenomenon.timer}s</p>
        `;
      } else {
        phenomenonBox.className = "card phenomenon-card";
        phenomenonBox.innerHTML = snapshot.features.phenomena
          ? `
            <p class="eyebrow">Phenomenon</p>
            <h3>Quiet Weather</h3>
            <p>No short-lived wonder is active right now. Keep the rhythm healthy and one will eventually drift in.</p>
          `
          : `
            <p class="eyebrow">Phenomenon</p>
            <h3>Not Yet Unlocked</h3>
            <p>Phenomena arrive later, after relic dust has joined the loop and the world has gotten stranger.</p>
          `;
      }
    }

    function renderFeed(snapshot) {
      eventFeed.innerHTML = snapshot.eventLog
        .map(
          (entry) => `
            <div class="feed-entry ${entry.good ? "" : "bad"}">
              <small>${entry.stamp}</small>
              <div>${entry.icon} ${entry.text}</div>
            </div>
          `
        )
        .join("");
    }

    function render() {
      const snapshot = engine.getSnapshot();
      renderResources(snapshot);
      renderGuidance(snapshot);
      renderRegions(snapshot);
      renderProjects(snapshot);
      renderDiscoveries(snapshot);
      renderMilestones(snapshot);
      renderChapter(snapshot);
      renderFeed(snapshot);
      debugOutput.textContent = engine.debug.report();
    }

    document.getElementById("saveBtn").onclick = () => {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ state: engine.exportState() }));
      setStatus("Saved.");
    };

    document.getElementById("loadBtn").onclick = () => {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) {
        setStatus("No save found.");
        return;
      }
      const parsed = JSON.parse(raw);
      engine.importState(parsed.state || parsed);
      render();
      setStatus("Loaded.");
    };

    document.getElementById("hardResetBtn").onclick = () => {
      if (!window.confirm("Erase the current journey and start from the trailhead?")) return;
      localStorage.removeItem(SAVE_KEY);
      location.reload();
    };

    debugToggleBtn.onclick = () => {
      debugPanel.hidden = !debugPanel.hidden;
      debugOutput.textContent = engine.debug.report();
    };

    document.getElementById("debugQuick30").onclick = () => {
      debugOutput.textContent = engine.debug.fastForward(30);
      render();
    };

    document.getElementById("debugQuick300").onclick = () => {
      debugOutput.textContent = engine.debug.fastForward(300);
      render();
    };

    document.getElementById("debugAutoplay").onclick = () => {
      debugOutput.textContent = engine.debug.autoplay(1200);
      render();
    };

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const suggestionId = target.getAttribute("data-guidance");
      if (suggestionId) {
        engine.enqueueSuggestion(suggestionId);
        render();
        return;
      }

      const removeIndex = target.getAttribute("data-remove-index");
      if (removeIndex !== null) {
        engine.removeSuggestion(Number(removeIndex));
        render();
        return;
      }

      const regionId = target.getAttribute("data-region");
      if (regionId) {
        engine.aimRegion(regionId);
        render();
        return;
      }

      const projectId = target.getAttribute("data-project");
      if (projectId) {
        engine.purchaseProject(projectId);
        render();
      }
    });

    let lastFrame = 0;
    function gameLoop(timestamp) {
      if (!lastFrame) {
        lastFrame = timestamp;
      }
      if (timestamp - lastFrame >= 1000) {
        const steps = Math.floor((timestamp - lastFrame) / 1000);
        engine.step(steps);
        render();
        lastFrame += steps * 1000;
      }
      requestAnimationFrame(gameLoop);
    }

    render();
    requestAnimationFrame(gameLoop);
  }

  function runDebugSimulation(seconds = 1200, seed = 42) {
    const engine = createGameEngine({ seed });
    return engine.debug.autoplay(seconds);
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      createGameEngine,
      runDebugSimulation
    };
  }

  if (typeof document !== "undefined") {
    renderBrowserApp();
  }
})();
