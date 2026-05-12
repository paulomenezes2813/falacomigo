/**
 * Dados do jogo "Rotina Diária" — adaptado do material da Brilhamente Ltda.
 * "Rotina Diária para Meninas". Os textos e categorias seguem o PDF original.
 */

export type DayCard = { id: string; label: string; short: string };
export type WeatherCard = { id: string; label: string; emoji: string };
export type ActivityCard = { id: string; label: string; emoji: string };

export const DAYS: DayCard[] = [
  { id: "seg", label: "Segunda-feira", short: "Seg" },
  { id: "ter", label: "Terça-feira",   short: "Ter" },
  { id: "qua", label: "Quarta-feira",  short: "Qua" },
  { id: "qui", label: "Quinta-feira",  short: "Qui" },
  { id: "sex", label: "Sexta-feira",   short: "Sex" },
  { id: "sab", label: "Sábado",        short: "Sáb" },
  { id: "dom", label: "Domingo",       short: "Dom" },
];

export const WEATHER: WeatherCard[] = [
  { id: "ensolarado", label: "Ensolarado", emoji: "☀️" },
  { id: "chuvoso",    label: "Chuvoso",    emoji: "🌧️" },
  { id: "nublado",    label: "Nublado",    emoji: "⛅" },
];

/** 24 atividades baseadas no PDF "Rotina Diária para Meninas". */
export const ACTIVITIES: ActivityCard[] = [
  { id: "acordar",         label: "Acordar",         emoji: "🌅" },
  { id: "lavar-rosto",     label: "Lavar o rosto",   emoji: "💦" },
  { id: "escovar-dentes",  label: "Escovar dentes",  emoji: "🪥" },
  { id: "pentear-cabelo",  label: "Pentear cabelo",  emoji: "💇" },
  { id: "cafe-manha",      label: "Café da manhã",   emoji: "🥣" },
  { id: "lavar-maos",      label: "Lavar as mãos",   emoji: "🧼" },
  { id: "tomar-banho",     label: "Tomar banho",     emoji: "🛁" },
  { id: "ir-banheiro",     label: "Ir ao banheiro",  emoji: "🚽" },
  { id: "hora-escola",     label: "Hora da escola",  emoji: "🏫" },
  { id: "estudar",         label: "Estudar",         emoji: "📚" },
  { id: "lanche",          label: "Lanche",          emoji: "🍎" },
  { id: "almoco",          label: "Almoço",          emoji: "🍝" },
  { id: "beber-agua",      label: "Beber água",      emoji: "🥤" },
  { id: "tomar-remedio",   label: "Tomar remédio",   emoji: "💊" },
  { id: "brincar",         label: "Hora de brincar", emoji: "🧸" },
  { id: "jogar-bola",      label: "Jogar bola",      emoji: "⚽" },
  { id: "andar-bike",      label: "Andar de bike",   emoji: "🚲" },
  { id: "desenhar",        label: "Desenhar",        emoji: "🎨" },
  { id: "ouvir-musica",    label: "Ouvir música",    emoji: "🎵" },
  { id: "assistir-tv",     label: "Assistir TV",     emoji: "📺" },
  { id: "guardar-brinq",   label: "Guardar brinquedos", emoji: "📦" },
  { id: "jantar",          label: "Jantar",          emoji: "🍽️" },
  { id: "ler-historia",    label: "Ler história",    emoji: "📖" },
  { id: "dormir",          label: "Dormir",          emoji: "😴" },
];
