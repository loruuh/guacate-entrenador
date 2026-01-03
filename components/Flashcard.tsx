"use client";

import { useState } from "react";

interface FlashcardProps {
  german: string;
  spanish: string;
  onReveal?: () => void;
  isRevealed?: boolean;
}

export default function Flashcard({ german, spanish, onReveal, isRevealed: externalIsRevealed }: FlashcardProps) {
  const [internalIsRevealed, setInternalIsRevealed] = useState(false);
  const isRevealed = externalIsRevealed ?? internalIsRevealed;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Verhindert dass der Click zum Main-Container weitergegeben wird
    if (!isRevealed) {
      setInternalIsRevealed(true);
      if (onReveal) {
        onReveal();
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-2xl mx-auto cursor-pointer select-none"
    >
      {/* Deutsches Wort */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          {german}
        </h2>
      </div>

      {/* Spanisches Wort (wird aufgedeckt) - Always rendered for space reservation */}
      <div
        className={`text-center transition-opacity duration-500 min-h-[3.5rem] flex items-center justify-center ${
          isRevealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-3xl md:text-4xl font-semibold text-primary">
          {spanish}
        </p>
      </div>

      {/* Hinweis-Text - Always rendered for space reservation */}
      <div className={`text-center mt-6 transition-opacity duration-300 min-h-[2rem] flex items-center justify-center ${!isRevealed ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-sm text-gray-400 animate-pulse">
          Tippe irgendwo um fortzufahren
        </p>
      </div>
    </div>
  );
}
