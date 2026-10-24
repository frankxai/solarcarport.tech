import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://solarcarport.tech'),
  title: 'SolarCarport.tech | PV-Überdachungen & Solarcarports aus Seesen',
  description: 'RIAL Energy GmbH – Modulare Aluminium-Solarcarports, PV-Terrassen und Solar-Überdachungen. Statisch berechnet nach DIN EN 1991, 0% MwSt, bifaziale Module. Materialkompetenz aus Seesen, Deutschland.',
  keywords: 'Solarcarport, PV-Überdachung, Solar Terrasse, RIAL Energy, Solarpflicht, Bifaziale Module, Aluminium Carport, Seesen, DIN EN 1991, 0% MwSt',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SolarCarport.tech | PV-Überdachungen & Solarcarports aus Seesen',
    description: 'RIAL Energy GmbH – Modulare Aluminium-Solarcarports, PV-Terrassen und Solar-Überdachungen. Statisch berechnet nach DIN EN 1991, 0% MwSt, bifaziale Module.',
    url: 'https://solarcarport.tech/',
    siteName: 'SolarCarport.tech',
    locale: 'de_DE',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RIAL Energy GmbH',
  url: 'https://solarcarport.tech',
  description: 'Modulare Aluminium-Solarcarports, PV-Terrassen und Solar-Überdachungen.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Seesen',
    addressCountry: 'DE',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-amber-500 selection:text-slate-950 font-['Poppins']">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
