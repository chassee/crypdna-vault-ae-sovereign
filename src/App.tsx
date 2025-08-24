// src/App.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import VaultDashboard from '@/pages/VaultDashboard'; // ✅ lives in /src/pages
import Auth from '@/pages/Auth';

type SBUser = {
  id: string;
  email?: string;
};

export default function App() {
  const [user, setUser] = useState<SBUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!alive) return;
      setUser((data?.user as SBUser) ?? null);
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user as SBUser) ?? null);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;           // (optional) add a LoadingScreen here
  if (!user) return <Auth />;         // unauth → Auth
  return <VaultDashboard />;          // auth → Vault
}
