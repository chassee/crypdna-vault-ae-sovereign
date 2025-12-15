import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import PrestigePanel from '@/components/PrestigePanel';
import IdentityCard from '@/components/IdentityCard';
import InviteRewards from '@/components/InviteRewards';

export default function ID() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isGuest = searchParams.get('guest') === 'true';

  useEffect(() => {
    if (isGuest) {
      // Guest mode: mock user data
      setUser(null);
      setUserProfile({
        name: 'Guest',
        vault_id: `GUEST-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        tier: 'Viewer',
        rank: 'Ghost',
        invite_count: 0,
        join_date: new Date().toISOString()
      });
      setLoading(false);
      return;
    }

    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (!currentUser) {
        navigate('/auth', { replace: true });
      } else {
        fetchUserProfile(currentUser.id);
      }
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (!nextUser && !isGuest) {
        navigate('/auth', { replace: true });
      } else if (nextUser) {
        fetchUserProfile(nextUser.id);
      }
    });

    return () => data?.subscription?.unsubscribe();
  }, [navigate, isGuest]);

  async function fetchUserProfile(userId: string) {
    try {
      // Try vault_members first, fall back to profiles
      const { data: memberData, error: memberError } = await supabase
        .from('vault_members')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (memberData) {
        setUserProfile({
          ...memberData,
          name: memberData.full_name,
          vault_id: memberData.crypdna_id,
          tier: memberData.vault_tier,
          rank: memberData.prestige_level,
          invite_count: memberData.referrals_count || 0,
          join_date: memberData.created_at
        });
        return;
      }

      // Fallback to profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profileData) {
        setUserProfile({
          name: profileData.full_name || profileData.email?.split('@')[0],
          vault_id: `VAULT-${userId.slice(0, 8).toUpperCase()}`,
          tier: 'Viewer',
          rank: 'Ghost',
          invite_count: 0,
          join_date: profileData.updated_at || new Date().toISOString()
        });
      }
    } catch (e) {
      console.error('fetchUserProfile exception:', e);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const vaultId = userProfile?.vault_id ?? `VAULT-${(user?.id ?? 'GUEST').slice(0, 8).toUpperCase()}`;
  const userName = userProfile?.name ?? user?.email?.split('@')[0] ?? 'Guest';
  const userTier = userProfile?.tier ?? 'Viewer';
  const userRank = userProfile?.rank ?? 'Ghost';
  const joinDate = userProfile?.created_at || userProfile?.join_date;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="text-center space-y-2 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
          Identity & Prestige
        </h1>
        <p className="text-muted-foreground">Your unique identity in the CrypDNA ecosystem</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
        <div className="space-y-6">
          <PrestigePanel user={user} userProfile={userProfile} />
          <InviteRewards user={user} userProfile={userProfile} isGuest={isGuest} />
        </div>
        <div>
          <IdentityCard
            userName={userName}
            vaultId={vaultId}
            rank={userRank}
            tier={userTier}
            joinDate={joinDate}
          />
        </div>
      </div>
    </div>
  );
}
