import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute - THE ONLY COMPONENT THAT REDIRECTS TO /auth
 * 
 * Rules:
 * 1. Check session ONCE per mount with proper hydration wait
 * 2. If no session → redirect to /auth ONCE using window.location.hash
 * 3. If session exists → render children
 * 4. NO repeated checks, NO loops, NO re-renders
 * 
 * FIX: Use window.location.hash instead of React Router Navigate
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const hasChecked = useRef(false);

  useEffect(() => {
    const checkSession = async () => {
      // ✅ FIX: Guard using useRef that persists across renders
      if (hasChecked.current) {
        console.log('ProtectedRoute: Session already checked, skipping');
        return;
      }
      hasChecked.current = true;
      console.log('ProtectedRoute: Checking session...');

      try {
        // ✅ FIX: Add small delay to ensure session is hydrated from localStorage
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('ProtectedRoute session error:', error);
          setIsAuthenticated(false);
          window.location.hash = '/auth';  // ✅ USE window.location.hash
          return;
        }
        
        console.log('ProtectedRoute session check:', session ? 'AUTHENTICATED' : 'NOT AUTHENTICATED');
        
        if (!session) {
          setIsAuthenticated(false);
          console.log('ProtectedRoute: No session, redirecting to /auth');
          window.location.hash = '/auth';  // ✅ USE window.location.hash
        } else {
          setIsAuthenticated(true);
          console.log('ProtectedRoute: Session valid, rendering protected content');
        }
      } catch (err) {
        console.error('ProtectedRoute unexpected error:', err);
        setIsAuthenticated(false);
        window.location.hash = '/auth';  // ✅ USE window.location.hash
      }
    };

    checkSession();
  }, []);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return <LuxuryLoadingScreen />;
  }

  // If not authenticated, show loading (redirect will happen)
  if (!isAuthenticated) {
    return <LuxuryLoadingScreen />;
  }

  // Render protected content
  return <>{children}</>;
}
