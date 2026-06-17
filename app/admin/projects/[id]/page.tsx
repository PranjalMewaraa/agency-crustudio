import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Project } from "@/models/Project";
import ProjectForm from "@/components/ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const doc = await Project.findById(id).lean();
  if (!doc) notFound();
  const project = JSON.parse(JSON.stringify(doc));

  return (
    <div>
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.15em] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>Admin / Projects / Edit</div>
        <h1 className="uppercase" style={{ fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: "-0.03em", lineHeight: 1 }}>{project.title}</h1>
      </div>
      <ProjectForm mode="edit" id={id} initial={project} />
    </div>
  );
}
