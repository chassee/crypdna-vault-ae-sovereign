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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Header - Minimalist */}
        <div className="text-center space-y-4 animate-slide-up-fade">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            {userName}
          </h1>
          <div className="vault-id text-muted-foreground">
            {vaultId}
          </div>
          <div className="vault-tier bg-primary text-primary-foreground">
            {userTier}
          </div>
        </div>

        {/* Premium Card */}
        <div className="animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
          <LuxuryDebitCard userName={userName} vaultId={vaultId} />
        </div>

        {/* Navigation Tabs - Clean */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {!isMobile && (
            <TabsList className="grid w-full grid-cols-5 vault-card h-14">
              {[
                { key: 'balances', icon: Wallet, label: 'Balance' },
                { key: 'drops', icon: Rocket, label: 'Drops' },
                { key: 'crypbots', icon: Brain, label: 'Crypb0ts' },
                { key: 'neurotech', icon: Waves, label: 'NeuroTech' },
                { key: 'about', icon: Info, label: 'About' }
              ].map(({ key, icon: Icon, label }) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all">
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          )}

          <div className="mt-8">
            <TabsContent value="balances" className="space-y-8 animate-slide-up-fade">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <BalanceBreakdown />
                  <DunBradstreetWidget />
                  <VaultVerification />
                </div>
                <div className="space-y-8">
                  <CreditActivity />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="drops" className="animate-slide-up-fade"><VaultDrops /></TabsContent>
            <TabsContent value="crypbots" className="animate-slide-up-fade"><CrypbotsTab /></TabsContent>
            <TabsContent value="neurotech" className="animate-slide-up-fade"><NeuroTechTab /></TabsContent>
            <TabsContent value="about" className="animate-slide-up-fade"><AboutUs /></TabsContent>
          </div>
        </Tabs>

        <MobileFloatingNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default VaultDashboard;
