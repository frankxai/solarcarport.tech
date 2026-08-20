'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShoppingBag, CheckCircle2, ShieldCheck, ArrowRight, Truck, 
  Sparkles, Layers, Zap, Battery, Download, Info, Check, Filter 
} from 'lucide-react';
import type { ConfiguratorState } from '../configurator/Interactive2DRenderer';

interface SolarShopProps {
  onOpenERP?: () => void;
  onOpenLeadModal?: (config: ConfiguratorState) => void;
}

export interface ShopProduct {
  id: string;
  category: 'carport' | 'terrace' | 'fence' | 'component';
  title: string;
  subtitle: string;
  capacityKwp: number;
  moduleCount: number;
  moduleType: string;
  profileType: string;
  snowLoad: string;
  priceNetto: number;
  vatRate: number;
  image: string;
  stockStatus: string;
  deliveryWeeks: string;
  sku: string;
  features: string[];
  configMapping: ConfiguratorState;
}

export const shopProducts: ShopProduct[] = [
  {
    id: 'doppelcarport-pro',
    category: 'carport',
    title: 'Doppel-Solarcarport Bausatz Pro',
    subtitle: 'Komplettset für 2 Fahrzeuge mit 16 bifazialen Glas-Glas Modulen',
    capacityKwp: 7.52,
    moduleCount: 16,
    moduleType: '470W Bifacial N-Type TOPCon Dual-Glass',
    profileType: 'Aluminium T6 Eloxiert (Anthrazit RAL 7016)',
    snowLoad: '2.5 kN/m² (DIN EN 1991)',
    priceNetto: 4900,
    vatRate: 0,
    image: '/media/5x3-carport-rostak-22.webp',
    stockStatus: 'Sofort ab Lager Seesen',
    deliveryWeeks: '3-5 Werktage per Spedition',
    sku: 'RAL-KIT-CARPORT-DBL-16P',
    features: [
      '16x 470W Bifaziale Glas-Glas TOPCon PV-Module (+25% Albedo-Mehrertrag)',
      'T6 eloxierte Aluminium-Trägerprofile inkl. integrierter EPDM-Entwässerung',
      'Kompletter Montagesatz: Edelstahl-Klemmen, Schrauben & Dichtungen',
      'Statische Typenberechnung & Prüfzertifikat nach DIN EN 1991 inklusive',
      'Vorbereitete Kabelführung für Wallbox & Wechselrichter'
    ],
    configMapping: {
      category: 'double',
      spots: 2,
      material: 'aluminum',
      postColor: 'anthracite',
      moduleType: 'dark',
      wallbox: false,
      wallboxType: 'standard',
      battery: false,
      batterySize: '15',
      ledLighting: true,
      assemblyService: false,
    }
  },
  {
    id: 'einzelcarport-compact',
    category: 'carport',
    title: 'Einzel-Solarcarport Bausatz Compact',
    subtitle: 'Kompakte Überdachung für 1 Fahrzeug mit 8 bifazialen PV-Modulen',
    capacityKwp: 3.76,
    moduleCount: 8,
    moduleType: '470W Bifacial N-Type TOPCon Dual-Glass',
    profileType: 'Aluminium T6 Eloxiert (Anthrazit RAL 7016)',
    snowLoad: '2.5 kN/m² (DIN EN 1991)',
    priceNetto: 2900,
    vatRate: 0,
    image: '/media/img-3303-f.webp',
    stockStatus: 'Sofort ab Lager Seesen',
    deliveryWeeks: '3-5 Werktage per Spedition',
    sku: 'RAL-KIT-CARPORT-SGL-8P',
    features: [
      '8x 470W Bifaziale Glas-Glas TOPCon PV-Module',
      'Schlankes T6 Aluminium-Tragwerk (korrosionsbeständig)',
      'Integrierte Regenrinne und Fallrohranbindung',
      'Statische Berechnung nach DIN EN 1991 inklusive',
      '0% Mehrwertsteuer gem. § 12 Abs. 3 UStG'
    ],
    configMapping: {
      category: 'single',
      spots: 1,
      material: 'aluminum',
      postColor: 'anthracite',
      moduleType: 'dark',
      wallbox: false,
      wallboxType: 'standard',
      battery: false,
      batterySize: '15',
      ledLighting: false,
      assemblyService: false,
    }
  },
  {
    id: 'terrasse-elegance',
    category: 'terrace',
    title: 'PV-Terrassenüberdachung Elegance',
    subtitle: 'Wohnraum-Erweiterung mit 20% lichtdurchlässigen Glas-Glas Modulen',
    capacityKwp: 4.50,
    moduleCount: 10,
    moduleType: '450W Transluzent 20% Lichtdurchlässig',
    profileType: 'Aluminium T6 Wandanschluss / Freistehend',
    snowLoad: '2.5 kN/m² (DIN EN 1991)',
    priceNetto: 4400,
    vatRate: 0,
    image: '/media/6x2-aufdach-terrasse-anton1.webp',
    stockStatus: 'Sofort ab Lager Seesen',
    deliveryWeeks: '5-7 Werktage',
    sku: 'RAL-KIT-TERRACE-10P-TRN',
    features: [
      '10x 450W transluzente Glas-Glas PV-Module (angenehmer Lichteinfall)',
      'Geprüfte Überkopfverglasung mit Sicherheitsglas (ESG/VSG)',
      'Wandanschlussprofil mit integrierter EPDM-Kompriband-Dichtung',
      'Verdeckte Kabelführung im Trägerprofil',
      'Wasserdichtes Schienensystem mit integriertem Gefälle'
    ],
    configMapping: {
      category: 'terrace',
      spots: 1,
      material: 'aluminum',
      postColor: 'anthracite',
      moduleType: 'translucent',
      wallbox: false,
      wallboxType: 'standard',
      battery: false,
      batterySize: '15',
      ledLighting: true,
      assemblyService: false,
    }
  },
  {
    id: 'solarzaun-bifacial',
    category: 'fence',
    title: 'Bifazialer Solarzaun Bausatz (4 Felder)',
    subtitle: 'Vertikale Grundstückseinfriedung mit beidseitiger Stromerzeugung',
    capacityKwp: 4.00,
    moduleCount: 8,
    moduleType: '470W Vertikal Bifacial Dual-Glass',
    profileType: 'Alu-Stahl Pfosten zum Einbetonieren',
    snowLoad: 'Windlastzone 2-4 zertifiziert',
    priceNetto: 3200,
    vatRate: 0,
    image: '/media/dji-0111.webp',
    stockStatus: 'Sofort ab Lager Seesen',
    deliveryWeeks: '3-5 Werktage',
    sku: 'RAL-KIT-FENCE-8P-VERT',
    features: [
      '8x 470W Vertikal-Module für Ost-West Morgen- & Abendsonne',
      'Schmale Stellfläche — keine Flächenversiegelung',
      'Hochstabile Pfostenkonstruktion mit Erdstück zum Einbetonieren',
      'Perfekt als Grundstücksgrenze und Sichtschutz',
      '0% MwSt steuerbefreit'
    ],
    configMapping: {
      category: 'fence',
      spots: 1,
      material: 'aluminum',
      postColor: 'anthracite',
      moduleType: 'dark',
      wallbox: false,
      wallboxType: 'standard',
      battery: false,
      batterySize: '15',
      ledLighting: false,
      assemblyService: false,
    }
  },
  {
    id: 'commercial-fleet-modular',
    category: 'carport',
    title: 'Gewerbe-Flottenüberdachung Modular (10 Stellplätze)',
    subtitle: 'Großflächen-Carport für Mitarbeiterparkplätze & Solarpflicht BW/NRW',
    capacityKwp: 38.00,
    moduleCount: 80,
    moduleType: '470W N-Type TOPCon Dual-Glass',
    profileType: 'Feuerverzinkter Stahl / Alu T6 Hybrid',
    snowLoad: '2.5 kN/m² (DIN EN 1991)',
    priceNetto: 26500,
    vatRate: 0,
    image: '/images/commercial_fleet_solar.jpg',
    stockStatus: 'Modulare Fertigung & Lagerabruf',
    deliveryWeeks: '2-3 Wochen Projektlieferung',
    sku: 'RAL-KIT-COMMERCIAL-10SP',
    features: [
      '80x 470W N-Type TOPCon Glas-Glas Hochleistungsmodule',
      'Modulares Stützraster für barrierefreies Einparken',
      'Erfüllt die gesetzliche Solarpflicht für Großparkplätze in DE',
      'Ausgelegt für Mehrpunkt-Ladestationen (Wallbox-Trassenführung)',
      'Lieferung inkl. aller statischen Nachweise und Fundamentpläne'
    ],
    configMapping: {
      category: 'commercial',
      spots: 10,
      material: 'steel',
      postColor: 'anthracite',
      moduleType: 'dark',
      wallbox: true,
      wallboxType: 'v2x',
      battery: false,
      batterySize: '15',
      ledLighting: true,
      assemblyService: true,
    }
  },
  {
    id: 'v2x-wallbox-hub',
    category: 'component',
    title: 'Bidirektionale V2X Wallbox (22kW Hub)',
    subtitle: 'Vehicle-to-Grid & Vehicle-to-Home intelligenter Ladeanschluss',
    capacityKwp: 0,
    moduleCount: 0,
    moduleType: 'ISO 15118 / OCPP 2.0.1 Protokoll',
    profileType: 'Integrierte Carport-Pfostenaufnahme',
    snowLoad: 'IP65 Wetterschutz',
    priceNetto: 1490,
    vatRate: 0,
    image: '/media/effizienz-w.webp',
    stockStatus: 'Auf Lager (95 Einheiten)',
    deliveryWeeks: '1-2 Werktage',
    sku: 'EV-WB-V2X-22KW',
    features: [
      '22kW Ladeleistung mit automatischer Phasenanpassung',
      'Bidirektionales Laden (Nutzt Fahrzeugbatterie als Heimspeicher)',
      'RFID Authentifizierung & App-Steuerung per WLAN/4G',
      'Passgenaue Halterung für RIAL Energy Aluminiumpfosten',
      'MID-zertifizierter Stromzähler für Firmenwagen-Abrechnung'
    ],
    configMapping: {
      category: 'double',
      spots: 2,
      material: 'aluminum',
      postColor: 'anthracite',
      moduleType: 'dark',
      wallbox: true,
      wallboxType: 'v2x',
      battery: false,
      batterySize: '15',
      ledLighting: false,
      assemblyService: false,
    }
  }
];

export const SolarShop: React.FC<SolarShopProps> = ({ onOpenERP, onOpenLeadModal }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'carport' | 'terrace' | 'fence' | 'component'>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<ShopProduct | null>(null);

  const filteredProducts = selectedFilter === 'all' 
    ? shopProducts 
    : shopProducts.filter(p => p.category === selectedFilter);

  return (
    <section id="shop" className="py-24 sm:py-32 bg-[#040711] border-b border-white/10 font-['Poppins'] relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-shell relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full liquid-glass-gold text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>E-Shop & Bausatz-Zentrallager Seesen</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-['Playfair_Display']">
              Komplettbausätze & <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Systemhardware.</span>
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Direkt ab RIAL Energy Lager Seesen (Harz). Vollständige Photovoltaik-Überdachungssets inkl. Modulen, T6 Aluminiumtragwerk, Dichtungen, Statikzertifikat und <strong>0% MwSt (§ 12 Abs. 3 UStG)</strong>.
            </p>
          </div>

          {/* ERP Stock Button */}
          {onOpenERP && (
            <button
              onClick={onOpenERP}
              className="touch-target px-5 py-3 rounded-full liquid-glass-cyan text-cyan-300 hover:text-cyan-200 text-xs font-semibold flex items-center space-x-2 self-start md:self-auto cursor-pointer transition-all shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Live ERP Lagerbestand einsehen →</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 pb-2">
          {[
            { id: 'all', label: 'Alle Bausätze & Hardware' },
            { id: 'carport', label: 'Solarcarports' },
            { id: 'terrace', label: 'PV-Terrassendächer' },
            { id: 'fence', label: 'Solarzäune' },
            { id: 'component', label: 'Wallboxen & Technik' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-gold-subtle'
                  : 'liquid-glass text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="liquid-glass rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:scale-[1.01] hover:border-amber-400/40"
            >
              {/* Product Image Box */}
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-transparent to-transparent" />
                
                {/* SKU & Capacity Tag */}
                <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-slate-300">
                  {product.sku}
                </div>
                
                {product.capacityKwp > 0 && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold px-3.5 py-1 rounded-full text-xs shadow-md">
                    {product.capacityKwp} kWp
                  </div>
                )}

                {/* Stock Indicator */}
                <div className="absolute bottom-3 left-4 flex items-center space-x-1.5 text-xs text-emerald-400 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{product.stockStatus}</span>
                </div>
              </div>

              {/* Product Details Content */}
              <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-['Playfair_Display'] group-hover:text-amber-300 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Technical Specs Pills */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-300 pt-2 border-t border-white/5">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[9.5px]">SCHNEELAST</span>
                    <strong className="text-white text-xs">{product.snowLoad}</strong>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[9.5px]">LIEFERZEIT</span>
                    <strong className="text-cyan-300 text-xs">{product.deliveryWeeks}</strong>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Price and CTA Actions */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">FESTPREIS AB WERK</span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Poppins']">
                        €{product.priceNetto.toLocaleString()}
                        <span className="text-xs text-emerald-400 font-semibold ml-2">0% MwSt (§12 UStG)</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="py-3 px-3 rounded-xl liquid-glass text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>Details & Stückliste</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onOpenLeadModal) {
                          onOpenLeadModal(product.configMapping);
                        } else {
                          document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="py-3 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-slate-950 text-xs font-bold shadow-gold-subtle transition-all flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Angebot anfragen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Product Detail & BOM Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#090e1a] border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold">{activeModalProduct.sku}</span>
                <h3 className="text-2xl font-bold text-white font-['Playfair_Display'] mt-1">{activeModalProduct.title}</h3>
                <p className="text-xs text-slate-300 font-light mt-0.5">{activeModalProduct.subtitle}</p>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="p-2 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Price & Statik Badge */}
            <div className="p-4 rounded-2xl liquid-glass-gold flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-300">Lieferpreis ab Lager Seesen:</span>
                <div className="text-3xl font-black text-amber-400 font-['Poppins']">€{activeModalProduct.priceNetto.toLocaleString()}</div>
                <span className="text-xs text-emerald-400 font-medium">0% MwSt (§ 12 Abs. 3 UStG befreit)</span>
              </div>
              <div className="text-right text-xs text-slate-300">
                <div className="text-white font-bold">{activeModalProduct.snowLoad}</div>
                <div className="text-slate-400">{activeModalProduct.profileType}</div>
              </div>
            </div>

            {/* Complete Included Scope */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">Lieferumfang des Bausatzes:</h4>
              <div className="space-y-2 text-xs text-slate-200">
                {activeModalProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-950/80 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons in Modal */}
            <div className="flex gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveModalProduct(null)}
                className="w-1/2 py-3.5 rounded-xl liquid-glass text-slate-300 font-semibold text-xs cursor-pointer"
              >
                Schließen
              </button>
              <button
                onClick={() => {
                  const product = activeModalProduct;
                  setActiveModalProduct(null);
                  if (onOpenLeadModal) {
                    onOpenLeadModal(product.configMapping);
                  } else {
                    document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-1/2 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-gold-subtle cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <span>Bausatz anfragen & reservieren</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
