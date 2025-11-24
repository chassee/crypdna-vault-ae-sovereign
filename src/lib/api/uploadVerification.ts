import { supabase } from "@/integrations/supabase/client";

export async function uploadVerification(file: File, userId: string, type: string) {
  const url = 'https://jkrwyotrdlucyynnotpd.supabase.co/functions/v1/upload_verification';

  // Get the current session token
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const form = new FormData();
  form.append("file", file);
  form.append("userId", userId);
  form.append("type", type);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token || ""}`,
    },
    body: form,
  });

  if (!response.ok) {
    throw new Error("Failed to upload verification");
  }

  return response.json();
}
