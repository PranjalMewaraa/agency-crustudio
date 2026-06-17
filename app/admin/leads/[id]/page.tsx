import { notFound } from "next/navigation";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import { Contact } from "@/models/Contact";
import LeadActions from "./LeadActions";

export const dynamic = "force-dynamic";

function fmtDateTime(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const doc = await Contact.findById(id).lean();
  if (!doc) notFound();
  const lead: any = JSON.parse(JSON.stringify(doc));

  const replySubject = encodeURIComponent(`Re: your project — CrudStudio`);
  const replyBody = encodeURIComponent(`Hi ${lead.name.split(" ")[0]},\n\nThanks for reaching out about your ${lead.projectType.toLowerCase()}. `);
  const mailto = `mailto:${lead.email}?subject=${replySubject}&body=${replyBody}`;

  return (
    <div>
      <div className="mb-8 flex justify-between items-start flex-wrap gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.15em] opacity-60 mb-1" style={{ fontFamily: "var(--font-mono)" }}>
            <Link href="/admin/leads" className="hover:text-accent">Admin / Leads</Link> / Detail
          </div>
          <h1 className="uppercase" style={{ fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: "-0.03em", lineHeight: 1 }}>
            {lead.name}
          </h1>
          <div className="mt-2 text-[12px] uppercase tracking-[0.1em] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>
            Received {fmtDateTime(lead.createdAt)}
          </div>
        </div>
        <a
          href={mailto}
          className="px-6 py-3 bg-ink text-paper uppercase tracking-[0.15em] text-[12px] hover:bg-accent hover:text-ink transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Reply by email →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        {/* Submission body */}
        <div className="space-y-8">
          <div className="border-[1.5px] border-ink p-6 bg-paper-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 pb-6 border-b border-ink">
              <Field label="Email" value={<a href={`mailto:${lead.email}`} className="hover:text-accent border-b border-transparent hover:border-accent transition-colors break-all">{lead.email}</a>} />
              <Field label="Company" value={lead.company || "—"} />
              <Field label="Project type" value={lead.projectType} />
              <Field label="Budget range" value={lead.budget || "—"} />
            </div>

            <div className="text-[11px] uppercase tracking-[0.15em] opacity-60 mb-3" style={{ fontFamily: "var(--font-mono)" }}>Message</div>
            <p className="whitespace-pre-wrap" style={{ fontFamily: "var(--font-serif)", fontSize: 18, lineHeight: 1.55 }}>
              {lead.message}
            </p>
          </div>
        </div>

        {/* Actions sidebar */}
        <LeadActions id={String(lead._id)} initialStatus={lead.status} initialNotes={lead.notes || ""} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.15em] opacity-60 mb-1" style={{ fontFamily: "var(--font-mono)" }}>{label}</div>
      <div className="text-[14px]" style={{ fontFamily: "var(--font-mono)" }}>{value}</div>
    </div>
  );
}
