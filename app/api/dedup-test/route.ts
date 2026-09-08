import { NextResponse } from "next/server";
import { getTechNews } from "@/lib/rss";
import { groupDuplicateStories } from "@/lib/gemini-dedup";

export async function GET() {
  try {
    console.log("Starting full dedup test...");

    const news = await getTechNews();

    console.log(`Testing dedup with ${news.length} articles...`);

    const groups = await groupDuplicateStories(news);

    return NextResponse.json({
      success: true,
      inputCount: news.length,
      groupCount: groups.length,
      groups,
    });
  } catch (error) {
    console.error("Dedup test error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
