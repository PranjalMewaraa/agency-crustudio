import Link from "next/link";
import { dbConnect } from "@/lib/db";
import { Contact, type LeadStatus } from "@/models/Contact";

export const dynamic = "force-dynamic";

const STATUSES: { key: LeadStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "qualified", label: "Qualified" },
  { key: "archived", label: "Archived" },
];

const STATUS_COLOR: Record<LeadStatus, string> = {
  new: "text-[#00cc66]",
  contacted: "text-[#ffaa00]",
  qualified: "text-accent",
  archived: "opacity-50",
};

function fmtDate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" });
}

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const sp = await searchParams;
  const activeStatus = (sp.status || "all") as LeadStatus | "all";

  await dbConnect();

  // Counts for all status tabs
  const counts = await Contact.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
  const countMap: Record<string, number> = { all: 0 };
  counts.forEach((c: any) => { countMap[c._id] = c.count; countMap.all += c.count; });

  // Filtered list
  const query: any = activeStatus === "all" ? {} : { status: activeStatus };
  const leads = await Contact.find(query).sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.15em] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>Admin / Leads</div>
        <h1 className="uppercase" style={{ fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: "-0.03em", lineHeight: 1 }}>
          Inbound leads
        </h1>
        <p className="mt-2 opacity-70" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16 }}>
          Submissions from the contact form on the homepage.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-0 mb-8 border-[1.5px] border-ink w-fit">
        {STATUSES.map((s) => {
          const active = activeStatus === s.key;
          return (
            <Link
              key={s.key}
              href={s.key === "all" ? "/admin/leads" : `/admin/leads?status=${s.key}`}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] border-r border-ink last:border-r-0 transition-colors ${active ? "bg-ink text-paper" : "hover:bg-paper-2"}`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {s.label} <span className="opacity-60 ml-1">({countMap[s.key] || 0})</span>
            </Link>
          );
        })}
      </div>

      {leads.length === 0 ? (
        <div className="border-[1.5px] border-ink p-16 text-center bg-paper-2">
          <p className="opacity-70" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20 }}>
            {activeStatus === "all" ? "No leads yet. Submissions will appear here." : `No leads with status "${activeStatus}".`}
          </p>
        </div>
      ) : (
        <div className="border-[1.5px] border-ink overflow-hidden">
          <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_100px_120px] gap-4 px-5 py-3 bg-ink text-paper text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-mono)" }}>
            <span>Name</span>
            <span>Email</span>
            <span>Project</span>
            <span>Budget</span>
            <span>Status</span>
            <span className="text-right">Received</span>
          </div>
          {leads.map((l: any) => (
            <Link
              key={String(l._id)}
              href={`/admin/leads/${l._id}`}
              className="grid grid-cols-[1fr_1.5fr_1fr_1fr_100px_120px] gap-4 items-center px-5 py-4 border-t border-ink hover:bg-paper-2 transition-colors text-sm no-underline text-ink"
            >
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{l.name}</div>
                {l.company && <div className="opacity-60 text-[11px]" style={{ fontFamily: "var(--font-mono)" }}>{l.company}</div>}
              </div>
              <span className="truncate" style={{ fontFamily: "var(--font-mono)" }}>{l.email}</span>
              <span className="text-[12px]" style={{ fontFamily: "var(--font-mono)" }}>{l.projectType}</span>
              <span className="text-[12px]" style={{ fontFamily: "var(--font-mono)" }}>{l.budget || "—"}</span>
              <span className={`text-[11px] uppercase tracking-[0.12em] ${STATUS_COLOR[l.status as LeadStatus] || ""}`} style={{ fontFamily: "var(--font-mono)" }}>
                ● {l.status}
              </span>
              <span className="text-right text-[11px] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>{fmtDate(l.createdAt)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
