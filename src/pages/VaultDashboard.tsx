import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useTheme } from '@/components/LuxuryThemeProvider';
import { Toaster } from '@/components/ui/toaster';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useToast } from '@/hooks/use-toast';

import LuxuryLoadingScreen from '@/components/LuxuryLoadingScreen';
import LuxuryEliteCard from '@/components/LuxuryEliteCard';
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
import { useLanguage } from '@/hooks/useLanguage';

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
  const [vaultMember, setVaultMember] = useState<any>(null);
  const [dnaScore, setDnaScore] = useState<number>(700);
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
      // Fetch user profile data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (userError && userError.code !== 'PGRST116') {
        console.error('fetchUserProfile error:', userError);
      } else {
        setUserProfile(userData);
      }

      // Fetch vault member data with region
      const { data: memberData, error: memberError } = await supabase
        .from('vault_members')
        .select('*, regions(name, language_code)')
        .eq('user_id', userId)
        .eq('status', true)
        .maybeSingle();

      if (memberError && memberError.code !== 'PGRST116') {
        console.error('fetchVaultMember error:', memberError);
      } else {
        setVaultMember(memberData);
      }

      // Fetch DNA score
      const { data: scoreData, error: scoreError } = await supabase
        .from('crypscore')
        .select('score')
        .eq('user_id', userId)
        .maybeSingle();

      if (scoreError && scoreError.code !== 'PGRST116') {
        console.error('fetchDnaScore error:', scoreError);
      } else if (scoreData) {
        setDnaScore(scoreData.score || 700);
      }
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

  const vaultId = vaultMember?.crypdna_id || userProfile?.vault_id || `VAULT-${(user?.id || '').slice(0, 8).toUpperCase()}`;
  const userName = vaultMember?.full_name || userProfile?.name || user?.email?.split('@')[0] || 'Member';
  const userTier = vaultMember?.vault_tier || userProfile?.tier || 'Viewer';
  
  const { t } = useLanguage(user?.id);

  if (loading) return <LuxuryLoadingScreen />;
  if (!user) return null; // redirected by effect

  return (
    <div className="min-h-screen bg-background luxury-transition">

      {/* Header */}
      <div className="luxury-card border-b sticky top-0 z-40 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
                CrypDNA Vault
              </h1>
              <div className="hidden sm:block">
                <LuxuryTierBadge tier={userTier} />
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ThemeToggle />
              <Button onClick={handleSignOut} variant="outline" size="sm" className="luxury-button text-xs sm:text-sm">
                <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{t.sign_out}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8 lg:space-y-12">
        {/* Welcome */}
        <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="text-overlay">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black bg-gradient-to-r from-luxury-purple via-luxury-gold to-luxury-blue bg-clip-text text-transparent">
                {t.welcome_back}, {userName}
              </h2>
            </div>
            <div className="text-overlay">
              <p className="text-muted-foreground text-sm sm:text-base lg:text-xl font-medium">
                {t.vault_id}:{' '}
                <span className="font-mono text-luxury-purple text-sm sm:text-lg lg:text-2xl">
                  {vaultId}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground sm:hidden">
              <span>{t.tier}:</span>
              <LuxuryTierBadge tier={userTier} />
            </div>
          </div>
        </div>

        {/* Elite Card */}
        <div className="animate-scale-in">
          <LuxuryEliteCard userName={userName} vaultId={vaultId} dnaScore={dnaScore} tier={userTier} />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)} className="w-full">
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

        <MobileFloatingNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as TabKey)} />
      </div>
      <Toaster />
    </div>
  );
}
