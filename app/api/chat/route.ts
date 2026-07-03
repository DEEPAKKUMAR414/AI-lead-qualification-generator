import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI Lead Qualification Assistant. Ask one question at a time and collect project details, budget, timeline and requirements.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        reply: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}