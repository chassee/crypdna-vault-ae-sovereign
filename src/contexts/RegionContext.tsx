import React, { createContext, useContext, useEffect, useState } from 'react';
import { RegionConfig, getRegionConfig, detectRegion } from '@/config/regions';

interface RegionContextType {
  region: RegionConfig;
  regionCode: string;
  isLoading: boolean;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [regionCode, setRegionCode] = useState<string>('us');
  const [region, setRegion] = useState<RegionConfig>(getRegionConfig('us'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect region from hostname at runtime
    const detectedRegion = detectRegion();
    setRegionCode(detectedRegion);
    setRegion(getRegionConfig(detectedRegion));
    setIsLoading(false);

    // Apply RTL if needed
    if (getRegionConfig(detectedRegion).rtl) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, []);

  return (
    <RegionContext.Provider value={{ region, regionCode, isLoading }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}
