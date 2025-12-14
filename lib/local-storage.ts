// TypeScript Interfaces für LocalStorage
export interface VocabProgress {
  lastSeen: string; // ISO Date
  reviewCount: number;
}

export interface HistoryEntry {
  vocabId: string;
  sentence: string;
  timestamp: string;
}

export interface DailyStats {
  [date: string]: number; // "2025-01-15": 12
}

export interface Stats {
  totalGenerated: number;
  dailyStats: DailyStats;
}

export interface Settings {
  darkMode: boolean;
}

// LocalStorage Keys
const KEYS = {
  VOCAB_PROGRESS: "vocabProgress",
  FAVORITES: "favorites",
  HISTORY: "history",
  STATS: "stats",
  SETTINGS: "settings",
};

// Helper: Sicheres Lesen aus LocalStorage
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Fehler beim Lesen von ${key}:`, error);
    return defaultValue;
  }
}

// Helper: Sicheres Schreiben in LocalStorage
function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Fehler beim Schreiben von ${key}:`, error);
  }
}

// ===== VOCAB PROGRESS =====
export function getVocabProgress(vocabId: string): VocabProgress | null {
  const allProgress = getFromStorage<Record<string, VocabProgress>>(
    KEYS.VOCAB_PROGRESS,
    {}
  );
  return allProgress[vocabId] || null;
}

export function setVocabProgress(vocabId: string, progress: VocabProgress): void {
  const allProgress = getFromStorage<Record<string, VocabProgress>>(
    KEYS.VOCAB_PROGRESS,
    {}
  );
  allProgress[vocabId] = progress;
  setToStorage(KEYS.VOCAB_PROGRESS, allProgress);
}

export function getAllVocabProgress(): Record<string, VocabProgress> {
  return getFromStorage<Record<string, VocabProgress>>(KEYS.VOCAB_PROGRESS, {});
}

// ===== FAVORITES =====
export function getFavorites(): string[] {
  return getFromStorage<string[]>(KEYS.FAVORITES, []);
}

export function addFavorite(vocabId: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(vocabId)) {
    favorites.push(vocabId);
    setToStorage(KEYS.FAVORITES, favorites);
  }
}

export function removeFavorite(vocabId: string): void {
  const favorites = getFavorites();
  const filtered = favorites.filter((id) => id !== vocabId);
  setToStorage(KEYS.FAVORITES, filtered);
}

export function isFavorite(vocabId: string): boolean {
  return getFavorites().includes(vocabId);
}

// ===== HISTORY =====
export function getHistory(): HistoryEntry[] {
  return getFromStorage<HistoryEntry[]>(KEYS.HISTORY, []);
}

export function addToHistory(entry: HistoryEntry): void {
  const history = getHistory();
  history.unshift(entry); // Neueste zuerst

  // Nur letzte 10 behalten
  const limited = history.slice(0, 10);
  setToStorage(KEYS.HISTORY, limited);
}

// ===== STATS =====
export function getStats(): Stats {
  return getFromStorage<Stats>(KEYS.STATS, {
    totalGenerated: 0,
    dailyStats: {},
  });
}

export function incrementStats(): void {
  const stats = getStats();
  const today = new Date().toISOString().split("T")[0]; // "2025-01-15"

  stats.totalGenerated += 1;
  stats.dailyStats[today] = (stats.dailyStats[today] || 0) + 1;

  setToStorage(KEYS.STATS, stats);
}

export function getTodayCount(): number {
  const stats = getStats();
  const today = new Date().toISOString().split("T")[0];
  return stats.dailyStats[today] || 0;
}

export function getWeekCount(): number {
  const stats = getStats();
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  let count = 0;
  for (const [date, num] of Object.entries(stats.dailyStats)) {
    const entryDate = new Date(date);
    if (entryDate >= weekAgo && entryDate <= today) {
      count += num;
    }
  }

  return count;
}

export function getLast7Days(): { date: string; count: number }[] {
  const stats = getStats();
  const result: { date: string; count: number }[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split("T")[0];
    result.push({
      date: dateStr,
      count: stats.dailyStats[dateStr] || 0,
    });
  }

  return result;
}

// ===== SETTINGS =====
export function getSettings(): Settings {
  return getFromStorage<Settings>(KEYS.SETTINGS, {
    darkMode: true, // Standard: Dark Mode an
  });
}

export function setSettings(settings: Settings): void {
  setToStorage(KEYS.SETTINGS, settings);
}

export function toggleDarkMode(): boolean {
  const settings = getSettings();
  settings.darkMode = !settings.darkMode;
  setToStorage(KEYS.SETTINGS, settings);
  return settings.darkMode;
}
