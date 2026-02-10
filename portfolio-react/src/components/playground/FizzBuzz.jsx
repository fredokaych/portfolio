import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const FizzBuzz = () => {
  const [num, setNum] = useState(15);
  const [result, setResult] = useState("");

  const runFizzBuzz = () => {
    let output = "";
    for (let i = 1; i <= num; i++) {
      if (i % 3 === 0 && i % 5 === 0) output += "FizzBuzz, ";
      else if (i % 3 === 0) output += "Fizz, ";
      else if (i % 5 === 0) output += "Buzz, ";
      else output += i + ", ";
    }
    setResult(output.slice(0, -2));
  };

  return (
    <PlaygroundCard title="FizzBuzz Tester" className="playground-interface">
      <p>Run FizzBuzz for any number range.</p>
      <div className="input-group">
        <input type="number" min="1" value={num} onChange={(e) => setNum(Number(e.target.value))} />
        <button className="run-btn" onClick={runFizzBuzz}>Run</button>
      </div>
      <div className="status-neutral">{result}</div>
    </PlaygroundCard>
  );
};

export default FizzBuzz;
