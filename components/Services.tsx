import SectionHead from "./SectionHead";

const services = [
  { num: "01 / WEB", icon: "⌘", title: "Web Apps", desc: "Next.js platforms built for speed, SEO, and scale. From landing pages to multi-tenant systems." },
  { num: "02 / MOBILE", icon: "▢", title: "Mobile Apps", desc: "Cross-platform React Native apps. iOS, Android, one codebase, native feel." },
  { num: "03 / SAAS", icon: "◉", title: "SaaS Platforms", desc: "Subscription-ready products with auth, billing, dashboards, and multi-tenancy baked in." },
  { num: "04 / ADMIN", icon: "▥", title: "Admin Panels", desc: "Internal tools and dashboards that don't suck. Built around your actual workflow." },
  { num: "05 / CRM", icon: "◈", title: "CRM Systems", desc: "Lead management, pipelines, automation — tailored to how your sales team actually works." },
  { num: "06 / UI/UX", icon: "◇", title: "UI / UX", desc: "Modern, minimal, conversion-focused design. Mobile-first, brand-strong, ship-ready." },
];

export default function Services() {
  return (
    <section id="services" className="section-pad bg-ink text-paper px-6 md:px-8">
      <SectionHead num="/02" label="Services — What we build" right="06 disciplines" light />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 border border-paper reveal-stagger">
        {services.map((s, i) => (
          <div
            key={i}
            data-hover
            className="group relative overflow-hidden border border-paper -m-px p-7 min-h-[280px] flex flex-col justify-between transition-colors"
          >
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] z-0" />
            <div className="relative z-10 group-hover:text-ink transition-colors">
              <div className="text-[11px] opacity-60 mb-6 tracking-[0.1em]" style={{ fontFamily: "var(--font-mono)" }}>{s.num}</div>
              <div className="w-12 h-12 border-[1.5px] border-current flex items-center justify-center mb-6" style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>{s.icon}</div>
              <h3 className="uppercase mb-3" style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.title}</h3>
              <p className="opacity-70 group-hover:opacity-100 leading-relaxed" style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{s.desc}</p>
            </div>
            <span
              className="relative z-10 self-end mt-5 group-hover:text-ink transition-all duration-300"
              style={{ fontFamily: "var(--font-display)", fontSize: 24, transform: "rotate(-45deg)" }}
            >→</span>
          </div>
        ))}
      </div>
    </section>
  );
}
