import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { useSpeechSynthesis } from "react-speech-kit";

import Timer from "./components/Timer";

export default function App() {
  const [timers, setTimers] = useState([
    { text: "hello", time: 1 },
    { text: "world", time: 3 }
  ]);

  const { seconds, isRunning, start, reset } = useStopwatch({
    autoStart: false
  });
  const { speak, speaking } = useSpeechSynthesis();

  const maxTime = Math.max(...timers.map((t) => t.time), 0); //Find largest time

  useEffect(() => {
    let foundTimerOnTime = timers.find((t) => t.time === seconds);

    if (foundTimerOnTime) speak({ text: foundTimerOnTime.text }); //TTS if corresponding timer object is found

    if (maxTime < seconds) reset(new Date(), false); //End if out of bound
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
      <div className="py-10 px-10 bg-purple-700 min-h-screen font-mono flex flex-col items-center justify-center">
        <h1 className="text-purple-100 text-5xl font-bold mb-6">Text2TTS</h1>

        {/* timers */}
        <div className="space-y-2 mb-8">
          {timers.map((timer, i) => (
            <Timer timer={timer} i={i} updateTimer={updateTimer} key={i} />
          ))}
          <button
            onClick={handleAdd}
            className="px-5 py-2 bg-purple-400 hover:bg-purple-200 text-purple-700 rounded-xl transition duration-500"
          >
            <i className="fa-solid fa-plus"></i>
            <span>add new</span>
          </button>
        </div>

        {/* seconds */}
        <p className="text-yellow-400 text-6xl font-bold mb-3">{seconds}</p>

        {/* Start/Stop button and isRunning */}
        <div>
          {isRunning ? (
            <div className="flex items-center">
              <button
                onClick={() => reset(new Date(), false)}
                className="px-4 py-2 bg-purple-300 hover:bg-purple-100 rounded-xl hover:shadow-md hover:shadow-white transition duration-500 mr-5"
              >
                <i className="fa-solid fa-stop"></i>
              </button>
              {speaking && <p className="text-purple-200">Speaking...</p>}
            </div>
          ) : (
            <button
              onClick={start}
              className="px-4 py-2 bg-purple-300 hover:bg-purple-100 rounded-xl hover:shadow-md hover:shadow-white transition duration-500"
            >
              <i className="fa-solid fa-play"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
