'use client';

import React, { useState } from 'react';
import { 
  Sun, Shield, Download, ArrowRight, CheckCircle2, Zap, 
  Terminal, Sparkles, BookOpen, Layers, Globe, FileText, 
  Check, Copy, ChevronRight, Calculator, Wrench, Building2,
  Code2, ExternalLink
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function DigitalProductsPage() {
  const [copiedSkill, setCopiedSkill] = useState(false);
  const [activeTab, setActiveTab] = useState<'b2c' | 'installer' | 'commercial'>('b2c');
  const [selectedSpots, setSelectedSpots] = useState<number>(2);
  const [selectedSurface, setSelectedSurface] = useState<'concrete' | 'gravel' | 'asphalt' | 'snow'>('concrete');
  const [region, setRegion] = useState<'de' | 'us' | 'uk' | 'global'>('de');
  const [previewChapter, setPreviewChapter] = useState<string | null>(null);

  // Albedo physics calculation
  const albedoMultipliers = {
    asphalt: { gain: 0.10, label: 'Asphalt (12% Reflektion)' },
    concrete: { gain: 0.196, label: 'Helle Pflastersteine (35% Reflektion)' },
    gravel: { gain: 0.23, label: 'Weißer Zierkies (55% Reflektion)' },
    snow: { gain: 0.28, label: 'Schneedecke (80% Reflektion)' },
  };

  const kwpBase = selectedSpots === 1 ? 3.8 : selectedSpots === 2 ? 7.6 : selectedSpots * 3.5;
  const currentAlbedoGain = albedoMultipliers[selectedSurface].gain;
  const totalAnnualKwh = Math.round(kwpBase * 980 * (1 + currentAlbedoGain));
  const estimatedSavingsEur = Math.round(totalAnnualKwh * 0.75 * 0.38 + totalAnnualKwh * 0.25 * 0.08);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npx -y arcanea install skill solar-architect');
    setCopiedSkill(true);
    setTimeout(() => setCopiedSkill(false), 2500);
  };

  return (
    <main className="min-h-screen bg-[#040711] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-['Poppins']">
      
      {/* Navigation Header */}
      <Header onOpenConfigurator={() => window.location.href = '/#configurator'} />

      {/* Hero Section: Epiphany & Transformation */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/15 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Preeminence Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sovereign Energy Architecture • German Engineering Worldwide</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
            Vom passiven Stromkunden zum <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">souveränen Energie-Architekten</span>.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Schluss mit 40 Cent/kWh Netzstrom, Dachdurchdringungen und 30.000 € Handwerker-Margen. Nutzen Sie deutsche Hochleistungs-Tragwerkslehre, um Ihren eigenen bifazialen Solar-Carport überall auf der Welt selbst zu planen, zu genehmigen und zu bauen.
          </p>

          {/* Quick CTA cluster */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#store" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-gold-subtle hover:brightness-105 active:scale-95 transition-all flex items-center space-x-2"
            >
              <span>Digital Blueprints & Compendium</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a 
              href="#agentic-skills" 
              className="px-8 py-4 rounded-full bg-slate-900/90 border border-slate-700 hover:border-amber-400/40 text-slate-200 font-semibold text-sm hover:text-white transition-all flex items-center space-x-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Agentic Skill Pack (Claude & Codex)</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">DIN EN 1991 Statik</p>
                <p className="text-[11px] text-slate-400">Bis zu 2,5 kN/m² Schneelast geprüft</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">+20% Bifazial-Boost</p>
                <p className="text-[11px] text-slate-400">Maximale Albedo-Bodenausbeute</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Building2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Universal Bau-Check</p>
                <p className="text-[11px] text-slate-400">16 Bundesländer & International</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Layers className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Zero Headaches</p>
                <p className="text-[11px] text-slate-400">100% digitaler Sofort-Download</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Global Canopy CAD & Physics Simulator */}
      <section className="py-20 bg-[#070c18] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Interaktiver Statik- & <span className="text-amber-400">Bifazial-Simulator</span>
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base">
              Erleben Sie in Echtzeit, wie Tragwerksabmessungen, Bodenreflexion (Albedo) und §14a EnWG die Autarkie Ihres Solar-Carports maximieren.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Control Panel */}
            <div className="lg:col-span-5 bg-[#0b1222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              
              {/* Size Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  1. Stellplatz-Dimensionierung
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 1, label: '1er Single', size: '3.8 kWp' },
                    { id: 2, label: '2er Doppel', size: '7.6 kWp' },
                    { id: 4, label: '4er Flotte', size: '15.2 kWp' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedSpots(item.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedSpots === item.id 
                          ? 'border-amber-400 bg-amber-400/15 text-white font-bold shadow-sm' 
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs">{item.label}</div>
                      <div className="text-[10px] text-amber-400 mt-0.5">{item.size}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Surface / Albedo Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  2. Untergrund & Albedo-Reflexion
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['asphalt', 'concrete', 'gravel', 'snow'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSurface(s)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        selectedSurface === s 
                          ? 'border-cyan-400 bg-cyan-400/10 text-white font-semibold' 
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="capitalize">{s === 'concrete' ? 'Pflaster/Beton' : s === 'gravel' ? 'Weißer Kies' : s === 'asphalt' ? 'Asphalt' : 'Schnee'}</div>
                      <div className="text-[10px] text-cyan-400 mt-0.5">+{Math.round(albedoMultipliers[s].gain * 100)}% Mehrertrag</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Region Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  3. Regulatorischer Standard
                </label>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {[
                    { id: 'de', label: 'DE (LBO)' },
                    { id: 'us', label: 'US (NEC)' },
                    { id: 'uk', label: 'UK (Part P)' },
                    { id: 'global', label: 'Global' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRegion(r.id as any)}
                      className={`py-2 px-1 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                        region === r.id 
                          ? 'border-emerald-400 bg-emerald-400/15 text-white font-bold' 
                          : 'border-slate-800 bg-slate-900/50 text-slate-400'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CAD Spec Exporter Button */}
              <div className="pt-2">
                <a 
                  href="#lead-magnet"
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center space-x-2 transition-all"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Kostenlose Statik-Checkliste herunterladen</span>
                </a>
              </div>

            </div>

            {/* Live Yield & Bill of Materials Result Card */}
            <div className="lg:col-span-7 bg-[#0b1222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>Echtzeit-Berechnung: {selectedSpots}er Solar-Carport</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 text-[11px] font-bold">
                      {kwpBase} kWp
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">German Engineering Standard (RAL-ALU-POST-2800)</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-400">{totalAnnualKwh.toLocaleString()} kWh</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Jahresertrag</div>
                </div>
              </div>

              {/* Metric Pillars */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                  <div className="text-xs text-slate-400">Bifazial-Bonus</div>
                  <div className="text-xl font-bold text-cyan-400 mt-1">+{Math.round(currentAlbedoGain * 100)}%</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Reflexions-Gewinn</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                  <div className="text-xs text-slate-400">Stromersparnis</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">ca. {estimatedSavingsEur.toLocaleString()} €</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">pro Jahr</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                  <div className="text-xs text-slate-400">Schneelast-Rating</div>
                  <div className="text-xl font-bold text-purple-400 mt-1">2,50 kN/m²</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Zone 1–3 gesichert</div>
                </div>
              </div>

              {/* Bill of Materials Live Cut-List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Generierte Stückliste (BOM & Profile)</span>
                  <span className="text-[10px] text-amber-400 font-normal">RIAL Energy Kompatibel</span>
                </h4>

                <div className="rounded-2xl border border-slate-800/90 bg-slate-950/60 divide-y divide-slate-800/60 text-xs">
                  <div className="p-3 flex justify-between items-center text-slate-300">
                    <span className="font-mono text-cyan-400">PRF-ALU-POST-2800</span>
                    <span>{selectedSpots * 2}x Alu-Stützen 150x150mm (2.8m)</span>
                    <span className="font-semibold text-white">Inklusive</span>
                  </div>
                  <div className="p-3 flex justify-between items-center text-slate-300">
                    <span className="font-mono text-cyan-400">RAL-PUR-60</span>
                    <span>{selectedSpots * 2 + 1}x Pfetten mit integrierter Drainage</span>
                    <span className="font-semibold text-white">Inklusive</span>
                  </div>
                  <div className="p-3 flex justify-between items-center text-slate-300">
                    <span className="font-mono text-cyan-400">MOD-BF-GG-475</span>
                    <span>{selectedSpots * 8}x Glas-Glas 475W Bifazial-Module</span>
                    <span className="font-semibold text-white">N-Type TOPCon</span>
                  </div>
                  <div className="p-3 flex justify-between items-center text-slate-300">
                    <span className="font-mono text-cyan-400">CLP-BLK-30</span>
                    <span>{selectedSpots * 32}x Klemmen-Set Schwarz Eloxiert</span>
                    <span className="font-semibold text-white">EPDM Gasket</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* The 3 Sovereign Digital Products Store */}
      <section id="store" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sovereign Digital Storefront</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Wählen Sie Ihren <span className="text-amber-400">Digital Blueprint</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Sofortiger digitaler Zugang zu vollständigen Konstruktions-Blueprints, Bauamt-Leitfäden und KI-Agenten. Keine Wartezeit, keine Beratergebühren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Product 1: Sovereign Solar Architect Ebook + Vault */}
          <div className="glass-panel-obsidian rounded-3xl p-8 border border-amber-400/40 bg-gradient-to-b from-amber-500/5 via-slate-900/90 to-[#0b1222] relative flex flex-col justify-between shadow-2xl shadow-amber-500/5">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-sm">
              Bestseller für Eigenheimbesitzer
            </div>

            <div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Digital Compendium</span>
                <span className="text-2xl font-extrabold text-white">47 € <span className="text-xs font-normal text-slate-400 line-through">149 €</span></span>
              </div>

              <h3 className="text-xl font-bold text-white mt-3">The Sovereign Solar Architect Master-Blueprint</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Das definitive 120-Seiten Praxisbuch & Notion Vault für Planung, Statik, 16-Bundesländer Bauantrag und DIY-Montage von Solar-Carports.
              </p>

              <div className="mt-6 space-y-3 text-xs text-slate-200">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>16-Bundesländer LBO Matrix:</strong> Exakte Grenzen für verfahrensfreien Bau & Grenzbebauung.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Punktfundament & Krinner Schraubanker:</strong> Bodenklassen & Aushubpläne.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>§14a EnWG & 0% MwSt Formulare:</strong> Steuerliche & netzdienliche Musteranträge.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>100 € Hardware-Gutschein</strong> für RIAL Energy Carport-Bausätze inklusive.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => alert("Digital Checkout wird initialisiert... Sofortiger PDF/Notion Download.")}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-gold-subtle hover:brightness-105 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Sofort herunterladen (47 €)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-slate-400">100% Geld-zurück-Garantie • Sofortiger Download</p>
            </div>
          </div>

          {/* Product 2: B2B Solar Closer Pro AI Skill Pack */}
          <div className="glass-panel-obsidian rounded-3xl p-8 border border-cyan-400/40 bg-gradient-to-b from-cyan-500/5 via-slate-900/90 to-[#0b1222] relative flex flex-col justify-between shadow-2xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-sm">
              Für Installateure & Verkäufer
            </div>

            <div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Agentic Skill Pack</span>
                <span className="text-2xl font-extrabold text-white">149 € <span className="text-xs font-normal text-slate-400 line-through">490 €</span></span>
              </div>

              <h3 className="text-xl font-bold text-white mt-3">Solar Closer Pro: Arcanea / Claude & GPT Prompt Engine</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Automatisieren Sie Kundenberatung, Einwandbehandlung (Zinsen, Einspeisung) und BOM-Kalkulationen mit autonomen KI-Agenten.
              </p>

              <div className="mt-6 space-y-3 text-xs text-slate-200">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Diagnostischer Angebots-Agent:</strong> Erstellt in 15 Sekunden ingenieurtechnische Memos.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>40+ Deutsche Einwand-Zerstörer:</strong> Zinsen, Amortisation, LBO-Angst entkräften.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Python & MCP Sizing Tool:</strong> Direkte SKU-Stücklisten-Berechnung für RIAL Profile.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Claude, Antigravity & OpenAI Codex</strong> kompatibel.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => alert("Installer Skill Pack Checkout wird initialisiert... Sofortiger Prompt- & Skript-Zugang.")}
                className="w-full py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Skill Pack freischalten (149 €)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-slate-400">Kommerzielle Lizenz • Unbegrenzte Nutzung</p>
            </div>
          </div>

          {/* Product 3: Commercial Solarpflicht & Fleet Playbook */}
          <div className="glass-panel-obsidian rounded-3xl p-8 border border-purple-400/30 bg-gradient-to-b from-purple-500/5 via-slate-900/90 to-[#0b1222] relative flex flex-col justify-between shadow-2xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-400 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-sm">
              Für Gewerbe & Flotten
            </div>

            <div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">B2B Compliance</span>
                <span className="text-2xl font-extrabold text-white">490 € <span className="text-xs font-normal text-slate-400 line-through">1.200 €</span></span>
              </div>

              <h3 className="text-xl font-bold text-white mt-3">Commercial Solarpflicht & Fleet Decarbonization Playbook</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Der Komplett-Leitfaden für Parkplatz-Betreiber (&gt;35 Stellplätze), Gewerbeimmobilien, Supermärkte und Flottenmanager (BW, NRW, Hessen).
              </p>

              <div className="mt-6 space-y-3 text-xs text-slate-200">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Solarpflicht-Compliance Matrix:</strong> Gesetzliche Fristen & Ausnahmeregelungen.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>AfA & IAB §7g Steuermodell:</strong> Maximale Abschreibung für Parkplatz-Solar.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Vollständiger Ausschreibungstext:</strong> Vorfertigung für Architekten und Tragwerksplaner.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Flotten-Peak-Shaving:</strong> Vermeidung von Lastspitzen-Netzentgelten.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => alert("Commercial Playbook Download wird vorbereitet...")}
                className="w-full py-3.5 rounded-full bg-purple-400 hover:bg-purple-300 text-slate-950 font-bold text-xs shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>B2B Playbook erwerben (490 €)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-slate-400">Rechnung mit ausgewiesener MwSt (0%/19%)</p>
            </div>
          </div>

        </div>

      </section>

      {/* Agentic Skill & Codex/Antigravity Terminal Section */}
      <section id="agentic-skills" className="py-20 bg-[#060a14] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                <Code2 className="w-3.5 h-3.5" />
                <span>Agentic AI Plugin & Skill System</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Installieren Sie deutsches Solar-Ingenieurwissen in Ihre <span className="text-cyan-400">KI-Agenten</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Verbinden Sie Claude, Antigravity, OpenAI Codex oder lokale LLMs direkt mit dem <code>solar-architect</code> Skill. Berechnen Sie Tragwerkslasten, Schneezonen und Stücklisten automatisiert in Sekunden.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold">1</div>
                  <span>Vollständig kompatibel mit Claude Desktop MCP, Antigravity CLI und OpenAI Codex.</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold">2</div>
                  <span>Integrierte Python-Engines zur Auslegung von bifazialem Ertrag und Aluminium-Pfetten.</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold">3</div>
                  <span>Open-Source Kern-Architektur mit sofortiger Einsetzbarkeit.</span>
                </div>
              </div>
            </div>

            {/* Interactive Terminal */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl">
                
                {/* Terminal Header */}
                <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    <span className="text-xs font-mono text-slate-400 ml-2">terminal — antigravity / claude</span>
                  </div>

                  <button
                    onClick={handleCopyInstall}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 transition-all cursor-pointer"
                  >
                    {copiedSkill ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copiedSkill ? 'Kopiert!' : 'Befehl kopieren'}</span>
                  </button>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-xs space-y-4 text-slate-300">
                  <div>
                    <span className="text-emerald-400">$</span> <span className="text-amber-300">npx -y arcanea install skill solar-architect</span>
                  </div>
                  <div className="text-slate-500">
                    [INFO] Cloning skill: solar-architect (German Engineering Edition)...<br />
                    [INFO] Verified DIN EN 1991 Snow/Wind statics formulas.<br />
                    [SUCCESS] Skill loaded into Antigravity & Claude Code context.
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-emerald-400">$</span> <span className="text-cyan-300">solar-architect --spots 2 --surface concrete --wallbox v2x</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 text-slate-300 space-y-1 text-[11px] border border-slate-800">
                    <div className="text-amber-400 font-bold">=== RIAL ENERGY SOLAR CARPORT CALCULATION ===</div>
                    <div>• Capacity: <span className="text-white font-semibold">7.60 kWp</span> (16x Bifacial TOPCon 475W Glass)</div>
                    <div>• Structural: <span className="text-white">4x RAL-ALU-POST-2800, 5x RAL-PUR-60</span></div>
                    <div>• Bifacial Albedo Gain: <span className="text-cyan-400 font-semibold">+19.6%</span></div>
                    <div>• Estimated Annual Yield: <span className="text-emerald-400 font-bold">8,908 kWh/year</span></div>
                    <div>• Statik Snow Load: <span className="text-purple-400">2.50 kN/m² (Certified Safe)</span></div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Free Lead Magnet Section: 10-Minute Statik Checklist */}
      <section id="lead-magnet" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-panel-obsidian rounded-3xl p-8 sm:p-12 border border-amber-400/30 bg-gradient-to-b from-amber-500/10 to-slate-900/90 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              Kostenloses Prüf-Dossier
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Die 10-Minuten Solar-Carport Baugenehmigungs- & Statik-Checkliste
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Prüfen Sie in wenigen Minuten, ob Ihr geplanter Carport verfahrensfrei errichtet werden darf, welche Abstandsflächen zur Grenze gelten und wie Sie 0% MwSt rechtssicher anwenden.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Vielen Dank! Das kostenlose Prüf-Dossier wurde an Ihre E-Mail gesendet.");
              }}
              className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input 
                type="email" 
                required 
                placeholder="Ihre E-Mail-Adresse eingeben"
                className="flex-1 px-4 py-3.5 rounded-full bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button 
                type="submit"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-gold-subtle hover:brightness-105 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                Gratis herunterladen
              </button>
            </form>

            <p className="text-[10px] text-slate-400 mt-2">
              Kein Spam. Sofortiger Download-Link per E-Mail.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}
