'use client';

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Code2, Check, Copy, Laptop, Smartphone, Tablet, 
  ArrowRight, Shield, Zap, Database, CheckCircle2, ChevronRight,
  Sun, ExternalLink, Settings2, Sliders, Layers, FileSpreadsheet,
  Building2, Users, Flame, Award, HelpCircle, Server, Terminal, ShieldCheck
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StandaloneConfigurator } from '@/components/embed/StandaloneConfigurator';
import { TenantConfig } from '@/types/tenant';
import { MOCK_TENANTS } from '@/data/mockTenants';

const PRESET_COLORS = [
  { name: 'Solar Gold', hex: '#F59E0B' },
  { name: 'Emerald Tech', hex: '#10B981' },
  { name: 'Alpine Blue', hex: '#3B82F6' },
  { name: 'Crimson Power', hex: '#EF4444' },
  { name: 'Obsidian Violet', hex: '#8B5CF6' },
];

export default function PartnerWidgetPage() {
  // Playground Customizer State
  const [selectedTenantKey, setSelectedTenantKey] = useState<string>('solartechnik-nord');
  const [companyName, setCompanyName] = useState<string>('SolarTechnik Nord GmbH');
  const [city, setCity] = useState<string>('Hamburg');
  const [primaryColor, setPrimaryColor] = useState<string>('#10B981');
  const [markupPercent, setMarkupPercent] = useState<number>(18);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeCodeTab, setActiveCodeTab] = useState<'embed' | 'vercel' | 'react' | 'static'>('embed');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [pricingCycle, setPricingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Load preset
  const handleSelectPreset = (key: string) => {
    setSelectedTenantKey(key);
    const tenant = MOCK_TENANTS[key];
    if (tenant) {
      setCompanyName(tenant.branding.companyName);
      setCity(tenant.branding.city || '');
      setPrimaryColor(tenant.branding.primaryColor);
      setMarkupPercent(Math.round((tenant.pricingMarkupMultiplier - 1) * 100));
    }
  };

  // Live Tenant Configuration for the Sandbox Configurator
  const liveTenant: TenantConfig = useMemo(() => {
    return {
      id: selectedTenantKey,
      branding: {
        companyName,
        city,
        primaryColor,
        tagline: `Zertifizierter Solarcarport-Fachpartner für ${city || 'Ihre Region'}`,
        email: `anfrage@${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.de`,
        phone: '+49 40 8972 100',
      },
      pricingMarkupMultiplier: 1 + markupPercent / 100,
      customLaborRatePerSpot: 750,
      enableV2XOption: true,
      enableCommercialOption: true,
      enableLiveERPInspection: true,
      rialPartnerTier: 'pro',
      rialWholesaleAccountNo: 'RIAL-PARTNER-DEMO',
    };
  }, [selectedTenantKey, companyName, city, primaryColor, markupPercent]);

  // Code Snippets
  const htmlSnippet = `<div id="solarcarport-widget" 
     data-tenant="${selectedTenantKey}" 
     data-company-name="${companyName}" 
     data-primary-color="${primaryColor}" 
     data-theme="dark">
</div>
<script src="https://solarcarport.tech/v1/widget.js" async></script>`;

  const vercelDeployUrl = `https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffrankxai%2Fsolarcarport.tech&env=NEXT_PUBLIC_COMPANY_NAME,NEXT_PUBLIC_PRIMARY_COLOR,NEXT_PUBLIC_CONTACT_EMAIL,NEXT_PUBLIC_RIAL_PARTNER_ID&envDescription=Tragen%20Sie%20Ihre%20Firmendaten%20ein,%20um%20den%20Solarcarport-Konfigurator%20auf%20Ihrer%20eigenen%20Domain%20zu%20starten.&project-name=solar-carport-konfigurator&repository-name=solar-carport-konfigurator`;

  const vercelEnvSnippet = `# In Vercel Environment Variables:
NEXT_PUBLIC_COMPANY_NAME="${companyName}"
NEXT_PUBLIC_PRIMARY_COLOR="${primaryColor}"
NEXT_PUBLIC_CONTACT_EMAIL="anfrage@${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.de"
NEXT_PUBLIC_RIAL_PARTNER_ID="RIAL-${city ? city.toUpperCase().slice(0, 2) : 'DE'}-9400"`;

  const reactSnippet = `import { SolarCarportEmbed } from '@solarcarport/embed';

export default function SolarCarportPage() {
  return (
    <SolarCarportEmbed 
      tenantId="${selectedTenantKey}"
      companyName="${companyName}"
      customColor="${primaryColor}"
      theme="dark"
    />
  );
}`;

  const staticHtmlSnippet = `<!-- Standalone Zero-Server HTML (Upload via FTP to your web server) -->
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>${companyName} | Solarcarport Konfigurator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; background:#071019;">
  <div id="solarcarport-widget" data-tenant="${selectedTenantKey}" data-company-name="${companyName}" data-primary-color="${primaryColor}"></div>
  <script src="https://solarcarport.tech/v1/widget.js" async></script>
</body>
</html>`;

  const directUrl = `https://solarcarport.tech/embed/${selectedTenantKey}?color=${encodeURIComponent(primaryColor)}&companyName=${encodeURIComponent(companyName)}`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      
      {/* Navigation Header */}
      <Header onOpenConfigurator={() => window.location.href = '/#configurator'} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-emerald-500/15 via-amber-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tier 2: White-Label Configurator & Sovereign Vercel Suite</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">
            Verwandeln Sie Ihre Website in eine <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">qualifizierte Lead-Maschine</span>.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Wählen Sie Ihre bevorzugte Bereitstellung: <strong>1-Zeile Embed-Code</strong> für WordPress/Wix, <strong>1-Klick Vercel Deploy</strong> für 100% Datensouveränität oder als <strong>React Component</strong>. Inklusive automatischer <strong>RIAL Energy Werks-Stückliste (BOM)</strong>.
          </p>

          {/* Quick Metrics Cluster */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="text-2xl font-bold font-mono text-emerald-400">1-Klick</div>
              <div className="text-xs text-slate-400 mt-0.5">Vercel Deploy / Embed</div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="text-2xl font-bold font-mono text-amber-400">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">Souverän & Whitelabel</div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="text-2xl font-bold font-mono text-cyan-400">0 Support</div>
              <div className="text-xs text-slate-400 mt-0.5">Hermetische Fallbacks</div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="text-2xl font-bold font-mono text-white">ab €49</div>
              <div className="text-xs text-slate-400 mt-0.5">Oder €390 Lifetime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Studio Sandbox Section */}
      <section id="playground" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center space-x-1.5">
              <Settings2 className="w-4 h-4" />
              <span>LIVE WIDGET STUDIO & SANDBOX</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Passen Sie das Widget in Echtzeit an Ihre Marke an
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ändern Sie Unternehmensdaten, Akzentfarben und Margen – die Vorschau aktualisiert sich sofort.
            </p>
          </div>

          {/* Controls Cluster: System Diagnostics & Viewports */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/system-check"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>System-Check (/system-check)</span>
            </a>

            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewport('desktop')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewport === 'desktop' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewport === 'tablet' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewport === 'mobile' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobil</span>
              </button>
            </div>
          </div>
        </div>

        {/* Studio Grid: Controls (Left) & Live Simulator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Customizer Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Presets */}
            <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-5 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Beispiel-Partner Vorlagen
              </label>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(MOCK_TENANTS).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => handleSelectPreset(key)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedTenantKey === key 
                        ? 'bg-slate-800 border-white/40 shadow-sm' 
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div 
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: t.branding.primaryColor }}
                      />
                      <div>
                        <div className="font-bold text-white">{t.branding.companyName}</div>
                        <div className="text-[10px] text-slate-400">{t.branding.city || 'Deutschland'}</div>
                      </div>
                    </div>
                    {selectedTenantKey === key && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Customization Form */}
            <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-5 space-y-4 text-xs">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Individuelle Markenkonfiguration
              </label>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Firmenname</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Standort / Region</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Color Presets & Custom Hex */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Primäre Akzentfarbe</label>
                <div className="flex items-center space-x-2 mb-2">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setPrimaryColor(c.hex)}
                      title={c.name}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        primaryColor.toLowerCase() === c.hex.toLowerCase() 
                          ? 'border-white scale-110 shadow-md' 
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  placeholder="#10B981"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Markup Margin Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-300 font-semibold">Ihre Händlermarge (Aufschlag):</label>
                  <span className="font-mono font-bold text-emerald-400">+{markupPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={markupPercent}
                  onChange={(e) => setMarkupPercent(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Berechnet automatisch Ihren Endkundenpreis über RIAL Energy Werks-Basis.
                </p>
              </div>
            </div>

            {/* Sovereign Multi-Track Code Exporter */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
              
              {/* Tab Selector */}
              <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-[11px] font-semibold">
                <button
                  onClick={() => setActiveCodeTab('embed')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    activeCodeTab === 'embed' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1-Zeilen Embed
                </button>
                <button
                  onClick={() => setActiveCodeTab('vercel')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    activeCodeTab === 'vercel' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Deploy to Vercel
                </button>
                <button
                  onClick={() => setActiveCodeTab('react')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    activeCodeTab === 'react' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  React / Next.js
                </button>
                <button
                  onClick={() => setActiveCodeTab('static')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    activeCodeTab === 'static' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  HTML Drop
                </button>
              </div>

              {/* Tab Content 1: 1-Line Embed */}
              {activeCodeTab === 'embed' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-32">
                    <pre>{htmlSnippet}</pre>
                  </div>
                  <button
                    onClick={() => handleCopy(htmlSnippet, 'html')}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow transition-all"
                  >
                    {copiedType === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'html' ? 'Kopiert!' : '1-Zeilen Embed-Code kopieren'}</span>
                  </button>
                </div>
              )}

              {/* Tab Content 2: Deploy to Vercel */}
              {activeCodeTab === 'vercel' && (
                <div className="space-y-3 animate-in fade-in duration-200 text-xs">
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Klonen Sie die App mit 1 Klick auf Ihren eigenen Vercel-Account. 100% DSGVO-souverän, eigene Domain, keine monatlichen Abhängigkeiten.
                  </p>
                  
                  <a
                    href={vercelDeployUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-black hover:bg-slate-950 text-white border border-white/20 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition-all hover:border-emerald-400"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 1155 1000">
                      <path d="m577.3 0 577.4 1000H0z"/>
                    </svg>
                    <span>Deploy to Vercel (1-Klick)</span>
                  </a>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10px] font-mono text-slate-400 overflow-x-auto">
                    <pre>{vercelEnvSnippet}</pre>
                  </div>

                  <button
                    onClick={() => handleCopy(vercelEnvSnippet, 'vercel-env')}
                    className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
                  >
                    {copiedType === 'vercel-env' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'vercel-env' ? 'Kopiert!' : 'Vercel Env-Variablen kopieren'}</span>
                  </button>
                </div>
              )}

              {/* Tab Content 3: React */}
              {activeCodeTab === 'react' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-32">
                    <pre>{reactSnippet}</pre>
                  </div>
                  <button
                    onClick={() => handleCopy(reactSnippet, 'react')}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow transition-all"
                  >
                    {copiedType === 'react' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'react' ? 'Kopiert!' : 'React Snippet kopieren'}</span>
                  </button>
                </div>
              )}

              {/* Tab Content 4: Static HTML */}
              {activeCodeTab === 'static' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-amber-300 overflow-x-auto max-h-32">
                    <pre>{staticHtmlSnippet}</pre>
                  </div>
                  <button
                    onClick={() => handleCopy(staticHtmlSnippet, 'static')}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow transition-all"
                  >
                    {copiedType === 'static' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'static' ? 'Kopiert!' : 'HTML Datei-Code kopieren'}</span>
                  </button>
                </div>
              )}

              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[11px] text-slate-400 hover:text-emerald-400 transition-colors pt-1"
              >
                Vollbild-Vorschau in neuem Tab öffnen ↗
              </a>
            </div>

          </div>

          {/* Center Simulator Frame */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <div 
              className={`w-full transition-all duration-300 ${
                viewport === 'mobile' 
                  ? 'max-w-[400px]' 
                  : viewport === 'tablet' 
                    ? 'max-w-[768px]' 
                    : 'max-w-full'
              }`}
            >
              {/* Fake Browser Chrome Frame */}
              <div className="bg-slate-900 rounded-t-2xl border border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="bg-slate-950 px-4 py-1 rounded-md text-[11px] font-mono text-slate-400 border border-slate-800 truncate max-w-xs">
                  {`https://${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.de/solarcarport`}
                </div>
                <div className="w-8" />
              </div>

              {/* Render Configurator Instance */}
              <div className="rounded-b-2xl overflow-hidden border-x border-b border-slate-800 shadow-2xl bg-[#071019]">
                <StandaloneConfigurator tenant={liveTenant} isEmbedded={true} />
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* Value Exchange / Why Installers Need This */}
      <section className="py-20 bg-slate-950/80 border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">DIE 3 WERT-SÄULEN FÜR FACHBETRIEBE</span>
            <h2 className="text-3xl font-extrabold text-white mt-2 font-serif">
              Warum regionale Installateure SolarCarport Embed lieben
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Verwandeln Sie anonyme Website-Besucher in abschlussbereite Kunden mit fertiger Statik und exakter Materialaufstellung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">10x Höhere Lead-Konvertierung</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kunden wollen keinen langweiligen Rückruf-Button. Sie wollen live sehen, wie ihr 2-Plätzer oder ihre Terrasse aussieht, was sie kostet und wie viel Strom sie spart. Der interaktive Quiz-Flow filtert unseriöse Anfragen vor.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Automatischer ERP BOM Cut</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Jede Anfrage generiert im Hintergrund automatisch die exakten RIAL Energy Seesen Werks-SKUs (Aluminium-Profile, EPDM-Kanäle, TOPCon Bifazial-Module, Klemmen, Wechselrichter). Null Aufwand für manuelle CAD-Planung.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Zero IT-Headaches & 0% MwSt</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Keine Server-Wartung, keine Plugins, keine Sicherheitsrisiken. Das Widget läuft isoliert und rasend schnell auf unserer Edge-Infrastruktur oder Ihrem eigenen Vercel-Account, inklusive automatischer Rechtskonformität nach § 12 Abs. 3 UStG.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Pricing Matrix Section with Dual-Track Sovereign Options */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">TRANSPARENTE LIZENZMODELLE</span>
          <h2 className="text-3xl font-extrabold text-white mt-2">
            Wählen Sie Ihren Fachpartner-Tarif
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Monatlich kündbar, als souveräne Einmallizenz oder 100% kostenlos bei Hardware-Bezug über das RIAL Energy Zentrallager Seesen.
          </p>

          {/* Cycle Toggle */}
          <div className="mt-6 inline-flex items-center bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setPricingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg font-semibold transition-all ${
                pricingCycle === 'monthly' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monatliche Abrechnung
            </button>
            <button
              onClick={() => setPricingCycle('yearly')}
              className={`px-4 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
                pricingCycle === 'yearly' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Jährlich (-20%)</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">2 Monate frei</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (4 Cards: Starter, Pro, Sovereign Lifetime, Wholesale Elite) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Starter Card */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Starter Widget</div>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold text-white font-mono">
                  € {pricingCycle === 'monthly' ? '49' : '39'}
                </span>
                <span className="text-xs text-slate-400">/ Monat</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ideal für Einzelunternehmer, Dachdecker und kleine Elektrofachbetriebe.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>1 Domain Lizenz (HTML Embed)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Interaktiver 2D/3D Konfigurator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Leads direkt per E-Mail</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('Stripe Checkout: Starter Widget (€49/mo)')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
            >
              Starter aktivieren
            </button>
          </div>

          {/* Pro Contractor Card (Recommended) */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl border-2 border-emerald-500/80 p-6 flex flex-col justify-between space-y-6 relative shadow-2xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow">
              Meistgewählt
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">Pro Contractor</div>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold text-white font-mono">
                  € {pricingCycle === 'monthly' ? '99' : '79'}
                </span>
                <span className="text-xs text-slate-400">/ Monat</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Für wachsende Installationsbetriebe mit eigenem Vertriebsteam.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-slate-800">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Unbegrenzte Domains</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Eigene Markenfarben & Logo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Webhook & CRM Anbindung</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-amber-400 font-semibold">5% Händler-Rabatt auf RIAL</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('Stripe Checkout: Pro Contractor (€99/mo)')}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              Pro starten
            </button>
          </div>

          {/* Sovereign Vercel Lifetime Edition */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-[#0b1329] rounded-2xl border border-cyan-500/50 p-6 flex flex-col justify-between space-y-6 relative shadow-xl hover:border-cyan-400 transition-all">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow">
              100% Souverän
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">Sovereign Vercel</div>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold text-cyan-300 font-mono">390 €</span>
                <span className="text-xs text-slate-400">/ Einmalig</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                1-Klick Deploy auf eigenen Vercel-Account. Vollständiger Quellcode, kein Abo.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-slate-800">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>100% Eigene Vercel Infrastruktur</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Lebenslange Lizenz ohne Monatsgebühr</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Eigener GitHub Quellcode-Zugang</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Integrierte /system-check Diagnose</span>
                </li>
              </ul>
            </div>

            <a
              href={vercelDeployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs text-center block shadow transition-all"
            >
              Vercel Blueprint holen (390 €)
            </a>
          </div>

          {/* Wholesale Partner Elite */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400">Partner Elite</div>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold text-amber-400 font-mono">0 €</span>
                <span className="text-xs text-slate-400">/ Monat</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kostenlos für aktive RIAL Energy & PV-Lager Großhandelskunden.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Alle Pro & Vercel Funktionen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Bedingung: &gt;20.000 € Hardware/Jahr</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Direkte Werks-Schnittstelle Seesen</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('Kontaktanfrage: RIAL Energy Großhandels-Partnerschaft')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs transition-all"
            >
              Partner werden
            </button>
          </div>

        </div>

      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}
