import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

type Article = {
  title: string;
  source: string;
  description: string;
  publishedAt: string;
  link: string;
};

type RankedArticle = {
  link: string;
  score: number;
  importance: number;
  freshness: number;
  readerInterest: number;
  reason: string;
};

export async function rankArticles(
  articles: Article[]
): Promise<RankedArticle[]> {
  const articleData = articles.map((article, index) => ({
    id: index,
    title: article.title,
    source: article.source,
    description: article.description,
    publishedAt: article.publishedAt,
    link: article.link,
  }));

  const prompt = `
You are the editor of a professional technology news website.

Your job is to rank technology news articles and identify the stories
that are most important and interesting for readers.

Evaluate every article using these criteria:

1. Importance (0-10)
- Major technology announcements
- Important product launches
- Major AI developments
- Cybersecurity incidents
- Important business or industry developments
- Scientific or technological breakthroughs

2. Freshness (0-10)
- Recent news should score higher.
- Breaking or newly developing stories should receive a high score.

3. Reader Interest (0-10)
- How interesting and useful this story is to a broad technology audience.

Calculate:

score = importance * 0.45 + freshness * 0.25 + readerInterest * 0.30

Avoid ranking ordinary product reviews, minor updates, repetitive stories,
or low-impact articles too highly.

Return ONLY valid JSON.

The JSON must have this exact structure:

{
  "articles": [
    {
      "id": 0,
      "importance": 8,
      "freshness": 9,
      "readerInterest": 8,
      "score": 8.35,
      "reason": "Short explanation"
    }
  ]
}

Here are the articles:

${JSON.stringify(articleData)}
`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
  });

  const text = interaction.output_text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  let parsed: {
    articles: Array<{
      id: number;
      importance: number;
      freshness: number;
      readerInterest: number;
      score: number;
      reason: string;
    }>;
  };

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Gemini returned invalid JSON");
  }

  return parsed.articles
    .map((item) => {
      const originalArticle = articles[item.id];

      if (!originalArticle) {
        return null;
      }

      return {
        link: originalArticle.link,
        score: item.score,
        importance: item.importance,
        freshness: item.freshness,
        readerInterest: item.readerInterest,
        reason: item.reason,
      };
    })
    .filter((item): item is RankedArticle => item !== null)
    .sort((a, b) => b.score - a.score);
}