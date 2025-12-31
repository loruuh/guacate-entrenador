"use client";

import { useState, useEffect } from "react";

interface OnboardingOverlayProps {
  onComplete: () => void;
}

export default function OnboardingOverlay({ onComplete }: OnboardingOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Fade in after mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    // Start fade out animation
    setIsFadingOut(true);

    // After animation completes, call onComplete
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 bg-background ${
        isVisible && !isFadingOut ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-background border-2 border-primary rounded-2xl p-8 max-w-lg w-full shadow-2xl transform transition-all duration-300 ${
          isVisible && !isFadingOut ? "scale-100" : "scale-95"
        }`}
      >
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
          🥑 So funktioniert&apos;s:
        </h2>

        {/* Instructions */}
        <div className="space-y-4 mb-6 text-gray-300">
          <p className="leading-relaxed">
            Du siehst ein <span className="text-white font-semibold">deutsches Wort</span> - überleg kurz!
          </p>
          <p className="leading-relaxed">
            <span className="text-white font-semibold">Tippe</span>, um die spanische Übersetzung zu sehen
          </p>
          <p className="leading-relaxed">
            Ein <span className="text-white font-semibold">Beispielsatz</span> hilft dir, das Wort im Kontext zu verstehen
          </p>
        </div>

        {/* Tips */}
        <div className="border-t border-primary/30 pt-6 mb-8">
          <h3 className="text-xl font-bold text-primary mb-4">💡 Tipps:</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-lg">♥️</span>
              <span className="leading-relaxed">Speichere schwierige Wörter in dein Vokabelheft</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg">🔊</span>
              <span className="leading-relaxed">Höre dir die Aussprache an - klick den Lautsprecher</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg">📊</span>
              <span className="leading-relaxed">Schau deinen Fortschritt in der Statistik an</span>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleComplete}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Los geht&apos;s! 🚀
        </button>
      </div>
    </div>
  );
}
