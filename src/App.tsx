import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "@/pages/Auth";
import Reset from "@/pages/Reset";
import VaultDashboard from "@/pages/VaultDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

import { RegionalProvider } from "@/contexts/RegionalContext";
import { RegionalLuxuryThemeProvider } from "@/components/RegionalLuxuryThemeProvider";

export default function App() {
  return (
    <RegionalProvider>
      <RegionalLuxuryThemeProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<Reset />} />

            <Route
              path="/vault"
              element={
                <ProtectedRoute>
                  <VaultDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vault/*"
              element={
                <ProtectedRoute>
                  <VaultDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </HashRouter>
      </RegionalLuxuryThemeProvider>
    </RegionalProvider>
  );
}
