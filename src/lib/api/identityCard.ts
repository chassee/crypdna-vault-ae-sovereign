export async function getIdentityCard(userId: string) {
  const url = 'https://jkrwyotrdlucyynnotpd.supabase.co/functions/v1/identity_card';

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
