"use client";
import { useCallback, useEffect, useState } from "react";

const NAV_LINKS = [
  ["#services", "Services"],
  ["#work", "Work"],
  ["#stack", "Stack"],
  ["#process", "Process"],
  ["#industries", "Industries"],
  ["#contact", "Contact"],
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  // Nav blur on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const handleLink = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <>
      <nav
        className={[
          "fixed top-0 inset-x-0 z-[100] flex justify-between items-center px-6 md:px-8 py-5",
          "border-b-[1.5px] uppercase text-[12px] tracking-[0.08em]",
          "transition-all duration-300",
          menuOpen
            ? "bg-ink border-white/10 text-paper"
            : scrolled
            ? "nav-scrolled border-ink"
            : "bg-paper border-ink",
        ].join(" ")}
      >
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => handleLink(e, "#top")}
          data-hover
          className={`flex items-center gap-2 no-underline transition-colors duration-300 ${menuOpen ? "text-paper" : "text-ink"}`}
          style={{ fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: "0.02em" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-blink flex-shrink-0" />
          CRUDSTUDIO
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-7 list-none">
          {NAV_LINKS.map(([href, label]) => {
            const isActive = active === href;
            return (
              <li key={href}>
                <a
                  href={href}
                  data-hover
                  onClick={(e) => handleLink(e, href)}
                  className={[
                    "relative no-underline transition-colors duration-200",
                    "after:content-[''] after:absolute after:left-0 after:-bottom-1",
                    "after:w-full after:h-px after:transition-transform after:duration-300",
                    "after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left",
                    isActive
                      ? "text-accent after:scale-x-100 after:origin-left after:bg-accent"
                      : "text-ink hover:text-accent after:bg-accent",
                  ].join(" ")}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop status + Mobile hamburger */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 tabular-nums">
            <span className="w-2 h-2 rounded-full bg-[#00cc66] animate-blink" />
            BOOKING Q1 — 2026
          </div>

          {/* Hamburger → X */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 -mr-1 relative z-10"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {[
              menuOpen ? "rotate-45 translate-y-[6px] w-6" : "w-6",
              menuOpen ? "opacity-0 scale-x-0 w-6" : "w-5",
              menuOpen ? "-rotate-45 -translate-y-[6px] w-6" : "w-6",
            ].map((cls, i) => (
              <span
                key={i}
                className={[
                  "block h-[1.5px] transition-all duration-300 origin-center",
                  menuOpen ? "bg-paper" : "bg-ink",
                  cls,
                ].join(" ")}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-nav"
        className={`mobile-menu md:hidden ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav>
          <ul className="list-none flex flex-col gap-1">
            {NAV_LINKS.map(([href, label], i) => {
              const enterDelay = i * 0.06 + 0.12;
              const exitDelay = (NAV_LINKS.length - 1 - i) * 0.03;
              const delay = menuOpen ? enterDelay : exitDelay;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleLink(e, href)}
                    className="block text-paper no-underline uppercase leading-none py-2 hover:text-accent"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(42px, 10vw, 72px)",
                      letterSpacing: "-0.03em",
                      transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                      opacity: menuOpen ? 1 : 0,
                      transition: `transform 0.5s cubic-bezier(.7,0,.2,1) ${delay}s, opacity 0.4s ease ${delay}s, color 0.18s`,
                    }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className="mt-auto pt-10 text-[11px] uppercase tracking-[0.15em]"
          style={{ color: "rgba(241,239,232,0.4)", fontFamily: "var(--font-mono)" }}
        >
          <div>hello@crudstudio.com</div>
          <div className="mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00cc66] animate-blink" />
            BOOKING Q1 — 2026
          </div>
        </div>
      </div>
    </>
  );
}
