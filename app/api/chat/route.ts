import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
You are an AI Lead Qualification Assistant.

Your job is to:
- Understand project requirements
- Ask follow-up questions
- Collect budget
- Collect timeline
- Collect required features

Ask only one question at a time.

User: ${message}
`,
    });

    return Response.json({
      reply: response.text,
    });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return Response.json(
      {
        reply: `ERROR: ${error?.message || "Unknown Error"}`,
      },
      { status: 500 }
    );
  }
}