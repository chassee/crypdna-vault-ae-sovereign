export async function recalcPrestige(userId: string) {
  const url = 'https://jkrwyotrdlucyynnotpd.supabase.co/functions/v1/recalc_prestige';

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
