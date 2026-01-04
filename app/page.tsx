"use client";

import { useState, useEffect } from "react";
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
import { addToHistory, incrementStats } from "@/lib/local-storage";

export default function Home() {
  const [currentVocab, setCurrentVocab] = useState<Vocabulary | null>(null);
  const [spanishSentence, setSpanishSentence] = useState<string>("");
  const [germanSentence, setGermanSentence] = useState<string>("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [showSentence, setShowSentence] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check onboarding status beim Mount
  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboardingComplete");
    if (onboardingComplete !== "true") {
      setShowOnboarding(true);
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
      loadNextVocab();
    }
  }, []);

  const loadNextVocab = () => {
    setIsLoading(true);
    setIsRevealed(false);
    setShowSentence(false);
    setShowNextButton(false);
    setSpanishSentence("");
    setGermanSentence("");

    try {
      // Wähle nächste Vokabel (Spaced Repetition)
      const vocab = selectNextVocab();
      setCurrentVocab(vocab);

      // Markiere als gesehen
      markVocabAsSeen(vocab.id);

      // Inkrementiere Statistik
      incrementStats();
    } catch (error) {
      console.error("Fehler beim Laden der Vokabel:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReveal = () => {
    console.log("handleReveal called for:", currentVocab?.spanish);
    setIsRevealed(true);

    if (!currentVocab) {
      console.error("No current vocab!");
      return;
    }

    // Nutze vorgenerierte Sätze direkt aus JSON
    console.log("Lade vorgenerierte Sätze für:", currentVocab.spanish);

    setSpanishSentence(currentVocab.sentence_es);
    setGermanSentence(currentVocab.sentence_de);
    setShowSentence(true);

    // Speichere in Historie
    addToHistory({
      vocabId: currentVocab.id,
      sentence: currentVocab.sentence_es,
      timestamp: new Date().toISOString(),
    });
  };

  const handleTranslationRevealed = () => {
    setShowNextButton(true);
  };

  const handleNext = () => {
    loadNextVocab();
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingComplete", "true");
    setShowOnboarding(false);
    loadNextVocab();
  };

  // Show onboarding overlay if needed (without main content)
  if (showOnboarding) {
    return (
      <div className="min-h-screen flex flex-col">
        <OnboardingOverlay onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  // Show loading screen if not initialized yet or if initialized but no vocab
  if (!isInitialized || !currentVocab) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-400 mt-4">Lädt...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleMainClick = () => {
    // Nur im ersten Schritt (deutsches Wort sichtbar, spanisches noch nicht)
    if (!isRevealed) {
      handleReveal();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <main
        className={`flex-1 flex items-center justify-center px-4 py-8 ${!isRevealed ? 'cursor-pointer' : ''}`}
        onClick={handleMainClick}
      >
        <div className="w-full max-w-3xl space-y-12">
          {/* Flashcard */}
          <div>
            <Flashcard
              key={currentVocab.id}
              german={currentVocab.german}
              spanish={currentVocab.spanish}
              onReveal={handleReveal}
              isRevealed={isRevealed}
            />
          </div>

          {/* Favorite Button - Always rendered, but invisible initially */}
          <div className={`flex justify-center transition-opacity duration-300 min-h-[3rem] items-center ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
            <FavoriteButton vocabId={currentVocab.id} />
          </div>

          {/* Beispielsatz mit Speaker - Always rendered, but invisible initially */}
          <div className={`space-y-4 transition-opacity duration-300 ${showSentence ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-start gap-4 justify-center">
              <div className="flex-1 max-w-2xl">
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

          {/* Next Button - Always rendered, but invisible initially */}
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
