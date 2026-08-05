import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SolarCarport.tech | High-Performance Solar Overhangs & Commercial Infrastructure",
  description: "RIAL Energy GmbH - Next-generation modular aluminum solar carports, solar patio canopies, and solar fencing. Engineering excellence, snow-load certified, and integrated V2X & ERP mechanics.",
  keywords: "Solar Carport, PV-Überdachung, Solar Terrasse, RIAL Energy, Solarpflicht, Bifacial Solar, V2X Charging, Aluminum Carport Bausatz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-solar-500 selection:text-surface">
        {children}
      </body>
    </html>
  );
}
