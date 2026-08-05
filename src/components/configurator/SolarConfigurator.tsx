'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Battery, Building2, Car, Check, ChevronLeft, ChevronRight, Home, Info, MapPin, PlugZap, Shield, Sparkles, Wrench } from 'lucide-react';
import type { ConfiguratorState } from './Interactive2DRenderer';

interface SolarConfiguratorProps {
  selectedCategory: ConfiguratorState['category'];
  onOpenLeadModal: (config: ConfiguratorState, pricing: PricingBreakdown) => void;
}

export interface PricingBreakdown {
  baseCarportPrice: number;
  modulesPrice: number;
  inverterPrice: number;
  wallboxPrice: number;
  batteryPrice: number;
  assemblyPrice: number;
  subtotal: number;
  vatAmount: number;
  totalEur: number;
  kwp: number;
  annualKwhYield: number;
  annualSavingsEur: number;
  paybackYears: number;
}

const categories: Array<{ id: ConfiguratorState['category']; name: string; detail: string; icon: typeof Car }> = [
  { id: 'single', name: 'Einzelcarport', detail: '1 Stellplatz', icon: Car },
  { id: 'double', name: 'Doppelcarport', detail: '2 Stellplätze', icon: Car },
  { id: 'terrace', name: 'PV-Terrasse', detail: 'Außenraum', icon: Home },
  { id: 'commercial', name: 'Gewerbe & Fuhrpark', detail: '5+ Stellplätze', icon: Building2 },
  { id: 'fence', name: 'Solarzaun', detail: 'Grundstücksgrenze', icon: Shield },
];

const stepLabels = ['Standort', 'Tragwerk', 'Optionen', 'Ergebnis'];

export const SolarConfigurator: React.FC<SolarConfiguratorProps> = ({ selectedCategory, onOpenLeadModal }) => {
  const [step, setStep] = useState(1);
  const [furthestStep, setFurthestStep] = useState(1);
  const [postcode, setPostcode] = useState('');
  const [timeline, setTimeline] = useState('3-6 Monate');
  const [config, setConfig] = useState<ConfiguratorState>({
    category: selectedCategory,
    spots: selectedCategory === 'commercial' ? 10 : selectedCategory === 'double' ? 2 : 1,
    material: 'aluminum',
    postColor: 'anthracite',
    moduleType: 'dark',
    wallbox: false,
    wallboxType: 'standard',
    battery: false,
    batterySize: '15',
    ledLighting: false,
    assemblyService: true,
  });

  useEffect(() => {
    setConfig((current) => ({
      ...current,
      category: selectedCategory,
      spots: selectedCategory === 'commercial' ? Math.max(current.spots, 10) : selectedCategory === 'double' ? 2 : 1,
    }));
    setStep(1);
    setFurthestStep(1);
  }, [selectedCategory]);

  const update = <K extends keyof ConfiguratorState>(key: K, value: ConfiguratorState[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  const pricing = useMemo<PricingBreakdown>(() => {
    const modules = config.category === 'commercial' ? Math.max(config.spots * 4, 24) : config.category === 'double' ? 16 : config.category === 'terrace' ? 10 : 8;
    const kwp = Math.round(modules * 0.45 * 10) / 10;
    const baseCarportPrice = config.category === 'commercial' ? config.spots * 2650 : config.category === 'double' ? 5200 : config.category === 'terrace' ? 4400 : 3200;
    const modulesPrice = modules * 150;
    const inverterPrice = Math.round(kwp * 170 + 900);
    const wallboxPrice = config.wallbox ? (config.wallboxType === 'v2x' ? 1650 : 850) : 0;
    const batteryPrice = config.battery ? Number(config.batterySize) * 390 : 0;
    const assemblyPrice = config.assemblyService ? Math.round(baseCarportPrice * 0.3) : 0;
    const subtotal = baseCarportPrice + modulesPrice + inverterPrice + wallboxPrice + batteryPrice + assemblyPrice;
    const vatAmount = Math.round(subtotal * 0.19);
    const totalEur = subtotal + vatAmount;
    const annualKwhYield = Math.round(kwp * 900);
    const annualSavingsEur = Math.round(annualKwhYield * 0.3);
    const paybackYears = annualSavingsEur > 0 ? Math.round((totalEur / annualSavingsEur) * 10) / 10 : 0;
    return { baseCarportPrice, modulesPrice, inverterPrice, wallboxPrice, batteryPrice, assemblyPrice, subtotal, vatAmount, totalEur, kwp, annualKwhYield, annualSavingsEur, paybackYears };
  }, [config]);

  const rangeLow = Math.round(pricing.totalEur * 0.8 / 500) * 500;
  const rangeHigh = Math.round(pricing.totalEur * 1.25 / 500) * 500;
  const readyForNext = step !== 1 || /^\d{5}$/.test(postcode);
  const advanceStep = () => {
    if (!readyForNext) return;
    setStep((current) => {
      const next = Math.min(current + 1, stepLabels.length);
      setFurthestStep((furthest) => Math.max(furthest, next));
      return next;
    });
  };

  return (
    <section id="configurator" className="scroll-mt-20 bg-[#0b1621] py-16 sm:py-24">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow justify-center"><Sparkles className="h-4 w-4" /> Unverbindliche Vorprüfung</div>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">Passt ein Solarcarport zu Ihrem Standort?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Vier kurze Schritte liefern eine Planungsindikation. Verbindliche Statik, Leistung, Preis und Verfügbarkeit entstehen erst nach persönlicher Prüfung.</p>
        </div>

        <div className="mx-auto mt-9 max-w-4xl">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Fortschritt">
            {stepLabels.map((label, index) => {
              const targetStep = index + 1;
              const isReachable = targetStep <= furthestStep;
              return (
              <button key={label} disabled={!isReachable} onClick={() => { if (isReachable) setStep(targetStep); }} className={`touch-target flex items-center justify-center rounded-full border px-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50 ${step === targetStep ? 'border-amber-300 bg-amber-300 text-slate-950' : isReachable ? 'border-amber-300/40 bg-amber-300/10 text-amber-200' : 'border-white/10 bg-white/[0.03] text-slate-500'}`}>
                {index + 1}. {label}
              </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-5 grid max-w-6xl gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="order-2 overflow-hidden rounded-3xl border border-white/10 bg-[#071019] lg:order-1">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[330px]">
              <Image src={config.category === 'commercial' ? '/images/commercial_fleet_solar.jpg' : config.category === 'terrace' ? '/images/patio_solar_canopy.jpg' : '/images/hero_solar_carport.jpg'} alt="Visualisierung der gewählten Systemrichtung" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071019] via-transparent to-transparent" />
              <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-white">Visualisierung</span>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-white">Planungsindikation</span>
                <span className="rounded-full bg-sky-300/10 px-3 py-1 text-xs font-bold text-sky-200">keine Preiszusage</span>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3"><dt className="text-xs text-slate-500">PV-Leistung</dt><dd className="mt-1 font-extrabold text-white">ca. {pricing.kwp} kWp</dd></div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3"><dt className="text-xs text-slate-500">Investitionsrahmen</dt><dd className="mt-1 font-extrabold text-white">{rangeLow.toLocaleString('de-DE')}–{rangeHigh.toLocaleString('de-DE')} €</dd></div>
              </dl>
              <p className="mt-4 text-xs leading-5 text-slate-500">Annahmen: 450-W-Module, 900 kWh/kWp Jahresertrag, 0,30 €/kWh, Standard-MwSt. von 19 %. Steuerliche Sonderregeln, Statik, Tiefbau, Netzanschluss und Standortbedingungen können das Ergebnis ändern.</p>
            </div>
          </aside>

          <div className="order-1 flex min-h-[560px] flex-col rounded-3xl border border-white/10 bg-[#0d1824] p-5 sm:p-8 lg:order-2">
            <div className="flex-1">
              {step === 1 && (
                <div>
                  <h3 className="text-2xl font-black text-white">Standort und Nutzung</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Wählen Sie die Systemrichtung und nennen Sie die deutsche Postleitzahl des Projekts.</p>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {categories.map((item) => {
                      const Icon = item.icon;
                      return <button key={item.id} onClick={() => { update('category', item.id); update('spots', item.id === 'commercial' ? 10 : item.id === 'double' ? 2 : 1); }} className={`touch-target rounded-2xl border p-4 text-left transition ${config.category === item.id ? 'border-amber-300 bg-amber-300/10' : 'border-white/10 bg-white/[0.025] hover:border-white/25'}`}><Icon className="h-5 w-5 text-amber-300" /><span className="mt-3 block font-extrabold text-white">{item.name}</span><span className="mt-1 block text-xs text-slate-400">{item.detail}</span></button>;
                    })}
                  </div>
                  {config.category === 'commercial' && <label className="mt-5 block rounded-2xl border border-white/10 bg-white/[0.025] p-4"><span className="flex justify-between text-sm font-bold text-white"><span>Stellplätze</span><span>{config.spots}</span></span><input type="range" min="5" max="100" step="5" value={config.spots} onChange={(event) => update('spots', Number(event.target.value))} className="mt-4 w-full accent-amber-400" /></label>}
                  <label className="mt-5 block"><span className="flex items-center gap-2 text-sm font-bold text-white"><MapPin className="h-4 w-4 text-amber-300" /> Projekt-PLZ</span><input inputMode="numeric" autoComplete="postal-code" maxLength={5} value={postcode} onChange={(event) => { const nextPostcode = event.target.value.replace(/\D/g, ''); setPostcode(nextPostcode); if (!/^\d{5}$/.test(nextPostcode)) { setStep(1); setFurthestStep(1); } }} placeholder="z. B. 38723" className="touch-target mt-2 w-full rounded-xl border border-white/10 bg-[#071019] px-4 text-white placeholder:text-slate-600 focus:border-amber-300" /><span className="mt-2 block text-xs text-slate-500">Die PLZ dient nur der regionalen Vorprüfung und wird nicht automatisch übertragen.</span></label>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-2xl font-black text-white">Tragwerk und Projektphase</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Diese Auswahl ist ein Planungswunsch. Die technische Ausführung wird später geprüft.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[{ id: 'aluminum', title: 'Aluminium', text: 'Leicht, korrosionsbeständig, architektonisch präzise.' }, { id: 'steel', title: 'Stahl / Hybrid', text: 'Für größere Spannweiten und gewerbliche Strukturen.' }].map((item) => <button key={item.id} onClick={() => update('material', item.id as ConfiguratorState['material'])} className={`touch-target rounded-2xl border p-5 text-left ${config.material === item.id ? 'border-amber-300 bg-amber-300/10' : 'border-white/10 bg-white/[0.025]'}`}><Wrench className="h-5 w-5 text-amber-300" /><span className="mt-3 block font-extrabold text-white">{item.title}</span><span className="mt-1 block text-sm leading-6 text-slate-400">{item.text}</span></button>)}
                  </div>
                  <label className="mt-6 block text-sm font-bold text-white">Gewünschter Zeitraum<select value={timeline} onChange={(event) => setTimeline(event.target.value)} className="touch-target mt-2 w-full rounded-xl border border-white/10 bg-[#071019] px-4 text-white"><option>so bald wie möglich</option><option>1-3 Monate</option><option>3-6 Monate</option><option>6-12 Monate</option><option>frühe Planung</option></select></label>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-2xl font-black text-white">Energie und Ausstattung</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Optionen helfen bei der Vorprüfung. Kompatibilität, Lieferbarkeit und Kosten werden im Angebot bestätigt.</p>
                  <div className="mt-6 space-y-3">
                    <OptionRow icon={PlugZap} title="Wallbox vorbereiten" text="Ladepunkt in Planung und Leitungsführung berücksichtigen." checked={config.wallbox} onChange={(checked) => update('wallbox', checked)} />
                    <OptionRow icon={Battery} title="Speicher berücksichtigen" text="Eigenverbrauch und Lastprofil später gemeinsam prüfen." checked={config.battery} onChange={(checked) => update('battery', checked)} />
                    <OptionRow icon={Wrench} title="Montage anfragen" text="Projektbezogene Montage und Netzanschluss separat bewerten." checked={config.assemblyService} onChange={(checked) => update('assemblyService', checked)} />
                  </div>
                  <div className="mt-5 flex gap-3 rounded-2xl border border-sky-300/20 bg-sky-300/[0.06] p-4 text-sm leading-6 text-sky-100"><Info className="mt-0.5 h-5 w-5 shrink-0" />Diese Vorprüfung prüft noch keine Netzanschlusskapazität, Genehmigung, Statik oder steuerliche Eignung.</div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-2xl font-black text-white">Ihre Vorprüfung ist bereit</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Prüfen Sie die Angaben. Im nächsten Schritt wird eine Anfrage vorbereitet — es wird noch nichts automatisch versendet.</p>
                  <div className="mt-6 rounded-2xl border border-amber-300/25 bg-amber-300/[0.06] p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Summary label="System" value={categories.find((item) => item.id === config.category)?.name ?? config.category} />
                      <Summary label="Projektregion" value={postcode || 'nicht angegeben'} />
                      <Summary label="Zeitraum" value={timeline} />
                      <Summary label="Planungsrahmen" value={`${rangeLow.toLocaleString('de-DE')}–${rangeHigh.toLocaleString('de-DE')} €`} />
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300"><li className="flex gap-3"><Check className="h-5 w-5 shrink-0 text-amber-300" />Annahmen bleiben sichtbar und überprüfbar.</li><li className="flex gap-3"><Check className="h-5 w-5 shrink-0 text-amber-300" />Keine automatische ERP-, CRM- oder KI-Übertragung.</li><li className="flex gap-3"><Check className="h-5 w-5 shrink-0 text-amber-300" />Verbindlichkeit erst nach persönlicher Prüfung.</li></ul>
                  <button onClick={() => onOpenLeadModal(config, pricing)} className="touch-target mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-amber-300 px-6 font-extrabold text-slate-950 hover:bg-amber-200">Anfrage vorbereiten <ArrowRight className="h-5 w-5" /></button>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
              <button disabled={step === 1} onClick={() => setStep((current) => current - 1)} className="touch-target inline-flex items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-bold text-slate-300 disabled:opacity-30"><ChevronLeft className="h-4 w-4" /> Zurück</button>
              {step < 4 && <button disabled={!readyForNext} onClick={advanceStep} className="touch-target inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 text-sm font-extrabold text-slate-950 disabled:cursor-not-allowed disabled:opacity-35">Weiter <ChevronRight className="h-4 w-4" /></button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function OptionRow({ icon: Icon, title, text, checked, onChange }: { icon: typeof Battery; title: string; text: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex min-h-[76px] cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-amber-300"><Icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="block font-extrabold text-white">{title}</span><span className="mt-1 block text-xs leading-5 text-slate-400">{text}</span></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-6 w-6 shrink-0 accent-amber-400" /></label>;
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</dt><dd className="mt-1 font-extrabold text-white">{value}</dd></div>;
}
