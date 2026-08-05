import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SolarCarport.tech | Solarcarports & PV-Überdachungen',
  description: 'Standortbezogene Vorprüfung für Solarcarports, PV-Terrassen und gewerbliche Parkplatzüberdachungen der RIAL Energy GmbH in Seesen.',
  keywords: 'Solarcarport, PV Überdachung, Solar Terrasse, RIAL Energy, Solarcarport Seesen, PV Carport Planung',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
