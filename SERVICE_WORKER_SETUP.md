# Service Worker Setup (Optional)

Die App ist bereits als PWA konfiguriert und kann auf mobilen Geräten zum Homescreen hinzugefügt werden. Ein Service Worker für Offline-Funktionalität ist optional.

## Aktueller Status

✅ **Bereits implementiert:**
- manifest.json mit allen PWA-Einstellungen
- Meta-Tags für iOS und Android
- App-Icons (Platzhalter - siehe public/icons/README.md)
- Installierbar auf Homescreen

## Service Worker hinzufügen (Optional)

Falls Sie erweiterte Offline-Funktionalität wünschen, können Sie `next-pwa` nutzen:

### Schritt 1: next-pwa installieren

```bash
npm install next-pwa
```

### Schritt 2: next.config.ts anpassen

```typescript
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
```

### Schritt 3: .gitignore erweitern

```
# PWA files
/public/sw.js
/public/workbox-*.js
/public/worker-*.js
/public/sw.js.map
/public/workbox-*.js.map
/public/worker-*.js.map
```

### Schritt 4: App neu starten

```bash
npm run dev
```

## Warum ist ein Service Worker optional?

Die App funktioniert bereits als PWA ohne Service Worker:
- Kann zum Homescreen hinzugefügt werden
- Läuft im Standalone-Modus
- Alle Daten werden lokal im LocalStorage gespeichert

Ein Service Worker würde zusätzlich ermöglichen:
- Offline-Nutzung der UI (ohne neue Sätze zu generieren)
- Caching von statischen Assets
- Schnelleres Laden

Da die App die Claude API für Satzgenerierung benötigt, ist vollständige Offline-Funktionalität nicht möglich. Der Service Worker ist daher optional und kann später bei Bedarf hinzugefügt werden.

## Aktuelle Empfehlung

Für die meisten Nutzer ist die aktuelle PWA-Konfiguration ausreichend. Der Service Worker kann bei Bedarf später hinzugefügt werden.
