"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getHeartisTypeFromCode } from "@/app/result/utils";

const STORAGE_KEY = "heartis_answers";

/** ---------- 题库（30题） ---------- */
type Q = { id: number; text: string; reverse?: boolean };

const QUESTIONS: Q[] = [
  { id: 1, text: "Tends to be quiet.", reverse: true },
  { id: 2, text: "Is compassionate, has a soft heart." },
  { id: 3, text: "Tends to be disorganized.", reverse: true },
  { id: 4, text: "Worries a lot." },
  { id: 5, text: "Is fascinated by art, music, or literature." },
  { id: 6, text: "Is dominant, acts as a leader." },
  { id: 7, text: "Is sometimes rude to others.", reverse: true },
  { id: 8, text: "Has difficulty getting started on tasks.", reverse: true },
  { id: 9, text: "Tends to feel depressed, blue." },
  { id: 10, text: "Has little interest in abstract ideas.", reverse: true },
  { id: 11, text: "Is full of energy." },
  { id: 12, text: "Assume the best about people." },
  { id: 13, text: "Is reliable, can always be counted on." },
  { id: 14, text: "Is emotionally stable, not easily upset.", reverse: true },
  { id: 15, text: "Is original, comes up with new ideas." },
  { id: 16, text: "Is outgoing, sociable." },
  { id: 17, text: "Can be cold and uncaring.", reverse: true },
  { id: 18, text: "Keeps things neat and tidy." },
  { id: 19, text: "Is relaxed, handles stress well.", reverse: true },
  { id: 20, text: "Has few artistic interests.", reverse: true },
  { id: 21, text: "Prefers to have others take charge.", reverse: true },
  { id: 22, text: "Is respectful, treats others with respect." },
  { id: 23, text: "Is persistent, works until the task is finished." },
  { id: 24, text: "Feels secure, comfortable with self.", reverse: true },
  { id: 25, text: "Is complex, a deep thinker." },
  { id: 26, text: "Is less active than other people.", reverse: true },
  { id: 27, text: "Tends to find fault with others.", reverse: true },
  { id: 28, text: "Can be somewhat careless.", reverse: true },
  { id: 29, text: "Is temperamental, gets emotional easily." },
  { id: 30, text: "Has little creativity.", reverse: true },
];

/** ---------- Likert 文案 ---------- */
const LIKERT = [
  { v: 1, label: "Strongly Disagree" },
  { v: 2, label: "Disagree a little" },
  { v: 3, label: "Neutral" },
  { v: 4, label: "Agree a little" },
  { v: 5, label: "Strongly Agree" },
];

/** ---------- Heartis-OCEA 的计分工具 ---------- */
type Answers = Record<number, number>;
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
function avg(ids: readonly number[], ans: Answers) {
  const arr = ids.map((id) => rev(id, ans[id]!));
  const sum = arr.reduce((a, b) => a + b, 0);
  return +((sum / arr.length).toFixed(2));
}
function scoreOCEA(ans: Answers) {
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
  return `${toHL(O)}${toHL(C)}${toHL(E)}${toHL(A)}`;
}

const PER_PAGE = 6;
const TOTAL_PAGES = Math.ceil(QUESTIONS.length / PER_PAGE);

export default function QuizPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setAnswers(JSON.parse(saved));
    } catch {}
  }, []);

  const totalQuestions = 30;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.min(100, (answeredCount / totalQuestions) * 100);

  const start = page * PER_PAGE;
  const end = Math.min(start + PER_PAGE, QUESTIONS.length);
  const slice = useMemo(() => QUESTIONS.slice(start, end), [page]);

  const pageCompleted = slice.every((q) => answers[q.id] !== undefined);

  const select = (id: number, v: number) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: v };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const handleViewResult = () => {
    if (!pageCompleted) return;
    
    const allAnswered = Array.from({ length: 30 }, (_, i) => i + 1).every(
      (id) => answers[id] !== undefined
    );

    if (!allAnswered) {
      alert("Please answer all questions first.");
      return;
    }

    const { O, C, E, A } = scoreOCEA(answers);
    const code = codeOCEA(O, C, E, A);
    const heartisType = getHeartisTypeFromCode(code);
    
    try {
      const answersArray = Array.from({ length: 30 }, (_, i) => {
        const id = i + 1;
        return answers[id] || 3;
      });

      localStorage.setItem("heartis_result", heartisType);
      localStorage.setItem("heartis_code", code);
      localStorage.setItem("heartis_scores", JSON.stringify({ O, C, E, A }));
      localStorage.setItem("heartis_answers", JSON.stringify(answersArray));
    } catch (e) {
      console.error("Failed to save result data", e);
    }

    const payload = { O, C, E, A, code, answers, type: heartisType };
    try {
      localStorage.setItem("heartis_result_full", JSON.stringify(payload));
    } catch {}

    try {
      const history = JSON.parse(localStorage.getItem("heartis_history") || "[]");
      const answersArray = Array.from({ length: 30 }, (_, i) => {
        const id = i + 1;
        return answers[id] || 3;
      });

      const newRecord = {
        date: new Date().toLocaleString(),
        result: heartisType,
        answers: answersArray,
      };

      const updatedHistory = [newRecord, ...history].slice(0, 10);
      localStorage.setItem("heartis_history", JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Failed to save history", e);
    }

    router.push(`/result?heartis=${heartisType}`);
  };

  const goNext = () => {
    if (!pageCompleted) return;
    if (page + 1 < TOTAL_PAGES) {
      setPage((p) => p + 1);
    } else {
      handleViewResult();
    }
  };

  const goPrev = () => {
    if (page > 0) setPage((p) => p - 1);
  };

  const getPageLabel = () => {
    const startQ = page * PER_PAGE + 1;
    const endQ = Math.min((page + 1) * PER_PAGE, 30);
    return `Q${startQ}–${endQ} / 30 • Page ${page + 1}/${TOTAL_PAGES}`;
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-neutral-900 font-serif">
      <div className="relative max-w-4xl mx-auto py-16 px-6">
        <div className="w-full max-w-5xl mx-auto px-6 pt-10 pb-6 text-center select-none flex flex-col items-center justify-start">
          <h1 className="font-playfair text-[2rem] md:text-[2.3rem] text-[#f8781f] font-semibold leading-snug tracking-wide whitespace-nowrap">
            Every choice reflects a little piece of your heart.
          </h1>
          <p className="text-center text-lg md:text-xl text-[#368edf]/85 font-light max-w-3xl mx-auto leading-relaxed italic transition-colors duration-300 ease-in-out">
            No 'right' answers. Go with your first feeling.
          </p>

          <div className="w-4/5 md:w-3/5 mx-auto mt-8 relative">
            <div className="h-3 bg-[#f3e3d3]/70 rounded-full overflow-hidden shadow-inner relative">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  transition: mounted ? "width 0.7s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
                  width: `${progressPercent}%`,
                  background: "linear-gradient(90deg, #fcd9a1 0%, #f8b27a 60%, #f38a3a 100%)",
                  boxShadow: "0 0 12px 3px rgba(248,120,31,0.35)",
                }}
              />
            </div>
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

          <p className="mt-3 text-[#f5b57f] font-futura text-sm tracking-widest">
            {getPageLabel()}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {slice.map((q) => (
            <div
              key={q.id}
              className="rounded-2xl p-6 md:p-7 bg-white/60 backdrop-blur-md ring-1 ring-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-4 md:mb-5 flex items-start gap-3">
                <span className="inline-grid h-9 w-9 place-items-center rounded-full text-sm font-semibold bg-[#f7c59f] text-[#402A20]">
                  {q.id}
                </span>
                <p
                  className="text-[15px] md:text-[16px] leading-[1.65] text-neutral-900"
                  style={{ textShadow: "0 1px 1px rgba(0,0,0,0.15)" }}
                >
                  <span className="text-neutral-700">I am someone who</span>{" "}
                  <em className="not-italic font-medium text-[#5A463A]">{q.text}</em>
                </p>
              </div>

              <div role="radiogroup" aria-label={`Question ${q.id}`} className="grid grid-cols-5 gap-2.5 md:gap-3">
                {LIKERT.map(({ v, label }) => {
                  const active = answers[q.id] === v;
                  return (
                    <button
                      key={v}
                      role="radio"
                      aria-checked={active}
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

              <div className="mt-3 text-[11px] text-neutral-600/80 flex items-center justify-between px-1">
                <span>Disagree</span>
                <span>Neutral</span>
                <span>Agree</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between">
          {page > 0 && (
            <button
              onClick={goPrev}
              className="px-8 py-3 rounded-2xl bg-white/60 text-[#5A463A] border border-[#f5b57f]/60 font-medium hover:shadow-[0_0_20px_6px_rgba(245,181,127,0.35)] hover:brightness-105 transition-all duration-300 ease-in-out"
            >
              ← Previous
            </button>
          )}
          
          <button
            onClick={goNext}
            disabled={!pageCompleted}
            className={`px-8 py-3 rounded-2xl bg-[#f8781f] text-white font-semibold hover:shadow-[0_0_20px_6px_rgba(248,120,31,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out disabled:opacity-40 ${page === 0 ? 'mx-auto' : 'ml-auto'}`}
          >
            {page + 1 === TOTAL_PAGES ? 'View My Result →' : 'Next →'}
          </button>
        </div>
      </div>
    </main>
  );
}
  