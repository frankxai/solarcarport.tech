'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Check, FileCheck2, Layers3, Scale, ShieldCheck } from 'lucide-react';

const topics = {
  structure: {
    label: 'Tragwerk',
    icon: ShieldCheck,
    title: 'Das Tragwerk folgt dem Standort — nicht dem Prospekt.',
    body: 'Schnee-, Wind- und Anschlussbedingungen unterscheiden sich. Deshalb wird die Eignung erst nach Standortdaten und technischer Prüfung bestätigt.',
    points: ['Standort und Nutzung erfassen', 'Tragwerksannahmen offenlegen', 'Nachweise im Angebot benennen'],
    image: '/images/hero_solar_carport.jpg',
  },
  modules: {
    label: 'PV-Dach',
    icon: Layers3,
    title: 'Module, Licht und Entwässerung als ein System denken.',
    body: 'Bifaziale oder lichtdurchlässige Module können sinnvoll sein. Die Auswahl hängt von Geometrie, Untergrund, Verschattung und gewünschter Aufenthaltsqualität ab.',
    points: ['Modultyp passend zur Nutzung', 'Licht und Verschattung abwägen', 'Entwässerung früh mitplanen'],
    image: '/images/patio_solar_canopy.jpg',
  },
  rules: {
    label: 'Rahmenbedingungen',
    icon: Scale,
    title: 'Genehmigung, Steuer und Solarpflicht sind Einzelfallthemen.',
    body: 'Vorgaben unterscheiden sich nach Bundesland, Projektart und Betreiber. Unsere Vorprüfung ersetzt keine behördliche, steuerliche oder statische Freigabe.',
    points: ['Projektart und Bundesland klären', 'Steuerliche Eignung nicht pauschalisieren', 'Finale Freigaben dokumentieren'],
    image: '/images/commercial_fleet_solar.jpg',
  },
} as const;

type TopicKey = keyof typeof topics;

export const PreeminenceEducation: React.FC = () => {
  const [active, setActive] = useState<TopicKey>('structure');
  const tabRefs = useRef<Record<TopicKey, HTMLButtonElement | null>>({ structure: null, modules: null, rules: null });
  const topic = topics[active];
  const TopicIcon = topic.icon;
  const topicKeys = Object.keys(topics) as TopicKey[];

  const selectRelativeTab = (current: TopicKey, direction: -1 | 1) => {
    const currentIndex = topicKeys.indexOf(current);
    const nextKey = topicKeys[(currentIndex + direction + topicKeys.length) % topicKeys.length];
    setActive(nextKey);
    tabRefs.current[nextKey]?.focus();
  };

  return (
    <section id="planning" className="border-y border-white/10 bg-slate-950/55 py-16 sm:py-24 font-['Poppins']">
      <div className="section-shell">
        <div className="max-w-3xl">
          <div className="eyebrow"><FileCheck2 className="h-4 w-4 text-amber-400" /> Planungswissen</div>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-5xl font-['Playfair_Display']">
            Was vor einem Solarcarport <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">geklärt werden muss.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 font-light">Kein Marketing-Rechner ersetzt die fundierte Projektprüfung. Diese drei Kernfragen strukturieren Ihren ersten belastbaren Schritt.</p>
        </div>

        <div className="mt-9 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Planungsthemen">
          {topicKeys.map((key) => {
            const item = topics[key];
            const Icon = item.icon;
            return (
              <button
                key={key}
                id={`planning-tab-${key}`}
                ref={(element) => { tabRefs.current[key] = element; }}
                role="tab"
                aria-selected={active === key}
                aria-controls={`planning-panel-${key}`}
                tabIndex={active === key ? 0 : -1}
                onClick={() => setActive(key)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight') { event.preventDefault(); selectRelativeTab(key, 1); }
                  if (event.key === 'ArrowLeft') { event.preventDefault(); selectRelativeTab(key, -1); }
                  if (event.key === 'Home') { event.preventDefault(); setActive(topicKeys[0]); tabRefs.current[topicKeys[0]]?.focus(); }
                  if (event.key === 'End') { event.preventDefault(); setActive(topicKeys[topicKeys.length - 1]); tabRefs.current[topicKeys[topicKeys.length - 1]]?.focus(); }
                }}
                className={`touch-target shrink-0 rounded-full border px-5 text-sm font-bold transition ${active === key ? 'border-amber-300 bg-amber-300 text-slate-950' : 'border-white/15 bg-white/[0.035] text-slate-300 hover:border-white/30'}`}
              >
                <span className="flex items-center gap-2"><Icon className="h-4 w-4" />{item.label}</span>
              </button>
            );
          })}
        </div>

        <div id={`planning-panel-${active}`} role="tabpanel" aria-labelledby={`planning-tab-${active}`} className="mt-5 grid overflow-hidden rounded-3xl border border-white/10 bg-[#0d1824] lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <TopicIcon className="h-8 w-8 text-amber-300" aria-hidden="true" />
            <h3 className="mt-6 text-2xl font-black tracking-tight text-white sm:text-3xl">{topic.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{topic.body}</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {topic.points.map((point) => (
                <li key={point} className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />{point}</li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-72 lg:min-h-[430px]">
            <Image src={topic.image} alt="Visualisierung einer Solarcarport-Planung" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1824]/70 to-transparent" />
            <span className="absolute bottom-4 right-4 rounded-full bg-black/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-200">Visualisierung</span>
          </div>
        </div>
      </div>
    </section>
  );
};
