'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sun, Shield, Scale, Layers, Check, AlertCircle, Sparkles } from 'lucide-react';

export const PreeminenceEducation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bifacial' | 'structural' | 'solarpflicht' | 'tax'>('bifacial');

  return (
    <section id="preeminence" className="py-20 px-4 lg:px-8 relative bg-slate-950/60 border-y border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Jay Abraham Strategy of Preeminence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            Why Standard Rooftop Solar Is <span className="text-solar-400">Inferior for Carports</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We don't just sell metal posts; we educate business owners and homeowners on the exact engineering, optical physics, and legislative rules governing high-efficiency solar carports.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto font-mono">
          <button
            onClick={() => setActiveTab('bifacial')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeTab === 'bifacial'
                ? 'bg-solar-gradient text-slate-950 shadow-solar-glow'
                : 'glass-panel text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>1. Bifacial Glass Optics (+25% Yield)</span>
          </button>

          <button
            onClick={() => setActiveTab('structural')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeTab === 'structural'
                ? 'bg-solar-gradient text-slate-950 shadow-solar-glow'
                : 'glass-panel text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>2. Structural Snow Load Engineering</span>
          </button>

          <button
            onClick={() => setActiveTab('solarpflicht')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeTab === 'solarpflicht'
                ? 'bg-solar-gradient text-slate-950 shadow-solar-glow'
                : 'glass-panel text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3. German Solarpflicht Mandates</span>
          </button>

          <button
            onClick={() => setActiveTab('tax')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeTab === 'tax'
                ? 'bg-solar-gradient text-slate-950 shadow-solar-glow'
                : 'glass-panel text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>4. Tax 0% VAT & Financial ROI</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 max-w-5xl mx-auto shadow-2xl">
          {activeTab === 'bifacial' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded bg-solar-500/10 text-solar-400 text-xs font-mono font-bold">
                  OPTICAL PHYSICS & HARVESTING
                </div>
                <h3 className="text-2xl font-bold text-white font-['Outfit']">Bifacial Dual-Glass Photovoltaic Mechanics</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Unlike traditional opaque roof modules, solar carports sit elevated 2.8m to 3.5m above ground. This creates a powerful ground albedo reflection.
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-solar-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Dual 2.0mm Tempered Glass:</strong> Eliminates micro-cracks and provides 30-year linear performance warranty.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-solar-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Ground Reflection Gain:</strong> Concrete and light pavement reflect diffuse sunlight back up to the rear PV cells for +15% to +25% total annual kWh.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-solar-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Natural Light Transmission:</strong> 10% to 20% light transparency options keep parking spaces brightly illuminated below.</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-800">
                <Image
                  src="/images/patio_solar_canopy.jpg"
                  alt="Bifacial Glass Glass Canopy"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 p-3 rounded-xl border border-slate-800 text-center font-mono">
                  <div className="text-xs text-slate-400">Bifacial Yield Advantage</div>
                  <div className="text-3xl font-black text-solar-400">+25.4% kWh/yr</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'structural' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded bg-electric-500/10 text-electric-400 text-xs font-mono font-bold">
                  GERMAN STRUCTURAL DYNAMICS
                </div>
                <h3 className="text-2xl font-bold text-white font-['Outfit']">Anodized Heavy Aluminum Extrusions</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Cheap steel carports rust at weld points within 5 years. RIAL Energy systems utilize T6 structural aluminum profiles with integrated rubber EPDM seals and concealed internal rain channels.
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-electric-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Snow Load Certified:</strong> Engineered to withstand snow loads up to 2.5 kN/m² (suitable for German Alpine & North European wind zone 4).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-electric-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Integrated Water Drainage:</strong> Hidden longitudinal gutters direct rainwater through structural support posts.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-electric-400 flex-shrink-0 mt-0.5" />
                    <span><strong>100% Corrosion Protection:</strong> Anodized surface treatment requires zero painting or maintenance for 40+ years.</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-800">
                <Image
                  src="/images/hero_solar_carport.jpg"
                  alt="Extruded Aluminum Structural Carport"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 p-3 rounded-xl border border-slate-800 text-center font-mono">
                  <div className="text-xs text-slate-400">Snow Load Safety Index</div>
                  <div className="text-3xl font-black text-electric-400">2.5 kN/m²</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'solarpflicht' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-mono font-bold">
                  COMMERCIAL COMPLIANCE
                </div>
                <h3 className="text-2xl font-bold text-white font-['Outfit']">State Solarpflicht Mandates for Parking Lots</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  German federal states (Baden-Württemberg, NRW, Niedersachsen, Rheinland-Pfalz, Schleswig-Holstein) legally mandate solar canopy coverage for open commercial parking spaces over 35 or 50 vehicle spots.
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Avoid Legal Fines:</strong> Non-compliant commercial parking developments face building permit rejections and fines.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-solar-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Turnkey Fleet Decarbonization:</strong> Fulfill climate mandate while creating a profit-generating EV charging station asset.</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-800">
                <Image
                  src="/images/commercial_fleet_solar.jpg"
                  alt="Commercial Parking Fleet Solar Carport"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                  <div className="text-solar-400 font-bold mb-1">MANDATORY REGULATORY COVERAGE:</div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Baden-Württemberg (&gt;35 spots)</span>
                    <span className="text-emerald-400 font-bold">Mandatory</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tax' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                  TAX & FINANCIAL RETURN
                </div>
                <h3 className="text-2xl font-bold text-white font-['Outfit']">0% VAT (§12 Abs. 3 UStG) & Amortization</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Residential and qualifying commercial solar carports under 30 kWp per taxpayer qualify for <strong>0% Value-Added Tax (MwSt)</strong> in Germany.
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>100% Tax Exemption:</strong> Zero MwSt applied to structural profiles, inverter, modules, and battery storage.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Fast Amortization:</strong> Typical payback achieved within 5.2 to 6.8 years with direct EV charging self-consumption.</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-6 bg-slate-900 text-center font-mono">
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 uppercase tracking-widest">German MwSt Tax Rate</div>
                  <div className="text-6xl font-black text-emerald-400">0% VAT</div>
                  <p className="text-xs text-slate-400">Direct savings of 19% on complete material bill of materials (§12 Abs. 3 UStG).</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
