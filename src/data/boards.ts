import type { Board } from "../types";

/**
 * Prancha inicial baseada na referência visual NeuroEdu.
 * Grid 6 colunas × 4 linhas = 24 símbolos.
 *
 * Princípios aplicados:
 *  - Vocabulário core (eu, você, quero, mais, sim, não) marcado com isCore.
 *  - Codificação por cor (Fitzgerald Key) por categoria.
 *  - Substantivos e ações organizados em colunas distintas.
 */
export const initialBoard: Board = {
  id: "main",
  name: "Prancha Principal",
  cols: 6,
  rows: 4,
  symbols: [
    // Linha 1 — sociais + pronomes-core + ações iniciais
    { id: "oi",        label: "Oi",         emoji: "👋",  category: "social" },
    { id: "tchau",     label: "Tchau",      emoji: "🙋",  category: "social" },
    { id: "obrigado",  label: "Obrigado",   emoji: "🙏",  category: "social" },
    { id: "porfavor",  label: "Por favor",  emoji: "🤲",  category: "social" },
    { id: "sim",       label: "Sim",        emoji: "✅",  category: "desc",   isCore: true },
    { id: "nao",       label: "Não",        emoji: "❌",  category: "desc",   isCore: true },

    // Linha 2 — pessoas
    { id: "eu",        label: "Eu",         emoji: "🙂",  category: "people", isCore: true },
    { id: "voce",      label: "Você",       emoji: "👉",  category: "people", isCore: true },
    { id: "mamae",     label: "Mamãe",      emoji: "👩",  category: "people" },
    { id: "papai",     label: "Papai",      emoji: "👨",  category: "people" },
    { id: "amigo",     label: "Amigo",      emoji: "🧑‍🤝‍🧑", category: "people" },
    { id: "professor", label: "Professor",  emoji: "🧑‍🏫", category: "people" },

    // Linha 3 — ações (verbos)
    { id: "quero",     label: "Quero",      emoji: "🙋",  category: "action", isCore: true },
    { id: "comer",     label: "Comer",      emoji: "🍽️",  category: "action" },
    { id: "beber",     label: "Beber",      emoji: "🥤",  category: "action" },
    { id: "brincar",   label: "Brincar",    emoji: "🧸",  category: "action" },
    { id: "ajuda",     label: "Ajuda",      emoji: "🆘",  category: "action" },
    { id: "banheiro",  label: "Banheiro",   emoji: "🚽",  category: "action" },

    // Linha 4 — sentimentos + substantivos + perguntas
    { id: "feliz",     label: "Feliz",      emoji: "😊",  category: "desc" },
    { id: "triste",    label: "Triste",     emoji: "😢",  category: "desc" },
    { id: "mais",      label: "Mais",       emoji: "➕",  category: "desc",   isCore: true },
    { id: "acabou",    label: "Acabou",     emoji: "🏁",  category: "desc" },
    { id: "agua",      label: "Água",       emoji: "💧",  category: "noun" },
    { id: "casa",      label: "Casa",       emoji: "🏠",  category: "noun" },
  ],
};
