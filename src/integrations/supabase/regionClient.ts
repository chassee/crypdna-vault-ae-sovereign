import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { getRegionConfig } from '@/config/regions';

/**
 * Creates a region-aware Supabase client based on the current region configuration
 */
export function createRegionSupabaseClient(regionCode?: string): SupabaseClient<Database> {
  const region = getRegionConfig(regionCode);
  
  return createClient<Database>(region.supabaseUrl, region.supabaseKey, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  });
}

/**
 * Singleton instance - initialized on first access with detected region
 */
let supabaseInstance: SupabaseClient<Database> | null = null;

export function getSupabaseClient(): SupabaseClient<Database> {
  if (!supabaseInstance) {
    supabaseInstance = createRegionSupabaseClient();
  }
  return supabaseInstance;
}

// Export as default for backward compatibility
export const supabase = getSupabaseClient();
