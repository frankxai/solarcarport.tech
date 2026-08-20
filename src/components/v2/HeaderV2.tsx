'use client';

import React, { useState } from 'react';
import { Sun, Menu, X, Globe, ShieldCheck, ChevronRight, ShoppingBag, Database, ArrowRight } from 'lucide-react';

interface HeaderV2Props {
  onOpenERP: () => void;
  lang: 'de' | 'en';
  setLang: (lang: 'de' | 'en') => void;
}

export const HeaderV2: React.FC<HeaderV2Props> = ({ onOpenERP, lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const content = {
    de: {
      status: 'Seesen Hub • 2.840 Module lagernd',
      nav1: 'Architektur',
      navShop: 'E-Shop & Bausätze',
      nav2: 'Planungswissen',
      nav3: 'Systeme',
      nav4: 'Konfigurator',
      erpBtn: 'ERP Bestand',
      quoteBtn: 'Sofort-Angebot',
    },
    en: {
      status: 'Seesen Hub • 2,840 Modules In Stock',
      nav1: 'Architecture',
      navShop: 'E-Shop & Kits',
      nav2: 'Engineering',
      nav3: 'Systems',
      nav4: 'Configurator',
      erpBtn: 'ERP Stock',
      quoteBtn: 'Instant Quote',
    }
  }[lang];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-4 transition-all font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        <div className="liquid-glass rounded-full px-5 sm:px-6 py-3 border border-white/12 shadow-2xl flex items-center justify-between transition-all backdrop-blur-2xl bg-[#040711]/85">
          
          {/* Logo & Brand Identity */}
          <a href="/v2" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl liquid-glass-gold p-0.5 shadow-gold-subtle flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-white font-bold text-[17px] tracking-tight">SolarCarport</span>
                <span className="text-amber-400 font-extrabold text-[17px]">.tech</span>
              </div>
              <p className="text-[9.5px] text-slate-400 font-semibold tracking-wider uppercase">RIAL Energy GmbH • Seesen</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-[13.5px] font-medium text-slate-300">
            <a href="#v2-hero" className="hover:text-white transition-colors">{content.nav1}</a>
            <a href="#v2-shop" className="flex items-center gap-1.5 text-amber-300 font-semibold px-3 py-1 rounded-full liquid-glass-gold hover:text-amber-200 transition-all">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>{content.navShop}</span>
            </a>
            <a href="#v2-products" className="hover:text-white transition-colors">{content.nav3}</a>
            <a href="#v2-education" className="hover:text-white transition-colors">{content.nav2}</a>
            <a href="#v2-configurator" className="hover:text-white transition-colors">{content.nav4}</a>
            <a href="/" className="text-xs text-slate-400 hover:text-amber-400 transition-colors border-l border-white/10 pl-4">
              Klassik-Ansicht
            </a>
          </nav>

          {/* Status Badge & Action Controls */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Live ERP Pulse */}
            <div className="hidden xl:flex items-center space-x-2 px-3.5 py-1.5 rounded-full liquid-glass-cyan text-xs text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{content.status}</span>
            </div>

            {/* DE / EN Language Switcher */}
            <button
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full liquid-glass hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase font-bold">{lang}</span>
            </button>

            {/* ERP Drawer Trigger */}
            <button
              onClick={onOpenERP}
              className="px-3.5 py-1.5 rounded-full liquid-glass-cyan text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>{content.erpBtn}</span>
            </button>

            {/* Configurator CTA */}
            <a
              href="#v2-configurator"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-gold-subtle hover:brightness-105 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>{content.quoteBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Burger Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full liquid-glass text-xs font-bold text-slate-300"
            >
              <Globe className="w-3 h-3 text-amber-400" />
              <span className="uppercase">{lang}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl liquid-glass text-slate-300 hover:text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="max-w-7xl mx-auto mt-2 lg:hidden">
          <div className="liquid-glass rounded-3xl p-6 border border-white/10 shadow-2xl backdrop-blur-2xl bg-[#040711]/95 space-y-4">
            <nav className="flex flex-col space-y-3 font-medium text-slate-200 text-sm">
              <a href="#v2-hero" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 flex items-center justify-between">
                <span>{content.nav1}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
              <a href="#v2-shop" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 flex items-center justify-between text-amber-300 font-bold">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>{content.navShop}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </a>
              <a href="#v2-products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 flex items-center justify-between">
                <span>{content.nav3}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
              <a href="#v2-education" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 flex items-center justify-between">
                <span>{content.nav2}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
              <a href="#v2-configurator" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 flex items-center justify-between">
                <span>{content.nav4}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            </nav>

            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenERP(); }}
                className="w-full py-3 rounded-2xl liquid-glass-cyan text-cyan-300 text-xs font-semibold flex items-center justify-center space-x-2"
              >
                <Database className="w-4 h-4" />
                <span>Live ERP Lagerbestand (2.840 Module)</span>
              </button>

              <a
                href="#v2-configurator"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-gold-subtle"
              >
                <span>{content.quoteBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
