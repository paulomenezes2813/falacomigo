import { useMemo, useState } from "react";
import { useTTS } from "../hooks/useTTS";
import {
  ACTIVITIES,
  DAYS,
  WEATHER,
  type ActivityCard,
  type DayCard,
  type WeatherCard,
} from "../data/rotinaDiaria";

type SlotKey = "day" | "weather" | 0 | 1 | 2 | 3;

export function RotinaDiaria() {
  const { speak } = useTTS();
  const [day, setDay] = useState<DayCard | null>(null);
  const [weather, setWeather] = useState<WeatherCard | null>(null);
  const [activities, setActivities] = useState<(ActivityCard | null)[]>([
    null, null, null, null,
  ]);
  const [activeSlot, setActiveSlot] = useState<SlotKey>("day");

  // Tipo aceito pelo slot ativo
  const slotType = useMemo<"day" | "weather" | "activity">(() => {
    if (activeSlot === "day") return "day";
    if (activeSlot === "weather") return "weather";
    return "activity";
  }, [activeSlot]);

  const handleDayPick = (d: DayCard) => {
    speak(d.label);
    setDay(d);
    const nxt = !weather ? "weather" : (activities.findIndex((a) => !a) === -1 ? null : activities.findIndex((a) => !a) as 0|1|2|3);
    if (nxt !== null) setActiveSlot(nxt);
  };

  const handleWeatherPick = (w: WeatherCard) => {
    speak(`O dia está ${w.label.toLowerCase()}`);
    setWeather(w);
    const idx = activities.findIndex((a) => !a);
    if (idx !== -1) setActiveSlot(idx as 0 | 1 | 2 | 3);
  };

  const handleActivityPick = (a: ActivityCard) => {
    if (activeSlot !== 0 && activeSlot !== 1 && activeSlot !== 2 && activeSlot !== 3) {
      // Caso usuário não tenha clicado em slot, preenche o próximo vazio
      const idx = activities.findIndex((x) => !x);
      if (idx === -1) return;
      speak(a.label);
      setActivities((prev) => {
        const next = [...prev];
        next[idx] = a;
        return next;
      });
      const after = activities.findIndex((x, i) => i !== idx && !x);
      if (after !== -1) setActiveSlot(after as 0 | 1 | 2 | 3);
      return;
    }
    speak(a.label);
    const idx = activeSlot;
    setActivities((prev) => {
      const next = [...prev];
      next[idx] = a;
      return next;
    });
    // avança
    const newActs = [...activities];
    newActs[idx] = a;
    const after = newActs.findIndex((x) => !x);
    if (after !== -1) setActiveSlot(after as 0 | 1 | 2 | 3);
  };

  const allFilled = !!day && !!weather && activities.every((a) => a !== null);

  const handleSpeakRoutine = () => {
    if (!allFilled) return;
    const phrase =
      `Hoje é ${day!.label.toLowerCase()}. ` +
      `O dia está ${weather!.label.toLowerCase()}. ` +
      `Minha rotina: ` +
      activities.map((a) => a!.label.toLowerCase()).join(", ") +
      ".";
    speak(phrase);
  };

  const handleReset = () => {
    setDay(null);
    setWeather(null);
    setActivities([null, null, null, null]);
    setActiveSlot("day");
  };

  // Slot visual
  const slotClass = (active: boolean, filled: boolean) =>
    `flex flex-col items-center justify-center rounded-2xl border-4
     transition-all p-2
     ${active && !filled
        ? "border-orange-500 bg-orange-50 ring-4 ring-orange-200 animate-pulse-slow"
        : filled
        ? "border-slate-700 bg-white"
        : "border-slate-300 bg-white/60 border-dashed"}`;

  return (
    <div className="h-full overflow-auto bg-amber-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-orange-500 text-white font-extrabold text-xl sm:text-2xl px-5 py-2 rounded-2xl shadow">
            QUADRO DE ROTINA DIÁRIA
          </div>
          <div className="flex gap-2">
            {allFilled && (
              <button
                onClick={handleSpeakRoutine}
                className="px-4 py-2 rounded-xl bg-blue-700 text-white font-semibold shadow hover:bg-blue-800
                           focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                ▶ Falar minha rotina
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-semibold hover:bg-slate-300"
            >
              🔄 Reiniciar
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Quadro */}
          <section className="space-y-3">
            {/* HOJE É */}
            <div className="flex items-stretch gap-2">
              <div className="bg-orange-500 text-white font-extrabold px-4 py-3 rounded-2xl flex items-center min-w-[120px]">
                HOJE É:
              </div>
              <button
                type="button"
                onClick={() => setActiveSlot("day")}
                className={`flex-1 min-h-[64px] ${slotClass(activeSlot === "day", !!day)}`}
              >
                {day ? (
                  <span className="text-lg font-bold text-slate-800">{day.label}</span>
                ) : (
                  <span className="text-slate-400 italic font-semibold">Toque aqui</span>
                )}
              </button>
            </div>

            {/* O DIA ESTÁ */}
            <div className="flex items-stretch gap-2">
              <div className="bg-orange-500 text-white font-extrabold px-4 py-3 rounded-2xl flex items-center min-w-[120px]">
                O DIA ESTÁ:
              </div>
              <button
                type="button"
                onClick={() => setActiveSlot("weather")}
                className={`flex-1 min-h-[64px] ${slotClass(activeSlot === "weather", !!weather)}`}
              >
                {weather ? (
                  <span className="flex items-center gap-2 text-lg font-bold text-slate-800">
                    <span className="text-3xl" aria-hidden>{weather.emoji}</span>
                    {weather.label}
                  </span>
                ) : (
                  <span className="text-slate-400 italic font-semibold">Toque aqui</span>
                )}
              </button>
            </div>

            {/* 4 atividades */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[0, 1, 2, 3].map((i) => {
                const a = activities[i];
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveSlot(i as 0 | 1 | 2 | 3)}
                    className={`min-h-[150px] ${slotClass(activeSlot === i, !!a)}`}
                  >
                    {a ? (
                      <>
                        <span className="text-6xl mb-1" aria-hidden>{a.emoji}</span>
                        <span className="font-bold text-slate-800 text-center text-sm">
                          {a.label}
                        </span>
                      </>
                    ) : (
                      <span className="text-slate-400 italic font-semibold">
                        Toque aqui
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {allFilled && (
              <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-xl text-green-900 text-center font-bold">
                🎉 Sua rotina está pronta! Toque em "Falar minha rotina".
              </div>
            )}
          </section>

          {/* Cartões */}
          <section className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
              {slotType === "day"
                ? "Escolha o dia da semana"
                : slotType === "weather"
                ? "Escolha como está o tempo"
                : `Escolha a atividade ${(activeSlot as number) + 1}`}
            </div>

            {slotType === "day" && (
              <div className="grid grid-cols-2 gap-2">
                {DAYS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleDayPick(d)}
                    className="px-3 py-3 rounded-xl border-2 border-slate-300 bg-white hover:border-orange-400 hover:bg-orange-50
                               font-semibold text-slate-800
                               focus:outline-none focus:ring-4 focus:ring-orange-200 active:scale-95 transition"
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            )}

            {slotType === "weather" && (
              <div className="grid grid-cols-3 gap-2">
                {WEATHER.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => handleWeatherPick(w)}
                    className="flex flex-col items-center px-2 py-3 rounded-xl border-2 border-slate-300 bg-white hover:border-orange-400 hover:bg-orange-50
                               focus:outline-none focus:ring-4 focus:ring-orange-200 active:scale-95 transition"
                  >
                    <span className="text-4xl mb-1" aria-hidden>{w.emoji}</span>
                    <span className="font-semibold text-slate-800 text-sm">{w.label}</span>
                  </button>
                ))}
              </div>
            )}

            {slotType === "activity" && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[480px] overflow-auto pr-1">
                {ACTIVITIES.map((a) => {
                  const used = activities.some((x) => x?.id === a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => !used && handleActivityPick(a)}
                      disabled={used}
                      className={`flex flex-col items-center px-2 py-3 rounded-xl border-2 transition
                                  ${used
                                    ? "border-slate-200 bg-slate-100 opacity-40 cursor-not-allowed"
                                    : "border-slate-300 bg-white hover:border-orange-400 hover:bg-orange-50 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-200"}`}
                    >
                      <span className="text-3xl mb-1" aria-hidden>{a.emoji}</span>
                      <span className="font-semibold text-slate-800 text-[11px] text-center leading-tight">
                        {a.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
