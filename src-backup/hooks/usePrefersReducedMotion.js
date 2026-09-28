// src/hooks/usePrefersReducedMotion.js
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mql = window.matchMedia(QUERY);
    setPrefersReduced(mql.matches);

    const onChange = (e) => setPrefersReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}

export default usePrefersReducedMotion;