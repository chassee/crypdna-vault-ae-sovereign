-- Add referral system columns to vault_members table
ALTER TABLE vault_members 
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE DEFAULT (
  'REF-' || upper(substr(md5(random()::text), 1, 8))
),
ADD COLUMN IF NOT EXISTS referrals_count INTEGER DEFAULT 0;