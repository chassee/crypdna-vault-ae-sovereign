import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthWrapper from '@/pages/AuthWrapper';
import ResetWrapper from '@/pages/ResetWrapper';
import VaultWrapper from '@/pages/VaultWrapper';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthWrapper />} />
        <Route path="/reset" element={<ResetWrapper />} />
        <Route path="/vault" element={<VaultWrapper />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </HashRouter>
  );
}