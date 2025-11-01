import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from '@/pages/Auth';
import Reset from '@/pages/Reset';
import VaultDashboard from '@/pages/VaultDashboard';
import GuestLandingScreen from '@/vault_experience_layers/guest_mode_v1/GuestLandingScreen';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/vault" element={<VaultDashboard />} />

        {/* ✅ Guest Mode Entry Route */}
        <Route path="/guest" element={<GuestLandingScreen />} />

        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </HashRouter>
  );
}
