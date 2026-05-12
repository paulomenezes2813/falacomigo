import type { Symbol as SymType } from "../types";

type Props = {
  phrase: SymType[];
  onSpeak: () => void;
  onClear: () => void;
  onRemoveLast: () => void;
};

export function PhraseBar({ phrase, onSpeak, onClear, onRemoveLast }: Props) {
  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
      {/* Tokens da frase */}
      <div
        className="flex-1 min-h-[64px] flex flex-wrap gap-2 items-center
                   rounded-lg bg-slate-50 border border-slate-200 px-3 py-2"
        aria-live="polite"
        aria-label="Frase atual"
      >
        {phrase.length === 0 ? (
          <span className="text-slate-400 italic">
            Toque nos símbolos para montar uma frase…
          </span>
        ) : (
          phrase.map((s, i) => (
            <span
              key={`${s.id}-${i}`}
              className="inline-flex items-center gap-1 bg-white border border-slate-300
                         rounded-md px-2 py-1 text-sm shadow-sm"
            >
              {s.image ? (
                <img
                  src={s.image}
                  alt=""
                  aria-hidden
                  className="h-6 w-auto object-contain"
                  draggable={false}
                />
              ) : (
                <span aria-hidden className="text-lg leading-none">{s.emoji}</span>
              )}
              <span className="font-medium">{s.label}</span>
            </span>
          ))
        )}
      </div>

      {/* Ações */}
      <button
        type="button"
        onClick={onRemoveLast}
        disabled={phrase.length === 0}
        className="px-3 py-2 rounded-lg border border-slate-300 bg-white
                   hover:bg-slate-50 disabled:opacity-40 font-medium"
        aria-label="Apagar última palavra"
      >
        ⌫
      </button>
      <button
        type="button"
        onClick={onClear}
        disabled={phrase.length === 0}
        className="px-3 py-2 rounded-lg border border-slate-300 bg-white
                   hover:bg-slate-50 disabled:opacity-40 font-medium"
        aria-label="Limpar frase"
      >
        Limpar
      </button>
      <button
        type="button"
        onClick={onSpeak}
        disabled={phrase.length === 0}
        className="px-5 py-2 rounded-lg bg-blue-700 text-white font-semibold
                   shadow hover:bg-blue-800 disabled:opacity-40
                   focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        ▶ Falar
      </button>
    </div>
  );
}
