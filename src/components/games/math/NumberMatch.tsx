import { useEffect, useState } from "react";
import { useTTS } from "../../../hooks/useTTS";
import { GameHeader } from "../GameHeader";
import { NUMBER_WORDS_PT, pickCountable, randInt, shuffle } from "./shared";

type Round = {
  target: number;
  options: { count: number; emoji: string }[]; // 3
};

function buildRound(): Round {
  const target = randInt(1, 6);
  const counts = new Set<number>([target]);
  while (counts.size < 3) {
    counts.add(Math.max(1, target + (Math.random() < 0.5 ? -1 : 1) * randInt(1, 3)));
  }
  const options = shuffle(
    Array.from(counts).map((c) => ({ count: c, emoji: pickCountable().emoji }))
  );
  return { target, options };
}

type Props = { onExit: () => void };

export function NumberMatchGame({ onExit }: Props) {
  const { speak } = useTTS();
  const [round, setRound] = useState<Round>(() => buildRound());
  const [score, setScore] = useState(0);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [winIdx, setWinIdx] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const num = NUMBER_WORDS_PT[round.target] ?? String(round.target);
      speak(`Ache os itens com a quantidade ${num}`);
    }, 250);
    return () => clearTimeout(t);
  }, [round, speak]);

  const onPick = (idx: number, count: number) => {
    if (count === round.target) {
      speak("Muito bem!");
      setWinIdx(idx);
      setScore((x) => x + 1);
      setTimeout(() => {
        setWinIdx(null);
        setRound(buildRound());
      }, 900);
    } else {
      setWrongIdx(idx);
      setTimeout(() => setWrongIdx(null), 500);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      <GameHeader
        title="Número e Quantidade"
        emoji="🔗"
        level="Nível 2"
        onExit={onExit}
        onRestart={() => {
          setRound(buildRound());
          setScore(0);
        }}
      />
      <div className="flex-1 overflow-auto p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-3 text-sm font-semibold text-slate-600">
          ✅ Acertos: {score}
        </div>

        {/* Número alvo */}
        <div className="mx-auto bg-white rounded-3xl border-4 border-purple-300 shadow-lg
                        flex items-center justify-center w-40 h-40 mb-6">
          <span className="text-8xl font-extrabold text-purple-700">
            {round.target}
          </span>
        </div>

        <div className="text-center text-base text-slate-600 mb-3">
          Toque nos itens com a quantidade <strong>{round.target}</strong>:
        </div>

        <div className="grid grid-cols-3 gap-3">
          {round.options.map((g, i) => {
            const isWrong = wrongIdx === i;
            const isWin = winIdx === i;
            return (
              <button
                key={i}
                onClick={() => onPick(i, g.count)}
                className={`bg-white rounded-2xl border-2 p-3 min-h-[140px]
                            flex flex-wrap items-center justify-center gap-1 shadow-md transition
                            ${isWin
                              ? "border-green-400 ring-4 ring-green-200"
                              : isWrong
                              ? "border-red-400 ring-4 ring-red-200 animate-shake"
                              : "border-slate-200 hover:border-blue-400 active:scale-95"}`}
              >
                {Array.from({ length: g.count }).map((_, j) => (
                  <span key={j} className="text-3xl sm:text-4xl" aria-hidden>
                    {g.emoji}
                  </span>
                ))}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
