import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import LoadingScreen from '@/components/LoadingScreen';

interface RequirePaidProps {
  children: React.ReactNode;
}

const RequirePaid: React.FC<RequirePaidProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user?.email) {
          setIsPaid(false);
          setLoading(false);
          return;
        }

        // Check if this email exists in the memberships table
        const { data, error } = await supabase
          .from('memberships')
          .select('is_active')
          .eq('email', session.user.email.toLowerCase())
          .maybeSingle();

        if (error) {
          console.error('Error checking membership:', error);
          setIsPaid(false);
        } else {
          setIsPaid(!!data?.is_active);
        }
      } catch (err) {
        console.error('Membership check failed:', err);
        setIsPaid(false);
      } finally {
        setLoading(false);
      }
    };

    checkMembership();
  }, []);

  if (loading) return <LoadingScreen />;

  // Not paid? Send to checkout
  if (!isPaid) {
    return <Navigate to="/checkout" replace />;
  }

  return <>{children}</>;
};

export default RequirePaid;
