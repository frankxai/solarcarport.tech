'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Download, Send, Phone, Mail, MapPin, User, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { ConfiguratorState } from '../configurator/Interactive2DRenderer';
import { PricingBreakdown } from '../configurator/SolarConfigurator';

interface LeadSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ConfiguratorState;
  pricing: PricingBreakdown;
}

export const LeadSummaryModal: React.FC<LeadSummaryModalProps> = ({ isOpen, onClose, config, pricing }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    zipCity: '',
    timeline: '1-3 months',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, posts JSON payload to webhook / API endpoint for Frank's brother (Sales Lead)
    console.log('QUALIFIED LEAD DISPATCH TO SALES LEAD:', {
      customer: formData,
      config,
      pricing,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-solar-500/10 text-solar-400 text-xs font-mono font-bold uppercase">
                <FileText className="w-3.5 h-3.5" />
                <span>RIAL Energy Sales Engineering Dispatch</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">
                Your Free Configuration Dossier is Ready
              </h3>
              <p className="text-xs text-slate-400">
                Enter your details to receive your official technical specification PDF dossier & direct quotation from RIAL Energy GmbH.
              </p>
            </div>

            {/* Config Summary Strip */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">PACKAGE</span>
                <strong className="text-white font-bold uppercase">{config.category}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CAPACITY</span>
                <strong className="text-solar-400 font-bold">{pricing.kwp} kWp</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ANNUAL SAVINGS</span>
                <strong className="text-electric-400 font-bold">€{pricing.annualSavingsEur.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ESTIMATED PRICE</span>
                <strong className="text-emerald-400 font-bold">€{pricing.totalEur.toLocaleString()}</strong>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-mono flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-solar-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Michael Schmidt"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-solar-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-mono flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-solar-400" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.de"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-solar-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-mono flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-solar-400" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+49 170 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-solar-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-mono flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-solar-400" />
                    <span>ZIP & City (Germany/DACH) *</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 38723 Seesen"
                    value={formData.zipCity}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCity: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-solar-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-mono">Planned Installation Horizon:</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-solar-500 focus:outline-none font-mono"
                >
                  <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                  <option value="1-3 months">1 to 3 months</option>
                  <option value="3-6 months">3 to 6 months</option>
                  <option value="Commercial Planning">Commercial Planning / Tender</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-solar-gradient text-slate-950 font-extrabold text-base shadow-solar-glow hover:opacity-95 transition-all flex items-center justify-center space-x-2 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Configuration & Request Lead Dossier</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Submission Confirmation & Download Screen */
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white font-['Outfit']">Configuration Successfully Dispatched!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Your customized solar carport dossier has been routed directly to our sales engineering director for review.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 max-w-lg mx-auto font-mono text-xs text-left">
              <div className="text-solar-400 font-bold border-b border-slate-900 pb-2">QUALIFIED LEAD SUMMARY RECORD:</div>
              <div><span className="text-slate-400">Customer:</span> {formData.fullName} ({formData.email})</div>
              <div><span className="text-slate-400">Location:</span> {formData.zipCity}</div>
              <div><span className="text-slate-400">System Spec:</span> {pricing.kwp} kWp {config.category.toUpperCase()} ({config.material})</div>
              <div><span className="text-slate-400">Estimated Investment:</span> €{pricing.totalEur.toLocaleString()} (0% VAT)</div>
              <div><span className="text-slate-400">Sales Lead Assignment:</span> RIAL Energy Sales Director (Direct Referral)</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => alert(`Dossier PDF Downloaded for ${formData.fullName}!`)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-electric-gradient text-slate-950 font-bold text-xs shadow-electric-glow hover:opacity-95 transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Dossier</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel text-white font-bold text-xs hover:border-slate-600 transition-all"
              >
                Close & Return to Site
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
