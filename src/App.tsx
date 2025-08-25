import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VaultDashboard from './pages/VaultDashboard';
import VaultLogin from './pages/VaultLogin';
import VaultSignup from './pages/VaultSignup';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* redirect root to vault */}
        <Route path="/" element={<Navigate to="/vault" replace />} />

        {/* vault */}
        <Route path="/vault" element={<VaultDashboard />} />
        <Route path="/vault-login" element={<VaultLogin />} />
        <Route path="/vault-signup" element={<VaultSignup />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
