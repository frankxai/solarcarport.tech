'use client';

import React, { useState } from 'react';
import { Sun, ArrowRight, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenConfigurator: () => void;
  onOpenERP?: () => void;
}

const links = [
  { href: '#systems', label: 'Systeme' },
  { href: '#planning', label: 'Planung & Statik' },
  { href: '#projects', label: 'Realisierte Projekte' },
  { href: '#configurator', label: 'Konfigurator' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenConfigurator, onOpenERP }) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040711]/90 backdrop-blur-2xl transition-all duration-300">
      <div className="section-shell flex h-[72px] items-center justify-between gap-3">
        {/* Brand Logo with Poppins + Playfair elegance */}
        <a href="#top" onClick={close} className="flex min-w-0 items-center gap-3.5 group cursor-pointer" aria-label="SolarCarport.tech Startseite">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent text-amber-400 shadow-gold-subtle group-hover:scale-105 transition-transform duration-300">
            <Sun className="h-5 w-5 group-hover:rotate-45 transition-transform duration-500" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[19px] font-extrabold tracking-tight text-white font-['Poppins']">
              solarcarport<span className="text-amber-400 font-extrabold">.tech</span>
            </span>
            <span className="block truncate text-[9.5px] font-medium uppercase tracking-[0.2em] text-slate-400 font-['Poppins']">
              RIAL Energy GmbH • Seesen
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 text-[13.5px] font-medium text-slate-300 md:flex font-['Poppins']" aria-label="Hauptnavigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-amber-400 tracking-normal hover:translate-y-[-1px] transform duration-150">
              {link.label}
            </a>
          ))}
          <a href="/v2" className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-400/20 border border-amber-400/40 text-amber-300 hover:border-amber-300 hover:text-amber-200 transition-all font-['Poppins'] font-semibold shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>V2 Luxury Platform →</span>
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {onOpenERP && (
            <button
              onClick={onOpenERP}
              className="hidden lg:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all cursor-pointer font-['Poppins']"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ERP Lager</span>
            </button>
          )}

          <button
            onClick={onOpenConfigurator}
            className="touch-target hidden items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-gold-subtle transition-all duration-200 hover:brightness-105 hover:shadow-lg active:scale-95 sm:flex font-['Poppins'] cursor-pointer"
          >
            <span>Standort prüfen</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Navigation umschalten"
            className="touch-target flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 hover:text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-b border-white/10 bg-[#071019]/98 px-6 py-6 md:hidden backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3.5 font-medium text-slate-200 font-['Poppins']">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={close} className="py-2.5 border-b border-slate-800/80 text-sm hover:text-amber-400">
                {link.label}
              </a>
            ))}
            <a href="/v2" onClick={close} className="py-2.5 text-amber-400 font-semibold text-sm flex items-center justify-between">
              <span>V2 Luxury Platform</span>
              <Sparkles className="w-4 h-4" />
            </a>
          </nav>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => { onOpenConfigurator(); close(); }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 font-['Poppins'] shadow-gold-subtle"
            >
              <span>Konfigurator Starten</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
