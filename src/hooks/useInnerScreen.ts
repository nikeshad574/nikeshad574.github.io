import { useState, useEffect } from "react";

const useInnerScreen = () => {
  const [dimensions, setDimensions] = useState({
    innerW: window.innerWidth,
    innerH: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        innerW: window.innerWidth,
        innerH: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimensions;
};

export default useInnerScreen;
