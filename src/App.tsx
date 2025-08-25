import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './integrations/supabase/client';

import VaultDashboard from './pages/VaultDashboard';
import AuthPage from './pages/Auth';    // your billionaire login screen
import ResetPage from './pages/Reset';  // new reset password flow
import NotFound from './pages/NotFound';

// Protected wrapper: only shows children if user is logged in
function Protected({ children }: { children: JSX.Element }) {
  const [ok, setOk] = useState(false);
  const [ready, setReady] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const loggedIn = !!data.session;
      setOk(loggedIn);
      setReady(true);
      if (!loggedIn) nav('/auth'); // kick out if not logged in
    });
  }, [nav]);

  if (!ready) return null; // could show spinner here
  return ok ? children : null;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* redirect root to /auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* auth + reset */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reset" element={<ResetPage />} />

        {/* protected vault */}
        <Route
          path="/vault"
          element={
            <Protected>
              <VaultDashboard />
            </Protected>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}
