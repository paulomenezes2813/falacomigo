import { useCallback, useMemo, useState } from "react";
import { CategorizedBoard } from "./components/CategorizedBoard";
import { Jogos } from "./components/Jogos";
import { JogosMatematica } from "./components/JogosMatematica";
import { PhraseBar } from "./components/PhraseBar";
import { RotinaDiaria } from "./components/RotinaDiaria";
import { Sidebar, type ViewKey } from "./components/Sidebar";
import { useTTS } from "./hooks/useTTS";
import { comunicacao3Board } from "./data/boardComunicacao3";
import type { Symbol as SymType } from "./types";

export default function App() {
  const [view, setView] = useState<ViewKey>("comunicacao-3");
  const [jogosSession, setJogosSession] = useState(0);
  const [phrase, setPhrase] = useState<SymType[]>([]);
  const { speak, supported, voice, voices, setVoice, rate, setRate } = useTTS();

  const handleSelect = useCallback(
    (s: SymType) => {
      setPhrase((p) => [...p, s]);
      // Feedback imediato: fala a palavra individual ao tocar (modelagem)
      speak(s.label);
    },
    [speak]
  );

  const handleSpeak = useCallback(() => {
    if (phrase.length === 0) return;
    speak(phrase.map((s) => s.label).join(" "));
  }, [phrase, speak]);

  const handleViewChange = useCallback((v: ViewKey) => {
    setView(v);
    setPhrase([]); // limpa a frase ao trocar de prancha
    if (v === "jogos-1" || v === "jogos-2" || v === "rotina-diaria") {
      setJogosSession((s) => s + 1);
    }
  }, []);

  const ptVoices = voices.filter((v) => v.lang.startsWith("pt"));

  const showCommBoard = view === "comunicacao-3";

  const headerSubtitle = useMemo(() => {
    if (view === "jogos-1") return "Jogos 1 — Comunicação";
    if (view === "jogos-2") return "Jogos 2 — Matemática";
    if (view === "rotina-diaria") return "Rotina Diária";
    if (view === "comunicacao-3") return comunicacao3Board.name;
    return "Comunicação Alternativa e Aumentativa";
  }, [view]);

  const totalSymbolsC3 = useMemo(
    () => comunicacao3Board.groups.reduce((acc, g) => acc + g.symbols.length, 0),
    []
  );

  return (
    <div className="h-full flex">
      <Sidebar current={view} onChange={handleViewChange} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-blue-800 text-white px-4 py-2 flex items-center gap-3">
          <h1 className="text-xl font-bold">FalaComigo</h1>
          <span className="text-blue-100 text-sm hidden md:inline">
            {headerSubtitle}
          </span>

          {showCommBoard && (
            <div className="ml-auto flex items-center gap-2 text-sm">
              {!supported && (
                <span className="bg-amber-500 text-amber-950 px-2 py-0.5 rounded">
                  TTS indisponível neste navegador
                </span>
              )}
              {ptVoices.length > 0 && (
                <select
                  className="bg-blue-700 border border-blue-600 rounded px-2 py-1"
                  value={voice?.name ?? ""}
                  onChange={(e) =>
                    setVoice(voices.find((v) => v.name === e.target.value) ?? null)
                  }
                  aria-label="Voz"
                >
                  {ptVoices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              )}
              <label className="flex items-center gap-1" aria-label="Velocidade da fala">
                <span aria-hidden>🐢</span>
                <input
                  type="range"
                  min={0.5}
                  max={1.4}
                  step={0.05}
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                />
                <span aria-hidden>🐇</span>
              </label>
            </div>
          )}
        </header>

        {showCommBoard ? (
          <>
            <PhraseBar
              phrase={phrase}
              onSpeak={handleSpeak}
              onClear={() => setPhrase([])}
              onRemoveLast={() => setPhrase((p) => p.slice(0, -1))}
            />

            <main className="flex-1 overflow-auto bg-slate-100">
              <CategorizedBoard board={comunicacao3Board} onSelect={handleSelect} />
            </main>

            <footer className="bg-white border-t border-slate-200 px-4 py-2 text-xs text-slate-500 flex justify-between">
              <span>v0.1 — protótipo</span>
              <span>
                {view === "comunicacao-3"
                  ? `${totalSymbolsC3} símbolos · ${comunicacao3Board.groups.length} categorias`
                  : `${totalSymbolsC3} símbolos · ${comunicacao3Board.groups.length} categorias`}
              </span>
            </footer>
          </>
        ) : (
          <main className="flex-1 overflow-hidden bg-slate-100">
            {view === "jogos-2" ? (
              <JogosMatematica key={jogosSession} />
            ) : view === "rotina-diaria" ? (
              <RotinaDiaria key={jogosSession} />
            ) : (
              <Jogos key={jogosSession} />
            )}
          </main>
        )}
      </div>
    </div>
  );
}
