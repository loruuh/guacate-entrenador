"use client";

import { useState, useEffect } from "react";
import { useModule } from "@/lib/ModuleContext";
import moduleIndex from "@/data/modules/index.json";
import HistoryButton from "./HistoryButton";
import { NavIcon } from "./NavIcon";
import Link from "next/link";
import { getModulePlayCounts, calcModuleAverage } from "@/lib/round-robin";

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 6.5C12 6.5 8 4 4 6V19C8 17 12 19.5 12 19.5C12 19.5 16 17 20 19V6C16 4 12 6.5 12 6.5Z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6.5V19.5" strokeLinecap="round"/>
  </svg>
);

type LevelColor = { accent: string; bg: string; border: string; glow: string; badge: string };

const LEVEL_GROUPS: { id: string; label: string; sublabel: string; emoji: string; color: LevelColor; moduleIds: string[] }[] = [
  {
    id: "basis",
    label: "Basis",
    sublabel: "Anfänger · A1 – A2",
    emoji: "🌱",
    color: { accent: "#84cc16", bg: "rgba(132,204,22,0.07)", border: "rgba(132,204,22,0.22)", glow: "rgba(132,204,22,0.14)", badge: "rgba(132,204,22,0.12)" },
    moduleIds: ["vokabeln-1", "vokabeln-2", "vokabeln-3"],
  },
  {
    id: "aufbau",
    label: "Aufbau",
    sublabel: "Mittelstufe · A2 – B1",
    emoji: "🔥",
    color: { accent: "#fbbf24", bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.22)", glow: "rgba(251,191,36,0.14)", badge: "rgba(251,191,36,0.12)" },
    moduleIds: ["vokabeln-4", "vokabeln-5", "vokabeln-6", "vokabeln-7"],
  },
  {
    id: "fortgeschritten",
    label: "Fortgeschritten",
    sublabel: "Oberstufe · B1 – C1",
    emoji: "🚀",
    color: { accent: "#f97316", bg: "rgba(249,115,22,0.07)", border: "rgba(249,115,22,0.22)", glow: "rgba(249,115,22,0.14)", badge: "rgba(249,115,22,0.12)" },
    moduleIds: ["vokabeln-8", "vokabeln-9", "vokabeln-10", "vokabeln-11"],
  },
  {
    id: "sammlung",
    label: "Meine Sammlung",
    sublabel: "Eigene Wörter · Filme & Serien",
    emoji: "🆕",
    color: { accent: "#f472b6", bg: "rgba(244,114,182,0.07)", border: "rgba(244,114,182,0.22)", glow: "rgba(244,114,182,0.14)", badge: "rgba(244,114,182,0.12)" },
    moduleIds: ["vokabeln-new"],
  },
  {
    id: "thematisch",
    label: "Thematisch",
    sublabel: "Alle Level",
    emoji: "🌍",
    color: { accent: "#a78bfa", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.22)", glow: "rgba(167,139,250,0.14)", badge: "rgba(167,139,250,0.12)" },
    moduleIds: ["latam", "essen-und-trinken", "formale-vokabeln"],
  },
  {
    id: "verben",
    label: "Verben",
    sublabel: "Konjugationen · 15 Verben",
    emoji: "⚡",
    color: { accent: "#60a5fa", bg: "rgba(96,165,250,0.07)", border: "rgba(96,165,250,0.22)", glow: "rgba(96,165,250,0.14)", badge: "rgba(96,165,250,0.12)" },
    moduleIds: ["verben-ser","verben-estar","verben-tener","verben-haber","verben-ir","verben-hacer","verben-poder","verben-decir","verben-ver","verben-dar","verben-saber","verben-querer","verben-venir","verben-poner","verben-salir"],
  },
];

const TOOL_MODULE_IDS = ["redewendungen", "zahlen", "aussprache-tipps", "lektionen", "lerntipps"];

const TOOL_COLORS: Record<string, LevelColor> = {
  redewendungen:      { accent: "#84cc16", bg: "rgba(132,204,22,0.06)",  border: "rgba(132,204,22,0.20)",  glow: "rgba(132,204,22,0.12)",  badge: "rgba(132,204,22,0.10)"  },
  zahlen:             { accent: "#fbbf24", bg: "rgba(251,191,36,0.06)",  border: "rgba(251,191,36,0.20)",  glow: "rgba(251,191,36,0.12)",  badge: "rgba(251,191,36,0.10)"  },
  "aussprache-tipps": { accent: "#34d399", bg: "rgba(52,211,153,0.06)",  border: "rgba(52,211,153,0.20)",  glow: "rgba(52,211,153,0.12)",  badge: "rgba(52,211,153,0.10)"  },
  lektionen:          { accent: "#22d3ee", bg: "rgba(34,211,238,0.06)",  border: "rgba(34,211,238,0.20)",  glow: "rgba(34,211,238,0.12)",  badge: "rgba(34,211,238,0.10)"  },
  lerntipps:          { accent: "#c084fc", bg: "rgba(192,132,252,0.06)", border: "rgba(192,132,252,0.20)", glow: "rgba(192,132,252,0.12)", badge: "rgba(192,132,252,0.10)" },
};

export default function ModuleSelection() {
  const { selectModule, getModuleItemCount, getModuleVocab } = useModule();
  const [averages, setAverages] = useState<Record<string, number>>({});

  const moduleMap = Object.fromEntries(moduleIndex.map((m) => [m.id, m]));

  useEffect(() => {
    const ids = LEVEL_GROUPS.flatMap((g) => g.moduleIds);
    const result: Record<string, number> = {};
    for (const id of ids) {
      const m = moduleMap[id];
      if (!m || (m.type !== "vocabulary" && m.type !== "phrases")) continue;
      const counts = getModulePlayCounts(id);
      const vocabIds = getModuleVocab(id).map((v) => v.id);
      result[id] = calcModuleAverage(counts, vocabIds);
    }
    setAverages(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "#0d1117" }}>

      {/* Ambient top glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 90% 40% at 50% 0%, rgba(132,204,22,0.07) 0%, transparent 65%)" }}
      />

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{ background: "rgba(13,17,23,0.92)", backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 text-lime-400 group-hover:text-lime-300 transition-colors">
              <BookIcon />
            </div>
            <span className="font-bold text-base tracking-tight text-lime-400">HablaPalabra</span>
          </Link>
          <div className="flex items-center gap-1">
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
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-24">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="text-center pt-14 pb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[11px] font-bold tracking-widest uppercase text-lime-400"
            style={{ background: "rgba(132,204,22,0.08)", border: "1px solid rgba(132,204,22,0.18)" }}
          >
            🇪🇸 Spanisch lernen
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight mb-3"
            style={{
              background: "linear-gradient(135deg, #ecfccb 0%, #84cc16 55%, #4d7c0f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ¿Qué aprendes hoy?
          </h1>
          <p className="text-gray-500 text-sm">
            2.800+ Vokabeln · 19 Module · Komplett kostenlos
          </p>
        </div>

        {/* ── Level Groups ─────────────────────────────────────── */}
        {LEVEL_GROUPS.map((group) => {
          const modules = group.moduleIds
            .map((id) => moduleMap[id])
            .filter(Boolean);

          return (
            <section key={group.id} className="mb-16">

              {/* Section header */}
              <div className="flex items-center gap-4 mb-7">
                <div
                  className="flex items-center gap-3 px-4 py-2 rounded-xl shrink-0"
                  style={{ background: group.color.badge, border: `1px solid ${group.color.border}` }}
                >
                  <span className="text-xl leading-none">{group.emoji}</span>
                  <div>
                    <p className="text-sm font-bold leading-tight" style={{ color: group.color.accent }}>
                      {group.label}
                    </p>
                    <p className="text-[10px] leading-tight" style={{ color: group.color.accent + "88" }}>
                      {group.sublabel}
                    </p>
                  </div>
                </div>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${group.color.border}, transparent)` }} />
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((mod) => {
                  const count = getModuleItemCount(mod.id);
                  return (
                    <button
                      key={mod.id}
                      onClick={() => selectModule(mod.id)}
                      className="group relative text-left rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
                      style={{
                        background: group.color.bg,
                        border: `1px solid ${group.color.border}`,
                        // @ts-ignore
                        "--tw-ring-color": group.color.accent,
                      }}
                    >
                      {/* Top stripe */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                        style={{ background: `linear-gradient(90deg, ${group.color.accent}cc, ${group.color.accent}22, transparent)` }}
                      />
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 60px ${group.color.glow}` }}
                      />

                      <div className="relative p-6">
                        {/* Icon */}
                        <span className="text-5xl leading-none inline-block mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                          {mod.icon}
                        </span>

                        {/* Text */}
                        <h3 className="font-bold text-base text-gray-100 leading-tight mb-1.5">
                          {mod.name}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                          {mod.description}
                        </p>

                        {/* Footer */}
                        <div className="mt-5 flex items-center justify-between">
                          <span className="text-[11px] tabular-nums text-gray-600">
                            {count} Vokabeln
                            {averages[mod.id] !== undefined && (
                              <> · Ø {averages[mod.id].toFixed(1)}×</>
                            )}
                          </span>
                          <span
                            className="text-xs font-semibold flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                            style={{ color: group.color.accent }}
                          >
                            Starten
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* ── Werkzeuge & Extras ───────────────────────────────── */}
        <section>
          <div className="flex items-center gap-4 mb-7">
            <div
              className="flex items-center gap-3 px-4 py-2 rounded-xl shrink-0"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <span className="text-xl leading-none">🛠</span>
              <div>
                <p className="text-sm font-bold text-gray-300 leading-tight">Werkzeuge & Extras</p>
                <p className="text-[10px] text-gray-600 leading-tight">Grammatik · Aussprache · Tipps</p>
              </div>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {TOOL_MODULE_IDS.map((id) => {
              const mod = moduleMap[id];
              if (!mod) return null;
              const c = TOOL_COLORS[id] ?? { accent: "#9ca3af", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.10)", glow: "rgba(255,255,255,0.08)", badge: "rgba(255,255,255,0.04)" };
              const count = getModuleItemCount(id);

              return (
                <button
                  key={id}
                  onClick={() => selectModule(id)}
                  className="group relative text-left rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}
                >
                  {/* Top stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                    style={{ background: `linear-gradient(90deg, ${c.accent}bb, transparent)` }}
                  />
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 40px ${c.glow}` }}
                  />

                  <div className="relative p-4 flex flex-col items-start gap-2.5">
                    <span className="text-3xl leading-none transition-transform duration-300 group-hover:scale-110">
                      {mod.icon}
                    </span>
                    <div>
                      <p className="font-bold text-sm text-gray-200 leading-tight">
                        {mod.name}
                      </p>
                      <p className="text-[11px] tabular-nums mt-0.5" style={{ color: c.accent + "99" }}>
                        {count} Einträge
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
