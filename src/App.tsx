import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Reset from '@/pages/Reset';
import NotFound from '@/pages/NotFound';

function Protected({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    let mounted = true;

    async function check() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setAuthed(!!data.session);
      setLoading(false);
    }

    // keep session fresh
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    check();

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!authed) return <Navigate to="/" replace state={{ from: loc }} />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route path="/reset" element={<Reset />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
