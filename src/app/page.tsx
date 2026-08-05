'use client';

import React, { useState } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { LeadSummaryModal } from '@/components/lead/LeadSummaryModal';
import { PreeminenceEducation } from '@/components/PreeminenceEducation';
import { ProductShowcase } from '@/components/ProductShowcase';
import { PricingBreakdown, SolarConfigurator } from '@/components/configurator/SolarConfigurator';
import type { ConfiguratorState } from '@/components/configurator/Interactive2DRenderer';

const initialConfig: ConfiguratorState = {
  category: 'double',
  spots: 2,
  material: 'aluminum',
  postColor: 'anthracite',
  moduleType: 'dark',
  wallbox: false,
  wallboxType: 'standard',
  battery: false,
  batterySize: '15',
  ledLighting: false,
  assemblyService: true,
};

const initialPricing: PricingBreakdown = {
  baseCarportPrice: 0,
  modulesPrice: 0,
  inverterPrice: 0,
  wallboxPrice: 0,
  batteryPrice: 0,
  assemblyPrice: 0,
  subtotal: 0,
  vatAmount: 0,
  totalEur: 0,
  kwp: 0,
  annualKwhYield: 0,
  annualSavingsEur: 0,
  paybackYears: 0,
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<ConfiguratorState['category']>('double');
  const [configuratorKey, setConfiguratorKey] = useState(0);
  const [leadOpen, setLeadOpen] = useState(false);
  const [activeConfig, setActiveConfig] = useState<ConfiguratorState>(initialConfig);
  const [activePricing, setActivePricing] = useState<PricingBreakdown>(initialPricing);

  const startConfigurator = (category: ConfiguratorState['category'] = selectedCategory) => {
    setSelectedCategory(category);
    setConfiguratorKey((current) => current + 1);
    window.requestAnimationFrame(() => {
      document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const openRequest = (config: ConfiguratorState, pricing: PricingBreakdown) => {
    setActiveConfig(config);
    setActivePricing(pricing);
    setLeadOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#071019] text-slate-100">
      <Header onOpenConfigurator={() => startConfigurator()} />
      <Hero onStartConfigurator={startConfigurator} />
      <ProductShowcase onSelectCategory={startConfigurator} />
      <PreeminenceEducation />
      <SolarConfigurator key={configuratorKey} selectedCategory={selectedCategory} onOpenLeadModal={openRequest} />
      <Footer />
      <LeadSummaryModal isOpen={leadOpen} onClose={() => setLeadOpen(false)} config={activeConfig} pricing={activePricing} />
    </main>
  );
}
