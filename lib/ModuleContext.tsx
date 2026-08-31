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
import vokabeln6 from "@/data/modules/vokabeln-6.json";
import vokabeln7 from "@/data/modules/vokabeln-7.json";
import vokabeln8 from "@/data/modules/vokabeln-8.json";
import vokabeln9 from "@/data/modules/vokabeln-9.json";
import vokabeln10 from "@/data/modules/vokabeln-10.json";
import vokabeln11 from "@/data/modules/vokabeln-11.json";
import vokabelnNew from "@/data/modules/vokabeln-new.json";
import zahlenModule from "@/data/modules/zahlen.json";
import ausspracheTipps from "@/data/modules/aussprache-tipps.json";
import redewendungen from "@/data/modules/redewendungen.json";
import lektionen from "@/data/modules/lektionen.json";
import lerntipps from "@/data/modules/lerntipps.json";
import latam from "@/data/modules/latam.json";
import formalVokabeln from "@/data/modules/formale-vokabeln.json";
import essenUndTrinken from "@/data/modules/essen-und-trinken.json";
import verbenSer from "@/data/modules/verben-ser.json";
import verbenEstar from "@/data/modules/verben-estar.json";
import verbenTener from "@/data/modules/verben-tener.json";
import verbenHaber from "@/data/modules/verben-haber.json";
import verbenIr from "@/data/modules/verben-ir.json";
import verbenHacer from "@/data/modules/verben-hacer.json";
import verbenPoder from "@/data/modules/verben-poder.json";
import verbenDecir from "@/data/modules/verben-decir.json";
import verbenVer from "@/data/modules/verben-ver.json";
import verbenDar from "@/data/modules/verben-dar.json";
import verbenSaber from "@/data/modules/verben-saber.json";
import verbenQuerer from "@/data/modules/verben-querer.json";
import verbenVenir from "@/data/modules/verben-venir.json";
import verbenPoner from "@/data/modules/verben-poner.json";
import verbenSalir from "@/data/modules/verben-salir.json";

export interface ModuleInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "vocabulary" | "numbers" | "tips" | "phrases" | "lessons";
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

export interface TipQuizItem {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Tip {
  id: string;
  title: string;
  rule: string;
  mnemonic: string;
  examples: string[];
  quiz?: TipQuizItem[];
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

export interface LessonExample {
  spanish: string;
  german: string;
  explanation: string;
}

export interface LessonQuizItem {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface LessonItem {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  explanation_de: string;
  examples: LessonExample[];
  quiz: LessonQuizItem[];
}

export interface LessonsModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "lessons";
  lessons: LessonItem[];
}

export type Module = VocabModule | NumbersModule | TipsModule | PhrasesModule | LessonsModule;

// Map module files to imported data
const moduleDataMap: Record<string, Module> = {
  "vokabeln-1":  vokabeln1  as unknown as VocabModule,
  "vokabeln-2":  vokabeln2  as unknown as VocabModule,
  "vokabeln-3":  vokabeln3  as unknown as VocabModule,
  "vokabeln-4":  vokabeln4  as unknown as VocabModule,
  "vokabeln-5":  vokabeln5  as unknown as VocabModule,
  "vokabeln-6":  vokabeln6  as unknown as VocabModule,
  "vokabeln-7":  vokabeln7  as unknown as VocabModule,
  "vokabeln-8":  vokabeln8  as unknown as VocabModule,
  "vokabeln-9":  vokabeln9  as unknown as VocabModule,
  "vokabeln-10": vokabeln10 as unknown as VocabModule,
  "vokabeln-11": vokabeln11 as unknown as VocabModule,
  "vokabeln-new": vokabelnNew as unknown as VocabModule,
  "zahlen": zahlenModule as unknown as NumbersModule,
  "aussprache-tipps": ausspracheTipps as unknown as TipsModule,
  "redewendungen": redewendungen as unknown as PhrasesModule,
  "lektionen": lektionen as unknown as LessonsModule,
  "lerntipps": lerntipps as unknown as TipsModule,
  "latam": latam as unknown as VocabModule,
  "formale-vokabeln": formalVokabeln as unknown as VocabModule,
  "essen-und-trinken": essenUndTrinken as unknown as VocabModule,
  "verben-ser":    verbenSer    as unknown as VocabModule,
  "verben-estar":  verbenEstar  as unknown as VocabModule,
  "verben-tener":  verbenTener  as unknown as VocabModule,
  "verben-haber":  verbenHaber  as unknown as VocabModule,
  "verben-ir":     verbenIr     as unknown as VocabModule,
  "verben-hacer":  verbenHacer  as unknown as VocabModule,
  "verben-poder":  verbenPoder  as unknown as VocabModule,
  "verben-decir":  verbenDecir  as unknown as VocabModule,
  "verben-ver":    verbenVer    as unknown as VocabModule,
  "verben-dar":    verbenDar    as unknown as VocabModule,
  "verben-saber":  verbenSaber  as unknown as VocabModule,
  "verben-querer": verbenQuerer as unknown as VocabModule,
  "verben-venir":  verbenVenir  as unknown as VocabModule,
  "verben-poner":  verbenPoner  as unknown as VocabModule,
  "verben-salir":  verbenSalir  as unknown as VocabModule,
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
    if (moduleData.type === "lessons") {
      return (moduleData as LessonsModule).lessons.length;
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
