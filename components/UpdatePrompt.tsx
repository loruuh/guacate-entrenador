"use client";

import { useEffect, useState } from "react";

export default function UpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker.ready.then((registration) => {
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;

        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaitingWorker(newWorker);
              setShowPrompt(true);
            }
          });
        }
      });

      if (registration.waiting) {
        setWaitingWorker(registration.waiting);
        setShowPrompt(true);
      }
    });

    const interval = setInterval(() => {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update();
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-blue-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
        <div>
          <div className="font-semibold">Neue Version verfügbar!</div>
          <div className="text-sm text-blue-100">
            Klicke um zu aktualisieren
          </div>
        </div>
        <button
          onClick={handleUpdate}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Aktualisieren
        </button>
      </div>
    </div>
  );
}
