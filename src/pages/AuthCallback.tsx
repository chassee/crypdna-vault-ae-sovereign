import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';

/**
 * AuthCallback - Processes Supabase auth callback ONCE
 * 
 * Rules:
 * 1. Process session ONCE per mount with proper hydration wait
 * 2. Redirect to /vault or /auth ONCE using window.location.hash
 * 3. NO loops, NO re-execution
 * 
 * FIX: Use window.location.hash instead of React Router navigate
 */
export default function AuthCallback() {
  const hasProcessed = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      // ✅ FIX: Guard using useRef that persists across renders
      if (hasProcessed.current) {
        console.log('AuthCallback: Already processed, skipping');
        return;
      }
      hasProcessed.current = true;
      console.log('AuthCallback: Processing auth callback...');

      try {
        // ✅ FIX: Wait for Supabase to process the hash and persist session
        await new Promise(resolve => setTimeout(resolve, 800));

        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('AuthCallback error:', error);
          window.location.hash = '/auth';  // ✅ USE window.location.hash
          return;
        }

        if (session) {
          console.log('AuthCallback: Session established, redirecting to vault');
          
          // ✅ FIX: Add another small delay to ensure session is persisted
          await new Promise(resolve => setTimeout(resolve, 300));
          
          window.location.hash = '/vault';  // ✅ USE window.location.hash
        } else {
          console.log('AuthCallback: No session found, redirecting to auth');
          window.location.hash = '/auth';  // ✅ USE window.location.hash
        }
      } catch (err) {
        console.error('AuthCallback unexpected error:', err);
        window.location.hash = '/auth';  // ✅ USE window.location.hash
      }
    };

    handleCallback();
  }, []);

  return <LuxuryLoadingScreen />;
}
