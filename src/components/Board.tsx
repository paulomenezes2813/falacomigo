import type { Board as BoardType, Symbol as SymType } from "../types";
import { SymbolButton } from "./SymbolButton";

type Props = {
  board: BoardType;
  onSelect: (s: SymType) => void;
};

export function Board({ board, onSelect }: Props) {
  // Pranchas com muitas colunas (>= 12) usam tiles menores para caber na tela
  const dense = board.cols >= 12;
  return (
    <div
      className={`grid p-3 ${dense ? "gap-1.5" : "gap-3"}`}
      style={{
        gridTemplateColumns: `repeat(${board.cols}, minmax(0, 1fr))`,
      }}
      role="grid"
      aria-label={`Prancha ${board.name}`}
      data-dense={dense ? "true" : "false"}
    >
      {board.symbols.map((s) => (
        <SymbolButton key={s.id} symbol={s} onSelect={onSelect} />
      ))}
    </div>
  );
}
