import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Contact } from "@/models/Contact";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const lead = await Contact.findById(id).lean();
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(lead);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const body = await req.json();
  // Only allow status + notes to be updated — the original submission stays immutable
  const allowed: Record<string, any> = {};
  if (body.status !== undefined) allowed.status = body.status;
  if (body.notes !== undefined) allowed.notes = body.notes;
  const updated = await Contact.findByIdAndUpdate(id, allowed, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  await Contact.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
