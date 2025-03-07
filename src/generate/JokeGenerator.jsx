import React, { useState } from "react";

export function JokeGenerator({ onJokeGenerated }) {
  const [joke, setJoke] = useState("");

  const getUserName = () => {
    const email = localStorage.getItem("userName") || "Mystery User";
    return email.includes("@") ? email.split("@")[0] : email;
  };

  const saveJoke = (newJoke) => {
    const username = getUserName();
    const savedJokesKey = `savedJokes_${username}`;
    const savedJokes = JSON.parse(localStorage.getItem(savedJokesKey)) || [];
    
    if (!savedJokes.includes(newJoke)) {
      const updatedJokes = [...savedJokes, newJoke];
      localStorage.setItem(savedJokesKey, JSON.stringify(updatedJokes));
    }
  };

  const generateJoke = () => {
    const jokes = [
      "I told my suitcase there'd be no vacations… now it’s emotional baggage.",
      "Parallel lines have so much in common. Too bad they’ll never meet.",
      "Why did the scarecrow win an award? He was outstanding in his field.",
      "Why don’t skeletons fight each other? They don’t have the guts.",
      "I’m reading a book on anti-gravity. It’s impossible to put down.",
      "I used to play piano by ear, but now I use my hands.",
      "Did you hear about the claustrophobic astronaut? He just needed a little space.",
      "Why did the bicycle fall over? Because it was two-tired!",
      "I got a job at a bakery because I kneaded dough.",
      "I used to be a baker, but I couldn't make enough dough.",
      "I’m friends with all electricians. We have good current connections.",
      "The man who survived both mustard gas and pepper spray is a seasoned veteran now.",
      "Why don’t programmers like nature? It has too many bugs.",
      "I told my wife she should embrace her mistakes. She gave me a hug.",
      "Why do cows have hooves instead of feet? Because they lactose.",
      "I used to be a banker, but I lost interest.",
      "I told my cat he was fat. Now he’s offended and has put me on a diet.",
      "I used to be a Velcro salesman, but I couldn’t stick with it.",
      "Why don’t some couples go to the gym? Because some relationships don’t work out.",
      "I asked my dog what’s two minus two. He said nothing.",
      "I'm on a whiskey diet. I've lost three days already.",
      "I stayed up all night wondering where the sun went, then it dawned on me.",
      "I'm terrified of elevators, so I'm taking steps to avoid them.",
      "Why did the golfer bring an extra pair of pants? In case he got a hole in one.",
      "I once made a belt out of watches. It was a waist of time.",
      "Why can’t your nose be 12 inches long? Because then it would be a foot.",
      "I don't trust stairs. They're always up to something.",
      "I used to be a math teacher, but I couldn't count on it.",
      "I used to be a shoe salesman, but I tied myself up in knots.",
      "I used to be a train driver, but I got sidetracked.",
    ];

    const randomIndex = Math.floor(Math.random() * jokes.length);
    const jokeText = jokes[randomIndex];

    setJoke(jokeText);
    onJokeGenerated(jokeText);
    saveJoke(jokeText);
  };

  return (
    <div>
      <button onClick={generateJoke}>Generate Joke</button>
      <p style={{ opacity: joke ? 1 : 0, border: joke ? "2px solid #ffcc00" : "none" }}>
        {joke}
      </p>
    </div>
  );
}
