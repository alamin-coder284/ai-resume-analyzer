import { NextResponse } from "next/server";
import { parseResume } from "@/lib/resumeParser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    console.log("Upload API called");

    const formData = await req.formData();
    const file = formData.get("resume");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    console.log("File received:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!buffer.length) {
      return NextResponse.json(
        { success: false, error: "Empty file received" },
        { status: 400 }
      );
    }

    let text = "";
    try {
      text = await parseResume(buffer, file.type, file.name);
    } catch (parseError) {
      console.error("Parse Error:", parseError);
      return NextResponse.json(
        {
          success: false,
          error: parseError.message || "Failed to parse resume",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      text,
    });
  } catch (error) {
    console.error("Upload Route Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}