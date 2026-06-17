"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { IProject } from "@/models/Project";

type Props = { initial?: Partial<IProject>; mode: "new" | "edit"; id?: string };

const inputCls = "w-full border-[1.5px] border-ink bg-paper px-4 py-3 outline-none focus:bg-ink focus:text-paper transition-colors";
const labelCls = "block mb-2 text-[11px] uppercase tracking-[0.15em] opacity-70";

export default function ProjectForm({ initial = {}, mode, id }: Props) {
  const router = useRouter();
  const [state, setState] = useState<any>({
    title: initial.title || "",
    slug: initial.slug || "",
    tagline: initial.tagline || "",
    description: initial.description || "",
    client: initial.client || "",
    year: initial.year || new Date().getFullYear(),
    stack: (initial.stack || []).join(", "),
    industry: initial.industry || "",
    visualStyle: initial.visualStyle || "saas",
    liveUrl: initial.liveUrl || "",
    featured: initial.featured || false,
    layout: initial.layout || "half",
    published: initial.published !== false,
    body: initial.body || "",
  });
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (k: string) => (e: any) =>
    setState((s: any) => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setSaving(true);
    const payload = {
      ...state,
      year: Number(state.year),
      stack: state.stack.split(",").map((s: string) => s.trim()).filter(Boolean),
    };
    const url = mode === "new" ? "/api/projects" : `/api/projects/${id}`;
    const method = mode === "new" ? "POST" : "PUT";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSaving(false);
    if (res.ok) router.push("/admin/projects");
    else { const j = await res.json(); setErr(j.error || "Save failed"); }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6" style={{ fontFamily: "var(--font-mono)" }}>
      <div>
        <label className={labelCls}>Title *</label>
        <input className={inputCls} value={state.title} onChange={set("title")} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Slug (auto from title if blank)</label>
          <input className={inputCls} value={state.slug} onChange={set("slug")} placeholder="reloaded-mens" />
        </div>
        <div>
          <label className={labelCls}>Year *</label>
          <input type="number" className={inputCls} value={state.year} onChange={set("year")} required />
        </div>
      </div>

      <div>
        <label className={labelCls}>Tagline *</label>
        <input className={inputCls} value={state.tagline} onChange={set("tagline")} placeholder="Premium men's streetwear e-commerce, Delhi" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Client</label>
          <input className={inputCls} value={state.client} onChange={set("client")} />
        </div>
        <div>
          <label className={labelCls}>Industry</label>
          <input className={inputCls} value={state.industry} onChange={set("industry")} placeholder="E-commerce" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Stack (comma-separated)</label>
        <input className={inputCls} value={state.stack} onChange={set("stack")} placeholder="Next.js, Node, MongoDB" />
      </div>

      <div>
        <label className={labelCls}>Live URL</label>
        <input type="url" className={inputCls} value={state.liveUrl} onChange={set("liveUrl")} placeholder="https://..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Visual style</label>
          <select className={inputCls} value={state.visualStyle} onChange={set("visualStyle")}>
            <option value="reloaded">Reloaded (streetwear / dark + accent type)</option>
            <option value="realty">Realty (architectural grid)</option>
            <option value="lms">LMS (video / play triangle)</option>
            <option value="saas">SaaS (checkerboard + accent block)</option>
            <option value="crm">CRM (accent fill + window)</option>
            <option value="custom">Custom (gradient)</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Grid layout</label>
          <select className={inputCls} value={state.layout} onChange={set("layout")}>
            <option value="featured">Featured (full width)</option>
            <option value="half">Half (2-col)</option>
            <option value="third">Third (3-col)</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Short description</label>
        <textarea className={`${inputCls} min-h-[100px]`} value={state.description} onChange={set("description")} />
      </div>

      <div>
        <label className={labelCls}>Long case study (markdown / paragraphs)</label>
        <textarea className={`${inputCls} min-h-[240px]`} value={state.body} onChange={set("body")} placeholder="Separate paragraphs with blank lines." />
      </div>

      <div className="flex flex-wrap gap-6 pt-4 border-t border-ink">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={state.featured} onChange={set("featured")} />
          <span className="text-[12px] uppercase tracking-[0.15em]">Featured</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={state.published} onChange={set("published")} />
          <span className="text-[12px] uppercase tracking-[0.15em]">Published (visible on site)</span>
        </label>
      </div>

      {err && <p className="text-accent text-sm">{err}</p>}

      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className="bg-ink text-paper px-8 py-3 uppercase tracking-[0.15em] text-[12px] hover:bg-accent hover:text-ink transition-colors disabled:opacity-50">
          {saving ? "Saving..." : mode === "new" ? "Create project" : "Save changes"}
        </button>
        <button type="button" onClick={() => router.back()} className="border-[1.5px] border-ink px-8 py-3 uppercase tracking-[0.15em] text-[12px] hover:bg-paper-2 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
