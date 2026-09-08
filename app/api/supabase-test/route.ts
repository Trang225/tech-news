import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return NextResponse.json(
      {
        success: false,
        error: "Supabase environment variables are missing",
      },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from("news")
      .select("id")
      .limit(1);

    if (error) {
      return NextResponse.json({
        success: false,
        error: {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Supabase connected successfully.",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
