const fs = require('fs');
const path = require('path');

// Lade alle Vokabeln
const vocabPath = path.join(__dirname, '..', 'data', 'vocabulario-es.json');
const vocabulary = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

console.log(`Geladene Vokabeln: ${vocabulary.length}`);

// Sammle alle IDs
const allIds = vocabulary.map(v => parseInt(v.id));

// Fisher-Yates Shuffle
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const shuffled = shuffle(allIds);

// Teile in 5 Gruppen: 4x500 + Rest
const modules = [
  { ids: shuffled.slice(0, 500), num: 1 },
  { ids: shuffled.slice(500, 1000), num: 2 },
  { ids: shuffled.slice(1000, 1500), num: 3 },
  { ids: shuffled.slice(1500, 2000), num: 4 },
  { ids: shuffled.slice(2000), num: 5 },
];

const outputDir = path.join(__dirname, '..', 'data', 'modules');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const icons = ['📘', '📗', '📙', '📕', '📓'];

modules.forEach(({ ids, num }) => {
  const moduleData = {
    id: `vokabeln-${num}`,
    name: `Vokabeln Modul ${num}`,
    description: `${ids.length} zufällige Vokabeln`,
    icon: icons[num - 1],
    type: 'vocabulary',
    vocabIds: ids.map(String),
  };

  const filePath = path.join(outputDir, `vokabeln-${num}.json`);
  fs.writeFileSync(filePath, JSON.stringify(moduleData, null, 2), 'utf8');
  console.log(`Erstellt: vokabeln-${num}.json (${ids.length} Vokabeln)`);
});

console.log('Fertig!');
