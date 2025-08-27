import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import Auth from '@/pages/Auth';
import Reset from '@/pages/Reset';
import VaultDashboard from '@/pages/VaultDashboard';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/vault" element={<VaultDashboard />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
        <Toaster />
      </HashRouter>
    </ThemeProvider>
  );
}