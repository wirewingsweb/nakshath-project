// src/components/scrollytelling/PinnedSection.jsx
import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const PinnedSection = forwardRef(function PinnedSection(
  {
    children,
    height = '200vh',
    amount = 1,
    disabled = false,
    onProgress,
    className = '',
    id,
  },
  externalRef
) {
  const internalRef = useRef(null);
  const innerRef = useRef(null);
  const prefersReduced = usePrefersReducedMotion();

  // Merge external ref with internal ref
  const setRefs = (node) => {
    internalRef.current = node;
    if (typeof externalRef === 'function') externalRef(node);
    else if (externalRef) externalRef.current = node;
  };

  useEffect(() => {
    if (prefersReduced || disabled) return undefined;
    const container = internalRef.current;
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
      <section id={id} ref={setRefs} className={className}>
        {children}
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={setRefs}
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
});

export default PinnedSection;