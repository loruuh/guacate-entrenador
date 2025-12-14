"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Flashcard from "@/components/Flashcard";
import Sentence from "@/components/Sentence";
import SpeakButton from "@/components/SpeakButton";
import FavoriteButton from "@/components/FavoriteButton";
import NextButton from "@/components/NextButton";
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

  // Lade erste Vokabel beim Mount
  useEffect(() => {
    loadNextVocab();
  }, []);

  const loadNextVocab = async () => {
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

  const handleReveal = async () => {
    console.log("handleReveal called for:", currentVocab?.spanish);
    setIsRevealed(true);

    if (!currentVocab) {
      console.error("No current vocab!");
      return;
    }

    // Generate example sentence immediately (no delay)
    console.log("Generating sentence for:", currentVocab.spanish);
    try {
      const response = await fetch("/api/generate-sentence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: currentVocab.spanish }),
      });

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`API returned ${response.status}: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log("✅ API Response data:", data);

      // Validate response
      if (!data.spanishSentence || !data.germanSentence) {
        console.error("⚠️ Invalid response data:", data);
        throw new Error(`Missing sentences in response: ${JSON.stringify(data)}`);
      }

      console.log("Spanish sentence:", data.spanishSentence);
      console.log("German sentence:", data.germanSentence);

      setSpanishSentence(data.spanishSentence);
      setGermanSentence(data.germanSentence);
      setShowSentence(true);

      // Speichere in Historie
      addToHistory({
        vocabId: currentVocab.id,
        sentence: data.spanishSentence,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("❌ Error in handleReveal:");
      console.error("Error type:", (error as any)?.constructor?.name);
      console.error("Error:", error);

      // Setze einen Fallback-Satz damit UI nicht hängt
      setSpanishSentence("(Beispielsatz konnte nicht geladen werden)");
      setGermanSentence("Bitte versuche es erneut mit 'Nächster Satz'");
      setShowSentence(true);
      setShowNextButton(true); // Show next button so user can try again
    }
  };

  const handleTranslationRevealed = () => {
    setShowNextButton(true);
  };

  const handleNext = () => {
    loadNextVocab();
  };

  if (!currentVocab) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl space-y-12">
          {/* Flashcard */}
          <div>
            <Flashcard
              key={currentVocab.id}
              german={currentVocab.german}
              spanish={currentVocab.spanish}
              onReveal={handleReveal}
            />
          </div>

          {/* Favorite Button */}
          {isRevealed && (
            <div className="flex justify-center">
              <FavoriteButton vocabId={currentVocab.id} />
            </div>
          )}

          {/* Beispielsatz mit Speaker */}
          {showSentence && (
            <div className="space-y-4">
              <div className="flex items-start gap-4 justify-center">
                <div className="flex-1 max-w-2xl">
                  <Sentence
                    spanishSentence={spanishSentence}
                    germanSentence={germanSentence}
                    isVisible={showSentence}
                    onTranslationRevealed={handleTranslationRevealed}
                  />
                </div>
                {spanishSentence && (
                  <div className="pt-1">
                    <SpeakButton text={spanishSentence} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Button */}
          {showNextButton && (
            <div className="pt-8 flex justify-center">
              <NextButton onClick={handleNext} loading={isLoading} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
