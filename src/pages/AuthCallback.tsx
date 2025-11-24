import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';

export default function AuthCallback() {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Only process callback ONCE per mount - prevent redirect loops
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL hash (Supabase automatically processes it)
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          // Redirect to auth on error - ONLY ONCE
          navigate('/auth', { replace: true });
          return;
        }

        if (session) {
          // Session established successfully - redirect to vault - ONLY ONCE
          console.log('Session established, redirecting to vault');
          navigate('/vault', { replace: true });
        } else {
          // No session found - redirect to auth - ONLY ONCE
          console.log('No session found, redirecting to auth');
          navigate('/auth', { replace: true });
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err);
        // Redirect to auth on exception - ONLY ONCE
        navigate('/auth', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <LuxuryLoadingScreen />;
}
