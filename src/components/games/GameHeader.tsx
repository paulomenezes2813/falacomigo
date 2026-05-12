type Props = {
  title: string;
  emoji: string;
  level: string;
  onExit: () => void;
  onRestart?: () => void;
};

export function GameHeader({ title, emoji, level, onExit, onRestart }: Props) {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm">
      <button
        onClick={onExit}
        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-medium"
      >
        ← Voltar
      </button>
      <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
        <span aria-hidden>{emoji}</span> {title}
      </h2>
      <span className="text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
        {level}
      </span>
      {onRestart && (
        <button
          onClick={onRestart}
          className="ml-auto px-3 py-1.5 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
        >
          🔄 Reiniciar
        </button>
      )}
    </header>
  );
}
