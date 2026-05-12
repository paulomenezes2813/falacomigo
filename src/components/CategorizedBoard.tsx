import type { CategorizedBoard as BoardData } from "../data/boardComunicacao3";
import type { Symbol as SymType } from "../types";

type Props = {
  board: BoardData;
  onSelect: (s: SymType) => void;
};

/**
 * Layout do "NeuroVisual Edukkare · Primeiros 100 Ícones AAC":
 *  - faixa lateral colorida com número + nome da categoria
 *  - 10 cartões por linha (a imagem já contém moldura, número e label)
 */
export function CategorizedBoard({ board, onSelect }: Props) {
  let counter = 0;

  return (
    <div className="p-3 space-y-2" role="grid" aria-label={`Prancha ${board.name}`}>
      {board.groups.map((g) => (
        <div
          key={g.number}
          className="grid items-stretch gap-2"
          style={{ gridTemplateColumns: "150px repeat(10, minmax(0, 1fr))" }}
          role="row"
        >
          {/* Faixa lateral (rótulo da categoria) */}
          <div className={`flex flex-col justify-center px-3 py-2 rounded-2xl ${g.accent}`}>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white/70 text-base font-extrabold"
                aria-hidden
              >
                {g.number}
              </span>
            </div>
            <div className="mt-1 text-[11px] md:text-xs font-bold uppercase tracking-wide leading-tight">
              {g.title}
            </div>
          </div>

          {/* 10 células de ícones */}
          {g.symbols.map((s) => {
            counter += 1;
            const n = counter;

            if (s.image) {
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelect(s)}
                  aria-label={`${n}. ${s.label}`}
                  className="no-select flex items-stretch
                             rounded-lg overflow-hidden bg-white
                             hover:brightness-95 active:translate-y-px
                             focus:outline-none focus:ring-4 focus:ring-blue-300
                             transition"
                >
                  <img
                    src={s.image}
                    alt={s.label}
                    loading="lazy"
                    className="w-full h-auto object-contain block select-none pointer-events-none"
                    draggable={false}
                  />
                </button>
              );
            }

            // Fallback (sem imagem)
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(s)}
                aria-label={`${n}. ${s.label}`}
                className={`no-select relative flex flex-col items-center justify-center
                            ${g.cellBg} hover:brightness-95
                            border border-slate-200 rounded-lg
                            px-1.5 py-2 min-h-[78px]
                            focus:outline-none focus:ring-4 focus:ring-blue-300
                            active:translate-y-px transition`}
              >
                <span className="absolute top-1 left-1.5 text-[10px] font-semibold text-slate-500">
                  {n}
                </span>
                <span className="text-2xl md:text-3xl leading-none mt-1" aria-hidden>
                  {s.emoji}
                </span>
                <span className="mt-1 text-[10px] md:text-xs font-semibold text-slate-800 text-center leading-tight">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
