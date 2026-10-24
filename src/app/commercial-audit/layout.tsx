import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deutsche Solar-Parkplatzpflicht 2026 rechtssicher meistern | SolarCarport.tech',
  description: 'Deutsche Solar-Parkplatzpflicht 2026 rechtssicher & rentabel meistern. Kostenloses Commercial Audit & Potentialanalyse.',
  alternates: {
    canonical: '/commercial-audit',
  },
  openGraph: {
    title: 'Deutsche Solar-Parkplatzpflicht 2026 rechtssicher meistern | SolarCarport.tech',
    description: 'Deutsche Solar-Parkplatzpflicht 2026 rechtssicher & rentabel meistern.',
    url: 'https://solarcarport.tech/commercial-audit',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
