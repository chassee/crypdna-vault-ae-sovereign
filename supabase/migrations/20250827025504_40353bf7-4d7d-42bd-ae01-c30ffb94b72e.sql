-- CRITICAL SECURITY FIX 1: Enable RLS on paid_customers table to prevent data exposure
ALTER TABLE public.paid_customers ENABLE ROW LEVEL SECURITY;

-- Create restrictive policy - only service role can access customer data
CREATE POLICY "Service role can manage paid customers" 
ON public.paid_customers 
FOR ALL 
USING (auth.role() = 'service_role'::text)
WITH CHECK (auth.role() = 'service_role'::text);

-- CRITICAL SECURITY FIX 2: Fix database functions with proper search_path settings
CREATE OR REPLACE FUNCTION public.update_balance()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if vault_balances table exists before trying to update it
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vault_balances') THEN
    IF NEW.transaction_type = 'credit' THEN
      UPDATE public.vault_balances
      SET amount = amount + NEW.amount
      WHERE user_id = NEW.user_id;
    ELSIF NEW.transaction_type = 'debit' THEN
      UPDATE public.vault_balances
      SET amount = amount - NEW.amount
      WHERE user_id = NEW.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.audit_sensitive_operations()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Log sensitive operations to a separate audit table (to be created if needed)
  IF TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_log (
      table_name, 
      operation, 
      user_id, 
      old_data, 
      new_data, 
      timestamp
    ) VALUES (
      TG_TABLE_NAME,
      TG_OP,
      auth.uid(),
      row_to_json(OLD),
      row_to_json(NEW),
      now()
    );
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.mark_member_from_paid()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  update public.profiles
     set is_member = true
   where lower(email) = lower(new.email);
  return new;
end;
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

CREATE OR REPLACE FUNCTION public._ensure_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END $function$;