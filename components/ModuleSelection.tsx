"use client";

import { useModule } from "@/lib/ModuleContext";
import moduleIndex from "@/data/modules/index.json";

export default function ModuleSelection() {
  const { selectModule, getModuleItemCount } = useModule();

  const vocabModules = moduleIndex.filter((m) => m.type === "vocabulary");
  const specialModules = moduleIndex.filter((m) => m.type !== "vocabulary");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            CaptarCherry 🍒
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
            {vocabModules.map((module) => (
              <button
                key={module.id}
                onClick={() => selectModule(module.id)}
                className="bg-white/5 border border-primary/20 p-6 rounded-xl hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 text-left"
              >
                <span className="text-3xl">{module.icon}</span>
                <h3 className="text-lg font-semibold text-white mt-2">
                  {module.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {module.description} ({getModuleItemCount(module.id)} Einheiten)
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Spezial-Module */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Spezial-Module
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specialModules.map((module) => (
              <button
                key={module.id}
                onClick={() => selectModule(module.id)}
                className="bg-white/5 border border-primary/20 p-6 rounded-xl hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 text-left"
              >
                <span className="text-3xl">{module.icon}</span>
                <h3 className="text-lg font-semibold text-white mt-2">
                  {module.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {module.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
