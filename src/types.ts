export type Category =
  | "social"   // saudações, polidez (rosa)
  | "people"   // pronomes, pessoas (amarelo)
  | "action"   // verbos (verde)
  | "desc"     // descritivos / sentimentos (azul)
  | "noun"     // substantivos (laranja)
  | "q"        // perguntas (roxo)
  | "util";    // utilitárias / conceitos (branco) — sim, não, antes, depois, etc.

export type Symbol = {
  id: string;
  label: string;          // texto que será falado e exibido
  emoji: string;          // representação visual provisória (fallback)
  /** caminho opcional para PNG/SVG. Quando presente, substitui o emoji. */
  image?: string;
  category: Category;
  /** se true, mantém posição fixa em todas as pranchas (motor planning) */
  isCore?: boolean;
};

export type Board = {
  id: string;
  name: string;
  cols: number;
  rows: number;
  symbols: Symbol[];
};
