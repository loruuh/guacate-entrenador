const fs = require('fs');
const path = require('path');

// Lade alle Vokabeln
const vocabPath = path.join(__dirname, '..', 'data', 'vocabulario-es.json');
const vocabulary = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

// Kommandozeilen-Argument
const searchTerm = process.argv[2];

if (!searchTerm) {
  console.log('Usage: node scripts/check-vocab.js <Wort>');
  console.log('Beispiel: node scripts/check-vocab.js "el tren"');
  console.log('Beispiel: node scripts/check-vocab.js "Zug"');
  process.exit(1);
}

// Suche (case-insensitive)
const searchLower = searchTerm.toLowerCase().trim();
const found = vocabulary.filter(v =>
  v.spanish.toLowerCase().includes(searchLower) ||
  v.german.toLowerCase().includes(searchLower)
);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`  Suche nach: "${searchTerm}"`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (found.length === 0) {
  console.log('  NICHT GEFUNDEN - Vokabel ist NEU!');
  console.log('  -> Du kannst diese Vokabel hinzufuegen.\n');
} else {
  console.log(`  GEFUNDEN - ${found.length} Treffer:\n`);
  found.forEach(v => {
    console.log(`  ID: ${v.id}`);
    console.log(`  DE: ${v.german}`);
    console.log(`  ES: ${v.spanish}`);
    console.log(`  Typ: ${v.type}`);
    if (v.sentence_es) console.log(`  Satz: ${v.sentence_es}`);
    console.log('  ───────────────────');
  });
  console.log('\n  -> Diese Vokabel existiert bereits!\n');
}

console.log(`Total Vokabeln in DB: ${vocabulary.length}\n`);
