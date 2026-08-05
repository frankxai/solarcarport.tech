'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sun, Zap, Shield, ArrowRight, Award, CheckCircle2, TrendingUp, Cpu, Sparkles, Building, Car } from 'lucide-react';

interface HeroProps {
  onStartConfigurator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartConfigurator }) => {
  const [parkingSpaces, setParkingSpaces] = useState<number>(2);

  // Quick calculations for Jay Abraham instant proof
  const kWpPerSpace = 3.8;
  const totalKWp = Math.round(parkingSpaces * kWpPerSpace * 10) / 10;
  const kwhPerYear = Math.round(totalKWp * 980); // 980 kWh/kWp average yield in Germany
  const annualSavingsEur = Math.round(kwhPerYear * 0.32); // @ 32 cents/kWh
  const co2SavingsTons = Math.round(kwhPerYear * 0.42 / 100) / 10; // 0.42 kg/kWh

  return (
    <section className="relative min-h-[95vh] pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center">
      {/* Hero Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_solar_carport.jpg"
          alt="Solar Carport Infrastructure RIAL Energy"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.25),rgba(0,0,0,0))]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Column: Preeminent Copy & Positioning */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-solar-500/10 border border-solar-500/30 text-solar-400 text-xs font-mono font-bold tracking-wider uppercase shadow-solar-glow">
            <Award className="w-4 h-4 text-solar-500" />
            <span>RIAL Energy GmbH • Official SolarCarport.tech Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] font-['Outfit']">
            Turn Parking Spaces Into <span className="text-transparent bg-clip-text bg-solar-gradient">High-Yield Solar Infrastructures</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Stop letting valuable outdoor real estate sit idle. Our engineered modular aluminum solar carports and bifacial glass-glass canopies deliver up to <strong className="text-white font-semibold">25% higher annual energy yield</strong> while shielding vehicles, providing shade, and fulfilling German commercial solar mandates.
          </p>

          {/* Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
            <div className="flex items-center space-x-2.5 text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-solar-500 flex-shrink-0" />
              <span>Snow Load 2.5 kN/m²</span>
            </div>
            <div className="flex items-center space-x-2.5 text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-solar-500 flex-shrink-0" />
              <span>0% MwSt (§12 UStG)</span>
            </div>
            <div className="flex items-center space-x-2.5 text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-solar-500 flex-shrink-0" />
              <span>German ERP BOM</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              onClick={onStartConfigurator}
              className="flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-solar-gradient text-slate-950 font-extrabold text-base shadow-solar-glow hover:opacity-95 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <span>Build Free Configuration</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#preeminence"
              className="flex items-center justify-center space-x-2 px-6 py-4 rounded-xl glass-panel text-slate-200 font-semibold text-sm hover:border-slate-500 transition-all cursor-pointer"
            >
              <span>Read Solarpflicht & Tech Guide</span>
            </a>
          </div>

        </div>

        {/* Right Column: Interactive Quick Energy Yield Calculator */}
        <div className="lg:col-span-5">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-solar-500/30 shadow-2xl relative bg-slate-950/80 backdrop-blur-xl">
            <div className="absolute -top-3.5 right-6 bg-solar-gradient text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
              ★ Live Quick Simulator
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-electric-500/10 border border-electric-500/30 flex items-center justify-center text-electric-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-['Outfit']">Solar Carport Yield Simulator</h3>
                <p className="text-xs text-slate-400 font-mono">Instant ROI & Capacity Calculation</p>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Parking Capacity:</span>
                <span className="text-solar-400 font-bold font-mono text-base">{parkingSpaces} {parkingSpaces === 1 ? 'Vehicle Spot' : 'Vehicle Spots'}</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={parkingSpaces}
                onChange={(e) => setParkingSpaces(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-solar-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>1 Spot (Single)</span>
                <span>10 Spots</span>
                <span>50 Spots (Fleet)</span>
              </div>
            </div>

            {/* Output Matrix */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between font-mono">
                  <span>PV Capacity</span>
                  <Zap className="w-3.5 h-3.5 text-solar-400" />
                </div>
                <div className="text-xl font-black text-white font-mono">{totalKWp} <span className="text-xs text-slate-400 font-normal">kWp</span></div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between font-mono">
                  <span>Annual Yield</span>
                  <Sun className="w-3.5 h-3.5 text-solar-400" />
                </div>
                <div className="text-xl font-black text-solar-400 font-mono">{kwhPerYear.toLocaleString()} <span className="text-xs text-slate-400 font-normal">kWh/yr</span></div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between font-mono">
                  <span>Est. Annual Savings</span>
                  <TrendingUp className="w-3.5 h-3.5 text-electric-400" />
                </div>
                <div className="text-xl font-black text-electric-400 font-mono">€{annualSavingsEur.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/yr</span></div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between font-mono">
                  <span>CO2 Avoided</span>
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xl font-black text-emerald-400 font-mono">{co2SavingsTons} <span className="text-xs text-slate-400 font-normal">tons/yr</span></div>
              </div>
            </div>

            <button
              onClick={onStartConfigurator}
              className="w-full py-3.5 rounded-xl bg-electric-gradient text-slate-950 font-black text-sm shadow-electric-glow hover:opacity-95 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
            >
              <span>Customize Full Structural Bill of Materials</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2.5 font-mono">
              Includes pre-calculated extruded aluminum profile BOM & live pricing.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
