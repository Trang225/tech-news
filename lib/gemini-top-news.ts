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

type TopNews = {
  articleId: number;
  duplicateArticleIds: number[];
  importance: number;
  freshness: number;
  readerInterest: number;
  score: number;
  reason: string;
  titleVi: string;
  descriptionVi: string;
};

export async function getTopNews(
  articles: Article[]
): Promise<TopNews[]> {
  const articleData = articles.map((article, index) => ({
    id: index,
    title: article.title,
    source: article.source,
    description: article.description.slice(0, 300),
    publishedAt: article.publishedAt,
  }));

  console.log(`Sending ${articleData.length} articles to Gemini...`);

  const prompt = `
You are the senior editor of a professional bilingual technology news website.

Select the 30 most important UNIQUE technology stories from the supplied
articles.

First identify articles covering the same underlying story and group them.
Then choose the best representative article for each story.

Evaluate each story:

importance: 0-10
freshness: 0-10
readerInterest: 0-10

score =
importance * 0.45 +
freshness * 0.25 +
readerInterest * 0.30

Avoid:
- reviews
- how-to articles
- buying guides
- deals
- minor updates
- entertainment
- repetitive coverage
- low-impact stories

For every selected story, also translate the representative article into
natural, professional Vietnamese.

Vietnamese translation rules:
- titleVi: concise Vietnamese news headline
- descriptionVi: natural Vietnamese summary based ONLY on the supplied article
- Do not invent facts.
- Keep company names, product names, people names and technical terms accurate.
- Do not translate brand names such as Apple, Google, OpenAI, Microsoft, NVIDIA.
- Vietnamese should sound like professional technology journalism.

Return at most 30 unique stories, sorted by score descending.

articleId must be the ID of the best representative article.

duplicateArticleIds must contain every article ID belonging to the same
underlying story, including articleId itself.

Use only the supplied articles.
Do not invent IDs.

Return ONLY JSON:

{
  "stories": [
    {
      "articleId": 12,
      "duplicateArticleIds": [12, 37],
      "importance": 9,
      "freshness": 9,
      "readerInterest": 9,
      "score": 9.0,
      "reason": "Short explanation.",
      "titleVi": "Tiêu đề tiếng Việt",
      "descriptionVi": "Mô tả tiếng Việt."
    }
  ]
}

ARTICLES:

${JSON.stringify(articleData)}
`;

  console.log("Calling Gemini...");

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: {
        type: "object",
        properties: {
          stories: {
            type: "array",
            items: {
              type: "object",
              properties: {
                articleId: { type: "integer" },
                duplicateArticleIds: {
                  type: "array",
                  items: { type: "integer" },
                },
                importance: { type: "number" },
                freshness: { type: "number" },
                readerInterest: { type: "number" },
                score: { type: "number" },
                reason: { type: "string" },
                titleVi: { type: "string" },
                descriptionVi: { type: "string" },
              },
              required: [
                "articleId",
                "duplicateArticleIds",
                "importance",
                "freshness",
                "readerInterest",
                "score",
                "reason",
                "titleVi",
                "descriptionVi",
              ],
            },
          },
        },
        required: ["stories"],
      },
    },
  });

  console.log("Gemini response received.");

  const text = interaction.output_text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  let parsed: { stories: TopNews[] };

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Gemini returned invalid JSON");
  }

  return parsed.stories
    .filter(
      (story) =>
        story.articleId >= 0 &&
        story.articleId < articles.length
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 30);
}
