import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from '@/pages/Auth';
import Reset from '@/pages/Reset';
import VaultDashboard from '@/pages/VaultDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Default → /auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* Auth + Reset */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset" element={<Reset />} />

        {/* Protected Vault Route */}
        <Route
          path="/vault"
          element={
            <ProtectedRoute>
              <VaultDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </HashRouter>
  );
}
