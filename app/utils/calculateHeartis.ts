// /app/utils/calculateHeartis.ts
export interface QuizAnswer {
  trait: "O" | "C" | "E" | "A";
  value: number; // 1–5
  reverse?: boolean; // 是否反向题
}

export function calculateHeartis(answers: QuizAnswer[]): string {
  // 1️⃣ 各维度收集分数
  const traits: Record<"O" | "C" | "E" | "A", number[]> = { 
    O: [], 
    C: [], 
    E: [], 
    A: []
  };

  answers.forEach(({ trait, value, reverse }) => {
    const score = reverse ? 6 - value : value; // 反向题反算
    traits[trait].push(score);
  });

  // 2️⃣ 各维度平均分并转为 High / Low
  const code = (["O", "C", "E", "A"] as const)
    .map((t) => {
      const arr = traits[t];
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
      return avg >= 3.5 ? "H" : "L";
    })
    .join("");

  // 3️⃣ 返回对应的 Heartis 角色
  return mapToHeartis(code);
}

// 4️⃣ 五维组合 → Heartis 类型映射表（已弃用，使用 OCEA 四维）
function mapToHeartis(code: string): string {
  const map: Record<string, string> = {
    HHHH: "flare", // Solar
    HHHL: "volt",  // Electric
    HHLH: "drift", // Cloud
    HHLL: "crystal", // Crystal
    HLHH: "ignis",  // Fire
    HLHL: "zephy",  // Wind
    HLLH: "bloom",  // Flower
    HLLL: "luma",   // Light
    LHHH: "gem",    // Gem
    LHHL: "core",   // Core
    LHLH: "thorn",  // Thorn
    LHLL: "machina", // Machine
    LLHH: "muse",   // Muse
    LLHL: "verdan", // Verdant
    LLLH: "tide",   // Tide
    LLLL: "terra",  // Terra
  };
  return map[code] || "ignis"; // 默认 ignis
}

