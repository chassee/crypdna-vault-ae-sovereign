import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useToast } from '@/hooks/use-toast';

import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';
import LuxuryDebitCard from '@/components/LuxuryDebitCard';
import DunBradstreetWidget from '@/components/DunBradstreetWidget';
import LuxuryTierBadge from '@/components/LuxuryTierBadge';
import BalanceBreakdown from '@/components/BalanceBreakdown';
import VaultVerification from '@/components/VaultVerification';
import CreditActivity from '@/components/CreditActivity';
import VaultDrops from '@/components/VaultDrops';
import CrypbotsTab from '@/components/tabs/CrypbotsTab';
import NeuroTechTab from '@/components/tabs/NeuroTechTab';
import AboutUs from '@/components/AboutUs';
import MobileFloatingNav from '@/components/MobileFloatingNav';

import { LogOut, Wallet, Rocket, Brain, Waves, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type TabKey = 'balances' | 'drops' | 'crypbots' | 'neurotech' | 'about';

export default function VaultDashboard() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('balances');

  // ---- Auth wiring ----
  useEffect(() => {
    // live auth changes
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
      const nextUser = nextSession?.user ?? null;
      setUser(nextUser);
      if (!nextUser) navigate('/auth', { replace: true });
      else void fetchUserProfile(nextUser.id);
    });

    // initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
      const initialUser = session?.user ?? null;
      setUser(initialUser);
      if (!initialUser) navigate('/auth', { replace: true });
      else void fetchUserProfile(initialUser.id);
      setLoading(false);
    });

    return () => data?.subscription?.unsubscribe();
  }, [navigate]);

  async function fetchUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')          // make sure table/column exist
        .select('*')
        .eq('user_id', userId)  // change to your column if different
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('fetchUserProfile error:', error);
        return;
      }
      setUserProfile(data ?? null);
    } catch (e) {
      console.error('fetchUserProfile exception:', e);
    }
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: 'Error', description: 'Failed to sign out. Try again.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Signed out', description: 'You have been signed out.' });
    window.location.hash = '/auth';
  }

  if (loading) return <LuxuryLoadingScreen />;
  if (!user) return null; // redirected by effect

  const vaultId = userProfile?.vault_id ?? `VAULT-${(user.id ?? '').slice(0, 8).toUpperCase()}`;
  const userName = userProfile?.name ?? user.email?.split('@')[0] ?? 'Member';
  const userTier = userProfile?.tier ?? 'Viewer';

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">

        {/* Header */}
        <div className="bg-black/50 backdrop-blur border-b border-gray-800 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h1 
                  className="text-xl font-black tracking-wide"
                  style={{
                    background: 'linear-gradient(135deg, #ffd9a3 0%, #ffb27b 25%, #ff6bcc 50%, #8f7bff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  🔒 CrypDNA Vault
                </h1>
                <div className="hidden sm:block">
                  <LuxuryTierBadge tier={userTier} />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ThemeToggle />
                <Button onClick={handleSignOut} variant="outline" size="sm" className="text-xs">
                  <LogOut className="mr-2 h-3 w-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Welcome */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="space-y-2">
              <h2 
                className="text-3xl font-black tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #ffd9a3 0%, #ffb27b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Welcome back, {userName}
              </h2>
              <p className="text-gray-300 text-lg font-medium tracking-wide">
                Vault ID:{' '}
                <span className="font-mono text-purple-400 text-xl">
                  {vaultId}
                </span>
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 sm:hidden">
                <span>Tier:</span>
                <LuxuryTierBadge tier={userTier} />
              </div>
            </div>
          </div>

        {/* Card */}
        <div className="animate-scale-in">
          <LuxuryDebitCard userName={userName} vaultId={vaultId} />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)} className="w-full">
          {!isMobile && (
            <TabsList className="grid w-full grid-cols-5 bg-black/30 backdrop-blur border border-gray-800">
              <TabsTrigger value="balances" className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs">
                <Wallet className="w-4 h-4" />
                <span className="hidden md:inline">Balance</span>
              </TabsTrigger>
              <TabsTrigger value="drops" className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs">
                <Rocket className="w-4 h-4" />
                <span className="hidden md:inline">Drops</span>
              </TabsTrigger>
              <TabsTrigger value="crypbots" className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs">
                <Brain className="w-4 h-4" />
                <span className="hidden md:inline">Crypb0ts</span>
              </TabsTrigger>
              <TabsTrigger value="neurotech" className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs">
                <Waves className="w-4 h-4" />
                <span className="hidden md:inline">NeuroTech</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs">
                <Info className="w-4 h-4" />
                <span className="hidden md:inline">About Us</span>
              </TabsTrigger>
            </TabsList>
          )}

          <div className="mt-6">
            <TabsContent value="balances" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6 animate-slide-up">
                  <BalanceBreakdown />
                  <DunBradstreetWidget />
                  <VaultVerification />
                </div>
                <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
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

        <MobileFloatingNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as TabKey)} />
      </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
