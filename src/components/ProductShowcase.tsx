'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Building2, Car, Home, MoveRight } from 'lucide-react';
import type { ConfiguratorState } from './configurator/Interactive2DRenderer';

interface ProductShowcaseProps {
  onSelectCategory: (category: ConfiguratorState['category']) => void;
}

const products: Array<{
  id: ConfiguratorState['category'];
  name: string;
  audience: string;
  description: string;
  image: string;
  icon: typeof Car;
}> = [
  { id: 'single', name: 'Einzelcarport', audience: '1 Stellplatz', description: 'Kompakte Lösung für Einfahrt, E-Fahrzeug und Eigenverbrauch.', image: '/images/hero_solar_carport.jpg', icon: Car },
  { id: 'double', name: 'Doppelcarport', audience: '2 Stellplätze', description: 'Mehr Fläche für Haushalt, Fahrzeuge und optionale Ladetechnik.', image: '/images/hero_solar_carport.jpg', icon: Car },
  { id: 'terrace', name: 'PV-Terrasse', audience: 'Wohnen & Außenraum', description: 'Schatten, Wetterschutz und Energie in einer leichten Überdachung.', image: '/images/patio_solar_canopy.jpg', icon: Home },
  { id: 'commercial', name: 'Gewerbe & Fuhrpark', audience: 'Mehrere Stellplätze', description: 'Modulare Planung für Mitarbeitende, Kundschaft und Ladebedarf.', image: '/images/commercial_fleet_solar.jpg', icon: Building2 },
];

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onSelectCategory }) => {
  return (
    <section id="systems" className="py-16 sm:py-24 font-['Poppins']">
      <div className="section-shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="eyebrow"><MoveRight className="h-4 w-4 text-amber-400" /> Systeme</div>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-5xl font-['Playfair_Display']">
              Vom privaten Stellplatz <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">bis zum Fuhrpark.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300 font-light">Die Karten zeigen Systemrichtungen der RIAL Energy GmbH. Abmessungen, Leistung und Statik entstehen aus der individuellen Standortprüfung.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <article key={product.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d1824] transition hover:border-amber-300/40">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={product.image} alt={`Visualisierung: ${product.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1824] via-transparent to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-slate-200">Visualisierung</span>
                </div>
                <div className="p-5">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-300"><Icon className="h-4 w-4" />{product.audience}</span>
                  <h3 className="mt-3 text-xl font-extrabold text-white">{product.name}</h3>
                  <p className="mt-2 min-h-16 text-sm leading-6 text-slate-400">{product.description}</p>
                  <button onClick={() => onSelectCategory(product.id)} className="touch-target mt-5 flex w-full items-center justify-between border-t border-white/10 pt-4 text-left text-sm font-bold text-white">
                    Projekt starten
                    <ArrowRight className="h-4 w-4 text-amber-300 transition group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
