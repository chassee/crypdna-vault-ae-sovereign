/**
 * Regional Luxury Theme Provider
 * Extends the base ThemeProvider with regional accent colors and theming
 */

import React, { useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useRegionalConfig } from '@/contexts/RegionalContext';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';

interface RegionalLuxuryThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'dark' | 'light' | 'system';
  storageKey?: string;
}

export function RegionalLuxuryThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
}: RegionalLuxuryThemeProviderProps) {
  const { config, region, loading } = useRegionalConfig();

  useEffect(() => {
    if (config) {
      // Log regional theme activation
      console.log(`🎨 Regional Theme Active: ${config.region}`);
      console.log(`   Palette: ${config.aesthetic.palette}`);
      console.log(`   Accent: ${config.accentColor}`);
      console.log(`   Currency: ${config.currencySymbol}${config.currency}`);
    }
  }, [config]);

  // Show loading screen while regional config loads
  if (loading) {
    return <LuxuryLoadingScreen />;
  }

  return (
    <ThemeProvider defaultTheme={defaultTheme} storageKey={storageKey}>
      <div 
        className="regional-vault-wrapper"
        data-region={region}
        data-palette={config?.aesthetic.palette || 'default'}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
