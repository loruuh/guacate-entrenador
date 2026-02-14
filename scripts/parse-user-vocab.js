/**
 * Parse new vocabulary from user file and add to vocabulario-es.json
 * - Reads tab-separated file (spanish\tgerman)
 * - Compares with existing vocabulary
 * - Filters duplicates
 * - Determines word type by heuristics
 * - Adds new entries with sequential IDs
 */

const fs = require('fs');
const path = require('path');

// Paths
const newVocabPath = path.join(__dirname, '../../neue Vokabeln.txt');
const vocabJsonPath = path.join(__dirname, '../data/vocabulario-es.json');

// Load existing vocabulary
console.log('📖 Loading existing vocabulary...');
const existingVocab = JSON.parse(fs.readFileSync(vocabJsonPath, 'utf8'));
console.log(`   Found ${existingVocab.length} existing entries`);

// Create set of existing Spanish words (normalized)
const existingWords = new Set();
existingVocab.forEach(entry => {
  existingWords.add(entry.spanish.toLowerCase().trim());
});
console.log(`   ${existingWords.size} unique Spanish words\n`);

// Function to determine word type
function determineType(spanish) {
  const word = spanish.toLowerCase().trim();

  // Nouns: start with articles
  if (word.startsWith('el ') || word.startsWith('la ') ||
      word.startsWith('los ') || word.startsWith('las ') ||
      word.startsWith('un ') || word.startsWith('una ')) {
    return 'noun';
  }

  // Verbs: end with -ar, -er, -ir (infinitives)
  const lastWord = word.split(' ').pop();
  if (lastWord.endsWith('ar') || lastWord.endsWith('er') || lastWord.endsWith('ir') ||
      lastWord.endsWith('arse') || lastWord.endsWith('erse') || lastWord.endsWith('irse')) {
    return 'verb';
  }

  // Common adjective endings
  const adjEndings = ['ado', 'ido', 'oso', 'osa', 'ivo', 'iva', 'ble', 'ico', 'ica',
                      'ante', 'ente', 'al', 'il', 'ísimo', 'ísima'];
  for (const ending of adjEndings) {
    if (lastWord.endsWith(ending)) {
      return 'adjective';
    }
  }

  // Check for adverbs
  if (lastWord.endsWith('mente')) {
    return 'adverb';
  }

  // Default
  return 'other';
}

// Read and parse new vocabulary file
console.log('📄 Reading new vocabulary file...');
const rawContent = fs.readFileSync(newVocabPath, 'utf8');
const lines = rawContent.split('\n');

const newEntries = [];
const duplicates = [];
let nextId = existingVocab.length + 1;

for (const line of lines) {
  // Skip empty lines and comments
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    continue;
  }

  // Parse tab-separated
  const parts = trimmed.split('\t');
  if (parts.length < 2) {
    continue;
  }

  const spanish = parts[0].trim();
  const german = parts[1].trim();

  if (!spanish || !german) {
    continue;
  }

  // Check for duplicate
  const normalizedSpanish = spanish.toLowerCase().trim();
  if (existingWords.has(normalizedSpanish)) {
    duplicates.push(spanish);
    continue;
  }

  // Add to existing words to prevent duplicates within new entries
  existingWords.add(normalizedSpanish);

  // Create new entry
  const entry = {
    id: String(nextId),
    spanish: spanish,
    german: german,
    type: determineType(spanish),
    sentence_es: "",
    sentence_de: "",
    audio: "",
    word_translations: {}
  };

  newEntries.push(entry);
  nextId++;
}

console.log(`   Parsed ${lines.length} lines\n`);

// Statistics
console.log('📊 Statistics:');
console.log(`   ✅ New vocabulary to add: ${newEntries.length}`);
console.log(`   ⏭️  Duplicates skipped: ${duplicates.length}`);

// Count types
const typeCounts = {};
newEntries.forEach(e => {
  typeCounts[e.type] = (typeCounts[e.type] || 0) + 1;
});
console.log('\n   Word types in new entries:');
Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
  console.log(`      ${type}: ${count}`);
});

// Combine and save
const combinedVocab = [...existingVocab, ...newEntries];
console.log(`\n   📚 Total vocabulary now: ${combinedVocab.length}`);

// Write to file
console.log('\n💾 Saving to vocabulario-es.json...');
fs.writeFileSync(vocabJsonPath, JSON.stringify(combinedVocab, null, 2), 'utf8');

console.log('\n' + '='.repeat(50));
console.log('✅ Done!');
console.log('='.repeat(50));
console.log(`✅ Neue Vokabeln hinzugefügt: ${newEntries.length}`);
console.log(`⏭️  Duplikate übersprungen: ${duplicates.length}`);
console.log(`📚 Total Vokabeln jetzt: ${combinedVocab.length}`);
console.log(`💾 Gespeichert: data/vocabulario-es.json`);

// Show some sample duplicates
if (duplicates.length > 0) {
  console.log('\n   Sample duplicates (first 10):');
  duplicates.slice(0, 10).forEach(d => console.log(`      - ${d}`));
}

// Show some sample new entries
console.log('\n   Sample new entries (first 5):');
newEntries.slice(0, 5).forEach(e => {
  console.log(`      ${e.id}: ${e.spanish} → ${e.german} [${e.type}]`);
});

// Show last 5 entries
console.log('\n   Last 5 entries:');
newEntries.slice(-5).forEach(e => {
  console.log(`      ${e.id}: ${e.spanish} → ${e.german} [${e.type}]`);
});
