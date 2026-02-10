import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const WordCounter = () => {
  const [text, setText] = useState("");
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <PlaygroundCard title="Word & Character Counter" className="playground-interface">
      <p>Type anything and instantly see how many words and characters you’ve written.</p>
      <textarea
        rows="4"
        placeholder="Start typing..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="status-neutral">
        Words: <strong>{wordCount}</strong> | Characters: <strong>{charCount}</strong>
      </div>
    </PlaygroundCard>
  );
};

export default WordCounter;
