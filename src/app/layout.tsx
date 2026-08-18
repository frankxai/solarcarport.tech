import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SolarCarport.tech | High-Performance Solar Overhangs & Commercial Infrastructure',
  description: 'RIAL Energy GmbH - Modular aluminum solar carports, solar patio canopies, and solar fencing. Engineering excellence, snow-load certified, and integrated V2X & ERP mechanics in Seesen, Germany.',
  keywords: 'Solarcarport, PV-Überdachung, Solar Terrasse, RIAL Energy, Solarpflicht, Bifacial Solar, V2X Charging, Aluminum Carport Bausatz',
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
        {children}
      </body>
    </html>
  );
}
