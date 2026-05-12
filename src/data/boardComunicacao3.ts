import type { Symbol as SymType } from "../types";

/**
 * Prancha de Comunicação 3 — modelo "NeuroVisual Edukkare · Primeiros 100 Ícones AAC".
 *
 * Diferente das outras pranchas, esta é organizada por GRUPOS TEMÁTICOS
 * (Comunicação Básica, Pessoas, Emoções, Ações, Necessidades, Rotina,
 *  Conceitos, Objetos, Lugares, Tempo e Perguntas) com 10 ícones em cada,
 * totalizando 100 símbolos. Os ícones são imagens PNG extraídas do material
 * NeuroVisual Edukkare e ficam em `public/icons/`.
 */

export type CategoryGroup = {
  number: number;
  title: string;
  /** Tailwind classes para a faixa lateral colorida (bg + text) */
  accent: string;
  /** Tailwind classes para o fundo das células deste grupo */
  cellBg: string;
  symbols: SymType[];
};

export type CategorizedBoard = {
  id: string;
  name: string;
  groups: CategoryGroup[];
};

const ICON = (n: number, slug: string) =>
  `/icons/${String(n).padStart(3, "0")}-${slug}.png`;

export const comunicacao3Board: CategorizedBoard = {
  id: "comunicacao-3",
  name: "Primeiros 100 Ícones AAC",
  groups: [
    {
      number: 1,
      title: "Comunicação Básica",
      accent: "bg-blue-100 text-blue-900",
      cellBg: "bg-blue-50",
      symbols: [
        { id: "c3-oi",        label: "Oi",         emoji: "👋", image: ICON(1,  "oi"),        category: "social" },
        { id: "c3-tchau",     label: "Tchau",      emoji: "🙋", image: ICON(2,  "tchau"),     category: "social" },
        { id: "c3-obrigado",  label: "Obrigado",   emoji: "🙏", image: ICON(3,  "obrigado"),  category: "social" },
        { id: "c3-porfavor",  label: "Por favor",  emoji: "🤲", image: ICON(4,  "porfavor"),  category: "social" },
        { id: "c3-desculpe",  label: "Desculpe",   emoji: "😞", image: ICON(5,  "desculpe"),  category: "social" },
        { id: "c3-sim",       label: "Sim",        emoji: "👍", image: ICON(6,  "sim"),       category: "util",   isCore: true },
        { id: "c3-nao",       label: "Não",        emoji: "👎", image: ICON(7,  "nao"),       category: "util",   isCore: true },
        { id: "c3-quero",     label: "Quero",      emoji: "🙋", image: ICON(8,  "quero"),     category: "action", isCore: true },
        { id: "c3-naoquero",  label: "Não quero",  emoji: "🙅", image: ICON(9,  "naoquero"),  category: "action" },
        { id: "c3-ajuda",     label: "Ajuda",      emoji: "🆘", image: ICON(10, "ajuda"),     category: "action" },
      ],
    },
    {
      number: 2,
      title: "Pessoas",
      accent: "bg-green-100 text-green-900",
      cellBg: "bg-green-50",
      symbols: [
        { id: "c3-eu",         label: "Eu",          emoji: "🙂",   image: ICON(11, "eu"),         category: "people", isCore: true },
        { id: "c3-voce",       label: "Você",        emoji: "👉",   image: ICON(12, "voce"),       category: "people", isCore: true },
        { id: "c3-mamae",      label: "Mamãe",       emoji: "👩",   image: ICON(13, "mamae"),      category: "people" },
        { id: "c3-papai",      label: "Papai",       emoji: "👨",   image: ICON(14, "papai"),      category: "people" },
        { id: "c3-vovo",       label: "Vovó",        emoji: "👵",   image: ICON(15, "vovo"),       category: "people" },
        { id: "c3-vovoo",      label: "Vovô",        emoji: "👴",   image: ICON(16, "vovoo"),      category: "people" },
        { id: "c3-irmao",      label: "Irmão",       emoji: "👦",   image: ICON(17, "irmao"),      category: "people" },
        { id: "c3-irma",       label: "Irmã",        emoji: "👧",   image: ICON(18, "irma"),       category: "people" },
        { id: "c3-professor",  label: "Professor(a)", emoji: "🧑‍🏫", image: ICON(19, "professor"),  category: "people" },
        { id: "c3-amigo",      label: "Amigo(a)",    emoji: "🧑‍🤝‍🧑", image: ICON(20, "amigo"),      category: "people" },
      ],
    },
    {
      number: 3,
      title: "Emoções",
      accent: "bg-purple-100 text-purple-900",
      cellBg: "bg-purple-50",
      symbols: [
        { id: "c3-feliz",      label: "Feliz",      emoji: "😀", image: ICON(21, "feliz"),      category: "desc" },
        { id: "c3-triste",     label: "Triste",     emoji: "😢", image: ICON(22, "triste"),     category: "desc" },
        { id: "c3-bravo",      label: "Bravo",      emoji: "😡", image: ICON(23, "bravo"),      category: "desc" },
        { id: "c3-commedo",    label: "Com medo",   emoji: "😨", image: ICON(24, "commedo"),    category: "desc" },
        { id: "c3-cansado",    label: "Cansado",    emoji: "😩", image: ICON(25, "cansado"),    category: "desc" },
        { id: "c3-comsono",    label: "Com sono",   emoji: "😴", image: ICON(26, "comsono"),    category: "desc" },
        { id: "c3-calmo",      label: "Calmo",      emoji: "😌", image: ICON(27, "calmo"),      category: "desc" },
        { id: "c3-ansioso",    label: "Ansioso",    emoji: "😰", image: ICON(28, "ansioso"),    category: "desc" },
        { id: "c3-assustado",  label: "Assustado",  emoji: "😱", image: ICON(29, "assustado"),  category: "desc" },
        { id: "c3-animado",    label: "Animado",    emoji: "🤩", image: ICON(30, "animado"),    category: "desc" },
      ],
    },
    {
      number: 4,
      title: "Ações",
      accent: "bg-yellow-100 text-yellow-900",
      cellBg: "bg-yellow-50",
      symbols: [
        { id: "c3-comer",     label: "Comer",     emoji: "🍽️", image: ICON(31, "comer"),     category: "action" },
        { id: "c3-beber",     label: "Beber",     emoji: "🥤", image: ICON(32, "beber"),     category: "action" },
        { id: "c3-brincar",   label: "Brincar",   emoji: "🧸", image: ICON(33, "brincar"),   category: "action" },
        { id: "c3-correr",    label: "Correr",    emoji: "🏃", image: ICON(34, "correr"),    category: "action" },
        { id: "c3-sentar",    label: "Sentar",    emoji: "🪑", image: ICON(35, "sentar"),    category: "action" },
        { id: "c3-levantar",  label: "Levantar",  emoji: "🧍", image: ICON(36, "levantar"),  category: "action" },
        { id: "c3-dormir",    label: "Dormir",    emoji: "😴", image: ICON(37, "dormir"),    category: "action" },
        { id: "c3-falar",     label: "Falar",     emoji: "🗣️", image: ICON(38, "falar"),     category: "action" },
        { id: "c3-ouvir",     label: "Ouvir",     emoji: "👂", image: ICON(39, "ouvir"),     category: "action" },
        { id: "c3-olhar",     label: "Olhar",     emoji: "👀", image: ICON(40, "olhar"),     category: "action" },
      ],
    },
    {
      number: 5,
      title: "Necessidades",
      accent: "bg-pink-100 text-pink-900",
      cellBg: "bg-pink-50",
      symbols: [
        { id: "c3-banheiro",       label: "Banheiro",          emoji: "🚽", image: ICON(41, "banheiro"),     category: "noun" },
        { id: "c3-agua",           label: "Água",              emoji: "💧", image: ICON(42, "agua"),         category: "noun" },
        { id: "c3-fome",           label: "Fome",              emoji: "🍴", image: ICON(43, "fome"),         category: "desc" },
        { id: "c3-sede",           label: "Sede",              emoji: "🥛", image: ICON(44, "sede"),         category: "desc" },
        { id: "c3-dor",            label: "Dor",               emoji: "🤕", image: ICON(45, "dor"),          category: "desc" },
        { id: "c3-frio",           label: "Frio",              emoji: "🥶", image: ICON(46, "frio"),         category: "desc" },
        { id: "c3-calor",          label: "Calor",             emoji: "🥵", image: ICON(47, "calor"),        category: "desc" },
        { id: "c3-querocolo",      label: "Quero colo",        emoji: "🤗", image: ICON(48, "querocolo"),    category: "action" },
        { id: "c3-precisoajuda",   label: "Preciso de ajuda",  emoji: "🆘", image: ICON(49, "precisoajuda"), category: "action" },
        { id: "c3-precisoparar",   label: "Preciso parar",     emoji: "✋", image: ICON(50, "precisoparar"), category: "action" },
      ],
    },
    {
      number: 6,
      title: "Rotina",
      accent: "bg-sky-100 text-sky-900",
      cellBg: "bg-sky-50",
      symbols: [
        { id: "c3-r-escola",     label: "Escola",          emoji: "🏫", image: ICON(51, "escola"),    category: "noun" },
        { id: "c3-r-casa",       label: "Casa",            emoji: "🏠", image: ICON(52, "casa"),      category: "noun" },
        { id: "c3-banho",        label: "Banho",           emoji: "🛁", image: ICON(53, "banho"),     category: "action" },
        { id: "c3-escovar",      label: "Escovar dentes",  emoji: "🪥", image: ICON(54, "escovar"),   category: "action" },
        { id: "c3-lanchar",      label: "Lanchar",         emoji: "🍎", image: ICON(55, "lanchar"),   category: "action" },
        { id: "c3-r-dormir",     label: "Dormir",          emoji: "🛏️", image: ICON(56, "dormir2"),   category: "action" },
        { id: "c3-estudar",      label: "Estudar",         emoji: "📚", image: ICON(57, "estudar"),   category: "action" },
        { id: "c3-r-brincar",    label: "Brincar",         emoji: "🧱", image: ICON(58, "brincar2"),  category: "action" },
        { id: "c3-passeio",      label: "Passeio",         emoji: "🌳", image: ICON(59, "passeio"),   category: "action" },
        { id: "c3-r-terapia",    label: "Terapia",         emoji: "🧑‍⚕️", image: ICON(60, "terapia"),   category: "action" },
      ],
    },
    {
      number: 7,
      title: "Conceitos",
      accent: "bg-orange-100 text-orange-900",
      cellBg: "bg-orange-50",
      symbols: [
        { id: "c3-perto",    label: "Perto",    emoji: "📍", image: ICON(61, "perto"),    category: "util" },
        { id: "c3-longe",    label: "Longe",    emoji: "🏞️", image: ICON(62, "longe"),    category: "util" },
        { id: "c3-dentro",   label: "Dentro",   emoji: "📥", image: ICON(63, "dentro"),   category: "util" },
        { id: "c3-fora",     label: "Fora",     emoji: "📤", image: ICON(64, "fora"),     category: "util" },
        { id: "c3-emcima",   label: "Em cima",  emoji: "🔼", image: ICON(65, "emcima"),   category: "util" },
        { id: "c3-embaixo",  label: "Embaixo",  emoji: "🔽", image: ICON(66, "embaixo"),  category: "util" },
        { id: "c3-antes",    label: "Antes",    emoji: "⏪", image: ICON(67, "antes"),    category: "util" },
        { id: "c3-depois",   label: "Depois",   emoji: "⏩", image: ICON(68, "depois"),   category: "util" },
        { id: "c3-mais",     label: "Mais",     emoji: "➕", image: ICON(69, "mais"),     category: "util", isCore: true },
        { id: "c3-menos",    label: "Menos",    emoji: "➖", image: ICON(70, "menos"),    category: "util" },
      ],
    },
    {
      number: 8,
      title: "Objetos",
      accent: "bg-slate-200 text-slate-900",
      cellBg: "bg-slate-50",
      symbols: [
        { id: "c3-bola",        label: "Bola",        emoji: "⚽", image: ICON(71, "bola"),        category: "noun" },
        { id: "c3-carrinho",    label: "Carrinho",    emoji: "🚗", image: ICON(72, "carrinho"),    category: "noun" },
        { id: "c3-boneca",      label: "Boneca",      emoji: "🪆", image: ICON(73, "boneca"),      category: "noun" },
        { id: "c3-livro",       label: "Livro",       emoji: "📕", image: ICON(74, "livro"),       category: "noun" },
        { id: "c3-lapis",       label: "Lápis",       emoji: "✏️", image: ICON(75, "lapis"),       category: "noun" },
        { id: "c3-caderno",     label: "Caderno",     emoji: "📓", image: ICON(76, "caderno"),     category: "noun" },
        { id: "c3-mochila",     label: "Mochila",     emoji: "🎒", image: ICON(77, "mochila"),     category: "noun" },
        { id: "c3-copo",        label: "Copo",        emoji: "🥛", image: ICON(78, "copo"),        category: "noun" },
        { id: "c3-talher",      label: "Talher",      emoji: "🍴", image: ICON(79, "talher"),      category: "noun" },
        { id: "c3-brinquedos",  label: "Brinquedos",  emoji: "🧸", image: ICON(80, "brinquedos"),  category: "noun" },
      ],
    },
    {
      number: 9,
      title: "Lugares",
      accent: "bg-emerald-100 text-emerald-900",
      cellBg: "bg-emerald-50",
      symbols: [
        { id: "c3-parque",       label: "Parque",       emoji: "🌳",   image: ICON(81, "parque"),       category: "noun" },
        { id: "c3-playground",   label: "Playground",   emoji: "🛝",   image: ICON(82, "playground"),   category: "noun" },
        { id: "c3-sala",         label: "Sala",         emoji: "🛋️",   image: ICON(83, "sala"),         category: "noun" },
        { id: "c3-cozinha",      label: "Cozinha",      emoji: "🍳",   image: ICON(84, "cozinha"),      category: "noun" },
        { id: "c3-quarto",       label: "Quarto",       emoji: "🛏️",   image: ICON(85, "quarto"),       category: "noun" },
        { id: "c3-l-banheiro",   label: "Banheiro",     emoji: "🚻",   image: ICON(86, "banheiro2"),    category: "noun" },
        { id: "c3-l-escola",     label: "Escola",       emoji: "🏫",   image: ICON(87, "escola2"),      category: "noun" },
        { id: "c3-loja",         label: "Loja",         emoji: "🏪",   image: ICON(88, "loja"),         category: "noun" },
        { id: "c3-consultorio",  label: "Consultório",  emoji: "🏥",   image: ICON(89, "consultorio"),  category: "noun" },
        { id: "c3-l-terapia",    label: "Terapia",      emoji: "🧑‍⚕️", image: ICON(90, "terapia2"),     category: "noun" },
      ],
    },
    {
      number: 10,
      title: "Tempo e Perguntas",
      accent: "bg-violet-100 text-violet-900",
      cellBg: "bg-violet-50",
      symbols: [
        { id: "c3-hoje",     label: "Hoje",      emoji: "☀️", image: ICON(91, "hoje"),    category: "util" },
        { id: "c3-ontem",    label: "Ontem",     emoji: "⬅️", image: ICON(92, "ontem"),   category: "util" },
        { id: "c3-amanha",   label: "Amanhã",    emoji: "➡️", image: ICON(93, "amanha"),  category: "util" },
        { id: "c3-manha",    label: "Manhã",     emoji: "🌅", image: ICON(94, "manha"),   category: "noun" },
        { id: "c3-tarde",    label: "Tarde",     emoji: "🌇", image: ICON(95, "tarde"),   category: "noun" },
        { id: "c3-noite",    label: "Noite",     emoji: "🌙", image: ICON(96, "noite"),   category: "noun" },
        { id: "c3-quando",   label: "Quando?",   emoji: "⏰", image: ICON(97, "quando"),  category: "q" },
        { id: "c3-onde",     label: "Onde?",     emoji: "🗺️", image: ICON(98, "onde"),    category: "q" },
        { id: "c3-porque",   label: "Por quê?",  emoji: "❓", image: ICON(99, "porque"),  category: "q" },
        { id: "c3-quanto",   label: "Quanto?",   emoji: "💰", image: ICON(100,"quanto"),  category: "q" },
      ],
    },
  ],
};
