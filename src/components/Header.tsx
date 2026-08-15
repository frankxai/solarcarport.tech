'use client';

import React, { useState } from 'react';
import { ArrowRight, Menu, Sun, X } from 'lucide-react';

interface HeaderProps {
  onOpenConfigurator: () => void;
}

const links = [
  { href: '#systems', label: 'Systeme' },
  { href: '#planning', label: 'Planung' },
  { href: '#configurator', label: 'Standortprüfung' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenConfigurator }) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071019]/94 backdrop-blur-xl">
      <div className="section-shell flex h-[72px] items-center justify-between gap-3">
        <a href="#top" onClick={close} className="flex min-w-0 items-center gap-3" aria-label="SolarCarport.tech Startseite">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/10 text-amber-300">
            <Sun className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[17px] font-extrabold tracking-[-0.03em] text-white">
              solarcarport<span className="text-amber-300">.tech</span>
            </span>
            <span className="block truncate text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Eine Marke der RIAL Energy GmbH
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-300 md:flex" aria-label="Hauptnavigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenConfigurator}
            className="touch-target hidden items-center gap-2 rounded-full bg-amber-400 px-5 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300 sm:flex"
          >
            Standort prüfen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="touch-target flex items-center justify-center rounded-full border border-white/15 text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-white/10 bg-[#071019] px-4 py-4 md:hidden" aria-label="Mobile Navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="touch-target flex items-center rounded-xl px-3 text-base font-semibold text-slate-200 hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                close();
                onOpenConfigurator();
              }}
              className="touch-target mt-2 flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 font-extrabold text-slate-950"
            >
              Standort prüfen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
