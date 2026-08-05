'use client';

import React from 'react';

export interface ConfiguratorState {
  category: 'single' | 'double' | 'commercial' | 'terrace' | 'fence';
  spots: number;
  material: 'aluminum' | 'steel';
  postColor: 'anthracite' | 'silver' | 'black';
  moduleType: 'dark' | 'translucent';
  wallbox: boolean;
  wallboxType: 'standard' | 'v2x';
  battery: boolean;
  batterySize: '10' | '15' | '30' | '100';
  ledLighting: boolean;
  assemblyService: boolean;
}

interface Interactive2DRendererProps {
  config: ConfiguratorState;
}

export const Interactive2DRenderer: React.FC<Interactive2DRendererProps> = ({ config }) => {
  // Post color mapping
  const postColorHex = {
    anthracite: '#334155', // RAL 7016
    silver: '#94A3B8',     // Anodized Silver
    black: '#1E293B',      // RAL 9005
  }[config.postColor];

  const glassOpacity = config.moduleType === 'translucent' ? 0.65 : 0.95;
  const isDouble = config.category === 'double' || config.spots > 1;
  const isCommercial = config.category === 'commercial';
  const width = isCommercial ? 700 : isDouble ? 520 : 360;
  const height = 300;

  return (
    <div className="w-full bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-inner relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
      
      {/* Background blueprint grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Blueprint Header Tag */}
      <div className="absolute top-3 left-3 flex items-center space-x-2 text-[10px] font-mono text-slate-400 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800">
        <span className="w-2 h-2 rounded-full bg-solar-500 animate-pulse" />
        <span className="uppercase font-bold tracking-wider">Live Architectural CAD Preview</span>
      </div>

      {/* SVG Canvas */}
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full max-w-[550px] h-auto drop-shadow-2xl transition-all duration-500"
      >
        <defs>
          <linearGradient id="solarGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity={glassOpacity} />
            <stop offset="50%" stopColor="#0f172a" stopOpacity={glassOpacity} />
            <stop offset="100%" stopColor="#0284c7" stopOpacity={glassOpacity * 0.8} />
          </linearGradient>

          <linearGradient id="solarCellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.4" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ground Line */}
        <line x1="20" y1="260" x2={width - 20} y2="260" stroke="#475569" strokeWidth="3" strokeDasharray="6 4" />
        <text x="30" y="278" fill="#64748B" fontSize="10" fontFamily="monospace">GROUND LEVEL 0.00m</text>

        {/* Structural Support Posts */}
        <rect x="60" y="110" width="22" height="150" fill={postColorHex} rx="3" stroke="#0F172A" strokeWidth="1.5" />
        {isDouble && (
          <rect x={width - 82} y="110" width="22" height="150" fill={postColorHex} rx="3" stroke="#0F172A" strokeWidth="1.5" />
        )}
        {isCommercial && (
          <rect x={width / 2 - 11} y="110" width="22" height="150" fill={postColorHex} rx="3" stroke="#0F172A" strokeWidth="1.5" />
        )}

        {/* Structural Cantilever Beam */}
        <polygon 
          points={`40,110 ${width - 40},70 ${width - 40},88 40,128`} 
          fill={postColorHex} 
          stroke="#0F172A" 
          strokeWidth="1.5" 
        />

        {/* PV Glass-Glass Canopy Plane */}
        <polygon 
          points={`30,105 ${width - 30},65 ${width - 25},78 35,118`} 
          fill="url(#solarGlassGrad)" 
          stroke="#F59E0B" 
          strokeWidth="2" 
        />

        {/* Solar Cell Grid Lines */}
        <line x1="90" y1="97" x2="90" y2="110" stroke="#F59E0B" strokeWidth="1" />
        <line x1="160" y1="87" x2="160" y2="100" stroke="#F59E0B" strokeWidth="1" />
        <line x1="230" y1="77" x2="230" y2="90" stroke="#F59E0B" strokeWidth="1" />
        <line x1="300" y1="67" x2="300" y2="80" stroke="#F59E0B" strokeWidth="1" />
        {width > 400 && (
          <>
            <line x1="370" y1="57" x2="370" y2="70" stroke="#F59E0B" strokeWidth="1" />
            <line x1="440" y1="47" x2="440" y2="60" stroke="#F59E0B" strokeWidth="1" />
          </>
        )}

        {/* LED Ambient Lighting Strip */}
        {config.ledLighting && (
          <line x1="45" y1="125" x2={width - 45} y2="85" stroke="#38BDF8" strokeWidth="4" filter="url(#glow)" />
        )}

        {/* Integrated Rain Gutter */}
        <circle cx="35" cy="118" r="6" fill="#06B6D4" />

        {/* Wallbox EV Charger Option */}
        {config.wallbox && (
          <g transform="translate(64, 160)">
            <rect x="0" y="0" width="14" height="26" fill="#0284C7" rx="3" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="7" cy="8" r="3" fill="#38BDF8" />
            {config.wallboxType === 'v2x' && (
              <text x="-4" y="38" fill="#06B6D4" fontSize="8" fontFamily="monospace" fontWeight="bold">V2X 22kW</text>
            )}
          </g>
        )}

        {/* Battery Storage Unit Option */}
        {config.battery && (
          <g transform={`translate(${width - 70}, 180)`}>
            <rect x="0" y="0" width="30" height="48" fill="#10B981" rx="4" stroke="#FFFFFF" strokeWidth="1" />
            <text x="5" y="28" fill="#090D16" fontSize="10" fontFamily="monospace" fontWeight="bold">{config.batterySize}k</text>
            <text x="3" y="60" fill="#10B981" fontSize="8" fontFamily="monospace">LFP BAT</text>
          </g>
        )}

        {/* Dimension Annotations */}
        <line x1="30" y1="40" x2={width - 30} y2="40" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
        <text x={width / 2} y="34" fill="#CBD5E1" fontSize="10" fontFamily="monospace" textAnchor="middle">
          CANOPY WIDTH: {isCommercial ? '12.50m' : isDouble ? '6.20m' : '3.60m'}
        </text>

        <line x1="15" y1="70" x2="15" y2="260" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
        <text x="10" y="170" fill="#CBD5E1" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 10 170)">
          CLEARANCE: 2.85m
        </text>
      </svg>

      {/* Dynamic Spec Footer Tag */}
      <div className="w-full flex flex-wrap justify-between items-center text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-800/80 mt-2">
        <span className="text-solar-400 font-bold uppercase">
          {config.category.toUpperCase()} • {config.material.toUpperCase()} PROFILE
        </span>
        <span className="text-electric-400">
          SNOW LOAD: 2.5 kN/m² (DIN EN 1991)
        </span>
      </div>

    </div>
  );
};
