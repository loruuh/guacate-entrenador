"use client";

import Link from "next/link";
import HistoryButton from "./HistoryButton";

export default function Header() {
  return (
    <header className="w-full bg-background border-b border-primary/20">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          LingoLoop 🌐
        </Link>

        <div className="flex gap-4">
          {/* Historie Icon (Uhr) */}
          <HistoryButton />

          {/* Vokabelheft Icon (Buch) */}
          <Link
            href="/vokabelheft"
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Vokabelheft"
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </Link>

          {/* Statistik Icon */}
          <Link
            href="/statistik"
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Statistik"
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
