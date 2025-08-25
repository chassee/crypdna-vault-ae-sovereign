import { createClient } from '@supabase/supabase-js';

// Read the Vite envs injected at build time
const url  = import.meta.env.VITE_SUPABASE_URL!;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// If either is missing, fail fast (helps debug)
if (!url || !anon) {
  throw new Error('Supabase URL/Key missing from Vite env. Check .env and .env.production.');
}

export const supabase = createClient(url, anon);
