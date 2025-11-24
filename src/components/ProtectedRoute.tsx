import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute - THE ONLY COMPONENT THAT REDIRECTS TO /auth
 * 
 * Rules:
 * 1. Check session ONCE per mount
 * 2. If no session → redirect to /auth ONCE
 * 3. If session exists → render children
 * 4. NO repeated checks, NO loops, NO re-renders
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const hasChecked = useRef(false);

  useEffect(() => {
    // Guard: Only check session ONCE per mount
    if (hasChecked.current) return;
    hasChecked.current = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('ProtectedRoute session check error:', error);
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(!!session);
      } catch (err) {
        console.error('ProtectedRoute unexpected error:', err);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  // Loading state - show loading screen
  if (isAuthenticated === null) {
    return <LuxuryLoadingScreen />;
  }

  // Not authenticated - redirect to /auth (ONLY ONCE)
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Authenticated - render protected content
  return <>{children}</>;
}
