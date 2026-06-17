import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Contact } from "@/models/Contact";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body.name || !body.email || !body.projectType || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const submission = await Contact.create(body);
    // TODO: send notification email (Resend, Postmark, etc.)
    return NextResponse.json({ ok: true, id: submission._id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
