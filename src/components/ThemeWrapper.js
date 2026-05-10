import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

export default function ThemeWrapper({colorClass, children}) {
  const location = useLocation();

  useEffect(() => {
    console.log("ThemeWrapper Active: Adding", colorClass); // Check console for this!
    document.body.classList.add(colorClass);
    
    // Cleanup: remove class when leaving page
    return () => {
      document.body.classList.remove(colorClass);
    };
  }, [location.pathname, colorClass]);

  return <>{children}</>;
}