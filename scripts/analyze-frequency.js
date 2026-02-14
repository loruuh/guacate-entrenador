const fs = require('fs');
const path = require('path');

// Lade Frequenz-Liste
const frequencyPath = path.join(__dirname, '..', 'data', 'spanish-frequency-3000.json');
const frequencyList = JSON.parse(fs.readFileSync(frequencyPath, 'utf8'));

// Lade User's Vokabeln
const vocabPath = path.join(__dirname, '..', 'data', 'vocabulario-es.json');
const vocabulary = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

console.log(`\n📚 Geladene Vokabeln: ${vocabulary.length}`);
console.log(`📊 Frequenz-Liste: ${frequencyList.length} Wörter\n`);

// Funktionswörter die wir überspringen (function words)
const functionWords = new Set([
  // Artikel
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  // Pronomen
  'que', 'qué', 'me', 'te', 'se', 'le', 'lo', 'nos', 'les',
  'yo', 'tú', 'él', 'ella', 'nosotros', 'vosotros', 'ellos',
  'mi', 'tu', 'su', 'este', 'esta', 'ese', 'esa', 'esto', 'eso',
  'mí', 'ti', 'sí',
  // Präpositionen
  'de', 'del', 'a', 'al', 'en', 'por', 'para', 'con', 'sin',
  'desde', 'hasta', 'entre', 'ante', 'bajo', 'sobre', 'contra',
  // Konjunktionen
  'y', 'o', 'pero', 'si', 'porque', 'como', 'cuando', 'donde',
  'aunque', 'pues', 'entonces',
  // Häufige Verben (sein/haben/geben)
  'es', 'está', 'son', 'están', 'era', 'fue', 'sido',
  'hay', 'ha', 'han',
  'ser', 'estar', 'haber',
  // Adverbien
  'no', 'sí', 'ya', 'muy', 'más', 'menos', 'bien', 'mal',
  'así', 'tan', 'también', 'tampoco', 'solo', 'ahora', 'aquí',
  'allí', 'siempre', 'nunca', 'después'
]);

function isContentWord(spanish) {
  return !functionWords.has(normalize(spanish));
}

// Normalisiere spanische Wörter (ohne Artikel, lowercase)
function normalize(spanish) {
  return spanish
    .toLowerCase()
    .replace(/^(el|la|los|las|un|una|unos|unas)\s+/g, '')
    .replace(/[¿?¡!]/g, '')
    .trim();
}

// Erstelle Set von User's Wörtern (normalisiert)
const userWords = new Set();
const userWordsMap = new Map();

vocabulary.forEach(v => {
  const normalized = normalize(v.spanish);
  userWords.add(normalized);
  userWordsMap.set(normalized, v);
});

console.log(`🔍 Normalisierte User-Wörter: ${userWords.size}\n`);

// Filtere Frequenzliste: nur Inhaltswörter
const contentWords = frequencyList.filter(item => isContentWord(item.spanish));
const skippedCount = frequencyList.length - contentWords.length;

// Re-rank content words (neue fortlaufende Nummern)
contentWords.forEach((item, i) => {
  item.contentRank = i + 1;
});

console.log(`📝 Inhaltswörter: ${contentWords.length} (${skippedCount} Funktionswörter übersprungen)\n`);

// Analyse: Welche Top-Inhaltswörter hat User?
const tiers = [
  { key: 'top100', limit: 100, label: 'Top 100 Content Words (essentiell)' },
  { key: 'top300', limit: 300, label: 'Top 300 Content Words (Basis)' },
  { key: 'top500', limit: 500, label: 'Top 500 Content Words (A2)' },
  { key: 'top1000', limit: 1000, label: 'Top 1000 Content Words (B1 - PARETO!)' }
];

const analysis = {};
tiers.forEach(t => {
  analysis[t.key] = { have: 0, missing: [], total: 0 };
});

contentWords.forEach(item => {
  const word = normalize(item.spanish);
  const has = userWords.has(word);

  tiers.forEach(t => {
    if (item.contentRank <= t.limit) {
      analysis[t.key].total++;
      if (has) analysis[t.key].have++;
      else analysis[t.key].missing.push(item);
    }
  });
});

// Report
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 INHALTSWÖRTER-ANALYSE (ohne Funktionswörter)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const descriptions = {
  top100: '~50% des gesprochenen Spanisch',
  top300: '~65% des gesprochenen Spanisch',
  top500: '~75% des gesprochenen Spanisch',
  top1000: '~80-85% des gesprochenen Spanisch'
};

tiers.forEach(t => {
  const a = analysis[t.key];
  const total = Math.min(t.limit, contentWords.length);
  const coverage = total > 0 ? Math.round((a.have / total) * 100) : 0;
  a.coverage = coverage;
  console.log(`🎯 ${t.label}:`);
  console.log(`   ✅ Hast du: ${a.have}/${total} (${coverage}%)`);
  console.log(`   ❌ Fehlen: ${total - a.have}`);
  console.log(`   📈 Verständnis: ${descriptions[t.key]}\n`);
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Empfehlung
const bestTier = tiers.reduce((best, t) => {
  const total = Math.min(t.limit, contentWords.length);
  const cov = total > 0 ? (analysis[t.key].have / total) * 100 : 0;
  return cov >= 80 ? t : best;
}, null);

if (bestTier && bestTier.key === 'top1000') {
  console.log('🎉 AUSGEZEICHNET! Du hast das Pareto-Ziel erreicht!');
  console.log('   Du kennst 80%+ der wichtigsten Inhaltswörter.\n');
} else if (analysis.top1000.coverage >= 50) {
  const missing1000 = Math.min(1000, contentWords.length) - analysis.top1000.have;
  console.log('👍 GUT! Du bist auf dem richtigen Weg.');
  console.log(`   Füge die fehlenden ${missing1000} Inhaltswörter hinzu,`);
  console.log('   um das Pareto-Prinzip zu erreichen!\n');
} else {
  const total500 = Math.min(500, contentWords.length);
  const missing500 = total500 - analysis.top500.have;
  console.log('📝 FOKUS EMPFOHLEN: Konzentriere dich auf die Top-500 Inhaltswörter.');
  console.log(`   Füge die fehlenden ${missing500} Wörter hinzu,`);
  console.log('   um A2-Niveau zu erreichen.\n');
}

// Zeige Top 30 fehlende Inhaltswörter
console.log('🚨 TOP 30 FEHLENDE INHALTSWÖRTER (kritische Lücken):\n');
const allMissing = analysis.top1000.missing.length > 0
  ? analysis.top1000.missing
  : analysis.top500.missing;
const topMissing = allMissing
  .sort((a, b) => a.rank - b.rank)
  .slice(0, 30);

topMissing.forEach((item, i) => {
  console.log(`   ${String(i+1).padStart(2)}. #${String(item.rank).padStart(4)} (Content #${String(item.contentRank).padStart(3)}) - ${item.spanish.padEnd(15)} → ${item.german}`);
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Speichere fehlende Wörter
const missing = {};
tiers.forEach(t => {
  missing[t.key] = analysis[t.key].missing;
});

fs.writeFileSync(
  path.join(__dirname, 'missing-words.json'),
  JSON.stringify(missing, null, 2)
);

console.log('💾 Gespeichert: scripts/missing-words.json');
console.log('   (Nur Inhaltswörter - keine Funktionswörter!)\n');

// Statistik
console.log('📊 ZUSAMMENFASSUNG:\n');
console.log(`   Total Vokabeln: ${vocabulary.length}`);
console.log(`   Frequenz-Liste: ${frequencyList.length} (davon ${contentWords.length} Inhaltswörter)`);
console.log(`   Übersprungen: ${skippedCount} Funktionswörter`);
tiers.forEach(t => {
  const total = Math.min(t.limit, contentWords.length);
  console.log(`   ${t.key} Coverage: ${analysis[t.key].coverage}% (${analysis[t.key].have}/${total})`);
});
const pareto = analysis.top1000.coverage;
console.log(`   Pareto-Ziel (80%): ${pareto >= 80 ? '✅ ERREICHT' : `❌ Noch ${80 - pareto}% fehlen`}\n`);
