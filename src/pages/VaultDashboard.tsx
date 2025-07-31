import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';
import { LuxuryThemeProvider } from '@/components/LuxuryThemeProvider';
import LuxuryDebitCard from '@/components/LuxuryDebitCard';
import LuxuryTierBadge from '@/components/LuxuryTierBadge';
import BalanceBreakdown from '@/components/BalanceBreakdown';
import VaultVerification from '@/components/VaultVerification';
import CreditActivity from '@/components/CreditActivity';
import { LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/LuxuryThemeProvider';

const VaultDashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate('/vault-login');
        } else {
          // Fetch user profile data after authentication
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate('/vault-login');
      } else {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        console.error('Error fetching user profile:', userError);
        return;
      }

      setUserProfile(userData);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out.",
        });
        navigate('/vault-login');
      }
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during sign out.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <LuxuryLoadingScreen />;
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const vaultId = userProfile?.vault_id || 'VAULT-LOADING...';
  const userName = userProfile?.name || user.email?.split('@')[0] || 'Member';
  const userTier = userProfile?.tier || 'Viewer';

  return (
    <div className="min-h-screen bg-background luxury-transition">
      {/* Luxury Header */}
      <div className="luxury-card border-b sticky top-0 z-40 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
                CrypDNA Vault
              </h1>
              <LuxuryTierBadge tier={userTier} />
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className="luxury-transition"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="luxury-button"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-12">
        {/* Welcome Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl font-bold">Welcome back, {userName}</h2>
          <p className="text-muted-foreground text-lg">
            Vault ID: <span className="font-mono text-luxury-purple">{vaultId}</span>
          </p>
        </div>

        {/* Luxury Debit Card Section */}
        <div className="animate-scale-in">
          <LuxuryDebitCard 
            userName={userName}
            vaultId={vaultId}
          />
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8 animate-slide-up">
            <BalanceBreakdown />
            <VaultVerification />
          </div>
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CreditActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

const WrappedVaultDashboard = () => (
  <LuxuryThemeProvider>
    <VaultDashboard />
  </LuxuryThemeProvider>
);

export default WrappedVaultDashboard;