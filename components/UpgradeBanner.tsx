'use client';

import { useState } from 'react';
import { UpgradeModal } from './UpgradeModal';

export function UpgradeBanner() {
  const [showModal, setShowModal] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-2 px-3 md:py-3 md:px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 md:gap-4">
          {/* Icon + Text */}
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <span className="text-lg md:text-2xl shrink-0">⚡</span>
            <div className="min-w-0">
              <p className="font-semibold text-xs md:text-base">
                <span className="hidden md:inline">🎯 Lerne 10x schneller: </span>
                <span className="text-yellow-300">Alle 2403 Wörter</span> für
                <span className="text-white font-bold"> 2,97 €/Monat</span>
              </p>
              <p className="text-[10px] md:text-xs text-purple-100 hidden sm:block">
                Jederzeit kündbar · 80% Pareto-Prinzip · Fließend in Wochen
              </p>
            </div>
          </div>

          {/* Buttons Container */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-purple-700 px-3 py-1.5 md:px-6 md:py-2.5 rounded-lg font-bold text-xs md:text-base hover:bg-yellow-300 hover:scale-105 transition-all shadow-lg whitespace-nowrap"
            >
              🚀 Upgraden
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-white/80 hover:text-white text-xl md:text-2xl leading-none"
              aria-label="Schließen"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <UpgradeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
