export async function uploadVerification(file: File, userId: string, type: string) {
  const url = ${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/upload_verification;

  const form = new FormData();
  form.append("file", file);
  form.append("userId", userId);
  form.append("type", type);

  const response = await fetch(url, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    throw new Error("Failed to upload verification");
  }

  return response.json();
}
