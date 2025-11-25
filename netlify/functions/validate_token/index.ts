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
    const { token } = JSON.parse(event.body || "{}");

    if (!token) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
        body: JSON.stringify({ 
          valid: false, 
          error: "Token is required" 
        })
      };
    }

    // Query the signup_tokens table to validate the token
    const { data: tokenData, error } = await supabase
      .from("signup_tokens")
      .select("email, used, expires_at")
      .eq("token", token)
      .single();

    if (error || !tokenData) {
      console.log("Token not found:", error);
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
        body: JSON.stringify({ 
          valid: false, 
          error: "Invalid token" 
        })
      };
    }

    // Check if token has been used
    if (tokenData.used) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
        body: JSON.stringify({ 
          valid: false, 
          error: "Token has already been used" 
        })
      };
    }

    // Check if token has expired
    const expiresAt = new Date(tokenData.expires_at);
    if (expiresAt < new Date()) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
        body: JSON.stringify({ 
          valid: false, 
          error: "Token has expired" 
        })
      };
    }

    // Token is valid
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
      body: JSON.stringify({ 
        valid: true, 
        email: tokenData.email 
      })
    };

  } catch (error: any) {
    console.error("Error in validate-token function:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
      body: JSON.stringify({ 
        valid: false, 
        error: "Internal server error" 
      })
    };
  }
};
