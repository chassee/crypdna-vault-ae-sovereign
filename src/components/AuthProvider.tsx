import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

interface UserProfile {
  user_id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: UserProfile | null;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const listenerInitialized = useRef(false);

  const fetchUserProfile = async (userId: string) => {
    if (!userId) return setUserProfile(null);

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!error) setUserProfile(data);
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      await new Promise(r => setTimeout(r, 100));
      const { data: { session: initialSession } } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(initialSession);
      setUser(initialSession?.user ?? null);

      if (initialSession?.user) {
        await fetchUserProfile(initialSession.user.id);
      }

      setLoading(false);
    };

    const setupListener = () => {
      if (listenerInitialized.current) return;
      listenerInitialized.current = true;

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, newSession) => {
          if (!mounted) return;
          setSession(newSession);
          setUser(newSession?.user ?? null);
          if (newSession?.user) fetchUserProfile(newSession.user.id);
          else setUserProfile(null);
        }
      );

      return subscription;
    };

    initializeAuth();
    const subscription = setupListener();

    return () => {
      mounted = false;
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserProfile(null);
    window.location.hash = '/auth';
  };

  const refreshProfile = async () => {
    if (user?.id) fetchUserProfile(user.id);
  };

  return (
    <AuthContext.Provider value={{
      user, session, loading, userProfile,
      signOut: handleSignOut,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
