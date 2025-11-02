// /app/utils/calculateHeartis.ts
export interface QuizAnswer {
  trait: "O" | "C" | "E" | "A" | "N";
  value: number; // 1–5
  reverse?: boolean; // 是否反向题
}

export function calculateHeartis(answers: QuizAnswer[]): string {
  // 1️⃣ 各维度收集分数
  const traits = { O: [] as number[], C: [], E: [], A: [], N: [] };

  answers.forEach(({ trait, value, reverse }) => {
    const score = reverse ? 6 - value : value; // 反向题反算
    traits[trait].push(score);
  });

  // 2️⃣ 各维度平均分并转为 High / Low
  const code = (["O", "C", "E", "A", "N"] as const)
    .map((t) => {
      const arr = traits[t];
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
      return avg >= 3.5 ? "H" : "L";
    })
    .join("");

  // 3️⃣ 返回对应的 Heartis 角色
  return mapToHeartis(code);
}

// 4️⃣ 五维组合 → Heartis 类型映射表
function mapToHeartis(code: string): string {
  const map: Record<string, string> = {
    HHHHH: "ignis", // Fire
    HHHHL: "flare", // Solar
    HLHHH: "volt",  // Electric
    LHLHH: "tide",  // Water
    LHHHH: "drift", // Cloud
    LLHHH: "thorn", // Cactus
    LLLHH: "terra", // Stone
    LLHLH: "gem",   // Gem
    HLLHH: "verdan", // Vine
    HLLLH: "bloom",  // Flower
    HLHHL: "zephy",  // Wind
    HLHLL: "muse",   // Bubble
    LHHLL: "machina", // Gear
    LLHLL: "core",    // Metal
    LLHLH: "crystal", // Ice
    LLLLH: "luma",    // Mercury
  };
  return map[code] || "ignis"; // 默认 ignis
}

