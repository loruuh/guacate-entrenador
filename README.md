# CaptarCherry 🍒

Eine minimalistische, mobile-first Progressive Web App zum Spanisch-Lernen mit KI-generierten Beispielsätzen.

## Features

### 🎴 Karteikarten-Mechanik
- Deutsches Wort → Klick → Spanische Übersetzung
- Sanfte Fade-Animationen
- Intelligente Spaced Repetition

### 📝 Beispielsätze
- Automatisch generierte Beispielsätze (A2-B1 Niveau)
- Jedes Wort klickbar mit deutscher Übersetzung
- Aussprache-Funktion mit Google Cloud Text-to-Speech (natürliche Stimmen)
- Fallback zu WebSpeechAPI wenn Google TTS nicht verfügbar

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

### 🎨 Drei Farbschemata
- **Ozean-Modus** (Standard): Klassisches dunkles Blau 🌊
- **Sunset-Modus**: Warme Sonnenuntergangs-Farben 🌅
- **Neon-Modus**: Cyberpunk-inspiriertes Design mit Neon Cyan & Magenta 🌃
- Toggle-Button unten rechts rotiert durch alle drei Designs
- Toast-Benachrichtigung zeigt aktuelles Design an
- Präferenz wird lokal gespeichert (LocalStorage)

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
- **Google Cloud Text-to-Speech API** (Natürliche Sprachausgabe)
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

Kopiere die `.env.example` Datei zu `.env.local`:

```bash
cp .env.example .env.local
```

Öffne `.env.local` und füge deine API Keys ein:

```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
GOOGLE_CLOUD_TTS_API_KEY=your_google_cloud_api_key_here
```

**API Keys erhalten:**
- **Anthropic API Key** (erforderlich): https://console.anthropic.com
- **Google Cloud TTS API Key** (optional): Siehe Anleitung unten

**Wichtig:** Die `.env.local` Datei ist in `.gitignore` und wird nicht committet!

#### Google Cloud Text-to-Speech einrichten (Optional)

Die App verwendet Google Cloud TTS für natürlichere Sprachausgabe. Wenn nicht konfiguriert, fällt die App automatisch auf die WebSpeechAPI zurück.

**Vorteile von Google Cloud TTS:**
- Deutlich natürlichere Stimmen (Neural2 Modelle)
- Bessere Aussprache und Intonation
- 1 Million Zeichen pro Monat kostenlos

**Setup-Schritte:**

1. **Google Cloud Projekt erstellen** (falls noch nicht vorhanden)
   - Gehe zu: https://console.cloud.google.com
   - Erstelle ein neues Projekt oder wähle ein bestehendes aus

2. **Cloud Text-to-Speech API aktivieren**
   - Öffne: https://console.cloud.google.com/apis/library/texttospeech.googleapis.com
   - Klicke auf "Aktivieren"

3. **API Key erstellen**
   - Gehe zu: https://console.cloud.google.com/apis/credentials
   - Klicke auf "Anmeldedaten erstellen" → "API-Schlüssel"
   - Kopiere den generierten API Key

4. **API Key einschränken (empfohlen für Sicherheit)**
   - Klicke auf den neu erstellten API Key
   - Unter "API-Einschränkungen" wähle "Schlüssel einschränken"
   - Wähle "Cloud Text-to-Speech API"
   - Speichern

5. **API Key in `.env.local` eintragen**
   ```env
   GOOGLE_CLOUD_TTS_API_KEY=AIzaSy...
   ```

**Kostenlos-Kontingent:**
- 0-1 Million Zeichen/Monat: Kostenlos
- Neural2 Stimmen: $16/Million Zeichen darüber hinaus

Für einen typischen Lernenden bedeutet das: **Komplett kostenlos**, solange du weniger als ~50.000 Sätze pro Monat anhörst.

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
│   │   ├── translate-word/
│   │   └── text-to-speech/  # Google Cloud TTS
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

#### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/spanisch-trainer)

#### Option 2: Manuelles Deployment

1. **Vercel Account erstellen** auf [vercel.com](https://vercel.com)

2. **Projekt importieren**
   - Klicke auf "Add New Project"
   - Importiere dein GitHub Repository

3. **Environment Variables setzen**

   Füge in den Vercel Project Settings folgende Variable hinzu:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
   ```

4. **Deploy**

   Vercel deployed automatisch bei jedem Push auf `main`/`master`

#### Lokalen Build testen

Bevor du deployest, teste den Production Build lokal:

```bash
# Build erstellen
npm run build

# Production Server starten
npm start
```

#### Environment Variables für Vercel

| Variable | Beschreibung | Erforderlich |
|----------|--------------|--------------|
| `ANTHROPIC_API_KEY` | Anthropic Claude API Key für KI-Satzgenerierung | ✅ Ja |
| `GOOGLE_CLOUD_TTS_API_KEY` | Google Cloud Text-to-Speech API Key für natürliche Aussprache | ⚠️ Optional (Fallback zu WebSpeechAPI) |

**Wichtig:**
- Stelle sicher, dass du die Environment Variables in den Vercel Project Settings hinzufügst
- Committe NIEMALS deine API Keys in Git
- Die `.env.local` Datei ist in `.gitignore` und wird nicht deployed
- Ohne `GOOGLE_CLOUD_TTS_API_KEY` funktioniert die App trotzdem (verwendet WebSpeechAPI)

### Andere Plattformen

Die App ist eine Standard Next.js App und kann auf jeder Plattform deployed werden, die Next.js unterstützt (Netlify, Railway, etc.).

**Wichtig:**
- Setze die Umgebungsvariable `ANTHROPIC_API_KEY` in den Deployment-Einstellungen (erforderlich)
- Optional: Setze `GOOGLE_CLOUD_TTS_API_KEY` für bessere Sprachausgabe

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
- 🎙️ **Sprachausgabe:**
  - Google Cloud TTS: Funktioniert in allen modernen Browsern (empfohlen)
  - WebSpeechAPI Fallback: Nicht alle Browser unterstützen spanische Stimmen

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

## Sicherheit

✅ **Best Practices:**
- `.env.local` ist in `.gitignore` enthalten
- API Keys werden niemals im Client-Code exponiert
- API Routes laufen server-side
- Keine sensiblen Daten werden in Git committed

---

Made with ❤️ and 🍒

**Viel Erfolg beim Spanisch-Lernen! 🇪🇸**
