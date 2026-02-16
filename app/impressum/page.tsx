import { Metadata } from 'next';
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Impressum - LingoLuup',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

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
                Sven Bixenstein
                <br />
                Weidenstr. 10
                <br />
                72145 Hirrlingen
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">Kontakt</h2>
              <p className="text-gray-400">
                E-Mail: sven.bixenstein@gmail.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                EU-Streitschlichtung
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-gray-400 mt-2">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                Verbraucherstreitbeilegung/Universalschlichtungsstelle
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                Haftung für Inhalte
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                Haftung für Links
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                Seiten verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                Urheberrecht
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>
          </div>

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
