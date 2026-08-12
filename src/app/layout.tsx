import type { Metadata } from 'next';
import { IBM_Plex_Mono, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  title: 'SolarCarport.tech | Solarcarports & PV-Überdachungen',
  description: 'Standortbezogene Vorprüfung für Solarcarports, PV-Terrassen und gewerbliche Parkplatzüberdachungen der RIAL Energy GmbH in Seesen.',
  keywords: 'Solarcarport, PV Überdachung, Solar Terrasse, RIAL Energy, Solarcarport Seesen, PV Carport Planung',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${manrope.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
