"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeartisProgress from "../components/HeartisProgress";
import { getHeartisTypeFromCode } from "@/app/result/utils";

/** ---------- 题目集（25–30） ---------- */
const QUESTIONS = [
  { id: 25, text: "Is complex, a deep thinker." },
  { id: 26, text: "Is less active than other people.", reverse: true },
  { id: 27, text: "Tends to find fault with others.", reverse: true },
  { id: 28, text: "Can be somewhat careless.", reverse: true },
  { id: 29, text: "Is temperamental, gets emotional easily." },
  { id: 30, text: "Has little creativity.", reverse: true },
];

const LIKERT = [
  { v: 1, label: "Strongly Disagree" },
  { v: 2, label: "Disagree a little" },
  { v: 3, label: "Neutral" },
  { v: 4, label: "Agree a little" },
  { v: 5, label: "Strongly Agree" },
];

export default function QuizPage5() {
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

  useEffect(() => {
    try {
      localStorage.setItem("heartis_answers", JSON.stringify(answers));
    } catch {}
  }, [answers]);

  const select = (id: number, v: number) =>
    setAnswers((prev) => ({ ...prev, [id]: v }));

  const totalQuestions = 30;
  const answeredCount = Object.keys(answers).length;
  const pageCompleted = QUESTIONS.every((q) => answers[q.id] !== undefined);

  // OCEA 计分逻辑（与 page1 保持一致）
  const REVERSED = new Set([1, 3, 7, 8, 10, 14, 19, 20, 21, 24, 26, 27, 28, 30]);
  const OCEA = {
    O: [5, 10, 15, 20, 25, 30, 14, 19, 24, 29, 4, 9],
    C: [3, 8, 13, 18, 23, 28],
    E: [1, 6, 11, 16, 21, 26],
    A: [2, 7, 12, 17, 22, 27],
  } as const;

  function rev(id: number, v: number) {
    return REVERSED.has(id) ? 6 - v : v;
  }
  function avg(ids: readonly number[], ans: Record<number, number>) {
    const arr = ids.map((id) => rev(id, ans[id]!));
    const sum = arr.reduce((a, b) => a + b, 0);
    return +((sum / arr.length).toFixed(2));
  }
  function scoreOCEA(ans: Record<number, number>) {
    const O = avg(OCEA.O, ans);
    const C = avg(OCEA.C, ans);
    const E = avg(OCEA.E, ans);
    const A = avg(OCEA.A, ans);
    return { O, C, E, A };
  }
  function toHL(x: number) {
    return x > 3 ? "H" : "L";
  }
  function codeOCEA(O: number, C: number, E: number, A: number) {
    return `${toHL(O)}${toHL(C)}${toHL(E)}${toHL(A)}`; // O C E A 顺序
  }

  // 处理完成按钮点击
  const handleViewResult = () => {
    if (!pageCompleted) return;
    
    // 从 localStorage 读取所有答案（30题）
    const allAnswers: Record<number, number> = {};
    try {
      const saved = localStorage.getItem("heartis_answers");
      if (saved) {
        Object.assign(allAnswers, JSON.parse(saved));
      }
    } catch {}

    // 确保所有30题都已作答
    const allAnswered = Array.from({ length: 30 }, (_, i) => i + 1).every(
      (id) => allAnswers[id] !== undefined
    );

    if (!allAnswered) {
      alert("Please answer all questions first.");
      return;
    }

    // 计算 OCEA 分数
    const { O, C, E, A } = scoreOCEA(allAnswers);
    const code = codeOCEA(O, C, E, A);
    
    // 映射到 heartis 类型
    const heartisType = getHeartisTypeFromCode(code);
    
    // ✅ 保存到独立的 key（供 Google Sheets 上传使用）
    try {
      // 将答案对象转换为数组（按题目 ID 顺序）
      const answersArray = Array.from({ length: 30 }, (_, i) => {
        const id = i + 1;
        return allAnswers[id] || 3; // 默认值为 3（中间值）
      });

      localStorage.setItem("heartis_result", heartisType); // 结果类型（字符串）
      localStorage.setItem("heartis_code", code); // H/L 代码
      localStorage.setItem("heartis_scores", JSON.stringify({ O, C, E, A })); // 分数对象
      localStorage.setItem("heartis_answers", JSON.stringify(answersArray)); // 答案数组
    } catch (e) {
      console.error("Failed to save result data", e);
    }

    // 保存完整结果（用于兼容其他功能）
    const payload = { O, C, E, A, code, answers: allAnswers, type: heartisType };
    try {
      localStorage.setItem("heartis_result_full", JSON.stringify(payload));
    } catch {}

    // ✅ 保存历史记录
    try {
      // 1. 读取历史记录
      const history = JSON.parse(localStorage.getItem("heartis_history") || "[]");

      // 2. 将答案对象转换为数组（按题目 ID 顺序）
      const answersArray = Array.from({ length: 30 }, (_, i) => {
        const id = i + 1;
        return allAnswers[id] || 3; // 默认值为 3（中间值）
      });

      // 3. 新纪录
      const newRecord = {
        date: new Date().toLocaleString(),
        result: heartisType,
        answers: answersArray,
      };

      // 4. 插入新纪录（最新的在最前），最多保存10次
      const updatedHistory = [newRecord, ...history].slice(0, 10);
      localStorage.setItem("heartis_history", JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Failed to save history", e);
    }

    // 跳转到结果页（使用查询参数）
    router.push(`/result?heartis=${heartisType}`);
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto py-16 px-6">
      {/* 顶部标题 */}
      <div className="w-full max-w-5xl mx-auto px-6 pt-10 pb-6 text-center select-none flex flex-col items-center justify-start">
        <h1 className="font-playfair text-[2rem] md:text-[2.3rem] text-[#f8781f] font-semibold leading-snug tracking-wide whitespace-nowrap">
          Every choice reflects a little piece of your heart.
        </h1>
        <p className="text-center text-lg md:text-xl text-[#368edf]/85 font-light max-w-3xl mx-auto leading-relaxed italic transition-colors duration-300 ease-in-out">
          No ‘right’ answers. Go with your first feeling.
        </p>

        {/* 进度条 */}
        <HeartisProgress
          answeredCount={answeredCount}
          totalQuestions={30}
          label="Q25–30 / 30 • Page 5/5"
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

            {/* 选项按钮（完全统一） */}
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

            {/* 下方说明 */}
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
          onClick={() => router.push("/quiz/page4")}
          className="px-8 py-3 rounded-2xl bg-white/60 text-[#5A463A] border border-[#f5b57f]/60 font-medium hover:shadow-[0_0_20px_6px_rgba(245,181,127,0.35)] hover:brightness-105 transition-all duration-300 ease-in-out"
        >
          ← Previous
        </button>

        <button
          onClick={handleViewResult}
          disabled={!pageCompleted}
          className="px-8 py-3 rounded-2xl bg-[#f8781f] text-white font-semibold hover:shadow-[0_0_20px_6px_rgba(248,120,31,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out disabled:opacity-40"
        >
          View My Result →
        </button>
      </div>
    </div>
  );
}


