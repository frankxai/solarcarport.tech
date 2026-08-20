'use client';

import React, { useState, useEffect } from 'react';
import { StandaloneConfigurator } from './StandaloneConfigurator';
import { TenantConfig } from '@/types/tenant';
import { getTenantConfig } from '@/data/mockTenants';

export interface SolarCarportEmbedProps {
  tenantId?: string;
  theme?: 'dark' | 'light';
  customColor?: string;
  companyName?: string;
  className?: string;
}

/**
 * SolarCarportEmbed - Modern React / Next.js Component for embedding 
 * the white-label Solar Carport Configurator widget directly into any web application.
 */
export const SolarCarportEmbed: React.FC<SolarCarportEmbedProps> = ({
  tenantId = 'default',
  theme = 'dark',
  customColor,
  companyName,
  className = '',
}) => {
  const [tenant, setTenant] = useState<TenantConfig>(() => {
    const base = getTenantConfig(tenantId);
    return {
      ...base,
      branding: {
        ...base.branding,
        ...(customColor ? { primaryColor: customColor } : {}),
        ...(companyName ? { companyName } : {}),
      },
    };
  });

  useEffect(() => {
    const base = getTenantConfig(tenantId);
    setTenant({
      ...base,
      branding: {
        ...base.branding,
        ...(customColor ? { primaryColor: customColor } : {}),
        ...(companyName ? { companyName } : {}),
      },
    });
  }, [tenantId, customColor, companyName]);

  return (
    <div className={`solarcarport-embed-container ${className}`}>
      <StandaloneConfigurator tenant={tenant} isEmbedded={true} />
    </div>
  );
};

export default SolarCarportEmbed;
