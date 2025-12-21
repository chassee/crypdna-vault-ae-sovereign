/**
 * Regional Configuration Context
 * Provides regional config and theme to all components
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
  loading: boolean;
}

const RegionalContext = createContext<RegionalContextType>({
  config: null,
  region: 'us',
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
  const [region, setRegion] = useState<string>('us');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      setLoading(true);
      const detectedRegion = detectRegion();
      setRegion(detectedRegion);
      
      const regionalConfig = await initializeRegionalConfig();
      setConfig(regionalConfig);
      setLoading(false);
    }

    loadConfig();
  }, []);

  return (
    <RegionalContext.Provider value={{ config, region, loading }}>
      {children}
    </RegionalContext.Provider>
  );
}
