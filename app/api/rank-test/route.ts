import { NextResponse } from "next/server";
import { getTechNews } from "@/lib/rss";
import { rankArticles } from "@/lib/gemini-ranking";

export async function GET() {
  try {
    const news = await getTechNews();

    const testArticles = news.slice(0, 10);

    const ranked = await rankArticles(testArticles);

    return NextResponse.json({
      success: true,
      inputCount: testArticles.length,
      ranked,
    });
  } catch (error) {
    console.error("Ranking test error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}