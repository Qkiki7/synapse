export interface HeartisType {
  name: string;
  element: string;
  image: string;
  description: string;
}

export type HeartisCode = 
  | "HHHH" | "HHHL" | "HHLH" | "HHLL"
  | "HLHH" | "HLHL" | "HLLH" | "HLLL"
  | "LHHH" | "LHHL" | "LHLH" | "LHLL"
  | "LLHH" | "LLHL" | "LLLH" | "LLLL";

export const heartisTypes: Record<HeartisCode, HeartisType> = {
  "HHHH": {
    "name": "Solar Heartis",
    "element": "Sun",
    "image": "/heartis/flare.png",
    "description": "Radiant, confident, and full of warmth — you light up others' paths."
  },
  "HHHL": {
    "name": "Volt Heartis",
    "element": "Lightning",
    "image": "/heartis/volt.png",
    "description": "Energetic and bold — your sparks inspire those around you."
  },
  "HHLH": {
    "name": "Drift Heartis",
    "element": "Cloud",
    "image": "/heartis/drift.png",
    "description": "Gentle and reflective — you move with calm purpose."
  },
  "HHLL": {
    "name": "Crystal Heartis",
    "element": "Ice",
    "image": "/heartis/crystal.png",
    "description": "Composed and clear-minded — your stillness reveals depth."
  },
  "HLHH": {
    "name": "Ignis Heartis",
    "element": "Fire",
    "image": "/heartis/ignis.png",
    "description": "Passionate and brave — your energy transforms everything you touch."
  },
  "HLHL": {
    "name": "Zephy Heartis",
    "element": "Wind",
    "image": "/heartis/zephy.png",
    "description": "Free-spirited and intuitive — your ideas travel beyond limits."
  },
  "HLLH": {
    "name": "Bloom Heartis",
    "element": "Flower",
    "image": "/heartis/bloom.png",
    "description": "Caring and creative — you nurture growth wherever you go."
  },
  "HLLL": {
    "name": "Luma Heartis",
    "element": "Water",
    "image": "/heartis/luma.png",
    "description": "Soft yet resilient — you flow through life with empathy and grace."
  },
  "LHHH": {
    "name": "Gem Heartis",
    "element": "Crystal",
    "image": "/heartis/gem.png",
    "description": "Precise and elegant — your presence brings clarity to chaos."
  },
  "LHHL": {
    "name": "Core Heartis",
    "element": "Metal",
    "image": "/heartis/core.png",
    "description": "Steady and disciplined — your strength anchors others."
  },
  "LHLH": {
    "name": "Thorn Heartis",
    "element": "Cactus",
    "image": "/heartis/thorn.png",
    "description": "Protective but loving — your heart defends what truly matters."
  },
  "LHLL": {
    "name": "Machina Heartis",
    "element": "Gear",
    "image": "/heartis/machina.png",
    "description": "Analytical and inventive — your mind builds bridges between logic and emotion."
  },
  "LLHH": {
    "name": "Muse Heartis",
    "element": "Bubble",
    "image": "/heartis/muse.png",
    "description": "Imaginative and emotional — you create beauty from feeling."
  },
  "LLHL": {
    "name": "Verdan Heartis",
    "element": "Vine",
    "image": "/heartis/verdan.png",
    "description": "Peaceful and nurturing — you grow connections quietly and deeply."
  },
  "LLLH": {
    "name": "Tide Heartis",
    "element": "Waterdrop",
    "image": "/heartis/tide.png",
    "description": "Empathic and enduring — you move gently, carrying others' emotions safely."
  },
  "LLLL": {
    "name": "Terra Heartis",
    "element": "Stone",
    "image": "/heartis/terra.png",
    "description": "Grounded and reliable — your calm keeps others steady."
  }
};

