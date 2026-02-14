const fs = require('fs');
const path = require('path');

const vocab = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'vocabulario-es.json'), 'utf8'));

// Find max ID excluding number entries
let maxId = 0;
vocab.forEach(v => {
  const id = parseInt(v.id);
  if (id > maxId && v.type !== 'number') maxId = id;
});
console.log('Max non-number ID:', maxId);

// Re-assign IDs to all number entries
let nextId = maxId + 1;
const newVocabIds = [];
vocab.forEach(v => {
  if (v.type === 'number') {
    v.id = String(nextId);
    v.audio = '/audio/' + nextId + '.mp3';
    newVocabIds.push(v.id);
    nextId++;
  }
});
console.log('Reassigned', newVocabIds.length, 'numbers: IDs', newVocabIds[0], '-', newVocabIds[newVocabIds.length - 1]);

fs.writeFileSync(path.join(__dirname, '..', 'data', 'vocabulario-es.json'), JSON.stringify(vocab, null, 2));

// Update zahlen module
const zahlenPath = path.join(__dirname, '..', 'data', 'modules', 'zahlen.json');
const zahlenModule = JSON.parse(fs.readFileSync(zahlenPath, 'utf8'));
zahlenModule.vocabIds = newVocabIds;
fs.writeFileSync(zahlenPath, JSON.stringify(zahlenModule, null, 2));

// Check duplicates
const idCount = {};
vocab.forEach(v => { idCount[v.id] = (idCount[v.id] || 0) + 1; });
const dupes = Object.entries(idCount).filter(([, c]) => c > 1);
console.log('Remaining duplicates:', dupes.length);
console.log('Total vocab:', vocab.length);
