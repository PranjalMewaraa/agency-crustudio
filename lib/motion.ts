import type { Variants, Transition } from "framer-motion";

export const EASE = [0.7, 0, 0.2, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const baseT: Transition = { duration: 0.9, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: baseT },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const stagger = (delay = 0.05, children = 0.08): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: children } },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: baseT },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 1.1, ease: EASE },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: baseT },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: baseT },
};

export const lineWipe: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: EASE } },
};

export const charRise: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 1.1, ease: EASE, delay: i * 0.04 },
  }),
};

export const VIEWPORT = { once: true, amount: 0.2 } as const;
export const VIEWPORT_EARLY = { once: true, amount: 0.05 } as const;
