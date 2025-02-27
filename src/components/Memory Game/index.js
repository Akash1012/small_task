import { de } from "date-fns/locale";
import { useEffect, useState } from "react";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [sloved, setSloved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showNumberFirstTime, setShowNumberFirstTime] = useState(true);
  const [maxMoves, setMaxMoves] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameover, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const handleGridSizeChange = (event) => {
    const size = parseInt(event.target.value);
    if (size >= 2 && size <= 10) {
      setGridSize(size);
    }
  };

  useEffect(() => {
    initializeGame();
    setTimeout(() => {
      setShowNumberFirstTime(false);
      setDisabled(false);
    }, 2000);
  }, [gridSize, maxMoves]);

  const initializeGame = () => {
    const totalCards = gridSize * gridSize; // 16
    const pairCount = Math.floor(totalCards / 2); // 8
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    console.log("100", numbers);
    console.log("200", [...numbers, ...numbers].length);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({
        id: index,
        number,
      }));

    setCards(shuffledCards);
    setFlipped([]);
    setSloved([]);
    setMoves(0);
    setGameOver(false);
    setWon(false);
  };

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSloved([...sloved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
    setMoves((moves) => moves + 1);
  };

  const handleClick = (id) => {
    if (disabled || won || gameover) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);

      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        // check match logic
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const isFlipped = (id) => {
    return flipped.includes(id) || sloved.includes(id);
  };

  const isSolved = (id) => {
    return sloved.includes(id);
  };

  useEffect(() => {
    if (sloved.length === cards.length && cards.length > 0) {
      setWon(true);
      setGameOver(true);
    } else if (maxMoves > 0 && moves >= maxMoves) {
      setGameOver(true);
    }
  }, [sloved, moves]);

  const handleMaxMovesChange = (event) => {
    const move = parseInt(event.target.value);
    if (move >= 0) {
      setMaxMoves(move);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen 
    bg-grey-100 p-4"
    >
      <h1 className="text-3xl font-bold mb-6">Memory Game</h1>
      <div className="mn-4 flex space-x-4">
        <div>
          <label htmlFor="gridSize" className="mr-2">
            Grid Size: (max 10)
          </label>
          <input
            className="border-2 border-gray-300 rounded px-2 py-1 w-16"
            type="number"
            id="gridSize"
            min="2"
            max="10"
            value={gridSize}
            onChange={handleGridSizeChange}
          />
        </div>

        <div>
          <label htmlFor="maxMoves" className="mr-2">
            Max Moves: (0 for unlimited)
          </label>
          <input
            className="border-2 border-gray-300 rounded px-2 py-1 w-16"
            type="number"
            id="maxMoves"
            min="0"
            value={maxMoves}
            onChange={handleMaxMovesChange}
          />
        </div>
      </div>

      <div className={`mb-4 text-xl`}>
        Moves: {moves} {moves > 0 ? `/ ${maxMoves}` : ""}
      </div>

      {/* Game Board */}
      <div
        className={`grid gap-2 mb-4`}
        style={{
          gridTemplateColumns: `repeat(${gridSize},minmax(0,1fr))`,
          width: `min(100%,${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => {
          const { id, number } = card;
          return (
            <div
              key={id}
              onClick={() => handleClick(id)}
              className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg 
              ${!gameover && "cursor-pointer"} transition-all duration-300 
              ${
                isFlipped(id)
                  ? isSolved(id)
                    ? "bg-green-400 text-white"
                    : "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-400"
              }
              `}
            >
              {isFlipped(id) ? number : showNumberFirstTime ? number : "?"}
            </div>
          );
        })}
      </div>
      {gameover && (
        <div
          className={`mt-4 text-4xl font-bold ${
            won ? "text-green-400" : "text-red-400"
          } animate-bounce`}
        >
          {won ? "You Won!" : "Game Over !"}
        </div>
      )}
      <button
        onClick={initializeGame}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGame;
