'use client';

import React, { useState } from 'react';
import { 
  Sparkles, Download, FileText, CheckCircle2, Lock, 
  Terminal, ShieldCheck, BookOpen, Key, Copy, Check,
  ExternalLink, ArrowRight, Layers, FileSpreadsheet, Box
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface VaultItem {
  id: string;
  tier: 'Tier 0: B2C' | 'Tier 1: AI Agent' | 'Tier 2: Widget' | 'Tier 3: Enterprise';
  title: string;
  filename: string;
  filesize: string;
  type: 'PDF' | 'Notion' | 'JSON' | 'Python' | 'DOCX';
  description: string;
  badge: string;
}

const VAULT_ITEMS: VaultItem[] = [
  {
    id: 'guide_pdf',
    tier: 'Tier 0: B2C',
    title: 'The Sovereign Solar Architect Master-Compendium (2026 Edition)',
    filename: 'Sovereign_Solar_Carport_Statik_Baugenehmigung_2026.pdf',
    filesize: '18.4 MB',
    type: 'PDF',
    description: '120-Seiten Handbuch für Bauantrag in allen 16 Bundesländern, Grenzbebauung und DIN EN 1991 Statik.',
    badge: '120 Seiten PDF',
  },
  {
    id: 'notion_template',
    tier: 'Tier 0: B2C',
    title: 'Notion Solar-Carport Projekt-Planungs-Vault',
    filename: 'Notion_Solar_Carport_Project_OS.template',
    filesize: 'Web App Link',
    type: 'Notion',
    description: 'Interaktives Dashboard mit Kostenkalkulation, Handwerker-Vergleich und Behörden-Checkliste.',
    badge: 'Notion OS',
  },
  {
    id: 'claude_prompts',
    tier: 'Tier 1: AI Agent',
    title: 'Solar Closer Pro: Arcanea / Claude & GPT Prompt Engine',
    filename: 'Solar_Closer_Pro_System_Prompts_v2.json',
    filesize: '1.2 MB',
    type: 'JSON',
    description: '40+ Einwandbehandler, diagnostischer Lead-Qualifier und § 14a EnWG Erklär-Prompts.',
    badge: 'Prompt Pack',
  },
  {
    id: 'python_sizer',
    tier: 'Tier 1: AI Agent',
    title: 'Python CLI BOM & Albedo Sizing Engine',
    filename: 'rial_solar_sizer_cli.py',
    filesize: '24 KB',
    type: 'Python',
    description: 'Eigenständiges Python-Skript zur automatischen Generierung von RIAL Energy Seesen ERP-Stücklisten.',
    badge: 'Executable Script',
  },
  {
    id: 'commercial_tender',
    tier: 'Tier 3: Enterprise',
    title: 'Turnkey Ausschreibungstext (Muster-Leistungsverzeichnis)',
    filename: 'Muster_Ausschreibung_Solar_Parkplatz_VOB_C.docx',
    filesize: '3.6 MB',
    type: 'DOCX',
    description: 'Rechtssichere Ausschreibungsvorlage nach VOB/C für gewerbliche Parkplatzüberdachungen > 35 Plätze.',
    badge: 'VOB Vorlage',
  },
];

export default function VaultPage() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (item: VaultItem) => {
    setDownloadingId(item.id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Download gestartet: ${item.filename}`);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <Header onOpenConfigurator={() => window.location.href = '/#configurator'} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-cyan-500/15 via-purple-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Lock className="w-3.5 h-3.5" />
            <span>Digital Vault • Instant Fulfillment Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto">
            Ihr digitaler <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">Solar-Architektur Vault</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Laden Sie Ihre erworbenen Baugenehmigungs-Leitfäden, CAD-Montagepläne, KI-Prompt-Packs und Ausschreibungs-Vorlagen jederzeit herunter.
          </p>
        </div>
      </section>

      {/* Vault Items Grid */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Box className="w-4 h-4 text-cyan-400" />
            <span>VERFÜGBARE ASSETS ({VAULT_ITEMS.length})</span>
          </div>
          <span className="text-xs text-emerald-400 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Lizenzstatus: Vollzugriff Aktiv</span>
          </span>
        </div>

        <div className="space-y-4">
          {VAULT_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/60 hover:bg-slate-900/90 p-6 rounded-2xl border border-slate-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-cyan-400 border border-slate-700">
                    {item.tier}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 text-slate-400 border border-slate-800">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                
                <div className="text-[11px] font-mono text-slate-500">
                  Dateiname: <span className="text-slate-400">{item.filename}</span> ({item.filesize})
                </div>
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={() => handleDownload(item)}
                  disabled={downloadingId === item.id}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shadow transition-all flex items-center justify-center space-x-2"
                >
                  <Download className={`w-4 h-4 ${downloadingId === item.id ? 'animate-bounce' : ''}`} />
                  <span>{downloadingId === item.id ? 'Wird geladen...' : 'Herunterladen'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Support Footnote */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 text-center text-xs text-slate-400 space-y-2">
          <p>Alle Downloads sind mit Ihrer RIAL Energy Lizenz verknüpft und lebenslang über diesen Link abrufbar.</p>
          <p className="text-slate-500 text-[11px]">Fragen zur Montage oder Hardware-Bestellung? Wenden Sie sich direkt an Ihren RIAL Energy Fachpartner.</p>
        </div>

      </section>

      <Footer />
    </main>
  );
}
