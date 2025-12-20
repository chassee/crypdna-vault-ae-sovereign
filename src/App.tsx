import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from '@/pages/Auth';
import Reset from '@/pages/Reset';
import VaultDashboard from '@/pages/VaultDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function App() {
  return (
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
        {/* Catch-all redirects to auth - prevents URL bypass attempts */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </HashRouter>
  );
}
