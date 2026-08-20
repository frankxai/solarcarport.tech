import React from 'react';
import { StandaloneConfigurator } from '@/components/embed/StandaloneConfigurator';
import { getTenantConfig } from '@/data/mockTenants';
import { Metadata } from 'next';

interface EmbedPageProps {
  params: Promise<{ tenantId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: EmbedPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tenant = getTenantConfig(resolvedParams.tenantId);
  return {
    title: `${tenant.branding.companyName} | Solarcarport Konfigurator`,
    description: tenant.branding.tagline || 'Planen Sie Ihren Solarcarport mit 0% MwSt.',
    robots: 'noindex, nofollow',
  };
}

export default async function EmbedPage({ params, searchParams }: EmbedPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const tenantId = resolvedParams.tenantId || 'default';
  const customColor = typeof resolvedSearchParams.color === 'string' ? resolvedSearchParams.color : undefined;
  const customCompany = typeof resolvedSearchParams.companyName === 'string' ? resolvedSearchParams.companyName : undefined;

  const baseTenant = getTenantConfig(tenantId);
  const tenant = {
    ...baseTenant,
    branding: {
      ...baseTenant.branding,
      ...(customColor ? { primaryColor: customColor } : {}),
      ...(customCompany ? { companyName: customCompany } : {}),
    },
  };

  return (
    <main className="min-h-screen bg-transparent p-2 sm:p-4 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <StandaloneConfigurator tenant={tenant} isEmbedded={true} />
      </div>
    </main>
  );
}
