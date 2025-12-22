/**
 * Regional Configuration Context
 * Provides regional config, region code, and UI accent to all components
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  RegionalConfig,
  initializeRegionalConfig,
  detectRegion,
} from '@/lib/regionConfig';

interface RegionalContextType {
  config: RegionalConfig | null;
  region: string;
  accentClass: string;
  loading: boolean;
}

/**
 * 🔥 SINGLE SOURCE OF TRUTH FOR UI ACCENTS
 * Add all 28+ regions here
 */
const REGIONAL_ACCENT_MAP: Record<string, string> = {
  global: 'luxury-purple',

  us: 'luxury-blue',
  co: 'luxury-emerald',
  ae: 'luxury-gold',
  jp: 'luxury-red',
  fr: 'luxury-indigo',
  de: 'luxury-slate',
  gb: 'luxury-royal',
  it: 'luxury-marble',
  es: 'luxury-crimson',

  br: 'luxury-jade',
  mx: 'luxury-obsidian',
  ca: 'luxury-ice',
  au: 'luxury-sand',
  sg: 'luxury-neon',
  kr: 'luxury-carbon',
  in: 'luxury-saffron',

  sa: 'luxury-emerald-dark',
  za: 'luxury-onyx',
  ng: 'luxury-bronze',
  eg: 'luxury-desert',
  tr: 'luxury-ottoman',

  ru: 'luxury-frost',
  cn: 'luxury-imperial',
  hk: 'luxury-neon-blue',
  tw: 'luxury-jade-light',
  th: 'luxury-gold-light',
  id: 'luxury-volcanic',
};

const RegionalContext = createContext<RegionalContextType>({
  config: null,
  region: 'global',
  accentClass: REGIONAL_ACCENT_MAP.global,
  loading: true,
});

export function useRegionalConfig() {
  return useContext(RegionalContext);
}

interface RegionalProviderProps {
  children: React.ReactNode;
}

export function RegionalProvider({ children }: RegionalProviderProps) {
  const [config, setConfig] = useState<RegionalConfig | null>(null);
  const [region, setRegion] = useState<string>('global');
  const [accentClass, setAccentClass] = useState<string>(REGIONAL_ACCENT_MAP.global);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      setLoading(true);

      const detectedRegion = detectRegion() || 'global';
      setRegion(detectedRegion);

      const regionalConfig = await initializeRegionalConfig();
      setConfig(regionalConfig);

      const accent =
        REGIONAL_ACCENT_MAP[detectedRegion] ?? REGIONAL_ACCENT_MAP.global;
      setAccentClass(accent);

      setLoading(false);
    }

    loadConfig();
  }, []);

  return (
    <RegionalContext.Provider
      value={{
        config,
        region,
        accentClass,
        loading,
      }}
    >
      {children}
    </RegionalContext.Provider>
  );
}
