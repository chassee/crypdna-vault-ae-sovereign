export async function createInvite(userId: string) {
  const url = ${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/create-invite;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to create invite link");
  }

  return response.json();
}
