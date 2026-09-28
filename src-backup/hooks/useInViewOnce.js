// src/hooks/useInViewOnce.js
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useInViewOnce({ amount = 0.2, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Reset on every route change so the animation replays
    setInView(false);

    // Synchronous check — if already visible at mount, fire immediately.
    // This handles above-the-fold elements and short pages where the
    // IntersectionObserver callback may never fire (because the element
    // never *crosses* the threshold — it starts already inside it).
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const alreadyInView =
      rect.height > 0 &&
      rect.top < vh &&
      rect.bottom > 0;

    if (alreadyInView) {
      // rAF so the setInView(false) above commits first, giving FM a
      // clean false → true transition to animate.
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, once, pathname]);

  return [ref, inView];
}

export default useInViewOnce;