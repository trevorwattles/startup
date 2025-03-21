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
    fetch('/api/jokes?username=' + username)
      .then((res) => res.json())
      .then((savedJokes) => setSavedJokes(savedJokes))
      .catch((error) => console.error("Error fetching jokes:", error));
  }, []);

  return (
    <main>
      <h2>Saved Jokes for {getUserName()}</h2>
      <ul className="saved-jokes">
      {savedJokes.length > 0 ? (
  savedJokes.map((jokeObj, index) => (
    <li key={index}>
      <strong>{jokeObj.username}</strong>: {jokeObj.joke}
      <br />
    </li>
  ))
) : (
  <p>No saved jokes yet!</p>
)}
      </ul>
    </main>
  );
}
