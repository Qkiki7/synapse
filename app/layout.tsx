"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Heart, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3; // 初始音量
    audio.loop = true;

    // 尝试自动播放（多数浏览器需要用户动作后才能成功）
    const tryPlay = () => {
      audio.volume = 0;
      audio.play().then(() => {
        let v = 0;
        const fade = setInterval(() => {
          if (v < 0.3) {
            v += 0.02;
            audio.volume = v;
          } else clearInterval(fade);
        }, 120);
        setIsPlaying(true);
      }).catch(() => setIsPlaying(false));
    };

    tryPlay();

    // 如果浏览器阻止了播放 → 监听用户第一次交互后再播放
    const resumePlay = () => {
      if (audio.paused) {
        tryPlay();
      }
      window.removeEventListener("click", resumePlay);
      window.removeEventListener("mousemove", resumePlay);
    };

    window.addEventListener("click", resumePlay);
    window.addEventListener("mousemove", resumePlay);

    // 监听播放 / 暂停事件，同步图标状态
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      window.removeEventListener("click", resumePlay);
      window.removeEventListener("mousemove", resumePlay);
    };
  }, []);

  // 点击切换播放状态
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = 0;
      audio.play().then(() => {
        let v = 0;
        const fade = setInterval(() => {
          if (v < 0.3) {
            v += 0.02;
            audio.volume = v;
          } else clearInterval(fade);
        }, 120);
        setIsPlaying(true);
      }).catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <html lang="en">
      <body className="relative">
        {children}

        {/* 背景音乐 */}
        <audio
          ref={audioRef}
          src="/audio/lets-heartie.wav"
          preload="auto"
          className="hidden"
        />

        {/* 返回按钮 */}
        <button
          onClick={() => router.push("/")}
          className="fixed top-6 left-6 z-[1000] flex items-center justify-center 
                     w-12 h-12 rounded-full border border-white/30 backdrop-blur-md
                     bg-white/10 hover:bg-white/20 transition-all duration-300
                     shadow-[0_0_15px_rgba(255,200,150,0.3)] hover:scale-105"
        >
          <ArrowLeft className="w-6 h-6 text-white/90" />
        </button>

        {/* 音乐控制按钮 */}
        <button
          onClick={toggleAudio}
          className={`fixed top-6 right-6 z-[1000] flex items-center justify-center 
          w-12 h-12 rounded-full border border-white/30 backdrop-blur-md 
          transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,200,150,0.3)]
          ${isPlaying ? "bg-white/20 animate-heartisPulse" : "bg-white/10"}`}
        >
          {isPlaying ? (
            <Heart
              className="w-6 h-6 text-pink-300 drop-shadow-[0_0_6px_rgba(255,180,200,0.6)]"
              fill="rgba(255,160,180,0.8)"
            />
          ) : (
            <VolumeX className="w-6 h-6 text-white/80 drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]" />
          )}
        </button>
      </body>
    </html>
  );
}

