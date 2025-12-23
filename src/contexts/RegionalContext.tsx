import { createContext, useContext } from "react";
import { DUBAI } from "@/config/dubai";

type RegionalConfig = typeof DUBAI;

const RegionalContext = createContext<RegionalConfig>(DUBAI);

export const RegionalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RegionalContext.Provider value={DUBAI}>
      {children}
    </RegionalContext.Provider>
  );
};

/**
 * Legacy-compatible hook
 * Keeps older components from breaking
 */
export const useRegionalConfig = () => useContext(RegionalContext);
