import React, { useEffect, useState } from "react";

export default function Timer({ timer, i, updateTimer }) {
  const [text, setText] = useState("null");
  const [time, setTime] = useState(0);

  useEffect(() => {
    setText(timer.text);
    setTime(timer.time);
  }, []);
  return (
    <form>
      <input
        type="number"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(parseInt(e.target.value))}
        onBlur={() => updateTimer(i, text, time)}
      />
      <input
        type="text"
        placeholder="Set a text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => updateTimer(i, text, time)}
      />
    </form>
  );
}
