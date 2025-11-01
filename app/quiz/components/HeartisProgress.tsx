"use client";

import { useEffect, useMemo, useState } from "react";

export default function HeartisProgress({
  answeredCount,
  totalQuestions,
  label, // e.g. "Q13–18 / 30 • Page 3/5"
}: {
  answeredCount: number;
  totalQuestions: number;
  label: string;
}) {
  // 首帧不做过渡，挂载后再开动画，避免“0%→X%”跳动
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const progressPercent = useMemo(
    () => Math.min(100, (answeredCount / totalQuestions) * 100),
    [answeredCount, totalQuestions]
  );

  return (
    <>
      {/* 进度条（Heartis 漂浮心形） */}
      <div className="w-4/5 md:w-3/5 mx-auto mt-8 relative">
        {/* 背景条 */}
        <div className="h-3 bg-[#f3e3d3]/70 rounded-full overflow-hidden shadow-inner relative">
          {/* 已完成部分 */}
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              transition: mounted
                ? "width 0.7s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
              width: `${progressPercent}%`,
              background:
                "linear-gradient(90deg, #fcd9a1 0%, #f8b27a 60%, #f38a3a 100%)",
              boxShadow: "0 0 12px 3px rgba(248,120,31,0.35)",
            }}
          />
        </div>

        {/* 心形漂浮点 */}
        <svg
          viewBox="0 0 24 24"
          fill="#f8781f"
          className="absolute w-5 h-5 drop-shadow-lg transition-all duration-700 ease-in-out animate-float"
          style={{
            left: `calc(${progressPercent}% - 10px)`,
            top: "-6px",
          }}
        >
          <path d="M12.1 21s-6.6-4.35-9.1-7.6C1.1 10.9 2 7.7 4.7 6.6c1.8-.8 3.9-.1 5.0 1.3 1.1-1.4 3.2-2.1 5.0-1.3 2.7 1.1 3.6 4.3 1.7 6.8C18.7 16.6 12.1 21 12.1 21z" />
        </svg>
      </div>

      {/* 页码标签 */}
      <p className="mt-3 text-[#f5b57f] font-futura text-sm tracking-widest text-center">
        {label}
      </p>
    </>
  );
}


