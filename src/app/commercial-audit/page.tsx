'use client';

import React, { useState, useMemo } from 'react';
import { 
  Building2, ShieldAlert, CheckCircle2, TrendingUp, Zap, 
  FileText, Download, ArrowRight, Sparkles, HelpCircle, 
  Car, AlertTriangle, Calculator, FileCheck, Layers, Scale, DollarSign
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  STATE_SOLAR_MANDATES, 
  calculateCommercialAudit, 
  CommercialAuditInput, 
  CommercialAuditResult 
} from '@/lib/commercialMandateEngine';

export default function CommercialAuditPage() {
  const [selectedState, setSelectedState] = useState<string>('BW');
  const [parkingSpots, setParkingSpots] = useState<number>(60);
  const [evVehicles, setEvVehicles] = useState<number>(15);
  const [powerPriceCent, setPowerPriceCent] = useState<number>(26);
  const [taxRate, setTaxRate] = useState<number>(30);
  const [enableIAB, setEnableIAB] = useState<boolean>(true);
  const [leadModalOpen, setLeadModalOpen] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const input: CommercialAuditInput = useMemo(() => ({
    stateCode: selectedState,
    parkingSpots,
    avgDailyEvVehicles: evVehicles,
    currentGridElectricityPriceCentKwh: powerPriceCent,
    corporateTaxRatePercent: taxRate,
    enableAfADepreciation: true,
    enableIAB7g: enableIAB,
  }), [selectedState, parkingSpots, evVehicles, powerPriceCent, taxRate, enableIAB]);

  const audit: CommercialAuditResult = useMemo(() => {
    return calculateCommercialAudit(input);
  }, [input]);

  const handleDownloadDossier = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 selection:bg-purple-500 selection:text-slate-950 font-sans">
      <Header onOpenConfigurator={() => window.location.href = '/#configurator'} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-purple-500/15 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-400/10 border border-purple-400/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Scale className="w-3.5 h-3.5" />
            <span>Tier 3: Commercial Solarpflicht & Fleet ROI Fast-Track Audit</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">
            Deutsche <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-amber-400 bg-clip-text text-transparent">Solar-Parkplatzpflicht 2026</span> rechtssicher & rentabel meistern.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Überprüfen Sie in 60 Sekunden, ob Ihre Gewerbefläche der gesetzlichen Solarpflicht (BW, NRW, Hessen, Bayern etc.) unterliegt – und wie Sie durch IAB § 7g Steuerabschreibungen & Flottenladung maximale Rendite erzielen.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>16 Bundesländer LBO Prüfung</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>AfA & IAB §7g Steuervorteil</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Turnkey Ausschreibungs-Vorlage</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Diagnostic Workspace */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs Column */}
          <div className="lg:col-span-5 bg-slate-900/70 rounded-3xl border border-slate-800 p-6 sm:p-7 space-y-6">
            
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
              <Building2 className="w-5 h-5 text-purple-400" />
              <div>
                <h2 className="text-base font-bold text-white">Standort & Parkplatz-Parameter</h2>
                <p className="text-xs text-slate-400">Rechtliche & energiewirtschaftliche Eckdaten</p>
              </div>
            </div>

            {/* State Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bundesland der Gewerbeimmobilie:</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400 font-medium"
              >
                {Object.entries(STATE_SOLAR_MANDATES).map(([code, s]) => (
                  <option key={code} value={code}>
                    {s.stateName} (Pflicht ab &gt;{s.mandatoryParkingSpotsThreshold} Plätzen)
                  </option>
                ))}
              </select>
            </div>

            {/* Parking Spots Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">Anzahl Stellplätze (offene Parkfläche):</span>
                <span className="text-base font-bold font-mono text-purple-400">{parkingSpots} Stellplätze</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={parkingSpots}
                onChange={(e) => setParkingSpots(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>20 Plätze</span>
                <span>150 Plätze</span>
                <span>300+ Plätze</span>
              </div>
            </div>

            {/* EV Fleet Count */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">Täglich ladende E-Fahrzeuge (Flotte & Mitarbeiter):</span>
                <span className="text-sm font-bold font-mono text-cyan-400">{evVehicles} EVs / Tag</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={evVehicles}
                onChange={(e) => setEvVehicles(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Electricity & Tax Parameters */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Gewerbe-Strompreis</label>
                <div className="flex items-center space-x-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2">
                  <input
                    type="number"
                    value={powerPriceCent}
                    onChange={(e) => setPowerPriceCent(Number(e.target.value))}
                    className="w-full bg-transparent text-white font-mono focus:outline-none"
                  />
                  <span className="text-slate-500 font-mono">Ct/kWh</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Ertragssteuersatz (KöSt+GewSt)</label>
                <div className="flex items-center space-x-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2">
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full bg-transparent text-white font-mono focus:outline-none"
                  />
                  <span className="text-slate-500 font-mono">%</span>
                </div>
              </div>
            </div>

            {/* Tax Shield Toggle (IAB § 7g) */}
            <label className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={enableIAB}
                onChange={(e) => setEnableIAB(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded bg-slate-800 text-purple-500 focus:ring-0"
              />
              <div className="text-xs">
                <span className="font-bold text-white block">Investitionsabzugsbetrag (IAB § 7g EStG) anwenden</span>
                <span className="text-slate-400 text-[11px]">Bis zu 50% Sonderabschreibung im ersten Geschäftsjahr steuerlich geltend machen.</span>
              </div>
            </label>

          </div>

          {/* Right Results & Compliance Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Legal Status Banner */}
            <div className={`p-6 rounded-3xl border transition-all ${
              audit.isMandatory 
                ? 'bg-gradient-to-r from-red-950/40 via-purple-950/30 to-slate-900 border-red-500/50' 
                : 'bg-slate-900/80 border-emerald-500/40'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    {audit.isMandatory ? (
                      <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>GESETZLICHE SOLAR-PFLICHT AKTIV</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>UNTERHALB DER PFLICHTGRENZE (FREIWILLIG RENTABEL)</span>
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mt-2">
                    {audit.stateRule.lawName}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {audit.isMandatory 
                      ? `Ihre Stellplatzanzahl (${parkingSpots}) überschreitet den Grenzwert von ${audit.stateRule.mandatoryParkingSpotsThreshold} Plätzen in ${audit.stateRule.stateName}. Eine PV-Überdachung ist bei Neubau/Sanierung gesetzlich vorgeschrieben.`
                      : `In ${audit.stateRule.stateName} gilt die Pflicht erst ab ${audit.stateRule.mandatoryParkingSpotsThreshold} Stellplätzen. Dennoch amortisiert sich die Anlage durch Eigenverbrauch in wenigen Jahren.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Financial & Economic KPIs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">PV-Leistung</span>
                <span className="text-xl font-bold text-purple-400">{audit.requiredCapacityKwp} kWp</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{audit.annualGenerationKwh.toLocaleString('de-DE')} kWh/a</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Ersparnis / Jahr</span>
                <span className="text-xl font-bold text-emerald-400">€ {audit.annualTotalSavingsEur.toLocaleString('de-DE')}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Strom + EV Laden</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Steuervorteil J1</span>
                <span className="text-xl font-bold text-cyan-400">€ {audit.year1TaxShieldBenefitEur.toLocaleString('de-DE')}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">IAB § 7g Shield</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Amortisation</span>
                <span className="text-xl font-bold text-amber-400">{audit.paybackYears} Jahre</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">ROI: +{audit.roi20YearsPercent}%</span>
              </div>
            </div>

            {/* 20-Year Cashflow Summary Box */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center font-bold text-slate-200">
                <span>Geschätzte Gesamtinvestition (Netto schlüsselfertig):</span>
                <span className="font-mono text-white text-sm">€ {audit.estimatedInvestmentNetEur.toLocaleString('de-DE')}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Effektive Anfangsinvestition nach Steuerabzug (Jahr 1):</span>
                <span className="font-mono text-cyan-400 font-semibold">€ {(audit.estimatedInvestmentNetEur - audit.year1TaxShieldBenefitEur).toLocaleString('de-DE')}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Jährliche CO₂-Vermeidung für ESG-Reporting:</span>
                <span className="font-mono text-emerald-400 font-semibold">{audit.co2OffsetTonsPerYear} Tonnen CO₂ / Jahr</span>
              </div>
            </div>

            {/* Action CTA Box: Download Dossier / Request Turnkey */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-purple-500/40 shadow-2xl space-y-4">
              <div className="flex items-center space-x-2 text-xs text-purple-400 font-semibold uppercase tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>VOLLSTÄNDIGES AUSSCHREIBUNGS- & COMPLIANCE-DOSSIER</span>
              </div>
              <h4 className="text-base font-bold text-white">
                Möchten Sie das vollständige Gutachten & die Ausschreibungs-Texte für Ihr Bauamt?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Das Dossier enthält die statische Vorbemessung, 16-Länder Gesetzestexte, den AfA/IAB Abschreibungs-Nachweis für Ihren Steuerberater und neutrale Leistungsverzeichnis-Texte für Generalunternehmer.
              </p>

              <button
                onClick={() => setLeadModalOpen(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-slate-950 font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Commercial Audit Dossier anfordern (Kostenlos für Planer & Bauherren)</span>
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* Modal for Dossier Download */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
            
            {!submitted ? (
              <form onSubmit={handleDownloadDossier} className="space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">Commercial Audit Dossier</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Standort: {audit.stateRule.stateName} • {parkingSpots} Stellplätze ({audit.requiredCapacityKwp} kWp)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLeadModalOpen(false)}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Unternehmensname *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="z.B. EDEKA Center / Logistik GmbH"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Geschäftliche E-Mail-Adresse *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="immobilien@unternehmen.de"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Telefonnummer für Rückfragen</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+49 89 1234567"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setLeadModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-105 transition-all"
                  >
                    Dossier generieren
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Dossier erfolgreich vorbereitet!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1.5 leading-relaxed">
                    Vielen Dank für Ihre Anfrage, {companyName}. Das vollständige Commercial Solarpflicht-Dossier ({audit.requiredCapacityKwp} kWp) wurde an <strong>{contactEmail}</strong> gesendet.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setLeadModalOpen(false);
                    setSubmitted(false);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  Zurück zum Audit-Rechner
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
