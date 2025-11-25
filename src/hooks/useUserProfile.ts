import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/supabaseClient';

export function useUserProfile(user: any) {
  const [profile, setProfile] = useState<any>(null);
  const [inviteCount, setInviteCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      if (!user) return;

      // Fetch profile row
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Count invites
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('invited_by', user.id);

      setProfile(profileData);
      setInviteCount(count || 0);
      setLoading(false);
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
