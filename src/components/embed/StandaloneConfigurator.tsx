'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Car, Building2, Home, Shield, ChevronRight, ChevronLeft, Zap, Sun, 
  Battery, Wrench, FileSpreadsheet, ArrowRight, Check, Sparkles, MapPin,
  CheckCircle, Database, Phone, Mail, Clock, Download, Package, Truck, Layers, Info
} from 'lucide-react';
import { Interactive2DRenderer, ConfiguratorState } from '../configurator/Interactive2DRenderer';
import { PricingBreakdown, ProjectContext } from '../configurator/SolarConfigurator';
import { TenantConfig, CustomerLeadInfo, BOMCalculationResult } from '@/types/tenant';
import { calculateRialBOM } from '@/lib/bomCalculator';

interface StandaloneConfiguratorProps {
  tenant: TenantConfig;
  initialCategory?: ConfiguratorState['category'];
  isEmbedded?: boolean;
}

const CATEGORIES: Array<{ id: ConfiguratorState['category']; name: string; detail: string; icon: typeof Car }> = [
  { id: 'single', name: 'Einzelcarport', detail: '1 Stellplatz (ca. 3.8 kWp)', icon: Car },
  { id: 'double', name: 'Doppelcarport', detail: '2 Stellplätze (ca. 7.5 kWp)', icon: Car },
  { id: 'terrace', name: 'PV-Terrassendach', detail: 'Außenbereich (ca. 4.7 kWp)', icon: Home },
  { id: 'commercial', name: 'Gewerbe & Fuhrpark', detail: '5+ Stellplätze (ab 20 kWp)', icon: Building2 },
];

const STEPS = [
  { step: 1, title: 'Standort & Typ', label: '1. Typ' },
  { step: 2, title: 'Tragwerk & Design', label: '2. Tragwerk' },
  { step: 3, title: 'Bifazial PV & Module', label: '3. Solarmodule' },
  { step: 4, title: 'Speicher & Wallbox', label: '4. Energie-Optionen' },
  { step: 5, title: 'Ergebnis & Angebot', label: '5. Richtpreis' },
];

export const StandaloneConfigurator: React.FC<StandaloneConfiguratorProps> = ({
  tenant,
  initialCategory = 'double',
  isEmbedded = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<number>(1);
  const [furthestStep, setFurthestStep] = useState<number>(1);
  const [postcode, setPostcode] = useState<string>('38722');
  const [timeline, setTimeline] = useState<string>('3-6 Monate');

  // Configurator state
  const [config, setConfig] = useState<ConfiguratorState>({
    category: initialCategory,
    spots: initialCategory === 'commercial' ? 8 : initialCategory === 'double' ? 2 : 1,
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

  // Modal & Drawer states
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false);
  const [showERPModal, setShowERPModal] = useState<boolean>(false);
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [leadReceipt, setLeadReceipt] = useState<any>(null);

  // Customer form inputs
  const [customer, setCustomer] = useState<CustomerLeadInfo>({
    name: '',
    email: '',
    phone: '',
    street: '',
    postcode: postcode,
    city: tenant.branding.city || '',
    timeline: '3-6 Monate',
    comments: '',
    consentDsgvo: true,
  });

  // Calculate ERP BOM and Pricing dynamically
  const bomResult: BOMCalculationResult = useMemo(() => {
    return calculateRialBOM(config);
  }, [config]);

  const pricing = useMemo<PricingBreakdown>(() => {
    const markup = tenant.pricingMarkupMultiplier || 1.15;
    const laborPerSpot = tenant.customLaborRatePerSpot || 750;

    const baseCarportPrice = Math.round(
      (config.category === 'commercial' ? config.spots * 2700 : config.category === 'double' ? 4900 : config.category === 'terrace' ? 4400 : 2900) * markup
    );
    const modulesPrice = Math.round(bomResult.moduleCount * (config.moduleType === 'translucent' ? 165 : 145) * markup);
    const inverterPrice = Math.round((bomResult.kwp * 170 + 850) * markup);
    const wallboxPrice = config.wallbox ? Math.round((config.wallboxType === 'v2x' ? 1490 : 790) * markup) : 0;
    const batteryPrice = config.battery ? Math.round(Number(config.batterySize) * 380 * markup) : 0;
    const assemblyPrice = config.assemblyService ? Math.round(config.spots * laborPerSpot) : 0;

    const subtotal = baseCarportPrice + modulesPrice + inverterPrice + wallboxPrice + batteryPrice + assemblyPrice;
    const vatAmount = 0; // 0% MwSt (§12 Abs. 3 UStG)
    const totalEur = subtotal;

    const annualKwhYield = Math.round(bomResult.kwp * 980);
    const annualSavingsEur = Math.round(annualKwhYield * 0.34);
    const paybackYears = annualSavingsEur > 0 ? Math.round((totalEur / annualSavingsEur) * 10) / 10 : 0;

    return {
      baseCarportPrice,
      modulesPrice,
      inverterPrice,
      wallboxPrice,
      batteryPrice,
      assemblyPrice,
      subtotal,
      vatAmount,
      totalEur,
      kwp: bomResult.kwp,
      annualKwhYield,
      annualSavingsEur,
      paybackYears,
    };
  }, [config, bomResult, tenant]);

  // Post dynamic height to parent window for auto-resizing iframe
  useEffect(() => {
    const notifyHeight = () => {
      if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
        const height = containerRef.current?.scrollHeight || document.body.scrollHeight;
        window.parent.postMessage(
          {
            type: 'SOLARCARPORT_RESIZE',
            tenantId: tenant.id,
            height: height + 40,
          },
          '*'
        );
      }
    };

    notifyHeight();
    const timeout = setTimeout(notifyHeight, 300);
    return () => clearTimeout(timeout);
  }, [step, config, showLeadModal, showERPModal, tenant.id]);

  const updateConfig = <K extends keyof ConfiguratorState>(key: K, value: ConfiguratorState[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    setStep((prev) => {
      const next = Math.min(prev + 1, STEPS.length);
      setFurthestStep((f) => Math.max(f, next));
      return next;
    });
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: {
        tenantId: string;
        customer: CustomerLeadInfo;
        config: ConfiguratorState;
        pricing: PricingBreakdown;
        project: ProjectContext;
      } = {
        tenantId: tenant.id,
        customer: {
          ...customer,
          postcode: customer.postcode || postcode,
          timeline: timeline,
        },
        config,
        pricing,
        project: { postcode, timeline },
      };

      const res = await fetch('/api/embed/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setLeadSubmitted(true);
        setLeadReceipt(data);
      } else {
        alert(data.error || 'Fehler beim Übermitteln der Anfrage.');
      }
    } catch (err) {
      console.error('Lead submission failed:', err);
      alert('Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const primaryColor = tenant.branding.primaryColor || '#F59E0B';

  return (
    <div 
      ref={containerRef}
      className="w-full bg-[#071019] text-slate-100 rounded-2xl overflow-hidden font-sans border border-slate-800/80 shadow-2xl relative"
      style={{ '--primary-accent': primaryColor } as React.CSSProperties}
    >
      {/* 1. Header Bar with Partner Branding */}
      <div className="bg-slate-900/90 backdrop-blur-md px-5 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-slate-950 shadow-md text-sm"
            style={{ backgroundColor: primaryColor }}
          >
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                {tenant.branding.companyName}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Geprüfter Fachpartner
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {tenant.branding.tagline || 'Solarcarport & Überdachungs-Konfigurator'}
            </p>
          </div>
        </div>

        {/* Quick Contact & Verified Badge */}
        <div className="flex items-center space-x-4 text-xs">
          {tenant.branding.phone && (
            <a 
              href={`tel:${tenant.branding.phone}`}
              className="hidden sm:flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{tenant.branding.phone}</span>
            </a>
          )}
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>DIN EN 1991 Statik</span>
          </div>
        </div>
      </div>

      {/* 2. Step Progress Bar */}
      <div className="bg-slate-950/60 px-5 py-3 border-b border-slate-800/60 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[500px] gap-2">
          {STEPS.map((s, idx) => {
            const isActive = step === s.step;
            const isDone = step > s.step;
            return (
              <button
                key={s.step}
                onClick={() => s.step <= furthestStep && setStep(s.step)}
                disabled={s.step > furthestStep}
                className={`flex-1 flex items-center space-x-2 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700' 
                    : isDone 
                      ? 'text-emerald-400 hover:bg-slate-900 cursor-pointer' 
                      : 'text-slate-500 opacity-50 cursor-not-allowed'
                }`}
              >
                <div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive 
                      ? 'bg-white text-slate-950' 
                      : isDone 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                        : 'bg-slate-800 text-slate-500'
                  }`}
                  style={isActive ? { backgroundColor: primaryColor, color: '#090d16' } : {}}
                >
                  {isDone ? <Check className="w-3 h-3" /> : s.step}
                </div>
                <span className="truncate">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Split View: Options Panel (Left) & Live 2D Preview + Metrics (Right) */}
      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column: Configurator Steps */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 1: Type & Parking Spots */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-left-2 duration-300">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Schritt 1 von 5</span>
                <h3 className="text-xl font-bold text-white mt-1">Wählen Sie Ihre gewünschte Überdachung</h3>
                <p className="text-xs text-slate-400 mt-1">Modulare Konstruktionen für Privatgrundstücke & Gewerbeflächen.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = config.category === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        updateConfig('category', cat.id);
                        if (cat.id === 'commercial') updateConfig('spots', Math.max(config.spots, 6));
                        else if (cat.id === 'double') updateConfig('spots', 2);
                        else if (cat.id === 'single') updateConfig('spots', 1);
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected 
                          ? 'bg-slate-800/90 border-slate-500 ring-2 ring-slate-400/20 shadow-lg' 
                          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                      style={isSelected ? { borderColor: primaryColor } : {}}
                    >
                      <div className="flex items-start justify-between">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ 
                            backgroundColor: isSelected ? `${primaryColor}20` : 'rgba(30, 41, 59, 0.6)',
                            color: isSelected ? primaryColor : '#94a3b8' 
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-slate-950" style={{ backgroundColor: primaryColor }}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{cat.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{cat.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Spots Slider for Commercial */}
              {config.category === 'commercial' && (
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-300">Anzahl Stellplätze:</span>
                    <span className="text-base font-bold" style={{ color: primaryColor }}>{config.spots} Fahrzeuge</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="40"
                    step="2"
                    value={config.spots}
                    onChange={(e) => updateConfig('spots', parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    style={{ accentColor: primaryColor }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>4 Plätze (Kleingewerbe)</span>
                    <span>20 Plätze (Mittelstand)</span>
                    <span>40+ Plätze (Konzern / Parkplatz)</span>
                  </div>
                </div>
              )}

              {/* Location / Postcode Input */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Standort Postleitzahl (Schneelast-Zone & Bauamt-Vorprüfung):</span>
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    maxLength={5}
                    value={postcode}
                    onChange={(e) => {
                      setPostcode(e.target.value);
                      setCustomer(prev => ({ ...prev, postcode: e.target.value }));
                    }}
                    placeholder="z.B. 38722 oder 20095"
                    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono w-44"
                  />
                  <span className="text-xs text-emerald-400 flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Zone & Abstandsflächen verifiziert</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Structural Material & Post Color */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-left-2 duration-300">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Schritt 2 von 5</span>
                <h3 className="text-xl font-bold text-white mt-1">Tragwerk & Profil-Design</h3>
                <p className="text-xs text-slate-400 mt-1">Hochfestes T6 Aluminium oder feuerverzinkter Stahl.</p>
              </div>

              {/* Material Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => updateConfig('material', 'aluminum')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    config.material === 'aluminum'
                      ? 'bg-slate-800/90 border-slate-500 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                  style={config.material === 'aluminum' ? { borderColor: primaryColor } : {}}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Premium Empfehlung</span>
                    {config.material === 'aluminum' && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h4 className="text-sm font-bold text-white">Stranggepresstes Aluminium</h4>
                  <p className="text-xs text-slate-400 mt-1">T6 Legierung, 100% korrosionsfrei, integrierte Kabel- & Wasserführung.</p>
                </div>

                <div
                  onClick={() => updateConfig('material', 'steel')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    config.material === 'steel'
                      ? 'bg-slate-800/90 border-slate-500 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                  style={config.material === 'steel' ? { borderColor: primaryColor } : {}}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Industrie-Standard</span>
                    {config.material === 'steel' && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h4 className="text-sm font-bold text-white">Feuerverzinkter Stahl</h4>
                  <p className="text-xs text-slate-400 mt-1">S355 Baustahl für extreme Spannweiten und maximale Punktlasten.</p>
                </div>
              </div>

              {/* Color Finish */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-semibold text-slate-300">Profilbeschichtung (Pulverbeschichtung nach RAL):</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => updateConfig('postColor', 'anthracite')}
                    className={`flex items-center space-x-3 p-3 rounded-lg border text-left transition-all ${
                      config.postColor === 'anthracite' ? 'bg-slate-800 border-white/40' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#292D32] border border-white/20 shadow-inner flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">Anthrazitgrau (RAL 7016)</div>
                      <div className="text-[10px] text-slate-400">Moderner Matt-Feinstruktur Look</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateConfig('postColor', 'silver')}
                    className={`flex items-center space-x-3 p-3 rounded-lg border text-left transition-all ${
                      config.postColor === 'silver' ? 'bg-slate-800 border-white/40' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#CBD5E1] border border-black/20 shadow-inner flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">Eloxiertes Silber (RAL 9006)</div>
                      <div className="text-[10px] text-slate-400">Klassisches Technisches Finish</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Bifacial Glass Modules */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-left-2 duration-300">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Schritt 3 von 5</span>
                <h3 className="text-xl font-bold text-white mt-1">Bifaziale Glas-Glas Solarmodule</h3>
                <p className="text-xs text-slate-400 mt-1">Zweiseitige Stromerzeugung mit bis zu 25% diffusem Mehrertrag.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => updateConfig('moduleType', 'dark')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    config.moduleType === 'dark'
                      ? 'bg-slate-800/90 border-slate-500 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                  style={config.moduleType === 'dark' ? { borderColor: primaryColor } : {}}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Maximaler Ertrag</span>
                    {config.moduleType === 'dark' && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h4 className="text-sm font-bold text-white">470W Full-Black Bifazial TOPCon</h4>
                  <p className="text-xs text-slate-400 mt-1">Homogenes dunkles Glasdesign mit maximalem kWh-Ertrag pro Quadratmeter.</p>
                </div>

                <div
                  onClick={() => updateConfig('moduleType', 'translucent')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    config.moduleType === 'translucent'
                      ? 'bg-slate-800/90 border-slate-500 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                  style={config.moduleType === 'translucent' ? { borderColor: primaryColor } : {}}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Lichtdurchlässig</span>
                    {config.moduleType === 'translucent' && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h4 className="text-sm font-bold text-white">450W Transluzent (20% Licht)</h4>
                  <p className="text-xs text-slate-400 mt-1">Ideal für Terrassen & Carports mit hellem Tageslicht-Unterstand.</p>
                </div>
              </div>

              {/* Albedo Gain Explanation Box */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-start space-x-3 text-xs">
                <Sun className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-slate-300">
                  <strong className="text-white font-bold">Bifazialer Albedo-Effekt:</strong>
                  <p>Durch die zweiseitige Glas-Glas-Konstruktion reflektiert der Untergrund (Pflaster, Kies, Schnee) Sonnenlicht auf die Modulunterseite. Dies steigert Ihren realen Jahresertrag um bis zu <span className="text-amber-400 font-bold">1.200 kWh/Jahr</span>.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Battery Storage, V2X Wallbox & Options */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-left-2 duration-300">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Schritt 4 von 5</span>
                <h3 className="text-xl font-bold text-white mt-1">Speicher & E-Mobilität Integration</h3>
                <p className="text-xs text-slate-400 mt-1">Maximieren Sie Ihren Eigenverbrauch nach § 14a EnWG.</p>
              </div>

              {/* Wallbox Option */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Integrierte EV Wallbox Ladestation</h4>
                      <p className="text-xs text-slate-400">Laden Sie Ihr Elektrofahrzeug direkt mit 100% Carport-Solarstrom.</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.wallbox}
                    onChange={(e) => updateConfig('wallbox', e.target.checked)}
                    className="w-5 h-5 rounded bg-slate-800 text-amber-500 focus:ring-0 cursor-pointer"
                  />
                </div>

                {config.wallbox && (
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => updateConfig('wallboxType', 'v2x')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        config.wallboxType === 'v2x' ? 'bg-slate-800 border-amber-400/60 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-amber-400">22kW Bidirektional (V2X / V2H)</div>
                      <div className="text-[10px] mt-0.5">Fahrzeugakku versorgt Haus bei Nacht</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateConfig('wallboxType', 'standard')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        config.wallboxType === 'standard' ? 'bg-slate-800 border-white/40 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-white">11kW Smart Wallbox</div>
                      <div className="text-[10px] mt-0.5">Mit automatischem Überschussladen</div>
                    </button>
                  </div>
                )}
              </div>

              {/* Battery Storage Option */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Battery className="w-4 h-4 text-emerald-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Hochvolt LFP Stromspeicher</h4>
                      <p className="text-xs text-slate-400">Speichern Sie Tagesüberschüsse für die Nacht.</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.battery}
                    onChange={(e) => updateConfig('battery', e.target.checked)}
                    className="w-5 h-5 rounded bg-slate-800 text-emerald-500 focus:ring-0 cursor-pointer"
                  />
                </div>

                {config.battery && (
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
                    {(['10', '15', '30'] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => updateConfig('batterySize', size)}
                        className={`p-2.5 rounded-lg border text-center font-mono font-bold transition-all ${
                          config.batterySize === size ? 'bg-slate-800 border-emerald-400 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {size} kWh
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Addons Checklist */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-slate-900/50 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.ledLighting}
                    onChange={(e) => updateConfig('ledLighting', e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-800 text-amber-500"
                  />
                  <span className="text-slate-300">Integrierte LED-Beleuchtung</span>
                </label>

                <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-slate-900/50 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.assemblyService}
                    onChange={(e) => updateConfig('assemblyService', e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-800 text-amber-500"
                  />
                  <span className="text-slate-300">Inkl. Montage & Fundamente</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Cost Indication */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-left-2 duration-300">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Schritt 5 von 5</span>
                <h3 className="text-xl font-bold text-white mt-1">Ihre individuelle Vorplanung</h3>
                <p className="text-xs text-slate-400 mt-1">Berechnet für Postleitzahl {postcode} mit 0% MwSt (§ 12 Abs. 3 UStG).</p>
              </div>

              {/* Detailed Cost Breakdown Table */}
              <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-4 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-slate-400 font-mono">
                  <span>KOMPONENTE</span>
                  <span>RICHTPREIS (NETTO = BRUTTO)</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Tragwerk ({config.category === 'commercial' ? `${config.spots} Stellplätze` : config.category.toUpperCase()})</span>
                  <span className="font-mono font-bold text-white">€ {pricing.baseCarportPrice.toLocaleString('de-DE')}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>PV Glas-Glas Module ({bomResult.moduleCount}x {config.moduleType === 'translucent' ? '450W Transluzent' : '470W Bifazial'})</span>
                  <span className="font-mono font-bold text-white">€ {pricing.modulesPrice.toLocaleString('de-DE')}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>3-Phasen Hybrid Wechselrichter ({Math.ceil(bomResult.kwp)} kW)</span>
                  <span className="font-mono font-bold text-white">€ {pricing.inverterPrice.toLocaleString('de-DE')}</span>
                </div>

                {config.wallbox && (
                  <div className="flex justify-between text-slate-300">
                    <span>Wallbox ({config.wallboxType === 'v2x' ? '22kW Bidirektional V2X' : '11kW Smart'})</span>
                    <span className="font-mono font-bold text-white">€ {pricing.wallboxPrice.toLocaleString('de-DE')}</span>
                  </div>
                )}

                {config.battery && (
                  <div className="flex justify-between text-slate-300">
                    <span>Batteriespeicher ({config.batterySize} kWh LFP)</span>
                    <span className="font-mono font-bold text-white">€ {pricing.batteryPrice.toLocaleString('de-DE')}</span>
                  </div>
                )}

                {config.assemblyService && (
                  <div className="flex justify-between text-slate-300">
                    <span>Fachmontage & Fundamentierung vor Ort</span>
                    <span className="font-mono font-bold text-white">€ {pricing.assemblyPrice.toLocaleString('de-DE')}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-sm font-bold">
                  <div>
                    <span className="text-white">Gesamt-Investitionsindikation</span>
                    <span className="block text-[11px] font-normal text-emerald-400">0% MwSt. nach §12 Abs. 3 UStG</span>
                  </div>
                  <span className="text-xl font-mono" style={{ color: primaryColor }}>
                    € {pricing.totalEur.toLocaleString('de-DE')}
                  </span>
                </div>
              </div>

              {/* Payback & Energy KPIs */}
              <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">PV-Leistung</span>
                  <span className="text-base font-bold text-amber-400">{bomResult.kwp} kWp</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Ersparnis/Jahr</span>
                  <span className="text-base font-bold text-emerald-400">€ {pricing.annualSavingsEur.toLocaleString('de-DE')}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Amortisation</span>
                  <span className="text-base font-bold text-cyan-400">ca. {pricing.paybackYears} Jahre</span>
                </div>
              </div>

              {/* Action Buttons: Request Offer & Inspect ERP */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLeadModal(true)}
                  className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  <span>Kostenloses Angebot & Statikprüfung anfordern</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {tenant.enableLiveERPInspection && (
                  <button
                    type="button"
                    onClick={() => setShowERPModal(true)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center space-x-2 transition-all"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Detaillierte ERP Stückliste ({bomResult.items.length} Positionen) einsehen</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Navigation Controls (Back / Next) */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center space-x-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Zurück</span>
              </button>
            ) : <div />}

            {step < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-lg text-xs font-bold text-slate-950 shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center space-x-1.5"
                style={{ backgroundColor: primaryColor }}
              >
                <span>Weiter zu Schritt {step + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowLeadModal(true)}
                className="px-6 py-2.5 rounded-lg text-xs font-bold text-slate-950 shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center space-x-1.5"
                style={{ backgroundColor: primaryColor }}
              >
                <span>Angebot anfordern</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Visual Preview Canvas & Key Metrics */}
        <div className="lg:col-span-5 space-y-4 flex flex-col">
          
          {/* Visual 2D Renderer */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner flex flex-col justify-between flex-1 min-h-[300px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
              <span className="font-mono text-slate-400 flex items-center space-x-1.5">
                <Sun className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                <span>LIVE SYSTEMVORSCHAU</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                {config.spots} {config.spots === 1 ? 'Stellplatz' : 'Stellplätze'}
              </span>
            </div>

            <div className="py-4 flex items-center justify-center">
              <Interactive2DRenderer config={config} />
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>{config.material === 'aluminum' ? 'Stranggepresstes ALU T6' : 'Stahl S355'}</span>
              <span>{config.postColor === 'anthracite' ? 'RAL 7016 Anthrazit' : 'RAL 9006 Silber'}</span>
              <span>{bomResult.kwp} kWp</span>
            </div>
          </div>

          {/* Mini KPI Dashboard */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Geschätzter Jahresertrag:</span>
              <span className="font-mono font-bold text-white">{pricing.annualKwhYield.toLocaleString('de-DE')} kWh / Jahr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">CO₂ Einsparung:</span>
              <span className="font-mono font-bold text-emerald-400">ca. {Math.round(pricing.annualKwhYield * 0.42)} kg / Jahr</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <span className="text-slate-400">Gesamt-Richtwert:</span>
              <span className="font-mono font-bold text-base text-white">€ {pricing.totalEur.toLocaleString('de-DE')}</span>
            </div>
          </div>

          {/* Partner Certification Footnote */}
          <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 text-[11px] text-slate-500 text-center">
            Offizieller Konfigurator von <strong className="text-slate-300">{tenant.branding.companyName}</strong>.
            Powered by RIAL Energy Technologie.
          </div>
        </div>

      </div>

      {/* 4. Lead Capture Modal (Customer Inquiries) */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {!leadSubmitted ? (
              <form onSubmit={handleSubmitLead} className="space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">Unverbindliches Angebot anfordern</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Ihre Planung wird direkt an {tenant.branding.companyName} übermittelt.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLeadModal(false)}
                    className="text-slate-400 hover:text-white text-sm p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Ihr vollständiger Name *</label>
                    <input
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      placeholder="z.B. Max Mustermann"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">E-Mail-Adresse *</label>
                      <input
                        type="email"
                        required
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        placeholder="max@beispiel.de"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Telefonnummer *</label>
                      <input
                        type="tel"
                        required
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="+49 170 1234567"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Postleitzahl *</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={customer.postcode}
                        onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Geplanter Umsetzungszeitraum</label>
                      <select
                        value={customer.timeline}
                        onChange={(e) => setCustomer({ ...customer, timeline: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white"
                      >
                        <option value="Sofort / 1-2 Monate">Sofort / 1-2 Monate</option>
                        <option value="3-6 Monate">3-6 Monate</option>
                        <option value="6-12 Monate">6-12 Monate</option>
                        <option value="Nur Preisvergleich">Nur Preisvergleich</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Optionale Anmerkungen (z.B. Zufahrtsbreite, Besonderheiten)</label>
                    <textarea
                      rows={2}
                      value={customer.comments}
                      onChange={(e) => setCustomer({ ...customer, comments: e.target.value })}
                      placeholder="Gibt es bestehende Fundamente oder besondere Wünsche?"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <label className="flex items-start space-x-2 text-[11px] text-slate-400 pt-1">
                    <input
                      type="checkbox"
                      required
                      checked={customer.consentDsgvo}
                      onChange={(e) => setCustomer({ ...customer, consentDsgvo: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded bg-slate-800 text-amber-500"
                    />
                    <span>
                      Ich stimme der Kontaktaufnahme zur Angebotserstellung durch {tenant.branding.companyName} gemäß Datenschutzerklärung zu.
                    </span>
                  </label>
                </div>

                <div className="pt-2 flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowLeadModal(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-xl font-bold text-xs text-slate-950 shadow-md hover:brightness-105 transition-all flex items-center justify-center space-x-1.5"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {isSubmitting ? <span>Wird übermittelt...</span> : <span>Anfrage absenden</span>}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Anfrage erfolgreich übermittelt!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1.5 leading-relaxed">
                    Vielen Dank, Herr/Frau {customer.name}. Ihre Konfiguration ({bomResult.kwp} kWp) wurde an das Beratungsteam von <strong className="text-white">{tenant.branding.companyName}</strong> weitergeleitet.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-left space-y-1.5">
                  <div className="text-slate-400">Vorgangs-ID: <span className="text-amber-400">{leadReceipt?.leadId || 'LEAD-CONFIRMED'}</span></div>
                  <div className="text-slate-400">Standort: <span className="text-white">{customer.postcode}</span></div>
                  <div className="text-slate-400">Berechneter Richtpreis: <span className="text-emerald-400">€ {pricing.totalEur.toLocaleString('de-DE')} (0% MwSt)</span></div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowLeadModal(false);
                    setLeadSubmitted(false);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
                >
                  Zurück zum Konfigurator
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 5. Live ERP BOM Modal (Inspection Drawer) */}
      {showERPModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <Database className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-bold text-white">RIAL Energy Seesen ERP Stückliste</h3>
                  <p className="text-xs text-slate-400 font-mono">BOM Cut-List • Werkslogistik Seesen Hub</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowERPModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">GESAMTGEWICHT</span>
                <span className="font-bold text-white">{bomResult.totalWeightKg} kg</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">PRAXIS-SCHNEELAST</span>
                <span className="font-bold text-amber-400">{bomResult.snowLoadCapacityKnM2} kN/m²</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">LIEFERZEIT HUB</span>
                <span className="font-bold text-emerald-400">{bomResult.seesenDispatchLeadDays}-5 Werktage</span>
              </div>
            </div>

            {/* BOM Table */}
            <div className="space-y-2 text-xs font-mono">
              <div className="text-slate-400 font-sans font-bold flex justify-between px-1">
                <span>BERECHNETE ARTIKEL ({bomResult.items.length})</span>
                <span className="text-cyan-400 text-[11px]">WERKS-LAGERBESTAND</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {bomResult.items.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex justify-between items-center">
                    <div>
                      <div className="text-amber-400 font-bold">{item.sku}</div>
                      <div className="text-slate-300 font-sans text-xs">{item.description}</div>
                      <div className="text-[10px] text-emerald-400 flex items-center space-x-1 mt-0.5">
                        <Check className="w-3 h-3" />
                        <span>{item.stockStatus}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="text-sm font-bold text-white">{item.qty} {item.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowERPModal(false)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
