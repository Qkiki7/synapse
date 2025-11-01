"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { heartisData, HeartisKey } from "../../data";

export default function ResultHeartPage() {
  const params = useParams();
  const heartis = (params?.heartis as string)?.toLowerCase() as HeartisKey;
  const data = heartisData[heartis];

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-600 mb-6">No such Heartis found.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#f8781f] text-white rounded-xl hover:bg-[#e36c1d] transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-[1fr,0.9fr] w-full min-h-screen bg-[#fff7ef]">
      {/* 左侧 Heart PNG：上下填满，无圆角 */}
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <img
          src={data.heart}
          alt={`${data.name} Heart`}
          className="object-contain w-full h-full"
        />
        {/* 切回 Character view 的按钮（也可放一个小"play"图标） */}
        <Link
          href={`/result/${heartis}`}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full px-4 py-2 text-[14px] font-medium transition"
          aria-label="Switch to Character view"
        >
          Character View
        </Link>
      </div>

      {/* 右侧文案（同样保持不动） */}
      <article className="flex flex-col justify-center px-10">
        <h1
          className="text-[44px] md:text-[56px] font-serif font-semibold mb-6"
          style={{ color: data.color }}
        >
          {data.name}
        </h1>

        <h2 className="text-[#368edf] font-semibold text-[18px] mb-2">
          Core Essence:
        </h2>
        <p className="italic text-[18px] text-[#3b3b3b] mb-6">
          {data.essence}
        </p>

        {data.description.map((p, i) => (
          <p key={i} className="text-[17px] text-[#2b2b2b] leading-relaxed mb-3">
            {p}
          </p>
        ))}

        <h3 className="text-[#368edf] font-semibold text-[18px] mt-8 mb-2">
          Remember:
        </h3>
        <p className="italic text-[17px]" style={{ color: data.color }}>
          {data.remember}
        </p>
      </article>

      {/* Restart（橙色描边 & 文本） */}
      <Link
        href="/"
        onClick={() => {
          localStorage.clear();
        }}
        className="fixed bottom-6 right-6 px-7 py-3 uppercase font-semibold border rounded-xl shadow-sm transition hover:shadow-md"
        style={{
          borderColor: data.color,
          color: data.color,
        }}
      >
        Restart
      </Link>
    </section>
  );
}

