'use client';

import React from 'react';
import { Sun, ShieldCheck, MapPin, Phone, Mail, Globe, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-solar-gradient flex items-center justify-center text-slate-950 font-bold shadow-solar-glow">
                <Sun className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white font-['Outfit']">solarcarport<span className="text-solar-500">.tech</span></span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Specialized brand of RIAL Energy GmbH for engineered solar carports, patio canopies, and bifacial PV overhang infrastructure.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-electric-400 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>DIN EN 1991 Snow Load Certified</span>
            </div>
          </div>

          {/* Col 2: Divisions */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider font-mono">RIAL Energy Network</h4>
            <ul className="space-y-2">
              <li><a href="https://www.rialenergy.de" target="_blank" rel="noreferrer" className="hover:text-solar-400 transition-colors">RIAL Energy GmbH Corporate</a></li>
              <li><a href="https://www.pvlager.com" target="_blank" rel="noreferrer" className="hover:text-solar-400 transition-colors">PV-Lager Wholesale Portal</a></li>
              <li><a href="#configurator" className="hover:text-solar-400 transition-colors">Solar Carport Configurator</a></li>
              <li><a href="#preeminence" className="hover:text-solar-400 transition-colors">Jay Abraham Educational Hub</a></li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider font-mono">German Legislation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="text-slate-300 font-medium">0% MwSt Tax Exemption</span> (§12 Abs. 3 UStG)</li>
              <li><span className="text-slate-300 font-medium">Solarpflicht</span> (BW, NRW, NDS Mandates)</li>
              <li><span className="text-slate-300 font-medium">Section 14a EnWG</span> Smart Grid Integration</li>
              <li><span className="text-slate-300 font-medium">30-Year Performance Guarantee</span></li>
            </ul>
          </div>

          {/* Col 4: Corporate Contact */}
          <div className="space-y-3 font-mono">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Headquarters & Logistics</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-solar-500 flex-shrink-0 mt-0.5" />
                <span>RIAL Energy GmbH<br />38723 Seesen, Germany</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-solar-500 flex-shrink-0" />
                <span>Direct Sales Line Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-solar-500 flex-shrink-0" />
                <span>www.solarcarport.tech</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} RIAL Energy GmbH. All rights reserved. Made for solarcarport.tech.
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-1 hover:text-solar-400 transition-colors mt-4 sm:mt-0"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
