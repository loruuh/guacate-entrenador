'use client';

import { useEffect, useState } from 'react';

export default function InstallHint() {
  const [showHint, setShowHint] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    const android = /Android/.test(navigator.userAgent);
    setIsAndroid(android);

    if (iOS || android) {
      const dismissed = localStorage.getItem('install-hint-dismissed');
      if (!dismissed) {
        setShowHint(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('install-hint-dismissed', 'true');
    setShowHint(false);
  };

  if (!showHint) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 z-50 shadow-2xl">
      <div className="max-w-md mx-auto flex items-start gap-3">
        <div className="flex-1">
          <div className="font-bold mb-1">Als App installieren</div>
          {isIOS && (
            <div className="text-sm text-blue-100">
              Tippe auf <span className="inline-flex items-center px-1 bg-blue-700 rounded">Teilen</span> dann{' '}
              <span className="inline-flex items-center px-1 bg-blue-700 rounded">Zum Home-Bildschirm</span>
            </div>
          )}
          {isAndroid && (
            <div className="text-sm text-blue-100">
              Tippe auf <span className="inline-flex items-center px-1 bg-blue-700 rounded">Menu</span> dann{' '}
              <span className="inline-flex items-center px-1 bg-blue-700 rounded">Zum Startbildschirm hinzufügen</span>
            </div>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="text-2xl leading-none text-blue-200 hover:text-white"
          aria-label="Hinweis schließen"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
