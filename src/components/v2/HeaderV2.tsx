'use client';

import React, { useState } from 'react';
import { Sun, Menu, X, Globe, ShieldCheck, ChevronRight } from 'lucide-react';

interface HeaderV2Props {
  onOpenERP: () => void;
  lang: 'de' | 'en';
  setLang: (lang: 'de' | 'en') => void;
}

export const HeaderV2: React.FC<HeaderV2Props> = ({ onOpenERP, lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const content = {
    de: {
      status: 'Seesen Hub • Online',
      nav1: 'Architektur',
      nav2: 'Spezifikationen',
      nav3: 'Produkte',
      nav4: 'Konfigurator',
      erpBtn: 'ERP Bestände',
      quoteBtn: 'Konfigurator Starten',
    },
    en: {
      status: 'Seesen Hub • Online',
      nav1: 'Architecture',
      nav2: 'Specifications',
      nav3: 'Products',
      nav4: 'Configurator',
      erpBtn: 'ERP Stock',
      quoteBtn: 'Launch Configurator',
    }
  }[lang];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel-obsidian rounded-full px-6 py-3.5 border border-white/10 shadow-2xl flex items-center justify-between transition-all">
          
          {/* Logo & Brand Identity */}
          <a href="/v2" className="flex items-center space-x-3.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-gold-subtle flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-white font-bold text-lg tracking-tight font-['Syne']">SolarCarport</span>
                <span className="text-amber-400 font-bold text-lg font-['Syne']">.tech</span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal tracking-wide">RIAL Energy GmbH • Germany</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-9 text-sm font-medium text-slate-300">
            <a href="#v2-hero" className="hover:text-white transition-colors">{content.nav1}</a>
            <a href="#v2-education" className="hover:text-white transition-colors">{content.nav2}</a>
            <a href="#v2-products" className="hover:text-white transition-colors">{content.nav3}</a>
            <a href="#v2-configurator" className="hover:text-white transition-colors">{content.nav4}</a>
          </nav>

          {/* Status Badge & Action Controls */}
          <div className="hidden sm:flex items-center space-x-3.5">
            {/* Live ERP Pulse */}
            <div className="hidden xl:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{content.status}</span>
            </div>

            {/* DE / EN Language Switcher */}
            <button
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase font-bold">{lang}</span>
            </button>

            {/* ERP Drawer Trigger */}
            <button
              onClick={onOpenERP}
              className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{content.erpBtn}</span>
            </button>

            {/* CTA Button */}
            <a
              href="#v2-configurator"
              className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-gold-subtle active:scale-95 transition-all flex items-center space-x-2"
            >
              <span>{content.quoteBtn}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-amber-400"
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-4 top-24 z-50 glass-panel-obsidian rounded-3xl p-6 border border-white/10 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-3 font-medium text-slate-200 text-base">
            <a href="#v2-hero" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800">{content.nav1}</a>
            <a href="#v2-education" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800">{content.nav2}</a>
            <a href="#v2-products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800">{content.nav3}</a>
            <a href="#v2-configurator" onClick={() => setMobileMenuOpen(false)} className="py-2">{content.nav4}</a>
          </nav>

          <div className="pt-2 space-y-3">
            <button
              onClick={() => { onOpenERP(); setMobileMenuOpen(false); }}
              className="w-full py-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 text-sm font-medium flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{content.erpBtn}</span>
            </button>
            <a
              href="#v2-configurator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2"
            >
              <span>{content.quoteBtn}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
