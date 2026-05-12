export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export type Countable = {
  emoji: string;
  /** singular usado na fala da palavra ("bola", "carro") */
  singular: string;
  /** plural usado na fala da contagem ("bolas", "carros") */
  plural: string;
  /** artigo definido plural ("as" ou "os") */
  article: "as" | "os";
};

/** Itens contáveis com nome e gênero em pt-BR (para TTS natural). */
export const COUNTABLE_ITEMS: Countable[] = [
  { emoji: "🍎", singular: "maçã",     plural: "maçãs",      article: "as" },
  { emoji: "⚽", singular: "bola",     plural: "bolas",      article: "as" },
  { emoji: "⭐", singular: "estrela",  plural: "estrelas",   article: "as" },
  { emoji: "🐶", singular: "cachorro", plural: "cachorros",  article: "os" },
  { emoji: "🎈", singular: "balão",    plural: "balões",     article: "os" },
  { emoji: "🍪", singular: "biscoito", plural: "biscoitos",  article: "os" },
  { emoji: "🚗", singular: "carro",    plural: "carros",     article: "os" },
  { emoji: "🌸", singular: "flor",     plural: "flores",     article: "as" },
  { emoji: "🐱", singular: "gato",     plural: "gatos",      article: "os" },
  { emoji: "🍇", singular: "uva",      plural: "uvas",       article: "as" },
];

/** Sorteia um item contável (emoji + nome). */
export function pickCountable(): Countable {
  return COUNTABLE_ITEMS[Math.floor(Math.random() * COUNTABLE_ITEMS.length)];
}

export const NUMBER_WORDS_PT: Record<number, string> = {
  0: "zero",
  1: "um",
  2: "dois",
  3: "três",
  4: "quatro",
  5: "cinco",
  6: "seis",
  7: "sete",
  8: "oito",
  9: "nove",
  10: "dez",
};

export function speakNumber(speak: (t: string) => void, n: number) {
  speak(NUMBER_WORDS_PT[n] ?? String(n));
}
