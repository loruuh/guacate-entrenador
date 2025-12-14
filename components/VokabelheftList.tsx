"use client";

import { getVocabById } from "@/lib/spaced-repetition";
import { removeFavorite } from "@/lib/local-storage";

interface VokabelheftListProps {
  favorites: string[];
  onUpdate: () => void;
  hideGerman: boolean;
  hideSpanish: boolean;
}

export default function VokabelheftList({
  favorites,
  onUpdate,
  hideGerman,
  hideSpanish,
}: VokabelheftListProps) {
  const handleDelete = (vocabId: string) => {
    removeFavorite(vocabId);
    onUpdate();
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-300 text-lg">Dein Vokabelheft ist leer.</p>
        <p className="text-gray-400 text-sm mt-2">
          Klicke auf das Herz-Icon beim Lernen, um Vokabeln hier zu speichern.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Schulheft-Container */}
      <div className="bg-background-light rounded-lg shadow-2xl overflow-hidden border border-gray-300">
        {favorites.map((vocabId, index) => {
          const vocab = getVocabById(vocabId);
          if (!vocab) return null;

          return (
            <div
              key={vocabId}
              className="relative border-b border-blue-200 hover:bg-blue-50/50 transition-colors group"
              style={{
                minHeight: "60px",
                backgroundImage:
                  "linear-gradient(to bottom, transparent 59px, #93c5fd 59px, #93c5fd 60px, transparent 60px)",
              }}
            >
              {/* Rote vertikale Trennlinie in der Mitte */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500"></div>

              <div className="grid grid-cols-2 gap-0 h-full">
                {/* Linke Spalte: Deutsch */}
                <div className="flex items-center px-6 py-4">
                  {!hideGerman && (
                    <span className="text-gray-800 text-lg font-medium">
                      {vocab.german}
                    </span>
                  )}
                </div>

                {/* Rechte Spalte: Spanisch */}
                <div className="flex items-center justify-between px-6 py-4">
                  {!hideSpanish && (
                    <span className="text-gray-800 text-lg font-medium">
                      {vocab.spanish}
                    </span>
                  )}

                  {/* Löschen-Button (erscheint bei Hover) */}
                  <button
                    onClick={() => handleDelete(vocabId)}
                    className="ml-4 p-2 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded-lg transition-all duration-200"
                    aria-label="Vokabel löschen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info-Text */}
      <p className="text-center text-gray-400 text-sm mt-6">
        {favorites.length} {favorites.length === 1 ? "Vokabel" : "Vokabeln"} gespeichert
      </p>
    </div>
  );
}
