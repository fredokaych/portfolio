import React, { useState } from "react";
import PlaygroundCard from "./PlaygroundCard";

const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "I told my computer I needed a break… it froze.",
    "Why do Java developers wear glasses? Because they don’t C#.",
    "There are 10 kinds of people: those who understand binary and those who don’t.",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "How many programmers does it take to change a light bulb? None. It's a hardware problem.",
    "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
    "Why was the JavaScript developer sad? Because he didn’t Node how to Express himself.",
    "Debugging: Being the detective in a crime movie where you are also the murderer.",
    "Why did the functions stop calling each other? Because they had constant arguments.",
    "Algorithm: Word used by programmers when they don’t want to explain what they did.",
    "I would tell you a UDP joke, but you might not get it.",
    "Programmer (noun): A machine that turns coffee into code.",
    "There’s no place like 127.0.0.1",
    "Why did the computer show up at work late? It had a hard drive.",
    "Why do Python programmers wear glasses? Because they can’t C.",
    "To understand recursion, you must first understand recursion.",
    "A programmer’s wife tells him: 'Run to the store and get a loaf of bread. If they have eggs, get a dozen.' He comes home with 12 loaves of bread.",
    "Real programmers count from 0.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Why did the computer get cold? It left its Windows open.",
    "Why do programmers hate nature? It has too many bugs.",
    "What do you call 8 hobbits? A hobbyte.",
    "How do you comfort a JavaScript bug? You console it.",
    "Why was the developer drowning? He didn't know how to float.",
    "Why was the cell phone wearing glasses? It lost its contacts.",
    "What’s a programmer’s favorite hangout place? Foo Bar.",
    "Why did the programmer go broke? He lost his domain in a bet.",
    "Why do Java developers wear glasses? They don’t see sharp.",
    "Why did the coder cross the road? Because he forgot to commit.",
    "Knock knock. Who’s there? Recursion. Recursion who? Knock knock…",
    "Why did the coder get kicked out of school? Too many class conflicts.",
    "What is a programmer’s favorite musical? Algo-rhythm and blues.",
    "Why was the developer unhappy at his job? He wanted arrays of sunshine.",
    "How do programmers enjoy nature? They log off.",
    "Why did the computer get glasses? To improve its web-sight.",
    "Why did the computer keep sneezing? Too many Windows updates.",
    "Why did the coder bring a ladder? To reach the higher-level language.",
    "What did the router say to the doctor? 'It hurts when IP!'",
    "Why do programmers prefer iOS development? Because Androids have too many exceptions.",
    "Why did the programmer get stuck in the shower? Because the instructions were in Java.",
    "How did the computer get out of a tricky situation? Ctrl + Alt + Del.",
    "Why did the programmer leave the party? He didn’t get any class.",
    "Why are assembly programmers always soaking wet? They work below C-level.",
    "Why was the computer tired when it got home? Too many tabs open.",
    "Why did the coder bring string to class? To handle the exceptions.",
    "Why did the computer visit art school? It wanted to improve its graphics.",
    "Why did the programmer refuse to cross the road? He didn’t like traffic jams.",
    "Why do developers love elevators? Because they like to push buttons.",
    "Why did the coder go broke? He used up all his cache.",
    "Why don’t programmers like to golf? Too many loose pointers."
];

const RandomJoke = () => {
    const [joke, setJoke] = useState("Click run to get a joke.");

    const getJoke = () => {
        const random = jokes[Math.floor(Math.random() * jokes.length)];
        setJoke(random);
    };

    return (
        <PlaygroundCard title="Random Dev Joke" className="playground-interface">
            <p>A small break for your brain.</p>
            <button className="run-btn" onClick={getJoke}>Run</button>
            <div className="status-neutral">{joke}</div>
        </PlaygroundCard>
    );
};

export default RandomJoke;
