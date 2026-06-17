export default function SectionHead({ num, label, right, light }: { num: string; label: string; right: string; light?: boolean }) {
  return (
    <div
      className={`flex justify-between items-baseline pb-5 mb-10 md:mb-[60px] text-[11px] uppercase tracking-[0.12em] flex-wrap gap-3 ${
        light ? "border-b border-paper" : "border-b border-ink"
      }`}
    >
      <span style={{ fontFamily: "var(--font-mono)" }}>{num}</span>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.06em" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-mono)" }}>{right}</span>
    </div>
  );
}
