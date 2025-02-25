import React, { useState, useEffect } from "react";
import "./saved.css";

export function Saved() {
  const [savedJokes, setSavedJokes] = useState([]);

  const getUserName = () => {
    const email = localStorage.getItem("userName") || "Mystery User";
    return email.includes("@") ? email.split("@")[0] : email;
  };

  useEffect(() => {
    const username = getUserName();
    const savedJokesKey = `savedJokes_${username}`;
    const storedJokes = JSON.parse(localStorage.getItem(savedJokesKey)) || [];
    setSavedJokes(storedJokes);
  }, []);

  return (
    <main>
      <h2>Saved Jokes for {getUserName()}</h2>
      <ul className="saved-jokes">
        {savedJokes.length > 0 ? (
          savedJokes.map((joke, index) => <li key={index}>{joke}</li>)
        ) : (
          <p>No saved jokes yet!</p>
        )}
      </ul>
    </main>
  );
}
