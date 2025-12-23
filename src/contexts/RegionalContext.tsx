import { createContext, useContext } from "react";
import { DUBAI } from "@/config/dubai";

const RegionContext = createContext(DUBAI);

export const RegionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RegionContext.Provider value={DUBAI}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
