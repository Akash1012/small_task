import "./App.css";
import Accordion from "./components/Accordion";
import AutoCompleteTypeHead from "./components/Autocomplete-typehead";
import TicTacToe from "./components/Tic Tac Toe";

function App() {
  return (
    <div>
      <div className="tic">
        {/* <TicTacToe /> */}
        {/* <Accordion /> */}
        <AutoCompleteTypeHead />
      </div>
    </div>
  );
}

export default App;
