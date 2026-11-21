import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Solarcarport planen | SolarCarport.tech';
const description = 'Projekt vorbereiten, Lieferumfang vergleichen und den richtigen Weg zu Konfiguration, Bausatz oder Montage finden.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/planung' },
  openGraph: { title, description, url: '/planung', locale: 'de_DE', type: 'website' },
};

const routes = [
  { title: 'Konfiguration vorbereiten', copy: 'Nutze deine verfügbare Breite und Tiefe. Halte Stellplätze, Durchfahrtshöhe und das gewünschte Modulraster fest.', label: 'Zum Konfigurator', href: '/#configurator' },
  { title: 'Bausatz oder Maßanfertigung', copy: 'Vergleiche die Größen und frage nach einer Zeichnung, dem Lieferumfang und möglichen Zusatzarbeiten.', label: 'Zum öffentlichen Angebot', href: 'https://www.solarcarport.tech/solarcarport' },
  { title: 'Montage und Anschluss', copy: 'Besprich die Montage vor Ort und kläre, wer Fundament, Inbetriebnahme und Elektroarbeiten übernimmt.', label: 'Zu VR Gebäudetechnik', href: 'https://www.vr-gebaeudetechnik.de/' },
] as const;

export default function PlanningPage() {
  return (
    <main className="min-h-screen bg-[#040711] text-slate-100">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <Link href="/" className="font-semibold text-amber-300 underline underline-offset-4">SolarCarport.tech</Link>
        <header className="max-w-3xl border-b border-white/15 pb-10 pt-12 sm:pt-20">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Vom Stellplatz zum Solarcarport.</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">Bereite die Anfrage mit Abmessungen, Fotos und gewünschtem Leistungsumfang vor. Wähle anschließend, ob du selbst konfigurierst, einen Bausatz vergleichst oder Montage besprichst.</p>
          <Link href="/#configurator" className="mt-7 inline-block rounded-full bg-amber-300 px-5 py-3 font-semibold text-slate-950">Carport konfigurieren</Link>
        </header>

        <section className="py-10" aria-labelledby="project-evidence">
          <h2 id="project-evidence" className="text-2xl font-semibold sm:text-3xl">Was gehört in die erste Anfrage?</h2>
          <ul className="mt-5 grid gap-5 text-slate-300 sm:grid-cols-3">
            <li className="border-t border-white/15 pt-4"><strong className="block text-slate-100">Fläche</strong>PLZ, nutzbare Breite und Tiefe, Höhe und Fotos von Zufahrt und Stellplatz.</li>
            <li className="border-t border-white/15 pt-4"><strong className="block text-slate-100">Nutzung</strong>Gewünschte Verschattung, Tageslicht, Regenablauf und typische Ladezeiten.</li>
            <li className="border-t border-white/15 pt-4"><strong className="block text-slate-100">Leistungsumfang</strong>Wer liefert, plant, montiert und übernimmt Fundament, Elektrik und Inbetriebnahme?</li>
          </ul>
        </section>

        <section className="border-y border-white/15 py-10" aria-labelledby="planning-choices">
          <h2 id="planning-choices" className="text-2xl font-semibold sm:text-3xl">Dein nächster Schritt</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            {routes.map((route) => (
              <div key={route.title} className="rounded-2xl border border-white/15 bg-slate-900 p-5">
                <h3 className="text-lg font-semibold">{route.title}</h3>
                <p className="mb-4 mt-2 leading-relaxed text-slate-300">{route.copy}</p>
                <Link className="font-semibold text-amber-300 underline underline-offset-4" href={route.href}>{route.label}</Link>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-10">
          <h2 className="text-2xl font-semibold">Hinweis</h2>
          <p className="mb-4 mt-2 max-w-xl text-slate-300">Angebote und Ausführung verantworten die jeweiligen Anbieter.</p>
        </section>
      </div>
    </main>
  );
}
