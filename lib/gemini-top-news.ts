import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export type TopNewsStory = {
  articleId: number;
  duplicateArticleIds: number[];

  score: number;
  importance: number;
  freshness: number;
  readerInterest: number;

  titleVi: string;
  descriptionVi: string;

  summaryVi: string;
  analysisVi: string;

  reason: string;
};

type Candidate = {
  source: string;
  title: string;
  link: string;
  description: string;
  publishedAt: string;
};

type GeminiResponse = {
  stories: TopNewsStory[];
};

export async function getTopNews(
  candidates: Candidate[]
): Promise<TopNewsStory[]> {
  if (candidates.length === 0) {
    return [];
  }

  const input = candidates.map((article, index) => ({
    articleId: index,
    source: article.source,
    title: article.title,
    description: article.description,
    publishedAt: article.publishedAt,
    link: article.link,
  }));

  const prompt = `
You are the senior editor of a high-quality independent technology news website called TECHNEWS.

Your task is to analyze the candidate technology articles below and select the 30 most important and interesting underlying stories.

IMPORTANT RULES:

1. Select AT MOST 30 stories.
2. If multiple articles report the same underlying story, group them together.
3. For each underlying story, choose the best representative article.
4. Prioritize:
   - major technology developments
   - important product or company announcements
   - AI developments
   - cybersecurity and major security incidents
   - chips and semiconductors
   - major funding, acquisitions or business developments
   - important government/regulatory actions
   - major scientific or technological breakthroughs
   - important events that could affect technology users or the industry
5. Avoid:
   - product reviews
   - buying guides
   - deals
   - tutorials
   - minor software updates
   - entertainment news
   - repetitive stories
   - low-value promotional content
6. Prefer factual, significant stories over sensational headlines.
7. Do not invent facts.
8. Do not copy long passages from the source articles.

For every selected story, provide:

- articleId
- duplicateArticleIds
- score from 0 to 10
- importance from 0 to 10
- freshness from 0 to 10
- readerInterest from 0 to 10
- titleVi
- descriptionVi
- summaryVi
- analysisVi
- reason

LANGUAGE:

Write titleVi, descriptionVi, summaryVi, analysisVi and reason in natural Vietnamese.

The Vietnamese should be clear and easy to understand for a general reader.

CONTENT:

titleVi:
A concise Vietnamese headline.

descriptionVi:
A short Vietnamese description, approximately 1–2 sentences.

summaryVi:
A useful summary of the article/story in approximately 3–5 sentences.
Explain what happened, who is involved and the important facts.
Do not simply translate the RSS description.

analysisVi:
Explain "Vì sao đáng chú ý?" in approximately 2–4 sentences.
Explain the potential significance, impact or broader technology context.
Do not speculate beyond what can reasonably be inferred from the available information.

reason:
A short explanation of why this story deserves a place in the Top 30.

SCORING:

score should reflect the overall editorial value of the story.

importance measures how significant the event is to technology, companies, users or society.

freshness measures how recent the story is.

readerInterest measures how interesting or useful the story is to a broad technology audience.

Return ONLY valid JSON matching this structure:

{
  "stories": [
    {
      "articleId": 0,
      "duplicateArticleIds": [],
      "score": 9.5,
      "importance": 9.5,
      "freshness": 9.0,
      "readerInterest": 9.5,
      "titleVi": "...",
      "descriptionVi": "...",
      "summaryVi": "...",
      "analysisVi": "...",
      "reason": "..."
    }
  ]
}

Candidate articles:

${JSON.stringify(input)}
`;

  const response = await ai.interactions.create({
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
                score: { type: "number" },
                importance: { type: "number" },
                freshness: { type: "number" },
                readerInterest: { type: "number" },
                titleVi: { type: "string" },
                descriptionVi: { type: "string" },
                summaryVi: { type: "string" },
                analysisVi: { type: "string" },
                reason: { type: "string" },
              },
              required: [
                "articleId",
                "duplicateArticleIds",
                "score",
                "importance",
                "freshness",
                "readerInterest",
                "titleVi",
                "descriptionVi",
                "summaryVi",
                "analysisVi",
                "reason",
              ],
            },
          },
        },
        required: ["stories"],
      },
    },
  });

  console.log("=== GEMINI RAW RESPONSE ===");
  console.log(JSON.stringify(response, null, 2));
  console.log("response keys:", Object.keys(response));
  console.log("response prototype:", Object.getOwnPropertyNames(Object.getPrototypeOf(response)));
  console.log("=== END GEMINI RAW RESPONSE ===");

  const text = response.output_text ?? "";

  console.log("Gemini extracted text:", text);

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  let parsed: GeminiResponse;

  try {
    parsed = JSON.parse(text);
  } catch {
    console.error("Gemini raw response:", text);
    throw new Error("Gemini returned invalid JSON.");
  }

  if (!parsed.stories || !Array.isArray(parsed.stories)) {
    throw new Error("Gemini response does not contain stories.");
  }

  return parsed.stories.slice(0, 30);
}
