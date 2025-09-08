import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Props = { children: React.ReactNode };

export default function RequirePaid({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      // must be logged in
      const { data: sess } = await supabase.auth.getSession();
      const email = sess?.session?.user?.email?.toLowerCase();
      if (!email) {
        setAllowed(null); // not logged in
        setLoading(false);
        return;
      }

      // check if user is in memberships table
      const { data, error } = await supabase
        .from('memberships')
        .select('is_active')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error('Membership check failed', error);
        setAllowed(false);
      } else {
        setAllowed(Boolean(data?.is_active));
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Checking membership…</div>;
  if (allowed === null) return <Navigate to="/login" replace />;
  if (allowed === false) return <Navigate to="/checkout" replace />;
  return <>{children}</>;
}
