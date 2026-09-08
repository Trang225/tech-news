import { NextResponse } from "next/server";
import { testGemini } from "@/lib/gemini";

export async function GET() {
  try {
    const result = await testGemini();

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Gemini test error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}