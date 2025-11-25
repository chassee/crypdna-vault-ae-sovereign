-- 1) Fix create_vault_member trigger to match vault_members schema
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.create_vault_member();

CREATE OR REPLACE FUNCTION public.create_vault_member()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Avoid duplicate vault_members rows for same user
  IF EXISTS (SELECT 1 FROM vault_members WHERE user_id = NEW.id) THEN
    RETURN NEW;
  END IF;

  INSERT INTO vault_members (
    user_id,
    full_name,
    email,
    crypdna_id,
    card_balance,
    vault_tier,
    approved,
    tally_id,
    notes,
    status,
    region_id,
    prestige_level,
    prestige_xp,
    referral_code,
    referrals_count
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    'PAW-' || UPPER(SUBSTRING(NEW.id::text, 1, 8)),
    2500,
    'Ghost',
    'false',
    'TALLY-' || UPPER(SUBSTRING(NEW.id::text, 1, 8)),
    'for manual notes',
    true,
    NULL,
    1,
    0,
    'REF-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8)),
    0
  );

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_vault_member();

-- 2) Fix get_vault_id() to return crypdna_id for current user
DROP FUNCTION IF EXISTS public.get_vault_id();

CREATE OR REPLACE FUNCTION public.get_vault_id()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  vid text;
BEGIN
  SELECT crypdna_id
    INTO vid
  FROM vault_members
  WHERE user_id = auth.uid()
  LIMIT 1;

  RETURN vid;
END;
$$;

-- 3) Ensure storage buckets vault-ids and vault-net30 exist and are private
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('vault-ids', 'vault-ids', false),
  ('vault-net30', 'vault-net30', false)
ON CONFLICT (id) DO UPDATE
SET public = EXCLUDED.public;

-- 4) RLS policies for vault-ids bucket
DROP POLICY IF EXISTS "Users can upload their own vault IDs" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own vault IDs" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own net30 docs" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own net30 docs" ON storage.objects;

CREATE POLICY "Users can upload their own vault IDs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'vault-ids' AND
  auth.uid()::text = (storage.foldername(name))[2]
);

CREATE POLICY "Users can view their own vault IDs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'vault-ids' AND
  auth.uid()::text = (storage.foldername(name))[2]
);

-- 5) RLS policies for vault-net30 bucket
CREATE POLICY "Users can upload their own net30 docs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'vault-net30' AND
  auth.uid()::text = (storage.foldername(name))[2]
);

CREATE POLICY "Users can view their own net30 docs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'vault-net30' AND
  auth.uid()::text = (storage.foldername(name))[2]
);
