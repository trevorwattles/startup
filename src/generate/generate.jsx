import React, { useState, useEffect } from "react";

export function Generate() {
  const [username, setUsername] = useState("Mystery User");
  const [joke, setJoke] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);

  // Get username from URL parameters when component loads
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("username") || "Mystery User";
    setUsername(user);
  }, []);

  // Function to generate a random joke
  const generateJoke = () => {
    const jokes = [
      "I told my suitcase there'd be no vacations… now it’s emotional baggage.",
      "Parallel lines have so much in common. Too bad they’ll never meet.",
      "Why did the scarecrow win an award? He was outstanding in his field.",
    ];

    const randomIndex = Math.floor(Math.random() * jokes.length);
    const jokeText = jokes[randomIndex];

    setJoke(jokeText);
    setShowSaveButton(true); // Show save button
  };

  // Function to save joke
  const saveJoke = () => {
    if (joke) {
      alert(`Joke saved: ${joke}`);
    }
  };

  return (
    <main>
      <h1>Welcome, {username}</h1>

      <button onClick={generateJoke}>Generate Joke</button>
      <p style={{ opacity: joke ? 1 : 0, transform: "translateY(0)", border: joke ? "2px solid #ffcc00" : "none" }}>
        {joke}
      </p>

      {showSaveButton && (
        <button onClick={saveJoke} style={{ display: "block" }}>
          Save Joke
        </button>
      )}

      <h3>Saved Jokes from Users</h3>
      <ul className="notification">
        <li className="user-name">Sarah saved "I told my suitcase there'd be no vacations… now it’s emotional baggage."</li>
        <li className="user-name">Ashley saved "Parallel lines have so much in common. Too bad they’ll never meet."</li>
        <li className="user-name">James saved "Why did the scarecrow win an award? He was outstanding in his field."</li>
      </ul>
    </main>
  );
}
