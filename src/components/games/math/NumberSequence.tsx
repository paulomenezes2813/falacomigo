import { useEffect, useMemo, useState } from "react";
import { useTTS } from "../../../hooks/useTTS";
import { GameHeader } from "../GameHeader";
import { shuffle, speakNumber } from "./shared";

type Props = { onExit: () => void };

const SEQUENCES: number[][] = [
  [1, 2, 3, 4, 5],
  [2, 4, 6, 8, 10],   // pares
  [1, 3, 5, 7, 9],    // ímpares
  [5, 4, 3, 2, 1],    // decrescente
  [3, 4, 5, 6, 7],
];

export function NumberSequenceGame({ onExit }: Props) {
  const { speak } = useTTS();
  const [round, setRound] = useState(0);

  const sequence = useMemo(() => SEQUENCES[round % SEQUENCES.length], [round]);
  const shuffled = useMemo(() => shuffle(sequence), [sequence]);

  const [tappedIdx, setTappedIdx] = useState<number[]>([]);
  const [shake, setShake] = useState<number | null>(null);

  useEffect(() => {
    setTappedIdx([]);
    setShake(null);
    const t = setTimeout(
      () => speak("Toque os números na ordem correta"),
      250
    );
    return () => clearTimeout(t);
  }, [sequence, speak]);

  const onTap = (n: number) => {
    if (tappedIdx.length >= sequence.length) return;
    const expected = sequence[tappedIdx.length];
    if (n === expected) {
      speakNumber(speak, n);
      setTappedIdx((cur) => [...cur, sequence.indexOf(n)]);
    } else {
      setShake(n);
      setTimeout(() => setShake(null), 500);
    }
  };

  const won = tappedIdx.length === sequence.length;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <GameHeader
        title="Sequência"
        emoji="🔟"
        level="Nível 2"
        onExit={onExit}
        onRestart={() => setRound((r) => r + 1)}
      />
      {won && (
        <div className="bg-green-100 text-green-900 font-bold text-center py-3 border-b border-green-200">
          🎉 Sequência completa!{" "}
          <button
            className="ml-2 underline"
            onClick={() => setRound((r) => r + 1)}
          >
            Próxima
          </button>
        </div>
      )}
      <div className="flex-1 overflow-auto p-4 sm:p-6 max-w-3xl mx-auto w-full">
        <div className="text-center mb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Toque os números na ordem
          </div>
          <h3 className="text-xl font-bold text-slate-800 mt-1">
            {sequence.join(" → ")}
          </h3>
        </div>

        {/* Slots ocupados na ordem */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {sequence.map((n, i) => {
            const filled = tappedIdx[i] !== undefined;
            return (
              <div
                key={`slot-${i}`}
                className={`aspect-square rounded-2xl border-2 border-dashed flex items-center justify-center
                            ${filled ? "bg-white border-emerald-400" : "bg-white/60 border-slate-300"}`}
              >
                {filled ? (
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700">
                    {n}
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-400">
                    Passo {i + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Cartões embaralhados */}
        <div className="grid grid-cols-5 gap-3">
          {shuffled.map((n) => {
            const used = tappedIdx.some((idx) => sequence[idx] === n);
            const isShake = shake === n;
            return (
              <button
                key={n}
                onClick={() => onTap(n)}
                disabled={used}
                className={`aspect-square rounded-2xl border-2 bg-white shadow-md
                            flex items-center justify-center text-3xl sm:text-4xl font-extrabold transition
                            ${used
                              ? "opacity-30 cursor-not-allowed text-slate-400"
                              : "border-slate-200 text-blue-700 hover:border-blue-400 active:scale-95"}
                            ${isShake ? "border-red-400 ring-4 ring-red-200 animate-shake" : ""}`}
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
