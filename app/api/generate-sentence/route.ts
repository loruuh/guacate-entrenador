import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { word } = await request.json();

    console.log("API Route called with word:", word);

    if (!word) {
      console.error("No word provided");
      return NextResponse.json(
        { error: "Wort ist erforderlich" },
        { status: 400 }
      );
    }

    // Prüfe ob API Key vorhanden ist
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY not found in environment");
      return NextResponse.json(
        { error: "API Key nicht konfiguriert" },
        { status: 500 }
      );
    }

    console.log("API Key found, creating Anthropic client...");

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    console.log("Calling Claude API...");

    const message = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `Generiere einen sehr einfachen spanischen Beispielsatz (Niveau A2-B1) mit dem Wort "${word}". Der Satz soll 6-10 Wörter haben. Antworte im Format: SPANISCH: [satz] | DEUTSCH: [übersetzung]. Keine Erklärungen.`,
        },
      ],
    });

    console.log("Claude API response received");

    const sentenceContent = message.content[0];
    if (sentenceContent.type !== "text") {
      console.error("Unexpected response type:", sentenceContent.type);
      throw new Error("Unerwarteter Antworttyp");
    }

    const responseText = sentenceContent.text.trim();
    console.log("Response received:", responseText);

    // Parse the response to extract Spanish and German sentences
    const parts = responseText.split("|");
    if (parts.length !== 2) {
      console.error("Invalid response format:", responseText);
      throw new Error("Ungültiges Antwortformat");
    }

    const spanishPart = parts[0].replace(/SPANISCH:\s*/i, "").trim();
    const germanPart = parts[1].replace(/DEUTSCH:\s*/i, "").trim();

    console.log("Spanish sentence:", spanishPart);
    console.log("German sentence:", germanPart);

    return NextResponse.json({
      spanishSentence: spanishPart,
      germanSentence: germanPart
    });
  } catch (error) {
    console.error("Fehler beim Generieren des Satzes:", error);

    // Detailliertere Fehlermeldung
    const errorMessage = error instanceof Error ? error.message : "Unbekannter Fehler";

    return NextResponse.json(
      { error: "Fehler beim Generieren des Satzes", details: errorMessage },
      { status: 500 }
    );
  }
}
