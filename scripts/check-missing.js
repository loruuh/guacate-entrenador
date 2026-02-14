const vocab = require('../data/vocabulario-es.json');
const missing = vocab.filter(v => !v.sentence_es || v.sentence_es === '');
console.log('Vokabeln ohne Sätze:', missing.length);
if (missing.length > 0) {
  console.log('Beispiele:');
  missing.slice(0, 10).forEach(v => console.log('  -', v.id, v.spanish, '/', v.german));
}
console.log('\nTotal Vokabeln:', vocab.length);
