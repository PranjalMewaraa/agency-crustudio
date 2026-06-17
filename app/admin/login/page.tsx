"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(""); setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    if (res.ok) router.push("/admin/projects");
    else { const j = await res.json(); setErr(j.error || "Login failed"); }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-8 bg-paper">
      <div className="w-full max-w-md border-[1.5px] border-ink p-10 bg-paper-2">
        <div className="text-[11px] uppercase tracking-[0.15em] mb-2 opacity-60" style={{ fontFamily: "var(--font-mono)" }}>CrudStudio · Admin</div>
        <h1 className="uppercase mb-8" style={{ fontFamily: "var(--font-display)", fontSize: 40, letterSpacing: "-0.03em", lineHeight: 1 }}>Sign in</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <label className="block">
            <span className="block mb-2 text-[11px] uppercase tracking-[0.15em] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>Email</span>
            <input name="email" type="email" required className="w-full border-[1.5px] border-ink bg-paper px-4 py-3 outline-none focus:bg-ink focus:text-paper transition-colors" style={{ fontFamily: "var(--font-mono)" }} />
          </label>
          <label className="block">
            <span className="block mb-2 text-[11px] uppercase tracking-[0.15em] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>Password</span>
            <input name="password" type="password" required className="w-full border-[1.5px] border-ink bg-paper px-4 py-3 outline-none focus:bg-ink focus:text-paper transition-colors" style={{ fontFamily: "var(--font-mono)" }} />
          </label>
          {err && <p className="text-accent text-sm" style={{ fontFamily: "var(--font-mono)" }}>{err}</p>}
          <button type="submit" disabled={loading} className="bg-ink text-paper py-4 uppercase tracking-[0.15em] text-[12px] hover:bg-accent hover:text-ink transition-colors disabled:opacity-50" style={{ fontFamily: "var(--font-mono)" }}>
            {loading ? "Signing in..." : "Sign in →"}
          </button>
        </form>
      </div>
    </main>
  );
}
