import { useState, useEffect } from "react";

type WindowSize = {
  height: number;
  width: number;
};

export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const { width } = windowSize;

  const isMobile = width <= 599;
  const isTablet = width <= 1023;
  const isLaptop = width <= 1919;
  const isDesktop = width <= 2559;
  const isWideScreen = width >= 2560;

  const trueIsMobile = width <= 768;

  const [showComponent, setShowComponent] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width < 1024) {
      setShowComponent(false);
    } else {
      setShowComponent(true);
    }
  }, [width]);

  return {
    showComponent,
    isMobile,
    trueIsMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isWideScreen,
  };
};
