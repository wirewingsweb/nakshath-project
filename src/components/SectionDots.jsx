// src/components/SectionDots.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../utils/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// Default chapters for Home page
const DEFAULT_CHAPTERS = [
  { id: 'chapter-story',    label: 'Story' },
  { id: 'chapter-about',    label: 'About' },
  { id: 'chapter-facility', label: 'Facility' },
  { id: 'chapter-programs', label: 'Programs' },
  { id: 'chapter-campus',   label: 'Campus' },
  { id: 'chapter-horses',   label: 'Horses' },
  { id: 'chapter-team',     label: 'Team' },
  { id: 'chapter-visit',    label: 'Visit' },
];

const SectionDots = ({ chapters = DEFAULT_CHAPTERS }) => {
  const [activeId, setActiveId] = useState(chapters[0]?.id || '');
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  // Track which chapter is currently in view
  useEffect(() => {
    const sectionEls = chapters
      .map((ch) => document.getElementById(ch.id))
      .filter(Boolean);

    if (!sectionEls.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        let topEntry = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!topEntry || entry.intersectionRatio > topEntry.intersectionRatio) {
              topEntry = entry;
            }
          }
        });
        if (topEntry) setActiveId(topEntry.target.id);
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapters]);

  // Show dots only after user has scrolled past the top
  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          aria-label="Page sections"
          className="fixed right-5 top-1/2 z-[45] hidden -translate-y-1/2 md:flex md:flex-col md:gap-3"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 10 }}
          transition={{ duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY }}
        >
          {chapters.map((chapter) => {
            const isActive = activeId === chapter.id;
            return (
              <button
                key={chapter.id}
                onClick={() => handleClick(chapter.id)}
                aria-label={`Go to ${chapter.label}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center justify-end gap-2 py-1"
              >
                <span
                  className={`pointer-events-none select-none text-[0.65rem] font-semibold uppercase tracking-[0.14em] opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                    isActive ? 'text-[#C9A227]' : 'text-[#0C0922]/60'
                  }`}
                >
                  {chapter.label}
                </span>

                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'h-2 w-2 bg-[#C9A227] shadow-[0_0_0_3px_rgba(201,162,39,0.2)]'
                      : 'h-1.5 w-1.5 bg-[#0C0922]/30 hover:bg-[#C9A227]'
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default SectionDots;