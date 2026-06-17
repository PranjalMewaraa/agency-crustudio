import Link from "next/link";
import { dbConnect } from "@/lib/db";
import { Project } from "@/models/Project";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function ProjectsListPage() {
  await dbConnect();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.15em] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>Admin / Projects</div>
          <h1 className="uppercase" style={{ fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: "-0.03em", lineHeight: 1 }}>All projects</h1>
        </div>
        <Link href="/admin/projects/new" className="px-6 py-3 bg-ink text-paper uppercase tracking-[0.15em] text-[12px] hover:bg-accent hover:text-ink transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
          + New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="border-[1.5px] border-ink p-16 text-center bg-paper-2">
          <p className="opacity-70 mb-4" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20 }}>
            No projects yet. Add your first one.
          </p>
          <Link href="/admin/projects/new" className="inline-block px-8 py-3 border-[1.5px] border-ink uppercase tracking-[0.15em] text-[12px] hover:bg-ink hover:text-paper transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
            Create project →
          </Link>
        </div>
      ) : (
        <div className="border-[1.5px] border-ink overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_120px_120px_140px] gap-4 px-5 py-3 bg-ink text-paper text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-mono)" }}>
            <span>Title</span>
            <span>Year</span>
            <span>Layout</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>
          {projects.map((p: any) => (
            <div key={String(p._id)} className="grid grid-cols-[1fr_120px_120px_120px_140px] gap-4 items-center px-5 py-4 border-t border-ink text-sm">
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{p.title}</div>
                <div className="opacity-60 text-[11px]" style={{ fontFamily: "var(--font-mono)" }}>/{p.slug}</div>
              </div>
              <span style={{ fontFamily: "var(--font-mono)" }}>{p.year}</span>
              <span style={{ fontFamily: "var(--font-mono)" }}>{p.layout}</span>
              <span className={`text-[11px] uppercase tracking-[0.12em] ${p.published ? "text-[#00cc66]" : "opacity-50"}`} style={{ fontFamily: "var(--font-mono)" }}>
                {p.published ? "● Live" : "Draft"}
              </span>
              <div className="flex gap-2 justify-end">
                <Link href={`/admin/projects/${p._id}`} className="text-[11px] uppercase tracking-[0.12em] px-3 py-1 border border-ink hover:bg-ink hover:text-paper transition-colors" style={{ fontFamily: "var(--font-mono)" }}>Edit</Link>
                <DeleteButton id={String(p._id)} title={p.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
