'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProductShowcaseV2Props {
  lang: 'de' | 'en';
}

export const ProductShowcaseV2: React.FC<ProductShowcaseV2Props> = ({ lang }) => {
  const content = {
    de: {
      tag: 'Solar Infrastructure Portfolio',
      headline: 'Architectural Overhang Systems',
      subtext: 'Engineered for seamless integration into residential driveways, corporate fleet parking lots, and outdoor patio spaces.',
      ctaConfig: 'Configure Specification',
      products: [
        {
          id: 'double',
          name: 'Double Solar Carport System',
          capacity: '7.5 - 9.4 kWp',
          image: '/images/hero_solar_carport.jpg',
          desc: 'Dual vehicle overhang with integrated EV charging channels and extruded aluminum subframe.',
          specs: ['2 Vehicle Spaces', '16x Bifacial TOPCon PV Modules', 'Integrated Rain Gutter & Drainage', 'DIN EN 1991 Certified']
        },
        {
          id: 'single',
          name: 'Single Solar Carport System',
          capacity: '3.8 - 4.7 kWp',
          image: '/images/hero_solar_carport.jpg',
          desc: 'Compact single vehicle carport for residential driveways and private EV charging.',
          specs: ['1 Vehicle Space', '8x Bifacial Glass Modules', 'Rust-Proof Aluminum Profiles', '0% MwSt Tax Exemption']
        },
        {
          id: 'commercial',
          name: 'Commercial Fleet Canopy Lot',
          capacity: '25 kWp - 1.5 MWp',
          image: '/images/commercial_fleet_solar.jpg',
          desc: 'Industrial-grade modular parking canopy for corporate parking lots meeting Solarpflicht laws.',
          specs: ['5 to 100+ Parking Spaces', 'V2X Bidirectional Fleet Chargers', 'Steel/Aluminum Industrial Span', 'Full Municipal Statics']
        },
        {
          id: 'terrace',
          name: 'Solar Patio Terrace Canopy',
          capacity: '4.5 - 6.0 kWp',
          image: '/images/patio_solar_canopy.jpg',
          desc: 'Outdoor living canopy with semi-transparent glass modules permitting soft natural daylight.',
          specs: ['20% Translucent PV Glass', 'Architectural Anodized Finish', 'Integrated Dimmable LED Strips', 'Waterproof EPDM Gaskets']
        },
        {
          id: 'fence',
          name: 'Bifacial Vertical Solar Fence',
          capacity: '4.0 - 15.0 kWp',
          image: '/images/bifacial_solar_fence.jpg',
          desc: 'Vertical boundary fence capturing morning and evening sun at maximum incidence angles.',
          specs: ['Dual-Sided Sun Absorption', 'Zero Footprint Perimeter Asset', 'Wind & Noise Mitigation Shield', 'Ground-Screw Anchoring']
        }
      ]
    },
    en: {
      tag: 'Solar Infrastructure Portfolio',
      headline: 'Architectural Overhang Systems',
      subtext: 'Engineered for seamless integration into residential driveways, corporate fleet parking lots, and outdoor patio spaces.',
      ctaConfig: 'Configure Specification',
      products: [
        {
          id: 'double',
          name: 'Double Solar Carport System',
          capacity: '7.5 - 9.4 kWp',
          image: '/images/hero_solar_carport.jpg',
          desc: 'Dual vehicle overhang with integrated EV charging channels and extruded aluminum subframe.',
          specs: ['2 Vehicle Spaces', '16x Bifacial TOPCon PV Modules', 'Integrated Rain Gutter & Drainage', 'DIN EN 1991 Certified']
        },
        {
          id: 'single',
          name: 'Single Solar Carport System',
          capacity: '3.8 - 4.7 kWp',
          image: '/images/hero_solar_carport.jpg',
          desc: 'Compact single vehicle carport for residential driveways and private EV charging.',
          specs: ['1 Vehicle Space', '8x Bifacial Glass Modules', 'Rust-Proof Aluminum Profiles', '0% VAT Tax Exemption']
        },
        {
          id: 'commercial',
          name: 'Commercial Fleet Canopy Lot',
          capacity: '25 kWp - 1.5 MWp',
          image: '/images/commercial_fleet_solar.jpg',
          desc: 'Industrial-grade modular parking canopy for corporate parking lots meeting Solarpflicht mandates.',
          specs: ['5 to 100+ Parking Spaces', 'V2X Bidirectional Fleet Chargers', 'Steel/Aluminum Industrial Span', 'Full Municipal Statics']
        },
        {
          id: 'terrace',
          name: 'Solar Patio Terrace Canopy',
          capacity: '4.5 - 6.0 kWp',
          image: '/images/patio_solar_canopy.jpg',
          desc: 'Outdoor living canopy with semi-transparent glass modules permitting soft natural daylight.',
          specs: ['20% Translucent PV Glass', 'Architectural Anodized Finish', 'Integrated Dimmable LED Strips', 'Waterproof EPDM Gaskets']
        },
        {
          id: 'fence',
          name: 'Bifacial Vertical Solar Fence',
          capacity: '4.0 - 15.0 kWp',
          image: '/images/bifacial_solar_fence.jpg',
          desc: 'Vertical boundary fence capturing morning and evening sun at maximum incidence angles.',
          specs: ['Dual-Sided Sun Absorption', 'Zero Footprint Perimeter Asset', 'Wind & Noise Mitigation Shield', 'Ground-Screw Anchoring']
        }
      ]
    }
  }[lang];

  return (
    <section id="v2-products" className="py-28 px-4 sm:px-8 lg:px-12 bg-[#030712] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-medium tracking-wide">
            <span>{content.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Syne']">
            {content.headline}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            {content.subtext}
          </p>
        </div>

        {/* Product Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.products.map((product) => (
            <div 
              key={product.id}
              className="glow-card-amber rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] group"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-slate-950/90 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs font-medium text-amber-300">
                  {product.capacity}
                </div>
              </div>

              {/* Product Body */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white font-['Syne'] group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                {/* Specs List */}
                <div className="space-y-2.5 text-xs text-slate-200 pt-3 border-t border-slate-800">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#v2-configurator"
                  className="w-full mt-4 py-3.5 rounded-2xl bg-slate-900 hover:bg-amber-400 text-slate-200 hover:text-slate-950 font-bold text-xs border border-slate-800 hover:border-amber-300 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>{content.ctaConfig}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
