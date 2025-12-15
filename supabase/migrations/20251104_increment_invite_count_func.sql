-- Function to increment invite_count for a user
CREATE OR REPLACE FUNCTION public.increment_invite_count(user_id uuid)
RETURNS TABLE (invite_count integer, tier text) AS $$
BEGIN
    UPDATE public.profiles
    SET invite_count = invite_count + 1
    WHERE id = user_id;

    RETURN QUERY
    SELECT p.invite_count, p.tier
    FROM public.profiles p
    WHERE p.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
