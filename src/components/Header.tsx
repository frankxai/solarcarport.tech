'use client';

import React, { useState } from 'react';
import { Sun, ArrowRight, Menu, X, ShieldCheck, ShoppingBag, Database, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onOpenConfigurator: () => void;
  onOpenERP?: () => void;
}

const links = [
  { href: '#systems', label: 'Systeme' },
  { href: '#shop', label: 'E-Shop & Bausätze', isShop: true },
  { href: '#planning', label: 'Planung & Statik' },
  { href: '#projects', label: 'Referenzen' },
  { href: '#configurator', label: 'Konfigurator' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenConfigurator, onOpenERP }) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040711]/85 backdrop-blur-2xl transition-all duration-300">
      <div className="section-shell flex h-[76px] items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <a href="#top" onClick={close} className="flex min-w-0 items-center gap-3.5 group cursor-pointer" aria-label="SolarCarport.tech Startseite">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl liquid-glass-gold text-amber-400 group-hover:scale-105 transition-all duration-300">
            <Sun className="h-5 w-5 group-hover:rotate-45 transition-transform duration-500" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[19px] font-bold tracking-tight text-white font-['Poppins']">
              solarcarport<span className="text-amber-400 font-extrabold">.tech</span>
            </span>
            <span className="block truncate text-[9.5px] font-semibold uppercase tracking-[0.2em] text-slate-400 font-['Poppins']">
              RIAL Energy GmbH • Seesen / Harz
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 text-[13.5px] font-medium text-slate-300 md:flex font-['Poppins']" aria-label="Hauptnavigation">
          {links.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className={`transition-all duration-200 ${
                link.isShop 
                  ? 'flex items-center gap-1.5 text-amber-300 font-semibold px-3 py-1 rounded-full liquid-glass-gold hover:text-amber-200' 
                  : 'hover:text-amber-400 hover:translate-y-[-1px]'
              }`}
            >
              {link.isShop && <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />}
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {onOpenERP && (
            <button
              onClick={onOpenERP}
              className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-full liquid-glass-cyan text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-all cursor-pointer font-['Poppins'] shadow-sm"
              title="Echtzeit-Lagerbestand RIAL Energy Hub Seesen"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>ERP Bestand (Seesen)</span>
            </button>
          )}

          <button
            onClick={onOpenConfigurator}
            className="touch-target hidden items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-gold-subtle transition-all duration-200 hover:brightness-105 active:scale-95 sm:flex font-['Poppins'] cursor-pointer"
          >
            <span>Standort-Vorprüfung</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Navigation umschalten"
            className="touch-target flex h-10 w-10 items-center justify-center rounded-xl liquid-glass text-slate-300 hover:text-white md:hidden cursor-pointer"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-b border-white/10 bg-[#071019]/98 px-6 py-6 md:hidden backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 font-['Poppins'] space-y-4">
          <nav className="flex flex-col space-y-3 font-medium text-slate-200">
            {links.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={close} 
                className="py-2.5 border-b border-white/5 text-sm flex items-center justify-between hover:text-amber-400"
              >
                <div className="flex items-center space-x-2">
                  {link.isShop && <ShoppingBag className="w-4 h-4 text-amber-400" />}
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            {onOpenERP && (
              <button
                onClick={() => { close(); onOpenERP(); }}
                className="w-full py-3 rounded-2xl liquid-glass-cyan text-cyan-300 text-xs font-semibold flex items-center justify-center space-x-2"
              >
                <Database className="w-4 h-4" />
                <span>Live ERP Lagerbestand (2.840 Module)</span>
              </button>
            )}

            <button
              onClick={() => { close(); onOpenConfigurator(); }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-gold-subtle"
            >
              <span>Standort-Vorprüfung starten</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
