// src/utils/motion.js
export const EASE_PRIMARY   = [0.22, 1, 0.36, 1];
export const EASE_SECONDARY = [0.4, 0, 0.2, 1];

export const DURATION = {
  micro:     0.2,
  popover:   0.22,
  small:     0.55,
  normal:    0.75,
  image:     1.0,
  cinematic: 1.4,
  menu:      0.5,
  modal:     0.5,
};

export const REVEAL = {
  textDesktop:  { y: 40, opacity: 0 },
  textMobile:   { y: 20, opacity: 0 },
  headingDesktop: { y: 50, opacity: 0 },
  headingMobile:  { y: 25, opacity: 0 },
  subtitleDesktop: { y: 25, opacity: 0 },
  subtitleMobile:  { y: 15, opacity: 0 },
  ctaDesktop:   { y: 25, opacity: 0 },
  ctaMobile:    { y: 15, opacity: 0 },
  imageScale:   { scale: 1.05, opacity: 0 },
  imageScaleSmall: { scale: 1.03, opacity: 0 },
};

export const VIEWPORT = { amount: 0.15, once: true };

export const STAGGER = {
  fast:     0.06,
  normal:   0.08,
  relaxed:  0.12,
};

export const MOBILE_BREAKPOINT = 768;