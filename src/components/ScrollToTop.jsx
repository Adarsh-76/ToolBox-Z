import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to top whenever the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component renders nothing on the screen
};

export default ScrollToTop;
