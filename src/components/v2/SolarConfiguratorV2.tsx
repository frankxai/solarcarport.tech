'use client';

import React, { useState } from 'react';
import { 
  Car, Building2, Home, Shield, ChevronRight, ChevronLeft, Zap, Sun, 
  Battery, Wrench, FileSpreadsheet, ArrowRight, Download, Video, Camera
} from 'lucide-react';
import { Interactive2DRenderer, ConfiguratorState } from '../configurator/Interactive2DRenderer';
import { PricingBreakdown } from '../configurator/SolarConfigurator';

interface SolarConfiguratorV2Props {
  onOpenERP: () => void;
  onOpenLeadModal: (config: ConfiguratorState, pricing: PricingBreakdown) => void;
  lang: 'de' | 'en';
}

export const SolarConfiguratorV2: React.FC<SolarConfiguratorV2Props> = ({ onOpenERP, onOpenLeadModal, lang }) => {
  const [step, setStep] = useState<number>(1);
  const [geminiAuditRequested, setGeminiAuditRequested] = useState(false);

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

  const content = {
    de: {
      tag: 'Interactive Configurator',
      headline: 'Design Your Solar Overhang System',
      subtext: 'Select parking capacity, structural aluminum framing, PV modules, and V2X chargers. Live ERP calculates parts & investment in real time.',
      geminiTitle: 'Gemini Multimodal AI Site Video Inspection',
      geminiDesc: 'Optional: Record a short smartphone video of your site to get automated AI shading & structural assessment.',
      geminiBtn: 'Attach 30s Site Video',
      steps: ['1. Scope', '2. Framing', '3. PV Tech', '4. ERP BOM', '5. Add-ons', '6. Summary'],
      kpiEstimate: 'Investment Estimate',
      kpiVat: '0% MwSt Applicable (§12 UStG)',
      kpiTotal: 'Total System Estimate',
      kpiKwp: 'PV Capacity',
      kpiSavings: 'Annual Savings',
      erpBtn: 'Inspect Live ERP Parts List',
      nextBtn: 'Continue to Step',
      backBtn: 'Back',
      dossierBtn: 'Request Engineering Dossier',
    },
    en: {
      tag: 'Interactive Configurator',
      headline: 'Design Your Solar Overhang System',
      subtext: 'Select parking capacity, structural aluminum framing, PV modules, and V2X chargers. Live ERP calculates parts & investment in real time.',
      geminiTitle: 'Gemini Multimodal AI Site Video Inspection',
      geminiDesc: 'Optional: Record a short smartphone video of your site to get automated AI shading & structural assessment.',
      geminiBtn: 'Attach 30s Site Video',
      steps: ['1. Scope', '2. Framing', '3. PV Tech', '4. ERP BOM', '5. Add-ons', '6. Summary'],
      kpiEstimate: 'Investment Estimate',
      kpiVat: '0% VAT Applicable (§12 UStG)',
      kpiTotal: 'Total System Estimate',
      kpiKwp: 'PV Capacity',
      kpiSavings: 'Annual Savings',
      erpBtn: 'Inspect Live ERP Parts List',
      nextBtn: 'Continue to Step',
      backBtn: 'Back',
      dossierBtn: 'Request Engineering Dossier',
    }
  }[lang];

  return (
    <section id="v2-configurator" className="py-28 px-4 sm:px-8 lg:px-12 relative bg-[#030712]">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-medium tracking-wide">
            <span>{content.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Syne']">
            {content.headline}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            {content.subtext}
          </p>
        </div>

        {/* Gemini Video Site Audit Option */}
        <div className="glass-panel-obsidian p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
              <Camera className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-['Syne']">{content.geminiTitle}</h4>
              <p className="text-xs text-slate-300 mt-0.5">{content.geminiDesc}</p>
            </div>
          </div>

          <button
            onClick={() => setGeminiAuditRequested(!geminiAuditRequested)}
            className={`w-full md:w-auto px-6 py-3.5 rounded-full font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              geminiAuditRequested
                ? 'bg-cyan-400 text-slate-950 shadow-cyan-glow'
                : 'bg-slate-900 border border-slate-700 text-cyan-300 hover:bg-slate-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{geminiAuditRequested ? 'Site Video Attached' : content.geminiBtn}</span>
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-6 gap-3 text-center text-xs">
            {content.steps.map((label, idx) => (
              <button
                key={idx}
                onClick={() => setStep(idx + 1)}
                className={`py-3.5 px-2 rounded-2xl transition-all border cursor-pointer font-semibold ${
                  step === idx + 1
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-gold-subtle font-bold'
                    : step > idx + 1
                    ? 'bg-slate-900 text-amber-400 border-slate-700'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800'
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
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <Interactive2DRenderer config={config} />

            {/* Real-time KPI Box */}
            <div className="glow-card-amber p-8 rounded-3xl space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                <span className="text-xs text-slate-400 uppercase tracking-wide">{content.kpiEstimate}</span>
                <span className="text-xs text-emerald-400 font-medium">{content.kpiVat}</span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-['Syne']">€{totalEur.toLocaleString()}</span>
                <span className="text-xs text-slate-400">{content.kpiTotal}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 block text-xs">{content.kpiKwp}</span>
                  <strong className="text-amber-400 font-bold text-lg">{kwp} kWp</strong>
                </div>
                <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 block text-xs">{content.kpiSavings}</span>
                  <strong className="text-cyan-400 font-bold text-lg">€{annualSavingsEur.toLocaleString()}/yr</strong>
                </div>
              </div>

              <button
                onClick={onOpenERP}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-semibold border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{content.erpBtn} ({moduleCount} Modules)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Step Form Workspace */}
          <div className="lg:col-span-7 glass-panel-obsidian p-8 sm:p-10 rounded-3xl border border-slate-800 min-h-[540px] flex flex-col justify-between shadow-2xl">
            
            {/* STEP 1: SCOPE */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne']">Step 1: Select Application & Capacity</h3>
                  <p className="text-sm text-slate-300 mt-1">Choose the primary intended use for your solar overhang infrastructure.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'single', name: 'Single Solar Carport', desc: '1 Vehicle Space (~3.8 kWp)', icon: Car },
                    { id: 'double', name: 'Double Solar Carport', desc: '2 Vehicle Spaces (~7.6 kWp)', icon: Car },
                    { id: 'commercial', name: 'Commercial Fleet Lot', desc: '5 to 100+ Spaces (25+ kWp)', icon: Building2 },
                    { id: 'terrace', name: 'Patio & Terrace Canopy', desc: 'Outdoor Living (~5.0 kWp)', icon: Home },
                    { id: 'fence', name: 'Bifacial Solar Fence', desc: 'Vertical Boundary (~4.0 kWp)', icon: Shield },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => updateConfig('category', item.id)}
                      className={`p-6 rounded-3xl border text-left transition-all cursor-pointer ${
                        config.category === item.id
                          ? 'glow-card-amber border-amber-500'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <item.icon className="w-6 h-6 text-amber-400 mb-3" />
                      <div className="font-bold text-white text-base font-['Syne']">{item.name}</div>
                      <div className="text-xs text-slate-300 mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>

                {config.category === 'commercial' && (
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Commercial Parking Vehicle Spaces:</span>
                      <strong className="text-amber-400 font-bold text-sm">{config.spots} Spaces</strong>
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      step={5}
                      value={config.spots}
                      onChange={(e) => updateConfig('spots', parseInt(e.target.value))}
                      className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: FRAMING & PROFILES */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne']">Step 2: Structural Material & Post Architecture</h3>
                  <p className="text-sm text-slate-300 mt-1">Select structural extrusion profiles engineered for up to 2.5 kN/m² snow load.</p>
                </div>

                <div className="space-y-4">
                  <label className="text-xs text-slate-300 uppercase tracking-wide">Structural Material:</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => updateConfig('material', 'aluminum')}
                      className={`p-5 rounded-2xl border text-left cursor-pointer ${
                        config.material === 'aluminum' ? 'glow-card-amber border-amber-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-base font-['Syne']">Extruded Anodized Aluminum</div>
                      <div className="text-xs text-slate-300 mt-1">100% Rust-Proof, Lightweight T6 Alloy</div>
                    </button>
                    <button
                      onClick={() => updateConfig('material', 'steel')}
                      className={`p-5 rounded-2xl border text-left cursor-pointer ${
                        config.material === 'steel' ? 'glow-card-amber border-amber-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-base font-['Syne']">Galvanized Structural Steel</div>
                      <div className="text-xs text-slate-300 mt-1">Heavy Industrial Span Subframe</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs text-slate-300 uppercase tracking-wide">Post Color Finish (RAL):</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'anthracite', name: 'Anthracite (RAL 7016)' },
                      { id: 'silver', name: 'Anodized Silver' },
                      { id: 'black', name: 'Deep Black (RAL 9005)' },
                    ].map((col) => (
                      <button
                        key={col.id}
                        onClick={() => updateConfig('postColor', col.id)}
                        className={`p-4 rounded-2xl border text-xs font-semibold cursor-pointer ${
                          config.postColor === col.id ? 'bg-amber-500/10 border-amber-400 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'
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
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne']">Step 3: Bifacial Glass-Glass Photovoltaics</h3>
                  <p className="text-sm text-slate-300 mt-1">Choose between high-transparency patio glass or maximum-power bifacial TOPCon.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => updateConfig('moduleType', 'dark')}
                    className={`p-6 rounded-3xl border text-left cursor-pointer ${
                      config.moduleType === 'dark' ? 'glow-card-amber border-amber-500' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <Sun className="w-6 h-6 text-amber-400 mb-3" />
                    <div className="font-bold text-white text-base font-['Syne']">470W Bifacial TOPCon Dark</div>
                    <div className="text-xs text-slate-300 mt-1">Maximum energy production (+25% albedo yield gain). Dual 2.0mm glass.</div>
                  </button>

                  <button
                    onClick={() => updateConfig('moduleType', 'translucent')}
                    className={`p-6 rounded-3xl border text-left cursor-pointer ${
                      config.moduleType === 'translucent' ? 'glow-card-cyan border-cyan-400' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <Sun className="w-6 h-6 text-cyan-400 mb-3" />
                    <div className="font-bold text-white text-base font-['Syne']">450W Translucent 20% Light</div>
                    <div className="text-xs text-slate-300 mt-1">Permits soft natural daylight underneath. Ideal for patio terraces & luxury carports.</div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: ERP BOM BREAKDOWN */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne']">Step 4: Live ERP Bill of Materials</h3>
                  <p className="text-sm text-slate-300 mt-1">Real-time inventory calculation directly from RIAL Energy's Seesen distribution hub.</p>
                </div>

                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3.5 text-xs font-normal">
                  <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-400 font-semibold">
                    <span>Component</span>
                    <span>SKU / Quantity</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-300">Extruded Support Posts</span>
                    <span className="text-amber-400 font-semibold">{config.material === 'aluminum' ? 'RAL-ALU-POST-2800' : 'RAL-STL-POST'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-300">Bifacial PV Glass Modules</span>
                    <span className="text-amber-400 font-semibold">{moduleCount} Modules ({kwp} kWp)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-300">3-Phase Hybrid Inverter</span>
                    <span className="text-amber-400 font-semibold">INV-HYB-{Math.ceil(kwp)}K-3P</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-300">Structural Snow Load Rating</span>
                    <span className="text-emerald-400 font-semibold">2.5 kN/m² (DIN EN 1991)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-300 flex items-center justify-between">
                  <span>View exact warehouse stock in Seesen?</span>
                  <button onClick={onOpenERP} className="text-amber-400 font-bold underline cursor-pointer">Open ERP Drawer</button>
                </div>
              </div>
            )}

            {/* STEP 5: UPSELLS */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne']">Step 5: Smart Infrastructure Add-ons</h3>
                  <p className="text-sm text-slate-300 mt-1">Upgrade your carport with EV charging, battery storage, and turnkey installation.</p>
                </div>

                <div className="space-y-4">
                  {/* EV Wallbox */}
                  <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3.5">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        <div>
                          <div className="font-bold text-white text-base font-['Syne']">EV Wallbox / Charging Station</div>
                          <div className="text-xs text-slate-300">Charge electric vehicles directly from your carport canopy</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.wallbox}
                        onChange={(e) => updateConfig('wallbox', e.target.checked)}
                        className="w-5 h-5 accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    {config.wallbox && (
                      <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                        <button
                          onClick={() => updateConfig('wallboxType', 'standard')}
                          className={`p-3 rounded-xl border cursor-pointer ${config.wallboxType === 'standard' ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                        >
                          11kW Standard Charging (+€790)
                        </button>
                        <button
                          onClick={() => updateConfig('wallboxType', 'v2x')}
                          className={`p-3 rounded-xl border cursor-pointer ${config.wallboxType === 'v2x' ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                        >
                          22kW V2X Bidirectional (+€1,490)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Battery Storage */}
                  <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3.5">
                        <Battery className="w-5 h-5 text-emerald-400" />
                        <div>
                          <div className="font-bold text-white text-base font-['Syne']">High-Voltage Battery Storage</div>
                          <div className="text-xs text-slate-300">Store solar energy for night charging & emergency backup</div>
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
                      <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
                        {['10', '15', '30'].map((sz) => (
                          <button
                            key={sz}
                            onClick={() => updateConfig('batterySize', sz as any)}
                            className={`p-2.5 rounded-xl border cursor-pointer ${config.batterySize === sz ? 'bg-emerald-500/20 border-emerald-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                          >
                            {sz} kWh Battery
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Turnkey Assembly */}
                  <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <Wrench className="w-5 h-5 text-amber-400" />
                      <div>
                        <div className="font-bold text-white text-base font-['Syne']">Turnkey Certified Assembly Service</div>
                        <div className="text-xs text-slate-300">Professional ground anchoring, profile setup & electrical grid connection</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.assemblyService}
                      onChange={(e) => updateConfig('assemblyService', e.target.checked)}
                      className="w-5 h-5 accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: SUMMARY & LEAD CAPTURE */}
            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne']">Step 6: Configuration Ready</h3>
                  <p className="text-sm text-slate-300 mt-1">Receive your official engineering PDF dossier & direct quotation from RIAL Energy.</p>
                </div>

                <div className="bg-slate-950 p-7 rounded-3xl border border-slate-800 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-semibold text-sm">Total Configured Package:</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Syne']">€{totalEur.toLocaleString()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-3 border-t border-slate-800">
                    <div><span className="text-slate-400">Capacity:</span> <strong className="text-white font-semibold">{kwp} kWp</strong></div>
                    <div><span className="text-slate-400">Est. Payback:</span> <strong className="text-emerald-400 font-semibold">{paybackYears} Years</strong></div>
                    <div><span className="text-slate-400">MwSt Tax:</span> <strong className="text-emerald-400 font-semibold">0% (§12 UStG)</strong></div>
                    <div><span className="text-slate-400">Annual Yield:</span> <strong className="text-cyan-400 font-semibold">{annualKwhYield.toLocaleString()} kWh</strong></div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenLeadModal(config, pricing)}
                  className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-base shadow-gold-subtle transition-all flex items-center justify-center space-x-3 active:scale-95 cursor-pointer font-['Syne']"
                >
                  <Download className="w-5 h-5" />
                  <span>{content.dossierBtn}</span>
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
              <button
                disabled={step === 1}
                onClick={() => setStep(prev => prev - 1)}
                className="px-5 py-3 rounded-2xl bg-slate-950 text-slate-300 text-xs font-semibold disabled:opacity-30 hover:bg-slate-900 transition-all flex items-center space-x-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{content.backBtn}</span>
              </button>

              {step < 6 ? (
                <button
                  onClick={() => setStep(prev => prev + 1)}
                  className="px-7 py-3 rounded-2xl bg-amber-400 text-slate-950 text-xs font-bold shadow-gold-subtle hover:bg-amber-300 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>{content.nextBtn} {step + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onOpenLeadModal(config, pricing)}
                  className="px-7 py-3 rounded-2xl bg-cyan-400 text-slate-950 text-xs font-bold shadow-cyan-glow hover:bg-cyan-300 transition-all flex items-center space-x-2 cursor-pointer"
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 p-4 backdrop-blur-xl flex items-center justify-between">
        <div>
          <div className="text-[11px] text-slate-400 uppercase">System Estimate</div>
          <div className="text-xl font-extrabold text-amber-400 font-['Syne']">€{totalEur.toLocaleString()}</div>
        </div>

        <button
          onClick={() => onOpenLeadModal(config, pricing)}
          className="px-5 py-2.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs shadow-gold-subtle active:scale-95"
        >
          Get Dossier
        </button>
      </div>
    </section>
  );
};
