"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { heartisData, HeartisKey } from "../data";

export default function ResultPage() {
  const router = useRouter();
  const params = useParams();
  const heartisSlug = (params?.heartis as string)?.toLowerCase() as HeartisKey;
  const heartis = heartisData[heartisSlug];

  if (!heartis) {
    return (
      <div className="h-screen flex items-center justify-center text-[#402A20] font-serif text-2xl">
        404 | Heartis not found.
      </div>
    );
  }

  const [view, setView] = useState<"character" | "heart">("character");

  return (
    <main className="flex w-full h-screen overflow-hidden">
      {/* 左侧视频或图片区 */}
      <div className="relative w-[45%] h-screen overflow-hidden">
        {view === "character" ? (
          <video
            src={heartis.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: "center center",
            }}
          />
        ) : (
          <img
            src={heartis.heart}
            alt={`${heartis.name} Heart`}
            className="absolute inset-0 w-full h-full object-contain bg-white"
          />
        )}

        {/* 切换视图按钮（右上角） */}
        <button
          onClick={() => setView(view === "character" ? "heart" : "character")}
          className="absolute top-6 right-6 bg-white/70 text-[#402A20] border border-[#f7c59f] rounded-xl px-5 py-2 font-futura text-sm hover:bg-[#f7c59f] hover:text-white transition-all duration-300"
        >
          {view === "character" ? "Heart View" : "Character View"}
        </button>
      </div>

      {/* 右侧文字内容区 */}
      <section className="relative w-[55%] h-screen overflow-y-auto bg-[#fffaf5] p-16 flex flex-col justify-center">
        <h1 className="text-[#f8781f] font-playfair text-5xl font-semibold mb-4">
          {heartis.name}
        </h1>

        <h2 className="text-[#368edf] text-xl font-futura font-semibold mb-1">
          Core Essence:
        </h2>
        <p className="italic text-[#5A463A] mb-6">{heartis.essence}</p>

        {heartis.description.map((p, i) => (
          <p
            key={i}
            className="text-[#402A20] text-lg leading-relaxed mb-4 font-futura"
          >
            {p}
          </p>
        ))}

        <h3 className="text-[#368edf] font-semibold mt-6 mb-2 font-futura">
          Remember:
        </h3>
        <p className="italic text-[#f8781f] text-lg">{heartis.remember}</p>

        {/* Restart按钮 */}
        <button
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
          className="absolute bottom-6 right-6 border border-[#f8781f] text-[#f8781f] rounded-xl px-6 py-2 font-futura text-sm hover:bg-[#f8781f] hover:text-white transition-all duration-300"
        >
          Restart
        </button>
      </section>
    </main>
  );
}
