"use client";

import { useState, useEffect } from "react";

interface SpeakButtonProps {
  text: string;
}

export default function SpeakButton({ text }: SpeakButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Prüfe ob Web Speech API verfügbar ist
    if (typeof window !== "undefined" && !window.speechSynthesis) {
      setIsSupported(false);
    }
  }, []);

  const handleSpeak = () => {
    if (!isSupported || !text) return;

    // Stoppe vorherige Wiedergabe
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES"; // Spanisch

    // Versuche eine spanische Stimme zu finden
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(
      (voice) =>
        voice.lang.startsWith("es-") ||
        voice.lang === "es" ||
        voice.name.includes("Spanish")
    );

    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.rate = 0.9; // Etwas langsamer für besseres Lernen
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Lade Stimmen beim Mount (manchmal asynchron)
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  if (!isSupported) {
    return null; // Verstecke Button wenn nicht unterstützt
  }

  return (
    <button
      onClick={handleSpeak}
      disabled={isSpeaking}
      className={`p-3 rounded-full transition-all duration-300 ${
        isSpeaking
          ? "bg-secondary/20 text-secondary"
          : "hover:bg-secondary/10 text-gray-400 hover:text-secondary"
      }`}
      aria-label="Satz vorlesen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-8 h-8 ${isSpeaking ? "animate-pulse" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
    </button>
  );
}
