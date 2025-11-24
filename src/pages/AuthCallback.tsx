import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/auth', { replace: true });
          return;
        }

        if (session) {
          // Session established successfully, redirect to vault
          console.log('Session established, redirecting to vault');
          navigate('/vault', { replace: true });
        } else {
          // No session found, redirect to auth
          console.log('No session found, redirecting to auth');
          navigate('/auth', { replace: true });
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err);
        navigate('/auth', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <LuxuryLoadingScreen />;
}
