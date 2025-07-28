import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import MemberCard from '@/components/MemberCard';
import CrypDNACard from '@/components/CrypDNACard';
import VaultFiles from '@/components/VaultFiles';
import BalanceBreakdown from '@/components/BalanceBreakdown';
import CrypbotCompanion from '@/components/CrypbotCompanion';
import VaultVerification from '@/components/VaultVerification';
import { LogOut } from 'lucide-react';

const VaultDashboard = () => {
  const navigate = useNavigate();
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
          navigate('/auth');
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
        navigate('/auth');
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
        navigate('/auth');
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
    return <LoadingScreen />;
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const vaultId = userProfile?.vault_id || 'VAULT-LOADING...';
  const userName = userProfile?.name || user.email?.split('@')[0] || 'Member';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to your Vault, {userName}
            </h1>
            <p className="text-purple-200">
              Vault ID: <span className="font-mono text-purple-100">{vaultId}</span>
            </p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="text-white border-white/20 hover:bg-white/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <MemberCard />
            <CrypDNACard fileNumber="DNA-2024-0001" />
            <BalanceBreakdown />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <VaultFiles />
            <VaultVerification />
            <CrypbotCompanion />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Features Preview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-4">🎒 Digital Assets</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Duffle Bags:</span>
                <span className="text-purple-100">Coming Soon</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Trucker Hats:</span>
                <span className="text-purple-100">Coming Soon</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Vinyl Records:</span>
                <span className="text-purple-100">Coming Soon</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-4">🏆 Member Perks</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Exclusive Drops:</span>
                <span className="text-purple-100">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Early Access:</span>
                <span className="text-purple-100">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-200">VIP Support:</span>
                <span className="text-purple-100">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-4">🚀 Future Tech</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-purple-200">AI Assistant:</span>
                <span className="text-purple-100">Q2 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Neurotech:</span>
                <span className="text-purple-100">Q3 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Quantum Sync:</span>
                <span className="text-purple-100">Q4 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDashboard;