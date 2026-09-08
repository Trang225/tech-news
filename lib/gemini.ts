import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function testGemini() {
  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: "Reply with exactly: TECH NEWS GEMINI OK",
  });

  return interaction.output_text;
}