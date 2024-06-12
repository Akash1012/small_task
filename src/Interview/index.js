import { useState, useEffect } from "react";
import "./styles.css";

const Tic = () => {
  const [data, setData] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  let nextPlayer = data.filter(Boolean).length % 2 === 0 ? "X" : "O";

  useEffect(() => {
    if (data.filter(Boolean).length === data.length) {
      if (!checkWinner) {
        setGameOver(true);
      }
    }
  }, [data]);

  const calculateWinner = () => {
    let prob = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let item of prob) {
      let [x, y, z] = item;

      if (data[x] === data[y] && data[y] === data[z]) {
        return data[x];
      }
    }
    return null;
  };

  const checkWinner = calculateWinner();

  const status = () => {
    return checkWinner
      ? `Winner is : ${checkWinner}`
      : `${
          gameOver
            ? "Game Over, Please Reset Your Game"
            : `Next Player is : ${nextPlayer}`
        }`;
  };
  const box = (item) => {
    return (
      <div
        className="cc"
        onClick={() => addElementToBox(item)}
        style={{
          background:
            data[item] === "X" ? "red" : data[item] === "O" ? "blue" : "white",
        }}
      >
        {data[item]}
      </div>
    );
  };

  const addElementToBox = (item) => {
    if (!checkWinner && !data[item]) {
      let temp = [...data];
      temp[item] = nextPlayer;
      setData(temp);
    }
  };

  const resetGame = () => {
    setData(Array(9).fill(null));
  };

  return (
    <div>
      <div className="heading">
        <h1>TIC TAC</h1>
        <p>{status()}</p>
        <button onClick={() => resetGame()}>Reset Game</button>
      </div>
      <div className="bb">
        <div className="rr">
          {box(0)}
          {box(1)}
          {box(2)}
        </div>
        <div className="rr">
          {box(3)}
          {box(4)}
          {box(5)}
        </div>
        <div className="rr">
          {box(6)}
          {box(7)}
          {box(8)}
        </div>
      </div>
    </div>
  );
};

export default Tic;
