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

      // Check if user is a paid customer
      const { data: paidCustomer } = await supabase
        .from('paid_customers')
        .select('email')
        .eq('email', session.user.email.toLowerCase())
        .single();

      if (paidCustomer) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}