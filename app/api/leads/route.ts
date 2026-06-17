import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Contact } from "@/models/Contact";

export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const query: Record<string, any> = {};
  if (status && status !== "all") query.status = status;
  const leads = await Contact.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json(leads);
}
