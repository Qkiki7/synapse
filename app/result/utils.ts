// OCEA code 到 heartis 类型名称的映射
export const codeToHeartisType: Record<string, string> = {
  "HHHH": "flare",
  "HHHL": "volt",
  "HHLH": "drift",
  "HHLL": "crystal",
  "HLHH": "ignis",
  "HLHL": "zephy",
  "HLLH": "bloom",
  "HLLL": "luma",
  "LHHH": "gem",
  "LHHL": "core",
  "LHLH": "thorn",
  "LHLL": "machina",
  "LLHH": "muse",
  "LLHL": "verdan",
  "LLLH": "tide",
  "LLLL": "terra",
};

/**
 * 根据 OCEA code 获取 heartis 类型名称（用于 URL）
 */
export function getHeartisTypeFromCode(code: string): string {
  return codeToHeartisType[code] || "ignis"; // 默认返回 ignis
}

