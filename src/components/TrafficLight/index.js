// import "./styles.css";
import { useState, useEffect } from "react";
import traffic from "./useHook";
import useTrafficOptionsLight from "./useHook";
import Light from "./Light";

// Build a traffic light where the lights switch
// from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:
// Red light: 4000ms
// Yellow light: 500ms
// Green light: 3000ms
// You are free to exercise your creativity
// to style the appearance of the traffic light.

export default function Traffic() {
  const [light, setLights] = useState({
    red: {
      backgroundColor: "red",
      duration: 4000,
      next: "yellow",
    },
    yellow: {
      backgroundColor: "yellow",
      duration: 500,
      next: "green",
    },
    green: {
      backgroundColor: "green",
      duration: 3000,
      next: "red",
    },
  });

  let { currentColor } = useTrafficOptionsLight(light);

  return (
    <div>
      {Object.keys(light).map((color) => (
        <Light
          key={color}
          backgroundColor={
            color === currentColor ? light[color].backgroundColor : undefined
          }
        />
      ))}
    </div>
  );
}
