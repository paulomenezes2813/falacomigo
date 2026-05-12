import { useState } from "react";

export type ViewKey =
  | "comunicacao-3"
  | "jogos-1"
  | "jogos-2"
  | "rotina-diaria";

type Props = {
  current: ViewKey;
  onChange: (v: ViewKey) => void;
};

export function Sidebar({ current, onChange }: Props) {
  const isComunicacao = current === "comunicacao-3";
  const isJogos = current === "jogos-1" || current === "jogos-2";
  const isRotina = current === "rotina-diaria";
  const [openComunicacao, setOpenComunicacao] = useState(isComunicacao);
  const [openJogos, setOpenJogos] = useState(isJogos);
  const [openRotina, setOpenRotina] = useState(isRotina);

  return (
    <aside
      className="w-60 shrink-0 bg-slate-900 text-slate-100 flex flex-col"
      aria-label="Menu lateral"
    >
      <div className="px-4 py-4 border-b border-slate-700">
        <span className="text-lg font-bold tracking-tight">FalaComigo</span>
        <p className="text-xs text-slate-400 mt-0.5">Menu</p>
      </div>

      <nav className="flex-1 overflow-auto py-2">
        {/* Comunicação */}
        <button
          type="button"
          onClick={() => setOpenComunicacao((o) => !o)}
          className={`w-full flex items-center justify-between px-4 py-3 text-left
                      hover:bg-slate-800 focus:outline-none focus:bg-slate-800
                      ${isComunicacao ? "bg-slate-800" : ""}`}
          aria-expanded={openComunicacao}
        >
          <span className="flex items-center gap-2 font-medium">
            <span aria-hidden>💬</span> Comunicação
          </span>
          <span aria-hidden className={`transition-transform ${openComunicacao ? "rotate-90" : ""}`}>
            ▶
          </span>
        </button>

        {openComunicacao && (
          <div className="bg-slate-950/40">
            <button
              type="button"
              onClick={() => onChange("comunicacao-3")}
              className={`w-full text-left pl-10 pr-4 py-2 text-sm
                          hover:bg-slate-800 focus:outline-none focus:bg-slate-800
                          ${current === "comunicacao-3"
                            ? "bg-blue-700 text-white font-semibold"
                            : "text-slate-300"}`}
            >
              Comunicação
            </button>
          </div>
        )}

        {/* Jogos */}
        <button
          type="button"
          onClick={() => setOpenJogos((o) => !o)}
          className={`w-full flex items-center justify-between px-4 py-3 text-left
                      hover:bg-slate-800 focus:outline-none focus:bg-slate-800
                      ${isJogos ? "bg-slate-800" : ""}`}
          aria-expanded={openJogos}
        >
          <span className="flex items-center gap-2 font-medium">
            <span aria-hidden>🎮</span> Jogos
          </span>
          <span aria-hidden className={`transition-transform ${openJogos ? "rotate-90" : ""}`}>
            ▶
          </span>
        </button>

        {openJogos && (
          <div className="bg-slate-950/40">
            <button
              type="button"
              onClick={() => onChange("jogos-1")}
              className={`w-full text-left pl-10 pr-4 py-2 text-sm
                          hover:bg-slate-800 focus:outline-none focus:bg-slate-800
                          ${current === "jogos-1"
                            ? "bg-blue-700 text-white font-semibold"
                            : "text-slate-300"}`}
            >
              Jogos 1 — Comunicação
            </button>
            <button
              type="button"
              onClick={() => onChange("jogos-2")}
              className={`w-full text-left pl-10 pr-4 py-2 text-sm
                          hover:bg-slate-800 focus:outline-none focus:bg-slate-800
                          ${current === "jogos-2"
                            ? "bg-blue-700 text-white font-semibold"
                            : "text-slate-300"}`}
            >
              Jogos 2 — Matemática
            </button>
          </div>
        )}

        {/* Rotina */}
        <button
          type="button"
          onClick={() => setOpenRotina((o) => !o)}
          className={`w-full flex items-center justify-between px-4 py-3 text-left
                      hover:bg-slate-800 focus:outline-none focus:bg-slate-800
                      ${isRotina ? "bg-slate-800" : ""}`}
          aria-expanded={openRotina}
        >
          <span className="flex items-center gap-2 font-medium">
            <span aria-hidden>📅</span> Rotina
          </span>
          <span aria-hidden className={`transition-transform ${openRotina ? "rotate-90" : ""}`}>
            ▶
          </span>
        </button>

        {openRotina && (
          <div className="bg-slate-950/40">
            <button
              type="button"
              onClick={() => onChange("rotina-diaria")}
              className={`w-full text-left pl-10 pr-4 py-2 text-sm
                          hover:bg-slate-800 focus:outline-none focus:bg-slate-800
                          ${current === "rotina-diaria"
                            ? "bg-blue-700 text-white font-semibold"
                            : "text-slate-300"}`}
            >
              Rotina Diária
            </button>
          </div>
        )}
      </nav>

      <div className="px-4 py-3 border-t border-slate-700 text-xs text-slate-500">
        v0.1 — protótipo
      </div>
    </aside>
  );
}
