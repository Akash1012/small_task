import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Currency from "./Interview";
import Details from "./Interview/details";
import MemoryGame from "./components/Memory Game";
import TimerInterview from "./Interview/XX";
import Timer from "./Interview/XX";
import WeatherDetails from "./components/NewInterview";
import Pagination from "./components/Pagination";
import ReactionTimeGame from "./components/ReactionTimeGame";
import AutoCompleteTypeHead from "./components/Autocomplete-typehead";
import Clock from "./components/Clock";
import Accordion from "./components/Accordion";
import Booking from "./components/CinemaHallBooking";

function App() {
  return (
    <div className="App">
      <h1>Interview</h1>
      <MemoryGame />
    </div>
  );
}

export default App;
