-- Add prestige_xp column to vault_members table
ALTER TABLE public.vault_members 
ADD COLUMN IF NOT EXISTS prestige_xp integer DEFAULT 0;

-- Create function to handle XP gain and auto level-up
CREATE OR REPLACE FUNCTION public.award_prestige_xp(
  xp_amount integer,
  p_user_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_level integer;
  current_xp integer;
  xp_needed integer;
  new_xp integer;
  new_level integer;
  leveled_up boolean := false;
BEGIN
  -- Get current prestige data
  SELECT prestige_level, prestige_xp 
  INTO current_level, current_xp
  FROM vault_members
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'User not found');
  END IF;

  -- Add XP
  new_xp := current_xp + xp_amount;
  new_level := current_level;

  -- Calculate XP needed for next level
  xp_needed := current_level * 100;

  -- Check for level up
  WHILE new_xp >= xp_needed LOOP
    new_level := new_level + 1;
    new_xp := new_xp - xp_needed;
    xp_needed := new_level * 100;
    leveled_up := true;
  END LOOP;

  -- Update member record
  UPDATE vault_members
  SET 
    prestige_level = new_level,
    prestige_xp = new_xp
  WHERE user_id = p_user_id;

  -- Return updated values
  RETURN jsonb_build_object(
    'prestige_level', new_level,
    'prestige_xp', new_xp,
    'leveled_up', leveled_up
  );
END;
$$;

-- Create function for users to call their own XP award
CREATE OR REPLACE FUNCTION public.award_my_prestige_xp(xp_amount integer)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN public.award_prestige_xp(xp_amount, auth.uid());
END;
$$;