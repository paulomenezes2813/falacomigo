import { useState } from "react";
import { CountingGame } from "./games/math/Counting";
import { CompareGame } from "./games/math/Compare";
import { NumberMatchGame } from "./games/math/NumberMatch";
import { NumberSequenceGame } from "./games/math/NumberSequence";
import { ShapesGame } from "./games/math/Shapes";

type GameKey =
  | "counting"
  | "compare"
  | "number-match"
  | "number-sequence"
  | "shapes";

const GAMES: Array<{
  key: GameKey;
  title: string;
  level: string;
  emoji: string;
  desc: string;
  bg: string;
}> = [
  {
    key: "counting",
    title: "Contar",
    level: "Nível 3",
    emoji: "🔢",
    desc: "Conte os objetos e toque o número certo.",
    bg: "bg-amber-100 hover:bg-amber-200",
  },
  {
    key: "compare",
    title: "Mais ou Menos",
    level: "Nível 3",
    emoji: "⚖️",
    desc: "Qual grupo tem mais? Qual tem menos?",
    bg: "bg-rose-100 hover:bg-rose-200",
  },
  {
    key: "number-match",
    title: "Número e Quantidade",
    level: "Nível 2",
    emoji: "🔗",
    desc: "Ache o grupo que combina com o número.",
    bg: "bg-purple-100 hover:bg-purple-200",
  },
  {
    key: "number-sequence",
    title: "Sequência",
    level: "Nível 2",
    emoji: "🔟",
    desc: "Toque os números na ordem certa.",
    bg: "bg-emerald-100 hover:bg-emerald-200",
  },
  {
    key: "shapes",
    title: "Formas",
    level: "Nível 3",
    emoji: "🔺",
    desc: "Ache a forma igual ao modelo.",
    bg: "bg-sky-100 hover:bg-sky-200",
  },
];

export function JogosMatematica() {
  const [active, setActive] = useState<GameKey | null>(null);
  const exit = () => setActive(null);

  if (active === "counting")        return <CountingGame       onExit={exit} />;
  if (active === "compare")         return <CompareGame        onExit={exit} />;
  if (active === "number-match")    return <NumberMatchGame    onExit={exit} />;
  if (active === "number-sequence") return <NumberSequenceGame onExit={exit} />;
  if (active === "shapes")          return <ShapesGame         onExit={exit} />;

  return (
    <div className="h-full overflow-auto bg-slate-100">
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span aria-hidden>🧮</span> Jogos 2 — Matemática
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Habilidades pré-numéricas e numéricas iniciais: contagem, comparação,
            cardinalidade, sequência e formas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GAMES.map((g) => (
            <button
              key={g.key}
              onClick={() => setActive(g.key)}
              className={`text-left rounded-2xl border border-slate-200 p-5 shadow-sm
                          transition ${g.bg}
                          focus:outline-none focus:ring-4 focus:ring-blue-300`}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl" aria-hidden>{g.emoji}</span>
                <span className="text-[10px] font-bold uppercase tracking-wide bg-white/70 text-slate-700 px-2 py-1 rounded-full">
                  {g.level}
                </span>
              </div>
              <div className="mt-3 text-lg font-bold text-slate-800">{g.title}</div>
              <div className="text-sm text-slate-600 mt-1">{g.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
