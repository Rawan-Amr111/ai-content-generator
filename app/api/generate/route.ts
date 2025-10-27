import { masterPromptTemplate } from "@/lib/prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  try {
    const body = await request.json();
    const { prompt, selectedTemplate } = body;

    if (!prompt || !selectedTemplate) {
      return NextResponse.json(
        { error: "prompt and template are required" },
        { status: 400 }
      );
    }
    const finalPrompt = masterPromptTemplate
      .replace("{{prompt}}", prompt)
      .replace("{{template}}", selectedTemplate);

    const aiResponse = await model.generateContent(finalPrompt);
    const response = aiResponse.response;
    const result = response.text();
    const parts = result.split("||TITLE||");
    const content = parts[0].trim() || result;
    const title = parts[1].trim() || "untitled";
    return NextResponse.json({ content, title }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
