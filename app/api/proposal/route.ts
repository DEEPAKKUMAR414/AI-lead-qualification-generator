import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Generate a professional software project proposal.

Client Name: ${body.name}
Project: ${body.projectType}
Budget: ${body.budget}
Timeline: ${body.timeline}
Features: ${body.features}

The proposal should contain:

1. Introduction
2. Project Scope
3. Features
4. Timeline
5. Budget
6. Conclusion

Return only the proposal.
`;

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 700,
    });

    const proposal = completion.choices[0]?.message?.content;

    return NextResponse.json({
      proposal,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate proposal",
      },
      {
        status: 500,
      }
    );
  }
}