import React, { useState } from "react";
import "./styles.css";

const Timer1 = () => {
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);

  const toogle = () => {
    setIsActive(!isActive);
  };

  useState(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    // else if (!isActive && seconds !== 0) {
    //   clearInterval(interval);
    // }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  console.log("seconds", seconds);
  return (
    <div className="timer-conatiner">
      <div className="show-seconds">{seconds}</div>
      <button className="new_btn" onClick={toogle}>
        {isActive ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default Timer1;
