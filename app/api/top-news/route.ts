import { NextResponse } from "next/server";
import { getTechNews } from "@/lib/rss";
import { getTopNews } from "@/lib/gemini-top-news";

export async function GET() {
  try {
    const candidates = await getTechNews();

    const topStories = await getTopNews(candidates);

    const topNews = topStories.map((story, index) => {
      const article = candidates[story.articleId];

      return {
        rank: index + 1,
        title: article.title,
        titleVi: story.titleVi,
        source: article.source,
        description: article.description,
        descriptionVi: story.descriptionVi,
        publishedAt: article.publishedAt,
        link: article.link,
        image: article.image,
        score: story.score,
        importance: story.importance,
        freshness: story.freshness,
        readerInterest: story.readerInterest,
        duplicates: story.duplicateArticleIds.length,
        reason: story.reason,
      };
    });

    return NextResponse.json({
      success: true,
      candidateCount: candidates.length,
      topNewsCount: topNews.length,
      topNews,
    });
  } catch (error) {
    console.error("Top news API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
