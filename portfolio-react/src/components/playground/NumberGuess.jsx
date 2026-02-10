import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const NumberGuess = () => {
  const [guess, setGuess] = useState("");
  const [target] = useState(Math.floor(Math.random() * 100) + 1);
  const [result, setResult] = useState("Enter a number 1-100");

  const checkGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) return setResult("Enter a valid number!");
    if (num < target) setResult("Too low!");
    else if (num > target) setResult("Too high!");
    else setResult("🎉 Correct!");
  };

  return (
    <PlaygroundCard title="Number Guessing Game" className="playground-interface">
      <p>Guess a number between 1-100.</p>
      <div className="input-group">
        <input type="number" min="1" max="100" value={guess} onChange={(e) => setGuess(e.target.value)} />
        <button className="run-btn" onClick={checkGuess}>Check</button>
      </div>
      <div className="status-neutral">{result}</div>
    </PlaygroundCard>
  );
};

export default NumberGuess;
