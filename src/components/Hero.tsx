'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight, Building2, Car, MapPin, Ruler, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { ConfiguratorState } from './configurator/Interactive2DRenderer';

interface HeroProps {
  onStartConfigurator: (category?: ConfiguratorState['category']) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartConfigurator }) => {
  return (
    <>
      <section id="top" className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden border-b border-white/10">
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
            <div className="eyebrow mb-5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Planung & Materialkompetenz aus Seesen (Harz)
            </div>

            <h1 className="max-w-[12ch] text-[clamp(2.75rem,11vw,5.9rem)] font-black leading-[0.94] tracking-[-0.065em] text-white font-['Syne']">
              Aus Parkfläche wird Energiefläche.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              Solarcarports und PV-Überdachungen für private Grundstücke, Gewerbe und Fuhrparks — statisch berechnet nach DIN EN 1991, mit 0% MwSt (§ 12 Abs. 3 UStG) und geprüftem RIAL Energy Lagerbestand.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onStartConfigurator()}
                className="touch-target inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 text-base font-black text-slate-950 shadow-gold-subtle transition hover:bg-amber-300 active:scale-95"
              >
                <span>Standort prüfen & konfigurieren</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="#projects"
                className="touch-target inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-6 text-sm font-bold text-white backdrop-blur transition hover:border-white/30"
              >
                <span>Realisierte Projekte ansehen</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3">
                <span className="technical-label block text-amber-300">Schneelast</span>
                <span className="mt-1 block text-sm font-extrabold text-white">2.5 kN/m² DIN EN 1991</span>
              </div>
              <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3">
                <span className="technical-label block text-amber-300">Steuer</span>
                <span className="mt-1 block text-sm font-extrabold text-white">0% MwSt (§12 UStG)</span>
              </div>
              <div className="col-span-2 rounded-xl border border-white/5 bg-slate-950/60 p-3 sm:col-span-1">
                <span className="technical-label block text-amber-300">Material</span>
                <span className="mt-1 block text-sm font-extrabold text-white">Aluminium T6 / Stahl</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Category Selector */}
      <section className="border-b border-white/10 bg-[#071019] py-8 sm:py-10">
        <div className="section-shell">
          <div className="mb-4 flex items-center justify-between">
            <span className="technical-label text-slate-400">Schnelleinstieg nach Anwendungsbereich</span>
            <span className="hidden text-xs text-slate-500 sm:inline font-mono">RIAL Energy GmbH</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              onClick={() => onStartConfigurator('single')}
              className="touch-target flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left transition hover:border-amber-300/40 hover:bg-slate-900"
            >
              <div>
                <span className="technical-label block text-amber-300">Privat</span>
                <span className="text-base font-extrabold text-white">Einzel-Carport</span>
                <span className="block text-xs text-slate-400">1 Stellplatz · ~3.8 kWp</span>
              </div>
              <Car className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onStartConfigurator('double')}
              className="touch-target flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left transition hover:border-amber-300/40 hover:bg-slate-900"
            >
              <div>
                <span className="technical-label block text-amber-300">Meistgefragt</span>
                <span className="text-base font-extrabold text-white">Doppel-Carport</span>
                <span className="block text-xs text-slate-400">2 Stellplätze · ~7.6 kWp</span>
              </div>
              <Car className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onStartConfigurator('commercial')}
              className="touch-target flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left transition hover:border-amber-300/40 hover:bg-slate-900"
            >
              <div>
                <span className="technical-label block text-amber-300">Solarpflicht</span>
                <span className="text-base font-extrabold text-white">Gewerbeparkplatz</span>
                <span className="block text-xs text-slate-400">Ab 5 Stellplätze modular</span>
              </div>
              <Building2 className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onStartConfigurator('terrace')}
              className="touch-target flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left transition hover:border-amber-300/40 hover:bg-slate-900"
            >
              <div>
                <span className="technical-label block text-amber-300">Wohnraum</span>
                <span className="text-base font-extrabold text-white">PV-Terrasse</span>
                <span className="block text-xs text-slate-400">Transparentes PV-Glas</span>
              </div>
              <Ruler className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
