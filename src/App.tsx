import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from '@/pages/Auth';
import Reset from '@/pages/Reset';
import VaultDashboard from '@/pages/VaultDashboard';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Default → /auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* Auth + Reset */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset" element={<Reset />} />

        {/* Vault (no other dashboards/components, no landing page) */}
        <Route path="/vault" element={<VaultDashboard />} />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </HashRouter>
  );
}
