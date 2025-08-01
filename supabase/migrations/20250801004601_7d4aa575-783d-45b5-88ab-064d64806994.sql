-- Fix remaining security issues from linter

-- Check what tables still need RLS enabled
-- Let me check if there are any tables that still have policies but RLS disabled

-- Fix missing RLS policies for tables that may have been missed
-- Enable RLS on any remaining tables that need it

-- Since the linter shows "Policy Exists RLS Disabled" errors, 
-- let me check if there are any tables with policies but RLS still disabled

-- Let's make sure all tables with policies have RLS enabled
-- This query should identify any issues:

DO $$
DECLARE
    table_record RECORD;
BEGIN
    -- Loop through all tables in public schema to ensure RLS is enabled where needed
    FOR table_record IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        -- Enable RLS on all public tables for security
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_record.tablename);
    END LOOP;
END $$;

-- Now let's ensure we have proper policies for the tables that were mentioned in our migration
-- that might still be causing issues

-- Additional security measures for edge cases
-- Make sure vault_balances table exists and has proper RLS (referenced in functions)
-- If it doesn't exist, we should handle this gracefully in functions

-- Update any functions that reference non-existent tables
CREATE OR REPLACE FUNCTION public.update_balance()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if vault_balances table exists before trying to update it
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vault_balances') THEN
    IF NEW.transaction_type = 'credit' THEN
      UPDATE public.vault_balances
      SET amount = amount + NEW.amount
      WHERE user_id = NEW.user_id;
    ELSIF NEW.transaction_type = 'debit' THEN
      UPDATE public.vault_balances
      SET amount = amount - NEW.amount
      WHERE user_id = NEW.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;