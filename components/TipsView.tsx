"use client";

import { useModule } from "@/lib/ModuleContext";
import ausspracheTipps from "@/data/modules/aussprache-tipps.json";

export default function TipsView() {
  const { clearModule } = useModule();

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={clearModule}
            className="text-sm text-primary hover:text-primary-light transition-colors"
          >
            &larr; Zuruck zu Modulen
          </button>
          <h1 className="text-xl font-bold text-white">
            {ausspracheTipps.icon} {ausspracheTipps.name}
          </h1>
          <div className="w-24" />
        </div>

        {/* Tips List */}
        <div className="space-y-6">
          {ausspracheTipps.tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white/5 border border-primary/20 rounded-xl p-6 space-y-3"
            >
              <h2 className="text-lg font-bold text-primary">
                {tip.title}
              </h2>

              <p className="text-gray-300">
                {tip.rule}
              </p>

              {tip.mnemonic && (
                <div className="bg-primary/10 border border-primary/30 rounded-md p-3">
                  <p className="text-sm text-primary-light">
                    {tip.mnemonic}
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-400">
                  Beispiele:
                </p>
                {tip.examples.map((ex, i) => (
                  <p
                    key={i}
                    className="text-sm text-gray-300 pl-3"
                  >
                    {ex}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
