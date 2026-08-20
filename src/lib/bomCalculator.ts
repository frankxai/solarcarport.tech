import { ConfiguratorState } from '@/components/configurator/Interactive2DRenderer';
import { BOMCalculationResult, BOMItem } from '@/types/tenant';

/**
 * Single Source of Truth (SSOT) for RIAL Energy GmbH / PV-Lager
 * Bill-of-Materials (BOM) cut-list and structural calculations.
 */
export function calculateRialBOM(config: ConfiguratorState): BOMCalculationResult {
  // 1. Module and Structural Capacity calculations
  const moduleCount = config.category === 'commercial' 
    ? Math.max(config.spots * 4, 24) 
    : config.category === 'double' 
      ? 16 
      : config.category === 'terrace' 
        ? 10 
        : 8;

  const kwp = Math.round(moduleCount * 0.47 * 10) / 10;
  
  // Posts calculation (DIN EN 1991 structural span rules)
  const postCount = config.category === 'commercial' 
    ? Math.ceil(config.spots / 2) * 2 + 2 
    : config.category === 'double' 
      ? 4 
      : config.category === 'terrace'
        ? 3
        : 2;

  // Purlins / Rail channels
  const purlinCount = Math.round(moduleCount * 0.8) + (config.category === 'commercial' ? 4 : 2);
  
  // Clamps with EPDM rubber dampeners
  const clampCount = moduleCount * 4;

  const items: BOMItem[] = [];

  // Item 1: Structural Posts
  const postSku = config.material === 'aluminum' ? 'RAL-ALU-POST-2800' : 'RAL-STL-POST-3000';
  const postDesc = config.material === 'aluminum'
    ? `Extruded Heavy Aluminum Profile Post 2800mm (T6 Anodized, RAL 7016)`
    : `Hot-Dip Galvanized Steel Heavy Post 3000mm (Structural Grade S355)`;
  const postWholesale = config.material === 'aluminum' ? 245 : 195;

  items.push({
    sku: postSku,
    description: postDesc,
    qty: postCount,
    unit: 'Pcs',
    category: 'structural',
    stockStatus: 'In Stock (Seesen Warehouse)',
    stockQty: 420,
    unitPriceWholesaleEur: postWholesale,
  });

  // Item 2: Heavy Purlin Rail with EPDM Channel
  items.push({
    sku: 'RAL-PUR-60-EPDM',
    description: 'Heavy Purlin Profile Rail 60mm with Integrated EPDM Water Drainage Channel',
    qty: purlinCount,
    unit: 'Bars',
    category: 'structural',
    stockStatus: 'In Stock (Seesen Warehouse)',
    stockQty: 1180,
    unitPriceWholesaleEur: 68,
  });

  // Item 3: PV Modules (Glass-Glass Bifacial)
  const isTranslucent = config.moduleType === 'translucent';
  const moduleSku = isTranslucent ? 'PV-GLASS-BIF-450-CLR' : 'PV-TOPCON-470-BLK';
  const moduleDesc = isTranslucent
    ? '450W Bifacial 20% Light-Permeable Glass-Glass Module (DIBt Certified Overhang)'
    : '470W Bifacial N-Type TOPCon Dual-Glass PV Module (Full Black Finish)';
  const moduleWholesale = isTranslucent ? 125 : 105;

  items.push({
    sku: moduleSku,
    description: moduleDesc,
    qty: moduleCount,
    unit: 'Modules',
    category: 'pv_module',
    stockStatus: 'In Stock (PV-Lager Hub Seesen)',
    stockQty: 3200,
    unitPriceWholesaleEur: moduleWholesale,
  });

  // Item 4: Clamps
  items.push({
    sku: 'CLP-BLK-EPDM-30',
    description: 'Vibration-Damped Black Anodized Module Middle & End Clamps + EPDM Seals',
    qty: clampCount,
    unit: 'Sets',
    category: 'mounting',
    stockStatus: 'In Stock',
    stockQty: 18500,
    unitPriceWholesaleEur: 3.5,
  });

  // Item 5: Concrete Heavy Anchor Studs
  items.push({
    sku: 'ANC-M16-SS316-HV',
    description: 'Heavy-Duty M16 Stainless Steel Ground Anchor Set with Chemical Dowels',
    qty: postCount * 4,
    unit: 'Units',
    category: 'mounting',
    stockStatus: 'In Stock',
    stockQty: 2400,
    unitPriceWholesaleEur: 6.2,
  });

  // Item 6: Inverter
  const inverterKw = Math.max(Math.ceil(kwp), 6);
  items.push({
    sku: `INV-HYB-${inverterKw}K-3P`,
    description: `3-Phase Hybrid Inverter ${inverterKw}kW with Integrated Smart Energy Management`,
    qty: 1,
    unit: 'Unit',
    category: 'electrical',
    stockStatus: 'In Stock (PV-Lager Hub)',
    stockQty: 145,
    unitPriceWholesaleEur: inverterKw * 110 + 650,
  });

  // Item 7: Wallbox (Optional)
  if (config.wallbox) {
    const isV2X = config.wallboxType === 'v2x';
    items.push({
      sku: isV2X ? 'EV-WB-V2X-22KW-ISO' : 'EV-WB-11KW-STD-RFID',
      description: isV2X
        ? '22kW Bidirectional DC V2X Wallbox (ISO 15118-20 Compliant, Vehicle-to-Grid)'
        : '11kW Smart AC Wallbox with RFID & Solar Excess Charging (Überschussladen)',
      qty: 1,
      unit: 'Unit',
      category: 'electrical',
      stockStatus: 'In Stock',
      stockQty: 85,
      unitPriceWholesaleEur: isV2X ? 1150 : 590,
    });
  }

  // Item 8: Battery Storage (Optional)
  if (config.battery) {
    const batteryCapacity = parseInt(config.batterySize, 10) || 15;
    items.push({
      sku: `BAT-LFP-${batteryCapacity}K-HV`,
      description: `${batteryCapacity}kWh High-Voltage LiFePO4 Battery Storage Tower (6000+ Cycles)`,
      qty: 1,
      unit: 'Cabinet',
      category: 'storage',
      stockStatus: 'In Stock (Seesen Warehouse)',
      stockQty: 38,
      unitPriceWholesaleEur: batteryCapacity * 290,
    });
  }

  // Item 9: Integrated LED Strip Channels (Optional)
  if (config.ledLighting) {
    items.push({
      sku: 'LED-PRO-IP67-RAL',
      description: 'Integrated IP67 Motion-Sensing Warm-White LED Profile Channels (4000K)',
      qty: postCount * 2,
      unit: 'Meters',
      category: 'addon',
      stockStatus: 'In Stock',
      stockQty: 650,
      unitPriceWholesaleEur: 28,
    });
  }

  // Weights & Logistics Calculations
  const postWeight = config.material === 'aluminum' ? 38 : 65;
  const purlinWeight = 11;
  const moduleWeight = 24.5;
  const inverterWeight = 28;
  const wallboxWeight = config.wallbox ? 12 : 0;
  const batteryWeight = config.battery ? (parseInt(config.batterySize, 10) || 15) * 9 : 0;

  const totalWeightKg = Math.round(
    postCount * postWeight +
    purlinCount * purlinWeight +
    moduleCount * moduleWeight +
    inverterWeight +
    wallboxWeight +
    batteryWeight +
    35 // Misc hardware & anchors
  );

  const estimatedPallets = Math.ceil(totalWeightKg / 450);
  const wholesaleNetSubtotalEur = items.reduce((sum, item) => sum + item.qty * item.unitPriceWholesaleEur, 0);

  return {
    items,
    kwp,
    moduleCount,
    postCount,
    purlinCount,
    clampCount,
    totalWeightKg,
    estimatedPallets,
    wholesaleNetSubtotalEur,
    seesenDispatchLeadDays: 3,
    snowLoadCapacityKnM2: 2.5,
    windLoadCapacityKmH: 150,
  };
}
