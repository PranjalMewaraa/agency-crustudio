import ProjectForm from "@/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.15em] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>Admin / Projects / New</div>
        <h1 className="uppercase" style={{ fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: "-0.03em", lineHeight: 1 }}>New project</h1>
      </div>
      <ProjectForm mode="new" />
    </div>
  );
}
