import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, leadData } = await req.json();

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are a professional AI Sales Consultant.

You are helping qualify software development leads.

Current Lead:

${JSON.stringify(leadData)}

Your tasks:

1. Read the user's latest message.
2. Extract ONLY these fields:
- name
- email
- projectType
- budget
- timeline
- features

3. Never store the whole sentence.

Example:

User:
Hi I am Walker

Store:
name = Walker

NOT:
name = "Hi I am Walker"

Another example:

User:
Budget is around ₹2 lakh.

Store:
budget = ₹2 lakh

Another:

User:
Need ecommerce website with payment gateway.

Store:

projectType = Ecommerce Website

features = Payment Gateway

If user didn't provide a field,
keep previous value.

Reply naturally like ChatGPT.

If user wants to talk casually,
talk casually.

Don't sound like a form.

Ask only ONE follow-up question.

Return ONLY JSON.

{
 "reply":"",
 "leadData":{
  "name":"",
  "email":"",
  "projectType":"",
  "budget":"",
  "timeline":"",
  "features":""
 }
}
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const text = completion.choices[0].message.content ?? "{}";

    const data = JSON.parse(text);

    return Response.json(data);
  } catch (err) {
    console.error(err);

    return Response.json({
      reply: "Sorry, I couldn't process that.",
      leadData: {
        name: "",
        email: "",
        projectType: "",
        budget: "",
        timeline: "",
        features: "",
      },
    });
  }
}