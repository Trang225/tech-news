import { NextResponse } from "next/server";
import { getTechNews } from "@/lib/rss";
import { getTopNews } from "@/lib/gemini-top-news";

export async function GET() {
  try {
    const candidates = await getTechNews();

    const topNews = await getTopNews(candidates);

    const result = topNews.map((story, index) => {
      const article = candidates[story.articleId];

      return {
        rank: index + 1,
        title: article.title,
        source: article.source,
        score: story.score,
        duplicates: story.duplicateArticleIds.length,
        reason: story.reason,
        link: article.link,
      };
    });

    return NextResponse.json({
      success: true,
      candidateCount: candidates.length,
      topNewsCount: result.length,
      topNews: result,
    });
  } catch (error) {
    console.error("Top news error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
