"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeartisProgress from "../components/HeartisProgress";

/** ---------- 题目集（13–18） ---------- */
const QUESTIONS = [
  { id: 13, text: "Is reliable, can always be counted on." },
  { id: 14, text: "Is emotionally stable, not easily upset.", reverse: true },
  { id: 15, text: "Is original, comes up with new ideas." },
  { id: 16, text: "Is outgoing, sociable." },
  { id: 17, text: "Can be cold and uncaring.", reverse: true },
  { id: 18, text: "Keeps things neat and tidy." },
];

const LIKERT = [
  { v: 1, label: "Strongly Disagree" },
  { v: 2, label: "Disagree a little" },
  { v: 3, label: "Neutral" },
  { v: 4, label: "Agree a little" },
  { v: 5, label: "Strongly Agree" },
];

export default function QuizPage3() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("heartis_answers");
        return raw ? JSON.parse(raw) : {};
      } catch {}
    }
    return {};
  });

  /** 保存到 localStorage */
  useEffect(() => {
    localStorage.setItem("heartis_answers", JSON.stringify(answers));
  }, [answers]);

  const select = (id: number, v: number) => {
    setAnswers((prev) => ({ ...prev, [id]: v }));
  };

  const totalQuestions = 30;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.min(100, (answeredCount / totalQuestions) * 100);

  // ✅ 首帧禁用过渡，挂载后启用
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const pageCompleted = QUESTIONS.every((q) => answers[q.id] !== undefined);

  return (
    <div className="relative z-10 max-w-4xl mx-auto py-16 px-6">
      {/* 顶部标题 + 进度条 */}
      <div className="w-full max-w-5xl mx-auto px-6 pt-10 pb-6 text-center select-none flex flex-col items-center justify-start">
        <h1 className="font-playfair text-[2rem] md:text-[2.3rem] text-[#f8781f] font-semibold leading-snug tracking-wide whitespace-nowrap">
          Every choice reflects a little piece of your heart.
        </h1>
        <p className="text-center text-lg md:text-xl text-[#368edf]/85 font-light max-w-3xl mx-auto leading-relaxed italic transition-colors duration-300 ease-in-out">
          No ‘right’ answers. Go with your first feeling.
        </p>

        {/* 进度条（漂浮心形，按题推进） */}
        <HeartisProgress
          answeredCount={answeredCount}
          totalQuestions={30}
          label="Q13–18 / 30 • Page 3/5"
        />
      </div>

      {/* 题目卡片 */}
      <div className="flex flex-col gap-8">
        {QUESTIONS.map((q) => (
          <div
            key={q.id}
            className="rounded-2xl p-6 md:p-7 bg-white/60 backdrop-blur-md ring-1 ring-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
          >
            {/* 题干 */}
            <div className="mb-4 md:mb-5 flex items-start gap-3">
              <span className="inline-grid h-9 w-9 place-items-center rounded-full text-sm font-semibold bg-[#f7c59f] text-[#402A20]">
                {q.id}
              </span>
              <p
                className="text-[15px] md:text-[16px] leading-[1.65] text-neutral-900"
                style={{ textShadow: "0 1px 1px rgba(0,0,0,0.15)" }}
              >
                <span className="text-neutral-700">I am someone who</span>{" "}
                <em className="not-italic font-medium text-[#5A463A]">
                  {q.text}
                </em>
              </p>
            </div>

            {/* 选项按钮 */}
            <div
              role="radiogroup"
              aria-label={`Question ${q.id}`}
              className="grid grid-cols-5 gap-2.5 md:gap-3"
            >
              {LIKERT.map(({ v, label }) => {
                const active = answers[q.id] === v;
                return (
                  <button
                    key={v}
                    onClick={() => select(q.id, v)}
                    title={label}
                    className={[
                      "h-[56px] md:h-[60px] rounded-xl border text-[12px] md:text-[13px] font-normal px-2 transition-all duration-500 ease-in-out shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/10",
                      active
                        ? "bg-[#f7c59f] text-[#402A20] border-[#f7c59f] shadow-[0_0_20px_6px_rgba(247,197,159,0.35)] animate-glow"
                        : "bg-white text-[#5A463A] border-[#f9d8b9] hover:border-[#f6be8c] hover:shadow-[0_0_18px_6px_rgba(245,181,127,0.35)] hover:animate-glow",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* 底部说明 */}
            <div className="mt-3 text-[11px] text-neutral-600/80 flex items-center justify-between px-1">
              <span>Disagree</span>
              <span>Neutral</span>
              <span>Agree</span>
            </div>
          </div>
        ))}
      </div>

      {/* 导航按钮 */}
      <div className="mt-12 flex items-center justify-between">
        <button
          onClick={() => router.push("/quiz/page2")}
          className="px-8 py-3 rounded-2xl bg-white/60 text-[#5A463A] border border-[#f5b57f]/60 font-medium hover:shadow-[0_0_20px_6px_rgba(245,181,127,0.35)] hover:brightness-105 transition-all duration-300 ease-in-out"
        >
          ← Previous
        </button>
        <button
          onClick={() => router.push("/quiz/page4")}
          disabled={!pageCompleted}
          className="px-8 py-3 rounded-2xl bg-[#f8781f] text-white font-semibold hover:shadow-[0_0_20px_6px_rgba(248,120,31,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  );
}


