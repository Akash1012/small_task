import "./App.css";
import Accordion from "./components/Accordion";
import TicTacToe from "./components/Tic Tac Toe";

function App() {
  return (
    <div>
      <div className="tic">
        {/* <TicTacToe /> */}
        <Accordion />
      </div>
    </div>
  );
}

export default App;
