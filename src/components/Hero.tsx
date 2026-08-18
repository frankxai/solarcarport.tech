'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight, Building2, Car, MapPin, Ruler, ShieldCheck, Sparkles } from 'lucide-react';
import type { ConfiguratorState } from './configurator/Interactive2DRenderer';

interface HeroProps {
  onStartConfigurator: (category?: ConfiguratorState['category']) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartConfigurator }) => {
  return (
    <>
      <section id="top" className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden border-b border-white/10 font-['Poppins']">
        <Image
          src="/media/5x3-carport-rostak-19.webp"
          alt="Realisiertes Solarcarport mit bifazialen PV-Modulen und Aluminiumtragwerk"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[54%_42%] sm:object-[64%_38%]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,7,17,0.98)_0%,rgba(4,7,17,0.9)_46%,rgba(4,7,17,0.3)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#040711_0%,transparent_42%)]" />

        <div className="section-shell flex min-h-[calc(100svh-72px)] items-end pb-10 pt-16 sm:items-center sm:py-20">
          <div className="max-w-3xl">
            <div className="eyebrow mb-5 font-['Poppins']">
              <MapPin className="h-4 w-4 text-amber-400" aria-hidden="true" />
              Planung & Materialkompetenz aus Seesen (Harz)
            </div>

            <h1 className="max-w-[14ch] text-[clamp(2.75rem,7vw,5.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white font-['Playfair_Display']">
              Aus Parkfläche wird <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Energiefläche.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 font-light font-['Poppins']">
              Solarcarports und PV-Überdachungen für private Grundstücke, Gewerbe und Fuhrparks — statisch berechnet nach DIN EN 1991, mit 0% MwSt (§ 12 Abs. 3 UStG) und geprüftem RIAL Energy Lagerbestand.
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center font-['Poppins']">
              <button
                type="button"
                onClick={() => onStartConfigurator()}
                className="touch-target inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-4 text-sm font-bold text-slate-950 shadow-gold-subtle transition-all duration-200 hover:brightness-105 hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Standort prüfen & konfigurieren</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="#projects"
                className="touch-target inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-6 py-4 text-xs font-semibold text-white backdrop-blur transition hover:border-white/30"
              >
                <span>Realisierte Projekte ansehen</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3 font-['Poppins']">
              <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-3.5 backdrop-blur-md">
                <span className="technical-label block text-amber-400 text-[10px] font-semibold">Schneelast</span>
                <span className="mt-1 block text-sm font-bold text-white">2.5 kN/m² DIN EN 1991</span>
              </div>
              <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-3.5 backdrop-blur-md">
                <span className="technical-label block text-amber-400 text-[10px] font-semibold">Steuer</span>
                <span className="mt-1 block text-sm font-bold text-white">0% MwSt (§12 UStG)</span>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/5 bg-slate-950/70 p-3.5 backdrop-blur-md sm:col-span-1">
                <span className="technical-label block text-amber-400 text-[10px] font-semibold">Material</span>
                <span className="mt-1 block text-sm font-bold text-white">Aluminium T6 / Stahl</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Category Selector */}
      <section className="border-b border-white/10 bg-[#071019] py-8 sm:py-10 font-['Poppins']">
        <div className="section-shell">
          <div className="mb-4 flex items-center justify-between">
            <span className="technical-label text-slate-400 text-[11px] font-semibold">Schnelleinstieg nach Anwendungsbereich</span>
            <span className="hidden text-xs text-slate-500 sm:inline font-mono">RIAL Energy GmbH • Seesen</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              onClick={() => onStartConfigurator('single')}
              className="touch-target flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left transition-all duration-200 hover:border-amber-400/40 hover:bg-slate-900 group cursor-pointer"
            >
              <div>
                <span className="technical-label block text-amber-400 text-[10px] font-semibold">Privat</span>
                <span className="text-base font-bold text-white font-['Poppins']">Einzel-Carport</span>
                <span className="block text-xs text-slate-400 mt-0.5">1 Stellplatz · ~3.8 kWp</span>
              </div>
              <Car className="h-5 w-5 text-slate-500 group-hover:text-amber-400 transition-colors" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onStartConfigurator('double')}
              className="touch-target flex items-center justify-between rounded-2xl border border-amber-400/30 bg-slate-900/90 p-4 text-left transition-all duration-200 hover:border-amber-400 hover:bg-slate-900 group cursor-pointer shadow-sm"
            >
              <div>
                <span className="technical-label block text-amber-400 text-[10px] font-semibold">Meistgefragt</span>
                <span className="text-base font-bold text-white font-['Poppins']">Doppel-Carport</span>
                <span className="block text-xs text-slate-400 mt-0.5">2 Stellplätze · ~7.6 kWp</span>
              </div>
              <Car className="h-5 w-5 text-amber-400 transition-colors" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onStartConfigurator('commercial')}
              className="touch-target flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left transition-all duration-200 hover:border-amber-400/40 hover:bg-slate-900 group cursor-pointer"
            >
              <div>
                <span className="technical-label block text-amber-400 text-[10px] font-semibold">Solarpflicht</span>
                <span className="text-base font-bold text-white font-['Poppins']">Gewerbeparkplatz</span>
                <span className="block text-xs text-slate-400 mt-0.5">Ab 5 Stellplätze modular</span>
              </div>
              <Building2 className="h-5 w-5 text-slate-500 group-hover:text-amber-400 transition-colors" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onStartConfigurator('terrace')}
              className="touch-target flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left transition-all duration-200 hover:border-amber-400/40 hover:bg-slate-900 group cursor-pointer"
            >
              <div>
                <span className="technical-label block text-amber-400 text-[10px] font-semibold">Wohnraum</span>
                <span className="text-base font-bold text-white font-['Poppins']">PV-Terrasse</span>
                <span className="block text-xs text-slate-400 mt-0.5">Transparentes PV-Glas</span>
              </div>
              <Ruler className="h-5 w-5 text-slate-500 group-hover:text-amber-400 transition-colors" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
