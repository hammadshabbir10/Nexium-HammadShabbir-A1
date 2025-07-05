import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize with environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
export async function POST(request: Request) {
  const { topic } = await request.json();

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  console.log('Loaded API Key:', process.env.GEMINI_API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `Generate 3 inspirational quotes about ${topic} as a JSON array. Example: ["quote 1", "quote 2", "quote 3"]`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const quotes = JSON.parse(text.trim().replace(/^```json|```$/g, ''));
      return NextResponse.json({ quotes });
    } catch (parseError) {
      throw new Error("Invalid response format from Gemini");
    }
    
  } catch (error: any) {
    console.error("Full API error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { 
        error: "Failed to generate quotes",
        defaultQuotes: [
          "Believe you can and you're halfway there.",
          "Every accomplishment starts with the decision to try.",
          "You are capable of more than you know."
        ]
      },
      { status: 500 }
    );
  }

}