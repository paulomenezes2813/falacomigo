import { comunicacao3Board } from "../../data/boardComunicacao3";
import type { Symbol as SymType } from "../../types";

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Todos os 100 ícones reais extraídos do material NeuroVisual Edukkare. */
export const ALL_SYMBOLS: SymType[] = comunicacao3Board.groups.flatMap(
  (g) => g.symbols
);

/** Pega N símbolos aleatórios sem repetição. */
export function pickRandom(n: number, pool: SymType[] = ALL_SYMBOLS): SymType[] {
  return shuffle(pool).slice(0, n);
}

export const ROUTINE_GROUP = comunicacao3Board.groups.find(
  (g) => g.title === "Rotina"
)!;
