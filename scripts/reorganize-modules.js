const fs = require('fs');
const path = require('path');

// Lade Daten
const vocabPath = path.join(__dirname, '..', 'data', 'vocabulario-es.json');
const freqPath = path.join(__dirname, '..', 'data', 'spanish-frequency-3000.json');
const vocabulary = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
const frequencyList = JSON.parse(fs.readFileSync(freqPath, 'utf8'));

console.log(`\n📚 Vokabeln: ${vocabulary.length}`);
console.log(`📊 Frequenz-Liste: ${frequencyList.length} Wörter\n`);

// Normalisiere (ohne Artikel, lowercase)
function normalize(spanish) {
  return spanish
    .toLowerCase()
    .replace(/^(el|la|los|las|un|una|unos|unas)\s+/g, '')
    .replace(/[¿?¡!]/g, '')
    .trim();
}

// Baue Frequenz-Lookup (normalisiert → rank)
const freqMap = new Map();
frequencyList.forEach(f => {
  freqMap.set(normalize(f.spanish), f.rank);
});

// Jeder Vokabel einen Rank zuweisen
const ranked = vocabulary.map(v => {
  const norm = normalize(v.spanish);
  const rank = freqMap.get(norm) || 999;
  return { ...v, _rank: rank };
});

// Sortieren: niedrigster Rank zuerst, bei gleichem Rank nach ID
ranked.sort((a, b) => {
  if (a._rank !== b._rank) return a._rank - b._rank;
  return parseInt(a.id) - parseInt(b.id);
});

// Statistik: wie viele haben einen echten Rank?
const withRank = ranked.filter(v => v._rank < 999).length;
console.log(`🎯 Vokabeln mit Frequenz-Match: ${withRank}`);
console.log(`📝 Ohne Frequenz-Match (Rank 999): ${ranked.length - withRank}\n`);

// In 5 Module aufteilen
const moduleConfig = [
  { id: 'vokabeln-1', icon: '📘', start: 0, end: 500 },
  { id: 'vokabeln-2', icon: '📗', start: 500, end: 1000 },
  { id: 'vokabeln-3', icon: '📙', start: 1000, end: 1500 },
  { id: 'vokabeln-4', icon: '📕', start: 1500, end: 2000 },
  { id: 'vokabeln-5', icon: '📓', start: 2000, end: ranked.length }
];

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 MODUL-REORGANISATION (Pareto-optimiert)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

moduleConfig.forEach(mod => {
  const vocabs = ranked.slice(mod.start, mod.end);
  const vocabIds = vocabs.map(v => v.id);
  const withFreq = vocabs.filter(v => v._rank < 999).length;
  const num = mod.id.split('-')[1];

  // Beschreibung
  let desc;
  if (num === '1') desc = `${vocabs.length} Vokabeln – Top-Frequenz (wichtigste!)`;
  else if (num === '2') desc = `${vocabs.length} Vokabeln – häufig & nützlich`;
  else if (num === '3') desc = `${vocabs.length} Vokabeln – erweitert`;
  else if (num === '4') desc = `${vocabs.length} Vokabeln – fortgeschritten`;
  else desc = `${vocabs.length} Vokabeln – Spezial & Rest`;

  // Modul-Datei schreiben
  const moduleData = {
    id: mod.id,
    name: `Vokabeln Modul ${num}`,
    description: desc,
    icon: mod.icon,
    type: 'vocabulary',
    vocabIds: vocabIds
  };

  fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'modules', `${mod.id}.json`),
    JSON.stringify(moduleData, null, 2)
  );

  // Ausgabe
  console.log(`${mod.icon} Modul ${num}: ${vocabs.length} Vokabeln`);
  console.log(`   Frequenz-Matches: ${withFreq}`);
  if (vocabs.length > 0) {
    const examples = vocabs.slice(0, 5).map(v => v.spanish).join(', ');
    console.log(`   Beispiele: ${examples}`);
  }
  console.log();
});

// Index aktualisieren
const indexPath = path.join(__dirname, '..', 'data', 'modules', 'index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

index.forEach(entry => {
  const mod = moduleConfig.find(m => m.id === entry.id);
  if (mod) {
    const num = mod.id.split('-')[1];
    const count = Math.min(mod.end, ranked.length) - mod.start;
    if (num === '1') entry.description = `${count} Vokabeln – Top-Frequenz (wichtigste!)`;
    else if (num === '2') entry.description = `${count} Vokabeln – häufig & nützlich`;
    else if (num === '3') entry.description = `${count} Vokabeln – erweitert`;
    else if (num === '4') entry.description = `${count} Vokabeln – fortgeschritten`;
    else entry.description = `${count} Vokabeln – Spezial & Rest`;
  }
});

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n✅ Module reorganisiert!');
console.log('✅ index.json aktualisiert!');
console.log('\n🎯 Modul 1 enthält jetzt die wichtigsten Wörter.');
console.log('   Lerne Modul 1 zuerst → maximaler Lerneffekt!\n');
