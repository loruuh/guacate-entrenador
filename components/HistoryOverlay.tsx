"use client";

import { useEffect, useState } from "react";
import { getHistory, type HistoryEntry } from "@/lib/local-storage";
import { getVocabById } from "@/lib/spaced-repetition";

interface HistoryOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HistoryOverlay({ isOpen, onClose }: HistoryOverlayProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      const historyData = getHistory();
      setHistory(historyData);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Historie</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Schließen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-gray-400 hover:text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Historie Liste */}
          {history.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Noch keine Sätze gelernt.</p>
              <p className="text-gray-500 text-sm mt-2">
                Deine letzten 10 Sätze werden hier angezeigt.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((entry, index) => {
                const vocab = getVocabById(entry.vocabId);
                return (
                  <div
                    key={`${entry.vocabId}-${entry.timestamp}-${index}`}
                    className="bg-gray-800/50 rounded-xl p-5 border border-primary/20 hover:border-primary/40 transition-colors"
                  >
                    {/* Vokabel */}
                    {vocab && (
                      <div className="mb-3">
                        <span className="text-gray-400 text-sm">
                          {vocab.german}
                        </span>
                        <span className="mx-2 text-gray-600">→</span>
                        <span className="text-primary font-semibold">
                          {vocab.spanish}
                        </span>
                      </div>
                    )}

                    {/* Beispielsatz */}
                    <p className="text-white text-lg mb-2">{entry.sentence}</p>

                    {/* Timestamp */}
                    <p className="text-gray-500 text-xs">
                      {new Date(entry.timestamp).toLocaleString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Info-Text */}
          {history.length > 0 && (
            <p className="text-center text-gray-500 text-sm mt-8">
              Die letzten {history.length} von maximal 10 Sätzen
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
