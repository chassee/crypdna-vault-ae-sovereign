import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "@/pages/Auth";
import Reset from "@/pages/Reset";
import VaultDashboard from "@/pages/VaultDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { RegionalProvider } from "@/contexts/RegionalContext";
import { DubaiTheme } from "@/theme/dubai";

export default function App() {
  return (
    <RegionalProvider>
      {/* Global Dubai Luxury Shell */}
      <div
        style={{
          minHeight: "100vh",
          background: DubaiTheme.background,
          color: DubaiTheme.text,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <HashRouter>
          <Routes>
            {/* Entry */}
            <Route path="/" element={<Navigate to="/auth" replace />} />

            {/* Auth */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<Reset />} />

            {/* Vault */}
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

            {/* Security catch-all */}
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </HashRouter>
      </div>
    </RegionalProvider>
  );
}
