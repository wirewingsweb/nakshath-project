// ============================================================
// SECTION PROGRESS — Right side vertical dots
// Shows on Home page only (lg+ screens)
// ============================================================
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'difference', label: 'Difference' },
  { id: 'whoweare', label: 'About' },
  { id: 'founder', label: 'Founder' },
  { id: 'arena', label: 'Arena' },
  { id: 'programs', label: 'Programs' },
  { id: 'progression', label: 'Progression' },
  { id: 'campus', label: 'Campus' },
  { id: 'horses', label: 'Horses' },
  { id: 'whyriding', label: 'Why Riding' },
  { id: 'whoteaches', label: 'Team' },
  { id: 'season', label: 'Season' },
  { id: 'location', label: 'Location' },
];

const SectionProgress = () => {
  const [active, setActive] = useState('hero');
  const lenis = useLenis();
  const location = useLocation();

  // Only show on Home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-15% 0px -15% 0px',
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (lenis) {
      lenis.scrollTo(el, { offset: -60, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isHomePage) return null;

  return (
    <nav
      className="fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 lg:block"
      aria-label="Section navigation"
    >
      <ul className="flex flex-col items-end gap-3">
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => handleClick(id)}
                className="group flex items-center gap-3 focus:outline-none"
                aria-label={`Go to ${label}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  className={`whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? 'text-[#C9A227] opacity-100'
                      : 'text-[#5A5A66] opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'h-2 w-2 bg-[#C9A227] shadow-[0_0_12px_rgba(201,162,39,0.6)]'
                      : 'h-1.5 w-1.5 bg-[#5A5A66]/40 group-hover:bg-[#C9A227]/70'
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SectionProgress;