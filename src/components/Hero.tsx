'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight, Building2, Car, MapPin, Ruler, ShieldCheck } from 'lucide-react';
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
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,16,25,0.98)_0%,rgba(7,16,25,0.9)_46%,rgba(7,16,25,0.25)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#071019_0%,transparent_42%)]" />

        <div className="section-shell flex min-h-[calc(100svh-72px)] items-end pb-10 pt-16 sm:items-center sm:py-20">
          <div className="max-w-3xl">
            <div className="eyebrow mb-5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Planung & Materialkompetenz aus Seesen
            </div>

            <h1 className="max-w-[12ch] text-[clamp(2.75rem,11vw,5.9rem)] font-black leading-[0.94] tracking-[-0.065em] text-white">
              Aus Parkfläche wird Energiefläche.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              Solarcarports und PV-Überdachungen für private Grundstücke, Gewerbe und Fuhrparks — strukturiert geplant, nachvollziehbar angefragt und persönlich geprüft.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => onStartConfigurator('double')}
                className="touch-target inline-flex items-center justify-center gap-3 rounded-full bg-amber-400 px-7 text-base font-extrabold text-slate-950 shadow-[0_18px_45px_rgba(244,170,34,0.22)] transition hover:bg-amber-300"
              >
                Standort prüfen
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <a
                href="#systems"
                className="touch-target inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-black/20 px-6 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Systeme ansehen
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 border-t border-white/15 pt-5 text-sm text-slate-300 sm:grid-cols-3">
              <div className="flex items-center gap-2.5"><Ruler className="h-4 w-4 text-amber-300" /> Standortbezogene Vorprüfung</div>
              <div className="flex items-center gap-2.5"><ShieldCheck className="h-4 w-4 text-amber-300" /> Nachweise im Angebot</div>
              <div className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-amber-300" /> Persönliche Rückmeldung</div>
            </div>
          </div>
        </div>

        <span className="absolute bottom-3 right-4 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-300 backdrop-blur-md">
          Realisiertes System
        </span>
      </section>

      <section className="border-b border-white/10 bg-[#0b1621] py-8 sm:py-10" aria-labelledby="path-title">
        <div className="section-shell">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1fr_1fr] lg:items-stretch">
            <div className="flex flex-col justify-center py-2">
              <div className="eyebrow">Ihr Projekt</div>
              <h2 id="path-title" className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">Welcher Standort passt?</h2>
            </div>

            <button
              onClick={() => onStartConfigurator('double')}
              className="group min-h-32 rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left transition hover:border-amber-300/50 hover:bg-white/[0.06]"
            >
              <span className="flex items-center justify-between">
                <Car className="h-6 w-6 text-amber-300" aria-hidden="true" />
                <ArrowRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-amber-300" />
              </span>
              <span className="mt-5 block text-lg font-extrabold text-white">Privat & Wohnen</span>
              <span className="mt-1 block text-sm leading-6 text-slate-400">Einzel- oder Doppelcarport, Terrasse und architektonische Überdachung.</span>
            </button>

            <button
              onClick={() => onStartConfigurator('commercial')}
              className="group min-h-32 rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left transition hover:border-sky-300/50 hover:bg-white/[0.06]"
            >
              <span className="flex items-center justify-between">
                <Building2 className="h-6 w-6 text-sky-300" aria-hidden="true" />
                <ArrowRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-sky-300" />
              </span>
              <span className="mt-5 block text-lg font-extrabold text-white">Gewerbe & Fuhrpark</span>
              <span className="mt-1 block text-sm leading-6 text-slate-400">Mehrere Stellplätze, Ladeinfrastruktur und projektbezogene Machbarkeit.</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
