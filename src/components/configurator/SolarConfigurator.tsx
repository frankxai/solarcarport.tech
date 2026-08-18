'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Battery, Building2, Car, Check, ChevronLeft, ChevronRight, Home, Info, MapPin, PlugZap, Shield, Sparkles, Wrench, FileSpreadsheet } from 'lucide-react';
import type { ConfiguratorState } from './Interactive2DRenderer';

interface SolarConfiguratorProps {
  selectedCategory?: ConfiguratorState['category'];
  onOpenLeadModal: (config: ConfiguratorState, pricing: PricingBreakdown, project: ProjectContext) => void;
  onOpenERP?: () => void;
}

export interface ProjectContext {
  postcode: string;
  timeline: string;
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

const stepLabels = ['Standort & PLZ', 'Tragwerk', 'Optionen', 'Ergebnis'];

export const SolarConfigurator: React.FC<SolarConfiguratorProps> = ({ selectedCategory = 'double', onOpenLeadModal, onOpenERP }) => {
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
    if (selectedCategory) {
      setConfig((current) => ({
        ...current,
        category: selectedCategory,
        spots: selectedCategory === 'commercial' ? Math.max(current.spots, 10) : selectedCategory === 'double' ? 2 : 1,
      }));
    }
  }, [selectedCategory]);

  const update = <K extends keyof ConfiguratorState>(key: K, value: ConfiguratorState[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  const pricing = useMemo<PricingBreakdown>(() => {
    const modules = config.category === 'commercial' ? Math.max(config.spots * 4, 24) : config.category === 'double' ? 16 : config.category === 'terrace' ? 10 : 8;
    const kwp = Math.round(modules * 0.47 * 10) / 10;
    const baseCarportPrice = config.category === 'commercial' ? config.spots * 2650 : config.category === 'double' ? 4900 : config.category === 'terrace' ? 4400 : 2900;
    const modulesPrice = modules * 145;
    const inverterPrice = Math.round(kwp * 170 + 850);
    const wallboxPrice = config.wallbox ? (config.wallboxType === 'v2x' ? 1490 : 790) : 0;
    const batteryPrice = config.battery ? Number(config.batterySize) * 380 : 0;
    const assemblyPrice = config.assemblyService ? Math.round(baseCarportPrice * 0.28) : 0;
    const subtotal = baseCarportPrice + modulesPrice + inverterPrice + wallboxPrice + batteryPrice + assemblyPrice;
    const vatAmount = 0; // 0% MwSt (§ 12 Abs. 3 UStG)
    const totalEur = subtotal;
    const annualKwhYield = Math.round(kwp * 980);
    const annualSavingsEur = Math.round(annualKwhYield * 0.32);
    const paybackYears = annualSavingsEur > 0 ? Math.round((totalEur / annualSavingsEur) * 10) / 10 : 0;
    return { baseCarportPrice, modulesPrice, inverterPrice, wallboxPrice, batteryPrice, assemblyPrice, subtotal, vatAmount, totalEur, kwp, annualKwhYield, annualSavingsEur, paybackYears };
  }, [config]);

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
    <section id="configurator" className="scroll-mt-20 bg-[#071019] py-16 sm:py-24 border-b border-white/10">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow justify-center"><Sparkles className="h-4 w-4" /> Unverbindliche Standort-Vorprüfung</div>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl font-['Syne']">Passt ein Solarcarport zu Ihrem Standort?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Vier kurze Schritte liefern eine Planungsindikation nach DIN EN 1991 mit 0% MwSt (§12 Abs. 3 UStG).</p>
        </div>

        <div className="mx-auto mt-9 max-w-4xl">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Fortschritt">
            {stepLabels.map((label, index) => {
              const targetStep = index + 1;
              const isReachable = targetStep <= furthestStep;
              return (
                <button
                  key={label}
                  disabled={!isReachable}
                  onClick={() => { if (isReachable) setStep(targetStep); }}
                  className={`touch-target flex items-center justify-center rounded-full border px-3 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-50 ${
                    step === targetStep
                      ? 'border-amber-400 bg-amber-400 text-slate-950 font-black'
                      : isReachable
                      ? 'border-amber-400/40 bg-amber-400/10 text-amber-200'
                      : 'border-white/10 bg-white/[0.03] text-slate-500'
                  }`}
                >
                  {index + 1}. {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-white/10 bg-slate-900/80 p-6 sm:p-10 shadow-2xl">
          {/* STEP 1: STANDORT & ANWENDUNG */}
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-extrabold text-white sm:text-2xl font-['Syne']">Schritt 1: Anwendung & Standort-Postleitzahl</h3>
                <p className="mt-1 text-sm text-slate-400">Geben Sie Ihre PLZ für die regionale Schneelast- und Einstrahlungsprüfung an.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const selected = config.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => update('category', cat.id)}
                      className={`touch-target flex items-start justify-between rounded-2xl border p-4 text-left transition ${
                        selected ? 'border-amber-400 bg-amber-400/10' : 'border-white/10 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-white text-base font-['Syne'] block">{cat.name}</span>
                        <span className="text-xs text-slate-400 block mt-1">{cat.detail}</span>
                      </div>
                      <Icon className={`h-5 w-5 ${selected ? 'text-amber-400' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
                  <label htmlFor="postcode" className="block text-xs font-semibold text-slate-300">
                    Postleitzahl (Deutschland):
                  </label>
                  <div className="mt-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-400" />
                    <input
                      id="postcode"
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="z.B. 38722 (Seesen)"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
                  <label htmlFor="timeline" className="block text-xs font-semibold text-slate-300">
                    Geplanter Realisierungszeitraum:
                  </label>
                  <select
                    id="timeline"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="mt-2 w-full bg-transparent text-sm font-bold text-white outline-none cursor-pointer"
                  >
                    <option value="Sofort" className="bg-slate-900">Sofort (Bestand prüfen)</option>
                    <option value="1-3 Monate" className="bg-slate-900">1-3 Monate</option>
                    <option value="3-6 Monate" className="bg-slate-900">3-6 Monate</option>
                    <option value="Nur Vorplanung" className="bg-slate-900">Nur Vorplanung</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TRAGWERK & MATERIAL */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-white sm:text-2xl font-['Syne']">Schritt 2: Tragwerk & Schneelast-Zertifizierung</h3>
                <p className="mt-1 text-sm text-slate-400">Alle Profile sind nach DIN EN 1991 für bis zu 2.5 kN/m² Schneelast geprüft.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => update('material', 'aluminum')}
                  className={`p-5 rounded-2xl border text-left cursor-pointer ${
                    config.material === 'aluminum' ? 'border-amber-400 bg-amber-400/10' : 'border-white/10 bg-slate-950'
                  }`}
                >
                  <div className="font-extrabold text-white text-base">Aluminium T6 (Eloxiert)</div>
                  <div className="text-xs text-slate-400 mt-1">100% rostfrei, leicht, 30+ Jahre Standzeit</div>
                </button>

                <button
                  type="button"
                  onClick={() => update('material', 'steel')}
                  className={`p-5 rounded-2xl border text-left cursor-pointer ${
                    config.material === 'steel' ? 'border-amber-400 bg-amber-400/10' : 'border-white/10 bg-slate-950'
                  }`}
                >
                  <div className="font-extrabold text-white text-base">Feuerverzinkter Stahl</div>
                  <div className="text-xs text-slate-400 mt-1">Große Spannweiten für Gewerbeparkplätze</div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: OPTIONEN */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-white sm:text-2xl font-['Syne']">Schritt 3: Wallbox, Speicher & Montage</h3>
                <p className="mt-1 text-sm text-slate-400">Integrieren Sie EV-Ladepunkte und Batteriespeicher.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-slate-950">
                  <div className="flex items-center space-x-3">
                    <PlugZap className="w-5 h-5 text-cyan-400" />
                    <div>
                      <div className="font-bold text-white text-sm">Wallbox-Vorbereitung (11kW / 22kW)</div>
                      <div className="text-xs text-slate-400">Kabelführung im Trägerprofil integriert</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.wallbox}
                    onChange={(e) => update('wallbox', e.target.checked)}
                    className="w-5 h-5 accent-amber-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-slate-950">
                  <div className="flex items-center space-x-3">
                    <Wrench className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="font-bold text-white text-sm">Komplettmontage & Netzanschluss</div>
                      <div className="text-xs text-slate-400">Fachmontage durch zertifizierte RIAL Partner</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.assemblyService}
                    onChange={(e) => update('assemblyService', e.target.checked)}
                    className="w-5 h-5 accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ERGEBNIS */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-white sm:text-2xl font-['Syne']">Schritt 4: Ihre Standort-Planungsindikation</h3>
                <p className="mt-1 text-sm text-slate-400">Berechnung für PLZ {postcode || '38722'} mit 0% MwSt (§ 12 Abs. 3 UStG).</p>
              </div>

              <div className="p-6 rounded-2xl border border-amber-400/30 bg-slate-950 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-slate-300">Geschätzter Gesamtpreis:</span>
                  <span className="text-3xl font-black text-amber-400 font-['Syne']">€{pricing.totalEur.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs font-mono">
                  <div><span className="text-slate-400 block">LEISTUNG</span><strong className="text-white">{pricing.kwp} kWp</strong></div>
                  <div><span className="text-slate-400 block">JAHRESERTRAG</span><strong className="text-cyan-400">{pricing.annualKwhYield.toLocaleString()} kWh</strong></div>
                  <div><span className="text-slate-400 block">ERSPARNIS</span><strong className="text-emerald-400">€{pricing.annualSavingsEur.toLocaleString()}/a</strong></div>
                  <div><span className="text-slate-400 block">MWST</span><strong className="text-emerald-400">0% (§12 UStG)</strong></div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenLeadModal(config, pricing, { postcode, timeline })}
                className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base shadow-gold-subtle transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Kostenloses Engineering-Dossier anfordern</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-8">
            <button
              disabled={step === 1}
              onClick={() => setStep(prev => Math.max(prev - 1, 1))}
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-slate-950 text-xs font-bold text-slate-300 disabled:opacity-30 hover:bg-slate-800 flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Zurück</span>
            </button>

            {step < 4 ? (
              <button
                disabled={!readyForNext}
                onClick={advanceStep}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-black shadow-gold-subtle hover:bg-amber-300 disabled:opacity-40 flex items-center space-x-1.5"
              >
                <span>Weiter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onOpenLeadModal(config, pricing, { postcode, timeline })}
                className="px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 text-xs font-black shadow-cyan-glow hover:bg-cyan-300 flex items-center space-x-1.5"
              >
                <span>Dossier Anfordern</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
