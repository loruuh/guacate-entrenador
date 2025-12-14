# Spanisch-Trainer PWA

Eine minimalistische, mobile-first Progressive Web App zum Spanisch-Lernen im Karteikarten-Stil.

## Features

### 🎴 Karteikarten-Mechanik
- Deutsches Wort → Klick → Spanische Übersetzung
- Sanfte Fade-Animationen
- Intelligente Spaced Repetition

### 📝 Beispielsätze
- Automatisch generierte Beispielsätze (A2-B1 Niveau)
- Jedes Wort klickbar mit deutscher Übersetzung
- Aussprache-Funktion (WebSpeechAPI)

### 📚 Vokabelheft
- Klassisches Schulheft-Design
- Zwei Spalten: Deutsch | Spanisch
- Rote Trennlinie, blaue Linien
- Toggle zum Verbergen einzelner Spalten (Selbsttest)

### 📊 Statistik
- Heute, diese Woche, gesamt
- Balkendiagramm der letzten 7 Tage
- Konfetti-Animation bei Erreichen des Tagesziels (10 Vokabeln)

### 🧠 Spaced Repetition
- Neue Vokabeln: 3x Wahrscheinlichkeit
- Selten gesehen (1-5x): 2x Wahrscheinlichkeit
- Oft gesehen (>15x): 0.3x Wahrscheinlichkeit
- Bonus für lange nicht gesehene Vokabeln

### 🌙 Dark Mode
- Standard: Dark Mode aktiv
- Toggle im Footer
- Präferenz wird lokal gespeichert

### 🔒 DSGVO-konform
- Alle Daten nur lokal im Browser (LocalStorage)
- Keine Cookies
- Keine Tracking-Tools
- Keine Weitergabe an Dritte

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Anthropic Claude API** (Satzgenerierung & Übersetzung)
- **PWA** (Progressive Web App)

## Installation

### 1. Repository klonen

```bash
cd spanisch-trainer
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. Umgebungsvariablen

Erstelle eine `.env.local` Datei:

```env
ANTHROPIC_API_KEY=dein-api-key-hier
```

Erhalte deinen API-Key bei: https://console.anthropic.com

### 4. Dev-Server starten

```bash
npm run dev
```

App öffnet sich auf: http://localhost:3000

## Projekt-Struktur

```
spanisch-trainer/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── generate-sentence/
│   │   └── translate-word/
│   ├── vokabelheft/         # Vokabelheft-Seite
│   ├── statistik/           # Statistik-Seite
│   ├── impressum/           # Impressum
│   ├── datenschutz/         # Datenschutz
│   ├── layout.tsx           # Root Layout
│   └── page.tsx             # Hauptseite
├── components/              # React-Komponenten
│   ├── Flashcard.tsx
│   ├── Sentence.tsx
│   ├── WordTooltip.tsx
│   ├── SpeakButton.tsx
│   ├── VokabelheftList.tsx
│   ├── ConfettiAnimation.tsx
│   └── ...
├── lib/                     # Utilities
│   ├── local-storage.ts    # LocalStorage Helper
│   └── spaced-repetition.ts # Spaced Repetition Logik
├── data/
│   └── vocabulario-es.json  # 500 spanische Vokabeln
└── public/
    ├── manifest.json        # PWA Manifest
    └── icons/              # App Icons
```

## Vokabeln

Die App enthält **500 sorgfältig ausgewählte Vokabeln**:
- 250 Nomen (mit Artikel: el/la)
- 150 Verben (Infinitiv)
- 100 Adjektive
- Niveau: A2 bis B1
- Alltägliche, nützliche Wörter

## LocalStorage-Struktur

```typescript
vocabProgress: {
  [vocabId: string]: {
    lastSeen: string;      // ISO Date
    reviewCount: number;
  }
}

favorites: string[]        // Vokabel-IDs

history: {
  vocabId: string;
  sentence: string;
  timestamp: string;
}[]                        // Letzte 10 Einträge

stats: {
  totalGenerated: number;
  dailyStats: {
    [date: string]: number;
  }
}

settings: {
  darkMode: boolean;
}
```

## PWA Installation

### Desktop
1. Chrome/Edge öffnen
2. Adressleiste → Install-Icon klicken
3. App wird installiert

### Mobile (iOS)
1. Safari öffnen
2. Teilen-Button → "Zum Home-Bildschirm"
3. App erscheint auf Homescreen

### Mobile (Android)
1. Chrome öffnen
2. Menü → "Zum Startbildschirm hinzufügen"
3. App erscheint auf Homescreen

## App-Icons generieren

Siehe: `public/icons/README.md`

Empfohlen: https://www.pwabuilder.com/imageGenerator

## Deployment

### Vercel (empfohlen)

```bash
npm install -g vercel
vercel
```

### Andere Plattformen

Die App ist eine Standard Next.js App und kann auf jeder Plattform deployed werden, die Next.js unterstützt (Netlify, Railway, etc.).

**Wichtig:** Setze die Umgebungsvariable `ANTHROPIC_API_KEY` in den Deployment-Einstellungen.

## Anpassungen

### Weitere Sprachen hinzufügen

1. Neue Vokabeldatei: `data/vocabulario-fr.json` (für Französisch)
2. Sprachauswahl-Komponente hinzufügen
3. API-Routes anpassen für Sprachwahl

### Eigene Vokabeln

Bearbeite `data/vocabulario-es.json`:

```json
{
  "id": "501",
  "spanish": "la palabra",
  "german": "das Wort",
  "type": "noun"
}
```

## Browser-Unterstützung

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ⚠️ WebSpeechAPI: Nicht alle Browser unterstützen spanische Stimmen

## Lizenz

Dieses Projekt ist für private und kommerzielle Nutzung frei verfügbar.

## Support

Bei Fragen oder Problemen:
- Siehe `TESTING_CHECKLIST.md` für detaillierte Tests
- Siehe `SERVICE_WORKER_SETUP.md` für Service Worker Setup
- Siehe `public/icons/README.md` für Icon-Generierung

## Roadmap (zukünftige Features)

- [ ] Weitere Sprachen (Französisch, Polnisch, etc.)
- [ ] User-Accounts mit Cloud-Sync
- [ ] Premium-Stimmen (ElevenLabs)
- [ ] Offline-Modus mit Service Worker
- [ ] Monetarisierung/Paywall

---

**Viel Erfolg beim Spanisch-Lernen! 🇪🇸**
