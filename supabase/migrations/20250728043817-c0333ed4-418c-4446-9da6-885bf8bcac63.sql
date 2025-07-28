-- Create users table for vault members
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  vault_id TEXT UNIQUE DEFAULT ('VAULT-' || UPPER(SUBSTR(REPLACE(gen_random_uuid()::text, '-', ''), 1, 8))),
  tier TEXT DEFAULT 'Starter',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create balances table
CREATE TABLE public.balances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_balance NUMERIC DEFAULT 0,
  available_credit NUMERIC DEFAULT 0,
  pending_balance NUMERIC DEFAULT 0,
  monthly_limit NUMERIC DEFAULT 0,
  cash_back_rate NUMERIC DEFAULT 0,
  score_boost INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rewards table
CREATE TABLE public.rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  next_tier TEXT DEFAULT 'Starter',
  progress_percent INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('payment', 'tradeline_boost', 'reward')),
  amount NUMERIC NOT NULL,
  description TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create verification table
CREATE TABLE public.verification (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_id_url TEXT,
  utility_bill_url TEXT,
  business_docs_url TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_controls table
CREATE TABLE public.admin_controls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create signup_tokens table for Shopify webhook validation
CREATE TABLE public.signup_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  shopify_order_id TEXT,
  used BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signup_tokens ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for balances table
CREATE POLICY "Users can view their own balances" ON public.balances
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own balances" ON public.balances
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can update balances" ON public.balances
  FOR UPDATE USING (true);

-- Create RLS policies for rewards table
CREATE POLICY "Users can view their own rewards" ON public.rewards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own rewards" ON public.rewards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can update rewards" ON public.rewards
  FOR UPDATE USING (true);

-- Create RLS policies for transactions table
CREATE POLICY "Users can view their own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert transactions" ON public.transactions
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for verification table
CREATE POLICY "Users can view their own verification" ON public.verification
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own verification" ON public.verification
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own verification" ON public.verification
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for admin_controls table
CREATE POLICY "Service role can manage admin controls" ON public.admin_controls
  FOR ALL USING (true);

-- Create RLS policies for signup_tokens table
CREATE POLICY "Service role can manage signup tokens" ON public.signup_tokens
  FOR ALL USING (true);

-- Create function to auto-create user data on signup
CREATE OR REPLACE FUNCTION public.handle_new_vault_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'auth'
AS $$
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
$$;

-- Create trigger for auto-creating user data
CREATE TRIGGER on_auth_user_created_vault
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_vault_user();

-- Create function for updating timestamps
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_balances_updated_at
  BEFORE UPDATE ON public.balances
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rewards_updated_at
  BEFORE UPDATE ON public.rewards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_verification_updated_at
  BEFORE UPDATE ON public.verification
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();