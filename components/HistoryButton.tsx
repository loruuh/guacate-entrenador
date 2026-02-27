"use client";

import { useState } from "react";
import HistoryOverlay from "./HistoryOverlay";

export default function HistoryButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Historie"
        className="group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110 bg-white/5 border-2 border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:shadow-md hover:shadow-primary/20 overflow-visible"
      >
        <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-full mt-2 px-2.5 py-1 bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700 hidden sm:block z-50">
          Historie
        </div>
      </button>

      <HistoryOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
