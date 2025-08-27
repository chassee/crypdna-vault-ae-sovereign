-- Configure secure auth settings
UPDATE auth.config SET 
  otp_expiry = 60, -- 1 minute OTP expiry for security
  password_leak_detection = true; -- Enable leaked password protection

-- Ensure auth flow redirects are properly configured
-- This will be handled by the Supabase dashboard settings