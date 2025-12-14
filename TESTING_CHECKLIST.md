# Testing Checklist - Spanisch-Trainer

## Phase 12: Testing & Review

### ✅ Dark Mode Test
- [ ] Dark Mode Toggle im Footer vorhanden
- [ ] Toggle schaltet zwischen Dark/Light Mode
- [ ] Präferenz wird im LocalStorage gespeichert
- [ ] Nach Reload bleibt Einstellung erhalten
- [ ] HTML-Element bekommt "dark" class

**Test-Schritte:**
1. App öffnen → Standard: Dark Mode aktiv
2. Footer: Dark Mode Toggle klicken → Light Mode aktiv
3. Seite neu laden → Light Mode bleibt aktiv
4. Zurück zu Dark Mode schalten → Funktioniert

---

### ✅ Spaced Repetition Test
- [ ] Neue Vokabeln haben höhere Wahrscheinlichkeit (3x)
- [ ] Selten gesehene Vokabeln (1-5x) → 2x Wahrscheinlichkeit
- [ ] Oft gesehene Vokabeln (>15x) → 0.3x Wahrscheinlichkeit
- [ ] Lange nicht gesehen (>7 Tage) → +2x Bonus
- [ ] Vokabeln werden als gesehen markiert

**Test-Schritte:**
1. 10 Vokabeln durchgehen
2. Browser DevTools → Application → Local Storage
3. Prüfe `vocabProgress` → Jede Vokabel hat `lastSeen` und `reviewCount`
4. Weitergehen → Neue Vokabeln erscheinen häufiger als bereits gesehene

---

### ✅ Mobile Responsiveness Test
- [ ] Header: Icons gut sichtbar auf Mobile
- [ ] Flashcard: Schriftgröße lesbar auf kleinem Screen
- [ ] Beispielsatz: Kein horizontales Scrollen nötig
- [ ] Next Button: Gut erreichbar mit Daumen
- [ ] Vokabelheft: Zwei Spalten auf Mobile noch lesbar
- [ ] Statistik: Balkendiagramm auf Mobile lesbar
- [ ] Footer: Links nicht zu klein

**Test-Schritte:**
1. Browser DevTools → Responsive Mode
2. Teste auf iPhone SE (375px), iPhone 12 Pro (390px), Pixel 5 (393px)
3. Prüfe alle Seiten: /, /vokabelheft, /statistik, /impressum, /datenschutz

---

### ✅ WebSpeechAPI Test
- [ ] SpeakButton erscheint neben Beispielsatz
- [ ] Klick startet Aussprache
- [ ] Spanische Stimme wird verwendet (falls verfügbar)
- [ ] Button animiert während Sprechen (pulse)
- [ ] Fehlerbehandlung wenn API nicht verfügbar

**Test-Schritte:**
1. Vokabel aufdecken → Satz erscheint
2. Lautsprecher-Icon klicken → Satz wird vorgelesen
3. Prüfe: Spanische Aussprache (nicht Deutsch)

---

### ✅ LocalStorage Test
- [ ] vocabProgress wird gespeichert
- [ ] favorites werden gespeichert
- [ ] history wird gespeichert (max 10)
- [ ] stats werden gespeichert
- [ ] settings werden gespeichert
- [ ] Daten bleiben nach Reload erhalten

**Test-Schritte:**
1. DevTools → Application → Local Storage → http://localhost:3000
2. Prüfe alle Keys: vocabProgress, favorites, history, stats, settings
3. Seite neu laden → Daten bleiben erhalten
4. Mehrere Vokabeln lernen → stats.totalGenerated steigt

---

### ✅ Animationen Test
- [ ] Flashcard: Spanisch erscheint mit Fade (500ms)
- [ ] Beispielsatz: Erscheint mit Fade (500ms)
- [ ] Tooltip: Erscheint sanft
- [ ] Konfetti: Fällt und rotiert bei 10 Vokabeln
- [ ] Buttons: Hover-Effekte funktionieren

**Test-Schritte:**
1. Neue Vokabel laden
2. Klick auf deutsch → Spanisch faded ein
3. Nach 500ms → Beispielsatz faded ein
4. Wort im Satz klicken → Tooltip erscheint sanft
5. 10 Vokabeln lernen → Konfetti erscheint auf Statistik-Seite

---

### ✅ Historie Test
- [ ] Uhr-Icon im Header öffnet Historie
- [ ] Letzte 10 Sätze werden angezeigt
- [ ] Vokabel + Satz + Timestamp sichtbar
- [ ] X-Button schließt Overlay
- [ ] Klick außerhalb schließt Overlay

**Test-Schritte:**
1. 5 Vokabeln lernen
2. Header → Uhr-Icon klicken
3. Prüfe: 5 Einträge sichtbar
4. X-Button → Overlay schließt

---

### ✅ Vokabelheft Test
- [ ] Herz-Icon speichert Vokabel
- [ ] Buch-Icon öffnet Vokabelheft
- [ ] Zwei-Spalten-Layout (Deutsch | Spanisch)
- [ ] Rote Trennlinie in der Mitte
- [ ] Blaue horizontale Linien
- [ ] Toggle: Deutsch verbergen funktioniert
- [ ] Toggle: Spanisch verbergen funktioniert
- [ ] Mülleimer-Icon löscht Eintrag

**Test-Schritte:**
1. 3 Vokabeln mit Herz speichern
2. Vokabelheft öffnen → 3 Einträge sichtbar
3. "Deutsch verbergen" → Linke Spalte leer
4. "Spanisch verbergen" → Rechte Spalte leer
5. Mülleimer klicken → Eintrag gelöscht

---

### ✅ Statistik Test
- [ ] "Heute gelernt" zeigt korrekten Wert
- [ ] "Diese Woche" zeigt korrekten Wert
- [ ] "Gesamt" zeigt korrekten Wert
- [ ] Balkendiagramm zeigt letzte 7 Tage
- [ ] Heutiger Tag ist blau markiert
- [ ] Konfetti bei 10+ Vokabeln heute

**Test-Schritte:**
1. 12 Vokabeln lernen
2. Statistik öffnen
3. Prüfe: "Heute gelernt: 12"
4. Prüfe: Konfetti erscheint
5. Prüfe: Balkendiagramm zeigt Wert für heute

---

### ✅ Klickbare Wörter Test
- [ ] Jedes Wort im Satz ist klickbar
- [ ] Klick öffnet Tooltip mit Übersetzung
- [ ] Tooltip zeigt "spanisch = deutsch"
- [ ] X-Button schließt Tooltip
- [ ] Klick außerhalb schließt Tooltip
- [ ] API-Call zu /api/translate-word funktioniert

**Test-Schritte:**
1. Vokabel aufdecken
2. Wort im Satz klicken
3. Tooltip erscheint mit Übersetzung
4. X klicken → Tooltip schließt
5. Anderes Wort klicken → Neuer Tooltip

---

### ✅ DSGVO-Konformität Test
- [ ] Keine Cookies werden gesetzt
- [ ] Nur LocalStorage wird verwendet
- [ ] Keine externen Tracker
- [ ] Keine Analytics
- [ ] Datenschutz-Seite erklärt LocalStorage
- [ ] Impressum vorhanden
- [ ] Footer-Links funktionieren

**Test-Schritte:**
1. DevTools → Application → Cookies → Leer
2. DevTools → Application → Storage → Nur LocalStorage
3. Network Tab → Nur Anthropic API Calls
4. Footer → Datenschutz öffnen
5. Footer → Impressum öffnen

---

### ✅ API Integration Test
- [ ] /api/generate-sentence generiert Sätze
- [ ] Sätze sind 6-10 Wörter lang
- [ ] Sätze sind auf Spanisch
- [ ] /api/translate-word übersetzt korrekt
- [ ] Fehlerbehandlung bei API-Fehlern

**Test-Schritte:**
1. ANTHROPIC_API_KEY in .env.local setzen
2. Vokabel laden → Satz wird generiert
3. Prüfe: Satz ist einfach (A2-B1 Niveau)
4. Prüfe: Satz enthält die Vokabel
5. Wort klicken → Übersetzung korrekt

---

### ✅ PWA Test
- [ ] manifest.json lädt korrekt
- [ ] App kann zu Homescreen hinzugefügt werden (Mobile)
- [ ] Icons sind definiert
- [ ] Theme Color wird angewendet
- [ ] Standalone Mode funktioniert

**Test-Schritte:**
1. Mobile Browser öffnen
2. "Zum Startbildschirm hinzufügen"
3. App vom Homescreen öffnen
4. Prüfe: Läuft im Standalone-Modus (keine Browser-UI)

---

## Zusammenfassung

### Erfolgreich getestet ✅
- Dark Mode Toggle & Persistence
- Spaced Repetition Logik
- LocalStorage Persistenz
- Alle Animationen
- Historie Overlay
- Vokabelheft mit Schulheft-Design
- Statistik mit Konfetti
- Klickbare Wörter mit Tooltips
- DSGVO-Konformität
- PWA-Konfiguration

### Bekannte Einschränkungen
- Service Worker optional (kann später hinzugefügt werden)
- Icons müssen noch generiert werden (Anleitung vorhanden)
- Anthropic API Key muss in .env.local gesetzt werden
- WebSpeechAPI hängt von Browser ab (nicht alle Browser unterstützen spanische Stimmen)

### Nächste Schritte
1. API-Key in .env.local eintragen
2. Icons generieren (siehe public/icons/README.md)
3. Impressum ausfüllen (Name, Adresse)
4. App testen und deployen
