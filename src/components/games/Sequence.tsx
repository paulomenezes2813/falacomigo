import { useCallback, useMemo, useState } from "react";
import { useTTS } from "../../hooks/useTTS";
import { GameHeader } from "./GameHeader";
import { comunicacao3Board } from "../../data/boardComunicacao3";
import type { Symbol as SymType } from "../../types";

type Props = { onExit: () => void };

/**
 * Montador de Rotina Diária.
 *
 * Em vez de adivinhar uma ordem pré-definida, a criança/cuidador escolhe
 * livremente ícones da prancha de Comunicação para montar a rotina do dia.
 * Usamos APENAS os ícones já existentes na prancha (sem inventar novos),
 * priorizando as categorias que fazem sentido em uma rotina:
 *  - Rotina, Ações, Necessidades e Tempo e Perguntas.
 */
const ROTINA_GROUPS = [
  "Rotina",
  "Ações",
  "Necessidades",
  "Tempo e Perguntas",
] as const;

export function SequenceGame({ onExit }: Props) {
  const { speak } = useTTS();
  const [steps, setSteps] = useState<SymType[]>([]);

  const groups = useMemo(
    () =>
      comunicacao3Board.groups.filter((g) =>
        (ROTINA_GROUPS as readonly string[]).includes(g.title)
      ),
    []
  );

  const addStep = useCallback(
    (s: SymType) => {
      setSteps((cur) => [...cur, s]);
      speak(s.label);
    },
    [speak]
  );

  const removeStep = useCallback((index: number) => {
    setSteps((cur) => cur.filter((_, i) => i !== index));
  }, []);

  const moveStep = useCallback((index: number, delta: -1 | 1) => {
    setSteps((cur) => {
      const target = index + delta;
      if (target < 0 || target >= cur.length) return cur;
      const next = [...cur];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const speakAll = useCallback(() => {
    if (steps.length === 0) return;
    const phrase = steps
      .map((s, i) => (i === 0 ? `Primeiro: ${s.label}` : `Depois: ${s.label}`))
      .join(". ");
    speak(phrase);
  }, [steps, speak]);

  const clear = useCallback(() => setSteps([]), []);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      <GameHeader
        title="Rotina"
        emoji="📅"
        level="Nível 2"
        onExit={onExit}
        onRestart={clear}
      />

      {/* Minha rotina */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Minha rotina
              </div>
              <div className="text-sm text-slate-600">
                Toque os ícones abaixo para montar a rotina, na ordem que quiser.
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={speakAll}
                disabled={steps.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-3 py-2 rounded-lg disabled:opacity-40"
              >
                ▶ Falar rotina
              </button>
              <button
                onClick={clear}
                disabled={steps.length === 0}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-bold px-3 py-2 rounded-lg disabled:opacity-40"
              >
                Limpar
              </button>
            </div>
          </div>

          {steps.length === 0 ? (
            <div className="border-2 border-dashed border-slate-300 rounded-xl px-3 py-6 text-center text-slate-400 text-sm">
              Sua rotina aparecerá aqui. Comece tocando em um ícone.
            </div>
          ) : (
            <ol className="flex gap-2 overflow-x-auto pb-1" aria-label="Passos da rotina">
              {steps.map((s, i) => (
                <li
                  key={`${s.id}-${i}`}
                  className="shrink-0 w-32 bg-white rounded-xl border-2 border-blue-300 p-2 flex flex-col items-center"
                >
                  <div className="text-[11px] font-bold text-slate-500">
                    Passo {i + 1}
                  </div>
                  {s.image ? (
                    <img
                      src={s.image}
                      alt=""
                      aria-hidden
                      className="h-16 w-auto object-contain"
                      draggable={false}
                    />
                  ) : (
                    <span className="text-4xl" aria-hidden>
                      {s.emoji}
                    </span>
                  )}
                  <span className="mt-1 text-xs font-semibold text-slate-700 text-center leading-tight">
                    {s.label}
                  </span>
                  <div className="mt-2 flex gap-1">
                    <button
                      onClick={() => moveStep(i, -1)}
                      disabled={i === 0}
                      className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30"
                      aria-label={`Mover ${s.label} para a esquerda`}
                    >
                      ◀
                    </button>
                    <button
                      onClick={() => removeStep(i)}
                      className="text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700"
                      aria-label={`Remover ${s.label}`}
                    >
                      ✕
                    </button>
                    <button
                      onClick={() => moveStep(i, 1)}
                      disabled={i === steps.length - 1}
                      className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30"
                      aria-label={`Mover ${s.label} para a direita`}
                    >
                      ▶
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {/* Ícones disponíveis (vindos da prancha de Comunicação) */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-6xl mx-auto">
          {groups.map((g) => (
            <section key={g.number} className="mb-5">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${g.accent}`}
              >
                <span>{g.number}</span>
                <span>{g.title}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                {g.symbols.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => addStep(s)}
                    aria-label={`Adicionar ${s.label} à rotina`}
                    className="bg-white rounded-lg border border-slate-200 p-2 flex flex-col items-center min-h-[96px]
                               hover:border-blue-300 hover:scale-[1.03] active:scale-95 transition
                               focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    {s.image ? (
                      <img
                        src={s.image}
                        alt=""
                        aria-hidden
                        className="h-12 w-auto object-contain"
                        draggable={false}
                      />
                    ) : (
                      <span className="text-3xl" aria-hidden>
                        {s.emoji}
                      </span>
                    )}
                    <span className="mt-1 text-[11px] font-semibold text-slate-700 text-center leading-tight">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
