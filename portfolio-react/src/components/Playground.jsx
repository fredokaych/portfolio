import React, { useRef } from "react";
import fadeInSection from "../hooks/fadeInSection";

// Import all cards
import PalindromeChecker from "./playground/PalindromeChecker";
import WordCounter from "./playground/WordCounter";
import RandomJoke from "./playground/RandomJoke";
import FizzBuzz from "./playground/FizzBuzz";
import NumberGuess from "./playground/NumberGuess";
import ColorMixer from "./playground/ColorMixer";
import ComingSoon from "./playground/ComingSoon";

const Playground = () => {
  const sectionRef = fadeInSection();

  return (
    <section id="playground" ref={sectionRef} className="fade-in-section" aria-labelledby="playground-header">
      <div className="section-header">
        <h2 id="playground-header">Code Playground</h2>
        <p>Interactive JavaScript demos.</p>
      </div>
      <div className="grid">
        <PalindromeChecker />
        <WordCounter />
        <RandomJoke />
        <FizzBuzz />
        <NumberGuess />
        <ColorMixer />
        <ComingSoon />
      </div>
    </section>
  );
};

export default Playground;
