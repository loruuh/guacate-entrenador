"use client";

import { useState, useEffect } from "react";

interface SentenceProps {
  spanishSentence: string;
  germanSentence: string;
  isVisible: boolean;
  onTranslationRevealed?: () => void;
}

export default function Sentence({
  spanishSentence,
  germanSentence,
  isVisible,
  onTranslationRevealed,
}: SentenceProps) {
  const [showSentence, setShowSentence] = useState(false);
  const [showGermanTranslation, setShowGermanTranslation] = useState(false);

  // Fade in the Spanish sentence after 500ms delay
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowSentence(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowSentence(false);
      setShowGermanTranslation(false);
    }
  }, [isVisible]);

  const handleClick = () => {
    if (showSentence && !showGermanTranslation) {
      setShowGermanTranslation(true);
      if (onTranslationRevealed) {
        onTranslationRevealed();
      }
    }
  };

  return (
    <div
      className="w-full space-y-4 cursor-pointer"
      onClick={handleClick}
    >
      {/* Spanish Sentence - Theme-aware color - Always rendered with fade-in */}
      <div
        className={`text-white px-4 py-3 rounded-xl text-center text-lg md:text-xl font-medium transition-opacity duration-600 min-h-[4rem] flex items-center justify-center ${
          showSentence ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: 'var(--sentence-spanish)' }}
      >
        {spanishSentence}
      </div>

      {/* German Translation - Theme-aware color - Always rendered, invisible initially */}
      <div
        className={`text-white px-4 py-3 rounded-xl text-center text-lg md:text-xl font-medium transition-opacity duration-600 min-h-[4rem] flex items-center justify-center ${
          showGermanTranslation ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: 'var(--sentence-german)' }}
      >
        {germanSentence}
      </div>

      {/* Hint text when translation is not revealed yet - Always rendered */}
      <div className={`text-center transition-opacity duration-300 min-h-[2rem] flex items-center justify-center ${
        showSentence && !showGermanTranslation ? "opacity-100" : "opacity-0"
      }`}>
        <p className="text-sm text-gray-400 animate-pulse">
          Klicke für die Übersetzung
        </p>
      </div>
    </div>
  );
}
