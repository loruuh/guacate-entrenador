import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("=== TTS API Route aufgerufen ===");
    const { text } = await request.json();
    console.log("Text:", text);

    if (!text) {
      return NextResponse.json(
        { error: "Text ist erforderlich" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_CLOUD_TTS_API_KEY;
    console.log("API Key vorhanden:", !!apiKey);
    console.log("API Key Länge:", apiKey?.length);
    console.log("Erste 10 Zeichen:", apiKey?.substring(0, 10));

    if (!apiKey) {
      console.log("!!! API Key fehlt !!!");
      return NextResponse.json(
        { error: "Google Cloud TTS API Key nicht konfiguriert" },
        { status: 500 }
      );
    }

    // Google Cloud Text-to-Speech API aufrufen
    console.log("Rufe Google Cloud TTS API auf...");
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: "es-ES",
            name: "es-ES-Neural2-A", // Weibliche neuronale Stimme
          },
          audioConfig: {
            audioEncoding: "MP3",
            pitch: 0,
            speakingRate: 0.9, // Etwas langsamer für besseres Lernen
          },
        }),
      }
    );

    console.log("Google Response Status:", response.status);
    console.log("Google Response OK:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("!!! Google API Fehler !!!");
      console.log("Google Error Response:", errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }

      console.error("Google Cloud TTS API Fehler:", errorData);
      return NextResponse.json(
        { error: "Google Cloud TTS API Fehler" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Google TTS erfolgreich! Audio-Daten erhalten.");

    // audioContent ist base64-kodiert
    return NextResponse.json({
      audioContent: data.audioContent,
    });
  } catch (error) {
    console.error("Text-to-Speech Fehler:", error);
    return NextResponse.json(
      { error: "Interner Server-Fehler" },
      { status: 500 }
    );
  }
}
