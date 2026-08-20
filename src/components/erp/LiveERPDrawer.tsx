'use client';

import React from 'react';
import { X, Database, CheckCircle2, Truck, FileDown, ShieldCheck, Warehouse, ArrowRight } from 'lucide-react';
import { ConfiguratorState } from '../configurator/Interactive2DRenderer';

interface LiveERPDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: ConfiguratorState;
}

export const LiveERPDrawer: React.FC<LiveERPDrawerProps> = ({ isOpen, onClose, config }) => {
  if (!isOpen) return null;

  // Calculate ERP Bill of Materials dynamically based on config
  const moduleCount = config.category === 'commercial' ? config.spots * 6 : config.category === 'double' ? 16 : 8;
  const kwp = Math.round(moduleCount * 0.47 * 10) / 10;
  const postCount = config.category === 'commercial' ? Math.ceil(config.spots / 2) + 1 : config.category === 'double' ? 4 : 2;
  const purlinCount = Math.round(moduleCount * 0.8);
  const clampCount = moduleCount * 4;
  const totalWeightKg = Math.round(postCount * 45 + purlinCount * 12 + moduleCount * 24);

  const bomItems = [
    {
      sku: config.material === 'aluminum' ? 'RAL-ALU-POST-2800' : 'RAL-STL-POST-3000',
      description: `Structural Support Post (${config.material.toUpperCase()} T6 Anodized)`,
      qty: postCount,
      unit: 'Stk.',
      stockStatus: 'Auf Lager (Zentrallager Seesen)',
      stockQty: 450,
    },
    {
      sku: 'RAL-PUR-60-EPDM',
      description: 'Schwere Längsträger-Profilschiene mit integrierter EPDM-Entwässerungsrinne',
      qty: purlinCount,
      unit: 'Stangen',
      stockStatus: 'Auf Lager (Zentrallager Seesen)',
      stockQty: 1200,
    },
    {
      sku: config.moduleType === 'translucent' ? 'PV-GLASS-BIF-450' : 'PV-TOPCON-470-BLK',
      description: config.moduleType === 'translucent' ? '450W Transluzentes 20% lichtdurchlässiges Glas-Glas Modul' : '470W Bifaziales N-Type TOPCon Dual-Glass PV-Modul',
      qty: moduleCount,
      unit: 'Module',
      stockStatus: 'Auf Lager (PV-Lager Hub)',
      stockQty: 2840,
    },
    {
      sku: 'CLP-BLK-EPDM-30',
      description: 'Edelstahl-Modulklemmen Schwarz eloxiert + EPDM-Vibrationsdämpfer',
      qty: clampCount,
      unit: 'Sets',
      stockStatus: 'Auf Lager',
      stockQty: 15000,
    },
    {
      sku: `INV-HYB-${Math.ceil(kwp)}K-3P`,
      description: `3-Phasen Hybrid-Wechselrichter ${Math.ceil(kwp)}kW mit Smart Meter Schnittstelle`,
      qty: 1,
      unit: 'Gerät',
      stockStatus: 'Auf Lager',
      stockQty: 180,
    },
  ];

  if (config.wallbox) {
    bomItems.push({
      sku: config.wallboxType === 'v2x' ? 'EV-WB-V2X-22KW' : 'EV-WB-11KW-STD',
      description: config.wallboxType === 'v2x' ? '22kW Bidirektionale V2X (Vehicle-to-Grid) Wallbox Ladestation' : '11kW Intelligente Gewerbe-Wallbox',
      qty: 1,
      unit: 'Gerät',
      stockStatus: 'Auf Lager',
      stockQty: 95,
    });
  }

  if (config.battery) {
    bomItems.push({
      sku: `BAT-LFP-${config.batterySize}K-HV`,
      description: `${config.batterySize}kWh High-Voltage LFP Batteriespeicherschrank`,
      qty: 1,
      unit: 'Schrank',
      stockStatus: 'Auf Lager',
      stockQty: 42,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-xl transition-all font-['Poppins'] animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#070c18] border-l border-white/10 h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl liquid-glass-cyan flex items-center justify-center text-cyan-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-['Playfair_Display']">RIAL Energy ERP Lager-Engine</h3>
                <p className="text-xs text-slate-300 font-mono">Live Stücklisten-Kalkulation • Zentrallager Seesen (Harz)</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl liquid-glass text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Warehouse KPI Row */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="liquid-glass p-3.5 rounded-2xl border border-white/5">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Leistung</div>
              <div className="text-lg font-bold text-amber-400">{kwp} kWp</div>
            </div>
            <div className="liquid-glass p-3.5 rounded-2xl border border-white/5">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Statik-Gewicht</div>
              <div className="text-lg font-bold text-white">{totalWeightKg} kg</div>
            </div>
            <div className="liquid-glass p-3.5 rounded-2xl border border-white/5">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Lieferung ab Lager</div>
              <div className="text-lg font-bold text-emerald-400">3-5 Werktage</div>
            </div>
          </div>

          {/* BOM Items Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1">
              <span>BERECHNETE STÜCKLISTE ({bomItems.length} KOMPONENTEN)</span>
              <span className="text-cyan-400 flex items-center gap-1 font-mono">
                <Warehouse className="w-3.5 h-3.5" /> SEESEN HUB SYNC
              </span>
            </div>

            <div className="space-y-2.5">
              {bomItems.map((item, idx) => (
                <div key={idx} className="liquid-glass p-4 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-amber-400 font-mono font-bold text-[11px]">{item.sku}</span>
                      <h4 className="text-white font-medium text-sm leading-snug">{item.description}</h4>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base font-bold text-white font-mono">{item.qty}</span>
                      <span className="text-slate-400 text-[11px] ml-1">{item.unit}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-white/5">
                    <span className="flex items-center space-x-1.5 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{item.stockStatus}</span>
                    </span>
                    <span className="text-slate-400">Lagerbestand: <strong className="text-slate-200">{item.stockQty}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics & Spedition Information */}
          <div className="liquid-glass-cyan p-4 rounded-2xl flex items-start space-x-3.5 text-xs">
            <Truck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-slate-300">
              <strong className="text-white font-bold block">Direktlogistik per Kran-LKW ab Seesen:</strong>
              <p className="font-light leading-relaxed">
                Komplette Überdachungsbausätze werden gebündelt und transportsicher verpackt direkt an die Baustelle in Deutschland, Österreich und der Schweiz geliefert.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 space-y-2.5">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-gold-subtle hover:brightness-105 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Zurück zum Konfigurator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
