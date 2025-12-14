import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">
            Datenschutzerklärung
          </h1>

          <div className="bg-gray-800/50 rounded-xl p-8 border border-primary/20 space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                1. Datenschutz auf einen Blick
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Diese App wurde entwickelt, um Ihre Privatsphäre zu schützen.
                Alle Ihre Lerndaten werden ausschließlich lokal in Ihrem Browser
                gespeichert. Es werden keine personenbezogenen Daten an externe
                Server übertragen oder gespeichert.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                2. Lokale Datenspeicherung (LocalStorage)
              </h2>
              <h3 className="text-xl font-semibold text-white mb-2 mt-4">
                Welche Daten werden gespeichert?
              </h3>
              <p className="text-gray-400 leading-relaxed mb-3">
                Die App speichert folgende Daten ausschließlich lokal in Ihrem
                Browser (LocalStorage):
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Lernfortschritt pro Vokabel (wann zuletzt gesehen, wie oft wiederholt)</li>
                <li>Favoriten (Ihr persönliches Vokabelheft)</li>
                <li>Historie (letzte 10 gelernte Sätze)</li>
                <li>Lernstatistiken (Anzahl gelernter Vokabeln pro Tag)</li>
                <li>Einstellungen (z.B. Dark Mode Präferenz)</li>
              </ul>
              <p className="text-gray-400 leading-relaxed mt-3">
                Diese Daten verlassen niemals Ihr Gerät und werden nicht mit
                anderen Geräten synchronisiert. Sie können alle Daten jederzeit
                durch Löschen des Browser-Speichers entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                3. API-Aufrufe (Anthropic Claude)
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Um Beispielsätze zu generieren und Wörter zu übersetzen, nutzt
                die App die Anthropic Claude API. Dabei werden folgende Daten
                übertragen:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4 mt-3">
                <li>Die spanische Vokabel, für die ein Beispielsatz generiert werden soll</li>
                <li>Das spanische Wort, das übersetzt werden soll</li>
              </ul>
              <p className="text-gray-400 leading-relaxed mt-3">
                Es werden keine personenbezogenen Daten (Name, E-Mail, IP-Adresse
                etc.) an Anthropic übertragen. Die Anfragen sind anonym.
                Weitere Informationen finden Sie in der{" "}
                <a
                  href="https://www.anthropic.com/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Datenschutzerklärung von Anthropic
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                4. Cookies
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Diese App verwendet keine Cookies. Alle Daten werden ausschließlich
                im LocalStorage Ihres Browsers gespeichert.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                5. Weitergabe an Dritte
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Es findet keine Weitergabe Ihrer Daten an Dritte statt. Die App
                sammelt keine Analysedaten, verwendet keine Tracking-Tools und
                enthält keine Werbung.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                6. Ihre Rechte
              </h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Ihre lokal gespeicherten Daten einzusehen (über die Browser-Entwicklertools)</li>
                <li>Ihre Daten zu löschen (durch Löschen des Browser-Speichers)</li>
                <li>Die Nutzung der App jederzeit zu beenden</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                7. Datensicherheit
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Da alle Daten ausschließlich lokal in Ihrem Browser gespeichert
                werden, liegt die Sicherheit dieser Daten in Ihrer Verantwortung.
                Wir empfehlen, Ihr Gerät mit einem Passwort zu schützen und
                regelmäßig Software-Updates durchzuführen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                8. Änderungen dieser Datenschutzerklärung
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um
                sie an geänderte Rechtslage oder Änderungen der App anzupassen.
                Die jeweils aktuelle Version finden Sie stets auf dieser Seite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                9. Kontakt
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Bei Fragen zum Datenschutz kontaktieren Sie uns bitte über die im
                Impressum angegebenen Kontaktdaten.
              </p>
            </section>

            <section className="border-t border-gray-700 pt-6">
              <p className="text-gray-500 text-sm italic">
                Stand: {new Date().toLocaleDateString("de-DE")}
              </p>
            </section>
          </div>

          {/* Zurück-Button */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-lg transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Zurück
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
