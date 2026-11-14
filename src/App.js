import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Currency from "./Interview";
import Details from "./Interview/details";
import MemoryGame from "./components/Memory Game";
import TimerInterview from "./Interview/XX";
import Timer from "./Interview/XX";
import WeatherDetails from "./components/NewInterview";
import Pagination from "./components/Pagination";
import ChatGpt from "./components/chatgpt/App";
import ReactionTimeGame from "./components/ReactionTimeGame";
import AutoCompleteTypeHead from "./components/Autocomplete-typehead";
import Clock from "./components/Clock";

function App() {
  return (
    <div>
      {/* <ReactionTimeGame />, */}
      {/* <ChatGpt /> */}
      {/* <Pagination /> */}
      {/* <WeatherDetails /> */}
      <Clock />
      {/* <Timer startTimer={2} endTimer={10} /> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Currency />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </BrowserRouter> */}
      <MemoryGame />

      {/* <TimerInterview /> */}
    </div>
  );
}

export default App;
