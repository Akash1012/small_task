import React, { useState, useEffect } from "react";
import ClockImg from "./images.jpeg";

function Clock({ label, timeZone }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).formatToParts(time);

  // console.log(parts);

  const getValue = (type) => {
    return Number(parts.find((item) => item.type === type)?.value);
  };

  const hours = getValue("hour");
  const minutes = getValue("minute");
  const seconds = getValue("second");

  // Convert the current time into rotation angles for the analog clock hands.
  // A full circle is 360°:
  // - Second hand: 360° / 60 seconds = 6° per second.
  // - Minute hand: 6° per minute + 0.1° per second for smooth movement.
  // - Hour hand: 360° / 12 hours = 30° per hour + 0.5° per minute.

  //  hand angles
  const secondAngle = seconds * 6; //A full circle is: 360°. There are 60 seconds in one rotation: 360° ÷ 60 = 6°

  // 6° per minute
  // 60 seconds per minute

  // 6 ÷ 60 = 0.1° , So the minute hand moves 0.1° every second.
  const minuteAngle = minutes * 6 + seconds * 0.1;

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "50px",
      }}
    >
      <label
        style={{
          marginBottom: "30px",
          fontSize: "30px",
          fontFamily: "cursive",
          fontWeight: "bold",
          letterSpacing: "0.07em",
        }}
      >
        {label}
      </label>

      <div
        style={{
          position: "relative",
          height: "250px",
          width: "250px",
          backgroundImage: `url("${ClockImg}")`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "50%",
            height: "60px",
            width: "7px",
            background: "black",
            transformOrigin: "bottom center",
            transform: `translateX(-50%) rotate(${hourAngle}deg)`,
          }}
        />

        {/* Minute hand */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "50%",
            height: "80px",
            width: "5px",
            background: "black",
            transformOrigin: "bottom center",
            transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
          }}
        />

        {/* Second hand */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "50%",
            height: "95px",
            width: "2px",
            background: "red",
            transformOrigin: "bottom center",
            transform: `translateX(-50%) rotate(${secondAngle}deg)`,
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>World Time Clocks</h1>
      <Clock label="India" timeZone="Asia/Kolkata" />
      {/* <Clock label="Washington D.C" timeZone="America/New_York" />
      <Clock label="Canberra" timeZone="Australia/Canberra" /> */}
    </div>
  );
}
