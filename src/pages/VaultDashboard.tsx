import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';
import TabsPanel from '@/components/TabsPanel';

/**
 * VaultDashboard - Uses AuthProvider for auth state
 * 
 * Rules:
 * 1. NO auth state management - AuthProvider handles it
 * 2. NO navigate() calls - ProtectedRoute handles auth redirects
 * 3. Only load vault-specific data (KYC, verification, balances)
 * 4. Display loading states cleanly
 */
export default function VaultDashboard() {
  const { toast } = useToast();
  const { user, userProfile, signOut, loading: authLoading } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [kycData, setKycData] = useState<any>({});
  const [verificationData, setVerificationData] = useState<any>({});
  const [balances, setBalances] = useState({
    available: 0,
    pending: 0,
    card: 0
  });

  // ---- Fetch Vault + KYC Data ----
  useEffect(() => {
    if (user) {
      fetchVaultData();
    }
  }, [user]);

  async function fetchVaultData() {
    try {
      setLoading(true);
      
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
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      toast({ title: 'Signed out', description: 'You have been signed out.' });
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Failed to sign out. Try again.', 
        variant: 'destructive' 
      });
    }
  }

  // Show loading while auth is initializing or vault data is loading
  if (authLoading || loading) {
    return <LuxuryLoadingScreen />;
  }

  // Guard against null user (should never happen due to ProtectedRoute, but TypeScript safety)
  if (!user) {
    return <LuxuryLoadingScreen />;
  }

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
