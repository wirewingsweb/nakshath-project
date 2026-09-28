// ============================================================
// NAKSHATH EQUESTRIAN CLUB — GLOBAL ANIMATION SYSTEM
// Saari website ke liye consistent animations.
// Har section/page yahi variants use karega.
// ============================================================

// Smooth ease curve — Apple-style, professional feel
export const EASE = [0.22, 1, 0.36, 1];

// Default durations — poore site pe consistent
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  hero: 1.2,
};

// ============================================================
// 1. FADE UP — Default section animation
// ============================================================
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE },
  },
};

// ============================================================
// 2. FADE IN — Simple fade (images, backgrounds)
// ============================================================
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: 'easeOut' },
  },
};

// ============================================================
// 3. FADE LEFT — Text left side se slide
// ============================================================
export const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE },
  },
};

// ============================================================
// 4. FADE RIGHT — Text right side se slide
// ============================================================
export const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE },
  },
};

// ============================================================
// 5. SCALE IN — Cards, images ke liye (zoom effect)
// ============================================================
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.normal, ease: EASE },
  },
};

// ============================================================
// 6. STAGGER CONTAINER — Parent (cards ke group ke liye)
// ============================================================
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ============================================================
// 7. STAGGER ITEM — Child (stagger container ke andar)
// ============================================================
export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE },
  },
};

// ============================================================
// 8. HERO IMAGE — Subtle zoom on load (hero sections ke liye)
// ============================================================
export const heroImage = {
  hidden: { scale: 1.08, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: DURATION.hero, ease: EASE },
  },
};

// ============================================================
// 9. HOVER EFFECTS — Buttons, cards ke liye
// ============================================================
export const hoverScale = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.25, ease: EASE },
};

export const hoverLift = {
  whileHover: { y: -6, scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.3, ease: EASE },
};

// ============================================================
// 10. VIEWPORT CONFIG — Scroll pe trigger hone ke liye
// ============================================================
export const viewportOnce = {
  once: true,
  amount: 0.2,
};

export const viewportRepeat = {
  once: false,
  amount: 0.3,
};