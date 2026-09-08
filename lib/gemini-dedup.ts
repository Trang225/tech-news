import { GoogleGenAI } from "@google/genai";
import { splitIntoBatches } from "@/lib/batch";

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

type StoryGroup = {
  storyId: number;
  articleIds: number[];
  reason: string;
};

const BATCH_SIZE = 20;

async function dedupBatch(
  articles: Article[],
  startIndex: number
): Promise<StoryGroup[]> {
  const articleData = articles.map((article, index) => ({
    id: startIndex + index,
    title: article.title,
    source: article.source,
    description: article.description,
    publishedAt: article.publishedAt,
  }));

  const prompt = `
You are an expert technology news editor.

Identify articles that report on the SAME underlying news event or story.

Rules:

- Articles from different publications can cover the same event.
- Articles are duplicates when they substantially report the same underlying event.
- Different angles of the same event should still be grouped together.
- Do NOT group articles merely because they mention the same company.
- Do NOT group articles merely because they are about the same broad topic.
- Every article must belong to exactly one story group.
- A group can contain only one article if it has no duplicate.

IMPORTANT:
Only compare the articles in this batch.
Use the exact article IDs provided.

Return JSON using this structure:

{
  "groups": [
    {
      "storyId": 0,
      "articleIds": [0, 3],
      "reason": "Both articles report on the same underlying news event."
    }
  ]
}

Here are the articles:

${JSON.stringify(articleData)}
`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: {
        type: "object",
        properties: {
          groups: {
            type: "array",
            items: {
              type: "object",
              properties: {
                storyId: {
                  type: "integer",
                },
                articleIds: {
                  type: "array",
                  items: {
                    type: "integer",
                  },
                },
                reason: {
                  type: "string",
                },
              },
              required: ["storyId", "articleIds", "reason"],
            },
          },
        },
        required: ["groups"],
      },
    },
  });

  const text = interaction.output_text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  try {
    const parsed = JSON.parse(text) as {
      groups: StoryGroup[];
    };

    return parsed.groups;
  } catch {
    console.error("Gemini raw dedup response:", text);
    throw new Error("Gemini returned invalid JSON");
  }
}

export async function groupDuplicateStories(
  articles: Article[]
): Promise<StoryGroup[]> {
  const batches = splitIntoBatches(articles, BATCH_SIZE);

  console.log(
    `Dedup: ${articles.length} articles split into ${batches.length} batches`
  );

  const allGroups: StoryGroup[] = [];

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const startIndex = i * BATCH_SIZE;

    console.log(
      `Dedup batch ${i + 1}/${batches.length}: ${batch.length} articles`
    );

    const groups = await dedupBatch(batch, startIndex);

    allGroups.push(...groups);
  }

  return allGroups;
}
