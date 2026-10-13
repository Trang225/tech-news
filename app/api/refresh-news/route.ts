import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getTechNews } from "@/lib/rss";
import { getTopNews } from "@/lib/gemini-top-news";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const batchId = new Date().toISOString();
  let supabase: ReturnType<
    typeof createClient<any, "public", any>
  > | null = null;

  try {
    console.log("=== REFRESH NEWS START ===");

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    console.log("Supabase URL exists:", !!url);
    console.log("Supabase secret key exists:", !!secretKey);

    if (!url || !secretKey) {
      throw new Error("Supabase environment variables are missing");
    }

    supabase = createClient(url, secretKey);

    const { error: startError } = await supabase
      .from("news_batches")
      .upsert(
        {
          batch_id: batchId,
          story_count: 0,
          status: "started",
          error_message: null,
        },
        { onConflict: "batch_id" }
      );

    if (startError) throw new Error(startError.message);

    console.log("Step 1: Fetching RSS...");
    const candidates = await getTechNews();

    console.log("Step 2: RSS done. Candidates:", candidates.length);

    console.log("Step 3: Calling Gemini...");
    const topStories = await getTopNews(candidates);

    console.log("Step 4: Gemini done. Stories:", topStories.length);

    const newsToInsert = topStories
      .map((story) => {
        const article = candidates[story.articleId];

        if (!article) {
          console.log("Missing article:", story.articleId);
          return null;
        }

        return {
          title: article.title,
          title_vi: story.titleVi,
          description: article.description,
          description_vi: story.descriptionVi,
          source: article.source,
          link: article.link,
          image: article.image,
          published_at: article.publishedAt || null,
          score: story.score,
          importance: story.importance,
          freshness: story.freshness,
          reader_interest: story.readerInterest,
          duplicates: story.duplicateArticleIds.length,
          reason: story.reason,
          summary_vi: story.summaryVi,
          analysis_vi: story.analysisVi,
          batch_id: batchId,
        };
      })
      .filter(
        (item): item is NonNullable<typeof item> =>
          item !== null
      );

    console.log(
      "Step 5: Prepared rows:",
      newsToInsert.length
    );

    console.log("Step 6: Writing to Supabase...");

    const { error } = await supabase
      .from("news")
      .upsert(newsToInsert, {
        onConflict: "link",
      });

    if (error) {
      console.error("Supabase write error:", error);
      throw new Error(error.message);
    }

    console.log("Step 7: Supabase write successful.");
    const { error: batchError } = await supabase
      .from("news_batches")
      .upsert(
        {
          batch_id: batchId,
          story_count: newsToInsert.length,
          status: "completed",
          error_message: null,
        },
        {
          onConflict: "batch_id",
        }
      );

    if (batchError) {
      console.error("Batch history write error:", batchError);
      throw new Error(batchError.message);
    }

    console.log("Step 8: Batch history saved.");

    console.log("=== REFRESH NEWS DONE ===");

    return NextResponse.json({
      success: true,
      candidateCount: candidates.length,
      savedCount: newsToInsert.length,
    });
  } catch (error) {
    console.error("=== REFRESH NEWS ERROR ===");
    console.error(error);

    if (supabase) {
      try {
        const { error: logError } = await supabase
          .from("news_batches")
          .upsert(
            {
              batch_id: batchId,
              story_count: 0,
              status: "failed",
              error_message: (
                error instanceof Error ? error.message : String(error)
              ).slice(0, 2000),
            },
            { onConflict: "batch_id" }
          );

        if (logError) console.error("Failed to save error log:", logError);
      } catch (logError) {
        console.error("Failed to save error log:", logError);
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}