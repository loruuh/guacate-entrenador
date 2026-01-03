# Content Generation Script

Dieses Script generiert statisch alle Beispielsätze und Audio-Dateien für die 1000 Vokabeln.

## Setup

### 1. Dependencies installieren

```bash
npm install
```

Dies installiert:
- `@anthropic-ai/sdk` - für Claude API
- `axios` - für Google TTS API Calls

### 2. Umgebungsvariablen konfigurieren

Erstelle eine `.env` Datei im Root-Verzeichnis:

```bash
cp .env.example .env
```

Fülle die folgenden Werte aus:

**ANTHROPIC_API_KEY**
- Gehe zu https://console.anthropic.com/
- Erstelle einen neuen API Key
- Kopiere ihn in die `.env` Datei

**GOOGLE_CLOUD_TTS_API_KEY**
- Gehe zu https://console.cloud.google.com/apis/credentials
- Aktiviere die "Cloud Text-to-Speech API"
- Erstelle einen neuen API Key (kein Service Account notwendig)
- Kopiere ihn in die `.env` Datei

Beispiel `.env`:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxx
GOOGLE_CLOUD_TTS_API_KEY=AIzaSyCeaiR40fTwjyvO9L0fnEYiy6tSBzV6Py8
```

## Usage

```bash
node scripts/generate-content.js
```

## Was macht das Script?

1. **Liest** alle 1000 Vokabeln aus `data/vocabulario-es.json`
2. **Generiert** für jede Vokabel:
   - Einen spanischen Beispielsatz (via Claude API)
   - Eine deutsche Übersetzung
   - Wort-für-Wort Übersetzungen
   - Eine MP3 Audio-Datei (via Google TTS)
3. **Speichert**:
   - Aktualisierte JSON mit allen Daten
   - 1000 MP3-Dateien in `public/audio/`

## Features

- **Retry Logic**: 3 Versuche bei API-Fehlern
- **Rate Limiting**: 100ms Pause zwischen Requests
- **Progress Logging**: Zeigt Fortschritt für jede Vokabel
- **Error Handling**: Listet fehlgeschlagene IDs am Ende auf
- **Resume**: Kann unterbrochen und fortgesetzt werden

## Erwartete Laufzeit

Bei 1000 Vokabeln und ~100ms Delay:
- **Minimum**: ~15-20 Minuten
- **Mit Retries**: ~25-30 Minuten

## Output

Nach erfolgreichem Durchlauf:

```
spanisch-trainer/
├── data/
│   └── vocabulario-es.json (✨ erweitert mit Sätzen)
└── public/
    └── audio/
        ├── 1.mp3
        ├── 2.mp3
        ├── ...
        └── 1000.mp3
```

Jedes Vokabel-Objekt hat dann:

```json
{
  "id": "1",
  "spanish": "el aguacate",
  "german": "die Avocado",
  "type": "noun",
  "sentence_es": "Me gusta el aguacate en mi ensalada.",
  "sentence_de": "Ich mag die Avocado in meinem Salat.",
  "audio": "/audio/1.mp3",
  "word_translations": {
    "Me": "Mir",
    "gusta": "gefällt",
    "el": "die",
    "aguacate": "Avocado",
    "en": "in",
    "mi": "meinem",
    "ensalada": "Salat"
  }
}
```

## Troubleshooting

**"ANTHROPIC_API_KEY is not set"**
- Prüfe ob `.env` Datei existiert
- Prüfe ob `ANTHROPIC_API_KEY` korrekt gesetzt ist

**"GOOGLE_CLOUD_TTS_API_KEY is not set"**
- Prüfe ob `.env` Datei existiert
- Prüfe ob `GOOGLE_CLOUD_TTS_API_KEY` korrekt gesetzt ist
- Stelle sicher, dass die "Cloud Text-to-Speech API" aktiviert ist

**"Quota exceeded" oder "Rate limit"**
- Warte ein paar Minuten
- Starte das Script erneut (bereits generierte Daten bleiben erhalten)

**Script wurde unterbrochen**
- Einfach erneut starten
- Bereits verarbeitete Vokabeln werden übersprungen
