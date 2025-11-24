import { supabase } from "@/integrations/supabase/client";

export async function getIdentityCard(userId: string) {
  const url = 'https://jkrwyotrdlucyynnotpd.supabase.co/functions/v1/identity_card';

  // Get the current session token
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await fetch(url, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token || ""}`,
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch identity card");
  }

  return response.json();
}
