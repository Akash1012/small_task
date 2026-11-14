import "./styles.css";
import React from "react";

export default function Timer(props) {
  const { startTimer = 0, endTimer } = props;
  const [seconds, setSeconds] = React.useState(startTimer);
  const [isActive, setIsActive] = React.useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(!isActive);
  };

  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (endTimer !== seconds) {
          setSeconds((seconds) => seconds + 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      <div className="final-conatiner">
        <div className="show-seconds">{seconds}</div>
        <div className="btn-conatiner">
          <button className="new_btn" onClick={toggle}>
            {isActive ? "Pause" : "Start"}
          </button>

          <button className="new_btn" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
