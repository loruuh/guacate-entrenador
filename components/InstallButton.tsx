'use client';

import { useState, useEffect } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // PWA Install Event abfangen
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Wenn schon installiert, Button verstecken
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowButton(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
      setShowButton(false);
    } else {
      console.log('PWA installation dismissed');
    }

    setDeferredPrompt(null);
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 flex items-center gap-2 font-semibold"
      aria-label="App installieren"
    >
      <span className="text-xl">📱</span>
      <span>App installieren</span>
    </button>
  );
}
