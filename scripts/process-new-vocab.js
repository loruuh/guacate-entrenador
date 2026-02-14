const fs = require('fs');
const path = require('path');

// User's neue Vokabeln (bereinigt mit Artikeln)
const newVocabs = [
  { spanish: 'adicto', german: 'süchtig', type: 'adjective' },
  { spanish: 'el cacho', german: 'das Stück', type: 'noun' },
  { spanish: 'masculino', german: 'männlich', type: 'adjective' },
  { spanish: 'femenino', german: 'weiblich', type: 'adjective' },
  { spanish: 'los paisajes', german: 'die Landschaften', type: 'noun' },
  { spanish: 'alucinante', german: 'atemberaubend', type: 'adjective' },
  { spanish: 'el glaciar', german: 'der Gletscher', type: 'noun' },
  { spanish: 'alcanzar', german: 'erreichen', type: 'verb' },
  { spanish: 'kilómetros por hora', german: 'Kilometer pro Stunde', type: 'noun' },
  { spanish: 'derribar', german: 'umwerfen', type: 'verb' },
  { spanish: 'demostrar', german: 'zeigen/beweisen', type: 'verb' },
  { spanish: 'la altura', german: 'die Höhe', type: 'noun' },
  { spanish: 'la caminata', german: 'die Wanderung', type: 'noun' },
  { spanish: 'capaz', german: 'fähig', type: 'adjective' },
  { spanish: 'las torres', german: 'die Türme', type: 'noun' },
  { spanish: 'despejado', german: 'wolkenfrei', type: 'adjective' },
  { spanish: 'las golosinas', german: 'die Süßigkeiten', type: 'noun' },
  { spanish: 'desertar', german: 'desertieren/verlassen', type: 'verb' },
  { spanish: 'el fin del mundo', german: 'das Ende der Welt', type: 'noun' },
  { spanish: 'tan duro', german: 'so hart', type: 'adjective' },
  { spanish: 'los bastones', german: 'die Trekkingstöcke', type: 'noun' },
  { spanish: 'escalar', german: 'klettern', type: 'verb' },
  { spanish: 'el muro', german: 'die Mauer', type: 'noun' },
  { spanish: 'evitar', german: 'vermeiden', type: 'verb' },
  { spanish: 'el símbolo', german: 'das Symbol', type: 'noun' },
  { spanish: 'las probabilidades', german: 'die Wahrscheinlichkeiten', type: 'noun' },
  { spanish: 'el noroeste', german: 'der Nordwesten', type: 'noun' },
  { spanish: 'tocado', german: 'bekloppt', type: 'adjective' },
  { spanish: 'la belleza', german: 'die Schönheit', type: 'noun' },
  { spanish: 'la parada', german: 'die Haltestelle', type: 'noun' },
  { spanish: 'la movida', german: 'das Nachtleben', type: 'noun' },
  { spanish: 'el norte', german: 'der Norden', type: 'noun' },
  { spanish: 'el sur', german: 'der Süden', type: 'noun' },
  { spanish: 'el este', german: 'der Osten', type: 'noun' },
  { spanish: 'el oeste', german: 'der Westen', type: 'noun' },
  { spanish: 'formado', german: 'geformt', type: 'adjective' },
  { spanish: 'volcánico', german: 'vulkanisch', type: 'adjective' },
  { spanish: 'calentar', german: 'erwärmen', type: 'verb' },
  { spanish: 'un rato', german: 'eine Weile', type: 'noun' },
  { spanish: 'lanzar', german: 'werfen', type: 'verb' },
  { spanish: 'acá', german: 'hier', type: 'other' },
  { spanish: 'precisamente', german: 'ausgerechnet', type: 'other' },
  { spanish: 'la babosa', german: 'die Schnecke', type: 'noun' },
  { spanish: 'la chibola', german: 'das Mädchen (Slang)', type: 'noun' },
  { spanish: 'monísimo', german: 'megasüß', type: 'adjective' },
  { spanish: 'tía', german: 'Alter (umg.)', type: 'other' },
  { spanish: 'la muñeca', german: 'die Puppe', type: 'noun' },
  { spanish: 'haber', german: 'haben (Hilfsverb)', type: 'verb' },
  { spanish: 'agotar', german: 'erschöpfen', type: 'verb' },
  { spanish: 'la fecha', german: 'das Datum', type: 'noun' },
  { spanish: 'el anfitrión', german: 'der Gastgeber', type: 'noun' },
  { spanish: 'los codos', german: 'die Ellenbogen', type: 'noun' },
  { spanish: 'desapercibido', german: 'unbemerkt', type: 'adjective' },
  { spanish: 'lamentablemente', german: 'leider', type: 'other' },
  { spanish: 'enero', german: 'Januar', type: 'noun' },
  { spanish: 'febrero', german: 'Februar', type: 'noun' },
  { spanish: 'marzo', german: 'März', type: 'noun' },
  { spanish: 'abril', german: 'April', type: 'noun' },
  { spanish: 'mayo', german: 'Mai', type: 'noun' },
  { spanish: 'junio', german: 'Juni', type: 'noun' },
  { spanish: 'julio', german: 'Juli', type: 'noun' },
  { spanish: 'agosto', german: 'August', type: 'noun' },
  { spanish: 'septiembre', german: 'September', type: 'noun' },
  { spanish: 'octubre', german: 'Oktober', type: 'noun' },
  { spanish: 'noviembre', german: 'November', type: 'noun' },
  { spanish: 'diciembre', german: 'Dezember', type: 'noun' },
  { spanish: 'Pulgarcito', german: 'Spitzname für El Salvador', type: 'noun' },
  { spanish: 'apoyar', german: 'unterstützen', type: 'verb' },
  { spanish: 'la elección', german: 'die Wahl', type: 'noun' },
  { spanish: 'la almohada', german: 'das Bettkissen', type: 'noun' },
  { spanish: 'el cojín', german: 'das Sofakissen', type: 'noun' },
];

// Lade existierende Vokabeln
const vocabPath = path.join(__dirname, '..', 'data', 'vocabulario-es.json');
const vocabulary = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

// Prüfe auf Duplikate (case-insensitive, trimmed)
const newOnes = [];
const duplicates = [];

newVocabs.forEach(newV => {
  // Prüfe Stammwort ohne Artikel
  const searchSpanish = newV.spanish.toLowerCase().trim();
  const exists = vocabulary.find(v => {
    const existing = v.spanish.toLowerCase().trim();
    return existing === searchSpanish;
  });

  if (exists) {
    duplicates.push({ ...newV, existingId: exists.id, existingGerman: exists.german });
  } else {
    newOnes.push(newV);
  }
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  DUPLIKAT-CHECK ERGEBNIS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`  Neue Vokabeln:     ${newOnes.length}`);
console.log(`  Duplikate:         ${duplicates.length}`);
console.log(`  Total geprueft:    ${newVocabs.length}\n`);

if (duplicates.length > 0) {
  console.log('Duplikate (uebersprungen):');
  duplicates.forEach(d => {
    console.log(`  - ${d.spanish} = ${d.existingGerman} (ID: ${d.existingId})`);
  });
  console.log('');
}

// --- SCHRITT 2: Neue Vokabeln hinzufuegen ---

let nextId = Math.max(...vocabulary.map(v => parseInt(v.id))) + 1;
const newVocabIds = [];

newOnes.forEach(v => {
  const newEntry = {
    id: String(nextId),
    spanish: v.spanish,
    german: v.german,
    type: v.type,
    sentence_es: '',
    sentence_de: '',
    audio: '',
    word_translations: {}
  };

  vocabulary.push(newEntry);
  newVocabIds.push(String(nextId));
  nextId++;
});

// Speichere aktualisierte vocabulario-es.json
fs.writeFileSync(vocabPath, JSON.stringify(vocabulary, null, 2));
console.log(`Vocabulario aktualisiert: ${vocabulary.length} Vokabeln total\n`);

// --- SCHRITT 3: Modul 5 aktualisieren ---

const module5Path = path.join(__dirname, '..', 'data', 'modules', 'vokabeln-5.json');
const module5 = JSON.parse(fs.readFileSync(module5Path, 'utf8'));

const spaceInModule5 = 500 - module5.vocabIds.length;
console.log(`Modul 5 vorher: ${module5.vocabIds.length} Vokabeln (Platz fuer ${spaceInModule5} weitere)`);

const idsForModule5 = newVocabIds.slice(0, spaceInModule5);
const overflow = newVocabIds.slice(spaceInModule5);

module5.vocabIds.push(...idsForModule5);
module5.description = `${module5.vocabIds.length} Vokabeln`;
fs.writeFileSync(module5Path, JSON.stringify(module5, null, 2));

console.log(`Modul 5 nachher: ${module5.vocabIds.length} Vokabeln`);
console.log(`  -> ${idsForModule5.length} neue IDs hinzugefuegt\n`);

if (overflow.length > 0) {
  console.log(`WARNUNG: ${overflow.length} Vokabeln passen nicht mehr in Modul 5!`);
  console.log(`Uebrige IDs: ${overflow.join(', ')}`);
  console.log('-> Bitte Modul 6 erstellen.\n');
}

// --- Update modules/index.json ---

const indexPath = path.join(__dirname, '..', 'data', 'modules', 'index.json');
const moduleIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const mod5Index = moduleIndex.find(m => m.id === 'vokabeln-5');
if (mod5Index) {
  mod5Index.description = `${module5.vocabIds.length} Vokabeln`;
  fs.writeFileSync(indexPath, JSON.stringify(moduleIndex, null, 2));
  console.log('modules/index.json aktualisiert\n');
}

// Zusammenfassung
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  ZUSAMMENFASSUNG');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`  ${newOnes.length} neue Vokabeln hinzugefuegt`);
console.log(`  ${duplicates.length} Duplikate uebersprungen`);
console.log(`  Modul 5: ${module5.vocabIds.length}/500 Vokabeln`);
console.log(`  Naechster Schritt: node scripts/generate-content.js`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
