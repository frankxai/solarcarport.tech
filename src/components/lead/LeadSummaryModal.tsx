'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, Mail, MapPin, Phone, User, X } from 'lucide-react';
import type { ConfiguratorState } from '../configurator/Interactive2DRenderer';
import type { PricingBreakdown, ProjectContext } from '../configurator/SolarConfigurator';

interface LeadSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ConfiguratorState;
  pricing: PricingBreakdown;
  project: ProjectContext;
}

export const LeadSummaryModal: React.FC<LeadSummaryModalProps> = ({ isOpen, onClose, config, pricing, project }) => {
  const [prepared, setPrepared] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', zipCity: '', timeline: '3-6 Monate', notes: '' });
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const preparedHeadingRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData((current) => ({ ...current, zipCity: project.postcode, timeline: project.timeline }));
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      openerRef.current?.focus();
      openerRef.current = null;
    }
  }, [isOpen, project.postcode, project.timeline]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && prepared) {
      window.requestAnimationFrame(() => preparedHeadingRef.current?.focus());
    }
  }, [isOpen, prepared]);

  const mailto = useMemo(() => {
    const body = [
      'Guten Tag,',
      '',
      'ich möchte mein Solarcarport-Projekt persönlich prüfen lassen.',
      `Name: ${formData.fullName}`,
      `E-Mail: ${formData.email}`,
      `Telefon: ${formData.phone}`,
      `PLZ / Ort: ${formData.zipCity}`,
      `Zeitraum: ${formData.timeline}`,
      `Systemrichtung: ${config.category}`,
      `Hinweise: ${formData.notes || '-'}`,
      '',
      'Hinweis: Die Website-Indikation ist unverbindlich. Bitte senden Sie mir nach Prüfung die nächsten Schritte.',
    ].join('\n');
    return `mailto:info@rialenergy.de?subject=${encodeURIComponent('Projektanfrage SolarCarport.tech')}&body=${encodeURIComponent(body)}`;
  }, [config.category, formData]);

  if (!isOpen) return null;

  const close = () => {
    setPrepared(false);
    onClose();
  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div ref={dialogRef} onKeyDown={handleDialogKeyDown} className="fixed inset-0 z-[70] overflow-y-auto bg-[#071019]/92 p-3 backdrop-blur-xl sm:p-6" role="dialog" aria-modal="true" aria-labelledby="request-title">
      <div className="mx-auto my-3 w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0d1824] p-5 shadow-2xl sm:my-8 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="eyebrow">Persönliche Prüfung</span>
            <h2 id="request-title" className="mt-3 text-2xl font-black text-white sm:text-3xl">Projektanfrage vorbereiten</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Ihre Eingaben bleiben zunächst in diesem Browser. Es wird nichts automatisch an ERP, CRM, KI oder Vertrieb übertragen.</p>
          </div>
          <button ref={closeButtonRef} onClick={close} aria-label="Dialog schließen" className="touch-target flex shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-300 hover:text-white"><X className="h-5 w-5" /></button>
        </div>

        {!prepared ? (
          <form onSubmit={(event) => { event.preventDefault(); setPrepared(true); }} className="mt-7 space-y-4">
            <p className="rounded-2xl border border-sky-300/20 bg-sky-300/[0.06] p-4 text-xs leading-5 text-sky-100">Ihre Kontaktdaten werden zunächst nur in diesem Browser vorbereitet. Empfänger einer von Ihnen ausdrücklich im E-Mail-Programm versendeten Anfrage ist die RIAL Energy GmbH. Es wird nichts automatisch gesendet; Daten verlassen Ihren Browser erst, wenn Sie den Versand selbst auslösen. Details: <a href="https://www.rialenergy.de/datenschutzerklarung" target="_blank" rel="noreferrer" className="font-bold underline">Datenschutzerklärung</a> und <a href="https://www.rialenergy.de/impressum" target="_blank" rel="noreferrer" className="font-bold underline">Impressum</a>.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field icon={User} label="Name" required value={formData.fullName} onChange={(value) => setFormData((current) => ({ ...current, fullName: value }))} autoComplete="name" />
              <Field icon={Mail} label="E-Mail" type="email" required value={formData.email} onChange={(value) => setFormData((current) => ({ ...current, email: value }))} autoComplete="email" />
              <Field icon={Phone} label="Telefon" type="tel" value={formData.phone} onChange={(value) => setFormData((current) => ({ ...current, phone: value }))} autoComplete="tel" />
              <Field icon={MapPin} label="PLZ / Ort" required value={formData.zipCity} onChange={(value) => setFormData((current) => ({ ...current, zipCity: value }))} autoComplete="postal-code" hint="Aus Ihrer Standortprüfung übernommen — ergänzen Sie bei Bedarf den Ort." />
            </div>
            <label className="block text-sm font-bold text-white">Projektzeitraum<select value={formData.timeline} onChange={(event) => setFormData((current) => ({ ...current, timeline: event.target.value }))} className="touch-target mt-2 w-full rounded-xl border border-white/10 bg-[#071019] px-4 text-white"><option>so bald wie möglich</option><option>1-3 Monate</option><option>3-6 Monate</option><option>6-12 Monate</option><option>frühe Planung</option></select></label>
            <label className="block text-sm font-bold text-white">Hinweise<textarea rows={4} value={formData.notes} onChange={(event) => setFormData((current) => ({ ...current, notes: event.target.value }))} placeholder="Standort, Maße, Besonderheiten oder Fragen" className="mt-2 w-full rounded-xl border border-white/10 bg-[#071019] p-4 text-white placeholder:text-slate-600" /></label>
            <button type="submit" className="touch-target flex w-full items-center justify-center gap-3 rounded-xl bg-amber-300 px-6 font-extrabold text-slate-950">Anfrage prüfen <ArrowRight className="h-5 w-5" /></button>
          </form>
        ) : (
          <div className="mt-8 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-amber-300" />
            <h3 ref={preparedHeadingRef} tabIndex={-1} className="mt-4 text-2xl font-black text-white">Anfrage vorbereitet — noch nicht versendet.</h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">Öffnen Sie die Anfrage in Ihrem E-Mail-Programm, prüfen Sie die Angaben und senden Sie sie selbst an RIAL Energy. Erst dann verlassen Daten Ihren Browser.</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#071019] p-4 text-left text-sm text-slate-300">
              <p><strong className="text-white">System:</strong> {config.category}</p>
              <p className="mt-1"><strong className="text-white">Website-Indikation:</strong> ca. {pricing.kwp} kWp</p>
              <p className="mt-1 text-xs text-slate-500">Keine technische Freigabe, keine Verfügbarkeits- oder Preisgarantie.</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href={mailto} className="touch-target inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 font-extrabold text-slate-950"><Mail className="h-5 w-5" /> Im E-Mail-Programm öffnen</a>
              <button onClick={() => setPrepared(false)} className="touch-target rounded-xl border border-white/10 px-6 font-bold text-white">Angaben ändern</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function Field({ icon: Icon, label, type = 'text', required = false, value, onChange, autoComplete, hint }: { icon: typeof User; label: string; type?: string; required?: boolean; value: string; onChange: (value: string) => void; autoComplete?: string; hint?: string }) {
  const hintId = hint ? `field-hint-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : undefined;
  return <label className="block text-sm font-bold text-white"><span className="flex items-center gap-2"><Icon className="h-4 w-4 text-amber-300" />{label}{required ? ' *' : ''}</span><input required={required} aria-describedby={hintId} type={type} value={value} autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} className="touch-target mt-2 w-full rounded-xl border border-white/10 bg-[#071019] px-4 text-white focus:border-amber-300" />{hint && <span id={hintId} className="mt-2 block text-xs font-normal leading-5 text-slate-500">{hint}</span>}</label>;
}
