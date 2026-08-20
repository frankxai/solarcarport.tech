import { NextRequest, NextResponse } from 'next/server';
import { calculateRialBOM } from '@/lib/bomCalculator';
import { getTenantConfig } from '@/data/mockTenants';
import { LeadSubmissionPayload, LeadSubmissionResponse } from '@/types/tenant';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LeadSubmissionPayload;
    const { tenantId, customer, config, pricing, project } = body;

    if (!customer?.name || !customer?.email || !customer?.phone) {
      return NextResponse.json(
        { success: false, error: 'Name, E-Mail und Telefonnummer sind Pflichtfelder.' },
        { status: 400 }
      );
    }

    const tenant = getTenantConfig(tenantId);
    const bomResult = calculateRialBOM(config);

    // Simulated lead ID
    const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}`;

    // Server-side logging for Dual-Payload Architecture
    console.log('═════════════════════════════════════════════════════════════════');
    console.log(`[WHITE-LABEL EMBED LEAD CAPTURED]: ${leadId}`);
    console.log(`Contractor / Tenant: ${tenant.branding.companyName} (${tenantId})`);
    console.log(`Homeowner: ${customer.name} | ${customer.email} | ${customer.phone}`);
    console.log(`Postcode / Location: ${customer.postcode || project.postcode} | Timeline: ${customer.timeline || project.timeline}`);
    console.log(`System: ${config.category.toUpperCase()} | ${bomResult.kwp} kWp | ${config.spots} Spots`);
    console.log(`Calculated Customer Price: €${pricing?.totalEur?.toLocaleString('de-DE') || 'N/A'}`);
    console.log('─── RIAL ENERGY WHOLESALE BOM DISPATCH (SEESEN HUB) ───');
    console.log(`Wholesale Value: €${bomResult.wholesaleNetSubtotalEur.toFixed(2)} (Net) | Weight: ${bomResult.totalWeightKg} kg`);
    console.log(`Items (${bomResult.items.length}):`);
    bomResult.items.forEach(i => console.log(`  - [${i.sku}] ${i.description} x ${i.qty} ${i.unit}`));
    console.log('═════════════════════════════════════════════════════════════════');

    const responsePayload: LeadSubmissionResponse = {
      success: true,
      leadId,
      message: `Ihre unverbindliche Planung wurde erfolgreich an ${tenant.branding.companyName} übermittelt. Ein Fachberater meldet sich innerhalb von 24 Stunden mit Ihrer individuellen Statik- und Baugenehmigungsprüfung.`,
      bomSummary: {
        kwp: bomResult.kwp,
        itemCount: bomResult.items.length,
        totalWeightKg: bomResult.totalWeightKg,
        estimatedDeliveryDays: bomResult.seesenDispatchLeadDays,
      },
    };

    return NextResponse.json(responsePayload, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    });
  } catch (error: any) {
    console.error('Lead processing error in /api/embed/lead:', error);
    return NextResponse.json(
      { success: false, error: 'Interner Verarbeitungsfehler. Bitte versuchen Sie es erneut.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
