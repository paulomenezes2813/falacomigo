import { useMemo, useState } from "react";
import { useTTS } from "../../hooks/useTTS";
import { pickRandom } from "./shared";
import { GameHeader } from "./GameHeader";
import type { Symbol as SymType } from "../../types";

type Props = { onExit: () => void };

export function CauseEffectGame({ onExit }: Props) {
  const { speak } = useTTS();
  const [round, setRound] = useState(0);
  const items = useMemo(() => pickRandom(9), [round]);
  const [tappedId, setTappedId] = useState<string | null>(null);

  const onTap = (s: SymType) => {
    setTappedId(s.id);
    speak(s.label);
    setTimeout(() => setTappedId(null), 700);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <GameHeader
        title="Toque e Fala"
        emoji="✨"
        level="Nível 3"
        onExit={onExit}
        onRestart={() => setRound((r) => r + 1)}
      />
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {items.map((s) => {
            const tapped = tappedId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onTap(s)}
                className={`bg-white rounded-2xl shadow-md border-2 border-slate-200 p-3 sm:p-4
                            flex flex-col items-center justify-center min-h-[140px]
                            transition-transform duration-200
                            ${tapped
                              ? "scale-110 ring-4 ring-amber-400 shadow-xl"
                              : "hover:scale-105 active:scale-95"}`}
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt=""
                    aria-hidden
                    className="h-20 sm:h-24 w-auto object-contain pointer-events-none"
                    draggable={false}
                  />
                ) : (
                  <span className="text-5xl sm:text-6xl" aria-hidden>{s.emoji}</span>
                )}
                <span className="mt-2 font-bold text-base sm:text-lg text-slate-800 text-center leading-tight">
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
