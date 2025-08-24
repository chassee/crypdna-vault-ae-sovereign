
<h1 style={{fontSize:24, margin:'12px 0'}}>✅ LIVE: pages/VaultDashboard.tsx</h1>


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';

import LuxuryDebitCard from '@/components/LuxuryDebitCard';
import DunBradstreetWidget from '@/components/DunBradstreetWidget';
import LuxuryTierBadge from '@/components/LuxuryTierBadge';
import BalanceBreakdown from '@/components/BalanceBreakdown';
import VaultVerification from '@/components/VaultVerification';
import CreditActivity from '@/components/CreditActivity';
import VaultDrops from '@/components/VaultDrops';
import VaultFutureTech from '@/components/VaultFutureTech';
import CrypbotsTab from '@/components/tabs/CrypbotsTab';
import NeuroTechTab from '@/components/tabs/NeuroTechTab';
import AboutUs from '@/components/AboutUs';
import DropCountdown from '@/components/DropCountdown';
import MobileFloatingNav from '@/components/MobileFloatingNav';
import CinematicWelcome from '@/components/CinematicWelcome';
import { Wallet, Rocket, Brain, Waves, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const VaultDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('balances');
  const [showWelcome, setShowWelcome] = useState(false);
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

  const vaultId = userProfile?.vault_id || 'VAULT-' + (user?.id?.slice(0, 8).toUpperCase() || 'XXXXXXXX');
  const userName = userProfile?.name || user.email?.split('@')[0] || 'Member';
  const userTier = userProfile?.tier || 'Viewer';

  return (
    <>
      <div className="min-h-screen bg-background luxury-transition">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Welcome Section */}
          <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6 animate-fade-in">
            <div className="space-y-2">
              <div className="text-overlay">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black bg-gradient-to-r from-luxury-purple via-luxury-gold to-luxury-blue bg-clip-text text-transparent">
                  Welcome back, {userName}
                </h2>
              </div>
              <div className="text-overlay">
                <p className="text-muted-foreground text-sm sm:text-base lg:text-xl font-medium">
                  Vault ID: <span className="font-mono text-luxury-purple text-sm sm:text-lg lg:text-2xl">{vaultId}</span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground sm:hidden">
                <span>Tier:</span>
                <LuxuryTierBadge tier={userTier} />
              </div>
            </div>
          </div>

          {/* Luxury Debit Card Section */}
          <div className="animate-scale-in">
            <LuxuryDebitCard 
              userName={userName}
              vaultId={vaultId}
            />
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {!isMobile && (
              <TabsList className="grid w-full grid-cols-5 luxury-card border-border bg-gradient-to-r from-card/50 to-muted/50 backdrop-blur-xl">
                <TabsTrigger value="balances" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-accent/50 relative group hover-card text-xs sm:text-sm">
                  <Wallet className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">Balance</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                </TabsTrigger>
                <TabsTrigger value="drops" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-accent/50 relative group hover-card text-xs sm:text-sm">
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">Drops</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                </TabsTrigger>
                <TabsTrigger value="crypbots" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-accent/50 relative group hover-card text-xs sm:text-sm">
                  <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">Crypb0ts</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                </TabsTrigger>
                <TabsTrigger value="neurotech" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-accent/50 relative group hover-card text-xs sm:text-sm">
                  <Waves className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">NeuroTech</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-accent/50 relative group hover-card text-xs sm:text-sm">
                  <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">About Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                </TabsTrigger>
              </TabsList>
            )}

            <div className="mt-4 sm:mt-6 lg:mt-8">
              <TabsContent value="balances" className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-slide-up">
                    <BalanceBreakdown />
                    <DunBradstreetWidget />
                    <VaultVerification />
                  </div>
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <CreditActivity />
                  </div>
                </div>
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

              <TabsContent value="about" className="animate-fade-in">
                <AboutUs />
              </TabsContent>
            </div>
          </Tabs>

          {/* Mobile Floating Navigation */}
          <MobileFloatingNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </>
  );
};

export default VaultDashboard;
