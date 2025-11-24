import { supabase } from "@/integrations/supabase/client";

export async function createInvite(userId: string) {
  const url = 'https://jkrwyotrdlucyynnotpd.supabase.co/functions/v1/create_invite';

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
    throw new Error("Failed to create invite link");
  }

  return response.json();
}
