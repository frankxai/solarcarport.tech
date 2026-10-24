import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ihr digitaler Solar-Architektur Vault | SolarCarport.tech',
  description: 'Ihr digitaler Solar-Architektur Vault. Exklusive Ressourcen und Werkzeuge für Solar-Profis.',
  alternates: {
    canonical: '/vault',
  },
  openGraph: {
    title: 'Ihr digitaler Solar-Architektur Vault | SolarCarport.tech',
    description: 'Ihr digitaler Solar-Architektur Vault. Exklusive Ressourcen und Werkzeuge für Solar-Profis.',
    url: 'https://solarcarport.tech/vault',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
