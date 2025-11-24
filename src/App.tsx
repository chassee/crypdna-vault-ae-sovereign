import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from '@/pages/Auth';
import Reset from '@/pages/Reset';
import AuthCallback from '@/pages/AuthCallback';
import VaultDashboard from '@/pages/VaultDashboard';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/vault" element={<VaultDashboard />} />
        <Route path="/vault/*" element={<VaultDashboard />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </HashRouter>
  );
}
