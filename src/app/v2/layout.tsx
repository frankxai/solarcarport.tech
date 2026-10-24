import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aus Parkfläche wird Energiefläche | SolarCarport.tech V2',
  description: 'Aus Parkfläche wird Energiefläche. Entdecken Sie die nächste Generation von RIAL Energy Solarcarports.',
  alternates: {
    canonical: '/v2',
  },
  openGraph: {
    title: 'Aus Parkfläche wird Energiefläche | SolarCarport.tech V2',
    description: 'Aus Parkfläche wird Energiefläche. Entdecken Sie die nächste Generation von RIAL Energy Solarcarports.',
    url: 'https://solarcarport.tech/v2',
    siteName: 'SolarCarport.tech',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
