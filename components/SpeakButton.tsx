"use client";

import { useState, useEffect, useRef } from "react";

interface SpeakButtonProps {
  text: string;
}

export default function SpeakButton({ text }: SpeakButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Prüfe ob Web Speech API verfügbar ist (für Fallback)
    if (typeof window !== "undefined" && !window.speechSynthesis) {
      setIsSupported(false);
    }
  }, []);

  // Fallback zu Web Speech API
  const speakWithWebSpeechAPI = () => {
    console.log("!!! Fallback zu WebSpeechAPI !!!");
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

  const handleSpeak = async () => {
    if (!text || isSpeaking || isLoading) return;

    console.log("=== SpeakButton geklickt ===");
    console.log("Text zum Sprechen:", text);

    // Stoppe vorherige Audio-Wiedergabe
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsLoading(true);

    try {
      // Versuche Google Cloud TTS zu verwenden
      console.log("Versuche Google TTS...");
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      console.log("TTS API Response Status:", response.status);
      console.log("TTS API Response OK:", response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("TTS API Error Data:", errorData);
        throw new Error(`Google Cloud TTS nicht verfügbar: ${response.status}`);
      }

      const data = await response.json();

      if (!data.audioContent) {
        console.log("!!! Keine Audio-Daten erhalten !!!");
        throw new Error("Keine Audio-Daten erhalten");
      }

      console.log("Google TTS Audio-Daten erhalten, starte Wiedergabe...");

      // Base64 Audio in Audio Element laden und abspielen
      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      audioRef.current = audio;

      audio.onplay = () => {
        console.log("Audio-Wiedergabe gestartet");
        setIsSpeaking(true);
        setIsLoading(false);
      };

      audio.onended = () => {
        console.log("Audio-Wiedergabe beendet");
        setIsSpeaking(false);
      };

      audio.onerror = (e) => {
        console.error("!!! Audio-Wiedergabe fehlgeschlagen !!!", e);
        console.log("Grund: Audio-Fehler");
        setIsSpeaking(false);
        setIsLoading(false);
        speakWithWebSpeechAPI();
      };

      await audio.play();
    } catch (error) {
      console.error("!!! Google Cloud TTS Fehler !!!");
      console.log("Fehler:", error);
      console.log("Grund:", error instanceof Error ? error.message : String(error));
      setIsLoading(false);
      // Fallback zur Web Speech API
      speakWithWebSpeechAPI();
    }
  };

  // Lade Stimmen beim Mount (manchmal asynchron) - für Fallback
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
      disabled={isSpeaking || isLoading}
      className={`p-3 rounded-full transition-all duration-300 ${
        isSpeaking || isLoading
          ? "bg-secondary/20 text-secondary"
          : "hover:bg-secondary/10 text-gray-400 hover:text-secondary"
      }`}
      aria-label="Satz vorlesen"
    >
      {isLoading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ) : (
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
      )}
    </button>
  );
}
