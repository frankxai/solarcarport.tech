'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, Play 
} from 'lucide-react';

interface HeroV2Props {
  lang: 'de' | 'en';
}

export const HeroV2: React.FC<HeroV2Props> = ({ lang }) => {
  const [spotsCount, setSpotsCount] = useState<number>(2);
  const [dailyKm, setDailyKm] = useState<number>(40);

  // Dynamic simulation calculations
  const totalKwp = Math.round(spotsCount * 3.8 * 10) / 10;
  const annualKwhYield = Math.round(totalKwp * 980);
  const annualSavingsEur = Math.round(annualKwhYield * 0.32);
  const annualCo2SavedTons = Math.round(annualKwhYield * 0.42 / 1000 * 10) / 10;

  const content = {
    de: {
      tag: 'Modulare Solar-Infrastruktur',
      headlinePrefix: 'Solar Overhang',
      headlineSuffix: 'Architektur.',
      subtext: 'Modulare Aluminium-Carports, Terrassenüberdachungen und bifaziale Solarzäune. Statisch berechnet für 2.5 kN/m² Schneelast in Seesen (Harz), Deutschland.',
      ctaPrimary: 'Konfigurator Starten',
      ctaSecondary: 'Architektur-Übersicht',
      bentoSimTitle: 'Echtzeit Ertragssimulator',
      spotsLabel: 'Fahrzeug-Stellplätze:',
      kmLabel: 'Tägliche Fahrleistung:',
      capacityLabel: 'PV-Leistung',
      yieldLabel: 'Jahresertrag',
      savingsLabel: 'Ersparnis',
      co2Label: 'CO2-Einsparung',
      cert1: 'DIN EN 1991 Zertifiziert (2.5 kN/m² Schneelast)',
      cert2: '0% MwSt Steuerbefreiung (§ 12 Abs. 3 UStG)',
      cert3: '30 Jahre Bifaziale Glas-Glas Modulgarantie',
    },
    en: {
      tag: 'Modular Solar Infrastructure',
      headlinePrefix: 'Solar Overhang',
      headlineSuffix: 'Architecture.',
      subtext: 'Modular anodized aluminum carports, patio canopies, and bifacial solar fencing. Precision engineered for 2.5 kN/m² alpine snow load in Lower Saxony, Germany.',
      ctaPrimary: 'Launch Configurator',
      ctaSecondary: 'Architectural Overview',
      bentoSimTitle: 'Live Energy Yield Simulator',
      spotsLabel: 'Vehicle Parking Spaces:',
      kmLabel: 'Daily Average Mileage:',
      capacityLabel: 'PV Capacity',
      yieldLabel: 'Annual Yield',
      savingsLabel: 'Estimated Savings',
      co2Label: 'CO2 Offsetting',
      cert1: 'DIN EN 1991 Certified (2.5 kN/m² Snow Load)',
      cert2: '0% VAT Tax Exemption (§ 12 Abs. 3 UStG)',
      cert3: '30-Year Bifacial PV Dual-Glass Warranty',
    }
  }[lang];

  return (
    <section id="v2-hero" className="relative min-h-screen pt-36 pb-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center bg-[#030712] overflow-hidden font-['Poppins']">
      
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[url('/images/hero_solar_carport.jpg')] bg-cover bg-center filter grayscale contrast-125 mix-blend-luminosity" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Main Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{content.tag}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] font-['Playfair_Display']">
            {content.headlinePrefix} <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 font-normal">{content.headlineSuffix}</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl font-light max-w-3xl mx-auto leading-relaxed font-['Poppins']">
            {content.subtext}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-['Poppins']">
            <a
              href="#v2-configurator"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-slate-950 font-bold text-base shadow-gold-subtle active:scale-95 transition-all flex items-center justify-center space-x-3 cursor-pointer"
            >
              <span>{content.ctaPrimary}</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#v2-education"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium text-base transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{content.ctaSecondary}</span>
            </a>
          </div>

        </div>

        {/* Bento Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-['Poppins']">
          
          {/* Bento Card 1: Yield Simulator */}
          <div className="lg:col-span-7 glow-card-amber p-8 sm:p-10 rounded-3xl space-y-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">{content.bentoSimTitle}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-900 text-amber-300 border border-slate-800 font-medium">Echtzeit-Berechnung</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Playfair_Display']">Ertragspotenzial Ihres Carports</h3>
            </div>

            {/* Interactive Sliders */}
            <div className="space-y-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800/80">
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-300">{content.spotsLabel}</span>
                  <strong className="text-amber-400 font-bold text-base">{spotsCount} {spotsCount === 1 ? 'Stellplatz' : 'Stellplätze'}</strong>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={spotsCount}
                  onChange={(e) => setSpotsCount(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-300">{content.kmLabel}</span>
                  <strong className="text-cyan-400 font-bold text-base">{dailyKm} km / Tag</strong>
                </div>
                <input
                  type="range"
                  min={10}
                  max={200}
                  step={10}
                  value={dailyKm}
                  onChange={(e) => setDailyKm(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

            </div>

            {/* Metrics Output */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-medium block">{content.capacityLabel}</span>
                <strong className="text-amber-400 font-bold text-lg sm:text-xl">{totalKwp} kWp</strong>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-medium block">{content.yieldLabel}</span>
                <strong className="text-cyan-400 font-bold text-lg sm:text-xl">{annualKwhYield.toLocaleString()} kWh</strong>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-medium block">{content.savingsLabel}</span>
                <strong className="text-emerald-400 font-bold text-lg sm:text-xl">€{annualSavingsEur.toLocaleString()}/a</strong>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-medium block">{content.co2Label}</span>
                <strong className="text-slate-200 font-bold text-lg sm:text-xl">{annualCo2SavedTons} t/a</strong>
              </div>
            </div>

          </div>

          {/* Bento Card 2: Standards */}
          <div className="lg:col-span-5 glow-card-cyan p-8 sm:p-10 rounded-3xl space-y-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Playfair_Display']">Statik- & Steuernormen</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Konzipiert für mitteleuropäische Klimazonen. Zertifiziert nach DIN EN 1991 für alpine Schneelasten und steuerbefreit mit 0% MwSt.
              </p>
            </div>

            <div className="space-y-3.5 text-sm text-slate-200">
              {[content.cert1, content.cert2, content.cert3].map((cert, idx) => (
                <div key={idx} className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 flex items-center justify-between">
              <span>Produktionsstandort:</span>
              <strong className="text-white font-semibold">Seesen (Harz), Deutschland</strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
