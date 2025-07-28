import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const webhookSecret = "775f9613af05dbdba171db703d6074f7";

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HMAC-SHA256 verification for Shopify webhooks
async function verifyShopifySignature(body: string, signature: string, secret: string): Promise<boolean> {
  if (!secret) {
    console.error("SHOPIFY_WEBHOOK_SECRET not configured");
    return false;
  }
  
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const hmac = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const computedSignature = "sha256=" + Array.from(new Uint8Array(hmac))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
    
  return computedSignature === signature;
}

async function generateSecureToken(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("x-shopify-hmac-sha256");
    
    if (!signature) {
      console.error("Missing Shopify signature");
      return new Response(JSON.stringify({ error: "Missing signature" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!webhookSecret) {
      console.error("SHOPIFY_WEBHOOK_SECRET not configured");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Verify Shopify signature
    const isValid = await verifyShopifySignature(body, signature, webhookSecret);
    if (!isValid) {
      console.error("Invalid Shopify signature");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const order = JSON.parse(body);
    console.log("Shopify order received:", { id: order.id, email: order.email, financial_status: order.financial_status });

    // Only process paid orders
    if (order.financial_status !== "paid") {
      console.log("Order not paid, skipping");
      return new Response(JSON.stringify({ message: "Order not paid" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const customerEmail = order.email;
    const shopifyOrderId = order.id.toString();

    if (!customerEmail) {
      console.error("No email in order");
      return new Response(JSON.stringify({ error: "No email in order" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Check if this order already created a token
    const { data: existingToken } = await supabase
      .from("signup_tokens")
      .select("id")
      .eq("shopify_order_id", shopifyOrderId)
      .single();

    if (existingToken) {
      console.log("Token already exists for this order");
      return new Response(JSON.stringify({ message: "Token already exists" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Generate secure signup token
    const token = await generateSecureToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Store signup token
    const { error: tokenError } = await supabase
      .from("signup_tokens")
      .insert({
        token,
        email: customerEmail,
        shopify_order_id: shopifyOrderId,
        expires_at: expiresAt.toISOString(),
      });

    if (tokenError) {
      console.error("Error storing token:", tokenError);
      return new Response(JSON.stringify({ error: "Failed to store token" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send email with vault login link
    const loginUrl = `${supabaseUrl.replace('.supabase.co', '')}.vercel.app/vault-login?token=${token}`;
    
    const emailResponse = await resend.emails.send({
      from: "CrypDNA Vault <onboarding@resend.dev>",
      to: [customerEmail],
      subject: "Welcome to the Vault",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; font-size: 28px; margin: 0;">🔐 CrypDNA Vault</h1>
            <p style="color: #666; font-size: 16px; margin: 10px 0 0 0;">Your exclusive financial vault awaits</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h2 style="color: white; font-size: 24px; margin: 0 0 15px 0;">Welcome to the Vault!</h2>
            <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0 0 25px 0;">Your payment has been confirmed. Access your vault now.</p>
            <a href="${loginUrl}" style="display: inline-block; background: white; color: #667eea; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Access Your Vault</a>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1a1a1a; font-size: 18px; margin: 0 0 15px 0;">🎯 What's Inside Your Vault:</h3>
            <ul style="color: #666; padding-left: 20px; margin: 0;">
              <li>Personal Crypdawgs Credit Card</li>
              <li>Business Credit Building Tools</li>
              <li>Exclusive Member Rewards</li>
              <li>AI-Powered Financial Companion</li>
            </ul>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 14px;">
            <p>This link expires in 7 days. If you didn't purchase vault access, please ignore this email.</p>
            <p>Order ID: ${shopifyOrderId}</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      message: "Signup token created and email sent",
      token,
      email: customerEmail 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in shopify-order-paid function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);