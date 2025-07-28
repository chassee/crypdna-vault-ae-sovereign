-- Fix RLS policies - ensure all tables have proper policies

-- Add missing policies for users table (DELETE was missing)
CREATE POLICY "Users can delete their own data" ON public.users
  FOR DELETE USING (auth.uid() = user_id);

-- Add missing policies for balances table (DELETE was missing)  
CREATE POLICY "Users can delete their own balances" ON public.balances
  FOR DELETE USING (auth.uid() = user_id);

-- Add missing policies for rewards table (DELETE was missing)
CREATE POLICY "Users can delete their own rewards" ON public.rewards
  FOR DELETE USING (auth.uid() = user_id);

-- Add missing policies for transactions table (UPDATE/DELETE were missing)
CREATE POLICY "Users can update their own transactions" ON public.transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions" ON public.transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Add missing policies for verification table (DELETE was missing)
CREATE POLICY "Users can delete their own verification" ON public.verification
  FOR DELETE USING (auth.uid() = user_id);