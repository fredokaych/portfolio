import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const ColorMixer = () => {
  const [red, setRed] = useState(100);
  const [green, setGreen] = useState(150);
  const [blue, setBlue] = useState(200);

  return (
    <PlaygroundCard title="Color Mixer" className="playground-interface">
      <p>Adjust RGB sliders to mix colors in real-time.</p>

      {/* Flex column wrapper for three rows */}
      <div
        className="color-sliders"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {/* Row for Red */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ minWidth: "20px" }}>R:</span>
          <input
            type="range"
            min="0"
            max="255"
            value={red}
            onChange={(e) => setRed(Number(e.target.value))}
            style={{ flex: 1 }}
          />
        </div>

        {/* Row for Green */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ minWidth: "20px" }}>G:</span>
          <input
            type="range"
            min="0"
            max="255"
            value={green}
            onChange={(e) => setGreen(Number(e.target.value))}
            style={{ flex: 1 }}
          />
        </div>

        {/* Row for Blue */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ minWidth: "20px" }}>B:</span>
          <input
            type="range"
            min="0"
            max="255"
            value={blue}
            onChange={(e) => setBlue(Number(e.target.value))}
            style={{ flex: 1 }}
          />
        </div>
      </div>

      <div
        className="status-neutral"
        style={{
          marginTop: "0.5rem",
          height: "40px",
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        }}
      />
    </PlaygroundCard>
  );
};

export default ColorMixer;
