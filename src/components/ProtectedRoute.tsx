import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { validateVaultAuthorization, logUnauthorizedAccess } from '@/lib/auth-security';
import LoadingScreen from '@/components/LoadingScreen';
import LockedVaultScreen from '@/components/LockedVaultScreen';
import { Session, User } from '@supabase/supabase-js';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  showLockedState?: boolean; // Show locked screen vs redirect
}

/**
 * Centralized route protection for the CrypDNA Vault.
 * 
 * SECURITY ENFORCEMENT:
 * - Gates ALL vault routes behind authentication
 * - Validates session using centralized security utilities
 * - Logs unauthorized access attempts safely
 * - Never exposes internal auth logic to unauthorized users
 * 
 * SCALABILITY:
 * - Extensible for future invite systems
 * - Supports admin approval workflows
 * - Compatible with regional vault access control
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/auth',
  showLockedState = true 
}) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!isMounted) return;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    const checkSession = async () => {
      try {
        const { data: { session: existingSession } } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(existingSession);
          setUser(existingSession?.user ?? null);
        }
      } catch (error) {
        // Fail secure - no session on error
        if (isMounted) {
          setSession(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Still loading - show loading screen
  if (loading) {
    return <LoadingScreen />;
  }

  // Validate authorization using centralized security logic
  const authResult = validateVaultAuthorization(session, user);

  if (!authResult.authorized) {
    // Log the unauthorized access attempt safely
    logUnauthorizedAccess('route_access', {
      path: location.pathname,
      timestamp: new Date(),
    });

    // Show locked screen or redirect based on configuration
    if (showLockedState) {
      return <LockedVaultScreen />;
    }

    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // Authorized - render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
