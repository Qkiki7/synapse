"use client";
import HeartisButton from "@/components/HeartisButton";

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center h-screen text-center -translate-y-6 text-white overflow-hidden">
      {/* 背景视频 */}
      <video
        autoPlay
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/bg/heartisynapse-bg.mp4"
      />
      
      {/* 音频 */}
      <audio src="/audio/lets-heartie.wav" preload="auto" loop />
      
      {/* 半透明背景遮罩层 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* 文字+按钮容器，放在一个相对层上面 */}
      <div className="relative flex flex-col items-center z-10">
        {/* 心跳文字 */}
        <h1
          className="
            text-white font-serif 
            text-5xl md:text-6xl 
            text-center 
            mb-12
            animate-heartbeat-soft
          "
          style={{
            fontFamily: '"DM Serif Display","Playfair Display",serif',
            ["--heartbeat-scale" as any]: 1.03,
          }}
        >
          Heartis has been waiting for you.
        </h1>

        {/* 按钮，用我们统一的组件 */}
        <HeartisButton href="/start">
          STEP INSIDE
        </HeartisButton>
      </div>

      {/* 自定义样式块：放在同一个组件里即可 */}
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
