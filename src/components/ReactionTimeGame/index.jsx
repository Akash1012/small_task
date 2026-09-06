import React, { useEffect, useState } from "react";
import "./styles.css";

const INITIAL_LEVEL = 3;
const TARGET_DURATION = 1500;

const ReactionTimeGame = () => {
  const [level, setLevel] = useState(INITIAL_LEVEL);
  const [targetIndex, setTargetIndex] = useState(null);
  const [gameStatus, setGameStatus] = useState("playing");

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const totalBoxes = level * level;

    const randomIndex = Math.floor(Math.random() * totalBoxes);

    setTargetIndex(randomIndex);

    const timer = setTimeout(() => {
      setGameStatus("gameover");
    }, TARGET_DURATION);

    return () => clearTimeout(timer);
  }, [level, gameStatus]);

  const handleBoxClick = (index) => {
    if (gameStatus !== "playing") return;

    if (index === targetIndex) {
      setTargetIndex(null);
      setLevel((prevLevel) => prevLevel + 1);
    } else {
      setGameStatus("gameover");
    }
  };

  const restartGame = () => {
    setLevel(INITIAL_LEVEL);
    setTargetIndex(null);
    setGameStatus("playing");
  };

  return (
    <div className="main_container">
      <h1>Level {level}</h1>

      <p>
        {gameStatus === "playing" ? "Click the highlighted box!" : "Game Over"}
      </p>

      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${level}, 1fr)`,
        }}
      >
        {Array.from({ length: level * level }).map((_, index) => (
          <button
            key={index}
            className={`box ${index === targetIndex ? "active" : ""}`}
            onClick={() => handleBoxClick(index)}
            disabled={gameStatus !== "playing"}
          ></button>
        ))}
      </div>

      {gameStatus === "gameover" && (
        <button className="restart" onClick={restartGame}>
          Restart Game
        </button>
      )}
    </div>
  );
};

export default ReactionTimeGame;
