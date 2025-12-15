import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegionProvider, useRegion } from "./contexts/RegionContext";

import VaultDashboard from "./pages/VaultDashboard";
import Auth from "./pages/Auth";
import Reset from "./pages/Reset";

function AppRoutes() {
  const { isLoading, regionCode } = useRegion();

  if (isLoading) {
    return null; // or loading spinner later
  }

  return (
    <BrowserRouter key={regionCode}>
      <Routes>
        <Route path="/" element={<VaultDashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/vault" element={<VaultDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <RegionProvider>
      <AppRoutes />
    </RegionProvider>
  );
}
