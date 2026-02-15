"use client";

import { useState, useEffect } from "react";
import { useModule } from "@/lib/ModuleContext";
import moduleIndex from "@/data/modules/index.json";
import { useAuth } from "@/lib/useAuth";
import { hasAdvanceAccess, isAdvanceModule } from "@/lib/subscription";
import { AdvanceBadge } from "./AdvanceBadge";
import { UpgradeModal } from "./UpgradeModal";
import { LoginButton } from "./LoginButton";

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
      {/* Login Button oben rechts */}
      <div className="absolute top-4 right-4">
        <LoginButton />
      </div>

      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            LingoLoop 🌐
          </h1>
          <p className="text-lg text-gray-400">
            Wähle ein Lern-Modul
          </p>
        </div>

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
