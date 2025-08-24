// src/App.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import VaultDashboard from '@/components/VaultDashboard'; // or '@/pages/VaultDashboard' if that's where it lives
import Auth from '@/pages/Auth'; // <-- REQUIRED

type SBUser = {
  id: string;
  email?: string;
};

function App() {
  const [user, setUser] = useState<SBUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const boot = async () => {
      const { data } = await supabase.auth.getUser();
      if (!alive) return;
      setUser((data?.user as SBUser) ?? null);
      setLoading(false);
    };

    // initial
    boot();

    // listen for auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user as SBUser) ?? null);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null; // you can render a LoadingScreen here

  if (!user) return <Auth />;

  return <VaultDashboard />; // 🔒 login → straight to Vault
}

export default App;
