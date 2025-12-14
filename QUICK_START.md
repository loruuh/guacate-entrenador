# Quick Start - Spanisch-Trainer

## In 3 Minuten starten

### 1. API-Key eintragen (WICHTIG!)

Öffne `.env.local` und setze deinen Anthropic API-Key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-...
```

**Wo bekomme ich den Key?**
1. Gehe zu https://console.anthropic.com
2. Erstelle ein kostenloses Konto
3. Klicke auf "API Keys"
4. Erstelle einen neuen Key
5. Kopiere den Key in `.env.local`

### 2. Dev-Server starten

```bash
npm run dev
```

### 3. App testen

Öffne http://localhost:3000

**Erste Schritte:**
1. Klicke auf das deutsche Wort → Spanisch wird angezeigt
2. Warte kurz → Beispielsatz erscheint
3. Klicke auf ein Wort im Satz → Übersetzung erscheint
4. Klicke auf Lautsprecher → Satz wird vorgelesen
5. Klicke auf Herz → Vokabel wird gespeichert
6. Klicke auf "Nächster Satz" → Neue Vokabel

**Navigation:**
- **Uhr-Icon** (Header) → Historie der letzten 10 Sätze
- **Buch-Icon** (Header) → Vokabelheft
- **Statistik-Icon** (Header) → Lernstatistik
- **Dark Mode** (Footer) → Zwischen Hell/Dunkel wechseln

## Wichtige Hinweise

### API-Kosten
Die Anthropic API ist **nicht kostenlos**, aber sehr günstig:
- Claude Sonnet: ~$3 pro 1 Million Input-Tokens
- Pro Beispielsatz: ~200 Tokens
- **Kosten:** Ca. $0.0006 pro Vokabel (weniger als 1 Cent)
- **10 Vokabeln:** ~$0.006 (weniger als 1 Cent)
- **100 Vokabeln:** ~$0.06 (6 Cent)

Anthropic bietet oft **Gratis-Credits** für neue Accounts!

### Datenschutz
- Alle Lerndaten werden **nur lokal** im Browser gespeichert
- Keine Cookies, kein Tracking
- 100% DSGVO-konform

### Mobile Nutzung
1. Öffne die App auf deinem Smartphone
2. Browser-Menü → "Zum Startbildschirm hinzufügen"
3. App erscheint auf dem Homescreen
4. Läuft wie eine native App!

## Probleme?

### "API Key fehlt" Fehler
→ Hast du `.env.local` erstellt und den Key eingetragen?
→ Server neu starten: `npm run dev`

### Keine spanische Stimme
→ WebSpeechAPI hängt vom Browser ab
→ Chrome/Edge haben bessere Sprachunterstützung als Firefox

### Icons fehlen
→ Normal! Siehe `public/icons/README.md` für Anleitung
→ App funktioniert auch ohne eigene Icons

## Nächste Schritte

1. **Impressum ausfüllen** → `app/impressum/page.tsx`
2. **Icons generieren** → `public/icons/README.md`
3. **Deployen** → Siehe README.md

## Viel Spaß beim Spanisch-Lernen! 🇪🇸
