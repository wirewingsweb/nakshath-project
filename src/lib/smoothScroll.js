// src/lib/smoothScroll.js
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let rafCallback = null;

export const initSmoothScroll = () => {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Keep GSAP ScrollTrigger in sync with Lenis
  lenis.on("scroll", ScrollTrigger.update);

  // Store the RAF callback so we can remove it on destroy.
  // (StrictMode double-mounts → without this, the old callback
  //  keeps firing after lenis is nulled → "Cannot read 'raf' of null".)
  rafCallback = (time) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  return lenis;
};

export const destroySmoothScroll = () => {
  if (rafCallback) {
    gsap.ticker.remove(rafCallback);
    rafCallback = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
};

export const getLenis = () => lenis;

// Used by the mobile nav overlay + (later) the enquiry modal
export const stopScroll = () => {
  lenis?.stop();
};

export const startScroll = () => {
  lenis?.start();
};
