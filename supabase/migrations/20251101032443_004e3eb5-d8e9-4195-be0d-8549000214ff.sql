-- Fix Critical Security Issues
-- This migration addresses all error-level security findings

-- 1. Remove anonymous access to kyc_uploads table
DROP POLICY IF EXISTS "Allow anon read kyc_uploads" ON public.kyc_uploads;
DROP POLICY IF EXISTS "vault_public_read_kyc_uploads" ON public.kyc_uploads;

-- Add service role policy for admin access to kyc_uploads
CREATE POLICY "Service role can manage KYC uploads" ON public.kyc_uploads
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- 2. Enable RLS on kyc_records table and create proper policies
ALTER TABLE public.kyc_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own KYC records" ON public.kyc_records
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own KYC records" ON public.kyc_records
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role manages KYC records" ON public.kyc_records
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- 3. Drop SECURITY DEFINER views and their dependent functions using CASCADE
DROP VIEW IF EXISTS public.vault_kyc CASCADE;
DROP VIEW IF EXISTS public.vault_verification CASCADE;

-- Recreate views with SECURITY INVOKER to enforce RLS
CREATE VIEW public.vault_kyc
  WITH (security_invoker=true)
  AS SELECT * FROM kyc_uploads;

CREATE VIEW public.vault_verification
  WITH (security_invoker=true)
  AS SELECT * FROM kyc_records;

-- Recreate the functions with proper access checks
CREATE OR REPLACE FUNCTION public.get_vault_verification()
RETURNS SETOF vault_verification
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM vault_verification 
  WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.get_vault_kyc()
RETURNS SETOF vault_kyc
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM vault_kyc 
  WHERE user_id = auth.uid();
$$;

-- 4. Enable RLS on any other tables that might be missing it
-- Check memberships table
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own membership" ON public.memberships
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role manages memberships" ON public.memberships
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Check tradeline_reports table
ALTER TABLE public.tradeline_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages tradeline reports" ON public.tradeline_reports
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');