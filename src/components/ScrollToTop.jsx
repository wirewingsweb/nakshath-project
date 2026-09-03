import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Forces the page to scroll to the very top
  }, [pathname]); // Runs every time the URL changes

  return null;
};

export default ScrollToTop;