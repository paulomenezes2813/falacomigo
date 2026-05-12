import type { Symbol as SymType } from "../types";

const colorByCategory: Record<SymType["category"], string> = {
  social: "bg-cat-social border-pink-400",
  people: "bg-cat-people border-yellow-400",
  action: "bg-cat-action border-green-500",
  desc:   "bg-cat-desc   border-blue-400",
  noun:   "bg-cat-noun   border-orange-400",
  q:      "bg-cat-q      border-purple-400",
  util:   "bg-cat-util   border-slate-300",
};

type Props = {
  symbol: SymType;
  onSelect: (s: SymType) => void;
};

export function SymbolButton({ symbol, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(symbol)}
      aria-label={symbol.label}
      className={`no-select flex flex-col items-center justify-center
        rounded-xl border-2 p-2 shadow-tile
        active:shadow-tile-active active:translate-y-px
        focus:outline-none focus:ring-4 focus:ring-blue-300
        transition-shadow ${colorByCategory[symbol.category]}`}
      style={{ minHeight: 96 }}
    >
      {symbol.image ? (
        <img
          src={symbol.image}
          alt=""
          aria-hidden
          loading="lazy"
          className="max-h-16 md:max-h-20 w-auto object-contain select-none pointer-events-none"
          draggable={false}
        />
      ) : (
        <span className="text-4xl md:text-5xl leading-none" aria-hidden>
          {symbol.emoji}
        </span>
      )}
      <span className="mt-2 text-sm md:text-base font-semibold text-slate-800 text-center">
        {symbol.label}
      </span>
    </button>
  );
}
