import { analyzeResume } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || resumeText.trim() === "") {
      return Response.json(
        { error: "Resume text is required." },
        { status: 400 }
      );
    }

    const analysis = await analyzeResume(resumeText, jobDescription || "");

    return Response.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Analysis Error:", error);

    return Response.json(
      {
        error: error.message || "Internal Server Error",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
