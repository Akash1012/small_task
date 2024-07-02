import { useEffect, useState } from "react";

const useLight = (light = {}, defaultLight = "red") => {
  const [allLight] = useState(light);
  const [currentLight, setCurrentLight] = useState(defaultLight);

  useEffect(() => {
    const { duration, next } = allLight[currentLight];
    const timer = setTimeout(() => {
      setCurrentLight(next);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentLight]);

  return {
    currentLight,
  };
};

export default useLight;
