'use client';

import React from 'react';
import { Sun, ShieldCheck, Database, FileText, ChevronRight, Phone } from 'lucide-react';

interface HeaderProps {
  onOpenConfigurator: () => void;
  onOpenERP: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConfigurator, onOpenERP }) => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-solar-gradient flex items-center justify-center shadow-solar-glow">
            <Sun className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white font-['Outfit']">solarcarport<span className="text-solar-500">.tech</span></span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-medium tracking-wide uppercase">
              <span>RIAL Energy GmbH</span>
              <span>•</span>
              <span className="text-electric-400 flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" /> German Engineering
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#technology" className="hover:text-solar-400 transition-colors">Bifacial Technology</a>
          <a href="#preeminence" className="hover:text-solar-400 transition-colors">Education & Standards</a>
          <a href="#products" className="hover:text-solar-400 transition-colors">System Types</a>
          <a href="#configurator" className="hover:text-solar-400 transition-colors">Configurator</a>
          <button 
            onClick={onOpenERP}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-electric-400 hover:bg-slate-800 transition-all text-xs font-mono"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Sample ERP Engine</span>
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-3">
          <a 
            href="tel:+495381987650"
            className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-solar-500" />
            <span>Sales Line</span>
          </a>
          <button
            onClick={onOpenConfigurator}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-solar-gradient hover:opacity-95 text-slate-950 font-bold text-xs sm:text-sm shadow-solar-glow transition-all active:scale-95"
          >
            <span>Configurator</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
