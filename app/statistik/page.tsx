"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfettiAnimation from "@/components/ConfettiAnimation";
import { getStats, getTodayCount, getWeekCount, getLast7Days } from "@/lib/local-storage";

export default function StatistikPage() {
  const [todayCount, setTodayCount] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [last7Days, setLast7Days] = useState<{ date: string; count: number }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const stats = getStats();
    const today = getTodayCount();
    const week = getWeekCount();
    const days = getLast7Days();

    setTodayCount(today);
    setWeekCount(week);
    setTotalCount(stats.totalGenerated);
    setLast7Days(days);

    // Zeige Konfetti wenn Tagesziel erreicht
    if (today >= 10) {
      setShowConfetti(true);
    }
  }, []);

  // Finde maximalen Wert für Balkendiagramm-Skalierung
  const maxCount = Math.max(...last7Days.map((d) => d.count), 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {showConfetti && <ConfettiAnimation />}

      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Titel */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Statistik</h1>
            <p className="text-gray-400">Dein Lernfortschritt im Überblick</p>
          </div>

          {/* Statistik-Karten */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Heute */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-primary/20">
              <div className="text-center">
                <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                  Heute gelernt
                </p>
                <p className="text-5xl font-bold text-primary mb-2">
                  {todayCount}
                </p>
                <p className="text-gray-500 text-sm">
                  {todayCount >= 10
                    ? "🎉 Tagesziel erreicht!"
                    : `${10 - todayCount} bis zum Tagesziel`}
                </p>
              </div>
            </div>

            {/* Diese Woche */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-primary/20">
              <div className="text-center">
                <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                  Diese Woche
                </p>
                <p className="text-5xl font-bold text-secondary mb-2">
                  {weekCount}
                </p>
                <p className="text-gray-500 text-sm">Vokabeln</p>
              </div>
            </div>

            {/* Gesamt */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-primary/20">
              <div className="text-center">
                <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                  Gesamt
                </p>
                <p className="text-5xl font-bold text-white mb-2">
                  {totalCount}
                </p>
                <p className="text-gray-500 text-sm">Vokabeln</p>
              </div>
            </div>
          </div>

          {/* Balkendiagramm - Letzte 7 Tage */}
          <div className="bg-gray-800/50 rounded-xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Letzte 7 Tage
            </h2>

            <div className="flex items-end justify-between gap-2 h-64">
              {last7Days.map((day, index) => {
                const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString("de-DE", {
                  weekday: "short",
                });
                const isToday = index === last7Days.length - 1;

                return (
                  <div
                    key={day.date}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    {/* Balken */}
                    <div className="w-full flex flex-col justify-end h-48">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          isToday
                            ? "bg-primary"
                            : day.count > 0
                            ? "bg-secondary"
                            : "bg-gray-700"
                        }`}
                        style={{ height: `${height}%` }}
                      >
                        {day.count > 0 && (
                          <div className="text-center pt-2">
                            <span className="text-white text-sm font-bold">
                              {day.count}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tag */}
                    <p
                      className={`text-sm ${
                        isToday
                          ? "text-primary font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {dayName}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Legende */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Zeigt die Anzahl der gelernten Vokabeln pro Tag
              </p>
            </div>
          </div>

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
