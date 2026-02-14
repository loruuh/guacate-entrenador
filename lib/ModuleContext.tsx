"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { getAllVocabulary, type Vocabulary } from "./spaced-repetition";

// Module types
import moduleIndex from "@/data/modules/index.json";
import vokabeln1 from "@/data/modules/vokabeln-1.json";
import vokabeln2 from "@/data/modules/vokabeln-2.json";
import vokabeln3 from "@/data/modules/vokabeln-3.json";
import vokabeln4 from "@/data/modules/vokabeln-4.json";
import vokabeln5 from "@/data/modules/vokabeln-5.json";
import zahlenModule from "@/data/modules/zahlen.json";
import ausspracheTipps from "@/data/modules/aussprache-tipps.json";
import redewendungen from "@/data/modules/redewendungen.json";

export interface ModuleInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "vocabulary" | "numbers" | "tips" | "phrases";
  file: string;
}

export interface VocabModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "vocabulary";
  vocabIds: string[];
}

export interface NumberItem {
  id: string;
  spanish: string;
  german: string;
}

export interface NumbersModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "numbers";
  items: NumberItem[];
}

export interface Tip {
  id: string;
  title: string;
  rule: string;
  mnemonic: string;
  examples: string[];
}

export interface TipsModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "tips";
  mode: string;
  tips: Tip[];
}

export interface PhraseItem {
  id: string;
  spanish: string;
  german: string;
  literal: string;
  sentence_es: string;
  sentence_de: string;
  audio: string;
  word_translations: Record<string, string | undefined>;
}

export interface PhrasesModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "phrases";
  phrases: PhraseItem[];
}

export type Module = VocabModule | NumbersModule | TipsModule | PhrasesModule;

// Map module files to imported data
const moduleDataMap: Record<string, Module> = {
  "vokabeln-1": vokabeln1 as unknown as VocabModule,
  "vokabeln-2": vokabeln2 as unknown as VocabModule,
  "vokabeln-3": vokabeln3 as unknown as VocabModule,
  "vokabeln-4": vokabeln4 as unknown as VocabModule,
  "vokabeln-5": vokabeln5 as unknown as VocabModule,
  "zahlen": zahlenModule as unknown as NumbersModule,
  "aussprache-tipps": ausspracheTipps as unknown as TipsModule,
  "redewendungen": redewendungen as unknown as PhrasesModule,
};

interface ModuleContextType {
  modules: ModuleInfo[];
  selectedModule: Module | null;
  selectModule: (id: string) => void;
  clearModule: () => void;
  getModuleVocab: (moduleId: string) => Vocabulary[];
  getModuleItemCount: (moduleId: string) => number;
}

const ModuleContext = createContext<ModuleContextType | null>(null);

export function ModuleProvider({ children }: { children: ReactNode }) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const modules = moduleIndex as ModuleInfo[];

  const selectModule = useCallback((id: string) => {
    const moduleData = moduleDataMap[id];
    if (moduleData) {
      setSelectedModule(moduleData);
    }
  }, []);

  const clearModule = useCallback(() => {
    setSelectedModule(null);
  }, []);

  const getModuleVocab = useCallback((moduleId: string): Vocabulary[] => {
    const moduleData = moduleDataMap[moduleId];
    if (!moduleData) return [];

    if (moduleData.type === "vocabulary") {
      const allVocab = getAllVocabulary();
      const idSet = new Set((moduleData as VocabModule).vocabIds);
      return allVocab.filter((v) => idSet.has(v.id));
    }

    // For numbers module, convert items to Vocabulary-like format
    if (moduleData.type === "numbers") {
      return (moduleData as NumbersModule).items.map((item) => ({
        id: item.id,
        spanish: item.spanish,
        german: item.german,
        type: "noun" as const,
        sentence_es: "",
        sentence_de: "",
        audio: "",
        word_translations: {},
      }));
    }

    // For phrases module, convert phrases to Vocabulary-like format
    if (moduleData.type === "phrases") {
      return (moduleData as PhrasesModule).phrases.map((p) => ({
        id: p.id,
        spanish: p.spanish,
        german: p.german,
        type: "noun" as const,
        sentence_es: p.sentence_es || "",
        sentence_de: p.sentence_de || "",
        audio: p.audio || "",
        word_translations: p.word_translations || {},
      }));
    }

    return [];
  }, []);

  const getModuleItemCount = useCallback((moduleId: string): number => {
    const moduleData = moduleDataMap[moduleId];
    if (!moduleData) return 0;

    if (moduleData.type === "vocabulary") {
      return (moduleData as VocabModule).vocabIds.length;
    }
    if (moduleData.type === "numbers") {
      return (moduleData as NumbersModule).items.length;
    }
    if (moduleData.type === "tips") {
      return (moduleData as TipsModule).tips.length;
    }
    if (moduleData.type === "phrases") {
      return (moduleData as PhrasesModule).phrases.length;
    }
    return 0;
  }, []);

  return (
    <ModuleContext.Provider
      value={{
        modules,
        selectedModule,
        selectModule,
        clearModule,
        getModuleVocab,
        getModuleItemCount,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
}

export function useModule() {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error("useModule must be used within a ModuleProvider");
  }
  return context;
}
