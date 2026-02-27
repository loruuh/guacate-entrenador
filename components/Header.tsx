"use client";

import Link from "next/link";
import HistoryButton from "./HistoryButton";
import { NavIcon } from "./NavIcon";

export default function Header() {
  return (
    <header className="w-full bg-background/80 backdrop-blur-lg border-b border-primary/20 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="group relative flex items-center gap-1.5">
          <span className="text-xl font-bold text-white transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            Lingo
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary-light to-purple-400 bg-clip-text text-transparent">
            Luup
          </span>
          <span className="text-xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 inline-block">
            🎯
          </span>
          {/* Animated underline */}
          <div className="absolute -bottom-0.5 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-purple-400 transition-all duration-300 rounded-full" />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <HistoryButton />

          <NavIcon href="/vokabelheft" label="Vokabelheft">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </NavIcon>

          <NavIcon href="/statistik" label="Statistik">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </NavIcon>

          <NavIcon href="/account" label="Account">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </NavIcon>
        </div>
      </div>
    </header>
  );
}
