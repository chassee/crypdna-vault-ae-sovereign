import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const RANK_ORDER = ['Ghost', 'Initiate', 'Adept', 'Oracle', 'Architect'];

function calculateRank(inviteCount: number, membershipTier: string, accountAge: number): string {
  // Simple rank calculation based on invites
  // 0-2 invites: Ghost
  // 3-5 invites: Initiate
  // 6-8 invites: Adept
  // 9-11 invites: Oracle
  // 12+ invites: Architect
  
  let baseRank = 0;
  
  if (inviteCount >= 12) baseRank = 4;
  else if (inviteCount >= 9) baseRank = 3;
  else if (inviteCount >= 6) baseRank = 2;
  else if (inviteCount >= 3) baseRank = 1;
  else baseRank = 0;
  
  // Bonus for premium membership
  if (membershipTier === 'premium' || membershipTier === 'elite') {
    baseRank = Math.min(baseRank + 1, RANK_ORDER.length - 1);
  }
  
  return RANK_ORDER[baseRank];
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const { user_id } = JSON.parse(event.body || "{}");

    if (!user_id) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
        body: JSON.stringify({ error: "User ID is required" })
      };
    }

    // Fetch user profile
    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("invite_count, membership_tier, created_at, rank")
      .eq("id", user_id)
      .single();

    if (fetchError) {
      console.error("Error fetching profile:", fetchError);
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
        body: JSON.stringify({ error: "Failed to fetch user profile" })
      };
    }

    const inviteCount = profile?.invite_count || 0;
    const membershipTier = profile?.membership_tier || 'free';
    const createdAt = profile?.created_at ? new Date(profile.created_at) : new Date();
    const accountAge = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)); // days

    // Calculate new rank
    const newRank = calculateRank(inviteCount, membershipTier, accountAge);
    const oldRank = profile?.rank || 'Ghost';

    // Update rank if changed
    if (newRank !== oldRank) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ rank: newRank })
        .eq("id", user_id);

      if (updateError) {
        console.error("Error updating rank:", updateError);
        return {
          statusCode: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
          body: JSON.stringify({ error: "Failed to update rank" })
        };
      }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
      body: JSON.stringify({ 
        old_rank: oldRank,
        new_rank: newRank,
        invite_count: inviteCount,
        message: newRank !== oldRank ? "Rank updated successfully" : "Rank unchanged"
      })
    };

  } catch (error: any) {
    console.error("Error in recalc-prestige function:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
};
