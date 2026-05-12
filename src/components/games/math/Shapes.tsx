import { useEffect, useState } from "react";
import { useTTS } from "../../../hooks/useTTS";
import { GameHeader } from "../GameHeader";
import { shuffle } from "./shared";

type ShapeKind = "circulo" | "quadrado" | "triangulo" | "estrela" | "coracao" | "losango";

const SHAPES: { kind: ShapeKind; label: string; color: string }[] = [
  { kind: "circulo",   label: "círculo",   color: "#2563eb" },
  { kind: "quadrado",  label: "quadrado",  color: "#16a34a" },
  { kind: "triangulo", label: "triângulo", color: "#f59e0b" },
  { kind: "estrela",   label: "estrela",   color: "#dc2626" },
  { kind: "coracao",   label: "coração",   color: "#db2777" },
  { kind: "losango",   label: "losango",   color: "#7c3aed" },
];

function Shape({ kind, color, size = 80 }: { kind: ShapeKind; color: string; size?: number }) {
  const s = size;
  const cx = s / 2;
  switch (kind) {
    case "circulo":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <circle cx={cx} cy={cx} r={s * 0.42} fill={color} />
        </svg>
      );
    case "quadrado":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <rect x={s * 0.12} y={s * 0.12} width={s * 0.76} height={s * 0.76} rx={s * 0.06} fill={color} />
        </svg>
      );
    case "triangulo":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon
            points={`${cx},${s * 0.1} ${s * 0.92},${s * 0.88} ${s * 0.08},${s * 0.88}`}
            fill={color}
          />
        </svg>
      );
    case "estrela":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <polygon
            points="50,5 61,38 95,38 67,58 78,92 50,72 22,92 33,58 5,38 39,38"
            fill={color}
          />
        </svg>
      );
    case "coracao":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <path
            d="M50,86 C16,62 8,42 22,28 C32,18 46,22 50,34 C54,22 68,18 78,28 C92,42 84,62 50,86 Z"
            fill={color}
          />
        </svg>
      );
    case "losango":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon
            points={`${cx},${s * 0.08} ${s * 0.92},${cx} ${cx},${s * 0.92} ${s * 0.08},${cx}`}
            fill={color}
          />
        </svg>
      );
  }
}

type Round = {
  target: typeof SHAPES[number];
  options: typeof SHAPES[number][];
};

function buildRound(): Round {
  const picked = shuffle(SHAPES).slice(0, 3);
  const target = picked[0];
  return { target, options: shuffle(picked) };
}

type Props = { onExit: () => void };

export function ShapesGame({ onExit }: Props) {
  const { speak } = useTTS();
  const [round, setRound] = useState<Round>(() => buildRound());
  const [score, setScore] = useState(0);
  const [wrongKind, setWrongKind] = useState<ShapeKind | null>(null);
  const [winKind, setWinKind] = useState<ShapeKind | null>(null);

  useEffect(() => {
    const t = setTimeout(() => speak(`Ache o ${round.target.label}`), 250);
    return () => clearTimeout(t);
  }, [round, speak]);

  const onPick = (kind: ShapeKind) => {
    if (kind === round.target.kind) {
      speak("Muito bem!");
      setWinKind(kind);
      setScore((x) => x + 1);
      setTimeout(() => {
        setWinKind(null);
        setRound(buildRound());
      }, 800);
    } else {
      setWrongKind(kind);
      setTimeout(() => setWrongKind(null), 500);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50">
      <GameHeader
        title="Formas"
        emoji="🔺"
        level="Nível 3"
        onExit={onExit}
        onRestart={() => {
          setRound(buildRound());
          setScore(0);
        }}
      />
      <div className="flex-1 overflow-auto p-4 sm:p-6 max-w-3xl mx-auto w-full">
        <div className="text-center mb-3 text-sm font-semibold text-slate-600">
          ✅ Acertos: {score}
        </div>

        {/* Modelo */}
        <div className="bg-white rounded-3xl border-4 border-sky-300 shadow-md p-6 flex flex-col items-center mb-6">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
            Encontre o(a):
          </div>
          <Shape kind={round.target.kind} color={round.target.color} size={120} />
          <div className="mt-2 text-xl font-bold text-slate-800 capitalize">
            {round.target.label}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {round.options.map((s) => {
            const isWrong = wrongKind === s.kind;
            const isWin = winKind === s.kind;
            return (
              <button
                key={s.kind}
                onClick={() => onPick(s.kind)}
                className={`bg-white rounded-2xl border-2 p-4 min-h-[140px]
                            flex flex-col items-center justify-center shadow-md transition
                            ${isWin
                              ? "border-green-400 ring-4 ring-green-200"
                              : isWrong
                              ? "border-red-400 ring-4 ring-red-200 animate-shake"
                              : "border-slate-200 hover:border-blue-400 active:scale-95"}`}
              >
                <Shape kind={s.kind} color={s.color} size={84} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
