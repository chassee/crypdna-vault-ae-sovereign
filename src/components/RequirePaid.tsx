import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

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

      // Check vault_members table for user access
      const { data, error } = await supabase
        .from('vault_members')
        .select('status')
        .eq('user_id', session.user.id)
        .eq('status', true)
        .maybeSingle();

      if (error) console.error('membership check error', error);

      setAllowed(!!data?.status);
      setLoading(false);
    })();
  }, []);

  if (loading) return null;
  if (!allowed) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}