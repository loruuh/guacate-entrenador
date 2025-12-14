"use client";

import { useState } from "react";

interface FlashcardProps {
  german: string;
  spanish: string;
  onReveal?: () => void;
}

export default function Flashcard({ german, spanish, onReveal }: FlashcardProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
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

      {/* Spanisches Wort (wird aufgedeckt) */}
      <div
        className={`text-center transition-opacity duration-500 ${
          isRevealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-3xl md:text-4xl font-semibold text-primary">
          {spanish}
        </p>
      </div>

      {/* Hinweis-Text (nur wenn noch nicht aufgedeckt) */}
      {!isRevealed && (
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400 animate-pulse">
            Klicke, um die Übersetzung zu sehen
          </p>
        </div>
      )}
    </div>
  );
}
