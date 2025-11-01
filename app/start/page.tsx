"use client";

import HeartisButton from "@/components/HeartisButton";

export default function StartPage() {
  return (
    <main className="relative flex items-center justify-center min-h-screen text-center px-4">

      {/* 背景层 —— 这一层应该是你的视频/图像 */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          playsInline
          muted
          className="w-full h-full object-cover"
          src="/bg/heartisynapse-bg.mp4"
        />
      </div>

      {/* 遮罩（如果封面页有一层暗化，可以复制那层过来） */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent -z-10" />

      {/* 内容卡片 */}
      <div
        className="
          bg-white/10 backdrop-blur-md
          rounded-xl
          p-8 sm:p-10 lg:p-12
          w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]
          max-w-[900px]
          text-center
          mx-auto
          shadow-[0_8px_40px_rgba(0,0,0,0.25)]
          transition-all duration-500
          border border-white/20
        "
      >
        <p className="text-sm tracking-[0.25em] text-white/60 mb-6">
          PREPARE TO SCAN
        </p>

        <h1
          className="
            font-serif text-white
            mb-8
            animate-heartbeat-soft
            whitespace-nowrap
            text-[clamp(2rem,5vw,3rem)]
          "
          style={{
            ["--heartbeat-scale" as any]: 1.03,
          }}
        >
          Heartis will read your signal.
        </h1>

        <div className="text-white/80 leading-relaxed max-w-[620px] mx-auto mb-8 text-lg">
          <p>You'll answer 30 tiny questions.</p>
          <p>
            This is not a diagnosis. There's no "good" or "bad."
            It's just a moment scan of your emotional field across 4 dimensions.
          </p>
          <p>
            At the end, you'll see which Heart Core is glowing in you right now —
            one of 16 possible forms.
          </p>
        </div>

        <p className="text-white/60 text-sm mb-8">
          ~3 minutes · 30 questions · 16 cores · visual only
        </p>

        <HeartisButton href="/quiz">
          LET'S BEGIN THE TESTING!!
        </HeartisButton>
      </div>

      {/* 心跳动画样式 */}
      <style jsx>{`
        @keyframes heartbeat-soft {
          0% {
            transform: scale(1);
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            opacity: 1;
          }
          30% {
            transform: scale(var(--heartbeat-scale));
            text-shadow: 0 0 16px rgba(255, 255, 255, 0.6),
                         0 0 32px rgba(255, 200, 150, 0.25);
            opacity: 1;
          }
          60% {
            transform: scale(1);
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            text-shadow: 0 0 6px rgba(255, 255, 255, 0.2);
            opacity: 1;
          }
        }
        .animate-heartbeat-soft {
          animation: heartbeat-soft 1.8s ease-in-out infinite;
          will-change: transform, text-shadow;
        }
      `}</style>
    </main>
  );
}
