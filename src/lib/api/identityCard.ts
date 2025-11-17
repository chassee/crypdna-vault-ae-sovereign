export async function getIdentityCard(userId: string) {
  const url = ${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/Identity-Card-;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch identity card");
  }

  return response.json();
}
