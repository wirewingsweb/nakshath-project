// src/components/scrollytelling/ScrollProgress.jsx
import { useEffect, useState } from 'react';

/**
 * ScrollProgress — thin gold progress bar at top of viewport.
 * Tracks scrollY percentage from 0 to 100.
 */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[200] h-[2px] w-full bg-transparent pointer-events-none">
      <div
        className="h-full bg-[#C9A227] transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;