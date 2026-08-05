'use client';

import React, { useState } from 'react';
import { 
  Car, Building2, Home, Shield, ChevronRight, ChevronLeft, Zap, Sun, 
  Cpu, Battery, Wrench, FileSpreadsheet, ArrowRight, Download, Sparkles
} from 'lucide-react';
import { Interactive2DRenderer, ConfiguratorState } from './Interactive2DRenderer';

interface SolarConfiguratorProps {
  onOpenERP: () => void;
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
  vatAmount: number; // 0% under §12 Abs. 3 UStG
  totalEur: number;
  kwp: number;
  annualKwhYield: number;
  annualSavingsEur: number;
  paybackYears: number;
}

export const SolarConfigurator: React.FC<SolarConfiguratorProps> = ({ onOpenERP, onOpenLeadModal }) => {
  const [step, setStep] = useState<number>(1);

  const [config, setConfig] = useState<ConfiguratorState>({
    category: 'double',
    spots: 2,
    material: 'aluminum',
    postColor: 'anthracite',
    moduleType: 'dark',
    wallbox: true,
    wallboxType: 'v2x',
    battery: false,
    batterySize: '15',
    ledLighting: true,
    assemblyService: true,
  });

  // Calculate pricing & energy yield
  const moduleCount = config.category === 'commercial' ? config.spots * 6 : config.category === 'double' ? 16 : 8;
  const kwp = Math.round(moduleCount * 0.47 * 10) / 10;
  const annualKwhYield = Math.round(kwp * 980);
  const annualSavingsEur = Math.round(annualKwhYield * 0.32);

  // Price calculations
  const baseStructurePrice = config.category === 'commercial' ? config.spots * 2800 : config.category === 'double' ? 4900 : 2900;
  const modulesPrice = Math.round(moduleCount * 145);
  const inverterPrice = Math.round(kwp * 180 + 800);
  const wallboxPrice = config.wallbox ? (config.wallboxType === 'v2x' ? 1490 : 790) : 0;
  const batteryPrice = config.battery ? parseInt(config.batterySize) * 380 : 0;
  const assemblyPrice = config.assemblyService ? Math.round(baseStructurePrice * 0.28) : 0;

  const subtotal = baseStructurePrice + modulesPrice + inverterPrice + wallboxPrice + batteryPrice + assemblyPrice;
  const vatAmount = 0; // 0% MwSt (§12 Abs. 3 UStG)
  const totalEur = subtotal;
  const paybackYears = Math.round((totalEur / annualSavingsEur) * 10) / 10;

  const pricing: PricingBreakdown = {
    baseCarportPrice: baseStructurePrice,
    modulesPrice,
    inverterPrice,
    wallboxPrice,
    batteryPrice,
    assemblyPrice,
    subtotal,
    vatAmount,
    totalEur,
    kwp,
    annualKwhYield,
    annualSavingsEur,
    paybackYears,
  };

  const updateConfig = (key: keyof ConfiguratorState, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section id="configurator" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-solar-500/10 border border-solar-500/30 text-solar-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4" />
            <span>Interactive 6-Step Guided Configurator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            Design Your <span className="text-transparent bg-clip-text bg-solar-gradient">Solar Overhang Infrastructure</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Select your layout, framing, PV tech, and smart options. Our live ERP engine calculates exact profile bill-of-materials and pricing indications in real time.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono">
            {[
              '1. Scope',
              '2. Framing',
              '3. PV Tech',
              '4. ERP BOM',
              '5. Upsells',
              '6. Summary'
            ].map((label, idx) => (
              <button
                key={idx}
                onClick={() => setStep(idx + 1)}
                className={`py-2.5 px-1 rounded-xl transition-all border cursor-pointer ${
                  step === idx + 1
                    ? 'bg-solar-500 text-slate-950 font-black border-solar-400 shadow-solar-glow'
                    : step > idx + 1
                    ? 'bg-slate-900 text-solar-400 border-slate-700'
                    : 'bg-slate-900/50 text-slate-500 border-slate-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Configurator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live CAD Preview & Real-time KPI Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <Interactive2DRenderer config={config} />

            {/* Real-time KPI Box */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400 uppercase">Estimated Investment</span>
                <span className="text-xs text-emerald-400 font-bold">0% MwSt Applicable</span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white">€{totalEur.toLocaleString()}</span>
                <span className="text-xs text-slate-400">Total System Estimate</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">PV CAPACITY</span>
                  <strong className="text-solar-400 font-bold text-sm">{kwp} kWp</strong>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">ANNUAL SAVINGS</span>
                  <strong className="text-electric-400 font-bold text-sm">€{annualSavingsEur.toLocaleString()}/yr</strong>
                </div>
              </div>

              <button
                onClick={onOpenERP}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-electric-400 text-xs font-mono border border-slate-800 hover:border-electric-500/40 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Inspect Live ERP BOM Parts ({moduleCount} Modules)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Step Form Workspace */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 min-h-[520px] flex flex-col justify-between">
            
            {/* STEP 1: SCOPE */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">Step 1: Select Application & Capacity</h3>
                  <p className="text-xs text-slate-400 mt-1">Choose the primary intended use for your solar overhang.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'single', name: 'Single Solar Carport', desc: '1 Vehicle Spot (~3.8 kWp)', icon: Car },
                    { id: 'double', name: 'Double Solar Carport', desc: '2 Vehicle Spots (~7.6 kWp)', icon: Car },
                    { id: 'commercial', name: 'Commercial Fleet Lot', desc: '5 to 100+ Spots (25+ kWp)', icon: Building2 },
                    { id: 'terrace', name: 'Patio & Terrace Canopy', desc: 'Outdoor Living (~5.0 kWp)', icon: Home },
                    { id: 'fence', name: 'Bifacial Solar Fence', desc: 'Vertical Boundary (~4.0 kWp)', icon: Shield },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => updateConfig('category', item.id)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                        config.category === item.id
                          ? 'bg-solar-500/10 border-solar-500 shadow-solar-glow'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <item.icon className="w-6 h-6 text-solar-400 mb-2" />
                      <div className="font-bold text-white text-sm">{item.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>

                {config.category === 'commercial' && (
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                    <label className="text-xs text-slate-300 font-mono flex justify-between">
                      <span>Commercial Parking Vehicle Spots:</span>
                      <strong className="text-solar-400 font-bold">{config.spots} Spots</strong>
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      step={5}
                      value={config.spots}
                      onChange={(e) => updateConfig('spots', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-solar-500"
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: FRAMING & PROFILES */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">Step 2: Structural Material & Post Architecture</h3>
                  <p className="text-xs text-slate-400 mt-1">Select structural extrusion profiles engineered for up to 2.5 kN/m² snow load.</p>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-mono text-slate-300 uppercase">Structural Material:</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => updateConfig('material', 'aluminum')}
                      className={`p-4 rounded-xl border text-left cursor-pointer ${
                        config.material === 'aluminum' ? 'bg-solar-500/10 border-solar-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-sm">Extruded Anodized Aluminum</div>
                      <div className="text-xs text-slate-400 mt-1">100% Rust-Proof, Lightweight T6 Alloy</div>
                    </button>
                    <button
                      onClick={() => updateConfig('material', 'steel')}
                      className={`p-4 rounded-xl border text-left cursor-pointer ${
                        config.material === 'steel' ? 'bg-solar-500/10 border-solar-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-sm">Galvanized Structural Steel</div>
                      <div className="text-xs text-slate-400 mt-1">Heavy Industrial Span Subframe</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-mono text-slate-300 uppercase">Post Color Finish (RAL):</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'anthracite', name: 'Anthracite (RAL 7016)' },
                      { id: 'silver', name: 'Anodized Silver' },
                      { id: 'black', name: 'Deep Black (RAL 9005)' },
                    ].map((col) => (
                      <button
                        key={col.id}
                        onClick={() => updateConfig('postColor', col.id)}
                        className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer ${
                          config.postColor === col.id ? 'bg-electric-500/10 border-electric-400 text-electric-400' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PV MODULE TECH */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">Step 3: Bifacial Glass-Glass Photovoltaics</h3>
                  <p className="text-xs text-slate-400 mt-1">Choose between high-transparency patio glass or maximum-power bifacial TOPCon.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => updateConfig('moduleType', 'dark')}
                    className={`p-5 rounded-2xl border text-left cursor-pointer ${
                      config.moduleType === 'dark' ? 'bg-solar-500/10 border-solar-500' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <Sun className="w-6 h-6 text-solar-400 mb-2" />
                    <div className="font-bold text-white text-sm">470W Bifacial TOPCon Dark</div>
                    <div className="text-xs text-slate-400 mt-1">Maximum energy production (+25% albedo yield gain). Dual 2.0mm glass.</div>
                  </button>

                  <button
                    onClick={() => updateConfig('moduleType', 'translucent')}
                    className={`p-5 rounded-2xl border text-left cursor-pointer ${
                      config.moduleType === 'translucent' ? 'bg-electric-500/10 border-electric-400' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <Sun className="w-6 h-6 text-electric-400 mb-2" />
                    <div className="font-bold text-white text-sm">450W Translucent 20% Light</div>
                    <div className="text-xs text-slate-400 mt-1">Permits soft natural daylight underneath. Ideal for patio terraces & luxury carports.</div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: ERP BOM BREAKDOWN */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">Step 4: Live ERP Bill of Materials</h3>
                  <p className="text-xs text-slate-400 mt-1">Real-time inventory calculation directly from RIAL Energy's Seesen distribution hub.</p>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-400 font-bold">
                    <span>COMPONENT</span>
                    <span>SKU / QTY</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-300">Extruded Support Posts</span>
                    <span className="text-solar-400 font-bold">{config.material === 'aluminum' ? 'RAL-ALU-POST-2800' : 'RAL-STL-POST'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-300">Bifacial PV Glass Modules</span>
                    <span className="text-solar-400 font-bold">{moduleCount} Modules ({kwp} kWp)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-300">3-Phase Hybrid Inverter</span>
                    <span className="text-solar-400 font-bold">INV-HYB-{Math.ceil(kwp)}K-3P</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-300">Structural Snow Load Rating</span>
                    <span className="text-emerald-400 font-bold">2.5 kN/m² (DIN EN 1991)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-solar-500/10 border border-solar-500/30 text-xs text-slate-300 flex items-center justify-between">
                  <span>Want to view detailed stock counts in Seesen?</span>
                  <button onClick={onOpenERP} className="text-solar-400 font-bold underline cursor-pointer">Open ERP Drawer</button>
                </div>
              </div>
            )}

            {/* STEP 5: UPSELLS */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">Step 5: Smart Infrastructure Add-ons</h3>
                  <p className="text-xs text-slate-400 mt-1">Upgrade your carport with EV charging, battery storage, and turnkey installation.</p>
                </div>

                <div className="space-y-3">
                  {/* EV Wallbox */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Zap className="w-5 h-5 text-electric-400" />
                        <div>
                          <div className="font-bold text-white text-sm">EV Wallbox / Charging Station</div>
                          <div className="text-xs text-slate-400">Charge electric vehicles directly from your carport canopy</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.wallbox}
                        onChange={(e) => updateConfig('wallbox', e.target.checked)}
                        className="w-5 h-5 accent-electric-500 cursor-pointer"
                      />
                    </div>

                    {config.wallbox && (
                      <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                        <button
                          onClick={() => updateConfig('wallboxType', 'standard')}
                          className={`p-2.5 rounded-lg border cursor-pointer ${config.wallboxType === 'standard' ? 'bg-electric-500/20 border-electric-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                        >
                          11kW Standard Charging (+€790)
                        </button>
                        <button
                          onClick={() => updateConfig('wallboxType', 'v2x')}
                          className={`p-2.5 rounded-lg border cursor-pointer ${config.wallboxType === 'v2x' ? 'bg-electric-500/20 border-electric-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                        >
                          22kW V2X Bidirectional (+€1,490)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Battery Storage */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Battery className="w-5 h-5 text-emerald-400" />
                        <div>
                          <div className="font-bold text-white text-sm">High-Voltage Battery Storage</div>
                          <div className="text-xs text-slate-400">Store solar energy for night charging & emergency backup</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.battery}
                        onChange={(e) => updateConfig('battery', e.target.checked)}
                        className="w-5 h-5 accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    {config.battery && (
                      <div className="grid grid-cols-3 gap-2 pt-2 text-xs font-mono">
                        {['10', '15', '30'].map((sz) => (
                          <button
                            key={sz}
                            onClick={() => updateConfig('batterySize', sz as any)}
                            className={`p-2 rounded-lg border cursor-pointer ${config.batterySize === sz ? 'bg-emerald-500/20 border-emerald-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                          >
                            {sz} kWh Battery
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Turnkey Assembly */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Wrench className="w-5 h-5 text-solar-400" />
                      <div>
                        <div className="font-bold text-white text-sm">Turnkey Certified Assembly Service</div>
                        <div className="text-xs text-slate-400">Professional ground anchoring, profile setup & electrical grid connection</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.assemblyService}
                      onChange={(e) => updateConfig('assemblyService', e.target.checked)}
                      className="w-5 h-5 accent-solar-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: SUMMARY & LEAD CAPTURE */}
            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">Step 6: Configuration Ready</h3>
                  <p className="text-xs text-slate-400 mt-1">Receive your official engineering PDF dossier & direct quotation from RIAL Energy.</p>
                </div>

                <div className="bg-slate-900/90 p-6 rounded-2xl border border-solar-500/30 space-y-4">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-slate-300 font-bold text-sm">Total Configured Package:</span>
                    <span className="text-2xl font-black text-solar-400">€{totalEur.toLocaleString()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-2 border-t border-slate-800">
                    <div><span className="text-slate-400">Capacity:</span> <strong className="text-white">{kwp} kWp</strong></div>
                    <div><span className="text-slate-400">Est. Payback:</span> <strong className="text-emerald-400">{paybackYears} Years</strong></div>
                    <div><span className="text-slate-400">MwSt Tax:</span> <strong className="text-emerald-400">0% (§12 UStG)</strong></div>
                    <div><span className="text-slate-400">Annual Yield:</span> <strong className="text-solar-400">{annualKwhYield.toLocaleString()} kWh</strong></div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenLeadModal(config, pricing)}
                  className="w-full py-4 rounded-xl bg-solar-gradient text-slate-950 font-extrabold text-base shadow-solar-glow hover:opacity-95 transition-all flex items-center justify-center space-x-3 active:scale-95 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Get Free Specification Dossier & Quote</span>
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
              <button
                disabled={step === 1}
                onClick={() => setStep(prev => prev - 1)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold disabled:opacity-30 hover:bg-slate-800 transition-all flex items-center space-x-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {step < 6 ? (
                <button
                  onClick={() => setStep(prev => prev + 1)}
                  className="px-6 py-2.5 rounded-xl bg-solar-gradient text-slate-950 text-xs font-extrabold shadow-solar-glow hover:opacity-95 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Continue to Step {step + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onOpenLeadModal(config, pricing)}
                  className="px-6 py-2.5 rounded-xl bg-electric-gradient text-slate-950 text-xs font-extrabold shadow-electric-glow hover:opacity-95 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Request Engineering Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Floating Mobile Summary Bar for viewports < lg */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-solar-500/30 p-4 backdrop-blur-xl flex items-center justify-between">
        <div className="font-mono">
          <div className="text-[10px] text-slate-400 uppercase">System Estimate</div>
          <div className="text-xl font-black text-solar-400">€{totalEur.toLocaleString()}</div>
        </div>

        <button
          onClick={() => onOpenLeadModal(config, pricing)}
          className="px-5 py-2.5 rounded-xl bg-solar-gradient text-slate-950 font-black text-xs shadow-solar-glow active:scale-95"
        >
          Get Free Dossier
        </button>
      </div>
    </section>
  );
};
