// src/components/scrollytelling/PinnedSection.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * PinnedSection — pins its content to the viewport while user scrolls.
 *
 * Props:
 *   children       — content to pin
 *   height         — total scroll height (e.g. '200vh') — default 200vh
 *   amount         — ScrollTrigger scrub amount (default 1)
 *   disabled       — skip pinning (used for reduced-motion or to opt out)
 *   onProgress     — callback(progress: 0→1) called on every scroll frame
 */
const PinnedSection = ({
  children,
  height = '200vh',
  amount = 1,
  disabled = false,
  onProgress,
  className = '',
  id,
}) => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced || disabled) return undefined;
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return undefined;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${height}`,
        pin: inner,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: amount,
        onUpdate: (self) => {
          if (onProgress) onProgress(self.progress);
        },
      });
    }, container);

    return () => ctx.revert();
  }, [height, amount, disabled, onProgress, prefersReduced]);

  if (prefersReduced || disabled) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height }}
    >
      <div
        ref={innerRef}
        className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden"
      >
        {children}
      </div>
    </section>
  );
};

export default PinnedSection;