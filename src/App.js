import { useEffect, useState } from "react";
import Timer from "./components/Timer";
import { useStopwatch } from "react-timer-hook";

export default function App() {
  const [timers, setTimers] = useState([
    { text: "hello", time: 1 },
    { text: "hello", time: 1 }
  ]);

  const { seconds, isRunning, start, reset } = useStopwatch({
    autoStart: false
  });
  const maxTime = Math.max(...timers.map((t) => t.time), 0); //Find largest time

  useEffect(() => {
    let findTimerOnTime = timers.find((t) => t.time === seconds);
    console.log(findTimerOnTime);

    if (maxTime <= seconds) reset(new Date(), false); //End if out of bound
  }, [seconds]);

  function handleAdd() {
    setTimers((timers) => [...timers, { text: "", time: 0 }]);
  }
  function updateTimer(index, text, time) {
    let newTimers = [...timers];
    newTimers[index].text = text;
    newTimers[index].time = time;
    setTimers(newTimers);
  }

  return (
    <div className="App">
      <h1>Text2TTS</h1>

      {/* timers */}
      <div className="timers">
        {timers.map((timer, i) => (
          <Timer timer={timer} i={i} updateTimer={updateTimer} key={i} />
        ))}
        <button onClick={handleAdd}>
          <i className="fa-solid fa-plus"></i>
          <span>Add</span>
        </button>
      </div>

      {/* seconds */}
      <p>{seconds}</p>

      {/* Start/Stop button and isRunning */}
      <div>
        {isRunning ? (
          <button onClick={() => reset(new Date(), false)}>
            <i className="fa-solid fa-stop"></i>
          </button>
        ) : (
          <button onClick={start}>
            <i className="fa-solid fa-play"></i>
          </button>
        )}
      </div>
    </div>
  );
}
