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

  const windowWidth = windowSize.width;

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
    // console.log("viewport width:", windowWidth);
    if (windowWidth < 1024) {
      setShowComponent(false);
    } else {
      setShowComponent(true);
    }
  }, [windowWidth]);

  return {
    showComponent,
  };
};
