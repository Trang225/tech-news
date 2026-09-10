import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are missing");
  }

  return createClient(url, key);
}

export async function getNewsFromSupabase() {
  const supabase = getSupabaseClient();

  const { data: latestBatch, error: batchError } = await supabase
    .from("news")
    .select("batch_id")
    .not("batch_id", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (batchError || !latestBatch?.batch_id) {
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

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("batch_id", latestBatch.batch_id)
    .order("score", { ascending: false })
    .limit(30);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getNewsArticleById(id: number) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
