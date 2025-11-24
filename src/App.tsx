import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/components/AuthProvider';
import Auth from '@/pages/Auth';
import Reset from '@/pages/Reset';
import AuthCallback from '@/pages/AuthCallback';
import VaultDashboard from '@/pages/VaultDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/reset-password" element={<Reset />} />
          
          {/* Protected routes - require authentication */}
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
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
