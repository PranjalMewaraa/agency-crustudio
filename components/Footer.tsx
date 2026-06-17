export default function Footer() {
  return (
    <footer className="bg-paper text-ink px-6 md:px-8 pt-[60px] pb-8 border-t-[1.5px] border-ink">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-[60px] border-b border-ink">
        <div className="col-span-2 lg:col-span-1">
          <h4 className="mb-5 opacity-50 text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-display)" }}>CrudStudio</h4>
          <p className="opacity-80 max-w-[360px]" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 18, lineHeight: 1.4 }}>
            An independent product studio building scalable web, mobile, and SaaS for ambitious teams.
          </p>
        </div>
        {[
          ["Services", [["#services", "Web"], ["#services", "Mobile"], ["#services", "SaaS"], ["#services", "Admin Panels"]]],
          ["Studio",   [["#manifesto", "Approach"], ["#work", "Work"], ["#process", "Process"], ["#contact", "Contact"]]],
          ["Elsewhere",[["#", "LinkedIn"], ["#", "GitHub"], ["#", "Instagram"], ["#", "Twitter"]]],
        ].map(([title, links]) => (
          <div key={title as string}>
            <h4 className="mb-5 opacity-50 text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-display)" }}>{title as string}</h4>
            <ul className="list-none">
              {(links as [string, string][]).map(([href, label]) => (
                <li key={label}>
                  <a href={href} data-hover className="text-ink no-underline opacity-85 hover:opacity-100 hover:text-accent transition-colors leading-[2] text-sm">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Big wordmark — intentionally bleeds on narrow screens */}
      <div
        className="text-center pt-[60px] pb-5 overflow-hidden"
        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 18vw, 360px)", lineHeight: 0.85, letterSpacing: "-0.04em" }}
      >
        CRUD<span className="text-accent">.</span>STUDIO
      </div>

      <div className="flex justify-between items-center pt-8 text-[11px] uppercase tracking-[0.1em] opacity-60 flex-wrap gap-3">
        <span>© 2026 CrudStudio — All rights reserved</span>
        <span className="hidden sm:block">Built with stubborn engineering</span>
        <a href="#top" data-hover className="no-underline text-inherit">Back to top ↑</a>
      </div>
    </footer>
  );
}
