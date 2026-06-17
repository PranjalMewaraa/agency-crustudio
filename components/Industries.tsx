import SectionHead from "./SectionHead";

const industries = [
  { glyph: "A", tag: "Sector 01", name: "E-commerce", desc: "Fashion, D2C, streetwear. Storefronts with inventory, coupons, returns, and ad-driven lead funnels." },
  { glyph: "B", tag: "Sector 02", name: "Real Estate", desc: "Property CRMs, listing platforms, lead pipelines, broker dashboards." },
  { glyph: "C", tag: "Sector 03", name: "EdTech", desc: "Learning management systems, course platforms, video streaming, gamified learning." },
  { glyph: "D", tag: "Sector 04", name: "SaaS", desc: "Subscription platforms, multi-tenant tools, internal SaaS for ops teams." },
  { glyph: "E", tag: "Sector 05", name: "Service Brands", desc: "Bookings, lead capture, customer portals, automation for service businesses." },
  { glyph: "F", tag: "Sector 06", name: "Mini Apps", desc: "Telegram mini apps, gamified web tools, niche utilities, experimental platforms." },
];

export default function Industries() {
  return (
    <section id="industries" className="section-pad px-6 md:px-8">
      <SectionHead num="/06" label="Industries — Who we build for" right="Generalists with specialties" />
      <div className="grid grid-cols-1 md:grid-cols-3 border-[1.5px] border-ink reveal-stagger">
        {industries.map((i, idx) => (
          <div
            key={idx}
            data-hover
            className="group relative overflow-hidden border border-ink -m-px p-7 min-h-[240px] flex flex-col justify-between transition-colors duration-500 hover:bg-ink hover:text-paper"
            style={{ background: "var(--paper-2)" }}
          >
            <span
              className="absolute -right-5 -top-5 leading-none opacity-[0.04] group-hover:opacity-[0.12] group-hover:-rotate-[8deg] transition-all duration-500 pointer-events-none"
              style={{ fontFamily: "var(--font-display)", fontSize: 180 }}
            >{i.glyph}</span>
            <span className="opacity-60 tracking-[0.15em] text-[11px] uppercase relative" style={{ fontFamily: "var(--font-mono)" }}>{i.tag}</span>
            <h3
              className="my-5 uppercase relative"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-0.02em", lineHeight: 0.95 }}
            >{i.name}</h3>
            <p className="opacity-75 leading-snug relative" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14 }}>{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
