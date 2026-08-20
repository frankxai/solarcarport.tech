'use client';

import React, { useState } from 'react';
import { HeaderV2 } from '@/components/v2/HeaderV2';
import { HeroV2 } from '@/components/v2/HeroV2';
import { PreeminenceEducationV2Props as PreeminenceEducationV2 } from '@/components/v2/PreeminenceEducationV2';
import { ProductShowcaseV2 } from '@/components/v2/ProductShowcaseV2';
import { ProjectProof } from '@/components/ProjectProof';
import { SolarShop } from '@/components/shop/SolarShop';
import { SolarConfiguratorV2 } from '@/components/v2/SolarConfiguratorV2';
import { LiveERPDrawer } from '@/components/erp/LiveERPDrawer';
import { LeadSummaryModal } from '@/components/lead/LeadSummaryModal';
import { Footer } from '@/components/Footer';
import { ConfiguratorState } from '@/components/configurator/Interactive2DRenderer';
import { PricingBreakdown } from '@/components/configurator/SolarConfigurator';

export default function V2Page() {
  const [erpOpen, setErpOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [lang, setLang] = useState<'de' | 'en'>('de');

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
    inverterPrice: 2168,
    wallboxPrice: 1490,
    batteryPrice: 0,
    assemblyPrice: 1372,
    subtotal: 12250,
    vatAmount: 0,
    totalEur: 12250,
    kwp: 7.6,
    annualKwhYield: 7448,
    annualSavingsEur: 2383,
    paybackYears: 5.1,
  });

  const handleOpenLeadModal = (config: ConfiguratorState, pricing?: PricingBreakdown) => {
    setActiveConfig(config);
    if (pricing) {
      setActivePricing(pricing);
    }
    setLeadModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#040711] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-['Poppins']">
      
      {/* V2 Header */}
      <HeaderV2 
        onOpenERP={() => setErpOpen(true)} 
        lang={lang}
        setLang={setLang}
      />

      {/* V2 Hero */}
      <HeroV2 lang={lang} />

      {/* RIAL Energy Solar E-Shop & Hardware Warehouse */}
      <div id="v2-shop">
        <SolarShop 
          onOpenERP={() => setErpOpen(true)} 
          onOpenLeadModal={(cfg) => {
            setActiveConfig(cfg);
            document.getElementById('v2-configurator')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      {/* V2 Preeminence Education */}
      <PreeminenceEducationV2 lang={lang} />

      {/* V2 Product Showcase */}
      <ProductShowcaseV2 lang={lang} />

      {/* Built Project Evidence Proof */}
      <ProjectProof />

      {/* V2 Configurator */}
      <SolarConfiguratorV2 
        onOpenERP={() => setErpOpen(true)}
        onOpenLeadModal={handleOpenLeadModal}
        lang={lang}
      />

      {/* RIAL Energy Live ERP Inventory Drawer */}
      <LiveERPDrawer 
        isOpen={erpOpen} 
        onClose={() => setErpOpen(false)} 
        config={activeConfig}
      />

      {/* Qualified Sales Lead Modal */}
      <LeadSummaryModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        config={activeConfig}
        pricing={activePricing}
      />

      {/* Footer */}
      <Footer />

    </main>
  );
}
