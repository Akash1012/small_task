import { useState, useEffect } from "react";
import ProgessBar from "./Progessbar";
import "./styles.css";

const MainBar = () => {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (value <= 100) {
        setValue((val) => val + 1);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [value]);

  return (
    <div className="mainbar">
      <span>Progess Bar</span>
      <ProgessBar
        value={value}
        onComplete={() => {
          setSuccess(true);
        }}
      />
      <span>{success ? "Complete !" : "Loading ..."}</span>
    </div>
  );
};

export default MainBar;
