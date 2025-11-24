/**
 * ProtectedRoute - Simplified Authentication Guard
 * 
 * Uses the global AuthProvider for authentication state.
 * No duplicate session checks, no manual redirects.
 * 
 * Features:
 * - Uses centralized auth state from AuthProvider
 * - Shows loading screen while checking auth
 * - Redirects to /auth if not authenticated
 * - Renders children if authenticated
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we're done loading and there's no user
    if (!loading && !user) {
      console.log('ProtectedRoute: No user found, redirecting to /auth');
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  // Show loading screen while checking authentication
  if (loading) {
    return <LuxuryLoadingScreen />;
  }

  // Show loading screen while redirecting
  if (!user) {
    return <LuxuryLoadingScreen />;
  }

  // User is authenticated, render protected content
  return <>{children}</>;
}
