import Link from "next/link";
import SectionHead from "./SectionHead";
import type { IProject } from "@/models/Project";

const layoutClass: Record<string, string> = {
  featured: "md:col-span-12 aspect-[21/9]",
  half:     "md:col-span-6 aspect-[4/3]",
  third:    "md:col-span-4 aspect-square",
};

export default function Showcase({ projects }: { projects: IProject[] }) {
  return (
    <section id="work" className="section-pad px-6 md:px-8 bg-paper">
      <SectionHead num="/03" label="Selected Work — Shipped & live" right={`${projects.length} of 40+`} />

      {projects.length === 0 ? (
        <div className="border-[1.5px] border-ink p-16 text-center">
          <p className="text-lg opacity-70 mb-4" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
            No projects yet. Add your first one in the admin panel.
          </p>
          <Link
            href="/admin"
            className="inline-block mt-4 px-8 py-3 border-[1.5px] border-ink uppercase tracking-[0.15em] text-[12px] hover:bg-ink hover:text-paper transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
            data-hover
          >
            Go to admin →
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 reveal-stagger">
            {projects.map((p, i) => (
              <Link
                key={String(p._id)}
                href={`/work/${p.slug}`}
                data-hover
                className={[
                  "group relative overflow-hidden border-[1.5px] border-ink bg-paper-2 block no-underline text-inherit",
                  "transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)]",
                  "hover:-translate-x-[5px] hover:-translate-y-[5px] hover:[box-shadow:8px_8px_0_var(--ink)] hover:border-accent",
                  layoutClass[p.layout] ?? layoutClass.half,
                  "col-span-1",
                ].join(" ")}
              >
                {/* Visual treatment — scales on card hover */}
                <div
                  className={`absolute inset-0 visual-${p.visualStyle} transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-[1.04]`}
                />

                <span
                  className="absolute top-4 left-5 z-10 text-paper mix-blend-difference"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em" }}
                >
                  №{String(i + 1).padStart(2, "0")}{p.featured ? " · FEATURED CASE" : ""}
                </span>

                {/* Arrow nudges on hover */}
                <span
                  className="absolute top-3 right-5 z-10 text-paper mix-blend-difference transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ fontFamily: "var(--font-display)", fontSize: 24, transform: "rotate(-45deg)" }}
                >↗</span>

                <div className="absolute left-5 right-5 bottom-5 flex justify-between items-end text-paper mix-blend-difference z-10">
                  <div className="flex flex-col gap-1">
                    <span
                      className="uppercase"
                      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.5vw, 32px)", letterSpacing: "-0.02em", lineHeight: 1 }}
                    >{p.title}</span>
                    <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, opacity: 0.85 }}>
                      {p.tagline}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-mono)", fontSize: 10 }}>
                    <span className="opacity-70">{p.year}</span>
                    <span className="opacity-60">{p.stack.slice(0, 3).join(" · ")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-[60px] pt-8 border-t border-ink flex justify-between items-center flex-wrap gap-5">
            <p className="max-w-[480px] opacity-75" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20 }}>
              Every project ships with admin tools, analytics, and the kind of code you can hand to another team without an apology.
            </p>
            <Link
              href="/work"
              data-hover
              className="border-b-[1.5px] border-ink pb-1 hover:text-accent hover:border-accent transition-colors"
              style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              View all work →
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
