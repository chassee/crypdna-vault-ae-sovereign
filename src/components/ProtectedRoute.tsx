import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const hasChecked = useRef(false);

  useEffect(() => {
    // Only check session once per mount - prevent redirect loops
    if (hasChecked.current) return;
    hasChecked.current = true;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Session check error:', error);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  // Loading state - show loading screen
  if (isAuthenticated === null) {
    return <LuxuryLoadingScreen />;
  }

  // Not authenticated - redirect to auth (ONLY ONCE)
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Authenticated - render protected content
  return <>{children}</>;
}
