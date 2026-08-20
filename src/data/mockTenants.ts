import { TenantConfig } from '@/types/tenant';

export const MOCK_TENANTS: Record<string, TenantConfig> = {
  'solartechnik-nord': {
    id: 'solartechnik-nord',
    branding: {
      companyName: 'SolarTechnik Nord GmbH',
      tagline: 'Meisterbetrieb für Photovoltaik & Überdachungen in Hamburg & SH',
      primaryColor: '#10B981', // Emerald Tech
      accentColor: '#059669',
      logoUrl: '',
      email: 'anfrage@solartechnik-nord.de',
      phone: '+49 40 8972 100',
      websiteUrl: 'https://solartechnik-nord.de',
      city: 'Hamburg',
    },
    pricingMarkupMultiplier: 1.18, // +18% installer margin
    customLaborRatePerSpot: 780,
    enableV2XOption: true,
    enableCommercialOption: true,
    enableLiveERPInspection: true,
    rialPartnerTier: 'pro',
    rialWholesaleAccountNo: 'RIAL-DE-HH-9402',
    webhookUrl: 'https://api.solartechnik-nord.de/webhooks/leads',
  },
  'alpen-solar': {
    id: 'alpen-solar',
    branding: {
      companyName: 'Alpen Solar & Dachbau GmbH',
      tagline: 'Premium Solarcarports & Schneelast-Statik für Bayern & Tirol',
      primaryColor: '#3B82F6', // Alpine Blue
      accentColor: '#2563EB',
      logoUrl: '',
      email: 'kontakt@alpen-solar.de',
      phone: '+49 89 5543 200',
      websiteUrl: 'https://alpen-solar.de',
      city: 'München',
    },
    pricingMarkupMultiplier: 1.25, // +25% installer margin
    customLaborRatePerSpot: 950,
    enableV2XOption: true,
    enableCommercialOption: true,
    enableLiveERPInspection: true,
    rialPartnerTier: 'elite',
    rialWholesaleAccountNo: 'RIAL-DE-BY-1829',
  },
  'rial-direct': {
    id: 'rial-direct',
    branding: {
      companyName: 'RIAL Energy Werksvertretung',
      tagline: 'Direktvertrieb & Werksplanung aus Seesen am Harz',
      primaryColor: '#F59E0B', // Solar Gold
      accentColor: '#D97706',
      logoUrl: '',
      email: 'partner@solarcarport.tech',
      phone: '+49 5381 9890 0',
      websiteUrl: 'https://solarcarport.tech',
      city: 'Seesen',
    },
    pricingMarkupMultiplier: 1.0, // Werks-Direktpreis
    customLaborRatePerSpot: 650,
    enableV2XOption: true,
    enableCommercialOption: true,
    enableLiveERPInspection: true,
    rialPartnerTier: 'elite',
    rialWholesaleAccountNo: 'RIAL-HQ-0001',
  },
  'default': {
    id: 'default',
    branding: {
      companyName: 'Ihr Solar & Bedachungsfachbetrieb',
      tagline: 'Zertifizierte Solarcarport-Planung nach DIN EN 1991',
      primaryColor: '#F59E0B',
      accentColor: '#06B6D4',
      email: 'info@solarfachbetrieb.de',
      phone: '+49 800 500 400',
      websiteUrl: '',
      city: 'Bundesweit',
    },
    pricingMarkupMultiplier: 1.15,
    customLaborRatePerSpot: 700,
    enableV2XOption: true,
    enableCommercialOption: true,
    enableLiveERPInspection: true,
    rialPartnerTier: 'starter',
    rialWholesaleAccountNo: 'RIAL-GUEST-0000',
  },
};

export function getTenantConfig(tenantId?: string): TenantConfig {
  if (!tenantId) return MOCK_TENANTS['default'];
  return MOCK_TENANTS[tenantId] || {
    ...MOCK_TENANTS['default'],
    id: tenantId,
    branding: {
      ...MOCK_TENANTS['default'].branding,
      companyName: tenantId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ' (Fachpartner)',
    }
  };
}
