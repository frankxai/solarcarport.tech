'use client';

import React, { useState, useEffect } from 'react';
import { Sun, ShieldCheck, Database, Phone, ChevronRight, Menu, X, Sparkles, Zap } from 'lucide-react';

interface HeaderProps {
  onOpenConfigurator: () => void;
  onOpenERP: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConfigurator, onOpenERP }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300">
      <div 
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled 
            ? 'glass-panel border-solar-500/20 shadow-solar-glow/20 py-2.5 px-4 sm:px-6 bg-slate-950/85 backdrop-blur-xl' 
            : 'glass-panel border-white/10 py-3.5 px-4 sm:px-6 bg-slate-950/60 backdrop-blur-md'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-10 h-10 rounded-xl bg-solar-gradient flex items-center justify-center shadow-solar-glow group-hover:scale-105 transition-transform duration-300">
              <Sun className="w-6 h-6 text-slate-950 font-black animate-spin-slow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-electric-400 border-2 border-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-['Outfit']">
                  solarcarport<span className="text-solar-400 font-black">.tech</span>
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                <span>RIAL Energy GmbH</span>
                <span>•</span>
                <span className="text-electric-400 flex items-center gap-0.5 font-semibold">
                  <ShieldCheck className="w-3 h-3" /> German Certified
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold text-slate-300">
            <a href="#technology" className="hover:text-solar-400 transition-colors flex items-center gap-1">
              <span>Bifacial PV</span>
            </a>
            <a href="#preeminence" className="hover:text-solar-400 transition-colors flex items-center gap-1">
              <span>Education</span>
            </a>
            <a href="#products" className="hover:text-solar-400 transition-colors flex items-center gap-1">
              <span>Products</span>
            </a>
            <a href="#configurator" className="hover:text-solar-400 transition-colors flex items-center gap-1">
              <span>Configurator</span>
            </a>
            
            <button 
              onClick={onOpenERP}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-electric-400 hover:bg-slate-800 hover:border-electric-400 transition-all font-mono text-[11px]"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Live ERP</span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <a 
              href="tel:+495381987650"
              className="hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-solar-500" />
              <span>Sales Hotline</span>
            </a>

            <button
              onClick={onOpenConfigurator}
              className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-solar-gradient hover:opacity-95 text-slate-950 font-black text-xs shadow-solar-glow transition-all active:scale-95"
            >
              <span>Build Config</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto rounded-2xl glass-panel p-5 bg-slate-950/95 border-solar-500/30 space-y-4 font-mono text-sm animate-fade-in shadow-2xl">
          <div className="space-y-3 pt-2">
            <a 
              href="#technology" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-solar-400 font-medium py-1.5"
            >
              Bifacial PV Technology
            </a>
            <a 
              href="#preeminence" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-solar-400 font-medium py-1.5"
            >
              Education & Legislative Standards
            </a>
            <a 
              href="#products" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-solar-400 font-medium py-1.5"
            >
              Carport Product Lines
            </a>
            <a 
              href="#configurator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-solar-400 font-medium py-1.5"
            >
              Interactive Configurator
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenERP(); }}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-electric-400 border border-slate-800 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4" />
              <span>Inspect Sample ERP Engine</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenConfigurator(); }}
              className="w-full py-3 rounded-xl bg-solar-gradient text-slate-950 font-black text-xs shadow-solar-glow flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Start Free Configuration</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
