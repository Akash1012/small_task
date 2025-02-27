import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Currency from "./Interview";
import Details from "./Interview/details";
import MemoryGame from "./components/Memory Game";
import TimerInterview from "./Interview/XX";
import Timer from "./Interview/XX";
import WeatherDetails from "./components/NewInterview";
import Pagination from "./components/Pagination";

function App() {
  return (
    <div>
      <Pagination />
      {/* <WeatherDetails /> */}
      {/* <Timer startTimer={2} endTimer={10} /> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Currency />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </BrowserRouter> */}
      {/* <MemoryGame /> */}

      {/* <TimerInterview /> */}
    </div>
  );
}

export default App;
