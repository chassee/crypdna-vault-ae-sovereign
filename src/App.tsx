import { HashRouter, Routes, Route } from "react-router-dom";
import { RegionProvider } from "./contexts/RegionContext";
import VaultDashboard from "./pages/VaultDashboard";
import Auth from "./pages/Auth";
import Reset from "./pages/Reset";

export default function App() {
  return (
    <RegionProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<VaultDashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/vault" element={<VaultDashboard />} />
        </Routes>
      </HashRouter>
    </RegionProvider>
  );
}
