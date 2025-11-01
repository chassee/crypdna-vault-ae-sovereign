import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to award XP for vault content views
 * Call this in any component where viewing content should grant XP
 */
export const usePrestigeXP = (xpAmount: number = 2) => {
  useEffect(() => {
    const awardViewXP = async () => {
      try {
        await supabase.rpc('award_my_prestige_xp', {
          xp_amount: xpAmount
        });
      } catch (error) {
        console.error('Error awarding view XP:', error);
      }
    };

    // Award XP on component mount (view event)
    const timer = setTimeout(() => {
      awardViewXP();
    }, 2000); // Wait 2 seconds to ensure it's a real view

    return () => clearTimeout(timer);
  }, [xpAmount]);
};
