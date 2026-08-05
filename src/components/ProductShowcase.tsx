'use client';

import React from 'react';
import { Car, Building2, Home, Shield, ArrowRight, Zap, Cpu, CheckCircle } from 'lucide-react';

interface ProductShowcaseProps {
  onSelectCategory: (category: 'single' | 'double' | 'commercial' | 'terrace' | 'fence') => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onSelectCategory }) => {
  const products = [
    {
      id: 'single',
      name: 'Single Solar Carport',
      tag: 'Residential / Compact',
      capacity: '3.8 kWp',
      spots: '1 Vehicle Spot',
      profiles: 'Extruded Aluminum RAL-ALU-POST-2800',
      modules: '8x 470W Bifacial Glass-Glass',
      icon: Car,
      color: 'border-solar-500/30 hover:border-solar-500',
      badgeBg: 'bg-solar-500/10 text-solar-400',
    },
    {
      id: 'double',
      name: 'Double Solar Carport',
      tag: 'Best Seller • 2 Cars',
      capacity: '7.6 kWp',
      spots: '2 Vehicle Spots',
      profiles: 'Heavy Dual-Post RAL-ALU-POST-3400',
      modules: '16x 470W Bifacial Glass-Glass',
      icon: Car,
      color: 'border-solar-500/60 shadow-solar-glow',
      badgeBg: 'bg-solar-500 text-slate-950 font-bold',
      popular: true,
    },
    {
      id: 'commercial',
      name: 'Commercial Parking Fleet',
      tag: 'Solarpflicht Certified',
      capacity: '25 kWp - 500+ kWp',
      spots: '5 to 100+ Vehicle Spots',
      profiles: 'Galvanized Steel Subframe & Modular Aluminum Purlins',
      modules: 'Bifacial Industrial 500W TOPCon',
      icon: Building2,
      color: 'border-electric-500/40 hover:border-electric-400',
      badgeBg: 'bg-electric-500/10 text-electric-400',
    },
    {
      id: 'terrace',
      name: 'Solar Patio & Terrace Canopy',
      tag: 'Translucent Shading',
      capacity: '4.5 kWp - 12.0 kWp',
      spots: 'Patio & Outdoor Living',
      profiles: 'Slim-Line Anodized Architectural Profile',
      modules: '20% Light-Permeable Glass-Glass PV',
      icon: Home,
      color: 'border-emerald-500/30 hover:border-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      id: 'fence',
      name: 'Bifacial Solar Fence System',
      tag: 'Boundary Power',
      capacity: '3.0 kWp - 15.0 kWp',
      spots: 'Vertical Ground Boundary',
      profiles: 'Heavy Post Ground Anchor Set',
      modules: 'Dual-Sided Vertical Solar Panels',
      icon: Shield,
      color: 'border-purple-500/30 hover:border-purple-400',
      badgeBg: 'bg-purple-500/10 text-purple-400',
    },
  ];

  return (
    <section id="products" className="py-20 px-4 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-solar-500/10 border border-solar-500/30 text-solar-400 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Modular Modular German Systems</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            Engineered Product Lines for <span className="text-transparent bg-clip-text bg-solar-gradient">Every Requirement</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            All systems are supplied as complete modular bill-of-materials packages—including extruded aluminum profiles, bifacial glass-glass modules, hybrid inverter, and stainless steel assembly hardware.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => {
            const IconComponent = prod.icon;
            return (
              <div 
                key={prod.id}
                className={`glass-panel rounded-3xl p-6 sm:p-8 border ${prod.color} transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative group`}
              >
                {prod.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-solar-gradient text-slate-950 font-extrabold text-[11px] uppercase tracking-widest shadow-md">
                    ★ Most Requested Package
                  </div>
                )}

                <div className="space-y-6">
                  {/* Top Header */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-solar-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${prod.badgeBg}`}>
                      {prod.tag}
                    </span>
                  </div>

                  {/* Title & Capacity */}
                  <div>
                    <h3 className="text-xl font-bold text-white font-['Outfit']">{prod.name}</h3>
                    <div className="text-2xl font-black text-solar-400 font-mono mt-1">{prod.capacity}</div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs text-slate-300 font-mono">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-solar-500 flex-shrink-0" />
                      <span>{prod.spots}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-solar-500 flex-shrink-0" />
                      <span className="truncate">{prod.profiles}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-solar-500 flex-shrink-0" />
                      <span className="truncate">{prod.modules}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6 mt-6 border-t border-slate-800">
                  <button
                    onClick={() => onSelectCategory(prod.id as any)}
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-solar-500 hover:text-slate-950 border border-slate-700 hover:border-solar-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <span>Configure {prod.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
