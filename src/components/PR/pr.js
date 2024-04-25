import { useState, useEffect } from "react";
import "./style.css";

const Tic = () => {
  const [data, setData] = useState(Array(9).fill(null));
  const nextPlayer = data.filter(Boolean).length % 2 === 0 ? "X" : "0";

  const squareSelected = (selectedItem) => {
    const temp = [...data];
    temp[selectedItem] = nextPlayer;
    setData(temp);
  };

  const squareData = (item) => {
    return (
      <>
        <div
          className="column"
          onClick={() => {
            if (!["X", "0"].includes(data[item])) {
              squareSelected(item);
            }
          }}
        >
          <div>{data[item]}</div>
        </div>
      </>
    );
  };

  console.log(data);

  const calculateWinner = () => {
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

      if (data[x] == data[y] && data[y] == data[z]) {
        return data[x];
      }
    }
    return null;
  };

  const winner = calculateWinner();

  const status = () => {
    return winner ? ` Winner is ${winner}` : `Next Player ${nextPlayer}`;
  };

  return (
    <>
      <div className="main-conatiner">
        <div> {status()}</div>
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
      </div>
    </>
  );
};

export default Tic;
