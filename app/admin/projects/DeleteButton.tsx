"use client";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  async function onDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    router.refresh();
  }
  return (
    <button onClick={onDelete} className="text-[11px] uppercase tracking-[0.12em] px-3 py-1 border border-ink hover:bg-accent hover:text-ink hover:border-accent transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
      Delete
    </button>
  );
}
