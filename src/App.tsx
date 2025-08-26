// src/App.tsx
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './integrations/supabase/client';

import VaultDashboard from './pages/VaultDashboard';
import AuthPage from './pages/Auth';
import ResetPage from './pages/Reset';

// ---- Protected route: blocks /vault if no session ----
function Protected({ children }: { children: JSX.Element }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    let alive = true;

    // initial session check
    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setAuthed(!!data.session);
      setReady(true);
    });

    // react to future auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
      if (session) nav('/vault', { replace: true });
    });

    return () => {
      alive = false;
      sub?.subscription.unsubscribe();
    };
  }, [nav]);

  if (!ready) return null;                 // avoid flicker while checking
  if (!authed) return <Navigate to="/auth" replace />;

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* default → auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* public routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reset" element={<ResetPage />} />

        {/* private vault */}
        <Route
          path="/vault"
          element={
            <Protected>
              <VaultDashboard />
            </Protected>
          }
        />

        {/* catch-all */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}
