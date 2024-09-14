import { useState } from "react";
import "./styles.css";

const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill(null));
  const nextPlayer = data.filter(Boolean).length % 2 === 0 ? "X" : "O";

  console.log(nextPlayer);

  const squareData = (item) => {
    return (
      <div className="column" onClick={() => squareSelected(item)}>
        <div>{data[item]}</div>
      </div>
    );
  };

  const resetGame = () => {
    setData(Array(9).fill(null));
  };

  const calculateWinner = (data) => {
    const allPossibleAnswer = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (let row of allPossibleAnswer) {
      let [x, y, z] = row;

      if (data[x] === data[y] && data[y] === data[z]) {
        return data[x];
      }
    }
    return null;
  };

  const winner = calculateWinner(data);

  const status = () => {
    return winner ? `Winner is ${winner}` : `Next Player is ${nextPlayer}`;
  };

  const squareSelected = (selectedItem) => {
    if (!winner && !data[selectedItem]) {
      const temp = [...data];
      temp[selectedItem] = nextPlayer;
      setData(temp);
    }
  };
  return (
    <div className="main_container">
      <div>{status()}</div>
      <div className="board">
        <div className="row">
          {squareData(0)}
          {squareData(1)}
          {squareData(2)}
        </div>
        <div className="row">
          {squareData(3)}
          {squareData(4)}
          {squareData(5)}
        </div>
        <div className="row">
          {squareData(6)}
          {squareData(7)}
          {squareData(8)}
        </div>
      </div>

      <button onClick={resetGame}> Reset_Game</button>
    </div>
  );
};

export default TicTacToe;
