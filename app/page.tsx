"use client";

import { useState, useEffect } from "react";
import { useModule } from "@/lib/ModuleContext";
import ModuleSelection from "@/components/ModuleSelection";
import TipsView from "@/components/TipsView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Flashcard from "@/components/Flashcard";
import Sentence from "@/components/Sentence";
import SpeakButton from "@/components/SpeakButton";
import FavoriteButton from "@/components/FavoriteButton";
import NextButton from "@/components/NextButton";
import ThemeToggle from "@/components/ThemeToggle";
import OnboardingOverlay from "@/components/OnboardingOverlay";
import InstallButton from "@/components/InstallButton";
import {
  selectNextVocab,
  markVocabAsSeen,
  type Vocabulary,
} from "@/lib/spaced-repetition";
import {
  addToHistory,
  incrementStats,
  getTodayGoal,
  incrementTodayGoal,
  type DailyGoal,
} from "@/lib/local-storage";

export default function Home() {
  const { selectedModule, clearModule, getModuleVocab } = useModule();

  const [currentVocab, setCurrentVocab] = useState<Vocabulary | null>(null);
  const [spanishSentence, setSpanishSentence] = useState<string>("");
  const [germanSentence, setGermanSentence] = useState<string>("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [showSentence, setShowSentence] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [dailyGoal, setDailyGoal] = useState<DailyGoal | null>(null);

  // Check onboarding status beim Mount
  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboardingComplete");
    if (onboardingComplete !== "true") {
      setShowOnboarding(true);
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, []);

  // Lade Daily Goal + erste Vokabel wenn ein Modul ausgewählt wird
  useEffect(() => {
    if (selectedModule && selectedModule.type !== "tips" && isInitialized && !showOnboarding) {
      setDailyGoal(getTodayGoal(selectedModule.id));
      loadNextVocab();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModule]);

  const loadNextVocab = () => {
    setIsLoading(true);
    setIsRevealed(false);
    setShowSentence(false);
    setShowNextButton(false);
    setSpanishSentence("");
    setGermanSentence("");

    try {
      let vocab: Vocabulary;

      if (selectedModule && selectedModule.type !== "tips") {
        const moduleVocabs = getModuleVocab(selectedModule.id);
        vocab = selectNextVocab(moduleVocabs, selectedModule.id);
        markVocabAsSeen(vocab.id, selectedModule.id);
      } else {
        vocab = selectNextVocab();
        markVocabAsSeen(vocab.id);
      }

      setCurrentVocab(vocab);
      incrementStats();
    } catch (error) {
      console.error("Fehler beim Laden der Vokabel:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReveal = () => {
    setIsRevealed(true);

    if (!currentVocab) return;

    setSpanishSentence(currentVocab.sentence_es);
    setGermanSentence(currentVocab.sentence_de);
    setShowSentence(true);

    addToHistory({
      vocabId: currentVocab.id,
      sentence: currentVocab.sentence_es,
      timestamp: new Date().toISOString(),
    });
  };

  const handleTranslationRevealed = () => {
    setShowNextButton(true);
  };

  // "Nächster Satz" → zählt zum Tagesziel
  const handleNext = () => {
    if (selectedModule) {
      const updated = incrementTodayGoal(selectedModule.id);
      setDailyGoal(updated);
    }
    loadNextVocab();
  };

  // Skip → zählt NICHT zum Tagesziel
  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    loadNextVocab();
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingComplete", "true");
    setShowOnboarding(false);
  };

  const handleBackToModules = () => {
    setCurrentVocab(null);
    setDailyGoal(null);
    clearModule();
  };

  // Onboarding
  if (showOnboarding) {
    return (
      <div className="min-h-screen flex flex-col">
        <OnboardingOverlay onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  // Kein Modul gewählt → Modul-Auswahl
  if (!selectedModule) {
    return <ModuleSelection />;
  }

  // Tipps-Modul → TipsView
  if (selectedModule.type === "tips") {
    return <TipsView />;
  }

  // Loading / noch keine Vokabel
  if (!isInitialized || !currentVocab) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-400 mt-4">Ladt...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleMainClick = () => {
    if (!isRevealed) {
      handleReveal();
    }
  };

  const goalPercent = dailyGoal
    ? Math.min((dailyGoal.completed / dailyGoal.goal) * 100, 100)
    : 0;
  const goalReached = dailyGoal ? dailyGoal.completed >= dailyGoal.goal : false;
  const remaining = dailyGoal ? dailyGoal.goal - dailyGoal.completed : 25;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Top Bar: Zurück */}
      <div className="px-4 pt-2">
        <button
          onClick={handleBackToModules}
          className="text-sm text-primary hover:text-primary-light transition-colors"
        >
          &larr; Module
        </button>
      </div>

      {/* Daily Goal Progress Bar */}
      {dailyGoal && (
        <div className="px-4 pt-3 pb-1">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-400">
                Heutiges Ziel
              </span>
              <span className="text-xs font-bold text-gray-300">
                {dailyGoal.completed} / {dailyGoal.goal}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  goalReached
                    ? "bg-green-500"
                    : "bg-primary"
                }`}
                style={{ width: `${goalPercent}%` }}
              />
            </div>
            {goalReached && (
              <p className="text-xs text-green-400 mt-1 text-center font-medium">
                Tagesziel erreicht! Gut gemacht!
              </p>
            )}
            {!goalReached && dailyGoal.completed > 0 && (
              <p className="text-xs text-gray-400 mt-1 text-center">
                Noch {remaining} Vokabeln bis zum Ziel
              </p>
            )}
          </div>
        </div>
      )}

      <main
        className={`flex-1 flex items-center justify-center px-4 py-8 ${!isRevealed ? 'cursor-pointer' : ''} ${showNextButton ? 'cursor-pointer' : ''}`}
        onClick={!isRevealed ? handleMainClick : (showNextButton ? handleNext : undefined)}
      >
        <div className="w-full max-w-3xl space-y-12">
          {/* Flashcard + Skip */}
          <div className="relative">
            <Flashcard
              key={currentVocab.id}
              german={currentVocab.german}
              spanish={currentVocab.spanish}
              onReveal={handleReveal}
              isRevealed={isRevealed}
            />
            {/* Skip-Button - rechts neben dem Wort, erst sichtbar wenn spanisch revealed */}
            {isRevealed && (
              <button
                onClick={handleSkip}
                className="group absolute right-0 top-0 flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                title="Vokabel überspringen"
              >
                Skip
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Favorite Button */}
          <div className={`flex justify-center transition-opacity duration-300 min-h-[3rem] items-center ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
            <FavoriteButton vocabId={currentVocab.id} />
          </div>

          {/* Beispielsatz mit Speaker */}
          <div className={`space-y-4 transition-opacity duration-300 ${showSentence ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-start gap-4 justify-center">
              <div className="flex-1 max-w-2xl pointer-events-none">
                <Sentence
                  spanishSentence={spanishSentence || "..."}
                  germanSentence={germanSentence || "..."}
                  isVisible={showSentence}
                  onTranslationRevealed={handleTranslationRevealed}
                />
              </div>
              <div className="pt-1">
                <SpeakButton
                  text={spanishSentence || ""}
                  audioUrl={currentVocab?.audio}
                />
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className={`pt-8 flex justify-center transition-opacity duration-300 min-h-[4rem] items-center ${showNextButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <NextButton onClick={handleNext} loading={isLoading} />
          </div>
        </div>
      </main>

      <Footer />
      <ThemeToggle />
      <InstallButton />
    </div>
  );
}
