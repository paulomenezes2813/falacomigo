import { useEffect, useMemo, useState } from "react";
import { useTTS } from "../../hooks/useTTS";
import { GameHeader } from "./GameHeader";
import { shuffle } from "./shared";
import { comunicacao3Board } from "../../data/boardComunicacao3";
import type { Symbol as SymType } from "../../types";

type Item = {
  sym: SymType;
  groupNumber: number;
  placedIn: number | null;
  shaking: boolean;
};

type Props = { onExit: () => void };

const ITEMS_PER_GROUP = 3;

export function CategorizeGame({ onExit }: Props) {
  const { speak } = useTTS();
  const [round, setRound] = useState(0);

  const session = useMemo(() => {
    const groups = shuffle(comunicacao3Board.groups).slice(0, 2);
    const items: Item[] = shuffle(
      groups.flatMap((g) =>
        shuffle(g.symbols)
          .slice(0, ITEMS_PER_GROUP)
          .map((sym) => ({
            sym,
            groupNumber: g.number,
            placedIn: null as number | null,
            shaking: false,
          }))
      )
    );
    return { groups, items };
  }, [round]);

  const [items, setItems] = useState<Item[]>(session.items);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setItems(session.items);
    setSelected(null);
  }, [session.items]);

  const handleItemTap = (it: Item) => {
    if (it.placedIn !== null) return;
    setSelected(it.sym.id);
    speak(it.sym.label);
  };

  const handleCategoryTap = (groupNumber: number) => {
    if (!selected) return;
    const target = items.find((x) => x.sym.id === selected);
    if (!target) return;

    if (target.groupNumber === groupNumber) {
      setItems((cur) =>
        cur.map((x) => (x.sym.id === selected ? { ...x, placedIn: groupNumber } : x))
      );
      setSelected(null);
      speak("Muito bem!");
    } else {
      // shake e mantém selecionado
      setItems((cur) =>
        cur.map((x) => (x.sym.id === selected ? { ...x, shaking: true } : x))
      );
      setTimeout(() => {
        setItems((cur) =>
          cur.map((x) => (x.sym.id === selected ? { ...x, shaking: false } : x))
        );
      }, 500);
    }
  };

  const remaining = items.filter((x) => x.placedIn === null);
  const won = remaining.length === 0;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <GameHeader
        title="Categorias"
        emoji="🗂️"
        level="Nível 2"
        onExit={onExit}
        onRestart={() => setRound((r) => r + 1)}
      />
      {won && (
        <div className="bg-green-100 text-green-900 font-bold text-center py-3 border-b border-green-200">
          🎉 Tudo no lugar certo!
        </div>
      )}

      <div className="flex-1 overflow-auto p-4 sm:p-6 max-w-5xl mx-auto w-full">
        {/* Categorias (alvos) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {session.groups.map((g) => {
            const inside = items.filter((x) => x.placedIn === g.number);
            return (
              <button
                key={g.number}
                onClick={() => handleCategoryTap(g.number)}
                disabled={!selected}
                className={`min-h-[140px] rounded-2xl border-2 border-dashed p-3 text-left
                            transition ${g.cellBg} ${g.accent}
                            ${selected
                              ? "border-blue-500 hover:scale-[1.01] cursor-pointer"
                              : "border-slate-300 cursor-default"}`}
              >
                <div className="text-xs font-bold uppercase tracking-wide opacity-70">
                  {g.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {inside.length === 0 ? (
                    <span className="text-sm italic opacity-60">
                      {selected ? "Toque aqui" : "Vazio"}
                    </span>
                  ) : (
                    inside.map((it) =>
                      it.sym.image ? (
                        <img
                          key={it.sym.id}
                          src={it.sym.image}
                          alt={it.sym.label}
                          className="h-12 w-auto object-contain bg-white rounded-md p-1 border border-slate-200"
                        />
                      ) : (
                        <span
                          key={it.sym.id}
                          className="text-3xl bg-white rounded-md px-2 py-1 border border-slate-200"
                        >
                          {it.sym.emoji}
                        </span>
                      )
                    )
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Itens disponíveis */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {items.map((it) => {
            if (it.placedIn !== null) return <div key={it.sym.id} />;
            const isSelected = selected === it.sym.id;
            return (
              <button
                key={it.sym.id}
                onClick={() => handleItemTap(it)}
                className={`bg-white rounded-2xl border-2 p-3 flex flex-col items-center
                            shadow-sm transition
                            ${isSelected
                              ? "border-blue-500 ring-4 ring-blue-200 scale-105"
                              : "border-slate-200 hover:border-slate-300"}
                            ${it.shaking ? "animate-shake" : ""}`}
              >
                {it.sym.image ? (
                  <img
                    src={it.sym.image}
                    alt=""
                    aria-hidden
                    className="h-16 w-auto object-contain"
                    draggable={false}
                  />
                ) : (
                  <span className="text-4xl" aria-hidden>{it.sym.emoji}</span>
                )}
                <span className="mt-1 text-xs font-semibold text-slate-700 text-center leading-tight">
                  {it.sym.label}
                </span>
              </button>
            );
          })}
        </div>

        {selected && remaining.length > 0 && (
          <p className="text-center mt-4 text-sm text-slate-600">
            Agora toque no grupo onde essa figura pertence.
          </p>
        )}
      </div>
    </div>
  );
}
