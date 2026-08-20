import { NextRequest, NextResponse } from 'next/server';
import { getTenantConfig } from '@/data/mockTenants';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('tenantId') || 'default';
  const customColor = searchParams.get('color');
  const customCompany = searchParams.get('companyName');

  const baseConfig = getTenantConfig(tenantId);

  // Apply query-param overrides if present (e.g. from live preview playground)
  const config = {
    ...baseConfig,
    branding: {
      ...baseConfig.branding,
      ...(customColor ? { primaryColor: customColor } : {}),
      ...(customCompany ? { companyName: customCompany } : {}),
    },
  };

  return NextResponse.json({
    success: true,
    tenant: config,
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    }
  });
}
