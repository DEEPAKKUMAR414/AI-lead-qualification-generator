import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY RECEIVED:", body);

    const lead = await prisma.lead.create({
      data: {
        name: body.name || "",
        email: body.email || "",
        projectType: body.projectType || "",
        budget: body.budget || "",
        timeline: body.timeline || "",
        features: body.features || "",
        score: body.score ?? 0,
      },
    });

    console.log("SAVED:", lead);

    return NextResponse.json({
  success: true,
  id: lead.id,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const lead = await prisma.lead.update({
      where: {
        id: body.id,
      },
      data: {
  ...(body.name !== undefined && { name: body.name }),
  ...(body.email !== undefined && { email: body.email }),
  ...(body.projectType !== undefined && {
    projectType: body.projectType,
  }),
  ...(body.budget !== undefined && {
    budget: body.budget,
  }),
  ...(body.timeline !== undefined && {
    timeline: body.timeline,
  }),
  ...(body.features !== undefined && {
    features: body.features,
  }),
  ...(body.score !== undefined && {
    score: body.score,
  }),
  ...(body.status !== undefined && {
    status: body.status,
  }),
},
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}