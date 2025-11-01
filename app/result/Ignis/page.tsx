"use client";
import { useState } from "react";

const ORANGE = "#f8781f";
const BLUE = "#368edf";
const BROWN = "#402A20";

export default function ResultPage() {
  const [isHeartView, setIsHeartView] = useState<boolean>(false);

  return (
    <main className="w-full h-screen overflow-hidden grid grid-cols-[55%_45%] bg-gradient-to-b from-[#f7e4cf] via-[#fbeede] to-[#fffaf6]">
      {/* 左半屏：Character 视频 */}
      <section className="relative h-full w-full flex items-center justify-center">
        {/* 左侧视频区 —— 含右上角 logo，可切换到 Heart PNG */}
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
          {isHeartView ? (
            <img
              src="/result/ignis-heart.png"
              alt="Heart view"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: "center center",
                imageRendering: "high-quality" as any,
              }}
            />
          ) : (
            <video
              src="/result/ignis.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: "center center",
                imageRendering: "high-quality" as any,
              }}
            />
          )}

          {/* 右上角 logo 按钮 */}
          <button
            onClick={() => setIsHeartView(!isHeartView)}
            className="absolute top-6 right-6 bg-white/40 hover:bg-white/60 text-[#402A20] font-medium rounded-full px-4 py-2 backdrop-blur-md transition"
          >
            {isHeartView ? "Character View" : "Heart View"}
          </button>
        </div>
      </section>

      {/* 右半屏：文字（格式如示例图） */}
      <section className="h-full w-full flex flex-col justify-center px-[8%] leading-relaxed">
        {/* 标题 */}
        <h2
          className="font-serif font-bold mb-4"
          style={{ color: ORANGE, fontSize: "clamp(32px,3vw,46px)" }}
        >
          Heartis·Ignis
        </h2>

        {/* Core Essence */}
        <p
          className="font-serif font-semibold mb-1"
          style={{ color: BLUE, fontSize: "clamp(16px,1.6vw,20px)" }}
        >
          Core Essence:
        </p>
        <p
          className="italic mb-6"
          style={{
            color: BROWN,
            fontSize: "clamp(15px,1.6vw,19px)",
            marginLeft: "0.5rem",
          }}
        >
          Passionate · Bold · Driven by Momentum
        </p>

        {/* 主体段落（分句排列） */}
        <p style={{ color: BROWN, marginBottom: "1rem" }}>
          You are the{" "}
          <span style={{ color: ORANGE, fontWeight: 600 }}>Fire Heartis</span>, a
          spark that turns vision into motion.
        </p>

        <p style={{ color: BROWN, marginBottom: "1rem" }}>
          Your courage lights the path ahead, igniting hearts and pushing ideas
          into action.
        </p>

        <p style={{ color: BROWN, marginBottom: "1rem" }}>
          Wherever you go, the air hums with your will to begin.
        </p>

        <p style={{ color: BROWN, marginBottom: "1rem" }}>
          But flames that rise too high burn out just as fast.
        </p>

        <p style={{ color: BROWN, marginBottom: "1.5rem" }}>
          Your fire, once unchecked, can consume your focus or exhaust your
          warmth.
        </p>

        {/* Remember 段落 */}
        <p
          className="font-serif font-semibold mt-4 mb-1"
          style={{ color: BLUE, fontSize: "clamp(16px,1.6vw,20px)" }}
        >
          Remember:
        </p>
        <p
          className="italic"
          style={{
            color: ORANGE,
            fontSize: "clamp(15px,1.6vw,19px)",
            lineHeight: 1.7,
          }}
        >
          Before lighting others, remember to refuel yourself. Even the
          strongest blaze needs a quiet ember at its core.
        </p>

        {/* 右下角 Restart 按钮 —— 橙色发光玻璃风格 */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="fixed bottom-8 right-8 px-8 py-3 font-semibold text-[#f8781f] uppercase tracking-wide border border-[#f8781f]/60 bg-white/10 backdrop-blur-md rounded-2xl shadow-sm hover:bg-[#f8781f]/10 hover:shadow-md hover:shadow-[#f8781f]/50 hover:scale-105 transition-all duration-300"
        >
          Restart
        </button>
      </section>
    </main>
  );
}
