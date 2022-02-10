import { useState } from "react";
import Timer from "./components/Timer";

export default function App() {
  const [timers, setTimers] = useState([
    { text: "hello", time: 1 },
    { text: "hello", time: 1 }
  ]);

  function handleAdd() {
    setTimers((timers) => [...timers, { text: "", time: null }]);
  }
  return (
    <div className="App">
      <h1>Text2TTS</h1>

      <div className="timers">
        {timers.map((timer, i) => (
          <Timer timer={timer} i={i} />
        ))}
        <button onClick={handleAdd}>
          <i class="fa-solid fa-plus"></i>
          <span>Add</span>
        </button>
      </div>

      {/* seconds */}
      <p>0</p>

      {/* Start/Stop button */}
      <button>
        <i class="fa-solid fa-play"></i>
      </button>
    </div>
  );
}
