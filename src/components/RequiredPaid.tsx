// src/components/RequirePaid.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// use the envs you set in Netlify
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export default function RequirePaid({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.email) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      // look up membership row by email (case-insensitive)
      const { data, error } = await supabase
        .from('memberships')
        .select('is_active')
        .ilike('email', session.user.email.toLowerCase())
        .maybeSingle();

      if (error) console.error('membership check error', error);

      setAllowed(!!data?.is_active);
      setLoading(false);
    })();
  }, []);

  if (loading) return null; // or a spinner
  if (!allowed) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}
