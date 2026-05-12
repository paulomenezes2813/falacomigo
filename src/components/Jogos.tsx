import { useState } from "react";
import { CauseEffectGame } from "./games/CauseEffect";
import { MemoryGame } from "./games/Memory";
import { CategorizeGame } from "./games/Categorize";
import { MatchingGame } from "./games/Matching";
import { SequenceGame } from "./games/Sequence";

type GameKey =
  | "cause-effect"
  | "matching"
  | "memory"
  | "categorize"
  | "sequence";

const GAMES: Array<{
  key: GameKey;
  title: string;
  level: string;
  emoji: string;
  desc: string;
  bg: string;
}> = [
  {
    key: "cause-effect",
    title: "Toque e Fala",
    level: "Nível 3",
    emoji: "✨",
    desc: "Toque a figura e ouça a palavra. Reforço imediato.",
    bg: "bg-amber-100 hover:bg-amber-200",
  },
  {
    key: "matching",
    title: "Pareamento",
    level: "Nível 3",
    emoji: "🔗",
    desc: "Encontre a figura igual ao modelo.",
    bg: "bg-rose-100 hover:bg-rose-200",
  },
  {
    key: "memory",
    title: "Memória",
    level: "Nível 2",
    emoji: "🃏",
    desc: "Vire as cartas e encontre os pares.",
    bg: "bg-purple-100 hover:bg-purple-200",
  },
  {
    key: "categorize",
    title: "Categorias",
    level: "Nível 2",
    emoji: "🗂️",
    desc: "Coloque cada figura no grupo certo.",
    bg: "bg-emerald-100 hover:bg-emerald-200",
  },
  {
    key: "sequence",
    title: "Rotina",
    level: "Nível 2",
    emoji: "📅",
    desc: "Coloque os passos da rotina em ordem.",
    bg: "bg-sky-100 hover:bg-sky-200",
  },
];

export function Jogos() {
  const [active, setActive] = useState<GameKey | null>(null);
  const exit = () => setActive(null);

  if (active === "cause-effect") return <CauseEffectGame onExit={exit} />;
  if (active === "matching")     return <MatchingGame   onExit={exit} />;
  if (active === "memory")       return <MemoryGame     onExit={exit} />;
  if (active === "categorize")   return <CategorizeGame onExit={exit} />;
  if (active === "sequence")     return <SequenceGame   onExit={exit} />;

  return (
    <div className="h-full overflow-auto bg-slate-100">
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span aria-hidden>🎮</span> Jogos
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Atividades curtas para apoiar comunicação, atenção e categorização.
            Cada jogo indica o nível de suporte para o qual foi pensado.
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
