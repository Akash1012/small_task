import { useEffect, useState } from "react";

const useTrafficOptionsLight = (lights = {}, defaultLight = "red") => {
  const [allLight, setAllLight] = useState(lights);
  const [currentColor, setCurrentColor] = useState(defaultLight);

  useEffect(() => {
    const { duration, next } = allLight[currentColor];
    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);
    return () => {
      clearTimeout(timerId);
    };
  }, [currentColor]);

  return {
    currentColor,
  };
};

export default useTrafficOptionsLight;
