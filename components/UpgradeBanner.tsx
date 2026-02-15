'use client';

import { useState } from 'react';
import { UpgradeModal } from './UpgradeModal';

export function UpgradeBanner() {
  const [showModal, setShowModal] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Icon + Text */}
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">⚡</span>
            <div className="flex-1">
              <p className="font-semibold text-sm md:text-base">
                <span className="hidden md:inline">🎯 Lerne 10x schneller: </span>
                <span className="text-yellow-300">Alle 2403 Wörter</span> für nur
                <span className="text-white font-bold"> 2,97 €/Monat</span>
              </p>
              <p className="text-xs text-purple-100 hidden sm:block">
                Jederzeit kündbar · 80% Pareto-Prinzip · Fließend in Wochen
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-purple-700 px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-bold text-sm md:text-base hover:bg-yellow-300 hover:scale-105 transition-all shadow-lg whitespace-nowrap"
          >
            🚀 Jetzt upgraden
          </button>

          {/* Close Button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="text-white/80 hover:text-white text-xl md:text-2xl leading-none ml-2"
            aria-label="Banner schließen"
          >
            ×
          </button>
        </div>
      </div>

      <UpgradeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
