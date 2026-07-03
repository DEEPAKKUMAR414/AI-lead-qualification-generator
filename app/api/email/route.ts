import { NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/app/lib/prisma";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Write a professional follow-up email.

Client Name: ${body.name}
Project Type: ${body.projectType}
Budget: ${body.budget}
Timeline: ${body.timeline}
Features: ${body.features}

The email should:
- Thank the client.
- Mention the project.
- Mention that we can discuss the requirements.
- End professionally.

Return ONLY the email.
`;

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
    });

    const email = completion.choices[0]?.message?.content;

    if (!email) {
      return NextResponse.json(
        {
          error: "Failed to generate email.",
        },
        {
          status: 500,
        }
      );
    }

    await prisma.lead.update({
      where: {
        id: body.id,
      },
      data: {
        followUpEmail: email,
      },
    });

    return NextResponse.json({
      success: true,
      email,
    });
  } catch (error: any) {
    console.error("Email API Error:", error);

    return NextResponse.json(
      {
        error:
          error?.message || "Something went wrong while generating email.",
      },
      {
        status: 500,
      }
    );
  }
}