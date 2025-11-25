import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/supabaseClient';

export function useUserProfile(user: any) {
  const [profile, setProfile] = useState<any>(null);
  const [inviteCount, setInviteCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch from vault_users table which has prestige_rank and invite data
        const { data: vaultUser, error: vaultError } = await supabase
          .from('vault_users')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (vaultError && vaultError.code !== 'PGRST116') {
          console.error('Error fetching vault_users:', vaultError);
        }

        // Fetch profile for additional data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // Merge the data
        const mergedProfile = {
          ...profileData,
          ...vaultUser,
          rank: vaultUser?.prestige_rank || 'Ghost',
          invite_count: vaultUser?.invites_sent || 0,
        };

        setProfile(mergedProfile);
        setInviteCount(vaultUser?.invites_sent || 0);
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  // --- Prestige Rank Logic ---
  function getPrestigeRank() {
    if (inviteCount >= 10) return 'Architect';
    if (inviteCount >= 3) return 'Initiate';
    return 'Ghost';
  }

  // --- Referral Link Generator ---
  function getInviteLink() {
    if (!user) return '';
    const key = user.id.slice(0, 8).toUpperCase();
    return `${window.location.origin}/auth?ref=${key}`;
  }

  return { profile, inviteCount, getPrestigeRank, getInviteLink, loading };
}
