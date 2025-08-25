import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './integrations/supabase/client';

import VaultDashboard from './pages/VaultDashboard';
import AuthPage from './pages/Auth';    
import ResetPage from './pages/Reset';  
import NotFound from './pages/NotFound';

// Protects /vault route so only logged-in users can see it
function Protected({ children }: { children: JSX.Element }) {
  const [ok, setOk] = useState(false);
  const [ready, setReady] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const loggedIn = !!data.session;
      setOk(loggedIn);
      setReady(true);
      if (!loggedIn) nav('/auth');
    });
  }, [nav]);

  if (!ready) return null; 
  return ok ? children : null;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* always send root → /auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* login + signup */}
        <Route path="/auth" element={<AuthPage />} />

        {/* password reset */}
        <Route path="/reset" element={<ResetPage />} />

        {/* vault (protected) */}
        <Route
          path="/vault"
          element={
            <Protected>
              <VaultDashboard />
            </Protected>
          }
        />

        {/* everything else → /auth */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}
