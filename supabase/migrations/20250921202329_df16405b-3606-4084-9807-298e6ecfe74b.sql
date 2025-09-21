-- Enable RLS on country_kyc_rules table
ALTER TABLE public.country_kyc_rules ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read country KYC rules
CREATE POLICY "Anyone can view country KYC rules" 
ON public.country_kyc_rules 
FOR SELECT 
TO authenticated 
USING (true);

-- Create policy to only allow service role to manage country KYC rules
CREATE POLICY "Service role can manage country KYC rules" 
ON public.country_kyc_rules 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);