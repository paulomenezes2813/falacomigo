import { useEffect, useMemo, useState } from "react";
import { useTTS } from "../../../hooks/useTTS";
import { GameHeader } from "../GameHeader";
import {
  pickCountable,
  randInt,
  shuffle,
  type Countable,
} from "./shared";

type Round = {
  count: number;
  item: Countable;
  options: number[];
};

function buildRound(): Round {
  const count = randInt(1, 6);
  const item = pickCountable();
  const distract = new Set<number>([count]);
  while (distract.size < 3) {
    distract.add(Math.max(1, count + (Math.random() < 0.5 ? -1 : 1) * randInt(1, 3)));
  }
  return { count, item, options: shuffle(Array.from(distract)) };
}

type Props = { onExit: () => void };

export function CountingGame({ onExit }: Props) {
  const { speak } = useTTS();
  const [round, setRound] = useState<Round>(() => buildRound());
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [justWon, setJustWon] = useState(false);

  // Pergunta no início de cada rodada — usa nome do objeto
  // singular se for 1, plural se >1: "Conte a maçã" / "Conte as maçãs"
  useEffect(() => {
    const t = setTimeout(() => {
      const { count, item } = round;
      const name = count === 1 ? item.singular : item.plural;
      const article =
        count === 1
          ? item.article === "as"
            ? "a"
            : "o"
          : item.article;
      speak(`Conte ${article} ${name}`);
    }, 250);
    return () => clearTimeout(t);
  }, [round, speak]);

  const onPick = (n: number) => {
    if (n === round.count) {
      speak("Muito bem!");
      setScore((x) => x + 1);
      setJustWon(true);
      setTimeout(() => {
        setJustWon(false);
        setRound(buildRound());
      }, 1100);
    } else {
      setWrong(n);
      setTimeout(() => setWrong(null), 500);
    }
  };

  const items = useMemo(() => Array.from({ length: round.count }), [round]);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <GameHeader
        title="Contar"
        emoji="🔢"
        level="Nível 3"
        onExit={onExit}
        onRestart={() => {
          setRound(buildRound());
          setScore(0);
        }}
      />

      <div className="flex-1 overflow-auto p-4 sm:p-6 max-w-3xl mx-auto w-full">
        <div className="text-center text-sm font-semibold text-slate-600 mb-3">
          ✅ Acertos: {score}
        </div>

        <div className="text-center text-base sm:text-lg text-slate-700 mb-2">
          Conte{" "}
          <span className="font-bold">
            {round.count === 1
              ? `${round.item.article === "as" ? "a" : "o"} ${round.item.singular}`
              : `${round.item.article} ${round.item.plural}`}
          </span>
        </div>

        {/* Objetos a contar */}
        <div
          className={`bg-white rounded-3xl border-4 p-6 shadow-md flex flex-wrap items-center justify-center gap-3 min-h-[160px] mb-6 transition
                      ${justWon ? "border-green-400 ring-4 ring-green-200" : "border-amber-300"}`}
        >
          {items.map((_, i) => (
            <span
              key={i}
              className="text-5xl sm:text-6xl"
              style={{ animation: justWon ? `bounce 0.6s ${i * 80}ms` : undefined }}
              aria-hidden
            >
              {round.item.emoji}
            </span>
          ))}
        </div>

        <div className="text-center text-base text-slate-600 mb-3">Quantos?</div>

        <div className="grid grid-cols-3 gap-3">
          {round.options.map((n) => {
            const isWrong = wrong === n;
            return (
              <button
                key={n}
                onClick={() => onPick(n)}
                className={`aspect-square rounded-3xl border-2 bg-white shadow-md
                            flex items-center justify-center text-5xl sm:text-6xl font-extrabold
                            transition active:scale-95
                            ${isWrong
                              ? "border-red-400 ring-4 ring-red-200 animate-shake text-red-500"
                              : "border-slate-200 hover:border-blue-400 text-blue-700"}`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
