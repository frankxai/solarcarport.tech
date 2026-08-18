'use client';

import React, { useState } from 'react';
import { 
  Building2, Percent, ShieldCheck, Sun, ArrowUpRight, Check, Play, Volume2 
} from 'lucide-react';

interface PreeminenceEducationV2Props {
  lang: 'de' | 'en';
}

export const PreeminenceEducationV2Props: React.FC<PreeminenceEducationV2Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const content = {
    de: {
      tag: 'Engineering Specifications',
      headline: 'Architectural & Regulatory Standards',
      subtext: 'We engineer turnkey structural assets that transform dormant parking spaces and patio terraces into high-yield clean energy generators.',
      podcastTitle: 'Executive Audio Briefing (NotebookLM Overview)',
      podcastDesc: 'Listen to the 3-minute strategic overview on commercial Solarpflicht laws & 0% MwSt tax optimization.',
      tabs: [
        {
          id: 0,
          title: 'Solarpflicht Compliance',
          badge: 'Commercial Mandates',
          icon: Building2,
          summary: 'German & EU Commercial Solar Carport Mandates',
          body: 'Commercial parking spaces with over 35 or 50 vehicle spots are legally mandated to install photovoltaic overhangs. Our modular aluminum systems provide rapid 100% compliance without interrupting parking operations.',
          bullets: [
            'Turn mandatory regulatory compliance into a profitable energy revenue stream',
            'Full structural static calculations included for rapid municipal permit approval',
            'Integrated V2X EV charging stations for corporate electric vehicle fleets'
          ]
        },
        {
          id: 1,
          title: '0% MwSt Tax Exemption',
          badge: '§ 12 Abs. 3 UStG',
          icon: Percent,
          summary: 'Zero VAT on PV Hardware, Inverters & Assembly',
          body: 'Under German tax law (§ 12 Abs. 3 UStG), all photovoltaic carports, patio canopies, and solar fencing qualify for 0% Value Added Tax. Save 19% upfront capital investment immediately.',
          bullets: [
            'Direct 19% capital expenditure savings on hardware and certified installation',
            'Applies to both residential carports and commercial employee parking lots',
            'Simplified tax reporting without complex VAT refund paperwork'
          ]
        },
        {
          id: 2,
          title: '2.5 kN/m² Snow Load Rating',
          badge: 'DIN EN 1991 Certified',
          icon: ShieldCheck,
          summary: 'Engineered for Extreme Alpine & Northern Weather',
          body: 'Standard carports collapse under extreme snow accumulation. Our structural aluminum T6 extrusions and steel subframes are load-tested and certified to 2.5 kN/m² according to DIN EN 1991.',
          bullets: [
            'Built to withstand heavy snow, hail, and high-velocity wind storms (Zone 4)',
            'Anodized anti-corrosion coating guarantees 30+ year structural durability',
            'Pre-engineered concrete bolt anchor foundations for rapid assembly'
          ]
        },
        {
          id: 3,
          title: 'Bifacial Glass Optics',
          badge: '+25.4% Yield Gain',
          icon: Sun,
          summary: 'Dual-Glass Albedo Absorption Technology',
          body: 'Bifacial glass-glass solar panels capture sunlight from both top and bottom sides. Light reflecting off ground surfaces (albedo effect) generates up to 25.4% more electricity.',
          bullets: [
            'Translucent dual 2.0mm toughened safety glass for elegant daylighting',
            'Self-cleaning hydrophobic glass coating reduces maintenance costs to zero',
            'Linear performance warranty covering 30 years at >87% power output'
          ]
        }
      ]
    },
    en: {
      tag: 'Engineering Specifications',
      headline: 'Architectural & Regulatory Standards',
      subtext: 'We engineer turnkey structural assets that transform dormant parking spaces into high-yield clean energy generators.',
      podcastTitle: 'Executive Audio Briefing (NotebookLM Overview)',
      podcastDesc: 'Listen to the 3-minute strategic overview on commercial Solarpflicht laws & 0% VAT tax optimization.',
      tabs: [
        {
          id: 0,
          title: 'Solarpflicht Compliance',
          badge: 'Commercial Mandates',
          icon: Building2,
          summary: 'German & EU Commercial Solar Carport Mandates',
          body: 'Commercial parking lots exceeding 35 or 50 spaces in Baden-Württemberg, NRW, and Niedersachsen are legally required to install solar canopies. Our aluminum systems provide 100% turnkey compliance.',
          bullets: [
            'Transform legal compliance into a highly profitable clean energy asset',
            'Full structural static calculations included for fast municipal permitting',
            'Integrated V2X EV charging stations for corporate electric fleets'
          ]
        },
        {
          id: 1,
          title: '0% VAT Tax Exemption',
          badge: '§ 12 Abs. 3 UStG',
          icon: Percent,
          summary: 'Zero VAT on PV Hardware, Inverters & Installation',
          body: 'Under German tax law (§ 12 Abs. 3 UStG), all photovoltaic carports, patio canopies, and solar fencing qualify for 0% Value Added Tax. Save 19% upfront capital investment immediately.',
          bullets: [
            'Immediate 19% CAPEX savings on hardware and certified installation',
            'Applies to both residential home carports and commercial fleet lots',
            'Simplified tax reporting without complex VAT refund paperwork'
          ]
        },
        {
          id: 2,
          title: '2.5 kN/m² Snow Load Rating',
          badge: 'DIN EN 1991 Certified',
          icon: ShieldCheck,
          summary: 'Engineered for Extreme Weather & Heavy Snowfall',
          body: 'Generic carports buckle under heavy snow. Our structural aluminum T6 extrusions are load-tested and certified to 2.5 kN/m² according to DIN EN 1991 standards.',
          bullets: [
            'Engineered for heavy snow, hail, and extreme wind load zones',
            'Anodized anti-corrosion coating guarantees 30+ year structural life',
            'Pre-engineered ground bolt anchor foundations for fast assembly'
          ]
        },
        {
          id: 3,
          title: 'Bifacial Glass Optics',
          badge: '+25.4% Yield Gain',
          icon: Sun,
          summary: 'Dual-Glass Albedo Reflection Absorption',
          body: 'Bifacial glass-glass solar panels capture light from both top and bottom surfaces. Ambient light reflecting off ground surfaces generates up to 25.4% additional electricity.',
          bullets: [
            'Translucent dual 2.0mm safety glass permits soft natural daylighting',
            'Self-cleaning hydrophobic glass surface minimizes maintenance',
            '30-year linear performance warranty guaranteeing >87% output'
          ]
        }
      ]
    }
  }[lang];

  const currentTab = content.tabs[activeTab];

  return (
    <section id="v2-education" className="py-28 px-4 sm:px-8 lg:px-12 bg-[#030712] relative border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-medium tracking-wide">
            <span>{content.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Syne']">
            {content.headline}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {content.subtext}
          </p>
        </div>

        {/* Executive Audio Briefing Card */}
        <div className="glass-panel-obsidian p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
              <Volume2 className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-['Syne']">{content.podcastTitle}</h4>
              <p className="text-xs text-slate-300 mt-0.5">{content.podcastDesc}</p>
            </div>
          </div>

          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className="w-full md:w-auto px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-gold-subtle cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{isPlayingAudio ? 'Pause Audio Briefing' : 'Play 3-Min Executive Summary'}</span>
          </button>
        </div>

        {/* Tab Selection Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {content.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-6 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeTab === tab.id
                  ? 'glow-card-amber border-amber-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'text-amber-400' : 'text-slate-400'}`} />
                <div className="text-xs font-medium px-3 py-1 rounded-full bg-slate-900 text-amber-300 border border-slate-800 w-max">
                  {tab.badge}
                </div>
                <h4 className="font-bold text-white text-lg font-['Syne']">{tab.title}</h4>
              </div>

              <div className="pt-6 flex items-center text-xs font-bold text-amber-400">
                <span>{lang === 'de' ? 'Details ansehen' : 'Explore Concept'}</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </button>
          ))}
        </div>

        {/* Selected Tab Workspace Showcase */}
        <div className="glass-panel-obsidian p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-medium text-amber-400 tracking-wide uppercase">{currentTab.badge}</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Syne']">{currentTab.summary}</h3>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {currentTab.body}
            </p>

            <div className="space-y-3.5 text-sm text-slate-200 pt-2">
              {currentTab.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start space-x-3.5 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-white/10 h-80 lg:h-[400px] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
            <img 
              src={
                activeTab === 0 ? "/images/commercial_fleet_solar.jpg" :
                activeTab === 1 ? "/images/hero_solar_carport.jpg" :
                activeTab === 2 ? "/images/patio_solar_canopy.jpg" :
                "/images/bifacial_solar_fence.jpg"
              }
              alt="Solar Infrastructure Architecture" 
              className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 text-xs text-amber-300 bg-slate-950/90 p-4 rounded-2xl border border-slate-800 font-medium">
              <span>RIAL Energy GmbH • Seesen / Harz, Germany</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
