-- CRITICAL SECURITY FIXES

-- 1. Enable RLS on tables that don't have it
ALTER TABLE public.paw_debit_card ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crypscore ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neurodrop_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lifestyle_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboards ENABLE ROW LEVEL SECURITY;

-- 2. Create RLS policies for paw_debit_card (MOST CRITICAL - contains card numbers and CVV)
CREATE POLICY "Users can view their own debit card" 
ON public.paw_debit_card 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own debit card" 
ON public.paw_debit_card 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own debit card" 
ON public.paw_debit_card 
FOR UPDATE 
USING (auth.uid() = user_id);

-- 3. Create RLS policies for crypscore (contains credit scores)
CREATE POLICY "Users can view their own crypscore" 
ON public.crypscore 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage crypscore" 
ON public.crypscore 
FOR ALL 
USING (auth.role() = 'service_role');

-- 4. Create RLS policies for neurodrop_sessions
CREATE POLICY "Users can view their own neurodrop sessions" 
ON public.neurodrop_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own neurodrop sessions" 
ON public.neurodrop_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 5. Create RLS policies for neuro_tech_sessions (was missing policies)
CREATE POLICY "Users can insert their own neuro tech sessions" 
ON public.neuro_tech_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own neuro tech sessions" 
ON public.neuro_tech_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- 6. Create RLS policies for user_voice_intro (was missing policies)
CREATE POLICY "Users can insert their own voice intro settings" 
ON public.user_voice_intro 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own voice intro settings" 
ON public.user_voice_intro 
FOR UPDATE 
USING (auth.uid() = user_id);

-- 7. Create RLS policies for lifestyle_events (public access for viewing)
CREATE POLICY "Anyone can view lifestyle events" 
ON public.lifestyle_events 
FOR SELECT 
USING (true);

-- 8. Create RLS policies for leaderboards (public access for viewing)
CREATE POLICY "Anyone can view leaderboards" 
ON public.leaderboards 
FOR SELECT 
USING (true);

-- 9. Secure database functions by updating search_path
CREATE OR REPLACE FUNCTION public.update_balance()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.transaction_type = 'credit' THEN
    UPDATE public.vault_balances
    SET amount = amount + NEW.amount
    WHERE user_id = NEW.user_id;
  ELSIF NEW.transaction_type = 'debit' THEN
    UPDATE public.vault_balances
    SET amount = amount - NEW.amount
    WHERE user_id = NEW.user_id;
  END IF;
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

CREATE OR REPLACE FUNCTION public.update_verification_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  NEW.status := 'uploaded';
  RETURN NEW;
END;
$function$;

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