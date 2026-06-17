export default function Marquee() {
  const items = ["Web Apps", "SaaS", "Admin Panels", "CRM Systems", "Mobile Apps", "E-commerce", "Dashboards"];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrap border-y-[1.5px] border-ink bg-ink text-paper overflow-hidden py-[18px] cursor-default">
      <div
        className="flex gap-[50px] whitespace-nowrap animate-marquee"
        style={{ fontFamily: "var(--font-display)", fontSize: 42, letterSpacing: "-0.02em", textTransform: "uppercase" }}
      >
        {doubled.map((label, i) => (
          <span key={i} className="inline-flex items-center gap-[50px]">
            {label}
            <span className="text-accent text-[28px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
