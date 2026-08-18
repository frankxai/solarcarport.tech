'use client';

import React, { useState } from 'react';
import { Sun, ArrowRight, Menu, X, ShieldCheck, Phone } from 'lucide-react';

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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040711]/95 backdrop-blur-xl">
      <div className="section-shell flex h-[72px] items-center justify-between gap-3">
        <a href="#top" onClick={close} className="flex min-w-0 items-center gap-3" aria-label="SolarCarport.tech Startseite">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/10 text-amber-300">
            <Sun className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[17px] font-extrabold tracking-[-0.03em] text-white font-['Syne']">
              solarcarport<span className="text-amber-400">.tech</span>
            </span>
            <span className="block truncate text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              RIAL Energy GmbH • Seesen
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-300 md:flex" aria-label="Hauptnavigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-amber-400">
              {link.label}
            </a>
          ))}
          <a href="/v2" className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all font-mono font-bold">
            V2 LUXE →
          </a>
        </nav>

        <div className="flex items-center gap-2">
          {onOpenERP && (
            <button
              onClick={onOpenERP}
              className="hidden lg:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ERP Bestand</span>
            </button>
          )}

          <button
            onClick={onOpenConfigurator}
            className="touch-target hidden items-center gap-2 rounded-full bg-amber-400 px-5 text-xs font-extrabold text-slate-950 transition hover:bg-amber-300 sm:flex"
          >
            <span>Standort prüfen</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
        <div className="border-b border-white/10 bg-[#071019] px-4 py-6 md:hidden">
          <nav className="flex flex-col space-y-3 font-semibold text-slate-200">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={close} className="py-2 border-b border-slate-800">
                {link.label}
              </a>
            ))}
            <a href="/v2" onClick={close} className="py-2 text-amber-400">
              V2 Luxe Experience →
            </a>
          </nav>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => { onOpenConfigurator(); close(); }}
              className="w-full py-3.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2"
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
