'use client';

import React from 'react';
import { ArrowUp, ExternalLink, MapPin, Sun } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050b11] py-12 text-sm text-slate-400 sm:py-16 font-['Poppins']">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-400"><Sun className="h-5 w-5" /></span>
              <span className="text-lg font-bold text-white font-['Poppins']">solarcarport<span className="text-amber-400">.tech</span></span>
            </div>
            <p className="mt-4 max-w-sm leading-6">Spezialisierte Projekt- und Informationsseite der RIAL Energy GmbH für Solarcarports und PV-Überdachungen.</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Gruppe</h3>
            <ul className="mt-4 space-y-3">
              <li><a className="inline-flex items-center gap-2 hover:text-white" href="https://www.rialenergy.de" target="_blank" rel="noreferrer">RIAL Energy GmbH <ExternalLink className="h-3.5 w-3.5" /></a></li>
              <li><a className="inline-flex items-center gap-2 hover:text-white" href="https://www.pvlager.com" target="_blank" rel="noreferrer">PV Lager <ExternalLink className="h-3.5 w-3.5" /></a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Kontakt & Hinweis</h3>
            <p className="mt-4 flex items-start gap-2 leading-6"><MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-300" />38723 Seesen, Deutschland</p>
            <p className="mt-3 text-xs leading-5">Alle Darstellungen, Preise und Erträge sind unverbindliche Planungsindikationen. Verbindlich sind ausschließlich individuell geprüfte Angebote und Nachweise.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} RIAL Energy GmbH · SolarCarport.tech</span>
          <nav aria-label="Rechtliche Hinweise" className="flex gap-4">
            <a href="https://www.rialenergy.de/impressum" target="_blank" rel="noreferrer" className="hover:text-white">Impressum</a>
            <a href="https://www.rialenergy.de/datenschutzerklarung" target="_blank" rel="noreferrer" className="hover:text-white">Datenschutz</a>
          </nav>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="touch-target inline-flex items-center gap-2 font-bold text-slate-300 hover:text-white">
            Nach oben <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
