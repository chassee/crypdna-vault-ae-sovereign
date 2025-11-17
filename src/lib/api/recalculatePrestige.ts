export async function recalcPrestige(userId: string) {
  const url = ${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/Recalc_prestige;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to recalculate prestige rank");
  }

  return response.json();
}
