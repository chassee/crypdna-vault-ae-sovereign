-- 1. Fix signup trigger to match vault_members schema
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.create_vault_member();

CREATE OR REPLACE FUNCTION public.create_vault_member()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO vault_members (
    user_id,
    full_name,
    email,
    crypdna_id,
    card_balance,
    vault_tier,
    approved,
    status,
    prestige_level,
    prestige_xp,
    referral_code,
    referrals_count
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    'VAULT-' || UPPER(SUBSTR(NEW.id::text, 1, 8)),
    2500,
    'Ghost',
    'false',
    true,
    1,
    0,
    'REF-' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8)),
    0
  );
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_vault_member();

-- 2. Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('vault-ids', 'vault-ids', true),
  ('vault-net30', 'vault-net30', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Add RLS policies for new buckets
CREATE POLICY "Users can upload their own vault IDs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'vault-ids' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own vault IDs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'vault-ids' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload their own net30 docs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'vault-net30' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own net30 docs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'vault-net30' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 4. Ensure guest access works - add policy for unauthenticated reads on vault_members
CREATE POLICY "Allow guest read access to vault_members"
ON vault_members FOR SELECT
TO anon
USING (true);