import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { dbConnect } from "@/lib/db";
import { Project, type IProject } from "@/models/Project";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    await dbConnect();
    const docs = await Project.find({ published: true }).select("slug").lean();
    return docs.map((d: any) => ({ slug: d.slug }));
  } catch {
    return [];
  }
}

async function getProject(slug: string): Promise<IProject | null> {
  try {
    await dbConnect();
    const doc = await Project.findOne({ slug, published: true }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  } catch {
    return null;
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();

  return (
    <>
      <ScrollReveal />
      <Nav />

      <article className="pt-[120px]">
        <header className="px-8 pb-16 border-b border-ink">
          <div className="flex justify-between flex-wrap gap-3 pb-6 mb-10 border-b border-ink text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-mono)" }}>
            <Link href="/#work" data-hover>← All work</Link>
            <span>{p.industry || "Case study"}</span>
            <span>{p.year}</span>
          </div>

          <h1
            className="reveal uppercase mb-6"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 10vw, 160px)", lineHeight: 0.88, letterSpacing: "-0.04em" }}
          >
            {p.title}
          </h1>
          <p
            className="reveal max-w-[900px]"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2.6vw, 32px)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
          >
            {p.tagline}
          </p>
        </header>

        <div className="px-8 py-16 border-b border-ink">
          <div className={`visual-${p.visualStyle} relative w-full aspect-[16/9] border-[1.5px] border-ink reveal`} />
        </div>

        <section className="px-8 py-20 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 border-b border-ink">
          <aside className="space-y-8 text-[12px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-mono)" }}>
            <div>
              <div className="opacity-50 text-[10px] mb-1">Client</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{p.client || "Confidential"}</div>
            </div>
            <div>
              <div className="opacity-50 text-[10px] mb-1">Industry</div>
              <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16, textTransform: "none" }}>{p.industry || "—"}</div>
            </div>
            <div>
              <div className="opacity-50 text-[10px] mb-1">Year</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>{p.year}</div>
            </div>
            <div>
              <div className="opacity-50 text-[10px] mb-2">Stack</div>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="border border-ink px-3 py-1 text-[11px]" style={{ fontFamily: "var(--font-mono)" }}>{s}</span>
                ))}
              </div>
            </div>
            {p.liveUrl && (
              <div>
                <div className="opacity-50 text-[10px] mb-1">Live</div>
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" data-hover className="underline hover:text-accent">{p.liveUrl.replace(/^https?:\/\//, "")}</a>
              </div>
            )}
          </aside>

          <div
            className="reveal max-w-[800px]"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 22, lineHeight: 1.5, letterSpacing: "-0.01em" }}
          >
            {(p.body || p.description || "").split("\n\n").map((para, i) => (
              <p key={i} className="mb-6">{para}</p>
            ))}
          </div>
        </section>

        {p.results && p.results.length > 0 && (
          <section className="px-8 py-20 border-b border-ink">
            <h2 className="mb-12 uppercase" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.03em" }}>
              Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
              {p.results.map((r, i) => (
                <div key={i} className="border-[1.5px] border-ink p-6">
                  <div className="opacity-50 text-[11px] uppercase tracking-[0.12em] mb-3" style={{ fontFamily: "var(--font-mono)" }}>{r.label}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1, color: "var(--accent)" }}>{r.value}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="px-8 py-20 text-center">
          <p className="mb-6 opacity-70" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20 }}>Got a similar problem?</p>
          <Link href="/#contact" data-hover className="inline-block px-12 py-5 border-[1.5px] border-ink uppercase tracking-[0.15em] text-[13px] hover:bg-ink hover:text-paper transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
            Start a project →
          </Link>
        </section>
      </article>

      <Footer />
    </>
  );
}
