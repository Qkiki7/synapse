// /app/result/data.ts
export type HeartisKey =
  | "ignis" | "flare" | "luma" | "crystal" | "drift" | "volt"
  | "bloom" | "zephy" | "terra" | "thorn" | "core" | "machina"
  | "muse" | "verdan" | "gem" | "tide";

type HeartisRecord = {
  name: string;
  color: string;          // 主色（用于标题/强调）
  essence: string;        // Core Essence 行
  video: string;          // /result/<slug>.mp4
  heart: string;          // /result/<slug>-heart.png
  description: string[];  // 多段正文
  remember: string;       // Remember 区
};

export const heartisData: Record<HeartisKey, HeartisRecord> = {
  // --- 已填好：Ignis（Fire） ---
  ignis: {
    name: "Heartis·Ignis",
    color: "#f8781f",
    essence: "Passionate · Bold · Driven by Momentum",
    video: "/result/ignis.mp4",
    heart: "/result/ignis-heart.png",
    description: [
      "You are the Fire Heartis, a spark that turns vision into motion.",
      "Your courage lights the path ahead, igniting hearts and pushing ideas into action.",
      "Wherever you go, the air hums with your will to begin.",
      "But flames that rise too high burn out just as fast. Your fire, once unchecked, can consume your focus or exhaust your warmth."
    ],
    remember:
      "Before lighting others, remember to refuel yourself. Even the strongest blaze needs a quiet ember at its core.",
  },

  // --- 已填好：Flare（Solar / 更炽烈的火） ---
  flare: {
    name: "Heartis·Flare",
    color: "#f8781f",
    essence: "Passionate · Fearless · Uncontainable Energy",
    video: "/result/flare.mp4",
    heart: "/result/flare-heart.png",
    description: [
      "You are the Fire Heartis, the pure flame that dares to shine brightest.",
      "When you care about something, you burn with unstoppable intensity — your warmth inspires others.",
      "But even the most beautiful blaze needs space to breathe."
    ],
    remember:
      "You can light up the world, but don't forget to protect your own flame.",
  },

  // --- 其余角色：已填写完整数据 ---
  luma: {
    name: "Heartis·Luma",
    color: "#368edf",
    essence: "Fluid · Intelligent · Always Evolving",
    video: "/result/luma.mp4",
    heart: "/result/luma-heart.png",
    description: [
      "You are the Mercury Heartis — fluid, intelligent, and always evolving.",
      "You adapt gracefully, reflecting both light and thought wherever you flow."
    ],
    remember: "Let your dreams touch the surface of the world. When thought meets action, even still water shines."
  },
  
  crystal: {
    name: "Heartis·Crystal",
    color: "#368edf",
    essence: "Calm · Precise · Clear-Minded",
    video: "/result/crystal.mp4",
    heart: "/result/crystal-heart.png",
    description: [
      "You are the Ice Heartis — calm, precise, and clear-minded.",
      "Your clarity is strength, and your silence holds beauty.",
      "But warmth does not melt your essence; it deepens it."
    ],
    remember: "Even ice carries memory of water. Let a little warmth flow through your surface. Connection will not blur your clarity, it will deepen it."
  },
  
  drift: {
    name: "Heartis·Drift",
    color: "#368edf",
    essence: "Introspective · Thoughtful · Dreamy",
    video: "/result/drift.mp4",
    heart: "/result/drift-heart.png",
    description: [
      "You are the Cloud Heartis — introspective, thoughtful, and dreamy.",
      "You bring perspective and softness to chaos, turning reflection into peace."
    ],
    remember: "Let your thoughts settle and take form. Only grounded dreams can fall as rain that nourishes the world."
  },
  
  volt: {
    name: "Heartis·Volt",
    color: "#f8781f",
    essence: "Energetic · Quick · Full of Momentum",
    video: "/result/volt.mp4",
    heart: "/result/volt-heart.png",
    description: [
      "You are the Electric Heartis — energetic, quick, and full of momentum.",
      "You charge the world with your ideas, but balance keeps your brilliance from burning out."
    ],
    remember: "Leave a pause between the surges. In stillness, your brilliance finds rhythm again."
  },
  
  bloom: {
    name: "Heartis·Bloom",
    color: "#368edf",
    essence: "Free-Spirited · Warm · Open-Hearted",
    video: "/result/bloom.mp4",
    heart: "/result/bloom-heart.png",
    description: [
      "You are the Wind Heartis — free-spirited, warm, and open-hearted.",
      "You uplift others with kindness, but even the kindest breeze must know when to rest."
    ],
    remember: "Even the kindest garden needs boundaries. Nurture your own soil first, only then can your warmth truly blossom."
  },
  
  zephy: {
    name: "Heartis·Zephy",
    color: "#368edf",
    essence: "Imaginative · Curious · Full of Spark",
    video: "/result/zephy.mp4",
    heart: "/result/zephy-heart.png",
    description: [
      "You are the Zephy Heartis — imaginative, curious, and full of spark.",
      "You move with inspiration, but grounding your dreams gives them power to last."
    ],
    remember: "Find where the wind pauses, that's where inspiration becomes creation. When you choose a path to stay, your lightness turns into power."
  },
  
  terra: {
    name: "Heartis·Terra",
    color: "#f8781f",
    essence: "Grounded · Patient · Enduring",
    video: "/result/terra.mp4",
    heart: "/result/terra-heart.png",
    description: [
      "You are the Stone Heartis — grounded, patient, and enduring.",
      "You hold steady through storms and offer strength to others.",
      "But even mountains must yield to time and change."
    ],
    remember: "Don't fear the cracks. They are where light finds its way in. Even mountains shift, and that's how valleys are born. Let a little wind reshape you; your strength will not fade. It will shine."
  },
  
  thorn: {
    name: "Heartis·Thorn",
    color: "#402A20",
    essence: "Protective · Strong · Deeply Tender",
    video: "/result/thorn.mp4",
    heart: "/result/thorn-heart.png",
    description: [
      "You are the Cactus Heartis — protective, strong, yet deeply tender within.",
      "You guard your softness behind quiet resilience, but connection grows when courage meets vulnerability."
    ],
    remember: "Let others glimpse your softness. Vulnerability is not weakness, it's the bridge that turns solitude into trust."
  },
  
  core: {
    name: "Heartis·Core",
    color: "#402A20",
    essence: "Steady · Deliberate · True to Values",
    video: "/result/core.mp4",
    heart: "/result/core-heart.png",
    description: [
      "You are the Metal Heartis — steady, deliberate, and true to your values.",
      "You balance reason and warmth, shaping stability out of empathy and strength."
    ],
    remember: "Reason and warmth are not rivals. Let your structure breathe, and your strength will resonate deeper than steel."
  },
  
  machina: {
    name: "Heartis·Machina",
    color: "#368edf",
    essence: "Logical · Focused · Efficient",
    video: "/result/machina.mp4",
    heart: "/result/machina-heart.png",
    description: [
      "You are the Gear Heartis — logical, focused, and beautifully efficient.",
      "You thrive on precision and structure, yet even machines need rhythm, not just motion."
    ],
    remember: "Pause now and then, let the machine hear its own heartbeat. Even gears need moments of stillness to move with grace again."
  },
  
  muse: {
    name: "Heartis·Muse",
    color: "#368edf",
    essence: "Joyful · Creative · Full of Wonder",
    video: "/result/muse.mp4",
    heart: "/result/muse-heart.png",
    description: [
      "You are the Bubble Heartis — joyful, creative, and full of wonder.",
      "You remind others that lightness is not emptiness but freedom, and play is its own kind of wisdom."
    ],
    remember: "Let your joy take root. When light meets depth, even the briefest shimmer becomes eternal."
  },
  
  verdan: {
    name: "Heartis·Verdan",
    color: "#368edf",
    essence: "Ever-Growing · Resilient · Quietly Ambitious",
    video: "/result/verdan.mp4",
    heart: "/result/verdan-heart.png",
    description: [
      "You are the Vine Heartis — ever-growing, resilient, and full of quiet ambition.",
      "You seek connection and meaning, always reaching toward the light.",
      "Your patience turns persistence into grace."
    ],
    remember: "Anchor yourself in purpose, and your expansion will gain depth. With each steady root, your branches will rise higher."
  },
  
  gem: {
    name: "Heartis·Gem",
    color: "#f8781f",
    essence: "Refined · Thoughtful · Precise",
    video: "/result/gem.mp4",
    heart: "/result/gem-heart.png",
    description: [
      "You are the Gem Heartis — refined, thoughtful, and precise.",
      "You seek clarity and perfection in everything you touch.",
      "Yet remember, beauty shines brightest when it's allowed to breathe."
    ],
    remember: "Perfection can weigh heavy when it leaves no room to breathe. Allow yourself to shimmer through the cracks; that's where your truest brilliance lives."
  },
  
  tide: {
    name: "Heartis·Tide",
    color: "#368edf",
    essence: "Calm · Nurturing · Deeply Empathic",
    video: "/result/tide.mp4",
    heart: "/result/tide-heart.png",
    description: [
      "You are the Tide Heartis — calm, nurturing, and deeply empathic.",
      "You sense what others feel before they speak, and your compassion brings peace.",
      "But you must remember to let your own waves rest too."
    ],
    remember: "You are not just the current. You are the depth beneath it. Let your compassion flow, but let it return to you as well. Hold your boundaries as harbors, not walls. Only then can your calm bring peace, not exhaustion."
  }
};
