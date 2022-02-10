import React, { useEffect, useState } from "react";

export default function Timer({ timer, i }) {
  const [text, setText] = useState(null);
  const [time, setTime] = useState(null);

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
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Set a text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
}
