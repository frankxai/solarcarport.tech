import { ConfiguratorState } from '@/components/configurator/Interactive2DRenderer';
import { PricingBreakdown, ProjectContext } from '@/components/configurator/SolarConfigurator';

export interface TenantBranding {
  companyName: string;
  tagline?: string;
  logoUrl?: string;
  primaryColor: string; // e.g. '#F59E0B' (Solar Gold) or '#10B981' (Emerald)
  accentColor?: string;
  fontFamily?: string;
  phone?: string;
  email: string;
  websiteUrl?: string;
  city?: string;
}

export interface TenantConfig {
  id: string; // Slug identifier e.g. 'solartechnik-nord'
  branding: TenantBranding;
  pricingMarkupMultiplier: number; // e.g. 1.20 (+20% over RIAL baseline)
  customLaborRatePerSpot?: number; // e.g. 750 EUR
  enableV2XOption: boolean;
  enableCommercialOption: boolean;
  enableLiveERPInspection: boolean;
  rialPartnerTier: 'starter' | 'pro' | 'elite';
  rialWholesaleAccountNo: string;
  webhookUrl?: string;
}

export interface CustomerLeadInfo {
  name: string;
  email: string;
  phone: string;
  street?: string;
  postcode: string;
  city?: string;
  timeline: string;
  comments?: string;
  consentDsgvo: boolean;
}

export interface BOMItem {
  sku: string;
  description: string;
  qty: number;
  unit: string;
  category: 'structural' | 'pv_module' | 'mounting' | 'electrical' | 'storage' | 'addon';
  stockStatus: string;
  stockQty: number;
  unitPriceWholesaleEur: number;
}

export interface BOMCalculationResult {
  items: BOMItem[];
  kwp: number;
  moduleCount: number;
  postCount: number;
  purlinCount: number;
  clampCount: number;
  totalWeightKg: number;
  estimatedPallets: number;
  wholesaleNetSubtotalEur: number;
  seesenDispatchLeadDays: number;
  snowLoadCapacityKnM2: number;
  windLoadCapacityKmH: number;
}

export interface LeadSubmissionPayload {
  tenantId: string;
  customer: CustomerLeadInfo;
  config: ConfiguratorState;
  pricing: PricingBreakdown;
  project: ProjectContext;
}

export interface LeadSubmissionResponse {
  success: boolean;
  leadId: string;
  message: string;
  bomSummary: {
    kwp: number;
    itemCount: number;
    totalWeightKg: number;
    estimatedDeliveryDays: number;
  };
  pdfDownloadUrl?: string;
}
