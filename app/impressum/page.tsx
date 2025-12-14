import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Impressum</h1>

          <div className="bg-gray-800/50 rounded-xl p-8 border border-primary/20 space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                Angaben gemäß § 5 TMG
              </h2>
              <p className="text-gray-400">
                [Hier Ihren Namen oder Firmennamen eintragen]
                <br />
                [Straße und Hausnummer]
                <br />
                [PLZ und Ort]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">Kontakt</h2>
              <p className="text-gray-400">
                Telefon: [Ihre Telefonnummer]
                <br />
                E-Mail: [Ihre E-Mail-Adresse]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <p className="text-gray-400">
                [Ihr Name]
                <br />
                [Ihre Adresse]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                Haftungsausschluss
              </h2>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">
                Haftung für Inhalte
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter
                sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich.
              </p>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">
                Haftung für Links
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich.
              </p>

              <h3 className="text-xl font-semibold text-white mb-2 mt-4">
                Urheberrecht
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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
