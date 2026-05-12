import { useCallback, useEffect, useState } from "react";

/**
 * Hook de Text-To-Speech que prefere automaticamente vozes em pt-BR
 * (e cai para pt-PT, depois qualquer pt-*) usando a Web Speech API
 * disponível em todos os navegadores modernos e também no webview
 * do Tauri 2 (WebView2 / WebKit / WebKitGTK).
 */
export function useTTS() {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [rate, setRate] = useState(0.95);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const pickVoice = () => {
      const all = window.speechSynthesis.getVoices();
      setVoices(all);
      const ptBR = all.find((v) => v.lang === "pt-BR");
      const ptAny = all.find((v) => v.lang.startsWith("pt"));
      const fallback = all[0];
      setVoice(ptBR ?? ptAny ?? fallback ?? null);
    };
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !text.trim()) return;
      // Cancela qualquer fala anterior para evitar fila acumulada
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      if (voice) utter.voice = voice;
      utter.lang = voice?.lang ?? "pt-BR";
      utter.rate = rate;
      utter.pitch = 1;
      window.speechSynthesis.speak(utter);
    },
    [voice, rate, supported]
  );

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  return { speak, stop, voice, voices, setVoice, rate, setRate, supported };
}
