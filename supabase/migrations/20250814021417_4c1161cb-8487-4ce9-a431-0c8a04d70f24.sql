-- Critical Security Fixes for CrypDNA Vault

-- 1. Fix PAW Debit Card Table Security
-- Make user_id NOT NULL to ensure RLS works properly
ALTER TABLE public.paw_debit_card 
ALTER COLUMN user_id SET NOT NULL;

-- Add missing DELETE RLS policy for paw_debit_card
CREATE POLICY "Users can delete their own debit card" 
ON public.paw_debit_card 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add data validation constraints
ALTER TABLE public.paw_debit_card 
ADD CONSTRAINT valid_card_number CHECK (char_length(card_number) = 16),
ADD CONSTRAINT valid_cvv CHECK (char_length(cvv) = 3),
ADD CONSTRAINT valid_status CHECK (status IN ('active', 'inactive', 'suspended', 'expired'));

-- 2. Secure Vault Members Data
-- Add UPDATE policy for vault_members
CREATE POLICY "Users can update their own vault membership" 
ON public.vault_members 
FOR UPDATE 
USING (email = auth.email())
WITH CHECK (email = auth.email());

-- Add DELETE policy for vault_members (restricted)
CREATE POLICY "Service role can delete vault members" 
ON public.vault_members 
FOR DELETE 
USING (auth.role() = 'service_role');

-- 3. Strengthen Verification Table Security
-- Add DELETE policy for verification
CREATE POLICY "Users can delete their own verification" 
ON public.verification 
FOR DELETE 
USING (auth.uid() = user_id);

-- Update verification policies to be more restrictive
DROP POLICY IF EXISTS "service role" ON public.verification;
DROP POLICY IF EXISTS "service_role" ON public.verification;

-- Create more specific policies for verification
CREATE POLICY "Users can update their own verification documents" 
ON public.verification 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage all verification" 
ON public.verification 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 4. Fix Users Table - make user_id NOT NULL for security
ALTER TABLE public.users 
ALTER COLUMN user_id SET NOT NULL;

-- Add unique constraint to prevent duplicate user records
ALTER TABLE public.users 
ADD CONSTRAINT unique_user_id UNIQUE (user_id);

-- 5. Add missing RLS policies for other critical tables

-- Credit Activity - add INSERT/UPDATE/DELETE policies
CREATE POLICY "Service role can manage credit activity" 
ON public.credit_activity 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Transactions - add missing UPDATE/DELETE policies
CREATE POLICY "Service role can update transactions" 
ON public.transactions 
FOR UPDATE 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can delete transactions" 
ON public.transactions 
FOR DELETE 
USING (auth.role() = 'service_role');

-- 6. Add indexes for performance and security
CREATE INDEX IF NOT EXISTS idx_paw_debit_card_user_id ON public.paw_debit_card(user_id);
CREATE INDEX IF NOT EXISTS idx_vault_members_email ON public.vault_members(email);
CREATE INDEX IF NOT EXISTS idx_verification_user_id ON public.verification(user_id);
CREATE INDEX IF NOT EXISTS idx_users_user_id ON public.users(user_id);

-- 7. Add audit logging trigger for sensitive operations
CREATE OR REPLACE FUNCTION public.audit_sensitive_operations()
RETURNS TRIGGER AS $$
BEGIN
  -- Log sensitive operations to a separate audit table (to be created if needed)
  IF TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_log (
      table_name, 
      operation, 
      user_id, 
      old_data, 
      new_data, 
      timestamp
    ) VALUES (
      TG_TABLE_NAME,
      TG_OP,
      auth.uid(),
      row_to_json(OLD),
      row_to_json(NEW),
      now()
    );
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  operation text NOT NULL,
  user_id uuid,
  old_data jsonb,
  new_data jsonb,
  timestamp timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only service role can access audit logs
CREATE POLICY "Service role can manage audit logs" 
ON public.audit_log 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');