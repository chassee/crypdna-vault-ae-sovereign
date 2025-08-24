// ✅ LIVE: pages/VaultDashboard.tsx

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
  const isMobile = useIsMobile();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) navigate('/vault-login');
      else fetchUserProfile(session.user.id);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) navigate('/vault-login');
      else fetchUserProfile(session.user.id);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') console.error('Fetch user error:', error);
      else setUserProfile(userData);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: 'Error', description: 'Sign out failed.', variant: 'destructive' });
    } else {
      toast({ title: 'Signed Out', description: 'You have been signed out.' });
      navigate('/vault-login');
    }
  };

  if (loading) return <LuxuryLoadingScreen />;
  if (!user) return null;

  const vaultId = userProfile?.vault_id || 'VAULT-' + (user?.id?.slice(0, 8).toUpperCase() || 'XXXXXXXX');
  const userName = userProfile?.name || user.email?.split('@')[0] || 'Member';
  const userTier = userProfile?.tier || 'Viewer';

  return (
    <div className="min-h-screen bg-background luxury-transition">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8 lg:space-y-12">
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

        <div className="animate-scale-in">
          <LuxuryDebitCard userName={userName} vaultId={vaultId} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {!isMobile && (
            <TabsList className="grid w-full grid-cols-5 luxury-card border-border bg-gradient-to-r from-card/50 to-muted/50 backdrop-blur-xl">
              {[
                { key: 'balances', icon: Wallet, label: 'Balance' },
                { key: 'drops', icon: Rocket, label: 'Drops' },
                { key: 'crypbots', icon: Brain, label: 'Crypb0ts' },
                { key: 'neurotech', icon: Waves, label: 'NeuroTech' },
                { key: 'about', icon: Info, label: 'About Us' }
              ].map(({ key, icon: Icon, label }) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-accent/50 relative group hover-card text-xs sm:text-sm">
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">{label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                </TabsTrigger>
              ))}
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

            <TabsContent value="drops" className="animate-fade-in"><VaultDrops /></TabsContent>
            <TabsContent value="crypbots" className="animate-fade-in"><CrypbotsTab /></TabsContent>
            <TabsContent value="neurotech" className="animate-fade-in"><NeuroTechTab /></TabsContent>
            <TabsContent value="about" className="animate-fade-in"><AboutUs /></TabsContent>
          </div>
        </Tabs>

        <MobileFloatingNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default VaultDashboard;
