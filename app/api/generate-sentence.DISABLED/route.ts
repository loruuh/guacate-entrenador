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
    console.log("Full Claude response:", responseText);

    // Parse the response - handle both formats:
    // Format 1: "SPANISCH: ... | DEUTSCH: ..."
    // Format 2: "SPANISCH: ...\nDEUTSCH: ..."
    let spanishPart = "";
    let germanPart = "";

    // Try parsing with pipe separator first
    if (responseText.includes("|")) {
      console.log("Parsing format with pipe separator");
      const parts = responseText.split("|");
      if (parts.length === 2) {
        spanishPart = parts[0].replace(/SPANISCH:\s*/i, "").trim();
        germanPart = parts[1].replace(/DEUTSCH:\s*/i, "").trim();
      }
    } else {
      // Try parsing with newline separator
      console.log("Parsing format with newline separator");
      const lines = responseText.split("\n").map(l => l.trim()).filter(l => l);

      for (const line of lines) {
        if (line.match(/^SPANISCH:/i)) {
          spanishPart = line.replace(/SPANISCH:\s*/i, "").trim();
        } else if (line.match(/^DEUTSCH:/i)) {
          germanPart = line.replace(/DEUTSCH:\s*/i, "").trim();
        }
      }
    }

    // Validate that we got both parts
    if (!spanishPart || !germanPart) {
      console.error("Failed to parse response. Spanish:", spanishPart, "German:", germanPart);
      console.error("Original response:", responseText);

      return NextResponse.json(
        {
          error: "Ungültiges Antwortformat von Claude API",
          details: `Konnte Sätze nicht extrahieren. Response: ${responseText}`,
          spanishSentence: spanishPart || "Error",
          germanSentence: germanPart || "Error"
        },
        { status: 500 }
      );
    }

    console.log("✅ Successfully parsed:");
    console.log("   Spanish:", spanishPart);
    console.log("   German:", germanPart);

    return NextResponse.json({
      spanishSentence: spanishPart,
      germanSentence: germanPart
    });
  } catch (error) {
    console.error("❌ Error in generate-sentence API:");
    console.error("Error type:", (error as any)?.constructor?.name);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Full error:", error);

    // Detailliertere Fehlermeldung
    let errorMessage = "Unbekannter Fehler";
    let errorDetails = "";

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || "";
    } else {
      errorMessage = String(error);
    }

    return NextResponse.json(
      {
        error: "Fehler beim Generieren des Satzes",
        message: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  }
}
