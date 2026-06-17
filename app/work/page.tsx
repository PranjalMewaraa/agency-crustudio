import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { dbConnect } from "@/lib/db";
import { Project, type IProject } from "@/models/Project";

export const revalidate = 60;

export const metadata = {
  title: "Work — CrudStudio",
  description: "Selected projects shipped by CrudStudio — web, mobile, SaaS, admin panels, and CRM systems.",
};

async function getAllProjects(): Promise<IProject[]> {
  try {
    await dbConnect();
    const docs = await Project.find({ published: true }).sort({ year: -1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(docs));
  } catch {
    return [];
  }
}

export default async function WorkArchivePage() {
  const projects = await getAllProjects();

  // Group by year for an archive feel
  const byYear: Record<number, IProject[]> = {};
  projects.forEach((p) => {
    if (!byYear[p.year]) byYear[p.year] = [];
    byYear[p.year].push(p);
  });
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  return (
    <>
      <ScrollReveal />
      <Nav />

      <section className="px-8 pt-[120px] pb-12 border-b border-ink">
        <div className="flex justify-between flex-wrap gap-3 pb-6 mb-10 border-b border-ink text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-mono)" }}>
          <Link href="/" data-hover>← Home</Link>
          <span>Archive · All projects</span>
          <span>{projects.length} entries</span>
        </div>
        <h1
          className="reveal uppercase"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(72px, 14vw, 240px)", lineHeight: 0.85, letterSpacing: "-0.04em" }}
        >
          The work.
        </h1>
        <p
          className="reveal mt-6 max-w-[800px]"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(20px, 2.4vw, 30px)", lineHeight: 1.35 }}
        >
          Every product we've shipped — sorted by year. Each one was built end-to-end, by us, with code we'd happily hand to your next engineer.
        </p>
      </section>

      {projects.length === 0 ? (
        <section className="px-8 py-32 text-center">
          <p className="opacity-60" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22 }}>
            No projects published yet.
          </p>
        </section>
      ) : (
        <section className="px-8 py-20">
          {years.map((year) => (
            <div key={year} className="mb-20 last:mb-0">
              <div className="flex justify-between items-baseline pb-5 mb-8 border-b border-ink">
                <h2
                  className="uppercase"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 96px)", letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  {year}
                </h2>
                <span className="text-[11px] uppercase tracking-[0.15em] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>
                  {byYear[year].length} project{byYear[year].length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex flex-col reveal-stagger">
                {byYear[year].map((p, i) => (
                  <Link
                    key={String(p._id)}
                    href={`/work/${p.slug}`}
                    data-hover
                    className="group grid grid-cols-[60px_1fr_2fr_120px] md:grid-cols-[80px_1fr_1.5fr_180px_60px] gap-4 md:gap-8 items-center py-7 border-t border-ink last:border-b text-ink no-underline transition-[padding] duration-500 hover:pl-6"
                  >
                    <span className="opacity-50 text-[11px] tracking-[0.15em]" style={{ fontFamily: "var(--font-mono)" }}>
                      №{String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="uppercase group-hover:text-accent transition-colors"
                      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", lineHeight: 1 }}
                    >
                      {p.title}
                    </span>
                    <span className="hidden md:block opacity-70" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16 }}>
                      {p.tagline}
                    </span>
                    <span className="hidden md:block text-[11px] uppercase tracking-[0.12em] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>
                      {p.stack.slice(0, 3).join(" · ")}
                    </span>
                    <span
                      className="hidden md:block text-right opacity-30 group-hover:opacity-100 group-hover:translate-x-2 group-hover:text-accent transition-all duration-500"
                      style={{ fontFamily: "var(--font-display)", fontSize: 24 }}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="px-8 py-20 text-center border-t border-ink">
        <p className="mb-6 opacity-70" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22 }}>
          Want yours on this list?
        </p>
        <Link
          href="/#contact"
          data-hover
          className="inline-block px-12 py-5 border-[1.5px] border-ink uppercase tracking-[0.15em] text-[13px] hover:bg-ink hover:text-paper transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Start a project →
        </Link>
      </section>

      <Footer />
    </>
  );
}
