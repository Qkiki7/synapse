"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ORANGE = "#f8781f";
const BLUE = "#368edf";
const BROWN = "#402A20";

type HeartisKey =
  | "ignis"
  | "flare"
  | "volt"
  | "tide"
  | "drift"
  | "thorn"
  | "terra"
  | "gem"
  | "verdan"
  | "bloom"
  | "zephy"
  | "core"
  | "crystal"
  | "muse"
  | "machina"
  | "luma";

interface HeartisData {
  title: string;
  core: string;
  essence: string;
  paragraphs: string[];
  remember: string;
}

const heartisData: Record<HeartisKey, HeartisData> = {
  ignis: {
    title: "Heartis·Ignis",
    core: "Passionate · Bold · Driven by Momentum",
    essence: "Fire Heartis",
    paragraphs: [
      "You are the Fire Heartis, a spark that turns vision into motion.",
      "Your courage lights the path ahead, igniting hearts and pushing ideas into action.",
      "Wherever you go, the air hums with your will to begin.",
      "But flames that rise too high burn out just as fast.",
      "Your fire, once unchecked, can consume your focus or exhaust your warmth.",
    ],
    remember:
      "Before lighting others, remember to refuel yourself. Even the strongest blaze needs a quiet ember at its core.",
  },
  flare: {
    title: "Heartis·Flare",
    core: "Passionate · Confident · Radiant · Born to Lead",
    essence: "Solar Heartis",
    paragraphs: [
      "You are the Solar Heartis, a living star whose heart burns with light and warmth.",
      "Your energy ignites others, inspiring motion, courage, and creation. You lead naturally, shaping the world around you with your vision and drive.",
      "Yet even the brightest suns need to rest. Sometimes, your constant fire may leave you weary or make others struggle to keep pace.",
    ],
    remember:
      "Light also heals when turned inward. Let your own glow embrace you, rest is a form of warmth too.",
  },
  volt: {
    title: "Heartis·Volt",
    core: "Quick-minded · Agile · Sparking with Restless Ideas",
    essence: "Electric Heartis",
    paragraphs: [
      "You are the Electric Heartis, a current of intuition, flashing through thoughts faster than lightning.",
      "Your mind is alive with sparks of insight and movement, always connecting, shifting, creating in bursts of brilliance.",
      "But when the current runs too high, even light can burn out.",
    ],
    remember:
      "Leave a pause between the surges. In stillness, your brilliance finds rhythm again.",
  },
  tide: {
    title: "Heartis·Tide",
    core: "Gentle · Empathic · Enduring",
    essence: "Tide Heartis",
    paragraphs: [
      "You are the Tide Heartis, calm, embracing, endlessly flowing.",
      "You sense the feelings that ripple beneath words, and your quiet warmth becomes a refuge for others.",
      "Your empathy is your ocean, vast, patient, ever giving.",
      "Yet when you pour too much of yourself into others, the tides of care may carry you away from your own shore.",
    ],
    remember:
      "You are not just the current. You are the depth beneath it. Let your compassion flow, but let it return to you as well. Hold your boundaries as harbors, not walls. Only then can your calm bring peace, not exhaustion.",
  },
  drift: {
    title: "Heartis·Drift",
    core: "Sensitive · Imaginative · Gentle as Drifting Clouds",
    essence: "Cloud Heartis",
    paragraphs: [
      "You are the Cloud Heartis, a dreamer who moves through colors and feelings, painting the world in soft emotion.",
      "Your imagination flows freely, turning empathy into art, and transforming every fleeting mood into a quiet story.",
      "Yet, clouds can lose their shape when the wind grows strong.",
    ],
    remember:
      "Let your thoughts settle and take form. Only grounded dreams can fall as rain that nourishes the world.",
  },
  thorn: {
    title: "Heartis·Thorn",
    core: "Steady · Self-Contained · Quietly Loyal",
    essence: "Cactus Heartis",
    paragraphs: [
      "You are the Cactus Heartis, strong in silence, growing where few dare to stand.",
      "Your calm exterior shields a tender core; discipline and patience make you the silent protector of those you care for.",
      "Yet strength, when held too tightly, can harden into solitude. You rarely ask for warmth, though your heart quietly longs to be understood.",
    ],
    remember:
      "Let others glimpse your softness. Vulnerability is not weakness, it's the bridge that turns solitude into trust.",
  },
  terra: {
    title: "Heartis·Terra",
    core: "Steady · Reliable · Grounded",
    essence: "Stone Heartis",
    paragraphs: [
      "You are the Stone Heartis, calm, dependable, and quietly powerful. You carry the gravity of experience, standing firm when storms rise.",
      "Your strength lies in patience and persistence, in doing what must be done, even when no one sees.",
      "But sometimes, your steadfastness turns into walls. You hold so tightly to what's proven that you leave little room for the new to grow.",
    ],
    remember:
      "Don't fear the cracks. They are where light finds its way in. Even mountains shift, and that's how valleys are born. Let a little wind reshape you; your strength will not fade. It will shine.",
  },
  gem: {
    title: "Heartis·Gem",
    core: "Reliable · Disciplined · Polished with Purpose",
    essence: "Gem Heartis",
    paragraphs: [
      "You are the Gem Heartis, a being cut from precision and light.",
      "You thrive in clarity and structure, bringing trust and refinement to everything you touch. Your presence steadies others; your pursuit of excellence shines through quiet consistency.",
      "Yet even gems bear tiny fractures, not flaws, but proof of life within form.",
    ],
    remember:
      "Perfection can weigh heavy when it leaves no room to breathe. Allow yourself to shimmer through the cracks; that's where your truest brilliance lives.",
  },
  verdan: {
    title: "Heartis·Verdan",
    core: "Outgoing · Adaptive · Ever-growing",
    essence: "Vine Heartis",
    paragraphs: [
      "You are the Vine Heartis, the spirit of growth that never stands still.",
      "You stretch toward sunlight, weaving yourself through every opportunity and new connection.",
      "Yet sometimes, your reach grows faster than your roots, and the world's noise can tug you in too many directions at once.",
    ],
    remember:
      "Anchor yourself in purpose, and your expansion will gain depth. With each steady root, your branches will rise higher.",
  },
  bloom: {
    title: "Heartis·Bloom",
    core: "Gentle · Empathetic · Nurturing with Quiet Grace",
    essence: "Flower Heartis",
    paragraphs: [
      "You are the Flower Heartis, the soft bloom that brings warmth wherever it grows.",
      "You sense emotions like sunlight on petals, offering comfort through presence, kindness, and care. Your empathy turns connection into healing.",
      "Yet when you give endlessly, your own roots can run dry. The same tenderness that soothes others may drain your light if you forget yourself.",
    ],
    remember:
      "Remember, even the kindest garden needs boundaries. Nurture your own soil first, only then can your warmth truly blossom.",
  },
  zephy: {
    title: "Heartis·Zephy",
    core: "Free-spirited · Quick · Ever-adapting",
    essence: "Wind Heartis",
    paragraphs: [
      "You are the Wind Heartis, a breeze that moves through change with ease.",
      "You sense new directions before others do, shifting with curiosity, blending into every place like air finding its rhythm.",
      "But freedom, when boundless, can scatter your strength. Your many passions pull you forward, yet few hold you still long enough to bloom.",
    ],
    remember:
      "Find where the wind pauses, that's where inspiration becomes creation. When you choose a path to stay, your lightness turns into power.",
  },
  core: {
    title: "Heartis·Core",
    core: "Logical · Composed · Grounded in Precision",
    essence: "Metal Heartis",
    paragraphs: [
      "You are the Metal Heartis, the heartbeat of order, forged from clarity and control.",
      "Your mind runs like a flawless mechanism, steady and efficient, turning chaos into system and vision into structure.",
      "But even perfect systems need air. In your pursuit of mastery, warmth can slip away. Emotion becomes the one variable you hesitate to calculate.",
    ],
    remember:
      "Reason and warmth are not rivals. Let your structure breathe, and your strength will resonate deeper than steel.",
  },
  crystal: {
    title: "Heartis·Crystal",
    core: "Rational · Calm · Elegant in Precision",
    essence: "Ice Heartis",
    paragraphs: [
      "You are the Ice Heartis, a being of order and symmetry, shaped by clarity and composed thought.",
      "In your world, logic glimmers like sunlight refracted through frozen glass, every angle deliberate, every choice clean. You bring stability where others lose direction, the calm at the center of motion.",
      "Yet this brilliance can sometimes build walls. The same structure that protects you may also keep warmth at bay, leaving others unsure how to reach you.",
    ],
    remember:
      "Even ice carries memory of water. Let a little warmth flow through your surface. Connection will not blur your clarity, it will deepen it.",
  },
  muse: {
    title: "Heartis·Muse",
    core: "Playful · Creative · Full of Light",
    essence: "Bubble Heartis",
    paragraphs: [
      "You are the Bubble Heartis, a spark of joy that drifts through the air, turning ordinary moments into color and laughter.",
      "You create easily, dream freely, and your presence lifts those around you like sunlight caught on glass.",
      "But bubbles rise fast and fade quick. Inspiration without grounding can vanish before it blooms.",
    ],
    remember:
      "Let your joy take root. When light meets depth, even the briefest shimmer becomes eternal.",
  },
  machina: {
    title: "Heartis·Machina",
    core: "Diligent · Precise · Steady in Rhythm",
    essence: "Gear Heartis",
    paragraphs: [
      "You are the Gear Heartis, the quiet engine that keeps the world in motion.",
      "You find beauty in structure, comfort in clarity, and purpose in every completed task. Your discipline turns complexity into order, your focus into quiet progress.",
      "Yet in the hum of precision, warmth can fade. Efficiency may silence the pulse of feeling beneath the mechanism.",
    ],
    remember:
      "Pause now and then, let the machine hear its own heartbeat. Even gears need moments of stillness to move with grace again.",
  },
  luma: {
    title: "Heartis·Luma",
    core: "Sensitive · Introspective · Quietly Radiant",
    essence: "Mercury Heartis",
    paragraphs: [
      "You are the Mercury Heartis, a thinker who moves like water and reflects like light.",
      "Your mind is a quiet tide of imagination, flowing between depth and clarity. You see what others miss, the shimmer beneath stillness, the story inside silence.",
      "But when emotions swirl too deep, you can lose the line between feeling and overthinking. The same reflection that reveals truth may also trap you within it.",
    ],
    remember:
      "Let your dreams touch the surface of the world. When thought meets action, even still water shines.",
  },
};

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get("heartis") as HeartisKey) || "ignis";
  const data = heartisData[type];
  const [isHeartView, setIsHeartView] = useState(false);

  // 📊 查看历史记录（开发调试用）
  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("heartis_history") || "[]");
      console.log("🧠 Heartis 测试记录:", history);
    } catch (e) {
      console.error("Failed to read history", e);
    }
  }, []);

  // 🧾 结果页：把一次测试写入 Google Sheet
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 这些 key 要和你提交时保存的一致（见第2步）
    const resultType = localStorage.getItem("heartis_result");     // e.g. "volt"
    const code       = localStorage.getItem("heartis_code") || ""; // e.g. "HLHLL"
    const scores     = JSON.parse(localStorage.getItem("heartis_scores")  || "{}"); // {O:...,C:...}
    const answers    = JSON.parse(localStorage.getItem("heartis_answers") || "[]"); // [1..5] x 30

    if (!resultType) return; // 没结果就不发

    // ⚠️ Apps Script 跨域：用 no-cors & 不要设置 headers
    fetch("https://script.google.com/macros/s/AKfycbwdiFZ2AD-vVd7LbYzdtbWZ-4I3V0q-mCS3hzilK7OCC0wn1OJjlVtulSf6JQtKmkt3/exec", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        result: resultType,
        code,
        scores,
        answers,
      }),
    });

    // 可选：只上传一次，避免重复刷新重复写入
    localStorage.removeItem("heartis_result");
    localStorage.removeItem("heartis_code");
    localStorage.removeItem("heartis_scores");
    // 不删 answers 的话，后面 Restart 再统一清
  }, []);

  return (
    <main className="w-full h-screen overflow-hidden grid grid-cols-[55%_45%] bg-gradient-to-b from-[#f7e4cf] via-[#fbeede] to-[#fffaf6]">
      {/* 左侧视频/心脏视图 */}
      <section className="relative h-full w-full flex items-center justify-center">
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
          {isHeartView ? (
            <img
              src={`/result/${type}-heart.png`}
              alt="Heart View"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <video
              src={`/result/${type}.mp4`}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <button
            onClick={() => setIsHeartView(!isHeartView)}
            className="absolute top-6 right-6 bg-white/40 hover:bg-white/60 text-[#402A20] font-medium rounded-full px-4 py-2 backdrop-blur-md transition"
          >
            {isHeartView ? "Character View" : "Heart View"}
          </button>
        </div>
      </section>

      {/* 右半区文字 */}
      <section className="h-full w-full flex flex-col justify-center px-[8%] leading-relaxed">
        <h2
          className="font-serif font-bold mb-4"
          style={{ color: ORANGE, fontSize: "clamp(32px,3vw,46px)" }}
        >
          {data.title}
        </h2>

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
          {data.core}
        </p>

        {data.paragraphs.map((p, i) => (
          <p key={i} style={{ color: BROWN, marginBottom: "1rem" }}>
            {p}
          </p>
        ))}

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
          {data.remember}
        </p>

        <button
          onClick={() => router.push("/")}
          className="fixed bottom-8 right-8 px-8 py-3 font-semibold text-[#f8781f] uppercase tracking-wide border border-[#f8781f]/60 bg-white/10 backdrop-blur-md rounded-2xl shadow-sm hover:bg-[#f8781f]/10 hover:shadow-md hover:shadow-[#f8781f]/50 hover:scale-105 transition-all duration-300"
        >
          Restart
        </button>
      </section>
    </main>
  );
}
