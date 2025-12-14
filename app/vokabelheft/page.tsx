"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VokabelheftList from "@/components/VokabelheftList";
import VokabelheftToggle from "@/components/VokabelheftToggle";
import { getFavorites } from "@/lib/local-storage";

export default function VokabelheftPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hideGerman, setHideGerman] = useState(false);
  const [hideSpanish, setHideSpanish] = useState(false);

  const loadFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e]">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Titel */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Mein Vokabelheft
            </h1>
            <p className="text-gray-300">
              Deine gespeicherten Vokabeln im klassischen Schulheft-Design
            </p>
          </div>

          {/* Toggle Buttons */}
          <VokabelheftToggle
            hideGerman={hideGerman}
            hideSpanish={hideSpanish}
            onToggleGerman={() => setHideGerman(!hideGerman)}
            onToggleSpanish={() => setHideSpanish(!hideSpanish)}
          />

          {/* Vokabelliste */}
          <VokabelheftList
            favorites={favorites}
            onUpdate={loadFavorites}
            hideGerman={hideGerman}
            hideSpanish={hideSpanish}
          />

          {/* Zurück-Button */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-lg transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Zurück zum Lernen
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
