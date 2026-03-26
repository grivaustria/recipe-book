import { useState, useEffect } from "react";

type WindowSize = {
  height: number;
  width: number;
};

const VIEWPORTS = {
  mobile: 360,
  tablet: 768,
  smallDesktop: 1366,
  scaledLaptop: 1536,
  externalMonitor: 1920,
} as const;

export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const { width } = windowSize;

  // Mobile viewport: below the 768px tablet breakpoint.
  const isMobile = width < VIEWPORTS.tablet;
  // Tablet viewport: 768px up to below 1366px.
  const isTablet = width >= VIEWPORTS.tablet && width < VIEWPORTS.smallDesktop;
  // Small desktop viewport: 1366px up to below 1536px.
  const isLaptop =
    width >= VIEWPORTS.smallDesktop && width < VIEWPORTS.scaledLaptop;
  // Scaled laptop viewport: 1536px up to below 1920px.
  const isDesktop =
    width >= VIEWPORTS.scaledLaptop && width < VIEWPORTS.externalMonitor;
  // External monitor viewport: 1920px and above.
  const isWideScreen = width >= VIEWPORTS.externalMonitor;

  const trueIsMobile = width <= VIEWPORTS.mobile;
  const dishGaleriaTablet = width < VIEWPORTS.smallDesktop;

  const [showComponent, setShowComponent] = useState<boolean>(
    width >= VIEWPORTS.smallDesktop,
  );

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
    if (width < VIEWPORTS.smallDesktop) {
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
    dishGaleriaTablet,
  };
};
