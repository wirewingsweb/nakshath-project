// Centralized Framer Motion variants for the entire site
// Import these in any component for consistent animations

// ===== ENTRANCE ANIMATIONS =====
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

// ===== STAGGER CONTAINERS =====
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

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ===== HERO / LARGE TITLE =====
export const heroTitle = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const heroWord = {
  hidden: { opacity: 0, y: 80, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

// ===== IMAGE REVEALS =====
export const imageReveal = {
  hidden: { opacity: 0, scale: 1.1, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

export const imageZoom = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

// ===== HOVER INTERACTIONS =====
export const hoverLift = {
  rest: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(12, 9, 34, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

export const hoverImageZoom = {
  rest: { scale: 1 },
  hover: {
    scale: 1.06,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ===== UTILITY =====
export const viewportOnce = { once: true, amount: 0.2 };
export const viewportOnceEarly = { once: true, amount: 0.1 };
