-- Add regions table for multilingual support
CREATE TABLE IF NOT EXISTS public.regions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  language_code text NOT NULL DEFAULT 'en',
  created_at timestamp with time zone DEFAULT now()
);

-- Insert initial region data
INSERT INTO public.regions (name, language_code) VALUES
  ('United States', 'en'),
  ('Spain', 'es'),
  ('France', 'fr'),
  ('Saudi Arabia', 'ar'),
  ('Japan', 'ja')
ON CONFLICT DO NOTHING;

-- Add region_id to vault_members if it doesn't exist
ALTER TABLE public.vault_members 
ADD COLUMN IF NOT EXISTS region_id uuid REFERENCES public.regions(id);

-- Ensure users table has required columns
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS name text,
ADD COLUMN IF NOT EXISTS vault_id text DEFAULT ('VAULT-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
ADD COLUMN IF NOT EXISTS tier text DEFAULT 'Starter';

-- Ensure balances table has required columns  
ALTER TABLE public.balances
ADD COLUMN IF NOT EXISTS available_credit numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS pending_balance numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS monthly_limit numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS cash_back_rate numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS score_boost integer DEFAULT 0;

-- Enable RLS on regions
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;

-- Create policies for regions
CREATE POLICY "Anyone can view regions" 
ON public.regions 
FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage regions" 
ON public.regions 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');