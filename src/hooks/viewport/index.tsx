import { useEffect, useState } from 'react';

const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { width, breakPoint };
};

export default useViewport;
