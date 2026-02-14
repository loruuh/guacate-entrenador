'use client';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function UpgradeModal({ isOpen, onClose, onUpgrade }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Upgrade zu Premium
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Alle Module freischalten</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Module 2-5, Redewendungen, Zahlen, Tipps</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">2000+ Vokabeln</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Erreiche B2-Niveau</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">❌</span>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Jederzeit kündbar</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Keine Mindestlaufzeit</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 mb-6 text-center">
          <div className="text-white text-3xl font-bold">€2.99</div>
          <div className="text-white text-sm">pro Monat</div>
        </div>

        <button
          onClick={onUpgrade}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-colors"
        >
          Jetzt Premium werden →
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-600 dark:text-gray-400 py-2 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          Vielleicht später
        </button>
      </div>
    </div>
  );
}
