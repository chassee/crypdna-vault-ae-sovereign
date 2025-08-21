import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

import Auth from '@/pages/Auth';
import VaultDashboard from '@/pages/VaultDashboard';
import Reset from '@/pages/Reset';
import NotFound from '@/pages/NotFound';

function Protected({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [canAccess, setCanAccess] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    let alive = true;

    const check = async () => {
      try {
        // 1) must be logged in
        const { data: { session } } = await supabase.auth.getSession();
        if (!alive) return;

        if (!session) {
          setCanAccess(false);
          setLoading(false);
          return;
        }

        // 2) must be a paid member
        const { data, error } = await supabase
          .from('profiles')
          .select('is_member')
          .eq('id', session.user.id)
          .single();

        if (!alive) return;

        if (error) {
          console.error('[profiles gate]', error);
          setCanAccess(false);
        } else {
          setCanAccess(!!data?.is_member);
        }
      } finally {
        if (alive) setLoading(false);
      }
    };

    // initial + keep fresh on auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => check());
    check();

    return () => {
      alive = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, [loc.pathname]);

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!canAccess) return <Navigate to="/" replace state={{ from: loc }} />;
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
            <VaultDashboard />
          </Protected>
        }
      />
      <Route path="/reset" element={<Reset />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
