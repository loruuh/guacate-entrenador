import vocabularyData from "@/data/vocabulario-es.json";
import { getVocabProgress, setVocabProgress } from "./local-storage";

export interface Vocabulary {
  id: string;
  spanish: string;
  german: string;
  type: "noun" | "verb" | "adjective";
}

// Lade alle Vokabeln
export function getAllVocabulary(): Vocabulary[] {
  return vocabularyData as Vocabulary[];
}

// Berechne Gewichtung für eine Vokabel
function calculateWeight(vocabId: string): number {
  const progress = getVocabProgress(vocabId);

  // Standard-Gewichtung basierend auf reviewCount
  let weight = 1;

  if (!progress || progress.reviewCount === 0) {
    // Noch nie gesehen: 3x Wahrscheinlichkeit
    weight = 3;
  } else if (progress.reviewCount >= 1 && progress.reviewCount <= 5) {
    // Wenig gesehen: 2x Wahrscheinlichkeit
    weight = 2;
  } else if (progress.reviewCount >= 6 && progress.reviewCount <= 15) {
    // Regelmäßig gesehen: 1x Wahrscheinlichkeit
    weight = 1;
  } else {
    // Oft gesehen (>15): 0.3x Wahrscheinlichkeit
    weight = 0.3;
  }

  // Bonus für lange nicht gesehen
  if (progress && progress.lastSeen) {
    const lastSeenDate = new Date(progress.lastSeen);
    const now = new Date();
    const daysSince = Math.floor(
      (now.getTime() - lastSeenDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSince > 7) {
      // Mehr als 7 Tage: +2x Bonus
      weight += 2;
    } else if (daysSince > 3) {
      // Mehr als 3 Tage: +1x Bonus
      weight += 1;
    }
  }

  return weight;
}

// Wähle nächste Vokabel aus (gewichtete Zufallsauswahl)
export function selectNextVocab(): Vocabulary {
  const allVocabs = getAllVocabulary();

  // Berechne Gewichtungen für alle Vokabeln
  const weights = allVocabs.map((vocab) => calculateWeight(vocab.id));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  // Gewichtete Zufallsauswahl
  let random = Math.random() * totalWeight;

  for (let i = 0; i < allVocabs.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return allVocabs[i];
    }
  }

  // Fallback (sollte nie passieren)
  return allVocabs[0];
}

// Markiere Vokabel als gesehen
export function markVocabAsSeen(vocabId: string): void {
  const progress = getVocabProgress(vocabId);

  const newProgress = {
    lastSeen: new Date().toISOString(),
    reviewCount: progress ? progress.reviewCount + 1 : 1,
  };

  setVocabProgress(vocabId, newProgress);
}

// Hole Vokabel anhand ID
export function getVocabById(id: string): Vocabulary | undefined {
  const allVocabs = getAllVocabulary();
  return allVocabs.find((vocab) => vocab.id === id);
}
