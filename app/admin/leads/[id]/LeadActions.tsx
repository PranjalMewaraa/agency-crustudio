"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { LeadStatus } from "@/models/Contact";

const STATUSES: { key: LeadStatus; label: string; color: string }[] = [
  { key: "new", label: "New", color: "text-[#00cc66]" },
  { key: "contacted", label: "Contacted", color: "text-[#ffaa00]" },
  { key: "qualified", label: "Qualified", color: "text-accent" },
  { key: "archived", label: "Archived", color: "opacity-50" },
];

export default function LeadActions({
  id, initialStatus, initialNotes,
}: { id: string; initialStatus: LeadStatus; initialNotes: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<LeadStatus>(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState<"idle" | "saving" | "saved">("idle");
  const [, startTransition] = useTransition();

  async function updateStatus(next: LeadStatus) {
    setStatus(next);
    setSaved("saving");
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setSaved("saved");
    startTransition(() => router.refresh());
    setTimeout(() => setSaved("idle"), 1500);
  }

  async function saveNotes() {
    setSaved("saving");
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setSaved("saved");
    setTimeout(() => setSaved("idle"), 1500);
  }

  async function onDelete() {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    router.push("/admin/leads");
  }

  return (
    <aside className="space-y-6">
      {/* Status */}
      <div className="border-[1.5px] border-ink p-5">
        <div className="text-[11px] uppercase tracking-[0.15em] opacity-60 mb-4" style={{ fontFamily: "var(--font-mono)" }}>Status</div>
        <div className="flex flex-col gap-2">
          {STATUSES.map((s) => (
            <button
              key={s.key}
              onClick={() => updateStatus(s.key)}
              className={`text-left px-3 py-2 border border-ink text-[12px] uppercase tracking-[0.1em] transition-colors ${
                status === s.key ? "bg-ink text-paper" : "hover:bg-paper-2"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className={status === s.key ? "" : s.color}>●</span> {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="border-[1.5px] border-ink p-5">
        <div className="text-[11px] uppercase tracking-[0.15em] opacity-60 mb-3" style={{ fontFamily: "var(--font-mono)" }}>Internal notes</div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What did you discuss? Next steps? Red flags?"
          className="w-full border border-ink bg-paper p-3 outline-none focus:bg-ink focus:text-paper transition-colors min-h-[120px] text-sm"
          style={{ fontFamily: "var(--font-mono)" }}
        />
        <button
          onClick={saveNotes}
          className="mt-3 w-full bg-ink text-paper py-2.5 uppercase tracking-[0.15em] text-[11px] hover:bg-accent hover:text-ink transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Save notes
        </button>
        {saved !== "idle" && (
          <p className={`mt-2 text-[11px] uppercase tracking-[0.15em] ${saved === "saved" ? "text-[#00cc66]" : "opacity-60"}`} style={{ fontFamily: "var(--font-mono)" }}>
            {saved === "saving" ? "Saving..." : "Saved ✓"}
          </p>
        )}
      </div>

      {/* Danger */}
      <div className="border-[1.5px] border-ink p-5">
        <div className="text-[11px] uppercase tracking-[0.15em] opacity-60 mb-3" style={{ fontFamily: "var(--font-mono)" }}>Danger zone</div>
        <button
          onClick={onDelete}
          className="w-full border border-ink py-2.5 uppercase tracking-[0.15em] text-[11px] hover:bg-accent hover:text-ink hover:border-accent transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Delete lead
        </button>
      </div>
    </aside>
  );
}
