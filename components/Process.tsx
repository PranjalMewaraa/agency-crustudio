import SectionHead from "./SectionHead";

const steps = [
  { num: "STEP 01", name: "Discover", desc: "We study your workflows, users, revenue channels and bottlenecks before writing a single line." },
  { num: "STEP 02", name: "Wireframe", desc: "Low-fi flows and UI plans that map every screen, state, and edge case." },
  { num: "STEP 03", name: "Architect", desc: "System design — data models, APIs, infrastructure, and scaling paths." },
  { num: "STEP 04", name: "Build", desc: "Agile sprints, weekly demos, no opaque 'we'll show you in two months.'" },
  { num: "STEP 05", name: "Test", desc: "Performance, security, edge cases. Optimization isn't an afterthought." },
  { num: "STEP 06", name: "Deploy", desc: "CI/CD pipelines, monitoring, rollback safety. Shipping is the boring part." },
  { num: "STEP 07", name: "Scale", desc: "Maintenance, iteration, growth. We stay in the trenches with you." },
];

export default function Process() {
  return (
    <section id="process" className="section-pad px-6 md:px-8" style={{ background: "var(--paper-2)" }}>
      <SectionHead num="/05" label="Process — How we ship" right="07 steps · No surprises" />
      <div className="flex flex-col reveal-stagger">
        {steps.map((s, i) => (
          <div
            key={i}
            data-hover
            className="group grid grid-cols-[52px_1fr] md:grid-cols-[100px_1fr_2fr_80px] gap-3 md:gap-8 items-center py-6 md:py-9 border-t border-ink last:border-b transition-[padding] duration-500 hover:pl-6"
          >
            <span className="opacity-60 tracking-[0.15em] text-[11px]" style={{ fontFamily: "var(--font-mono)" }}>{s.num}</span>
            <span
              className="uppercase transition-colors group-hover:text-accent"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 56px)", letterSpacing: "-0.02em", lineHeight: 1 }}
            >{s.name}</span>
            <span className="hidden md:block opacity-70 leading-snug" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16 }}>
              {s.desc}
            </span>
            <span
              className="hidden md:block text-right opacity-30 group-hover:opacity-100 group-hover:translate-x-2 group-hover:text-accent transition-all duration-500"
              style={{ fontFamily: "var(--font-display)", fontSize: 32 }}
            >→</span>
          </div>
        ))}
      </div>
    </section>
  );
}
