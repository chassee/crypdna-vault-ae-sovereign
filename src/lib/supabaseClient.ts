/**
 * Consolidated Supabase Client
 *
 * Single source of truth for all Supabase operations.
 * Uses VITE_ environment variables for configuration.
 *
 * Import this client everywhere:
 *   import { supabase } from '@/lib/supabaseClient';
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Environment variables with fallbacks
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://jkrwyotrdlucyynnotpd.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ';

// Safety check
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables.');
}

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storageKey: 'crypdna-vault-auth',

      // 🔥 THIS WAS THE BROKEN PART — FIXED
      redirectTo:
        typeof window !== 'undefined'
          ? ${window.location.origin}/#/auth/callback
          : undefined,
    },
  }
);

export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error fetching session:', error);
      return null;
    }
    return session;
  } catch (err) {
    console.error('Unexpected error fetching session:', err);
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user ?? null;
}
