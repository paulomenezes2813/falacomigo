import { useEffect, useState } from "react";
import { useTTS } from "../../../hooks/useTTS";
import { GameHeader } from "../GameHeader";
import { pickCountable, randInt } from "./shared";

type Mode = "mais" | "menos";

type Round = {
  left: { count: number; emoji: string };
  right: { count: number; emoji: string };
  mode: Mode;
};

function buildRound(): Round {
  let a = randInt(1, 7);
  let b = randInt(1, 7);
  while (a === b) b = randInt(1, 7);
  return {
    left: { count: a, emoji: pickCountable().emoji },
    right: { count: b, emoji: pickCountable().emoji },
    mode: Math.random() < 0.5 ? "mais" : "menos",
  };
}

type Props = { onExit: () => void };

export function CompareGame({ onExit }: Props) {
  const { speak } = useTTS();
  const [round, setRound] = useState<Round>(() => buildRound());
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<"L" | "R" | null>(null);
  const [highlight, setHighlight] = useState<"L" | "R" | null>(null);

  useEffect(() => {
    const t = setTimeout(
      () => speak(round.mode === "mais" ? "Onde tem mais?" : "Onde tem menos?"),
      250
    );
    return () => clearTimeout(t);
  }, [round, speak]);

  const correctSide: "L" | "R" =
    round.mode === "mais"
      ? round.left.count > round.right.count
        ? "L"
        : "R"
      : round.left.count < round.right.count
      ? "L"
      : "R";

  const onPick = (side: "L" | "R") => {
    if (side === correctSide) {
      speak("Muito bem!");
      setHighlight(side);
      setScore((x) => x + 1);
      setTimeout(() => {
        setHighlight(null);
        setRound(buildRound());
      }, 900);
    } else {
      setWrong(side);
      setTimeout(() => setWrong(null), 500);
    }
  };

  const renderGroup = (
    side: "L" | "R",
    g: { count: number; emoji: string }
  ) => {
    const isWrong = wrong === side;
    const isHi = highlight === side;
    return (
      <button
        onClick={() => onPick(side)}
        className={`flex-1 bg-white rounded-3xl border-4 p-4 sm:p-6 shadow-md min-h-[200px]
                    flex flex-wrap items-center justify-center gap-2 transition
                    ${isHi
                      ? "border-green-400 ring-4 ring-green-200"
                      : isWrong
                      ? "border-red-400 ring-4 ring-red-200 animate-shake"
                      : "border-slate-200 hover:border-blue-400 active:scale-95"}`}
      >
        {Array.from({ length: g.count }).map((_, i) => (
          <span key={i} className="text-4xl sm:text-5xl" aria-hidden>
            {g.emoji}
          </span>
        ))}
      </button>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      <GameHeader
        title="Mais ou Menos"
        emoji="⚖️"
        level="Nível 3"
        onExit={onExit}
        onRestart={() => {
          setRound(buildRound());
          setScore(0);
        }}
      />
      <div className="flex-1 overflow-auto p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-4">
          <div className="text-sm font-semibold text-slate-600">
            ✅ Acertos: {score}
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-800">
            Onde tem{" "}
            <span className={round.mode === "mais" ? "text-green-700" : "text-rose-700"}>
              {round.mode.toUpperCase()}
            </span>
            ?
          </div>
        </div>

        <div className="flex gap-4">
          {renderGroup("L", round.left)}
          <div className="self-center text-4xl text-slate-400 font-bold" aria-hidden>vs</div>
          {renderGroup("R", round.right)}
        </div>
      </div>
    </div>
  );
}
