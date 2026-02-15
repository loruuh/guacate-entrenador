"use client";

import { useState, useEffect } from "react";
import { useModule } from "@/lib/ModuleContext";
import moduleIndex from "@/data/modules/index.json";
import { useAuth } from "@/lib/useAuth";
import { hasAdvanceAccess, isAdvanceModule } from "@/lib/subscription";
import { AdvanceBadge } from "./AdvanceBadge";
import { UpgradeModal } from "./UpgradeModal";
import { LoginButton } from "./LoginButton";
import Link from "next/link";
import HistoryButton from "./HistoryButton";
import { LearningMethodology } from "./LearningMethodology";

export default function ModuleSelection() {
  const { selectModule, getModuleItemCount } = useModule();
  const { user } = useAuth();
  const [hasAdvance, setHasAdvance] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    if (user) {
      hasAdvanceAccess(user.id).then(setHasAdvance);
    } else {
      setHasAdvance(false);
    }
  }, [user]);

  const vocabModules = moduleIndex.filter((m) => m.type === "vocabulary");
  const specialModules = moduleIndex.filter((m) => m.type !== "vocabulary");

  const handleModuleClick = (moduleId: string) => {
    const needsAdvance = isAdvanceModule(moduleId);
    if (needsAdvance && !hasAdvance) {
      setShowUpgrade(true);
    } else {
      selectModule(moduleId);
    }
  };

  const renderModuleButton = (module: (typeof moduleIndex)[0]) => {
    const needsAdvance = isAdvanceModule(module.id);
    const isLocked = needsAdvance && !hasAdvance;

    return (
      <button
        key={module.id}
        onClick={() => handleModuleClick(module.id)}
        className={`relative bg-white/5 border border-primary/20 p-6 rounded-xl hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 text-left overflow-hidden ${
          isLocked ? "opacity-75" : ""
        }`}
      >
        <span className="text-3xl">{module.icon}</span>
        <h3 className="text-lg font-semibold text-white mt-2">
          {module.name}
          {needsAdvance && <AdvanceBadge />}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          {module.description}
          {module.type === "vocabulary" &&
            ` (${getModuleItemCount(module.id)} Einheiten)`}
        </p>

        {isLocked && (
          <div className="absolute inset-0 bg-gray-900/80 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <div className="text-white font-semibold">Advance</div>
            </div>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header mit Titel und Navigation */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            <span className="text-white">Lingo</span><span className="text-primary">Luup</span>{' 🎯'}
          </h1>

          {/* Navigation + Login - unter Titel auf Mobile, darüber rechts auf Desktop */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:absolute md:top-4 md:right-4">
            <HistoryButton />
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
            <LoginButton />
          </div>

          <p className="text-lg text-gray-400">
            Wähle ein Lern-Modul
          </p>
        </div>

        {/* Lernmethodik */}
        <LearningMethodology />

        {/* Vokabel-Module */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Vokabel-Module
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vocabModules.map(renderModuleButton)}
          </div>
        </div>

        {/* Spezial-Module */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Spezial-Module
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specialModules.map(renderModuleButton)}
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
      />
    </div>
  );
}
