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
      className={`w-full space-y-4 cursor-pointer transition-opacity duration-300 ${
        showSentence ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClick}
    >
      {/* Spanish Sentence - Orange Container */}
      <div className="bg-orange-500 text-white px-4 py-3 rounded-xl text-center text-lg md:text-xl font-medium">
        {spanishSentence}
      </div>

      {/* German Translation - Blue Container */}
      {showGermanTranslation && (
        <div className="bg-blue-500 text-white px-4 py-3 rounded-xl text-center text-lg md:text-xl font-medium animate-fadeIn">
          {germanSentence}
        </div>
      )}

      {/* Hint text when translation is not revealed yet */}
      {showSentence && !showGermanTranslation && (
        <div className="text-center">
          <p className="text-sm text-gray-400 animate-pulse">
            Klicke für die Übersetzung
          </p>
        </div>
      )}
    </div>
  );
}
