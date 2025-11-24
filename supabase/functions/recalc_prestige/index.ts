import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Prestige rank calculation logic
function calculatePrestigeRank(invitesSent: number, usersJoined: number): string {
  const score = invitesSent + (usersJoined * 5); // Weight joined users more

  if (score >= 100) return "Diamond";
  if (score >= 50) return "Platinum";
  if (score >= 25) return "Gold";
  if (score >= 10) return "Silver";
  return "Bronze";
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { userId } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "userId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Count invites sent by this user
    const { count: invitesSent, error: invitesError } = await supabase
      .from("invites")
      .select("*", { count: "exact", head: true })
      .eq("inviter_id", userId);

    if (invitesError) {
      console.error("Error counting invites:", invitesError);
      return new Response(
        JSON.stringify({ error: "Failed to count invites" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Count users who joined using this user's invites
    const { count: usersJoined, error: joinedError } = await supabase
      .from("invites")
      .select("*", { count: "exact", head: true })
      .eq("inviter_id", userId)
      .not("used_by", "is", null);

    if (joinedError) {
      console.error("Error counting joined users:", joinedError);
      return new Response(
        JSON.stringify({ error: "Failed to count joined users" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Calculate new prestige rank
    const newRank = calculatePrestigeRank(invitesSent || 0, usersJoined || 0);

    // Update the user's profile with new rank
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ prestige_rank: newRank })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating profile:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update prestige rank" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        rank: newRank,
        invites_sent: invitesSent || 0,
        users_joined: usersJoined || 0,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
