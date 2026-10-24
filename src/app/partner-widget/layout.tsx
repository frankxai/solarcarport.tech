import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verwandeln Sie Ihre Website in eine qualifizierte Lead-Maschine | SolarCarport.tech',
  description: 'Verwandeln Sie Ihre Website in eine qualifizierte Lead-Maschine mit dem RIAL Energy Partner Widget.',
  alternates: {
    canonical: '/partner-widget',
  },
  openGraph: {
    title: 'Verwandeln Sie Ihre Website in eine qualifizierte Lead-Maschine | SolarCarport.tech',
    description: 'Verwandeln Sie Ihre Website in eine qualifizierte Lead-Maschine mit dem RIAL Energy Partner Widget.',
    url: 'https://solarcarport.tech/partner-widget',
    siteName: 'SolarCarport.tech',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
