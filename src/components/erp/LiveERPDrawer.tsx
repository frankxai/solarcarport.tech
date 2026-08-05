'use client';

import React from 'react';
import { X, Database, CheckCircle, Package, Truck, ShieldAlert, Cpu, BarChart3 } from 'lucide-react';
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
      unit: 'Pcs',
      stockStatus: 'In Stock (Seesen Warehouse)',
      stockQty: 450,
    },
    {
      sku: 'RAL-PUR-60-EPDM',
      description: 'Heavy Purlin Profile Rail with Integrated EPDM Water Channel',
      qty: purlinCount,
      unit: 'Bars',
      stockStatus: 'In Stock (Seesen Warehouse)',
      stockQty: 1200,
    },
    {
      sku: config.moduleType === 'translucent' ? 'PV-GLASS-BIF-450' : 'PV-TOPCON-470-BLK',
      description: config.moduleType === 'translucent' ? '450W Translucent 20% Light-Permeable Glass-Glass Module' : '470W Bifacial N-Type TOPCon Dual-Glass PV Module',
      qty: moduleCount,
      unit: 'Modules',
      stockStatus: 'In Stock (PV-Lager Hub)',
      stockQty: 2840,
    },
    {
      sku: 'CLP-BLK-EPDM-30',
      description: 'Stainless Steel Anodized Black PV Module Clamps + EPDM Vibration Dampeners',
      qty: clampCount,
      unit: 'Sets',
      stockStatus: 'In Stock',
      stockQty: 15000,
    },
    {
      sku: `INV-HYB-${Math.ceil(kwp)}K-3P`,
      description: `Hybrid 3-Phase Solar Inverter ${Math.ceil(kwp)}kW with Smart Meter Interface`,
      qty: 1,
      unit: 'Unit',
      stockStatus: 'In Stock',
      stockQty: 180,
    },
  ];

  if (config.wallbox) {
    bomItems.push({
      sku: config.wallboxType === 'v2x' ? 'EV-WB-V2X-22KW' : 'EV-WB-11KW-STD',
      description: config.wallboxType === 'v2x' ? '22kW Bidirectional V2X (Vehicle-to-Grid) Wallbox Charging Hub' : '11kW Smart Commercial EV Charging Station',
      qty: 1,
      unit: 'Unit',
      stockStatus: 'In Stock',
      stockQty: 95,
    });
  }

  if (config.battery) {
    bomItems.push({
      sku: `BAT-LFP-${config.batterySize}K-HV`,
      description: `${config.batterySize}kWh High-Voltage LFP Battery Energy Storage System`,
      qty: 1,
      unit: 'Cabinet',
      stockStatus: 'In Stock',
      stockQty: 42,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md transition-opacity">
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-electric-500/10 border border-electric-500/30 flex items-center justify-center text-electric-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">RIAL Energy ERP Inventory Engine</h3>
              <p className="text-xs text-slate-400 font-mono">Live Bill-of-Materials Calculation • Seesen Hub</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System Summary KPI */}
        <div className="grid grid-cols-3 gap-3 font-mono text-center">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">System Capacity</div>
            <div className="text-lg font-bold text-solar-400">{kwp} kWp</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Structural Weight</div>
            <div className="text-lg font-bold text-white">{totalWeightKg} kg</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Est. Dispatch</div>
            <div className="text-lg font-bold text-emerald-400">3-5 Days</div>
          </div>
        </div>

        {/* BOM Items Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>CALCULATED BOM ITEMS ({bomItems.length})</span>
            <span className="text-electric-400">AUTOMATIC ERP SYNC</span>
          </div>

          <div className="space-y-2.5">
            {bomItems.map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-solar-400 font-bold">{item.sku}</span>
                    <h4 className="text-white font-sans font-medium text-sm">{item.description}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-white font-mono">{item.qty}</span>
                    <span className="text-slate-400 text-[11px] ml-1">{item.unit}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                  <span className="flex items-center space-x-1.5 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{item.stockStatus}</span>
                  </span>
                  <span>Qty Available: {item.stockQty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispatch & Freight Note */}
        <div className="bg-electric-500/10 p-4 rounded-xl border border-electric-500/30 flex items-start space-x-3 text-xs">
          <Truck className="w-5 h-5 text-electric-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-slate-300">
            <strong className="text-white font-bold">Direct Logistics from Seesen Warehouse:</strong>
            <p>Complete Bausatz modular packages are shipped via heavy freight crane truck directly to your installation site across Germany, Austria, and EU.</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-solar-gradient text-slate-950 font-bold text-sm shadow-solar-glow hover:opacity-95 transition-all"
        >
          Return to Configurator
        </button>

      </div>
    </div>
  );
};
