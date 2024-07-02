import "./App.css";
import TrafficService from "./components/PR";
import Traffic from "./components/TrafficLight";

function App() {
  return (
    <div>
      <div>Hello</div>
      <Traffic />
      <hr />
      <TrafficService />
    </div>
  );
}

export default App;
