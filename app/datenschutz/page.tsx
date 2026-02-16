import { Metadata } from 'next';
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - LingoLuup',
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

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Allgemeine Hinweise</h3>
              <p className="text-gray-400 leading-relaxed">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              </p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Datenerfassung auf dieser Website</h3>
              <p className="text-gray-400 font-semibold">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
              <p className="text-gray-400 leading-relaxed">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
                Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>

              <p className="text-gray-400 font-semibold mt-3">Wie erfassen wir Ihre Daten?</p>
              <p className="text-gray-400 leading-relaxed">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. Google Login).
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch
                unsere IT-Systeme erfasst (z.B. technische Daten wie Internetbrowser, Betriebssystem).
              </p>

              <p className="text-gray-400 font-semibold mt-3">Wofür nutzen wir Ihre Daten?</p>
              <p className="text-gray-400 leading-relaxed">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
                gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>

              <p className="text-gray-400 font-semibold mt-3">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
              <p className="text-gray-400 leading-relaxed">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
                Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die
                Berichtigung oder Löschung dieser Daten zu verlangen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">2. Hosting</h2>
              <p className="text-gray-400 leading-relaxed">Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Vercel</h3>
              <p className="text-gray-400 leading-relaxed">
                Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
              </p>
              <p className="text-gray-400 leading-relaxed mt-2">
                Vercel ist ein Dienst zum Hosten von Websites. Die von Vercel erfassten Daten werden
                auf deren Servern in den USA gespeichert.
              </p>
              <p className="text-gray-400 leading-relaxed mt-2">
                Details entnehmen Sie der Datenschutzerklärung von Vercel:{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://vercel.com/legal/privacy-policy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Datenschutz</h3>
              <p className="text-gray-400 leading-relaxed">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h3>
              <p className="text-gray-400 leading-relaxed">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-gray-400 mt-2">
                Sven Bixenstein<br />
                Weidenstr. 10<br />
                72145 Hirrlingen<br />
                E-Mail: sven.bixenstein@gmail.com
              </p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Speicherdauer</h3>
              <p className="text-gray-400 leading-relaxed">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
                verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
              </p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p className="text-gray-400 leading-relaxed">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich.
                Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der
                bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">
                4. Datenerfassung auf dieser Website
              </h2>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Google OAuth Login</h3>
              <p className="text-gray-400 leading-relaxed">
                Diese Website nutzt Google OAuth für die Anmeldung. Anbieter ist die Google Ireland Limited,
                Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p className="text-gray-400 leading-relaxed mt-2">
                Beim Login mit Google werden folgende Daten von Google an uns übermittelt:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4 mt-2">
                <li>E-Mail-Adresse</li>
                <li>Name (optional)</li>
                <li>Profilbild (optional)</li>
              </ul>
              <p className="text-gray-400 leading-relaxed mt-2">
                Diese Daten verwenden wir ausschließlich zur Authentifizierung und Bereitstellung
                der personalisierten Lerninhalte.
              </p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Stripe Zahlungsabwicklung</h3>
              <p className="text-gray-400 leading-relaxed">
                Für die Zahlungsabwicklung nutzen wir Stripe. Anbieter ist Stripe Payments Europe Ltd.,
                1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland.
              </p>
              <p className="text-gray-400 leading-relaxed mt-2">
                Stripe verarbeitet Ihre Zahlungsdaten (Kreditkartennummer, etc.). Diese Daten werden
                nicht an uns weitergegeben, sondern direkt bei Stripe gespeichert.
              </p>
              <p className="text-gray-400 leading-relaxed mt-2">
                Details:{" "}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://stripe.com/privacy
                </a>
              </p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Supabase (Datenbank)</h3>
              <p className="text-gray-400 leading-relaxed">
                Wir nutzen Supabase für die Speicherung von Nutzer- und Lerndaten. Anbieter ist
                Supabase Inc., USA.
              </p>
              <p className="text-gray-400 leading-relaxed mt-2">
                Gespeicherte Daten:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4 mt-2">
                <li>E-Mail-Adresse (von Google OAuth)</li>
                <li>Lernfortschritt</li>
                <li>Gespeicherte Vokabeln</li>
                <li>Abo-Status</li>
              </ul>
              <p className="text-gray-400 leading-relaxed mt-2">
                Details:{" "}
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://supabase.com/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">5. Ihre Rechte</h2>
              <p className="text-gray-400 leading-relaxed">Sie haben folgende Rechte:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4 mt-2">
                <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
                <li>Recht auf Berichtigung unrichtiger Daten</li>
                <li>Recht auf Löschung Ihrer Daten</li>
                <li>Recht auf Einschränkung der Verarbeitung</li>
                <li>Recht auf Datenübertragbarkeit</li>
                <li>Widerspruchsrecht gegen die Verarbeitung</li>
              </ul>
              <p className="text-gray-400 leading-relaxed mt-3">
                Kontakt für Datenschutzanfragen: sven.bixenstein@gmail.com
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
