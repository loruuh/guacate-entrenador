"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme, themeName } = useTheme();
  const [showToast, setShowToast] = useState(false);

  const handleToggle = () => {
    toggleTheme();
    setShowToast(true);
  };

  // Hide toast after 2 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const getNextThemeName = () => {
    const themeOrder = { ocean: "Sunset", sunset: "Neon", neon: "Ozean" };
    return themeOrder[theme];
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed bottom-4 right-4 p-3 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        aria-label="Toggle theme"
        title={`Wechsel zu ${getNextThemeName()}-Modus`}
      >
        {/* Color palette icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      </button>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-20 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {themeName}
        </div>
      )}
    </>
  );
}
