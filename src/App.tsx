// src/App.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import VaultDashboard from './pages/VaultDashboard';
import Auth from './pages/Auth';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setUser(s?.user ?? null)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) return null;    // (optional) show a loading screen here
  if (!user) return <Auth />; // not logged in → Auth

  return <VaultDashboard />;  // logged in → Vault
}
