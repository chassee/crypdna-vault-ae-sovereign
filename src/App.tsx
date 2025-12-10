import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from '@/pages/Auth';
import Reset from '@/pages/Reset';
import VaultDashboard from '@/pages/VaultDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VaultDashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/vault" element={<VaultDashboard />} />
        <Route path="/vault/*" element={<VaultDashboard />} />
        <Route path="*" element={<VaultDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
