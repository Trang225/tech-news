import { NextResponse } from "next/server";
import { getTechNews } from "@/lib/rss";

export async function GET() {
  try {
    const news = await getTechNews();

    return NextResponse.json({
      success: true,
      count: news.length,
      news,
    });
  } catch (error) {
    console.error("News API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
      },
      { status: 500 }
    );
  }
}