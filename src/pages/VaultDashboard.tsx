import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';
import TabsPanel from '@/components/TabsPanel';

/**
 * VaultDashboard - ZERO REDIRECTS
 * 
 * Rules:
 * 1. NO navigate() calls - ProtectedRoute handles auth redirects
 * 2. Only load session and user data
 * 3. Display loading states cleanly
 * 4. Let ProtectedRoute handle authentication
 */
export default function VaultDashboard() {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [kycData, setKycData] = useState<any>({});
  const [verificationData, setVerificationData] = useState<any>({});
  const [balances, setBalances] = useState({
    available: 0,
    pending: 0,
    card: 0
  });

  // ---- Auth Wiring ---- (NO REDIRECTS - ProtectedRoute handles all auth)
  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!isMounted) return;

        if (error) {
          console.error('VaultDashboard session error:', error);
          setLoading(false);
          return;
        }
        
        setSession(session ?? null);
        const initialUser = session?.user ?? null;
        setUser(initialUser);
        
        if (initialUser) {
          await fetchUserProfile(initialUser.id);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('VaultDashboard unexpected error:', err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSession();

    // Listen for auth changes (NO REDIRECTS - just update state)
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return;
      
      setSession(nextSession ?? null);
      const nextUser = nextSession?.user ?? null;
      setUser(nextUser);
      
      if (nextUser) {
        void fetchUserProfile(nextUser.id);
      }
    });

    return () => {
      isMounted = false;
      data?.subscription?.unsubscribe();
    };
  }, []);

  // ---- Fetch User Profile ----
  async function fetchUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();

      setUserProfile(data || {});

      if (error && error.code !== 'PGRST116') {
        console.error('fetchUserProfile error:', error);
        return;
      }
    } catch (e) {
      console.error('fetchUserProfile exception:', e);
    }
  }

  // ---- Fetch Vault + KYC Data ----
  async function fetchVaultData() {
    try {
      const { data: kyc, error: kycError } = await supabase.rpc('get_vault_kyc');
      const { data: verification, error: verError } = await supabase.rpc('get_vault_verification');

      if (kycError) console.error('get_vault_kyc error:', kycError);
      if (verError) console.error('get_vault_verification error:', verError);

      setKycData(kyc ?? {});
      setVerificationData(verification ?? {});

      if (kyc && kyc[0]) {
        setBalances({
          available: kyc[0].available_balance ?? 0,
          pending: kyc[0].pending_balance ?? 0,
          card: kyc[0].card_balance ?? 0
        });
      }
    } catch (err) {
      console.error('fetchVaultData exception:', err);
    }
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: 'Error', description: 'Failed to sign out. Try again.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Signed out', description: 'You have been signed out.' });
    // Use window.location.hash for logout (safe, non-loop redirect)
    window.location.hash = '/auth';
  }

  if (loading) return <LuxuryLoadingScreen />;
  if (!user) return <LuxuryLoadingScreen />;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <TabsPanel
        user={user}
        userProfile={userProfile}
        kycData={kycData}
        verificationData={verificationData}
        balances={balances}
        onSignOut={handleSignOut}
        onRefresh={fetchVaultData}
      />
    </div>
  );
}
