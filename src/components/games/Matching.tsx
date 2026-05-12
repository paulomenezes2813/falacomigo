import { useEffect, useState } from "react";
import { useTTS } from "../../hooks/useTTS";
import { GameHeader } from "./GameHeader";
import { pickRandom, shuffle } from "./shared";
import type { Symbol as SymType } from "../../types";

type Round = {
  target: SymType;
  options: SymType[]; // 3 itens, 1 = target
};

type Props = { onExit: () => void };

function buildRound(): Round {
  const picks = pickRandom(3);
  const target = picks[0];
  const options = shuffle(picks);
  return { target, options };
}

export function MatchingGame({ onExit }: Props) {
  const { speak } = useTTS();
  const [round, setRound] = useState<Round>(() => buildRound());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [justWon, setJustWon] = useState(false);

  // fala o alvo ao iniciar cada rodada
  useEffect(() => {
    const t = setTimeout(() => speak(`Qual é igual a ${round.target.label}?`), 250);
    return () => clearTimeout(t);
  }, [round, speak]);

  const onPick = (s: SymType) => {
    if (s.id === round.target.id) {
      speak("Muito bem!");
      setScore((x) => x + 1);
      setStreak((x) => x + 1);
      setJustWon(true);
      setTimeout(() => {
        setJustWon(false);
        setRound(buildRound());
      }, 700);
    } else {
      setWrongId(s.id);
      setStreak(0);
      setTimeout(() => setWrongId(null), 500);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      <GameHeader
        title="Pareamento"
        emoji="🔗"
        level="Nível 3"
        onExit={onExit}
        onRestart={() => {
          setRound(buildRound());
          setScore(0);
          setStreak(0);
        }}
      />

      <div className="flex-1 overflow-auto p-4 sm:p-6 flex flex-col items-center">
        <div className="mb-3 flex gap-3 text-sm font-semibold text-slate-600">
          <span>✅ Acertos: {score}</span>
          <span>🔥 Sequência: {streak}</span>
        </div>

        {/* Modelo (alvo) */}
        <div
          className={`bg-white rounded-3xl border-4 ${
            justWon ? "border-green-400 ring-4 ring-green-200" : "border-rose-300"
          } shadow-lg p-6 flex flex-col items-center min-w-[200px]`}
        >
          <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
            Encontre igual a:
          </div>
          {round.target.image ? (
            <img
              src={round.target.image}
              alt=""
              aria-hidden
              className="h-28 sm:h-36 w-auto object-contain"
              draggable={false}
            />
          ) : (
            <span className="text-7xl" aria-hidden>{round.target.emoji}</span>
          )}
          <div className="mt-2 text-xl font-bold text-slate-800">
            {round.target.label}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-4 w-full max-w-2xl">
          {round.options.map((s) => {
            const wrong = wrongId === s.id;
            return (
              <button
                key={s.id + "-opt"}
                onClick={() => onPick(s)}
                className={`bg-white rounded-2xl border-2 p-4 flex flex-col items-center
                            shadow-md transition min-h-[140px]
                            hover:scale-105 active:scale-95
                            ${wrong
                              ? "border-red-400 ring-4 ring-red-200 animate-shake"
                              : "border-slate-200"}`}
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt=""
                    aria-hidden
                    className="h-20 w-auto object-contain"
                    draggable={false}
                  />
                ) : (
                  <span className="text-5xl" aria-hidden>{s.emoji}</span>
                )}
                <span className="mt-2 font-semibold text-sm text-slate-700 text-center leading-tight">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
