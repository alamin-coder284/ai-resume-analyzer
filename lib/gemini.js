import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeResume(resumeText, jobDescription) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in .env.local");
  }

 const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json", // Ensures you get pure JSON back
    },
  });

  const prompt = `
You are an expert ATS resume analyzer.

Return ONLY valid JSON in the following format:
{
  "ATS_Score": number,
  "Strengths": [],
  "Weaknesses": [],
  "Missing_Keywords": [],
  "Suggestions": [],
  "Recommended_Skills": [],
  "Formatting_and_Grammar_Feedback": [],
  "Professional_Summary": ""
}

Resume:
${resumeText}

Job Description:
${jobDescription || "Not provided"}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
  
}