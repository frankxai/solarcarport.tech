import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vom passiven Stromkunden zum souveränen Energie-Architekten | SolarCarport.tech',
  description: 'Vom passiven Stromkunden zum souveränen Energie-Architekten. Entdecken Sie die digitale Solar-Zukunft mit RIAL Energy.',
  alternates: {
    canonical: '/digital',
  },
  openGraph: {
    title: 'Vom passiven Stromkunden zum souveränen Energie-Architekten | SolarCarport.tech',
    description: 'Vom passiven Stromkunden zum souveränen Energie-Architekten.',
    url: 'https://solarcarport.tech/digital',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
