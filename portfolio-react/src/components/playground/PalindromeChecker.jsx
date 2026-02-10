import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const PalindromeChecker = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("Waiting for input...");

  const checkPalindrome = () => {
    const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!cleaned) {
      setResult("Please enter some text.");
      return;
    }
    const reversed = cleaned.split("").reverse().join("");
    setResult(
      cleaned === reversed ? "✅ Yes! This is a palindrome." : "❌ Nope, not a palindrome."
    );
  };

  return (
    <PlaygroundCard title="Palindrome Checker" className="playground-interface">
      <p>Enter a word or phrase below to check if it reads the same backward as forward.</p>
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a word..."
        />
        <button className="run-btn" onClick={checkPalindrome}>Run</button>
      </div>
      <div className="status-neutral">{result}</div>
    </PlaygroundCard>
  );
};

export default PalindromeChecker;
