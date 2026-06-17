import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr] bg-paper">
      <aside className="border-r-[1.5px] border-ink p-6 md:min-h-screen bg-paper-2">
        <Link href="/" className="block mb-10">
          <div className="flex items-center gap-2" style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "0.02em" }}>
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-blink" />
            CRUDSTUDIO
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.15em] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>Admin Console</div>
        </Link>

        <nav className="flex flex-col gap-1 text-[12px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-mono)" }}>
          <Link href="/admin/projects" className="px-3 py-2 hover:bg-ink hover:text-paper transition-colors">Projects</Link>
          <Link href="/admin/projects/new" className="px-3 py-2 hover:bg-ink hover:text-paper transition-colors">+ New project</Link>
          <Link href="/admin/leads" className="px-3 py-2 hover:bg-ink hover:text-paper transition-colors">Leads</Link>
          <Link href="/" className="px-3 py-2 hover:bg-ink hover:text-paper transition-colors">View site →</Link>
        </nav>

        <form action="/api/auth/logout" method="POST" className="mt-10">
          <button type="submit" className="text-[11px] uppercase tracking-[0.15em] opacity-60 hover:opacity-100 hover:text-accent transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
            ↩ Sign out
          </button>
        </form>
      </aside>

      <main className="p-8 md:p-12">{children}</main>
    </div>
  );
}
