-- Phase 1: Enable RLS on missing tables and create secure policies

-- Enable RLS on neuro_tech table
ALTER TABLE public.neuro_tech ENABLE ROW LEVEL SECURITY;

-- Create policies for neuro_tech table
CREATE POLICY "Users can view their own neuro tech features" 
ON public.neuro_tech 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own neuro tech features" 
ON public.neuro_tech 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own neuro tech features" 
ON public.neuro_tech 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own neuro tech features" 
ON public.neuro_tech 
FOR DELETE 
USING (auth.uid() = user_id);

-- Enable RLS on crypbots table
ALTER TABLE public.crypbots ENABLE ROW LEVEL SECURITY;

-- Create policies for crypbots table
CREATE POLICY "Users can view their own crypbots" 
ON public.crypbots 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own crypbots" 
ON public.crypbots 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own crypbots" 
ON public.crypbots 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own crypbots" 
ON public.crypbots 
FOR DELETE 
USING (auth.uid() = user_id);

-- Phase 2: Fix database function security by updating search paths
CREATE OR REPLACE FUNCTION public.handle_new_vault_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert into users table
  INSERT INTO public.users (user_id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'name', '')
  );

  -- Insert into balances table
  INSERT INTO public.balances (user_id)
  VALUES (NEW.id);

  -- Insert into rewards table
  INSERT INTO public.rewards (user_id)
  VALUES (NEW.id);

  -- Insert into verification table
  INSERT INTO public.verification (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.add_default_credit_activity()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    INSERT INTO public.credit_activity (user_id, event_type, description, amount)
    VALUES
        (NEW.user_id, 'Credit', 'Credit line increase approved', 15000),
        (NEW.user_id, 'Rewards', 'Premium rewards earned', 347),
        (NEW.user_id, 'Tradeline', 'Tradeline boost activated', 75),
        (NEW.user_id, 'Payment', 'Auto-payment processed', 2450),
        (NEW.user_id, 'Benefit', 'Vault tier upgrade qualified', 0);
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, username, full_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
  );
  RETURN NEW;
END;
$function$;