import { useEffect, useMemo, useState } from "react";
import { useTTS } from "../../hooks/useTTS";
import { GameHeader } from "./GameHeader";
import { pickRandom, shuffle } from "./shared";
import type { Symbol as SymType } from "../../types";

type Card = {
  uid: string;
  symbol: SymType;
  flipped: boolean;
  matched: boolean;
};

type Props = { onExit: () => void };

const PAIRS = 6;

export function MemoryGame({ onExit }: Props) {
  const { speak } = useTTS();
  const [round, setRound] = useState(0);

  const initialCards = useMemo<Card[]>(() => {
    const picks = pickRandom(PAIRS);
    const doubled = [...picks, ...picks];
    return shuffle(doubled).map((s, i) => ({
      uid: `${i}-${s.id}`,
      symbol: s,
      flipped: false,
      matched: false,
    }));
  }, [round]);

  const [cards, setCards] = useState<Card[]>(initialCards);
  const [busy, setBusy] = useState(false);

  // sync new round
  useEffect(() => {
    setCards(initialCards);
    setBusy(false);
  }, [initialCards]);

  const onCardTap = (c: Card) => {
    if (busy || c.flipped || c.matched) return;
    const flippedNotMatched = cards.filter((x) => x.flipped && !x.matched);
    if (flippedNotMatched.length >= 2) return;

    const next = cards.map((x) =>
      x.uid === c.uid ? { ...x, flipped: true } : x
    );
    setCards(next);
    speak(c.symbol.label);

    const nowFlipped = next.filter((x) => x.flipped && !x.matched);
    if (nowFlipped.length === 2) {
      const [a, b] = nowFlipped;
      if (a.symbol.id === b.symbol.id) {
        // match
        setBusy(true);
        setTimeout(() => {
          setCards((cs) =>
            cs.map((x) =>
              x.flipped && !x.matched ? { ...x, matched: true } : x
            )
          );
          setBusy(false);
        }, 600);
      } else {
        // mismatch
        setBusy(true);
        setTimeout(() => {
          setCards((cs) =>
            cs.map((x) => (x.matched ? x : { ...x, flipped: false }))
          );
          setBusy(false);
        }, 1100);
      }
    }
  };

  const won = cards.length > 0 && cards.every((c) => c.matched);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 via-fuchsia-50 to-blue-50">
      <GameHeader
        title="Memória"
        emoji="🃏"
        level="Nível 2"
        onExit={onExit}
        onRestart={() => setRound((r) => r + 1)}
      />
      {won && (
        <div className="bg-green-100 text-green-900 font-bold text-center py-3 border-b border-green-200">
          🎉 Você encontrou todos os pares!
        </div>
      )}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="grid grid-cols-4 gap-3 max-w-3xl mx-auto">
          {cards.map((c) => (
            <button
              key={c.uid}
              onClick={() => onCardTap(c)}
              disabled={c.matched}
              className={`aspect-square rounded-2xl border-2 flex items-center justify-center
                          transition-all duration-300 shadow-md
                          ${c.matched
                            ? "bg-green-100 border-green-400 opacity-80"
                            : c.flipped
                            ? "bg-white border-blue-400"
                            : "bg-blue-700 border-blue-900 hover:bg-blue-600 active:scale-95"}`}
            >
              {c.flipped || c.matched ? (
                c.symbol.image ? (
                  <img
                    src={c.symbol.image}
                    alt=""
                    aria-hidden
                    className="max-h-[70%] w-auto object-contain pointer-events-none"
                    draggable={false}
                  />
                ) : (
                  <span className="text-4xl" aria-hidden>{c.symbol.emoji}</span>
                )
              ) : (
                <span className="text-white text-4xl font-bold" aria-hidden>?</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
