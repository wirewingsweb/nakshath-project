// src/utils/landing-motion.js
// Shared motion language for the landing page.

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_SNAP = [0.76, 0, 0.24, 1];

// Whole-section entry — fade, rise, de-blur
export const sectionEnter = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE },
  },
};

// Parent container orchestrating children
export const sectionStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

// Individual card / element reveal
export const cardReveal = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

// Line-level mask reveal — parent must be overflow-hidden
export const lineReveal = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 1, ease: EASE },
  },
};

// Clip-path curtain — horizontal wipe
export const clipReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.3, ease: EASE },
  },
};

// Magnetic button helper
export const MAGNETIC_STRENGTH = 0.35;
export const MAGNETIC_RADIUS = 120;
