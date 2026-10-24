import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Souveräne System- & Statik-Diagnose | SolarCarport.tech',
  description: 'Souveräne System- & Statik-Diagnose für Ihren Solarcarport. Prüfen Sie die Machbarkeit Ihres Projekts.',
  alternates: {
    canonical: '/system-check',
  },
  openGraph: {
    title: 'Souveräne System- & Statik-Diagnose | SolarCarport.tech',
    description: 'Souveräne System- & Statik-Diagnose für Ihren Solarcarport.',
    url: 'https://solarcarport.tech/system-check',
    siteName: 'SolarCarport.tech',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
