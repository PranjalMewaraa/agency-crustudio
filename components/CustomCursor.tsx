"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 901) return;

    const cursor = ref.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onDown = () => cursor.classList.add("clicking");
    const onUp   = () => cursor.classList.remove("clicking");

    const loop = () => {
      cx += (mx - cx) * 0.14;
      cy += (my - cy) * 0.14;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    const addHoverListeners = (root: Document | Element = document) => {
      root.querySelectorAll<HTMLElement>("[data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    const onEnter = () => cursor.classList.add("hover");
    const onLeave = () => cursor.classList.remove("hover");
    addHoverListeners();

    // Pick up dynamically added [data-hover] elements
    const mo = new MutationObserver(() => addHoverListeners());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.querySelectorAll<HTMLElement>("[data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      mo.disconnect();
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden />;
}
