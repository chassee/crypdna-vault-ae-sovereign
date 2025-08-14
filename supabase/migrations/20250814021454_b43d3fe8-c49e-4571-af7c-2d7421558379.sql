-- Critical Security Fixes for CrypDNA Vault (Fixed Version)

-- 1. Fix PAW Debit Card Table Security
-- Make user_id NOT NULL to ensure RLS works properly (if it's not already)
DO $$ 
BEGIN 
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'paw_debit_card' 
        AND column_name = 'user_id' 
        AND is_nullable = 'YES'
    ) THEN
        ALTER TABLE public.paw_debit_card ALTER COLUMN user_id SET NOT NULL;
    END IF;
END $$;

-- Add missing DELETE RLS policy for paw_debit_card (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'paw_debit_card' 
        AND policyname = 'Users can delete their own debit card'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can delete their own debit card" ON public.paw_debit_card FOR DELETE USING (auth.uid() = user_id)';
    END IF;
END $$;

-- Add data validation constraints (only if they don't exist)
DO $$
BEGIN
    -- Check and add card number constraint
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.check_constraints 
        WHERE constraint_name = 'valid_card_number'
    ) THEN
        ALTER TABLE public.paw_debit_card ADD CONSTRAINT valid_card_number CHECK (char_length(card_number) = 16);
    END IF;
    
    -- Check and add CVV constraint
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.check_constraints 
        WHERE constraint_name = 'valid_cvv'
    ) THEN
        ALTER TABLE public.paw_debit_card ADD CONSTRAINT valid_cvv CHECK (char_length(cvv) = 3);
    END IF;
    
    -- Check and add status constraint
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.check_constraints 
        WHERE constraint_name = 'valid_status'
    ) THEN
        ALTER TABLE public.paw_debit_card ADD CONSTRAINT valid_status CHECK (status IN ('active', 'inactive', 'suspended', 'expired'));
    END IF;
END $$;

-- 2. Secure Vault Members Data
-- Add UPDATE policy for vault_members (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'vault_members' 
        AND policyname = 'Users can update their own vault membership'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can update their own vault membership" ON public.vault_members FOR UPDATE USING (email = auth.email()) WITH CHECK (email = auth.email())';
    END IF;
END $$;

-- Add DELETE policy for vault_members (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'vault_members' 
        AND policyname = 'Service role can delete vault members'
    ) THEN
        EXECUTE 'CREATE POLICY "Service role can delete vault members" ON public.vault_members FOR DELETE USING (auth.role() = ''service_role'')';
    END IF;
END $$;

-- 3. Fix Users Table - make user_id NOT NULL for security (if not already)
DO $$ 
BEGIN 
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'user_id' 
        AND is_nullable = 'YES'
    ) THEN
        ALTER TABLE public.users ALTER COLUMN user_id SET NOT NULL;
    END IF;
END $$;

-- Add unique constraint to prevent duplicate user records (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'unique_user_id'
    ) THEN
        ALTER TABLE public.users ADD CONSTRAINT unique_user_id UNIQUE (user_id);
    END IF;
END $$;

-- 4. Add missing RLS policies for critical tables
-- Credit Activity policies
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'credit_activity' 
        AND policyname = 'Service role can manage credit activity'
    ) THEN
        EXECUTE 'CREATE POLICY "Service role can manage credit activity" ON public.credit_activity FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
    END IF;
END $$;

-- Transactions policies
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'transactions' 
        AND policyname = 'Service role can update transactions'
    ) THEN
        EXECUTE 'CREATE POLICY "Service role can update transactions" ON public.transactions FOR UPDATE USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'transactions' 
        AND policyname = 'Service role can delete transactions'
    ) THEN
        EXECUTE 'CREATE POLICY "Service role can delete transactions" ON public.transactions FOR DELETE USING (auth.role() = ''service_role'')';
    END IF;
END $$;

-- 5. Add indexes for performance and security (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_paw_debit_card_user_id ON public.paw_debit_card(user_id);
CREATE INDEX IF NOT EXISTS idx_vault_members_email ON public.vault_members(email);
CREATE INDEX IF NOT EXISTS idx_verification_user_id ON public.verification(user_id);
CREATE INDEX IF NOT EXISTS idx_users_user_id ON public.users(user_id);

-- 6. Create audit log table for security monitoring (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  operation text NOT NULL,
  user_id uuid,
  old_data jsonb,
  new_data jsonb,
  timestamp timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log (only if not already enabled)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_class 
        WHERE relname = 'audit_log' 
        AND relrowsecurity = true
    ) THEN
        ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Add audit log policy (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'audit_log' 
        AND policyname = 'Service role can manage audit logs'
    ) THEN
        EXECUTE 'CREATE POLICY "Service role can manage audit logs" ON public.audit_log FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
    END IF;
END $$;