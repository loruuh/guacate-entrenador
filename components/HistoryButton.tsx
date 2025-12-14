"use client";

import { useState } from "react";
import HistoryOverlay from "./HistoryOverlay";

export default function HistoryButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
        aria-label="Historie"
      >
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
      </button>

      <HistoryOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
