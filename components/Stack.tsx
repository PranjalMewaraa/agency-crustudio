import SectionHead from "./SectionHead";

const stack = [
  { cat: "Frontend / 01", name: "Next.js", note: "App Router, RSC, ISR" },
  { cat: "Frontend / 02", name: "React", note: "Hooks, state, server components" },
  { cat: "Mobile / 03", name: "React Native", note: "Expo, native modules, OTA" },
  { cat: "Styling / 04", name: "Tailwind", note: "Design systems, tokens" },
  { cat: "Backend / 05", name: "Node.js", note: "REST & GraphQL APIs" },
  { cat: "Backend / 06", name: "Express", note: "Middleware, auth, services" },
  { cat: "Database / 07", name: "MongoDB", note: "Atlas, aggregations, indexes" },
  { cat: "Infra / 08", name: "Vercel · AWS", note: "CI/CD, edge, storage" },
];

export default function Stack() {
  return (
    <section id="stack" className="section-pad px-6 md:px-8">
      <SectionHead num="/04" label="Stack — How we build" right="Battle-tested only" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
        {stack.map((s, i) => (
          <div
            key={i}
            data-hover
            className="border-[1.5px] border-ink p-7 flex flex-col gap-2 bg-paper transition-all duration-300 hover:bg-ink hover:text-paper hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:6px_6px_0_var(--accent)]"
          >
            <span className="text-[10px] tracking-[0.15em] uppercase opacity-60">{s.cat}</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.01em", textTransform: "uppercase" }}>{s.name}</span>
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, opacity: 0.7 }}>{s.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
