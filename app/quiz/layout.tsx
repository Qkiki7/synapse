"use client";

import { useEffect } from "react";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  /** 刷新时清空 localStorage */
  useEffect(() => {
    if ((performance as any)?.navigation?.type === 1) {
      // type === 1 表示是刷新，不是路由跳转
      try {
        localStorage.removeItem("heartis_answers");
        localStorage.removeItem("heartis_result");
        // eslint-disable-next-line no-console
        console.log("🧹 LocalStorage cleared: new tester session started");
      } catch {}
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-neutral-900 font-serif">
      {/* 🌊 背景视频（全局共用） */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="/bg/ocean.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* ☀️ 柔光遮罩 */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#D9A86C]/40 via-[#EEC78C]/50 to-white/60 mix-blend-multiply pointer-events-none z-0" />

      {/* 🌸 内容 */}
      <div className="relative z-10">{children}</div>
    </main>
  );
}


