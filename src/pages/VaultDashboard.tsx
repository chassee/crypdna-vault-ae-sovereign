import { useEffect, useState } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useNavigate } from 'react-router-dom';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/supabaseClient';
import { RegionalLuxuryThemeProvider } from '@/components/RegionalLuxuryThemeProvider';
import { useRegionalConfig } from '@/contexts/RegionalContext';
import { RegionalAccentStyles } from '@/components/RegionalAccentStyles';
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
import DIYCreditTab from '@/components/tabs/DIYCreditTab';
import AboutUs from '@/components/AboutUs';
import ID from '@/pages/ID';
import MobileFloatingNav from '@/components/MobileFloatingNav';

import { LogOut, Wallet, Rocket, Brain, CreditCard, Info, FileEdit } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
/* ================================
   STEP 2B — REGIONAL ACCENT MAP
   (PASTE HERE — TOP LEVEL)
================================ */

const REGIONAL_ACCENT_MAP: Record<string, string> = {
  global: 'luxury-purple',
  ae: 'luxury-gold',
  jp: 'luxury-red',
  co: 'luxury-emerald',
  fr: 'luxury-indigo',
  de: 'luxury-slate',
  gb: 'luxury-royal',
  it: 'luxury-marble',
  es: 'luxury-crimson',
  br: 'luxury-jade',
  mx: 'luxury-obsidian',
  ca: 'luxury-ice',
  au: 'luxury-sand',
  sg: 'luxury-neon',
  kr: 'luxury-carbon',
  in: 'luxury-saffron',
  sa: 'luxury-emerald-dark',
  za: 'luxury-onyx',
  ng: 'luxury-bronze',
  eg: 'luxury-desert',
  tr: 'luxury-ottoman',
  ru: 'luxury-frost',
  cn: 'luxury-imperial',
  hk: 'luxury-neon-blue',
  tw: 'luxury-jade-light',
  th: 'luxury-gold-light',
  id: 'luxury-volcanic',
};

/* ================================ */
type TabKey = 'balances' | 'drops' | 'crypbots' | 'id' | 'diycredit' | 'about';

export default function VaultDashboard() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { config: regionalConfig } = useRegionalConfig();
  const region = useRegionalConfig();
  const regionCode = region?.code || 'global';
  const accentClass = REGIONAL_ACCENT_MAP[regionCode] ?? REGIONAL_ACCENT_MAP.global;
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { profile, inviteCount, getPrestigeRank, getInviteLink, loading: profileLoading } = useUserProfile(user);
  const [activeTab, setActiveTab] = useState<TabKey>('balances');

  // ---- Vault Data States ----
  const [kycData, setKycData] = useState<any>(null);
  const [verificationData, setVerificationData] = useState<any>(null);
  const [balances, setBalances] = useState({
    available: 0,
    pending: 0,
    card: 0
  });

  // ---- Auth Wiring ----
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
      const nextUser = nextSession?.user ?? null;
      setUser(nextUser);
      if (!nextUser) navigate('/auth', { replace: true });
      else void fetchUserProfile(nextUser.id);
    });

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

  // ---- Fetch User Profile ----
  async function fetchUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('fetchUserProfile error:', error);
        return;
      }
      setUserProfile(data ?? null);
      await fetchVaultData(); // once user is known, load their Vault data
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
    window.location.hash = '/auth';
  }

  if (loading) return <LuxuryLoadingScreen />;
  if (!user) return null;

  const vaultId = userProfile?.vault_id ?? `VAULT-${(user.id ?? '').slice(0, 8).toUpperCase()}`;
  const userName = userProfile?.name ?? user.email?.split('@')[0] ?? 'Member';
  const userTier = userProfile?.tier ?? 'Viewer';

 return (
  <RegionalLuxuryThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RegionalAccentStyles accent={accentClass} />
    <div
      className={`min-h-screen bg-background luxury-transition ${accentClass}`}
    >

        {/* Header */}
        <div className="luxury-card border-b sticky top-0 z-40 backdrop-blur-xl">
          <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
                  CrypDNA Vault {regionalConfig?.region && `· ${regionalConfig.region}`}
                </h1>
                <div className="hidden sm:block">
                  <LuxuryTierBadge tier={userTier} />
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <ThemeToggle />
                <Button onClick={handleSignOut} variant="outline" size="sm" className="luxury-button text-xs sm:text-sm">
                  <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
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
                  Welcome back, {userName}
                </h2>
              </div>
              <div className="text-overlay">
                <p className="text-muted-foreground text-sm sm:text-base lg:text-xl font-medium">
                  Vault ID:{' '}
                  <span className="font-mono text-luxury-purple text-sm sm:text-lg lg:text-2xl">
                    {vaultId}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground sm:hidden">
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
              <TabsList className="grid w-full grid-cols-6 luxury-card border-border bg-gradient-to-r from-card/50 to-muted/50 backdrop-blur-xl">
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
                <TabsTrigger value="id" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-accent/50 relative group hover-card text-xs sm:text-sm">
                  <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">ID</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                </TabsTrigger>
                <TabsTrigger value="diycredit" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white luxury-transition hover:bg-accent/50 relative group hover-card text-xs sm:text-sm">
                  <FileEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">DIY Credit</span>
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

              <TabsContent value="id" className="animate-fade-in">
                <ID />
              </TabsContent>

              <TabsContent value="diycredit" className="animate-fade-in">
                <DIYCreditTab />
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
    </RegionalLuxuryThemeProvider>
  );
}
