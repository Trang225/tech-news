import { createClient } from "@supabase/supabase-js";

export async function getNewsFromSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are missing");
  }

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("score", { ascending: false })
    .limit(30);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
