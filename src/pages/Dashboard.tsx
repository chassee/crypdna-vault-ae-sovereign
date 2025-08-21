import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    nav('/', { replace: true });
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Vault</h1>
      <p>Welcome {email ?? 'member'}.</p>
      {/* TODO: wire subscription status -> show gates/features here */}
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}
