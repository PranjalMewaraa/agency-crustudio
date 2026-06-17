import SectionHead from "./SectionHead";

export default function Manifesto() {
  return (
    <section className="section-pad px-6 md:px-8" id="manifesto">
      <SectionHead num="/01" label="What we believe" right="— Manifesto" />
      <p
        className="reveal max-w-[1300px]"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 300,
          fontSize: "clamp(28px, 4.5vw, 64px)",
          lineHeight: 1.08,
          letterSpacing: "-0.025em",
        }}
      >
        Most agencies sell <span className="line-through opacity-35">websites</span>. We build{" "}
        <em className="text-accent not-italic" style={{ fontStyle: "italic" }}>scalable products</em>. Every line of code is shipped to{" "}
        <span style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "-0.01em" }}>survive growth</span> — not just look good in a pitch deck. Strong engineering. Honest pricing.{" "}
        <em className="text-accent" style={{ fontStyle: "italic" }}>Zero theatre</em>.
      </p>
    </section>
  );
}
