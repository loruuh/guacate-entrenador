const fs = require('fs');
const path = require('path');

// Pfade
const cleanedVocabFile = path.join(__dirname, '..', 'data', 'user-vocab-cleaned.json');
const vocabularioFile = path.join(__dirname, '..', 'data', 'vocabulario-es.json');

function addNewVocabulary() {
  console.log('📖 Lade Dateien...');

  // Lade die gecleanten neuen Vokabeln
  const cleanedData = JSON.parse(fs.readFileSync(cleanedVocabFile, 'utf-8'));
  const newVocabs = cleanedData.new;

  console.log(`✨ ${newVocabs.length} neue Vokabeln gefunden`);

  // Lade bestehende Vokabeln
  const existingVocabs = JSON.parse(fs.readFileSync(vocabularioFile, 'utf-8'));
  console.log(`📚 ${existingVocabs.length} bestehende Vokabeln geladen`);

  // Finde höchste ID
  let maxId = 0;
  existingVocabs.forEach(vocab => {
    const id = parseInt(vocab.id);
    if (id > maxId) {
      maxId = id;
    }
  });

  console.log(`🔢 Höchste ID: ${maxId}`);
  console.log(`🆕 Neue IDs starten ab: ${maxId + 1}`);

  // Erstelle neue Einträge
  const vocabsToAdd = [];
  let currentId = maxId + 1;

  for (const vocab of newVocabs) {
    const newEntry = {
      id: currentId.toString(),
      spanish: vocab.spanish,
      german: vocab.german,
      type: "noun" // Default, kann später angepasst werden
    };

    vocabsToAdd.push(newEntry);
    currentId++;
  }

  console.log(`\n➕ Füge ${vocabsToAdd.length} neue Vokabeln hinzu...`);

  // Füge neue Vokabeln hinzu
  const updatedVocabs = [...existingVocabs, ...vocabsToAdd];

  // Speichere zurück
  fs.writeFileSync(vocabularioFile, JSON.stringify(updatedVocabs, null, 2), 'utf-8');

  console.log(`\n✅ Erfolgreich gespeichert!`);
  console.log(`📊 Neue Anzahl: ${updatedVocabs.length} Vokabeln`);
  console.log(`🆔 ID-Bereich: ${maxId + 1} - ${currentId - 1}`);

  // Zeige Beispiele
  console.log('\n📝 Beispiele der hinzugefügten Vokabeln (erste 10):');
  vocabsToAdd.slice(0, 10).forEach(v => {
    console.log(`   [${v.id}] ${v.german} → ${v.spanish}`);
  });
}

// Script ausführen
try {
  addNewVocabulary();
} catch (err) {
  console.error('❌ Fehler:', err);
  process.exit(1);
}
