import { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import type { Tables } from '../integrations/supabase/types';

type Region = Tables<'regions'> | null;

export function useUserRegion() {
  const [region, setRegion] = useState<Region>(null);
  const [languageCode, setLanguageCode] = useState<'en' | string>('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      // 1) Get the logged-in user
      const { data: auth } = await supabase.auth.getUser();
      const user = auth?.user;
      if (!user) { setLoading(false); return; }

      // 2) Get that user’s region_id from vault_members
      const { data: member, error: mErr } = await supabase
        .from('vault_members')
        .select('region_id')
        .eq('user_id', user.id)
        .single();

      if (mErr || !member?.region_id) { setLoading(false); return; }

      // 3) Pull the region row (this is the snippet you asked about)
      const { data: reg, error: rErr } = await supabase
        .from('regions')
        .select('id, name, language_code')
        .eq('id', member.region_id)
        .single();

      if (!rErr && reg) {
        setRegion(reg as Region);
        setLanguageCode(reg.language_code);
      }

      setLoading(false);
    })();
  }, []);

  return { region, languageCode, loading };
}
