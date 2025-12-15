-- Migration for ID Tab Backend: profiles updates, invites table, and rank_rules table

-- 1) Update profiles table
ALTER TABLE public.profiles
ADD COLUMN rank TEXT NOT NULL DEFAULT 'Ghost',
ADD COLUMN vault_id TEXT UNIQUE,
ADD COLUMN join_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
ADD COLUMN invite_count INT NOT NULL DEFAULT 0,
ADD COLUMN tier TEXT NOT NULL DEFAULT 'free';

-- Function to generate a unique vault_id (DAWG-XXXX)
CREATE OR REPLACE FUNCTION public.generate_vault_id()
RETURNS TEXT AS $$
DECLARE
    new_vault_id TEXT;
    is_unique BOOLEAN;
BEGIN
    LOOP
        -- Generate 'DAWG-' + random 4 digits
        new_vault_id := 'DAWG-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
        
        -- Check if it's unique
        SELECT NOT EXISTS (SELECT 1 FROM public.profiles WHERE vault_id = new_vault_id) INTO is_unique;
        
        IF is_unique THEN
            RETURN new_vault_id;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- Update existing profiles with a generated vault_id
UPDATE public.profiles
SET vault_id = public.generate_vault_id()
WHERE vault_id IS NULL;

-- Ensure vault_id is generated on new profile inserts
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Assuming the profiles table is linked to auth.users via the id column
  INSERT INTO public.profiles (id, vault_id)
  VALUES (NEW.id, public.generate_vault_id())
  ON CONFLICT (id) DO NOTHING; -- Handle case where profile might already exist
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-create or update the trigger to ensure vault_id generation
-- Assuming a trigger on auth.users is used to create a profile entry
-- If the trigger is on profiles table, it should be adjusted.
-- For simplicity, we assume the profile creation logic is handled elsewhere or we can create a trigger on profiles for vault_id if it's null.

-- Alternative: Trigger on profiles before insert to set vault_id if null
CREATE OR REPLACE FUNCTION public.set_vault_id_on_insert()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.vault_id IS NULL THEN
        NEW.vault_id := public.generate_vault_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql VOLATILE;

DROP TRIGGER IF EXISTS set_vault_id_trigger ON public.profiles;
CREATE TRIGGER set_vault_id_trigger
BEFORE INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_vault_id_on_insert();


-- 2) Create invites table
CREATE TABLE public.invites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inviter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    invite_code TEXT UNIQUE NOT NULL,
    invitee_email TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'joined', 'expired'
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3) Create rank_rules table
CREATE TABLE public.rank_rules (
    rank_name TEXT PRIMARY KEY,
    required_invites INT NOT NULL,
    required_tier TEXT NOT NULL
);

-- Insert initial rank rules
INSERT INTO public.rank_rules (rank_name, required_invites, required_tier) VALUES
('Ghost', 0, 'free'),
('Initiate', 3, 'basic'),
('Ascended', 10, 'pro'),
('Oracle', 25, 'elite'),
('Archon', 100, 'ultra')
ON CONFLICT (rank_name) DO UPDATE SET
    required_invites = EXCLUDED.required_invites,
    required_tier = EXCLUDED.required_tier;

-- Grant permissions (assuming RLS is enabled and standard Supabase roles)
-- Grant select, insert, update to authenticated users on invites table
GRANT SELECT, INSERT, UPDATE ON public.invites TO authenticated;
-- Grant select on rank_rules table to authenticated users
GRANT SELECT ON public.rank_rules TO authenticated;

-- Update RLS policies for profiles to allow authenticated users to see new columns
-- This is a placeholder and assumes existing RLS policies on profiles will need adjustment
-- to allow the new columns to be returned in existing queries.
-- Specific RLS policy updates are highly dependent on the existing policies, so we'll skip
-- explicit RLS policy creation here, assuming the existing policies on `profiles`
-- are permissive enough or will be handled by the Supabase CLI when applying the migration.

-- Update RLS policy on profiles to allow select on new columns
-- Example (highly dependent on existing policies):
-- ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Allow select for authenticated users" ON public.profiles;
-- CREATE POLICY "Allow select for authenticated users" ON public.profiles
--   FOR SELECT USING (auth.role() = 'authenticated');
