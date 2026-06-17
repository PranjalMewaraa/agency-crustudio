import CountUp from "./CountUp";

export default function Hero() {
  return (
    <section className="relative min-h-screen px-6 md:px-8 pt-24 md:pt-[120px] pb-[60px] flex flex-col justify-between overflow-hidden" id="top">
      <div className="flex justify-between flex-wrap gap-3 pb-6 border-b border-ink text-[11px] uppercase tracking-[0.1em]">
        <span><span className="text-accent font-bold">●</span> Independent product studio</span>
        <span>Est. 2021 · Currently shipping</span>
        <span>Web · Mobile · SaaS · CRM</span>
      </div>

      <h1
        className="hero-title my-12 uppercase leading-[0.85]"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.04em",
        }}
      >
        <span className="hero-row"><span>WE&nbsp;BUILD</span></span>
        <span className="hero-row">
          <span>
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, textTransform: "lowercase", letterSpacing: "-0.03em" }}>serious,&nbsp;</span>
            <span className="text-accent">SCALABLE</span>
          </span>
        </span>
        <span className="hero-row"><span>PRODUCTS.</span></span>
      </h1>

      <p
        className="max-w-[580px] opacity-0 animate-[fadeIn_1s_ease_0.7s_forwards]"
        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.35 }}
      >
        Not just websites. Real engineering for startups and businesses that need to ship, scale, and own their stack — without enterprise bloat or agency theatre.
      </p>

      {/* Terminal card */}
      <div
        className="hidden xl:block absolute right-8 top-1/2 w-[280px] border-[1.5px] border-ink bg-ink text-paper p-4 z-[1] opacity-0 animate-[termIn_1.4s_cubic-bezier(.7,0,.2,1)_0.8s_forwards]"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          transform: "translateY(-30%) rotate(-2deg)",
          boxShadow: "8px 8px 0 var(--accent)",
        }}
      >
        <div className="flex gap-1.5 mb-3 pb-2 border-b border-dashed border-paper/30">
          <span className="w-2 h-2 rounded-full bg-paper opacity-60" />
          <span className="w-2 h-2 rounded-full bg-paper opacity-60" />
          <span className="w-2 h-2 rounded-full bg-paper opacity-60" />
        </div>
        <div className="leading-[1.7]">
          <div><span style={{ color: "#00cc66" }}>$</span> crud init <span style={{ color: "var(--accent)" }}>--scalable</span></div>
          <div>→ Analyzing workflows...</div>
          <div>→ Designing systems...</div>
          <div>→ Shipping product...</div>
          <div><span style={{ color: "#00cc66" }}>✓</span> Build successful</div>
          <div><span style={{ color: "var(--accent)" }}>►</span> Ready for production<span className="animate-pulse">_</span></div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-ink text-[12px] uppercase tracking-[0.08em] mt-10">
        <div>
          <div className="opacity-60 mb-1.5 text-[10px]">Stack · 01</div>
          <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: 16, textTransform: "none", letterSpacing: "-0.01em" }}>
            Next.js · Node · MongoDB · React Native
          </div>
        </div>
        <div>
          <div className="opacity-60 mb-1.5 text-[10px]">Built · 02</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.01em" }}>
            <CountUp target={40} suffix="+" /> products
          </div>
        </div>
        <div>
          <div className="opacity-60 mb-1.5 text-[10px]">Studio · 03</div>
          <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: 16, textTransform: "none" }}>Remote — India</div>
        </div>
        <div>
          <div className="opacity-60 mb-1.5 text-[10px]">Available · 04</div>
          <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: 16, textTransform: "none" }}>2 slots · Q1 2026</div>
        </div>
      </div>
    </section>
  );
}
