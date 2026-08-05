'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PreeminenceEducation } from '@/components/PreeminenceEducation';
import { ProductShowcase } from '@/components/ProductShowcase';
import { SolarConfigurator, PricingBreakdown } from '@/components/configurator/SolarConfigurator';
import { ConfiguratorState } from '@/components/configurator/Interactive2DRenderer';
import { LiveERPDrawer } from '@/components/erp/LiveERPDrawer';
import { LeadSummaryModal } from '@/components/lead/LeadSummaryModal';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [isERPModalOpen, setIsERPModalOpen] = useState<boolean>(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);

  const [activeConfig, setActiveConfig] = useState<ConfiguratorState>({
    category: 'double',
    spots: 2,
    material: 'aluminum',
    postColor: 'anthracite',
    moduleType: 'dark',
    wallbox: true,
    wallboxType: 'v2x',
    battery: false,
    batterySize: '15',
    ledLighting: true,
    assemblyService: true,
  });

  const [activePricing, setActivePricing] = useState<PricingBreakdown>({
    baseCarportPrice: 4900,
    modulesPrice: 2320,
    inverterPrice: 2060,
    wallboxPrice: 1490,
    batteryPrice: 0,
    assemblyPrice: 1372,
    subtotal: 12142,
    vatAmount: 0,
    totalEur: 12142,
    kwp: 7.5,
    annualKwhYield: 7350,
    annualSavingsEur: 2352,
    paybackYears: 5.2,
  });

  const handleStartConfigurator = () => {
    const el = document.getElementById('configurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLeadModal = (config: ConfiguratorState, pricing: PricingBreakdown) => {
    setActiveConfig(config);
    setActivePricing(pricing);
    setIsLeadModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-slate-100 flex flex-col justify-between selection:bg-solar-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Header 
        onOpenConfigurator={handleStartConfigurator}
        onOpenERP={() => setIsERPModalOpen(true)}
      />

      {/* Hero Section with Live Quick Estimator */}
      <Hero onStartConfigurator={handleStartConfigurator} />

      {/* Jay Abraham Strategy of Preeminence Educational Engine */}
      <PreeminenceEducation />

      {/* Modular Product Lines Showcase */}
      <ProductShowcase onSelectCategory={() => handleStartConfigurator()} />

      {/* 6-Step Interactive Configurator & Live ERP Engine */}
      <SolarConfigurator 
        onOpenERP={() => setIsERPModalOpen(true)}
        onOpenLeadModal={handleOpenLeadModal}
      />

      {/* Footer */}
      <Footer />

      {/* Slide-over ERP Inventory Drawer */}
      <LiveERPDrawer
        isOpen={isERPModalOpen}
        onClose={() => setIsERPModalOpen(false)}
        config={activeConfig}
      />

      {/* Lead Capture & PDF Spec Dossier Modal */}
      <LeadSummaryModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        config={activeConfig}
        pricing={activePricing}
      />

    </main>
  );
}
