import { NextResponse } from "next/server";
import slugify from "slugify";
import { dbConnect } from "@/lib/db";
import { Project } from "@/models/Project";

export async function GET() {
  await dbConnect();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  if (!body.title || !body.year) {
    return NextResponse.json({ error: "title and year are required" }, { status: 400 });
  }
  // Auto-slug if not provided
  const slug = body.slug?.trim() || slugify(body.title, { lower: true, strict: true });
  try {
    const created = await Project.create({ ...body, slug });
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json({ error: "Slug already exists. Pick another." }, { status: 409 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
