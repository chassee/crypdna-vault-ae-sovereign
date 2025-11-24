import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';

/**
 * AuthCallback - Processes Supabase auth callback ONCE
 * 
 * Rules:
 * 1. Process session ONCE per mount
 * 2. Redirect to /vault or /auth ONCE
 * 3. NO loops, NO re-execution
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Guard: Only process callback ONCE per mount
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const handleAuthCallback = async () => {
      try {
        // Supabase automatically processes the auth hash
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthCallback session error:', error);
          navigate('/auth', { replace: true });
          return;
        }

        if (session) {
          // Session established - redirect to vault ONCE
          console.log('AuthCallback: Session established, redirecting to vault');
          navigate('/vault', { replace: true });
        } else {
          // No session - redirect to auth ONCE
          console.log('AuthCallback: No session, redirecting to auth');
          navigate('/auth', { replace: true });
        }
      } catch (err) {
        console.error('AuthCallback unexpected error:', err);
        navigate('/auth', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <LuxuryLoadingScreen />;
}
