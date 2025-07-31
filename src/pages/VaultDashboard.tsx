import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';
import { LuxuryThemeProvider } from '@/components/LuxuryThemeProvider';
import PawDebitCard from '@/components/PawDebitCard';
import LuxuryTierBadge from '@/components/LuxuryTierBadge';
import BalanceBreakdown from '@/components/BalanceBreakdown';
import VaultVerification from '@/components/VaultVerification';
import CreditActivity from '@/components/CreditActivity';
import VaultProducts from '@/components/VaultProducts';
import VaultDrops from '@/components/VaultDrops';
import VaultFutureTech from '@/components/VaultFutureTech';
import CrypbotsTab from '@/components/tabs/CrypbotsTab';
import NeuroTechTab from '@/components/tabs/NeuroTechTab';
import DropCountdown from '@/components/DropCountdown';
import MobileFloatingNav from '@/components/MobileFloatingNav';
import { LogOut, Moon, Sun, Wallet, Package, Rocket, Brain, Waves, Zap } from 'lucide-react';
import { useTheme } from '@/components/LuxuryThemeProvider';
import { useIsMobile } from '@/hooks/use-mobile';

const VaultDashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('balances');
  const isMobile = useIsMobile();

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

        {/* Paw Debit Card Section */}
        <div className="animate-scale-in">
          <PawDebitCard 
            userName={userName}
            vaultId={vaultId}
            crypDnaScore={750}
          />
        </div>

        {/* Drop Countdowns */}
        <DropCountdown />

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {!isMobile && (
            <TabsList className="grid w-full grid-cols-6 luxury-card border-purple-500/20 bg-gradient-to-r from-black/50 to-gray-900/50 backdrop-blur-xl">
              <TabsTrigger 
                value="balances" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-gray-800/50 relative group"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Balances</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
              </TabsTrigger>
              <TabsTrigger 
                value="products" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-gray-800/50 relative group"
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Products</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
              </TabsTrigger>
              <TabsTrigger 
                value="drops" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-gray-800/50 relative group"
              >
                <Rocket className="w-4 h-4" />
                <span className="hidden sm:inline">Drops</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
              </TabsTrigger>
              <TabsTrigger 
                value="crypbots" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-gray-800/50 relative group"
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">Crypb0ts</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
              </TabsTrigger>
              <TabsTrigger 
                value="neurotech" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white luxury-transition hover:bg-gray-800/50 relative group"
              >
                <Waves className="w-4 h-4" />
                <span className="hidden sm:inline">NeuroTech</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
              </TabsTrigger>
              <TabsTrigger 
                value="future-tech" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-gray-800/50 relative group"
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Future Tech</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
              </TabsTrigger>
            </TabsList>
          )}

          <div className="mt-8">
            <TabsContent value="balances" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8 animate-slide-up">
                  <BalanceBreakdown />
                  <VaultVerification />
                </div>
                <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <CreditActivity />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products" className="animate-fade-in">
              <VaultProducts />
            </TabsContent>

            <TabsContent value="drops" className="animate-fade-in">
              <VaultDrops />
            </TabsContent>

            <TabsContent value="crypbots" className="animate-fade-in">
              <CrypbotsTab />
            </TabsContent>

            <TabsContent value="neurotech" className="animate-fade-in">
              <NeuroTechTab />
            </TabsContent>

            <TabsContent value="future-tech" className="animate-fade-in">
              <VaultFutureTech />
            </TabsContent>
          </div>
        </Tabs>

        {/* Mobile Floating Navigation */}
        <MobileFloatingNav activeTab={activeTab} onTabChange={setActiveTab} />
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