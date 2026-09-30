// ============================================================
// ANIMATED HEADING — Word-by-word mask reveal on scroll
// ============================================================
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { gsap, isMobile } from '../utils/gsapSetup';

const AnimatedHeading = ({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.05,
  type = 'words', // 'words' | 'lines' | 'chars'
  duration = 1.0,
}) => {
  const headingRef = useRef(null);
  const splitRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Split text into words/lines
    splitRef.current = new SplitType(el, {
      types: type,
      tagName: 'span',
    });

    const targets =
      type === 'words'
        ? splitRef.current.words
        : type === 'lines'
          ? splitRef.current.lines
          : splitRef.current.chars;

    if (!targets || !targets.length) return;

    // Wrap each target in an overflow-hidden mask
    targets.forEach((target) => {
      const wrapper = document.createElement('span');
      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      wrapper.style.verticalAlign = 'bottom';
      wrapper.style.paddingBottom = '0.15em';
      wrapper.style.marginBottom = '-0.15em';

      target.parentNode.insertBefore(wrapper, target);
      wrapper.appendChild(target);
      target.style.display = 'inline-block';
      target.style.willChange = 'transform';
    });

    // Animate
    const tween = gsap.from(targets, {
      yPercent: 115,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      splitRef.current?.revert();
    };
  }, [type, delay, stagger, duration]);

  return (
    <Tag ref={headingRef} className={className}>
      {children}
    </Tag>
  );
};

export default AnimatedHeading;