-- Remove sensitive credit card data and implement secure tokenization
-- First, backup any existing card data (admin should handle this separately)

-- Drop the insecure paw_debit_card table entirely
DROP TABLE IF EXISTS public.paw_debit_card;

-- Create a secure card_tokens table that only stores tokenized references
CREATE TABLE public.card_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  card_last_four TEXT NOT NULL, -- Only store last 4 digits for display
  card_brand TEXT, -- visa, mastercard, etc.
  expiry_month INTEGER,
  expiry_year INTEGER,
  token_reference TEXT, -- External payment processor token reference
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on the new secure table
ALTER TABLE public.card_tokens ENABLE ROW LEVEL SECURITY;

-- Create secure RLS policies
CREATE POLICY "Users can view their own card tokens" 
ON public.card_tokens 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own card tokens" 
ON public.card_tokens 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own card tokens" 
ON public.card_tokens 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own card tokens" 
ON public.card_tokens 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_card_tokens_updated_at
BEFORE UPDATE ON public.card_tokens
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();